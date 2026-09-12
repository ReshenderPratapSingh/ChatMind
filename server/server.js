require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Allow all origins for the skeleton test
app.use(express.json());

// Routes
app.use('/api', healthRoutes);

// MongoDB Atlas Connection
if (!MONGO_URI) {
  console.warn('⚠️  MONGO_URI is not set in environment variables. Database operations will fail.');
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected successfully to Atlas!');
    })
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message);
    });
}

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app, server };
