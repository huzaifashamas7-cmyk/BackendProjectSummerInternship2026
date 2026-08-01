const express = require('express');
const router = express.Router();
const { requireScope } = require('../middleware/scope'); 

router.get('/', requireScope('exams:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM exams');
  res.json(rows);
});

router.get('/:id', requireScope('exams:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM exams WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Exam not found' });
  res.json(rows[0]);
});

router.post('/', requireScope('exams:write'), async (req, res) => {
  const { title, description, duration_minutes } = req.body;
  const [result] = await req.db.execute(
    'INSERT INTO exams (title, description, duration_minutes) VALUES (?, ?, ?)',
    [title, description, duration_minutes]
  );
  res.status(201).json({ id: result.insertId, title, description, duration_minutes });
});

router.put('/:id', requireScope('exams:write'), async (req, res) => {
  const { title, description, duration_minutes } = req.body;
  await req.db.execute(
    'UPDATE exams SET title = ?, description = ?, duration_minutes = ? WHERE id = ?',
    [title, description, duration_minutes, req.params.id]
  );
  res.json({ message: 'Exam updated' });
});


module.exports = router;