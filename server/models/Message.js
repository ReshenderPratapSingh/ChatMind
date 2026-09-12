const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    index: true,
  },
  embedding: {
    type: [Number],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
