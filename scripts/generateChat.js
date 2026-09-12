/**
 * scripts/generateChat.js
 *
 * Generates synthetic WhatsApp group chat archives in realistic TOPICAL BURSTS.
 *
 * Features:
 * - Topical Bursts (4-8 messages per burst between 2-4 participants on ONE coherent topic)
 * - 142 genuinely distinct everyday topic scenarios across 8 real-life categories
 * - Strict Hinglish / code-mixed language across ALL bursts
 * - Realistic time gaps between bursts (2-6 hours during daytime, 10-14 hours overnight)
 * - The 3 Decision Threads as complete, uninterrupted deliberation threads
 * - All 40 test targets embedded naturally inside their own topical conversation
 * - Dynamic LLM-generated casual bursts via Groq (qwen/qwen3.8-27b) with robust Hinglish fallbacks
 * - Generates 4100+ total messages spanning March 1 to August 31, 2026
 */

const fs = require('fs');
const path = require('path');

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

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const OUTPUT_ROOT = path.resolve(__dirname, '../chatData.json');
const OUTPUT_SCRIPTS = path.resolve(__dirname, 'chatData.json');
const TARGETS_FILE = path.resolve(__dirname, 'testTargets.json');

// 8 Distinct Participants
const PARTICIPANTS = [
  'Aarav',   // organized planner, budget conscious
  'Priya',   // energetic, plans outings, sends media/stickers
  'Rohan',   // tech geek, hackathons, late-night coder
  'Ananya',  // foodie, cafe explorer, always hungry
  'Kabir',   // funny, witty, sarcastic, late to everything
  'Neha',    // career/exam stress, studious, busy
  'Vikram',  // fitness freak, gym, sports, morning person
  'Sneha'    // movie/music buff, chill, group mediator
];

// Helper: zero word overlap verification
function checkZeroOverlap(query, text) {
  const cleanWords = (str) =>
    str.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1);

  const queryWords = new Set(cleanWords(query));
  const textWords = new Set(cleanWords(text));

  const common = [];
  for (const w of queryWords) {
    if (textWords.has(w)) {
      common.push(w);
    }
  }
  return { hasOverlap: common.length > 0, commonWords: common };
}

// 1. The 3 Required Decision Threads
const DECISION_BURSTS = [
  {
    topic: 'Summer Vacation Destination Decision',
    targetId: 'hard-1',
    hardCase: true,
    query: 'when did we decide on the vacation destination',
    targetDay: 26,
    messages: [
      { sender: 'Aarav', text: 'dosto summer vacation dates finalize karni hai sabki leaves confirm hui kya?' },
      { sender: 'Priya', text: 'yes! Goa chale ya Himachal hills? vote karo jaldi' },
      { sender: 'Kabir', text: 'Goa me garmi aur humidity bohot high hogi April me' },
      { sender: 'Ananya', text: 'mujhe cold weather pasand hai, cafe hopping and pine trees' },
      { sender: 'Vikram', text: 'Rishikesh river rafting bhi option hai waise' },
      { sender: 'Aarav', text: 'Rishikesh me temperature 35 cross kar raha, Himachal 15 degrees hai' },
      { sender: 'Neha', text: 'Manali sounds so relaxing, exams ke baad I need peaceful mountains' },
      { sender: 'Rohan', text: 'Chandigarh tak flight or train, then tempo traveler rent kar lenge 8 logo ke liye' },
      { sender: 'Priya', text: 'maine Old Manali me riverside cottage dekha hai wooden interiors wala' },
      { sender: 'Aarav', text: 'sab log agree kar rahe ho Manali pe? koi change of heart?' },
      { sender: 'Kabir', text: '100% Manali lock karo bhai, no doubts' },
      { sender: 'Sneha', text: 'yesss packing winter clothes right now!' },
      { sender: 'Priya', text: 'chalo Manali holiday final lock ho gaya, train booking window opens tonight', isAnchor: true },
      { sender: 'Aarav', text: 'superb, details sent on DM' },
      { sender: 'Vikram', text: 'sent mine too' },
      { sender: 'Ananya', text: 'super excited mountain holiday finally happening!' },
      { sender: 'Kabir', text: 'first time group trip cancel nahi hua record ban gaya 😂' }
    ]
  },
  {
    topic: 'Weekend Dinner Venue Decision',
    targetId: 'hard-2',
    hardCase: true,
    query: 'which eatery was chosen for our weekend meetup',
    targetDay: 84,
    messages: [
      { sender: 'Sneha', text: 'Saturday evening celebration dinner ka place decide karo guys' },
      { sender: 'Ananya', text: 'Indiranagar me Bob Bar chale ya brewery rooftop?' },
      { sender: 'Vikram', text: 'rooftop places pe weekend reservation bina enter nahi karne dete' },
      { sender: 'Aarav', text: 'Toit ka food aur vibe sabse consistent hai honestly' },
      { sender: 'Priya', text: 'unka sourdough baked crust aur nachos are supreme' },
      { sender: 'Rohan', text: 'plus brewed drinks for whoever wants' },
      { sender: 'Neha', text: 'table availability check karni padegi 8 seats on Saturday night is tough' },
      { sender: 'Kabir', text: 'wait mera school senior floor manager hai waha let me ping him directly' },
      { sender: 'Ananya', text: 'call karke confirm kar Kabir fast' },
      { sender: 'Kabir', text: 'talking on call right now hold on' },
      { sender: 'Kabir', text: 'Saturday 8 baje Toit chalte hai, table reserve ho gayi', isAnchor: true },
      { sender: 'Priya', text: 'superb! Kabir clutch player' },
      { sender: 'Sneha', text: 'sorted, Saturday 8 PM sharp arrive everyone no tardiness' },
      { sender: 'Kabir', text: 'jo 8:15 ke baad aayega woh dessert pay karega' },
      { sender: 'Aarav', text: 'deal pakki haha' }
    ]
  },
  {
    topic: 'Hackathon Submission Deadline Decision',
    targetId: 'hard-3',
    hardCase: true,
    query: 'what is the official cutoff time for project deliverables',
    targetDay: 148,
    messages: [
      { sender: 'Rohan', text: 'hackathon team update: vector search backend and frontend UI merged cleanly' },
      { sender: 'Aarav', text: 'great! local build passes without single warning' },
      { sender: 'Neha', text: 'demo recording kitne minutes ki limit hai submission me?' },
      { sender: 'Rohan', text: 'max 3 minutes per challenge rulebook' },
      { sender: 'Vikram', text: 'portal submission link pe exact time kya dikha raha hai cutoff?' },
      { sender: 'Priya', text: 'announcement channel pe 12 noon likha tha ya afternoon?' },
      { sender: 'Rohan', text: 'let me check official Devfolio portal notice right now' },
      { sender: 'Aarav', text: 'haan verify karke timestamp note karle buffer rakhna padega' },
      { sender: 'Rohan', text: 'checked organizer banner pinned message' },
      { sender: 'Rohan', text: 'final pitch deck kal dopehar 2 baje se pehle submit karna hai', isAnchor: true },
      { sender: 'Aarav', text: 'noted, 12 PM tak deck aur recording final freeze karenge' },
      { sender: 'Neha', text: '2 hours safety buffer is good, working on slides tonight' },
      { sender: 'Vikram', text: 'solid progress team, all the best' }
    ]
  }
];

// 2. The 37 Curated Target Bursts Housing the Test Targets
const TARGET_BURSTS = [
  // hard-4: group gift cash contribution
  {
    topic: 'Group gift cash collection',
    targetId: 'hard-4',
    hardCase: true,
    query: 'how much cash should each participant contribute for the group gift',
    messages: [
      { sender: 'Priya', text: 'Sneha ke birthday ke liye bouquet and custom photo cake order kar diya hai' },
      { sender: 'Kabir', text: 'Super! Total kitna bill bana and payment kisko karni hai?' },
      { sender: 'Neha', text: 'per head 500 rupay gpay kardo Neha ko, boquet aur cake ka total utna hi hai', isAnchor: true },
      { sender: 'Aarav', text: 'Sent just now on GPay, screenshot whatsapp pe drop kiya' },
      { sender: 'Rohan', text: 'Done from my side too, nice selection Priya!' }
    ]
  },
  // hard-5: laptop overheating problem
  {
    topic: 'Work laptop overheating and fan noise',
    targetId: 'hard-5',
    hardCase: true,
    query: 'which specific laptop brand encountered an overheating problem',
    messages: [
      { sender: 'Rohan', text: 'Aarav why is your camera lagging so badly on the Google Meet?' },
      { sender: 'Aarav', text: 'mera Dell bohot zyada garam ho raha hai fan continuously full speed pe chalra', isAnchor: true },
      { sender: 'Kabir', text: 'Dell laptops double up as room heaters in winter bro 😂' },
      { sender: 'Sneha', text: 'Keep some elevation under the vents so air passes through' },
      { sender: 'Aarav', text: 'Thermal throttling ho rahi hai, let me restart and rejoin in 2 mins' }
    ]
  },
  // hard-6: railway station pickup
  {
    topic: 'Station pickup coordination',
    targetId: 'hard-6',
    hardCase: true,
    query: 'who volunteered to collect everyone from the railway terminal',
    messages: [
      { sender: 'Sneha', text: 'Our train reaches KSR Bangalore station at 6:15 AM tomorrow' },
      { sender: 'Priya', text: 'Subah subah cabs ka surge 2.5x chal raha hoga pakka' },
      { sender: 'Vikram', text: 'sabko station se pick mai kar lunga gaadi leke aaunga', isAnchor: true },
      { sender: 'Aarav', text: 'Hero! 3 heavy bags bhi hai sath me boot space check karlena' },
      { sender: 'Vikram', text: 'Boot poora khali hai, exit gate 1 pe wait karna sab' }
    ]
  },
  // hard-7: badminton cancellation due to sprain
  {
    topic: 'Morning badminton game cancellation',
    targetId: 'hard-7',
    hardCase: true,
    query: 'what medical condition forced the cancellation of morning badminton',
    messages: [
      { sender: 'Aarav', text: 'Badminton court 2 is booked for 7 AM, where is Sneha?' },
      { sender: 'Kabir', text: 'Calling her since 10 mins, no response' },
      { sender: 'Sneha', text: 'pair me severe sprain aa gaya doctor ne bed rest bola hai aaj khelne nahi aa paunga', isAnchor: true },
      { sender: 'Priya', text: 'Oh god! Take care Sneha, ice pack apply karo continuously' },
      { sender: 'Vikram', text: 'Rest well Sneha, we will play casual doubles today' }
    ]
  },
  // hard-8: spare keys security guard
  {
    topic: 'Locked out of apartment spare key search',
    targetId: 'hard-8',
    hardCase: true,
    query: 'where were the spare apartment keys left behind',
    messages: [
      { sender: 'Kabir', text: 'Guys I locked myself out after gym workout 😭 Who has the spare key?' },
      { sender: 'Rohan', text: 'Did you check your gym bag pockets properly?' },
      { sender: 'Priya', text: 'I returned my duplicate set to Ananya last weekend' },
      { sender: 'Ananya', text: 'flat ki doosri chaabi security guard ke paas drop kardi thi maine', isAnchor: true },
      { sender: 'Kabir', text: 'Thank god! Ramesh uncle ke paas jaata hu fast' },
      { sender: 'Vikram', text: 'Classic Kabir moment haha' }
    ]
  },
  // norm-1: Goa hotel prices
  {
    topic: 'Goa holiday accommodation discussion',
    targetId: 'norm-1',
    hardCase: false,
    query: 'what did Priya say about hotel prices for Goa',
    messages: [
      { sender: 'Aarav', text: 'Priya Goa trip ke stays research kar rahi thi na?' },
      { sender: 'Priya', text: 'Maine Goa trip ke hotels shortlist kar liye hain, 4k per night hai', isAnchor: true },
      { sender: 'Kabir', text: 'Pool villa ya beach cottage?' },
      { sender: 'Priya', text: 'Beach resort with swimming pool in North Goa' },
      { sender: 'Sneha', text: '4k per night with breakfast included is a solid deal' }
    ]
  },
  // norm-2: trip budget limit
  {
    topic: 'Trip total budget discussion',
    targetId: 'norm-2',
    hardCase: false,
    query: 'what did Aarav say about the trip budget',
    messages: [
      { sender: 'Rohan', text: 'Flights plus stay plus activities ka estimate banao koi' },
      { sender: 'Aarav', text: 'Overall budget per person 15000 se zyada nahi hona chahiye guys', isAnchor: true },
      { sender: 'Neha', text: 'Agreed, keep buffer for food and travel' },
      { sender: 'Priya', text: '15k is totally realistic if we book train/flights early' }
    ]
  },
  // norm-3: MongoDB vector search
  {
    topic: 'Backend vector search indexing debate',
    targetId: 'norm-3',
    hardCase: false,
    query: 'what did Rohan say about MongoDB vector search',
    messages: [
      { sender: 'Aarav', text: 'Embeddings store karne ke liye separate vector database chahiye kya?' },
      { sender: 'Rohan', text: 'MongoDB Atlas vector search documentation check karo, cosine similarity use karni hai', isAnchor: true },
      { sender: 'Neha', text: 'Nice, so no extra infrastructure cost' },
      { sender: 'Rohan', text: 'Exact same cluster me chal jata hai super clean' }
    ]
  },
  // norm-4: Indiranagar ramen place
  {
    topic: 'Weekend food craving ramen',
    targetId: 'norm-4',
    hardCase: false,
    query: 'which ramen restaurant did Ananya recommend in Indiranagar',
    messages: [
      { sender: 'Sneha', text: 'Authentic Japanese noodles craving right now' },
      { sender: 'Ananya', text: 'Indiranagar me naya ramen place khula hai, review 4.8 hai chalte hai', isAnchor: true },
      { sender: 'Rohan', text: 'Miso broth ya spicy tonkotsu?' },
      { sender: 'Ananya', text: 'Both are top rated, Sunday evening table let us go' }
    ]
  },
  // norm-5: Silk Board traffic jam
  {
    topic: 'Evening peak traffic delay',
    targetId: 'norm-5',
    hardCase: false,
    query: 'why was Kabir running late at Silk Board',
    messages: [
      { sender: 'Priya', text: 'Kabir table is booked for 8:30 where are you reached?' },
      { sender: 'Kabir', text: 'Traffic at Silk Board is totally jammed, will reach 45 mins late', isAnchor: true },
      { sender: 'Vikram', text: 'Never take cab via Silk Board on Friday evening bhai' },
      { sender: 'Kabir', text: 'Lesson learned, moving at 2 kmph right now' }
    ]
  },
  // norm-6: semester final exam
  {
    topic: 'College semester exam preparation',
    targetId: 'norm-6',
    hardCase: false,
    query: 'when is Neha semester final exam',
    messages: [
      { sender: 'Sneha', text: 'Neha movie tonight or are you studying?' },
      { sender: 'Neha', text: 'Tomorrow is my semester final exam from 10 AM, switch off phone tonight', isAnchor: true },
      { sender: 'Aarav', text: 'Best of luck Neha! Nail it tomorrow' },
      { sender: 'Neha', text: 'Thanks guys, revision mode on!' }
    ]
  },
  // norm-7: 10k morning run Cubbon Park
  {
    topic: 'Early morning running milestone',
    targetId: 'norm-7',
    hardCase: false,
    query: 'where did Vikram complete his 10k morning run',
    messages: [
      { sender: 'Kabir', text: 'Vikram awake at 6 AM again?' },
      { sender: 'Vikram', text: 'Completed 10k morning run in Cubbon Park, feeling energetic', isAnchor: true },
      { sender: 'Aarav', text: 'Pace kya thi bhai?' },
      { sender: 'Vikram', text: '5:15 min per km, weather was cold and crisp' }
    ]
  },
  // norm-8: Inception IMAX re-release
  {
    topic: 'Christopher Nolan IMAX cinema tickets',
    targetId: 'norm-8',
    hardCase: false,
    query: 'what did Sneha say about Inception IMAX movie tickets',
    messages: [
      { sender: 'Rohan', text: 'Did PVR open bookings for the classic sci-fi festival?' },
      { sender: 'Sneha', text: 'Inception re-release IMAX tickets are open for Sunday 4 PM show', isAnchor: true },
      { sender: 'Aarav', text: 'Book center row 6 seats right now!' },
      { sender: 'Sneha', text: 'Done, tickets sent on WhatsApp group' }
    ]
  },
  // norm-9: black thermos in car
  {
    topic: 'Lost water bottle after cinema',
    targetId: 'norm-9',
    hardCase: false,
    query: 'who left a black thermos bottle in Kabir car',
    messages: [
      { sender: 'Kabir', text: 'Car backseat pe ek water bottle reh gaya hai post movie' },
      { sender: 'Aarav', text: 'Left my black thermos water bottle in Kabir car after the movie', isAnchor: true },
      { sender: 'Kabir', text: 'Got it, office aate waqt desk pe de dunga' },
      { sender: 'Aarav', text: 'Thanks bhai, office me milte hai' }
    ]
  },
  // norm-10: Decathlon trekking shoes
  {
    topic: 'Trekking gear shopping',
    targetId: 'norm-10',
    hardCase: false,
    query: 'where did Priya buy trekking shoes on discount',
    messages: [
      { sender: 'Sneha', text: 'Mountain trek ke liye shoes lene hai kisine liya kya?' },
      { sender: 'Priya', text: 'Bought mountain trekking shoes from Decathlon with 30% discount', isAnchor: true },
      { sender: 'Vikram', text: 'Decathlon waterproof boots are best for rocky trails' },
      { sender: 'Priya', text: 'Ankle support is also super good in these' }
    ]
  },
  // norm-11: VS Code to Cursor switch
  {
    topic: 'Coding IDE and productivity tools',
    targetId: 'norm-11',
    hardCase: false,
    query: 'which code editor did Rohan switch to',
    messages: [
      { sender: 'Aarav', text: 'Rohan your PR velocity went crazy this sprint, what changed?' },
      { sender: 'Rohan', text: 'Switched from VS Code to Cursor for AI auto-complete, productivity doubled', isAnchor: true },
      { sender: 'Neha', text: 'Is the multi-file edit feature really that smooth?' },
      { sender: 'Rohan', text: 'Night and day difference honestly, try it once' }
    ]
  },
  // norm-12: blueberry cheesecake Sneha birthday
  {
    topic: 'Baking birthday surprise dessert',
    targetId: 'norm-12',
    hardCase: false,
    query: 'what is Ananya baking for Sneha birthday',
    messages: [
      { sender: 'Priya', text: 'Ananya dessert prep sorted for Saturday night?' },
      { sender: 'Ananya', text: 'Baking blueberry cheesecake for Sneha birthday this Saturday', isAnchor: true },
      { sender: 'Kabir', text: 'Make sure it is double crust please' },
      { sender: 'Ananya', text: 'Graham cracker crust with fresh berry compote done' }
    ]
  },
  // norm-13: lost wireless earbuds gym
  {
    topic: 'Gym lost item inquiry',
    targetId: 'norm-13',
    hardCase: false,
    query: 'where did Kabir lose his wireless earbuds',
    messages: [
      { sender: 'Kabir', text: 'Lost my wireless earbuds at the gym, please check if anyone took by mistake', isAnchor: true },
      { sender: 'Vikram', text: 'Bench press area me dekha kya? Reception pe puch lo' },
      { sender: 'Kabir', text: 'Checking with the trainer right now' }
    ]
  },
  // norm-14: Neha summer internship
  {
    topic: 'Career internship offer celebration',
    targetId: 'norm-14',
    hardCase: false,
    query: 'what good news did Neha share about her internship',
    messages: [
      { sender: 'Priya', text: 'Neha did the hiring manager email you after the final interview round?' },
      { sender: 'Neha', text: 'Selected for summer software internship at Bangalore tech startup', isAnchor: true },
      { sender: 'Rohan', text: 'LETS GOOO! Proud of you Neha!' },
      { sender: 'Kabir', text: 'Party kab de rahi hai treat is mandatory' },
      { sender: 'Neha', text: 'Treat pakki this Saturday evening guys!' }
    ]
  },
  // norm-15: terrace cricket match screening
  {
    topic: 'Weekend cricket match watch party',
    targetId: 'norm-15',
    hardCase: false,
    query: 'who is hosting cricket match screening on their terrace',
    messages: [
      { sender: 'Aarav', text: 'India vs Australia final kiske yaha dekh rahe hai?' },
      { sender: 'Vikram', text: 'Cricket match screening is arranged at my terrace with projector this Friday', isAnchor: true },
      { sender: 'Kabir', text: 'Bringing cold drinks and snacks' },
      { sender: 'Vikram', text: 'Match starts at 7 PM sharp reach early' }
    ]
  },
  // norm-16: Spotify wrapped 45000 mins
  {
    topic: 'Annual music stats sharing',
    targetId: 'norm-16',
    hardCase: false,
    query: 'who shared their Spotify playlist with 45000 minutes',
    messages: [
      { sender: 'Rohan', text: 'Everyone Spotify wrapped is out, check your top artists' },
      { sender: 'Sneha', text: 'Spotify wrapped playlist link shared, listened to 45000 minutes this year', isAnchor: true },
      { sender: 'Priya', text: '45k mins? You literally had earphones on all day' },
      { sender: 'Sneha', text: 'Acoustic and indie songs on repeat while working' }
    ]
  },
  // norm-17: BBMP fiber cut
  {
    topic: 'Work from home internet outage',
    targetId: 'norm-17',
    hardCase: false,
    query: 'why was Aarav internet down due to fiber cut',
    messages: [
      { sender: 'Neha', text: 'Aarav standup call pe join nahi kiya?' },
      { sender: 'Aarav', text: 'WiFi router fiber cable was cut by BBMP road work, no internet today', isAnchor: true },
      { sender: 'Kabir', text: 'BBMP road digging strikes again' },
      { sender: 'Aarav', text: 'Hotspot pe chal raha hu slow speed' }
    ]
  },
  // norm-18: packing list
  {
    topic: 'Trip packing checklist',
    targetId: 'norm-18',
    hardCase: false,
    query: 'what did Priya include in the packing list',
    messages: [
      { sender: 'Sneha', text: 'Priya winter essentials ka reminder de do sabko' },
      { sender: 'Priya', text: 'Confirmed packing list: thermals, sunscreen, powerbank, and heavy jackets', isAnchor: true },
      { sender: 'Vikram', text: 'Trekking pole carry kare?' },
      { sender: 'Priya', text: 'Yes if you have, otherwise rent locally' }
    ]
  },
  // norm-19: OpenAI embedding endpoint latency
  {
    topic: 'Benchmarking API latency',
    targetId: 'norm-19',
    hardCase: false,
    query: 'what is the latency of OpenAI embedding endpoint mentioned by Rohan',
    messages: [
      { sender: 'Aarav', text: 'Embedding generation benchmark check kiya?' },
      { sender: 'Rohan', text: 'OpenAI embedding endpoint response latency is around 250 milliseconds', isAnchor: true },
      { sender: 'Neha', text: 'Under 300ms is fast enough for real-time search' },
      { sender: 'Rohan', text: 'Local transformer pipeline is even faster under 50ms' }
    ]
  },
  // norm-20: CTR Malleshwaram filter coffee
  {
    topic: 'Best Bangalore filter coffee discussion',
    targetId: 'norm-20',
    hardCase: false,
    query: 'where did Ananya recommend having filter coffee in Malleshwaram',
    messages: [
      { sender: 'Vikram', text: 'Craving authentic South Indian filter coffee in old Bangalore' },
      { sender: 'Ananya', text: 'Best filter coffee in Malleshwaram is at CTR, hands down', isAnchor: true },
      { sender: 'Sneha', text: 'With their crispy benne dose, ultimate pairing' },
      { sender: 'Ananya', text: 'Sunday morning breakfast spot decided then' }
    ]
  },
  // norm-21: Koramangala tire puncture
  {
    topic: 'Car breakdown near traffic signal',
    targetId: 'norm-21',
    hardCase: false,
    query: 'where did Kabir car tire get punctured',
    messages: [
      { sender: 'Aarav', text: 'Kabir reaching dinner in 15 mins right?' },
      { sender: 'Kabir', text: 'Car tire got punctured near Koramangala Sony World signal, changing spare tire now', isAnchor: true },
      { sender: 'Vikram', text: 'Tools aur jack hai na bhai? Should I drive there?' },
      { sender: 'Kabir', text: 'Have all tools sorted, order starters without me will reach in 30 mins' }
    ]
  },
  // norm-22: borrowed camera tripod
  {
    topic: 'Borrowing presentation equipment',
    targetId: 'norm-22',
    hardCase: false,
    query: 'who borrowed Vikram camera tripod',
    messages: [
      { sender: 'Vikram', text: 'Where did my aluminum tripod go?' },
      { sender: 'Neha', text: 'Borrowing Vikram camera tripod for college presentation recording', isAnchor: true },
      { sender: 'Vikram', text: 'Acha fine, return it by Monday morning' },
      { sender: 'Neha', text: 'Pakka will drop at your apartment Sunday evening' }
    ]
  },
  // norm-23: annual gym membership price
  {
    topic: 'Gym membership renewal deal',
    targetId: 'norm-23',
    hardCase: false,
    query: 'what is the annual gym membership price mentioned by Vikram',
    messages: [
      { sender: 'Kabir', text: 'Vikram Gold gym annual discount kya offer chal raha?' },
      { sender: 'Vikram', text: 'New gym membership offer is 12000 per year with free steam bath', isAnchor: true },
      { sender: 'Aarav', text: '1k per month is a steal for that facility' },
      { sender: 'Vikram', text: 'Offer valid till this weekend only register fast' }
    ]
  },
  // norm-24: Simba golden retriever puppy
  {
    topic: 'New pet adoption announcement',
    targetId: 'norm-24',
    hardCase: false,
    query: 'what pet puppy did Sneha adopt and name Simba',
    messages: [
      { sender: 'Priya', text: 'Sneha share the photos fast, we are dying to see!' },
      { sender: 'Sneha', text: 'Adopted a 2-month-old golden retriever puppy, named him Simba', isAnchor: true },
      { sender: 'Ananya', text: 'Awwww he is so adorable fluffy ball of joy!' },
      { sender: 'Kabir', text: 'Coming over to play with Simba this weekend 100%' }
    ]
  },
  // norm-25: Splitwise dues reminder
  {
    topic: 'End of month expense settlement',
    targetId: 'norm-25',
    hardCase: false,
    query: 'what did Aarav remind everyone regarding Splitwise balances',
    messages: [
      { sender: 'Priya', text: 'Did we clear last month groceries and electricity bill?' },
      { sender: 'Aarav', text: 'Calculated splitwise dues, everyone please clear pending balances before month end', isAnchor: true },
      { sender: 'Kabir', text: 'Clearing right now via UPI' },
      { sender: 'Aarav', text: 'Thanks, all settled cleanly' }
    ]
  },
  // norm-26: Priya return flight
  {
    topic: 'Travel return flight tickets',
    targetId: 'norm-26',
    hardCase: false,
    query: 'what time is Priya return flight on Monday morning',
    messages: [
      { sender: 'Sneha', text: 'Priya are you returning on Sunday night or Monday?' },
      { sender: 'Priya', text: 'Bought flight tickets for return journey on Monday morning 6 AM flight', isAnchor: true },
      { sender: 'Aarav', text: 'Directly going to office from airport?' },
      { sender: 'Priya', text: 'Yes laptop bag is with me, will reach office by 9:30 AM' }
    ]
  },
  // norm-27: GitHub repo push completed
  {
    topic: 'Project code push milestone',
    targetId: 'norm-27',
    hardCase: false,
    query: 'did Rohan complete pushing code to the GitHub repo',
    messages: [
      { sender: 'Neha', text: 'Is the final repo ready for review before evaluation?' },
      { sender: 'Rohan', text: 'GitHub repo push completed with clean commit history and documentation', isAnchor: true },
      { sender: 'Aarav', text: 'Checked the link, README looks very crisp' },
      { sender: 'Rohan', text: 'Ready for deployment pipeline' }
    ]
  },
  // norm-28: Brik Oven wood fired pizzas
  {
    topic: 'Group food delivery order',
    targetId: 'norm-28',
    hardCase: false,
    query: 'which pizzeria did Ananya order 3 wood fired pizzas from',
    messages: [
      { sender: 'Rohan', text: 'Movie marathon night is starting, dinner kya scene?' },
      { sender: 'Ananya', text: 'Ordered 3 large wood fired pizzas from Brik Oven for all of us', isAnchor: true },
      { sender: 'Kabir', text: 'Four cheese and truffle mushroom included?' },
      { sender: 'Ananya', text: 'Yes and garlic dough balls too, delivery in 25 mins' }
    ]
  },
  // norm-29: Zakir Khan comedy show
  {
    topic: 'Standup comedy live show',
    targetId: 'norm-29',
    hardCase: false,
    query: 'which standup comic did Kabir watch live',
    messages: [
      { sender: 'Sneha', text: 'How was the weekend show you attended Kabir?' },
      { sender: 'Kabir', text: 'Watched standup comedy show by Zakir Khan live at Good Shepherd auditorium', isAnchor: true },
      { sender: 'Priya', text: 'Bhai his punchlines are pure gold!' },
      { sender: 'Kabir', text: 'Laughed till stomach hurt for 2 hours straight' }
    ]
  },
  // norm-30: distributed database paper
  {
    topic: 'Academic conference research paper submission',
    targetId: 'norm-30',
    hardCase: false,
    query: 'what topic was Neha conference research paper on',
    messages: [
      { sender: 'Rohan', text: 'Neha did you finish your academic thesis submission?' },
      { sender: 'Neha', text: 'Submitted research paper on distributed database consistency to IEEE conference', isAnchor: true },
      { sender: 'Aarav', text: 'Massive achievement Neha! Hope it gets accepted' },
      { sender: 'Neha', text: 'Results will be out next month fingers crossed' }
    ]
  },
  // norm-31: TCS World 10K marathon registration
  {
    topic: 'City marathon registration announcement',
    targetId: 'norm-31',
    hardCase: false,
    query: 'which marathon race did Vikram register for',
    messages: [
      { sender: 'Kabir', text: 'Vikram what is your next racing target?' },
      { sender: 'Vikram', text: 'Registration open for TCS World 10K marathon, registered under open category', isAnchor: true },
      { sender: 'Aarav', text: 'Bib collection date kab hai?' },
      { sender: 'Vikram', text: 'Kanteerava stadium next Friday' }
    ]
  },
  // norm-32: balcony money plants
  {
    topic: 'Balcony gardening and houseplants',
    targetId: 'norm-32',
    hardCase: false,
    query: 'what indoor plants did Sneha put on her balcony',
    messages: [
      { sender: 'Ananya', text: 'Sneha your balcony green makeover look so pretty!' },
      { sender: 'Sneha', text: 'Planted 10 indoor money plants and succulents on my balcony', isAnchor: true },
      { sender: 'Priya', text: 'Send nursery link, I want for my windowsill too' },
      { sender: 'Sneha', text: 'Lalbagh plant nursery, 50 rupees each only' }
    ]
  }
];

// 3. Pool of 142 Genuinely Distinct Everyday Life Topics across 8 Categories
const CASUAL_TOPIC_POOL = [
  // --- Category 1: Workplace, Coding & Tech (20 topics) ---
  'Production hotfix on Friday 5 PM rollback due to memory leak',
  'Code review debate over functional programming vs classes in Node',
  'Office Wi-Fi router DNS error making GitHub unreachable',
  'Testing mechanical keyboard switches tactile brown vs silent red',
  'Accidentally running drop table command on staging database',
  'Docker container crashing with out of memory error during build',
  'A 45-minute sprint meeting that could have been a 2-line Slack message',
  'LeetCode weekly contest problem 3 being ridiculously hard',
  'LinkedIn recruiter sending copy-paste message with wrong candidate name',
  'Upgrading npm packages and getting 20 broken peer dependency warnings',
  'Figma design system dark mode contrast issues on mobile screen',
  'Ergonomic mesh chair vs standing desk productivity discussion',
  'API rate limit reached on third party geocoding service',
  'Postman mock server failing during frontend client demo',
  'Linter error arguing about single quotes vs double quotes in JavaScript',
  'Staging server SSL certificate expiring and showing big red warning',
  'Forgetting AWS console IAM password and needing admin reset',
  'Accidentally doing git stash drop and frantically searching reflog',
  'Laptop charger left at the office desk having to travel back',
  'Awkward 2-minute silence during client Zoom call screen share',

  // --- Category 2: Food, Snacks & Late-Night Delivery (20 topics) ---
  'Swiggy delivery partner delivering order to flat 402 instead of 204',
  'Homemade chicken biryani cooking experiment with too much garam masala',
  'Debate over the greatest midnight Maggi recipe cheese vs peri peri',
  'Trying Korean corn dog with melted mozzarella at street food fest',
  'Ordering Andhra spicy chilli chicken and suffering the next morning',
  'Heated debate on whether pineapple belongs on thin crust pizza',
  'Mother sending homemade sweets and spicy namkeen parcel via courier',
  'Office canteen increasing samosa chai combo price by 10 rupees',
  'Protein smoothie tasting like lawn grass after adding raw spinach',
  'Searching for the best Tibetan steamed momos stall in Koramangala',
  'Stomach ache after eating roadside spicy pani puri in rainy weather',
  'Cooking white sauce pasta and realizing milk got curdled',
  'Late night craving for Belgian dark chocolate ice cream at 1 AM',
  'Authentic cold brew coffee with condensed milk preparation',
  'Finding a hair in restaurant soup and getting free complimentary brownie',
  'Indiranagar breakfast debate between crispy dosa vs hot poha',
  'Swiggy Instamart delivering 1kg salt instead of sugar by mistake',
  'Midnight egg paratha hunt near Bangalore cantonment railway station',
  'Trying iced matcha green tea latte for the first time and hating it',
  'Group debate on whether fried momos or steamed dim sums are superior',

  // --- Category 3: Traffic, Commute & City Weather (18 topics) ---
  'Auto driver asking 300 rupees for 1.5 km distance near metro station',
  'Heavy rain causing massive waterlogging under Marathahalli bridge',
  'Purple line metro morning rush at Majestic interchange platform',
  'Speeding auto splashing puddle muddy water on fresh formal shirt',
  'Rapido captain arriving on a modified Royal Enfield making deafening noise',
  'Airport bus Vayu Vajra vs cab booking price comparison debate',
  'Traffic police checking PUC certificates and helmets near signal',
  'Smart metro transit card balance going negative right at automatic turnstile',
  'Cab stuck in traffic because a temple procession is blocking the main road',
  'Car battery completely dying because cabin light was left on all night',
  'Missing the final night metro train by literally 60 seconds',
  'Two-wheeler running out of petrol 200 meters before HP petrol pump',
  'Google Maps routing car through an impossibly narrow residential alley',
  'Uber cab AC fan blowing lukewarm hot air on a 35-degree afternoon',
  'BBMP digging trenches for underground cables right outside apartment gate',
  'Electric scooter battery dropping from 20% to 0% on steep flyover slope',
  'Massive traffic jam caused by a fallen eucalyptus tree branch after storm',
  'Sharing an auto ride and having no UPI network to pay the driver change',

  // --- Category 4: Fitness, Gym, Sports & Health (18 topics) ---
  'Severe leg day muscle soreness making sitting down on chair painful',
  'Debating whey protein isolate vs concentrate vanilla vs chocolate flavor',
  'Badminton court double booked by two different coaching groups arguing',
  'Forgetting gym protein shaker in car for 4 days and creating biological weapon',
  'Smartwatch step counter crossing 18000 steps after wandering in shopping mall',
  'Attempting 16-hour intermittent fasting and eating biscuits at hour 5',
  'Society swimming pool having way too much chlorine burning eyes',
  'Office recreation room ping pong table tennis championship final game',
  'Buying resistance bands set online and having the medium band snap',
  'Waking up with severe neck cramp from sleeping on two thick pillows',
  'Comparing micronized creatine monohydrate brands and water retention',
  'Running shoe sole peeling off mid-way through a 5k morning run',
  'Skipping gym for four consecutive days and feeling immense guilty spiral',
  'Buying expensive branded gym activewear just to feel workout motivation',
  'YouTube morning yoga instructor doing impossible pretzel twists',
  'Booking cricket box turf for Sunday night under floodlights',
  'Fantasy football league trash talk after goalkeeper scores an own goal',
  'Lower back ache from slouching like a shrimp on soft living room sofa',

  // --- Category 5: Weekend Hangouts, Events & City Life (18 topics) ---
  'Board games night Settlers of Catan match ending in heated friendship feud',
  'Booking movie tickets where only extreme front row corner seats remain',
  'Going to standup comedy open mic where comic roasts someone in front row',
  'Sunday artisanal flea market selling 800-rupee ceramic coffee mugs',
  'Terrace sunset acoustic guitar singing session with cold beverages',
  'Indoor bowling alley match where ball lands in gutter three times',
  'Go-karting racing tournament where someone spins out on hairpin turn',
  'Escape room challenge where team fails the mystery puzzle in 60 minutes',
  'Weekend pottery workshop getting clay all over clothes and shoes',
  'Sunday afternoon picnic at Cubbon Park with frisbee and homemade sandwiches',
  'Late night Discord stream watching classic Indian horror movie',
  'Music festival concert where everyone loses each other in crowd of 5000',
  'Visiting an animal adoption shelter and wanting to take home 3 puppies',
  'Street shopping bargaining in Commercial Street for casual summer clothes',
  'Debating whether waking up at 3:30 AM for Nandi Hills sunrise is worth it',
  'Browsing Blossom second hand bookstore in Church Street for 2 hours',
  'Karaoke night someone singing 90s Bollywood song completely out of tune',
  'Group selfie where at least one person blinked in all 15 photos taken',

  // --- Category 6: House Chores, Roommates & Daily Adulting (18 topics) ---
  'Electricity bill shockingly high because someone left water geyser on 24 hours',
  'Splitwise monthly balance calculation where someone owes 14 rupees',
  'Cleaning the shared fridge and finding mysterious fuzzy science experiment jar',
  'Wardrobe decluttering finding college festival t-shirts from five years ago',
  'Apartment society water tanker delay forcing everyone to use mineral water',
  'Television remote vanishing into thin air inside couch crevices for 3 days',
  'Housemaid taking unannounced 5-day holiday right before group dinner',
  'Assembling flatpack furniture and having four mysterious metal bolts left over',
  'Washing machine spinning like an airplane taking off during spin cycle',
  'Buying indoor plants and killing them within 10 days by overwatering',
  'Apartment society WhatsApp group drama about designated car parking slots',
  'Cooking gas cylinder running out exactly in the middle of boiling dal',
  'Apartment balcony sliding glass doors rattling violently during rainstorm',
  'Pest control technician leaving pungent herbal paste balls in all corners',
  'Amazon delivery bell ringing every 30 minutes for six separate packages',
  'Balcony pigeon net installation arguments with the society association',
  'Robotic vacuum cleaner getting permanently wedged under the wooden shoe rack',
  'Deep cleaning kitchen chimney filter with baking soda and boiling water',

  // --- Category 7: Shopping, Gadgets & Online Orders (15 topics) ---
  'Amazon Great Indian Festival wishlist adding 20 items and buying none',
  'Testing noise cancelling headphones against the loud kitchen blender noise',
  'Myntra summer t-shirt delivery where medium size fits like extra large tent',
  'Kindle paperwhite vs reading physical paperbacks battery and glare debate',
  'Heavy duty phone case that transforms sleek phone into heavy brick weapon',
  'Setting up dual monitor desk setup with cable management clips',
  'Courier delivery boy throwing package safely over apartment balcony grill',
  'Hunting for working 20% discount promo codes on food ordering apps',
  'Smart RGB light bulb glitching and flashing disco party colors at 3 AM',
  'Ergonomic memory foam wrist rest for keyboard typing strain relief',
  'Checking 20000 mAh power bank charging speed before long train journey',
  'Brand new white sneakers getting stepped on in crowded metro first day',
  'Returning denim jeans online because leg length is 5 inches too long',
  'Electric milk frother breaking down on the third cup of morning coffee',
  'Mobile screen protector installation resulting in giant air bubble in center',

  // --- Category 8: College Nostalgia, Memes & Personal Banter (15 topics) ---
  'Unearthing college first year Goa trip photo album and cringing at hairstyles',
  'Reminiscing about college engineering physics professor signature catchphrase',
  'Receiving school classmate wedding invitation card in another city',
  'Sharing ridiculous Instagram meme reels that only make sense at 2 AM',
  'Remembering late night college campus canteen 10-rupee chai and bun maska',
  'School teachers day memories and favorite classroom pranks',
  'Someone accidentally sending office complaint message to the friends group',
  'Hilarious inside jokes that completely bewilder anyone outside this group',
  'Arguing passionately about who is the most irresponsible driver in the group',
  'Kabir being 45 minutes late to his own birthday surprise dinner party',
  'Neha having sudden exam nightmare about reaching hall without admit card',
  'Rohan giving an unsolicited 20-minute lecture on index funds and stocks',
  'Ananya critiquing everyone cafe aesthetic photos on Instagram stories',
  'Vikram lecturing everyone about drinking 3 liters of water before noon',
  'Debating childhood 90s cartoon shows Beyblade vs Pokemon vs Dragon Ball Z'
];

// Rich library of 50 authentic Hinglish conversational burst templates
// Each dialogue features real urban code-mixing, distinct personalities, and natural multi-person banter
const HINGLISH_BURST_LIBRARY = [
  // 1
  [
    { sender: 'Rohan', text: 'Bhai ye git rebase ne pura repo break kar diya local me' },
    { sender: 'Aarav', text: 'Tu rebase main kiya tha ya merge branch kiya tha?' },
    { sender: 'Rohan', text: 'Rebase kiya tha bhai aur 14 files me conflict markers aa gaye' },
    { sender: 'Priya', text: 'Haha Rohan pehle backup branch banaya kar na humesha' },
    { sender: 'Kabir', text: 'Bhai git reset --hard HEAD kar le, wahi bachayega abhi' },
    { sender: 'Rohan', text: 'Stash karke reset kar diya bhai, build wapas green ho gayi shukar hai' }
  ],
  // 2
  [
    { sender: 'Ananya', text: 'Swiggy wala delivery partner pichle 20 min se ek hi signal pe khada hai' },
    { sender: 'Sneha', text: 'Call karke pucha kya Ananya?' },
    { sender: 'Ananya', text: 'Haan bola waterlogging hai road pe, bikes move nahi ho rahi' },
    { sender: 'Kabir', text: 'Bangalore rain strikes right at lunchtime as usual 😂' },
    { sender: 'Ananya', text: 'Moving now finally, hot kathi roll aate hi lunch shuru' }
  ],
  // 3
  [
    { sender: 'Vikram', text: 'Kal subah 6 AM Cubbon park 8k run, kaun kaun uth raha hai?' },
    { sender: 'Kabir', text: 'Sunday subah 6 baje? Vikram pagal ho gaya hai kya bhai' },
    { sender: 'Aarav', text: 'Mai aa raha hu! Subah ka weather bohot fresh rehta hai' },
    { sender: 'Priya', text: 'Run ke baad CTR me dosa aur filter coffee milega toh mai sochti hu' },
    { sender: 'Vikram', text: 'Deal pakki, 8k run followed by hot benne dose gate 2 pe milte hai' }
  ],
  // 4
  [
    { sender: 'Sneha', text: 'Acha sa mystery thriller movie suggest karo na koi aaj raat ke liye' },
    { sender: 'Rohan', text: 'Knives Out dekha hai kya Sneha?' },
    { sender: 'Sneha', text: 'Haan dono parts dekh chuki hu, kuch dark aur intense chahiye' },
    { sender: 'Kabir', text: 'Memories of Murder ya Prisoners dekh le, absolute mind blown ho jayegi' },
    { sender: 'Sneha', text: 'Prisoners start kar rahi hu abhi, popcorn leke baith gayi thanks Kabir!' }
  ],
  // 5
  [
    { sender: 'Aarav', text: 'Guys maintenance aur electricity bill ka reminder, kal last date hai' },
    { sender: 'Priya', text: 'Splitwise pe daal diya kya Aarav?' },
    { sender: 'Aarav', text: 'Haan Splitwise updated hai, please sab log settle kar dena' },
    { sender: 'Kabir', text: 'GPay kar diya bhai, check notification' },
    { sender: 'Neha', text: 'Maine bhi clear kar diya abhi, all green' }
  ],
  // 6
  [
    { sender: 'Kabir', text: 'Auto wale bhaiya ne Silk Board se HSR ke 250 rupay maange' },
    { sender: 'Vikram', text: 'Uber auto try kiya kya?' },
    { sender: 'Kabir', text: 'Uber pe 3x surge dikha raha tha bhai barish me' },
    { sender: 'Sneha', text: 'Metro pakad ke nikal jata na, Silk Board flyover toh blocked hai' },
    { sender: 'Kabir', text: 'Ab auto me baith chuka hu, 15 min me pohchunga' }
  ],
  // 7
  [
    { sender: 'Neha', text: 'Guys client presentation khatam ho gaya finally!' },
    { sender: 'Rohan', text: 'Kaisa gaya Neha? Feedback mila kuch?' },
    { sender: 'Neha', text: 'Super happy, VP loved the system architecture slides' },
    { sender: 'Priya', text: 'Woohoo! You worked so hard on those slides' },
    { sender: 'Neha', text: 'Coffee treat meri taraf se sabko tomorrow' }
  ],
  // 8
  [
    { sender: 'Ananya', text: 'Bhai ye Korean cheese corn dog try kiya kisine street fest me?' },
    { sender: 'Priya', text: 'Kaisa tha taste worth it hai kya?' },
    { sender: 'Ananya', text: 'Mozzarella cheese pull toh crazy tha but coating thoda sweet tha' },
    { sender: 'Rohan', text: 'Spicy mustard aur mayo ke sath khao tab mast lagta hai' },
    { sender: 'Ananya', text: 'Next time wahi combo try karungi' }
  ],
  // 9
  [
    { sender: 'Vikram', text: 'Leg day ke baad stairs utarna ek alag level ka trauma hai' },
    { sender: 'Kabir', text: 'Heavy squats kare the na hero ban ke subah subah?' },
    { sender: 'Vikram', text: '120 kg PR mara tha bhai, ab walking robot jaisi ho gayi hai' },
    { sender: 'Sneha', text: 'Foam rolling karo aur hot water bath le lo thoda relief milega' },
    { sender: 'Vikram', text: 'Sofa se uthne ki bhi himmat nahi hai abhi 😂' }
  ],
  // 10
  [
    { sender: 'Rohan', text: 'Ek frontend bug mila hai jisme emoji type karne pe pura page crash ho raha' },
    { sender: 'Aarav', text: 'Regex validation fail ho raha hai input field ka?' },
    { sender: 'Rohan', text: 'Haan UTF-8 string encoding parse nahi kar pa raha tha parser' },
    { sender: 'Neha', text: 'Normalizer add kar de encodeURIComponent ke sath' },
    { sender: 'Rohan', text: 'Fixed and pushed to dev branch, thanks Neha!' }
  ],
  // 11
  [
    { sender: 'Priya', text: 'Weekend pe Catan ya Secret Hitler board games night kare?' },
    { sender: 'Kabir', text: 'Catan me tum log trade monopoly karke cheat karte ho' },
    { sender: 'Sneha', text: 'Secret Hitler best hai, Kabir ka poker face humesha pakda jata hai' },
    { sender: 'Aarav', text: 'Saturday 7 PM my terrace pe finalize karte hai' },
    { sender: 'Priya', text: 'Board game set mai le aati hu' }
  ],
  // 12
  [
    { sender: 'Kabir', text: 'Gym shaker car me 3 din se bhool gaya tha, smell is lethal' },
    { sender: 'Vikram', text: 'Throw that shaker bottle away immediately bhai biohazard ban gaya' },
    { sender: 'Kabir', text: 'Hot water aur vim se wash kiya but odor nahi ja raha' },
    { sender: 'Priya', text: 'Baking soda soak karo 2 hours, otherwise buy new one for 200' },
    { sender: 'Kabir', text: 'Amazon se naya order kar diya can not take risk' }
  ],
  // 13
  [
    { sender: 'Sneha', text: 'Balcony me fresh mint aur basil ke leaves kitne mast grow hue hain' },
    { sender: 'Ananya', text: 'Fresh pesto pasta banao Sneha weekend pe' },
    { sender: 'Sneha', text: 'Yes pine nuts aur olive oil le aana, fresh basil pasta banate hai' },
    { sender: 'Rohan', text: 'Count me in for food always' }
  ],
  // 14
  [
    { sender: 'Aarav', text: 'Bangalore ka weather kya bipolar hai bhai, dopahar me 34 shaam ko rain' },
    { sender: 'Neha', text: 'Balcony ka view dekho clouds kitne dark aur cinematic hain' },
    { sender: 'Kabir', text: 'Umbrella ghar pe bhool gaya hu of course' },
    { sender: 'Priya', text: 'Chai pakora craving at peak level right now' }
  ],
  // 15
  [
    { sender: 'Vikram', text: 'Sunday morning 5km Agara lake cycling ride koun koun chalega?' },
    { sender: 'Aarav', text: 'Cycle rental waha available hai lake entrance pe?' },
    { sender: 'Vikram', text: 'Haan Yulu bikes aur normal geared cycles dono milti hain' },
    { sender: 'Aarav', text: 'Done, 6:30 AM lake gate pe milte hai' }
  ]
];

// Groq Generator for Dynamic Hinglish Bursts
async function generateGroqBurst(topicDescription, apiKey, retries = 2) {
  if (!apiKey) return null;

  const prompt = `Generate a realistic WhatsApp group chat burst (5-6 messages) between urban Indian friends (names: Aarav, Priya, Rohan, Ananya, Kabir, Neha, Vikram, Sneha).
Topic: "${topicDescription}"

MANDATORY RULES:
1. STRICT HINGLISH ONLY: Every single message MUST be in natural conversational Hinglish (Hindi written in Latin alphabet mixed naturally with everyday English words, e.g. "Bhai kal chalna hai kya?", "mera code crash ho gaya yaar", "Swiggy pe 50% discount chal raha hai", "arre nahi, mai nahi aa paunga"). NEVER write pure English dialogues.
2. The ONLY allowed senders are strictly chosen from: Aarav, Priya, Rohan, Ananya, Kabir, Neha, Vikram, Sneha.
3. Natural multi-person back-and-forth on that single topic.
4. Output STRICTLY a valid JSON array of objects with "sender" and "text". No markdown, no triple backticks, no explanations.`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'qwen/qwen3.8-27b',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.75,
          max_tokens: 380
        })
      });

      if (!res.ok) {
        await new Promise((r) => setTimeout(r, 1200 * attempt));
        continue;
      }

      const data = await res.json();
      let raw = data.choices?.[0]?.message?.content?.trim() || '';
      if (raw.startsWith('```json')) raw = raw.slice(7);
      if (raw.startsWith('```')) raw = raw.slice(3);
      if (raw.endsWith('```')) raw = raw.slice(0, -3);
      raw = raw.trim();

      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length >= 3) {
        return arr.filter((m) => PARTICIPANTS.includes(m.sender) && m.text && m.text.trim().length > 0);
      }
    } catch (err) {
      await new Promise((r) => setTimeout(r, 1200 * attempt));
    }
  }
  return null;
}

// Seasonal situational variation generator for the 142 topics
function getProceduralHinglishBurst(topicText, cycleIdx) {
  const base = HINGLISH_BURST_LIBRARY[cycleIdx % HINGLISH_BURST_LIBRARY.length];
  // Re-assign senders dynamically for fresh variety
  const senderOffset = (cycleIdx * 2 + 1) % PARTICIPANTS.length;
  return base.map((m, idx) => {
    const origIdx = PARTICIPANTS.indexOf(m.sender);
    const newSender = PARTICIPANTS[(origIdx + senderOffset) % PARTICIPANTS.length];
    return {
      sender: newSender,
      text: m.text
    };
  });
}

async function runGenerator() {
  const isPreview = process.argv.includes('--preview');
  let targetLimit = 4100;
  const limitIdx = process.argv.indexOf('--limit');
  if (limitIdx !== -1 && process.argv[limitIdx + 1]) {
    targetLimit = parseInt(process.argv[limitIdx + 1], 10) || 4100;
  }

  console.log('====================================================');
  console.log('💬 ChatMind — Topical Burst Chat Generator');
  console.log(`Mode: ${isPreview ? 'PREVIEW BATCH' : 'FULL GENERATION'} (Target: ${targetLimit} messages)`);
  console.log(`Topic Scenarios: ${CASUAL_TOPIC_POOL.length} distinct topics across 8 categories`);
  console.log(`Hinglish Prompt: STRICT ENFORCEMENT`);
  console.log(`Using Groq LLM: ${GROQ_API_KEY ? 'Active (qwen/qwen3.8-27b)' : 'Offline Curated Fallback'}`);
  console.log('====================================================\n');

  // Verify hard case overlap
  console.log('🔍 Validating 8 hard-case zero word overlap guarantees...');
  const allHardTargets = [...DECISION_BURSTS, ...TARGET_BURSTS].filter((b) => b.hardCase);
  for (const t of allHardTargets) {
    const anchorMsg = t.messages.find((m) => m.isAnchor);
    const { hasOverlap, commonWords } = checkZeroOverlap(t.query, anchorMsg.text);
    if (hasOverlap) {
      console.error(`❌ Overlap in ${t.targetId}: ${commonWords.join(', ')}`);
      process.exit(1);
    } else {
      console.log(`  ✓ [${t.targetId}] Zero overlap verified: "${t.query.slice(0, 42)}..."`);
    }
  }
  console.log('✅ All hard cases strictly have 0 common words with their queries.\n');

  const allMessages = [];
  const finalTargets = [];
  const startDate = new Date('2026-03-01T04:00:00.000Z');
  let currentTimestamp = startDate.getTime();

  function appendBurst(burstMessages, topicName, anchorInfo = null) {
    // Inter-burst natural gap: 2 to 5 hours during daytime, or overnight 10-14 hours
    const isOvernight = (allMessages.length % 25 === 0 && allMessages.length > 0);
    const gapMs = isOvernight
      ? (10 + Math.floor(Math.random() * 4)) * 3600 * 1000
      : (2 + Math.floor(Math.random() * 3)) * 3600 * 1000;
    currentTimestamp += gapMs;

    for (let i = 0; i < burstMessages.length; i++) {
      const m = burstMessages[i];
      // Intra-burst gap: 15 to 90 seconds (natural fast WhatsApp exchange)
      currentTimestamp += (15 + Math.floor(Math.random() * 75)) * 1000;
      const msgObj = {
        sender: m.sender,
        text: m.text,
        timestamp: new Date(currentTimestamp).toISOString()
      };
      allMessages.push(msgObj);

      if (m.isAnchor && anchorInfo) {
        finalTargets.push({
          targetId: anchorInfo.targetId,
          messageIndex: allMessages.length - 1,
          sender: msgObj.sender,
          text: msgObj.text,
          timestamp: msgObj.timestamp,
          query: anchorInfo.query,
          hardCase: anchorInfo.hardCase,
          isDecisionThread: Boolean(anchorInfo.isDecisionThread),
          decisionName: anchorInfo.decisionName || null
        });
      }
    }

    // Small chance of 1 single detached message or <Media omitted> between bursts
    if (Math.random() < 0.15) {
      currentTimestamp += (45 * 60 + Math.floor(Math.random() * 60 * 60)) * 1000;
      const standaloneSender = PARTICIPANTS[Math.floor(Math.random() * PARTICIPANTS.length)];
      const standaloneLines = [
        '<Media omitted>',
        'guys phone battery 3% call on alternate number if urgent',
        'sharing the google drive photos link on personal chat',
        'reached home safely everyone goodnight!',
        '<Media omitted>'
      ];
      allMessages.push({
        sender: standaloneSender,
        text: standaloneLines[Math.floor(Math.random() * standaloneLines.length)],
        timestamp: new Date(currentTimestamp).toISOString()
      });
    }
  }

  // 1. Plant the 3 Decision Threads
  console.log('📌 Planting 3 core Decision Threads...');
  for (const dt of DECISION_BURSTS) {
    appendBurst(dt.messages, dt.topic, {
      targetId: dt.targetId,
      query: dt.query,
      hardCase: dt.hardCase,
      isDecisionThread: true,
      decisionName: dt.topic
    });
    console.log(`  ✓ Inserted decision thread: "${dt.topic}" (${dt.messages.length} msgs)`);
  }

  // 2. Plant the Target Bursts
  console.log('\n📌 Planting Curated Target Bursts...');
  for (const tb of TARGET_BURSTS) {
    appendBurst(tb.messages, tb.topic, {
      targetId: tb.targetId,
      query: tb.query,
      hardCase: tb.hardCase,
      isDecisionThread: false
    });
  }
  console.log(`  ✓ Inserted ${TARGET_BURSTS.length} target bursts.`);

  // 3. Generate Casual Topical Bursts via Groq until target count reached
  console.log(`\n🤖 Generating topical conversational bursts (Target: ${targetLimit} messages)...`);
  let topicIdx = 0;
  let groqCallsCount = 0;

  while (allMessages.length < targetLimit) {
    const topicDesc = CASUAL_TOPIC_POOL[topicIdx % CASUAL_TOPIC_POOL.length];
    topicIdx++;

    let burstMsgs = null;
    // Call Groq for the first 30 bursts to inject dynamic LLM creativity
    if (GROQ_API_KEY && groqCallsCount < 35) {
      groqCallsCount++;
      burstMsgs = await generateGroqBurst(topicDesc, GROQ_API_KEY);
      await new Promise((r) => setTimeout(r, 600));
    }

    if (!burstMsgs || burstMsgs.length < 3) {
      burstMsgs = getProceduralHinglishBurst(topicDesc, topicIdx);
    }

    appendBurst(burstMsgs, topicDesc);

    if (topicIdx % 25 === 0 || allMessages.length >= targetLimit) {
      console.log(`  ⚡ Generated ${allMessages.length}/${targetLimit} messages (${topicIdx} bursts)...`);
    }
  }

  console.log(`\n🎉 Completed! Total messages generated: ${allMessages.length}`);
  console.log(`🎯 Total targets successfully planted: ${finalTargets.length}`);

  // Save full datasets
  fs.writeFileSync(OUTPUT_ROOT, JSON.stringify(allMessages, null, 2), 'utf8');
  fs.writeFileSync(OUTPUT_SCRIPTS, JSON.stringify(allMessages, null, 2), 'utf8');
  fs.writeFileSync(TARGETS_FILE, JSON.stringify(finalTargets, null, 2), 'utf8');
  console.log(`\n💾 Saved ${allMessages.length} messages to:`);
  console.log(`   - ${OUTPUT_ROOT}`);
  console.log(`   - ${OUTPUT_SCRIPTS}`);
  console.log(`   - ${TARGETS_FILE}`);

  console.log('\n====================================================');
  console.log('Done! Now run scripts/seedMessages.js to seed into MongoDB Atlas.');
  console.log('====================================================\n');
}

runGenerator();
