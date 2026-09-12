/**
 * scripts/runAccuracyTest.js
 *
 * Primary accuracy evaluation harness for ChatMind.
 * Evaluates semantic search accuracy across all 40 test queries:
 * - 32 normal queries (person, meaning, time)
 * - 8 hard cases (strictly 0 word overlap between query and answer message)
 *
 * Reports:
 * 1. Overall accuracy (% found in top results)
 * 2. Hard-case accuracy (across the 8 zero-word-overlap queries)
 * 3. Normal-case accuracy (across the 32 standard queries)
 *
 * Usage:
 *   node scripts/runAccuracyTest.js
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('../server/node_modules/mongoose');

// Load environment
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
const Message = require('../server/models/Message');
const { getEmbedding } = require('../server/utils/embed');

const TEST_QUERIES_PATH = path.resolve(__dirname, 'testQueries.json');
const TOP_K = 5; // Search top-k results considered a hit

async function searchDirect(queryText, limit = TOP_K) {
  const queryVector = await getEmbedding(queryText);

  const pipeline = [
    {
      $vectorSearch: {
        index: 'vector_index',
        path: 'embedding',
        queryVector: queryVector,
        numCandidates: 200,
        limit: limit,
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
  return matches;
}

async function runTest() {
  console.log('====================================================');
  console.log('🎯 ChatMind — Search Accuracy Test Harness');
  console.log(`Evaluating Top-${TOP_K} Retrieval Accuracy`);
  console.log('====================================================\n');

  if (!fs.existsSync(TEST_QUERIES_PATH)) {
    console.error('❌ testQueries.json not found. Please run scripts/seedMessages.js first.');
    process.exit(1);
  }

  const testQueries = JSON.parse(fs.readFileSync(TEST_QUERIES_PATH, 'utf8'));
  console.log(`Loaded ${testQueries.length} test queries from testQueries.json`);

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB Atlas!\n');

  let totalQueries = testQueries.length;
  let totalHits = 0;

  let hardQueries = 0;
  let hardHits = 0;

  let normalQueries = 0;
  let normalHits = 0;

  const resultsTable = [];

  for (let i = 0; i < testQueries.length; i++) {
    const item = testQueries[i];
    const isHard = Boolean(item.hardCase);
    if (isHard) hardQueries++;
    else normalQueries++;

    const matches = await searchDirect(item.query, TOP_K);

    // Check if correctMessageId appears in matches
    const rankIndex = matches.findIndex((m) => m._id.toString() === item.correctMessageId);
    const hit = rankIndex !== -1;

    if (hit) {
      totalHits++;
      if (isHard) hardHits++;
      else normalHits++;
    }

    const matchedMessage = hit ? matches[rankIndex] : (matches[0] || null);

    resultsTable.push({
      num: i + 1,
      query: item.query,
      type: isHard ? 'HARD (0-overlap)' : 'Normal',
      status: hit ? `✅ HIT (Rank #${rankIndex + 1})` : '❌ MISS',
      score: matchedMessage ? matchedMessage.score.toFixed(4) : 'N/A',
      expected: item.messagePreview ? `"${item.messagePreview.text.slice(0, 45)}..."` : item.correctMessageId,
      topResult: matchedMessage ? `"${matchedMessage.text.slice(0, 45)}..."` : 'None',
    });

    // Short console progress
    const symbol = hit ? '✓' : '✗';
    console.log(`[${symbol}] Query ${i + 1}/${totalQueries}: "${item.query.slice(0, 45)}..." -> ${hit ? `HIT (Rank #${rankIndex + 1}, score ${matchedMessage.score.toFixed(3)})` : 'MISS'}`);
  }

  const overallAccuracy = ((totalHits / totalQueries) * 100).toFixed(1);
  const hardAccuracy = hardQueries > 0 ? ((hardHits / hardQueries) * 100).toFixed(1) : 'N/A';
  const normalAccuracy = normalQueries > 0 ? ((normalHits / normalQueries) * 100).toFixed(1) : 'N/A';

  console.log('\n====================================================');
  console.log('📊 ACCURACY REPORT (Top-5 Retrieval)');
  console.log('====================================================');
  console.log(`Total Queries Tested:      ${totalQueries}`);
  console.log(`Overall Accuracy:          ${overallAccuracy}% (${totalHits}/${totalQueries})`);
  console.log(`Hard-Case Accuracy:        ${hardAccuracy}% (${hardHits}/${hardQueries})  [0-word overlap]`);
  console.log(`Normal-Case Accuracy:      ${normalAccuracy}% (${normalHits}/${normalQueries})`);
  console.log('====================================================\n');

  console.log('Detailed Query Breakdown:');
  console.table(resultsTable.map(r => ({
    '#': r.num,
    'Type': r.type,
    'Status': r.status,
    'Score': r.score,
    'Query': r.query.slice(0, 35),
    'Expected Text': r.expected.slice(0, 35)
  })));

  await mongoose.disconnect();
}

runTest().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
