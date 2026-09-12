/**
 * scripts/build60ChatData.js
 * 
 * Compiles the 60 user-provided bursts into chatData.json.
 * Features:
 * - 6-month timestamp distribution (March 1, 2026 to August 31, 2026)
 * - Realistic clustering with quiet days and high-activity days
 * - Intra-burst message spacing: 15 to 90 seconds
 * - Verbatim preservation of all sender names and texts
 * - Sparse standalone messages (<Media omitted>, short notes)
 * - Outputs testTargets.json marking the exact anchor messages for testQueries.json
 */

const fs = require('fs');
const path = require('path');
const { BURSTS_60 } = require('./burstsData');

const OUTPUT_ROOT = path.resolve(__dirname, '../chatData.json');
const OUTPUT_SCRIPTS = path.resolve(__dirname, 'chatData.json');
const TARGETS_FILE = path.resolve(__dirname, 'testTargets.json');

// 6-month calendar setup: March 1, 2026 to August 31, 2026 (184 days)
// We will assign the 60 bursts across realistic clusters:
// Cluster 1 (March): Trip planning & college life (Bursts 1-12)
// Cluster 2 (April): Food, outings, room sharing & exams (Bursts 13-22)
// Cluster 3 (May): Coding, projects, hackathons & jobs (Bursts 23-32)
// Cluster 4 (June): Fitness, gym, sports & daily life (Bursts 33-42)
// Cluster 5 (July): Deadlines, celebrations & pets (Bursts 43-52)
// Cluster 6 (August): Movies, pop culture, life transitions & goodbyes (Bursts 53-60)

function generateChatData() {
  const allMessages = [];
  const targets = [];

  // Start date: Sunday March 1, 2026 11:30 AM
  let currentTime = new Date('2026-03-01T11:30:00.000Z').getTime();

  BURSTS_60.forEach((burst, bIdx) => {
    // Inter-burst time gap:
    // Some bursts happen in quick succession on same day (1-3 hours apart)
    // Other bursts have 2-4 days gap (quiet period)
    if (bIdx > 0) {
      const isClusteredSameDay = (bIdx % 3 === 1);
      if (isClusteredSameDay) {
        // Clustered same day: 2 to 5 hours later
        currentTime += (2 + Math.random() * 3) * 3600 * 1000;
      } else {
        // Quiet gap: 3 to 6 days later
        currentTime += (3 + Math.random() * 3) * 24 * 3600 * 1000;
        // Reset to daytime hour (between 10 AM and 8 PM)
        const d = new Date(currentTime);
        d.setUTCHours(10 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 59));
        currentTime = d.getTime();
      }
    }

    // Process burst messages
    burst.messages.forEach((m, mIdx) => {
      // Intra-burst timing: 15 to 80 seconds between messages
      if (mIdx > 0) {
        currentTime += (15 + Math.floor(Math.random() * 65)) * 1000;
      }

      const msgObj = {
        sender: m.sender,
        text: m.text,
        timestamp: new Date(currentTime).toISOString(),
        burstId: burst.id,
        burstTitle: burst.title
      };

      allMessages.push(msgObj);

      // Check if this is an anchor message
      if (burst.hardCaseAnchorText && m.text.trim() === burst.hardCaseAnchorText.trim()) {
        targets.push({
          burstId: burst.id,
          burstTitle: burst.title,
          isDecisionThread: Boolean(burst.isAnchorDecision),
          isHardCase: true,
          messageIndex: allMessages.length - 1,
          sender: msgObj.sender,
          text: msgObj.text,
          timestamp: msgObj.timestamp
        });
      }
    });

    // Sparse standalone message between bursts (only ~15% chance, media omitted or quick check-in)
    if (Math.random() < 0.15 && bIdx < BURSTS_60.length - 1) {
      currentTime += (40 + Math.floor(Math.random() * 80)) * 60 * 1000;
      const standaloneOptions = [
        { sender: 'Priya', text: '<Media omitted>' },
        { sender: 'Ananya', text: '<Media omitted>' },
        { sender: 'Rohan', text: 'phone dying, ping if urgent' },
        { sender: 'Sneha', text: '<Media omitted>' },
        { sender: 'Kabir', text: 'reached home' }
      ];
      const picked = standaloneOptions[bIdx % standaloneOptions.length];
      allMessages.push({
        sender: picked.sender,
        text: picked.text,
        timestamp: new Date(currentTime).toISOString(),
        burstId: null,
        burstTitle: 'Standalone'
      });
    }
  });

  // Write outputs
  fs.writeFileSync(OUTPUT_ROOT, JSON.stringify(allMessages, null, 2), 'utf8');
  fs.writeFileSync(OUTPUT_SCRIPTS, JSON.stringify(allMessages, null, 2), 'utf8');
  fs.writeFileSync(TARGETS_FILE, JSON.stringify(targets, null, 2), 'utf8');

  return { allMessages, targets };
}

if (require.main === module) {
  const { allMessages, targets } = generateChatData();
  console.log(`✅ Generated ${allMessages.length} total messages from 60 bursts.`);
  console.log(`📌 Identified ${targets.length} anchor target messages.`);
  console.log(`📅 Date range: ${allMessages[0].timestamp} to ${allMessages[allMessages.length - 1].timestamp}`);
}

module.exports = { generateChatData };
