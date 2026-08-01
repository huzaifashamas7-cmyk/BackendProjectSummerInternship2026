


const express = require('express');
const router = express.Router();
const { requireScope } = require('../middleware/scope');

router.get('/', requireScope('results:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM results');
  res.json(rows);
});

router.get('/student/:studentId', requireScope('results:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM results WHERE student_id = ?', [req.params.studentId]);
  res.json(rows);
});

module.exports = router;