// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date, // Tarih bilgisi ekliyoruz
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

