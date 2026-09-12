const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Message = require('../models/Message');
const { getEmbeddingsBatch } = require('../utils/embeddings');

/**
 * Helper to update testQueries.json with real MongoDB _ids of the planted anchors.
 */
async function syncTestQueries(allInsertedMessages) {
  const targetsFilePath = path.resolve(__dirname, '../../scripts/testTargets.json');
  const testQueriesOutputPath = path.resolve(__dirname, '../../scripts/testQueries.json');

  if (!fs.existsSync(targetsFilePath)) {
    console.warn('⚠️ testTargets.json not found, skipping testQueries sync.');
    return [];
  }

  const targets = JSON.parse(fs.readFileSync(targetsFilePath, 'utf8'));
  const testQueries = [];

  for (const target of targets) {
    // Find matching inserted message by timestamp, sender, and text
    const matched = allInsertedMessages.find(
      (m) =>
        m.sender === target.sender &&
        m.text === target.text &&
        new Date(m.timestamp).getTime() === new Date(target.timestamp).getTime()
    );

    if (matched) {
      testQueries.push({
        query: target.query,
        correctMessageId: matched._id.toString(),
        hardCase: Boolean(target.hardCase),
        targetId: target.targetId,
        isDecisionThread: Boolean(target.isDecisionThread),
        decisionName: target.decisionName || null,
        messagePreview: {
          sender: matched.sender,
          text: matched.text,
          timestamp: matched.timestamp,
        },
      });
    }
  }

  fs.writeFileSync(testQueriesOutputPath, JSON.stringify(testQueries, null, 2));
  console.log(`✅ Synced ${testQueries.length} test queries with real MongoDB _ids to testQueries.json`);
  return testQueries;
}

/**
 * POST /api/seed
 * Body options:
 * - limit: number (e.g. 50 for testing, 0 or omitted for all messages)
 * - clearExisting: boolean (default true)
 */
router.post('/seed', async (req, res) => {
  try {
    const limit = parseInt(req.body.limit, 10) || 0;
    const clearExisting = req.body.clearExisting !== false;

    // Load chatData.json
    let chatDataPath = path.resolve(__dirname, '../../chatData.json');
    if (!fs.existsSync(chatDataPath)) {
      chatDataPath = path.resolve(__dirname, '../../scripts/chatData.json');
    }
    if (!fs.existsSync(chatDataPath)) {
      return res.status(404).json({
        success: false,
        error: 'chatData.json not found. Please run scripts/generateChat.js first.',
      });
    }

    const rawData = JSON.parse(fs.readFileSync(chatDataPath, 'utf8'));
    const messagesToSeed = limit > 0 ? rawData.slice(0, limit) : rawData;

    console.log(`\n🌱 Starting seed pipeline: ${messagesToSeed.length} messages (limit=${limit})...`);

    // Generate embeddings locally
    console.log('⚡ Generating 384-dimensional embeddings locally with @xenova/transformers...');
    const texts = messagesToSeed.map((m) => m.text);
    const embeddings = await getEmbeddingsBatch(texts);

    if (clearExisting) {
      console.log('🧹 Clearing existing messages from collection...');
      await Message.deleteMany({});
    }

    // Prepare documents with embeddings
    const docs = messagesToSeed.map((m, idx) => ({
      sender: m.sender,
      text: m.text,
      timestamp: new Date(m.timestamp),
      embedding: embeddings[idx],
    }));

    console.log(`💾 Inserting ${docs.length} documents into MongoDB Atlas...`);
    const inserted = await Message.insertMany(docs, { ordered: true });

    // Sync test queries with real Mongo _ids
    let syncedQueries = [];
    if (limit === 0 || limit >= 4000) {
      syncedQueries = await syncTestQueries(inserted);
    }

    // Sample document for verification (excluding full 1536-vector for brevity)
    const sample = inserted[0].toObject();
    sample.embeddingLength = sample.embedding.length;
    sample.embeddingPreview = sample.embedding.slice(0, 5);
    delete sample.embedding;

    return res.json({
      success: true,
      message: `Successfully seeded ${inserted.length} messages into MongoDB Atlas`,
      data: {
        insertedCount: inserted.length,
        embeddingDimension: embeddings[0].length,
        syncedQueriesCount: syncedQueries.length,
        sampleDocument: sample,
      },
    });
  } catch (error) {
    console.error('❌ Error during /api/seed:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/seed/status
 * Returns current count of messages in DB and sample
 */
router.get('/seed/status', async (req, res) => {
  try {
    const count = await Message.countDocuments();
    const sample = count > 0 ? await Message.findOne().lean() : null;
    let sampleData = null;
    if (sample) {
      sampleData = {
        _id: sample._id,
        sender: sample.sender,
        text: sample.text,
        timestamp: sample.timestamp,
        embeddingLength: sample.embedding ? sample.embedding.length : 0,
      };
    }
    return res.json({
      success: true,
      data: {
        totalMessages: count,
        sample: sampleData,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
