
require('dotenv').config();

const express = require("express");
const mysql = require("mysql2/promise");
const crypto = require('crypto');
const { generateApiKey } = require('./utils/apiKey');
require('./workers/webhookWorker'); // starts the worker process
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


const app = express();
app.use(express.json());
app.use((req, res, next) => { req.db = db; next(); });
const webhooksRouter = require('./routes/webhooks');
app.use('/api/v1/webhooks', apiKeyAuth, rateLimiter, webhooksRouter);
const examsRouter = require('./routes/exams');
const questionsRouter = require('./routes/questions');
const enrollmentsRouter = require('./routes/enrollments');
const resultsRouter = require('./routes/results');
const certificatesRouter = require('./routes/certificates');

app.use('/api/v1/exams', apiKeyAuth, rateLimiter, examsRouter);
app.use('/api/v1/questions', apiKeyAuth, rateLimiter,  questionsRouter);
app.use('/api/v1/enrollments', apiKeyAuth, rateLimiter, enrollmentsRouter);
app.use('/api/v1/results', apiKeyAuth, rateLimiter, resultsRouter);
app.use('/api/v1/certificates', apiKeyAuth, rateLimiter,  certificatesRouter);




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
  const userId = req.body.user_id || 1;

  try {
    await db.execute(
      'INSERT INTO api_keys (user_id, key_name, key_hash, scopes) VALUES (?, ?, ?, ?)',
      [userId, key_name, hash, JSON.stringify(scopes)]
    );
    res.json({ api_key: rawKey, message: 'Save this key now — it will not be shown again.' });
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
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
  try {
    await db.execute(
      'UPDATE api_keys SET revoked_at = NOW() WHERE id = ? AND user_id = ?',
      [req.params.id, req.apiKey.user_id]
    );
    res.json({ message: 'Key revoked' });
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
});

 

app.use((err,req,res,next)=>{

    console.error(err);

    res.status(500).json({
        error:"Internal Server Error"
    });

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

//"sk_831f19341e17dd90811c2a42f4c4bbbf1186771edbe9318e5f68e5d4cbd5864f"

//"sk_44e00e105ac82bbac0af18a02ae7a289f3eeb1a9bf6dea8f44b21bd6ad649b35",  Full Access key
//sk_c97c8043478aa27248ede55df25bb8fde2100d4149cd99026f065f8f92796200    ReadOnly key

//sk_7fa5af613cb50aa0f783c40918b05667a263c0c85bd3fb9c51cb3e1f9bc31d8c     full Access key
//sk_17b8009cf74ceb12c7d76f5d32b1198b29398c15f22a58cc469af51eaab7bc8c      Read ONly key

//sk_7486d8f63a99223ccb24ef48985d2ed169dc4fde361d3c32b91b4254d37d82e0    week2 updated ResultWritKey
//sk_c3a8ef80bf180fd26eba90244ebc11c05343ddb236c3424903f0b6ecf1983eaa   webhook subscription key