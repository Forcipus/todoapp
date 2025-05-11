const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /tasks → Tüm görevleri getir
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /tasks → Yeni görev ekle
router.post('/', async (req, res) => {
  const { title, deadline } = req.body;

  const task = new Task({
    title,
    deadline, // Deadline'ı ekliyoruz
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /tasks/:id → Görev güncelle
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = (req.body.title !== undefined && req.body.title !== null) ? req.body.title : task.title;
    task.completed = req.body.completed ?? task.completed;
    task.deadline = req.body.deadline ?? task.deadline; // Tarih güncellemesi

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /tasks/:id → Görev sil
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


