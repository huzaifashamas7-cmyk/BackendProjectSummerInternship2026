
const express = require('express');
const router = express.Router();
const { requireScope } = require('../middleware/scope');
const triggerWebhookEvent = require('../utils/triggerWebhook');

router.get('/', requireScope('results:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM results');
  res.json(rows);
});

router.get('/student/:studentId', requireScope('results:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM results WHERE student_id = ?', [req.params.studentId]);
  res.json(rows);
});

router.post('/', requireScope('results:write'), async (req, res) => {
  const { student_id, exam_id, score } = req.body;

  const [result] = await req.db.execute(
    'INSERT INTO results (student_id, exam_id, score) VALUES (?, ?, ?)',
    [student_id, exam_id, score]
  );

  const newResult = { id: result.insertId, student_id, exam_id, score };

  // Fire the webhook — don't block the response waiting for delivery to finish
  triggerWebhookEvent(req.db, 'result.published', newResult).catch((err) => {
    console.error('Failed to trigger webhook:', err.message);
  });

  res.status(201).json(newResult);
});

module.exports = router;