
require('dotenv').config();

const express = require("express");
const mysql = require("mysql2/promise");
const crypto = require('crypto');
const { generateApiKey } = require('./utils/apiKey');

const app = express();
app.use(express.json());



const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});



(async () => {
  try {
    const connection = await db.getConnection();
    console.log(" Connected to MySQL");
    connection.release();
  } catch (err) {
    console.error(" MySQL Error:", err.message);
  }
})();



app.post('/api/v1/keys', async (req, res) => {
  const { key_name, scopes } = req.body;
  const { rawKey, hash } = generateApiKey();
  const userId = req.body.user_id || 1; // temporary placeholder until real user auth exists

  await db.execute(
    'INSERT INTO api_keys (user_id, key_name, key_hash, scopes) VALUES (?, ?, ?, ?)',
    [userId, key_name, hash, JSON.stringify(scopes)]
  );

  res.json({ api_key: rawKey, message: 'Save this key now — it will not be shown again.' });
});

async function apiKeyAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing API key' });
  }

  const rawKey = authHeader.split(' ')[1];
  const hash = crypto.createHash('sha256').update(rawKey).digest('hex');

  const [rows] = await db.execute(
    'SELECT * FROM api_keys WHERE key_hash = ? AND revoked_at IS NULL',
    [hash]
  );

  if (rows.length === 0) return res.status(401).json({ error: 'Invalid or revoked API key' });

  const keyRecord = rows[0];
  if (keyRecord.expires_at && new Date(keyRecord.expires_at) < new Date()) {
    return res.status(401).json({ error: 'API key expired' });
  }

  req.apiKey = keyRecord; 
   
  next();
}

function requireScope(scope) {
  return (req, res, next) => {
    const scopes = req.apiKey.scopes; 
    if (!scopes.includes(scope)) {
      return res.status(403).json({ error: `Missing required scope: ${scope}` });
    }
    next();
  };
}


app.get('/api/v1/exams', apiKeyAuth,rateLimiter, requireScope('exams:read'), (req, res) =>
     { 
        res.json({
            message:"Exam Data Fetched Successfully."
        })
      });

      const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });
client.connect()
  .then(() => console.log("Redis Connected"))
  .catch(err => console.error(" Redis Error:", err));

async function rateLimiter(req, res, next) {
  const key = `ratelimit:${req.apiKey.id}`;
  const limit = req.apiKey.rate_limit; 
  const windowSeconds = 3600;

  const current = await client.incr(key);
  if (current === 1) await client.expire(key, windowSeconds);

  const ttl = await client.ttl(key);
  res.set('X-RateLimit-Limit', limit);
  res.set('X-RateLimit-Remaining', Math.max(0, limit - current));
  res.set('X-RateLimit-Reset', ttl);

  if (current > limit) {
    return res.status(429).set('Retry-After', ttl).json({ error: 'Rate limit exceeded' });
  }
  next();
}

app.delete('/api/v1/keys/:id', apiKeyAuth, async (req, res) => {
  await db.execute('UPDATE api_keys SET revoked_at = NOW() WHERE id = ?', [req.params.id]);
  res.json({ message: 'Key revoked' });
});
 



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

//"sk_831f19341e17dd90811c2a42f4c4bbbf1186771edbe9318e5f68e5d4cbd5864f"