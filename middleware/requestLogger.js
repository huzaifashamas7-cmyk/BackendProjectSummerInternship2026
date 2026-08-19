function requestLogger(db) {
  return (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
      const latency = Date.now() - startTime;
      const apiKeyId = req.apiKey ? req.apiKey.id : null;

      db.execute(
        'INSERT INTO api_request_logs (api_key_id, endpoint, method, status_code, latency_ms) VALUES (?, ?, ?, ?, ?)',
        [apiKeyId, req.originalUrl, req.method, res.statusCode, latency]
      ).catch((err) => {
        console.error('Failed to write request log:', err.message);
      });
    });

    next();
  };
}

module.exports = requestLogger;