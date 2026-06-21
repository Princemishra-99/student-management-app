const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all students
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single student
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE student
router.post('/', async (req, res) => {
  const { name, course, marks } = req.body;
  if (!name || !course || marks === undefined) {
    return res.status(400).json({ error: 'name, course and marks are required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO students (name, course, marks) VALUES (?, ?, ?)',
      [name, course, marks]
    );
    res.status(201).json({ id: result.insertId, name, course, marks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE student
router.put('/:id', async (req, res) => {
  const { name, course, marks } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE students SET name = ?, course = ?, marks = ? WHERE id = ?',
      [name, course, marks, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM students WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
