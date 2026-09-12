/**
 * scripts/seedMessages.js
 *
 * Command-line script to seed messages into MongoDB Atlas with 1536-dimensional embeddings.
 *
 * Usage:
 *   node scripts/seedMessages.js --limit 50     # Test run (50 messages)
 *   node scripts/seedMessages.js                # Full run (all 4000+ messages)
 */

const path = require('path');
const fs = require('fs');
const mongoose = require('../server/node_modules/mongoose');

// Load server/.env
const envPath = path.resolve(__dirname, '../server/.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is missing in server/.env');
  process.exit(1);
}

const Message = require('../server/models/Message');
const { getEmbeddingsBatch } = require('../server/utils/embeddings');

async function syncTestQueries(allInsertedMessages) {
  const targetsFilePath = path.resolve(__dirname, 'testTargets.json');
  const testQueriesOutputPath = path.resolve(__dirname, 'testQueries.json');

  if (!fs.existsSync(targetsFilePath)) {
    console.warn('⚠️ testTargets.json not found, skipping testQueries sync.');
    return [];
  }

  const targets = JSON.parse(fs.readFileSync(targetsFilePath, 'utf8'));
  const testQueries = [];

  for (const target of targets) {
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

async function runSeed() {
  console.log('====================================================');
  console.log('🌱 ChatMind — Message Seeding Pipeline');
  console.log('====================================================\n');

  // Parse args
  const limitIdx = process.argv.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(process.argv[limitIdx + 1], 10) : 0;

  // Load chatData
  let chatDataPath = path.resolve(__dirname, '../chatData.json');
  if (!fs.existsSync(chatDataPath)) {
    chatDataPath = path.resolve(__dirname, 'chatData.json');
  }
  const rawData = JSON.parse(fs.readFileSync(chatDataPath, 'utf8'));
  const messagesToSeed = limit > 0 ? rawData.slice(0, limit) : rawData;

  console.log(`Loaded ${rawData.length} messages. Seeding ${messagesToSeed.length} messages (limit=${limit})...`);

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB Atlas!');

  console.log('Generating 384-dimensional embeddings locally with @xenova/transformers...');
  const texts = messagesToSeed.map((m) => m.text);
  const startTime = Date.now();
  const embeddings = await getEmbeddingsBatch(texts);
  console.log(`✅ Generated ${embeddings.length} embeddings in ${((Date.now() - startTime) / 1000).toFixed(1)}s!`);

  console.log('Clearing existing messages from collection...');
  await Message.deleteMany({});

  const docs = messagesToSeed.map((m, idx) => ({
    sender: m.sender,
    text: m.text,
    timestamp: new Date(m.timestamp),
    embedding: embeddings[idx],
  }));

  console.log(`Inserting ${docs.length} documents into MongoDB Atlas in chunks of 500...`);
  const inserted = [];
  const CHUNK_SIZE = 500;
  for (let c = 0; c < docs.length; c += CHUNK_SIZE) {
    const chunk = docs.slice(c, c + CHUNK_SIZE);
    const chunkInserted = await Message.insertMany(chunk, { ordered: true });
    inserted.push(...chunkInserted);
    console.log(`  💾 Inserted ${inserted.length}/${docs.length} documents...`);
  }
  console.log(`🎉 Successfully inserted all ${inserted.length} documents!`);

  if (limit === 0 || limit >= 4000) {
    await syncTestQueries(inserted);
  }

  // Print sample document
  const sample = inserted[0];
  console.log('\nSample Document from MongoDB Atlas:');
  console.log(JSON.stringify({
    _id: sample._id,
    sender: sample.sender,
    text: sample.text,
    timestamp: sample.timestamp,
    embeddingDimensions: sample.embedding.length,
    embeddingSample: sample.embedding.slice(0, 5)
  }, null, 2));

  console.log('\n====================================================');
  console.log('Pipeline finished successfully.');
  console.log('====================================================\n');

  await mongoose.disconnect();
}

runSeed().catch((err) => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});
