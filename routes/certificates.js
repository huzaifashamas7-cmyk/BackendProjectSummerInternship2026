
const express = require('express');
const router = express.Router();
const { requireScope } = require('../middleware/scope');

router.get('/verify/:code', requireScope('certificates:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM certificates WHERE certificate_code = ?', [req.params.code]);
  if (rows.length === 0) return res.status(404).json({ error: 'Invalid certificate code' });
  res.json({ valid: true, certificate: rows[0] });
});

router.get('/:id', requireScope('certificates:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM certificates WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Certificate not found' });
  res.json(rows[0]);
});

module.exports = router;