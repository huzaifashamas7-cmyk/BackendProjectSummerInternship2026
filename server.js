
require('dotenv').config();
const cors = require('cors');
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

const sandboxDb = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SANDBOX_NAME
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());
const requestLogger = require('./middleware/requestLogger');
app.use(requestLogger(db));
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

app.get('/api/v1/keys/:id/logs', apiKeyAuth, async (req, res) => {
  const keyId = req.params.id;

  // Only allow a key's owner to view its own logs
  if (parseInt(keyId) !== req.apiKey.id) {
    return res.status(403).json({ error: 'You can only view logs for your own API key' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM api_request_logs WHERE api_key_id = ? ORDER BY created_at DESC LIMIT 1000',
      [keyId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch logs:', err.message);
    return res.status(500).json({ error: 'Database error' });
  }
});




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



app.post('/api/v1/sandbox/keys', async (req, res) => {
  const { key_name, scopes } = req.body;
  const { rawKey, hash } = generateApiKey();
  const userId = req.body.user_id || 1;

  try {
    await sandboxDb.execute(
      'INSERT INTO api_keys (user_id, key_name, key_hash, scopes) VALUES (?, ?, ?, ?)',
      [userId, key_name, hash, JSON.stringify(scopes)]
    );
    res.json({ api_key: rawKey, message: 'Sandbox key created — save it now, it will not be shown again.' });
  } catch (err) {
    console.error('Sandbox key creation error:', err); // ADD THIS LINE
    return res.status(500).json({ error: 'Database error' });
  }
});   



async function apiKeyAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing API key' });
  }

  const rawKey = authHeader.split(' ')[1];
  const hash = crypto.createHash('sha256').update(rawKey).digest('hex');

  // First, check production keys
  let [rows] = await db.execute(
    'SELECT * FROM api_keys WHERE key_hash = ? AND revoked_at IS NULL',
    [hash]
  );
  let targetDb = db;

  // If not found in production, check sandbox keys
  if (rows.length === 0) {
    [rows] = await sandboxDb.execute(
      'SELECT * FROM api_keys WHERE key_hash = ? AND revoked_at IS NULL',
      [hash]
    );
    targetDb = sandboxDb;
  }

  if (rows.length === 0) return res.status(401).json({ error: 'Invalid or revoked API key' });

  const keyRecord = rows[0];
  if (keyRecord.expires_at && new Date(keyRecord.expires_at) < new Date()) {
    return res.status(401).json({ error: 'API key expired' });
  }

  req.apiKey = keyRecord;
  req.db = targetDb; // this is the key change — every route now automatically uses the right database
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

setInterval(async () => {
  try {
    const [result] = await db.execute(
      'DELETE FROM api_request_logs WHERE created_at < NOW() - INTERVAL 30 DAY'
    );
    console.log(`Purged ${result.affectedRows} old log entries`);
  } catch (err) {
    console.error('Log purge failed:', err.message);
  }
}, 24 * 60 * 60 * 1000);


//"sk_831f19341e17dd90811c2a42f4c4bbbf1186771edbe9318e5f68e5d4cbd5864f"

//"sk_44e00e105ac82bbac0af18a02ae7a289f3eeb1a9bf6dea8f44b21bd6ad649b35",  Full Access key
//sk_c97c8043478aa27248ede55df25bb8fde2100d4149cd99026f065f8f92796200    ReadOnly key

//sk_7fa5af613cb50aa0f783c40918b05667a263c0c85bd3fb9c51cb3e1f9bc31d8c     full Access key
//sk_17b8009cf74ceb12c7d76f5d32b1198b29398c15f22a58cc469af51eaab7bc8c      Read ONly key

//sk_7486d8f63a99223ccb24ef48985d2ed169dc4fde361d3c32b91b4254d37d82e0    week2 updated ResultWritKey
//sk_c3a8ef80bf180fd26eba90244ebc11c05343ddb236c3424903f0b6ecf1983eaa   webhook subscription key

// sk_9e0ad5b254b0c4d7456c8479ad4dc319c950d51cc1ec30f666e934823453338c   sandbox key
// sk_64f012c54af067b63f0d93034fd01a4b9e87e11be419b4c6d655ba7d459469cd  
// sk_22a73835ed904e59338a89a7a04095dbe0d84c5b6725937e4f28b7dc95ad7c22

// sk_553d6dfee22ebe3ea19d3041037904cf2f38b14a29a0952888aae5b5fe1666e8   week5 key
// sk_bf840c2ce8613a5b134b7ced5840ec2fec20e6017e8a2301738202fe2b8fae01
//sk_aed81d0cd10f678eea9de64f50df2e4fa1318b5a71f46ffc6e432880bdb94f73