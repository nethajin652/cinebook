const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Base Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'CineBook API Server',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected/mock',
    timestamp: new Date().toISOString()
  });
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cinebook';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB database');
  })
  .catch((err) => {
    console.log('ℹ️ Note: MongoDB is not running locally. The CineBook client operates seamlessly with LocalStorage & Mock Data.');
    console.log('To connect MongoDB Atlas, set MONGO_URI in backend/.env');
  });

app.listen(PORT, () => {
  console.log(`🚀 CineBook Backend Server running on port ${PORT}`);
});

module.exports = app;
