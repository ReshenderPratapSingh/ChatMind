/**
 * scripts/prepareTestTargets.js
 * 
 * Defines all 40 test queries (8 hard-case zero-overlap + 32 normal)
 * for the 60 English bursts dataset.
 */

const fs = require('fs');
const path = require('path');

const RAW_QUERIES = [
  // --- 8 HARD CASES (ZERO WORD OVERLAP) ---
  {
    targetId: "hard-1",
    hardCase: true,
    isDecisionThread: true,
    burstId: 1,
    query: "when did we decide on the vacation destination",
    targetSender: "Sneha",
    targetText: "Final call: Himachal. Let’s stop debating and start looking at stays."
  },
  {
    targetId: "hard-2",
    hardCase: true,
    isDecisionThread: true,
    burstId: 9,
    query: "which dining spot did everyone choose regarding Saturday night",
    targetSender: "Sneha",
    targetText: "Final call: the North Indian place. I'll make the reservation for eight."
  },
  {
    targetId: "hard-3",
    hardCase: true,
    isDecisionThread: false,
    burstId: 17,
    query: "how much cash should all attendees contribute toward Sneha surprise celebration",
    targetSender: "Priya",
    targetText: "Guys, the gift is ₹4,000 total. Eight people means ₹500 each."
  },
  {
    targetId: "hard-4",
    hardCase: true,
    isDecisionThread: false,
    burstId: 30,
    query: "what time and location was fixed for tomorrow jogging meetup",
    targetSender: "Sneha",
    targetText: "Done. Park entrance, 6 AM. No excuses."
  },
  {
    targetId: "hard-5",
    hardCase: true,
    isDecisionThread: false,
    burstId: 36,
    query: "where could Aarav misplaced entry keys possibly be located",
    targetSender: "Sneha",
    targetText: "Check with the building security first. Someone might have handed them in."
  },
  {
    targetId: "hard-6",
    hardCase: true,
    isDecisionThread: false,
    burstId: 42,
    query: "when does coursework upload window close",
    targetSender: "Kabir",
    targetText: "Just checked the notice. The cutoff is 5 PM tomorrow."
  },
  {
    targetId: "hard-7",
    hardCase: true,
    isDecisionThread: true,
    burstId: 2,
    query: "which transit method got approved for our outward journey",
    targetSender: "Sneha",
    targetText: "Done. I'll check the train tickets tonight."
  },
  {
    targetId: "hard-8",
    hardCase: true,
    isDecisionThread: true,
    burstId: 4,
    query: "what accommodation sleeping arrangement was agreed upon",
    targetSender: "Sneha",
    targetText: "😂 Two rooms it is. I'm not waking up to someone's alarm at 5 AM again."
  },

  // --- 32 NORMAL CASES ---
  {
    targetId: "norm-1",
    hardCase: false,
    burstId: 5,
    query: "what document did Priya have after losing her wallet",
    targetSender: "Priya",
    targetText: "I have my passport, thankfully."
  },
  {
    targetId: "norm-2",
    hardCase: false,
    burstId: 6,
    query: "why did Aarav suggest renting a car only for the day trip",
    targetSender: "Aarav",
    targetText: "We could use cabs for the city and rent a car only for the day trip."
  },
  {
    targetId: "norm-3",
    hardCase: false,
    burstId: 8,
    query: "who owed everyone chai for leaving the air conditioner on",
    targetSender: "Aarav",
    targetText: "Whoever did it owes us chai."
  },
  {
    targetId: "norm-4",
    hardCase: false,
    burstId: 10,
    query: "what did Rohan order at the new restaurant that he found overhyped",
    targetSender: "Rohan",
    targetText: "Their signature pasta and dessert."
  },
  {
    targetId: "norm-5",
    hardCase: false,
    burstId: 11,
    query: "what wrong food item did Rohan receive instead of a burger",
    targetSender: "Rohan",
    targetText: "Why did I get a paneer wrap? I asked for a burger 😭"
  },
  {
    targetId: "norm-6",
    hardCase: false,
    burstId: 12,
    query: "who defended putting pineapple on pizza as sweet and salty",
    targetSender: "Ananya",
    targetText: "Same. Sweet and salty works."
  },
  {
    targetId: "norm-7",
    hardCase: false,
    burstId: 13,
    query: "what dish did Aarav offer to prepare for the Sunday potluck",
    targetSender: "Aarav",
    targetText: "I'm in. I'll make pulao."
  },
  {
    targetId: "norm-8",
    hardCase: false,
    burstId: 14,
    query: "why was Rohan late to dinner table",
    targetSender: "Rohan",
    targetText: "I'm sorry 😭 Traffic is horrible. Give me fifteen minutes."
  },
  {
    targetId: "norm-9",
    hardCase: false,
    burstId: 15,
    query: "which coffee shop did Priya recommend for the best filter coffee",
    targetSender: "Priya",
    targetText: "That old café near the market."
  },
  {
    targetId: "norm-10",
    hardCase: false,
    burstId: 16,
    query: "what food delivery item was missing from Kabir order",
    targetSender: "Kabir",
    targetText: "I ordered noodles. There's no noodles."
  },
  {
    targetId: "norm-11",
    hardCase: false,
    burstId: 18,
    query: "how much money did Aarav owe Kabir after the weekend trip",
    targetSender: "Kabir",
    targetText: "Just did. Aarav owes me ₹620, Neha ₹380, and Vikram ₹510."
  },
  {
    targetId: "norm-12",
    hardCase: false,
    burstId: 19,
    query: "how much money did Rohan owe Ananya for food from three weeks ago",
    targetSender: "Ananya",
    targetText: "You still owe ₹240 😂"
  },
  {
    targetId: "norm-13",
    hardCase: false,
    burstId: 20,
    query: "how much is the shared streaming subscription per person",
    targetSender: "Vikram",
    targetText: "Around ₹150 if we split it properly."
  },
  {
    targetId: "norm-14",
    hardCase: false,
    burstId: 22,
    query: "how much money did Kabir remind Rohan about borrowing",
    targetSender: "Kabir",
    targetText: "Rohan, tiny reminder about the ₹500 I lent you last week."
  },
  {
    targetId: "norm-15",
    hardCase: false,
    burstId: 23,
    query: "why did Aarav code fail two hours before the demo",
    targetSender: "Vikram",
    targetText: "It's failing because of that variable you renamed."
  },
  {
    targetId: "norm-16",
    hardCase: false,
    burstId: 24,
    query: "which code editor did Kabir recommend for Java",
    targetSender: "Kabir",
    targetText: "For Java? IntelliJ."
  },
  {
    targetId: "norm-17",
    hardCase: false,
    burstId: 25,
    query: "what did the team decide in the two hour corporate meeting",
    targetSender: "Priya",
    targetText: "That we'll discuss it tomorrow."
  },
  {
    targetId: "norm-18",
    hardCase: false,
    burstId: 26,
    query: "what laptop hardware specifications did Vikram purchase",
    targetSender: "Vikram",
    targetText: "16 GB RAM, 1 TB SSD, decent processor."
  },
  {
    targetId: "norm-19",
    hardCase: false,
    burstId: 27,
    query: "when does Ananya summer internship start",
    targetSender: "Ananya",
    targetText: "Next month."
  },
  {
    targetId: "norm-20",
    hardCase: false,
    burstId: 28,
    query: "what was the cause of Kabir late night programming error",
    targetSender: "Neha",
    targetText: "It's because you're passing a string where the function expects an integer."
  },
  {
    targetId: "norm-21",
    hardCase: false,
    burstId: 31,
    query: "what injury did Rohan suffer while jumping at the gym",
    targetSender: "Rohan",
    targetText: "Guys, I think I messed up my ankle at the gym."
  },
  {
    targetId: "norm-22",
    hardCase: false,
    burstId: 32,
    query: "how much does Kabir local gym membership cost per month",
    targetSender: "Kabir",
    targetText: "Is ₹2,000 a month for this gym actually worth it?"
  },
  {
    targetId: "norm-23",
    hardCase: false,
    burstId: 33,
    query: "what diet plan did Ananya start to avoid junk food",
    targetSender: "Ananya",
    targetText: "Less junk food and more home-cooked meals."
  },
  {
    targetId: "norm-24",
    hardCase: false,
    burstId: 34,
    query: "what turning point in the cricket match changed the game",
    targetSender: "Priya",
    targetText: "The turning point was definitely that catch."
  },
  {
    targetId: "norm-25",
    hardCase: false,
    burstId: 35,
    query: "why did Rohan miss the morning workout session",
    targetSender: "Rohan",
    targetText: "Okay, my motivation didn't ring either."
  },
  {
    targetId: "norm-26",
    hardCase: false,
    burstId: 37,
    query: "how far was the tire puncture repair shop from Rohan location",
    targetSender: "Rohan",
    targetText: "Google says there's one half a kilometre away."
  },
  {
    targetId: "norm-27",
    hardCase: false,
    burstId: 38,
    query: "who had the spare key when Priya was locked out at midnight",
    targetSender: "Priya",
    targetText: "Neha does, I think."
  },
  {
    targetId: "norm-28",
    hardCase: false,
    burstId: 40,
    query: "what happened to Kabir laptop right before the presentation",
    targetSender: "Kabir",
    targetText: "My laptop just froze five minutes before my presentation."
  },
  {
    targetId: "norm-29",
    hardCase: false,
    burstId: 41,
    query: "where did Neha remember leaving her wireless earbuds",
    targetSender: "Neha",
    targetText: "Wait—I remember putting them there."
  },
  {
    targetId: "norm-30",
    hardCase: false,
    burstId: 49,
    query: "what name did Sneha give to her newly adopted puppy",
    targetSender: "Sneha",
    targetText: "Milo."
  },
  {
    targetId: "norm-31",
    hardCase: false,
    burstId: 50,
    query: "what date is Aarav moving to his new apartment",
    targetSender: "Aarav",
    targetText: "Probably around the 20th."
  },
  {
    targetId: "norm-32",
    hardCase: false,
    burstId: 57,
    query: "what book did Ananya recommend for psychological mystery lovers",
    targetSender: "Ananya",
    targetText: "The Silent Patient."
  }
];

function checkZeroOverlap(query, text) {
  const qWords = new Set(query.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean));
  const tWords = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean));
  return [...qWords].filter(w => tWords.has(w));
}

// Validate in chatData.json
const chatData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../chatData.json'), 'utf8'));

const finalTargets = [];
for (const q of RAW_QUERIES) {
  const match = chatData.find(m => m.sender === q.targetSender && m.text.trim() === q.targetText.trim());
  if (!match) {
    console.error(`❌ Could not find message in chatData.json: [${q.targetSender}] "${q.targetText}"`);
    process.exit(1);
  }

  if (q.hardCase) {
    const ov = checkZeroOverlap(q.query, match.text);
    if (ov.length > 0) {
      console.error(`❌ Overlap in hard case ${q.targetId}: ${ov.join(', ')}`);
      process.exit(1);
    }
  }

  finalTargets.push({
    targetId: q.targetId,
    hardCase: q.hardCase,
    isDecisionThread: Boolean(q.isDecisionThread),
    query: q.query,
    sender: match.sender,
    text: match.text,
    timestamp: match.timestamp,
    burstId: match.burstId,
    burstTitle: match.burstTitle
  });
}

console.log(`✅ All 40 test queries validated!`);
console.log(`  - 8 Hard Cases strictly verified with 0-word overlap`);
console.log(`  - 32 Normal Cases matched to exact messages in chatData.json`);

fs.writeFileSync(path.resolve(__dirname, 'testTargets.json'), JSON.stringify(finalTargets, null, 2), 'utf8');
console.log(`💾 Saved updated targets to scripts/testTargets.json`);
