/**
 * server/routes/search.js
 *
 * Semantic search endpoint for ChatMind.
 * Uses MongoDB Atlas $vectorSearch with the "vector_index" on the "messages" collection.
 * Enriches each search result with 2 messages before and 2 messages after for chronological conversation context.
 */

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { getEmbedding } = require('../utils/embed');

/**
 * Fetch 2 messages before and 2 messages after a given message timestamp.
 */
async function getSurroundingContext(messageTimestamp) {
  const [before, after] = await Promise.all([
    Message.find({ timestamp: { $lt: messageTimestamp } })
      .sort({ timestamp: -1 })
      .limit(2)
      .select('_id sender text timestamp')
      .lean(),
    Message.find({ timestamp: { $gt: messageTimestamp } })
      .sort({ timestamp: 1 })
      .limit(2)
      .select('_id sender text timestamp')
      .lean(),
  ]);

  return {
    before: before.reverse(), // chronologically ordered
    after,
  };
}

/**
 * Core search logic
 */
async function executeSearch(queryText, limitCount = 10) {
  if (!queryText || !queryText.trim()) {
    return [];
  }

  // Generate 384-dimensional query embedding
  const queryVector = await getEmbedding(queryText.trim());

  // MongoDB Atlas Vector Search aggregation
  const pipeline = [
    {
      $vectorSearch: {
        index: 'vector_index',
        path: 'embedding',
        queryVector: queryVector,
        numCandidates: Math.max(limitCount * 20, 200),
        limit: limitCount,
      },
    },
    {
      $project: {
        _id: 1,
        sender: 1,
        text: 1,
        timestamp: 1,
        score: { $meta: 'vectorSearchScore' },
      },
    },
  ];

  const matches = await Message.aggregate(pipeline);

  // Fetch surrounding context for each match
  const resultsWithContext = await Promise.all(
    matches.map(async (msg) => {
      const context = await getSurroundingContext(msg.timestamp);
      return {
        _id: msg._id,
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp,
        score: Number(msg.score.toFixed(4)),
        context,
      };
    })
  );

  return resultsWithContext;
}

/**
 * POST /api/search
 * Body: { query: string, limit?: number }
 */
router.post('/search', async (req, res) => {
  const { query, limit } = req.body;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Query parameter is required',
    });
  }

  try {
    const limitNum = parseInt(limit, 10) || 10;
    const results = await executeSearch(query, limitNum);

    return res.json({
      success: true,
      data: {
        query: query.trim(),
        count: results.length,
        results,
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/search?q=...
 */
router.get('/search', async (req, res) => {
  const query = req.query.q || req.query.query;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Query string parameter "q" is required',
    });
  }

  try {
    const limitNum = parseInt(req.query.limit, 10) || 10;
    const results = await executeSearch(query, limitNum);

    return res.json({
      success: true,
      data: {
        query: query.trim(),
        count: results.length,
        results,
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
