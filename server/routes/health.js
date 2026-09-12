const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Ping = require('../models/Ping');

// GET /api/health - trivial health check, no DB involved
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// GET /api/test-db - creates a Ping document, saves to DB, reads it back, and returns it
router.get('/test-db', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      status: 'error',
      message: 'Database is not connected',
      error: 'MongoDB connection is not established. Please check MONGO_URI in server/.env and verify MongoDB Atlas IP whitelist.',
    });
  }

  try {
    const ping = new Ping({
      message: 'pong',
      createdAt: new Date(),
    });

    const savedPing = await ping.save();
    const retrievedPing = await Ping.findById(savedPing._id);

    res.json({
      status: 'ok',
      message: 'Database write and read successful',
      data: retrievedPing,
    });
  } catch (error) {
    console.error('Error during test-db execution:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database operation failed',
      error: error.message,
    });
  }
});

module.exports = router;
