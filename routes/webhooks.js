const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { requireScope } = require('../middleware/scope');

router.post('/', requireScope('webhooks:write'), async (req, res) => {
  const { event_type, url } = req.body;
  const userId = req.apiKey.user_id;
  const secret = crypto.randomBytes(32).toString('hex');

  const [result] = await req.db.execute(
    'INSERT INTO webhook_subscriptions (user_id, event_type, url, secret) VALUES (?, ?, ?, ?)',
    [userId, event_type, url, secret]
  );

  res.status(201).json({
    id: result.insertId,
    event_type,
    url,
    secret,
    message: 'Save this secret — you will need it to verify incoming webhook signatures.'
  });
});



router.get('/', requireScope('webhooks:read'), async (req, res) => {
  const userId = req.apiKey.user_id;
  const [rows] = await req.db.execute(
    'SELECT * FROM webhook_subscriptions WHERE user_id = ?',
    [userId]
  );
  res.json(rows);
});

router.delete('/:id', requireScope('webhooks:write'), async (req, res) => {
  const userId = req.apiKey.user_id;
  const [result] = await req.db.execute(
    'DELETE FROM webhook_subscriptions WHERE id = ? AND user_id = ?',
    [req.params.id, userId]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Subscription not found' });
  }

  res.json({ message: 'Webhook subscription deleted' });
});
module.exports = router;

