

const express = require('express');
const router = express.Router();
const { requireScope } = require('../middleware/scope');

router.get('/', requireScope('questions:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM questions');
  res.json(rows);
});

router.post('/', requireScope('questions:write'), async (req, res) => {
  const { exam_id, question_text, options, correct_option } = req.body;
  const [result] = await req.db.execute(
    'INSERT INTO questions (exam_id, question_text, options, correct_option) VALUES (?, ?, ?, ?)',
    [exam_id, question_text, JSON.stringify(options), correct_option]
  );
  res.status(201).json({ id: result.insertId });
});

module.exports = router;