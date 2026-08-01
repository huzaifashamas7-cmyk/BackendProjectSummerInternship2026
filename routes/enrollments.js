
const express = require('express');
const router = express.Router();
const { requireScope } = require('../middleware/scope');

router.get('/', requireScope('enrollments:read'), async (req, res) => {
  const [rows] = await req.db.execute('SELECT * FROM enrollments');
  res.json(rows);
});

router.post('/', requireScope('enrollments:write'), async (req, res) => {
  const { student_id, exam_id } = req.body;
  const [result] = await req.db.execute(
    'INSERT INTO enrollments (student_id, exam_id) VALUES (?, ?)',
    [student_id, exam_id]
  );
  res.status(201).json({ id: result.insertId });
});

router.delete('/:id', requireScope('enrollments:write'), async (req, res) => {
  await req.db.execute("UPDATE enrollments SET status = 'unenrolled' WHERE id = ?", [req.params.id]);
  res.json({ message: 'Unenrolled' });
});

module.exports = router;