const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const https = require('https');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://13.60.86.235:3000', // Frontend'in çalıştığı IP adresi ve portu
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Hangi HTTP metodlarına izin verileceği
  allowedHeaders: ['Content-Type', 'Authorization'], // Hangi başlıkların kabul edileceği
}));

// Middleware
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Basit bir API endpoint
app.get('/tasks', (req, res) => {
  res.send('Task list will be here');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://13.60.86.235:{port}`);
});
