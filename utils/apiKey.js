const crypto = require('crypto');

function generateApiKey() {
  const rawKey = 'sk_' + crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(rawKey).digest('hex');
  return { rawKey, hash };
}

module.exports = { generateApiKey };