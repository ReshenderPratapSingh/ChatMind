/**
 * scripts/burstsData.js
 * 
 * Contains all 60 curated, ready-to-use bursts from the user specification.
 * Plain English, natural group chat dynamics, authentic personalities.
 */

const BURSTS_60 = [
  // --- Batch 1 (1–10) ---
  {
    id: 1,
    title: "Goa vs Himachal",
    isAnchorDecision: true,
    hardCaseAnchorText: "Final call: Himachal. Let’s stop debating and start looking at stays.",
    messages: [
      { sender: "Aarav", text: "Guys, summer trip. Goa or Himachal? We need to decide today." },
      { sender: "Priya", text: "Himachal. Cooler weather, mountains, and we can actually explore." },
      { sender: "Rohan", text: "Goa. We’re going on vacation, not a trekking expedition 😭" },
      { sender: "Ananya", text: "Goa is going to be ridiculously crowded in summer though." },
      { sender: "Kabir", text: "Budget-wise, Goa also makes more sense if we book early." },
      { sender: "Neha", text: "But I really want mountains this time." },
      { sender: "Vikram", text: "Okay, majority seems split. Goa for easier + cheaper, Himachal for the experience." },
      { sender: "Sneha", text: "Final call: Himachal. Let’s stop debating and start looking at stays." }
    ]
  },
  {
    id: 2,
    title: "Flights vs overnight train",
    messages: [
      { sender: "Priya", text: "Should we just take the flight? It saves almost a whole day." },
      { sender: "Rohan", text: "Overnight train. We save money and don't have to deal with airport nonsense." },
      { sender: "Kabir", text: "Flight is ₹2,800 more though." },
      { sender: "Ananya", text: "For me, that's worth it. I don't want to spend eight hours sitting in a train." },
      { sender: "Vikram", text: "What if we take the train going there and fly back?" },
      { sender: "Neha", text: "Honestly, that's the best compromise." },
      { sender: "Aarav", text: "Agreed. Train outbound, flight return." },
      { sender: "Sneha", text: "Done. I'll check the train tickets tonight." }
    ]
  },
  {
    id: 3,
    title: "Parents say no at the last minute",
    messages: [
      { sender: "Rohan", text: "Guys, bad news. My parents just said I can't come." },
      { sender: "Priya", text: "Wait WHAT? We literally booked everything based on eight people." },
      { sender: "Rohan", text: "I know 😭 They weren't sure earlier, but now they said no." },
      { sender: "Kabir", text: "Can we cancel your hotel spot without losing money?" },
      { sender: "Ananya", text: "Probably. But then the room split changes for everyone." },
      { sender: "Neha", text: "Let's not panic. First check whether the hotel charges for reducing one person." },
      { sender: "Vikram", text: "I'll call them. If there's no extra charge, we're fine." },
      { sender: "Sneha", text: "Good. Nobody else change plans until we know the cancellation situation." }
    ]
  },
  {
    id: 4,
    title: "Four-way room vs two separate rooms",
    messages: [
      { sender: "Aarav", text: "Four people in one room is definitely cheaper." },
      { sender: "Neha", text: "Cheaper, yes. Peaceful, absolutely not." },
      { sender: "Rohan", text: "Why are you acting like we're staying there for six months? 😂" },
      { sender: "Priya", text: "I vote two rooms. Four people sharing one bathroom sounds horrible." },
      { sender: "Kabir", text: "Two rooms means almost ₹1,500 extra each." },
      { sender: "Ananya", text: "I'm okay paying that for sleep and personal space." },
      { sender: "Vikram", text: "Same. We've travelled together before. We know how this ends." },
      { sender: "Sneha", text: "😂 Two rooms it is. I'm not waking up to someone's alarm at 5 AM again." }
    ]
  },
  {
    id: 5,
    title: "Lost ID before a flight",
    messages: [
      { sender: "Priya", text: "Guys, has anyone seen my wallet?" },
      { sender: "Aarav", text: "What happened?" },
      { sender: "Priya", text: "My flight is tomorrow and my ID was inside it." },
      { sender: "Neha", text: "Check your room properly before panicking." },
      { sender: "Priya", text: "Already did. It's nowhere." },
      { sender: "Kabir", text: "Do you have another accepted ID with you?" },
      { sender: "Priya", text: "I have my passport, thankfully." },
      { sender: "Vikram", text: "Then you're fine. Keep the passport with you tonight and don't put it in checked luggage." },
      { sender: "Priya", text: "Crisis officially downgraded 😭" }
    ]
  },
  {
    id: 6,
    title: "Rental car vs local transport",
    messages: [
      { sender: "Rohan", text: "We should rent a car. It'll be way easier." },
      { sender: "Ananya", text: "Easier until one of us has to drive through unfamiliar roads." },
      { sender: "Kabir", text: "Let's calculate it. Rental + fuel divided by eight isn't that bad." },
      { sender: "Neha", text: "What about parking?" },
      { sender: "Vikram", text: "And traffic." },
      { sender: "Aarav", text: "We could use cabs for the city and rent a car only for the day trip." },
      { sender: "Priya", text: "That sounds much more sensible." },
      { sender: "Sneha", text: "Perfect. No need to pay for a car when we're barely using it." }
    ]
  },
  {
    id: 7,
    title: "Spontaneous weekend trip nobody can afford",
    messages: [
      { sender: "Vikram", text: "Guys, random idea. Weekend trip this Saturday?" },
      { sender: "Rohan", text: "YES." },
      { sender: "Priya", text: "Absolutely not. My bank account is already fighting for its life." },
      { sender: "Kabir", text: "Same 💀" },
      { sender: "Ananya", text: "Where are you even thinking?" },
      { sender: "Vikram", text: "Somewhere two or three hours away. Nothing expensive." },
      { sender: "Neha", text: "Even “nothing expensive” somehow becomes ₹5,000 with this group." },
      { sender: "Aarav", text: "Let's postpone it. We can plan something properly next month." },
      { sender: "Sneha", text: "Agreed. Spontaneity is fun until rent is due." }
    ]
  },
  {
    id: 8,
    title: "Who left the AC on?",
    messages: [
      { sender: "Kabir", text: "Guys, why was the AC running all afternoon?" },
      { sender: "Rohan", text: "Not me." },
      { sender: "Ananya", text: "Me neither." },
      { sender: "Priya", text: "I left at 10, and it was off when I left." },
      { sender: "Neha", text: "Someone definitely forgot to switch it off." },
      { sender: "Vikram", text: "Check the electricity bill before we start accusing people 😂" },
      { sender: "Aarav", text: "Whoever did it owes us chai." },
      { sender: "Sneha", text: "That's fair. Financial justice, but make it affordable." }
    ]
  },
  {
    id: 9,
    title: "Saturday dinner",
    isAnchorDecision: true,
    hardCaseAnchorText: "Final call: the North Indian place. I'll make the reservation for eight.",
    messages: [
      { sender: "Ananya", text: "Where are we eating Saturday?" },
      { sender: "Rohan", text: "That new Korean place." },
      { sender: "Priya", text: "Too expensive." },
      { sender: "Kabir", text: "Pizza?" },
      { sender: "Neha", text: "We literally had pizza last Saturday." },
      { sender: "Vikram", text: "There's a new North Indian place near campus. Good reviews and reasonable prices." },
      { sender: "Aarav", text: "Does everyone agree on that?" },
      { sender: "Sneha", text: "Final call: the North Indian place. I'll make the reservation for eight." }
    ]
  },
  {
    id: 10,
    title: "New restaurant — overhyped or actually good?",
    messages: [
      { sender: "Neha", text: "Has anyone tried that new restaurant everyone is posting about?" },
      { sender: "Rohan", text: "Went yesterday. Honestly? Overhyped." },
      { sender: "Priya", text: "Really? The food looked amazing." },
      { sender: "Rohan", text: "Looks amazing. Tastes average." },
      { sender: "Kabir", text: "What did you order?" },
      { sender: "Rohan", text: "Their signature pasta and dessert." },
      { sender: "Ananya", text: "That's not exactly enough evidence to declare the entire restaurant bad 😂" },
      { sender: "Vikram", text: "Let's go once and judge for ourselves." },
      { sender: "Sneha", text: "Fine, but I'm not paying ₹600 for an Instagram photo." }
    ]
  },

  // --- Batch 2 (11–20) ---
  {
    id: 11,
    title: "Someone orders for the group and gets everything wrong",
    messages: [
      { sender: "Priya", text: "Food's here! I ordered everything according to the list." },
      { sender: "Rohan", text: "Why did I get a paneer wrap? I asked for a burger 😭" },
      { sender: "Kabir", text: "And where is my extra cheese?" },
      { sender: "Ananya", text: "I got the spicy noodles instead of the fried rice." },
      { sender: "Priya", text: "Wait... I may have mixed up everyone's orders." },
      { sender: "Neha", text: "“May have” 😂" },
      { sender: "Vikram", text: "It's okay. Let's just exchange whatever we can." },
      { sender: "Sneha", text: "Next time, everyone orders for themselves. Problem solved." }
    ]
  },
  {
    id: 12,
    title: "Pineapple on pizza",
    messages: [
      { sender: "Rohan", text: "Unpopular opinion: pineapple belongs on pizza." },
      { sender: "Kabir", text: "That's not an unpopular opinion. That's a crime." },
      { sender: "Priya", text: "I actually like it." },
      { sender: "Ananya", text: "Same. Sweet and salty works." },
      { sender: "Vikram", text: "Absolutely not. Pizza should remain pizza." },
      { sender: "Neha", text: "It's literally just fruit on bread with cheese. Relax." },
      { sender: "Aarav", text: "We've been discussing this for twenty minutes." },
      { sender: "Sneha", text: "And somehow nobody has changed their mind." }
    ]
  },
  {
    id: 13,
    title: "Home-cooked potluck",
    messages: [
      { sender: "Neha", text: "Let's do a potluck this Sunday instead of ordering food." },
      { sender: "Aarav", text: "I'm in. I'll make pulao." },
      { sender: "Priya", text: "I'll bring dessert." },
      { sender: "Rohan", text: "I'll handle drinks." },
      { sender: "Kabir", text: "I'll make something... if someone tells me what." },
      { sender: "Ananya", text: "You can bring snacks 😂" },
      { sender: "Vikram", text: "I'll bring plates and tissues." },
      { sender: "Sneha", text: "Perfect. Everyone has one job. Please don't forget yours." }
    ]
  },
  {
    id: 14,
    title: "Someone is late to dinner",
    messages: [
      { sender: "Ananya", text: "Where's Rohan? Our table is ready." },
      { sender: "Priya", text: "He said he'd be here ten minutes ago." },
      { sender: "Kabir", text: "Classic Rohan." },
      { sender: "Rohan", text: "I'm sorry 😭 Traffic is horrible. Give me fifteen minutes." },
      { sender: "Neha", text: "Should we wait?" },
      { sender: "Vikram", text: "I'm hungry. Let's order starters." },
      { sender: "Aarav", text: "Agreed. He can join when he gets here." },
      { sender: "Sneha", text: "Yep. We're not starving for anyone." }
    ]
  },
  {
    id: 15,
    title: "Best filter coffee spot",
    messages: [
      { sender: "Vikram", text: "Serious question: where's the best filter coffee in town?" },
      { sender: "Priya", text: "That old café near the market." },
      { sender: "Rohan", text: "No way. The one beside the library is better." },
      { sender: "Neha", text: "Both are decent, but the market one has better snacks." },
      { sender: "Kabir", text: "Coffee quality matters more than snacks." },
      { sender: "Ananya", text: "Says the guy who orders three samosas every time." },
      { sender: "Kabir", text: "That's unrelated." },
      { sender: "Sneha", text: "We need a coffee ranking system at this point." }
    ]
  },
  {
    id: 16,
    title: "Food delivery mix-up",
    messages: [
      { sender: "Aarav", text: "Guys, the delivery just arrived." },
      { sender: "Priya", text: "Why did we get two biryanis?" },
      { sender: "Rohan", text: "I ordered one." },
      { sender: "Kabir", text: "I ordered noodles. There's no noodles." },
      { sender: "Ananya", text: "Check the receipt." },
      { sender: "Neha", text: "Yep, this is someone else's order." },
      { sender: "Vikram", text: "Should we call the delivery guy?" },
      { sender: "Sneha", text: "Already did. He's coming back with our actual order." }
    ]
  },
  {
    id: 17,
    title: "Birthday gift contribution",
    isAnchorHardCase: true,
    hardCaseAnchorText: "Guys, the gift is ₹4,000 total. Eight people means ₹500 each.",
    messages: [
      { sender: "Priya", text: "Guys, the gift is ₹4,000 total. Eight people means ₹500 each." },
      { sender: "Kabir", text: "Can everyone send their share by tonight?" },
      { sender: "Rohan", text: "I'll transfer mine now." },
      { sender: "Ananya", text: "Same." },
      { sender: "Vikram", text: "Done." },
      { sender: "Neha", text: "I'll send it after dinner." },
      { sender: "Sneha", text: "Cool. Once everyone's contributed, we'll buy it tomorrow." },
      { sender: "Aarav", text: "Perfect. Let's keep the gift a surprise." }
    ]
  },
  {
    id: 18,
    title: "Who owes who after the weekend trip?",
    messages: [
      { sender: "Kabir", text: "I calculated all the trip expenses." },
      { sender: "Rohan", text: "How bad is it?" },
      { sender: "Kabir", text: "Not bad. But everyone owes different amounts because I paid for most of the cabs." },
      { sender: "Priya", text: "Can you send the breakdown?" },
      { sender: "Kabir", text: "Just did. Aarav owes me ₹620, Neha ₹380, and Vikram ₹510." },
      { sender: "Neha", text: "Sending mine now." },
      { sender: "Vikram", text: "Done." },
      { sender: "Aarav", text: "I'll transfer yours tonight." }
    ]
  },
  {
    id: 19,
    title: "Forgotten Swiggy payment",
    messages: [
      { sender: "Ananya", text: "Rohan, remember that food order from three weeks ago?" },
      { sender: "Rohan", text: "Uh-oh." },
      { sender: "Ananya", text: "You still owe ₹240 😂" },
      { sender: "Rohan", text: "I genuinely forgot." },
      { sender: "Priya", text: "Three weeks??" },
      { sender: "Rohan", text: "Don't expose me in the group 😭" },
      { sender: "Kabir", text: "Interest has officially started accumulating." },
      { sender: "Rohan", text: "Fine, sending ₹250. Keep the extra ₹10 as emotional compensation." }
    ]
  },
  {
    id: 20,
    title: "Shared Netflix/Spotify subscription",
    messages: [
      { sender: "Neha", text: "Should we get a shared streaming subscription?" },
      { sender: "Aarav", text: "I'm interested if everyone actually uses it." },
      { sender: "Rohan", text: "I'll definitely use it." },
      { sender: "Priya", text: "Same." },
      { sender: "Kabir", text: "How much per person?" },
      { sender: "Vikram", text: "Around ₹150 if we split it properly." },
      { sender: "Ananya", text: "That's reasonable." },
      { sender: "Sneha", text: "Let's do it, but one person should handle the payment so we don't have eight separate reminders every month." }
    ]
  },

  // --- Batch 3 (21–30) ---
  {
    id: 21,
    title: "Surprise gift vs something else",
    messages: [
      { sender: "Neha", text: "Should we all chip in for a surprise gift for Priya?" },
      { sender: "Rohan", text: "I'm in." },
      { sender: "Kabir", text: "What are we getting?" },
      { sender: "Ananya", text: "Maybe concert tickets?" },
      { sender: "Vikram", text: "That could get expensive quickly." },
      { sender: "Aarav", text: "We could instead plan a nice dinner and get one small gift." },
      { sender: "Sneha", text: "I like that better. It's more about spending time together." },
      { sender: "Priya", text: "Wait, why is everyone suddenly being suspicious? 😂" }
    ]
  },
  {
    id: 22,
    title: "Friend borrowing money",
    messages: [
      { sender: "Kabir", text: "Rohan, tiny reminder about the ₹500 I lent you last week." },
      { sender: "Rohan", text: "Oh damn, completely forgot." },
      { sender: "Kabir", text: "No worries, just reminding you." },
      { sender: "Rohan", text: "Sending it right now." },
      { sender: "Neha", text: "This is the politest debt collection I've ever witnessed." },
      { sender: "Rohan", text: "He gave me a full week of grace 😂" },
      { sender: "Kabir", text: "I'm basically a bank." }
    ]
  },
  {
    id: 23,
    title: "Code breaking before a demo",
    messages: [
      { sender: "Aarav", text: "Guys, my code just broke and the demo is in two hours." },
      { sender: "Priya", text: "What changed?" },
      { sender: "Aarav", text: "Nothing! That's the problem." },
      { sender: "Kabir", text: "Show me the error." },
      { sender: "Aarav", text: "Sending screenshot." },
      { sender: "Vikram", text: "It's failing because of that variable you renamed." },
      { sender: "Aarav", text: "NO WAY 😭" },
      { sender: "Sneha", text: "At least it's not actually a complicated bug." }
    ]
  },
  {
    id: 24,
    title: "Best code editor/IDE",
    messages: [
      { sender: "Rohan", text: "VS Code is obviously the best editor." },
      { sender: "Kabir", text: "For Java? IntelliJ." },
      { sender: "Priya", text: "Both of you are fighting over text editors 😂" },
      { sender: "Ananya", text: "I use whatever opens fastest." },
      { sender: "Vikram", text: "That's the most practical answer here." },
      { sender: "Neha", text: "Does anyone actually care enough to switch?" },
      { sender: "Rohan", text: "No." },
      { sender: "Sneha", text: "Then congratulations, debate over." }
    ]
  },
  {
    id: 25,
    title: "Pointless work meeting",
    messages: [
      { sender: "Priya", text: "Just survived a two-hour meeting." },
      { sender: "Neha", text: "What was the meeting about?" },
      { sender: "Priya", text: "Planning another meeting." },
      { sender: "Rohan", text: "Corporate efficiency at its finest." },
      { sender: "Kabir", text: "Did anything actually get decided?" },
      { sender: "Priya", text: "One thing." },
      { sender: "Ananya", text: "What?" },
      { sender: "Priya", text: "That we'll discuss it tomorrow." },
      { sender: "Vikram", text: "I'm crying 😂" }
    ]
  },
  {
    id: 26,
    title: "New laptop/gadget purchase",
    messages: [
      { sender: "Vikram", text: "Guys, finally bought the laptop I've been talking about." },
      { sender: "Aarav", text: "LET'S GO 🔥" },
      { sender: "Rohan", text: "Specs?" },
      { sender: "Vikram", text: "16 GB RAM, 1 TB SSD, decent processor." },
      { sender: "Kabir", text: "How much did it cost?" },
      { sender: "Vikram", text: "Don't ask." },
      { sender: "Neha", text: "So... expensive." },
      { sender: "Vikram", text: "Very." }
    ]
  },
  {
    id: 27,
    title: "Internship/job offer",
    messages: [
      { sender: "Ananya", text: "GUYS I GOT THE INTERNSHIP!" },
      { sender: "Priya", text: "WHATTT congratulations!!" },
      { sender: "Rohan", text: "Finally! You were waiting forever." },
      { sender: "Ananya", text: "I got the confirmation email this morning." },
      { sender: "Kabir", text: "That's amazing. When do you start?" },
      { sender: "Ananya", text: "Next month." },
      { sender: "Vikram", text: "Dinner is on you now 😂" },
      { sender: "Ananya", text: "Nice try. I'm still a student." }
    ]
  },
  {
    id: 28,
    title: "Late-night debugging",
    messages: [
      { sender: "Kabir", text: "Is anyone awake?" },
      { sender: "Rohan", text: "Unfortunately, yes." },
      { sender: "Kabir", text: "My program keeps throwing an error and I can't figure out why." },
      { sender: "Aarav", text: "Send the code." },
      { sender: "Kabir", text: "Sending." },
      { sender: "Neha", text: "It's because you're passing a string where the function expects an integer." },
      { sender: "Kabir", text: "Wait... that's actually it." },
      { sender: "Sneha", text: "We solved a midnight emergency in under five minutes." }
    ]
  },
  {
    id: 29,
    title: "Difficult manager/teammate",
    messages: [
      { sender: "Priya", text: "I swear my manager changes the requirements every single day." },
      { sender: "Ananya", text: "That's exhausting." },
      { sender: "Priya", text: "Yesterday they said one thing, today they said the exact opposite." },
      { sender: "Rohan", text: "Do you have the original instructions in writing?" },
      { sender: "Priya", text: "Yes, thankfully." },
      { sender: "Vikram", text: "Then keep everything documented. It'll save you later." },
      { sender: "Priya", text: "Good point. I'm going to start doing that from now on." }
    ]
  },
  {
    id: 30,
    title: "Early morning group run",
    isAnchorHardCase: true,
    hardCaseAnchorText: "Done. Park entrance, 6 AM. No excuses.",
    messages: [
      { sender: "Neha", text: "Anyone up for a run tomorrow morning?" },
      { sender: "Rohan", text: "What time?" },
      { sender: "Neha", text: "6 AM." },
      { sender: "Rohan", text: "That's not morning. That's night." },
      { sender: "Priya", text: "I'm actually in." },
      { sender: "Kabir", text: "I regret agreeing already." },
      { sender: "Vikram", text: "Meet at the park entrance at 6?" },
      { sender: "Sneha", text: "Done. Park entrance, 6 AM. No excuses." }
    ]
  },

  // --- Batch 4 (31–40) ---
  {
    id: 31,
    title: "Workout injury",
    messages: [
      { sender: "Rohan", text: "Guys, I think I messed up my ankle at the gym." },
      { sender: "Neha", text: "What happened?" },
      { sender: "Rohan", text: "Landed awkwardly after a jump." },
      { sender: "Priya", text: "Can you walk?" },
      { sender: "Rohan", text: "Barely." },
      { sender: "Vikram", text: "Don't try to put more weight on it. Get it checked if the pain is bad." },
      { sender: "Ananya", text: "Do you need someone to come with you?" },
      { sender: "Rohan", text: "I think I'll be okay, but I'll let you know." }
    ]
  },
  {
    id: 32,
    title: "Gym/fitness plan value",
    messages: [
      { sender: "Kabir", text: "Is ₹2,000 a month for this gym actually worth it?" },
      { sender: "Neha", text: "Depends. What equipment do they have?" },
      { sender: "Kabir", text: "Pretty much everything, plus group classes." },
      { sender: "Rohan", text: "My gym costs ₹800 and has everything I need." },
      { sender: "Priya", text: "Then why are you considering the expensive one?" },
      { sender: "Kabir", text: "Better location and longer hours." },
      { sender: "Vikram", text: "If you'll actually use those benefits, maybe it's worth it." },
      { sender: "Kabir", text: "Fair. I'll stick with the cheaper one for now." }
    ]
  },
  {
    id: 33,
    title: "New diet",
    messages: [
      { sender: "Ananya", text: "Starting a new diet from tomorrow." },
      { sender: "Rohan", text: "How long before you order pizza?" },
      { sender: "Ananya", text: "Very funny." },
      { sender: "Neha", text: "What's the plan?" },
      { sender: "Ananya", text: "Less junk food and more home-cooked meals." },
      { sender: "Kabir", text: "That's actually pretty reasonable." },
      { sender: "Priya", text: "We'll support you, but we're still ordering dessert." },
      { sender: "Ananya", text: "Fine. I'll just watch you suffer." }
    ]
  },
  {
    id: 34,
    title: "Cricket match",
    messages: [
      { sender: "Vikram", text: "That match yesterday was insane." },
      { sender: "Rohan", text: "That last over 😭" },
      { sender: "Kabir", text: "I thought we'd lost for sure." },
      { sender: "Priya", text: "The turning point was definitely that catch." },
      { sender: "Neha", text: "Everyone in the room went completely silent." },
      { sender: "Ananya", text: "And then exploded two seconds later 😂" },
      { sender: "Sneha", text: "Best match we've watched together in a while." }
    ]
  },
  {
    id: 35,
    title: "Missed workout",
    messages: [
      { sender: "Neha", text: "So... who actually showed up for today's workout?" },
      { sender: "Rohan", text: "I was going to." },
      { sender: "Kabir", text: "That's not an answer." },
      { sender: "Rohan", text: "My alarm didn't ring." },
      { sender: "Priya", text: "You literally posted a story at 8 AM." },
      { sender: "Rohan", text: "Okay, my motivation didn't ring either." },
      { sender: "Vikram", text: "At least you're honest." },
      { sender: "Sneha", text: "Tomorrow. No excuses." }
    ]
  },
  {
    id: 36,
    title: "Lost apartment key",
    isAnchorHardCase: true,
    hardCaseAnchorText: "Check with the building security first. Someone might have handed them in.",
    messages: [
      { sender: "Aarav", text: "Guys, slight problem. I can't get into my apartment." },
      { sender: "Priya", text: "Did you leave your keys inside?" },
      { sender: "Aarav", text: "I think I dropped them somewhere on the way back." },
      { sender: "Kabir", text: "Do you have a spare?" },
      { sender: "Aarav", text: "No." },
      { sender: "Neha", text: "Who else has access to your place?" },
      { sender: "Vikram", text: "I can come over and help you look around." },
      { sender: "Sneha", text: "Check with the building security first. Someone might have handed them in." }
    ]
  },
  {
    id: 37,
    title: "Flat tire",
    messages: [
      { sender: "Rohan", text: "My tire just went flat." },
      { sender: "Kabir", text: "Where are you?" },
      { sender: "Rohan", text: "About two kilometres from campus." },
      { sender: "Vikram", text: "Is there a repair shop nearby?" },
      { sender: "Rohan", text: "Google says there's one half a kilometre away." },
      { sender: "Priya", text: "Can you push the bike there?" },
      { sender: "Rohan", text: "Yeah, I think so." },
      { sender: "Neha", text: "Send your location anyway. We'll come if you need help." }
    ]
  },
  {
    id: 38,
    title: "Locked out late at night",
    messages: [
      { sender: "Priya", text: "I'm outside and I've somehow locked myself out." },
      { sender: "Ananya", text: "It's midnight 😭" },
      { sender: "Priya", text: "I know." },
      { sender: "Kabir", text: "Does anyone have your spare key?" },
      { sender: "Priya", text: "Neha does, I think." },
      { sender: "Neha", text: "I have it. Give me ten minutes." },
      { sender: "Vikram", text: "Want me to come with her?" },
      { sender: "Priya", text: "No, you're good. Thanks, guys." }
    ]
  },
  {
    id: 39,
    title: "Traffic makes someone miss an event",
    messages: [
      { sender: "Ananya", text: "I'm so sorry, guys. I'm stuck in traffic." },
      { sender: "Rohan", text: "The event already started." },
      { sender: "Ananya", text: "I know 😭 I've been sitting here for forty minutes." },
      { sender: "Priya", text: "Don't worry about rushing. Just get here safely." },
      { sender: "Kabir", text: "We'll tell them you're on the way." },
      { sender: "Ananya", text: "I feel terrible for making everyone wait." },
      { sender: "Vikram", text: "Nobody's waiting. Go at your own pace." },
      { sender: "Ananya", text: "Thanks. Almost there." }
    ]
  },
  {
    id: 40,
    title: "Phone/laptop malfunction",
    messages: [
      { sender: "Kabir", text: "My laptop just froze five minutes before my presentation." },
      { sender: "Aarav", text: "Did you save the file?" },
      { sender: "Kabir", text: "Thankfully, yes." },
      { sender: "Neha", text: "Try restarting it." },
      { sender: "Kabir", text: "Doing that now." },
      { sender: "Rohan", text: "If it doesn't work, send the presentation to your phone." },
      { sender: "Kabir", text: "It restarted!" },
      { sender: "Sneha", text: "Crisis officially cancelled. Go present." }
    ]
  },

  // --- Batch 5 (41–50) ---
  {
    id: 41,
    title: "Lost personal item",
    messages: [
      { sender: "Neha", text: "Has anyone seen my earbuds?" },
      { sender: "Priya", text: "When did you last have them?" },
      { sender: "Neha", text: "At the café this afternoon." },
      { sender: "Rohan", text: "Check your backpack's small pocket." },
      { sender: "Neha", text: "Already did." },
      { sender: "Kabir", text: "I think you left them on the library table." },
      { sender: "Neha", text: "Wait—I remember putting them there." },
      { sender: "Ananya", text: "Go check before someone else finds them." }
    ]
  },
  {
    id: 42,
    title: "Assignment deadline",
    isAnchorHardCase: true,
    hardCaseAnchorText: "Just checked the notice. The cutoff is 5 PM tomorrow.",
    messages: [
      { sender: "Aarav", text: "Guys, what time is the assignment due tomorrow?" },
      { sender: "Priya", text: "I thought it was midnight." },
      { sender: "Kabir", text: "The professor said 5 PM." },
      { sender: "Rohan", text: "Are you sure?" },
      { sender: "Kabir", text: "Just checked the notice. The cutoff is 5 PM tomorrow." },
      { sender: "Neha", text: "Good catch. I would've submitted at 11:59." },
      { sender: "Vikram", text: "Same 💀" },
      { sender: "Sneha", text: "Okay, everyone finish it before evening. No last-minute surprises." }
    ]
  },
  {
    id: 43,
    title: "RSVP deadline",
    messages: [
      { sender: "Priya", text: "Reminder: we need to RSVP for the college event by Friday." },
      { sender: "Rohan", text: "Friday as in tomorrow?" },
      { sender: "Priya", text: "Yep." },
      { sender: "Ananya", text: "Thanks for reminding me. I completely forgot." },
      { sender: "Kabir", text: "Do we have to RSVP individually?" },
      { sender: "Vikram", text: "Yes, there's a separate form for everyone." },
      { sender: "Neha", text: "I'll fill mine tonight." },
      { sender: "Sneha", text: "Same. Let's not miss it." }
    ]
  },
  {
    id: 44,
    title: "Friend misses a shared deadline",
    messages: [
      { sender: "Kabir", text: "Guys, the presentation was supposed to be submitted at 6." },
      { sender: "Rohan", text: "I know." },
      { sender: "Kabir", text: "It's 6:20." },
      { sender: "Rohan", text: "I'm really sorry. I got stuck fixing my section." },
      { sender: "Priya", text: "Can you finish it in ten minutes?" },
      { sender: "Rohan", text: "Yes." },
      { sender: "Ananya", text: "We'll wait. Just send it as soon as it's ready." },
      { sender: "Vikram", text: "Next time, tell us before the deadline if you're running late." }
    ]
  },
  {
    id: 45,
    title: "Push a group deadline back",
    messages: [
      { sender: "Neha", text: "Should we ask for one more day for the project?" },
      { sender: "Aarav", text: "I think we need it. The testing isn't finished." },
      { sender: "Rohan", text: "But we've already asked once." },
      { sender: "Priya", text: "Better to submit something properly tested than rush it." },
      { sender: "Kabir", text: "Agreed." },
      { sender: "Vikram", text: "I'll message the professor and explain the situation." },
      { sender: "Sneha", text: "Do that. If they say no, we'll submit tomorrow anyway." }
    ]
  },
  {
    id: 46,
    title: "Last-minute availability",
    messages: [
      { sender: "Ananya", text: "Are we still meeting tonight?" },
      { sender: "Priya", text: "I can make it." },
      { sender: "Rohan", text: "I'm free after 8." },
      { sender: "Kabir", text: "I might be late." },
      { sender: "Neha", text: "What about Vikram?" },
      { sender: "Vikram", text: "Just got free. I'm available." },
      { sender: "Aarav", text: "Great. Let's meet at 8:30 then." },
      { sender: "Sneha", text: "Perfect, 8:30 works for everyone." }
    ]
  },
  {
    id: 47,
    title: "Surprise birthday planning",
    messages: [
      { sender: "Priya", text: "We need a plan for Rohan's birthday." },
      { sender: "Neha", text: "Surprise dinner?" },
      { sender: "Kabir", text: "He'll figure it out immediately." },
      { sender: "Ananya", text: "Then pretend we're meeting for something else." },
      { sender: "Vikram", text: "And someone needs to keep him away from the restaurant." },
      { sender: "Aarav", text: "I'll handle that part." },
      { sender: "Sneha", text: "Perfect. Nobody tell him anything." },
      { sender: "Rohan", text: "Why did you guys suddenly stop talking when I joined? 🤨" }
    ]
  },
  {
    id: 48,
    title: "Good news — achievement",
    messages: [
      { sender: "Vikram", text: "Guys, I finally got selected!" },
      { sender: "Aarav", text: "LET'S GOOO 🔥" },
      { sender: "Priya", text: "Congratulations!!" },
      { sender: "Neha", text: "You worked so hard for this." },
      { sender: "Rohan", text: "Dinner tonight. No excuses." },
      { sender: "Vikram", text: "😂 Why does every achievement in this group become my treat?" },
      { sender: "Kabir", text: "Because we're supportive friends." },
      { sender: "Ananya", text: "Very financially supportive of ourselves." }
    ]
  },
  {
    id: 49,
    title: "Adopting a pet",
    messages: [
      { sender: "Sneha", text: "Guys, meet the newest member of my family 🐶" },
      { sender: "Priya", text: "OH MY GOD 😭" },
      { sender: "Neha", text: "You actually adopted one!" },
      { sender: "Rohan", text: "What's his name?" },
      { sender: "Sneha", text: "Milo." },
      { sender: "Kabir", text: "He's adorable." },
      { sender: "Ananya", text: "Send more pictures immediately." },
      { sender: "Sneha", text: "You've officially become his fan club." }
    ]
  },
  {
    id: 50,
    title: "Moving to a new city/apartment",
    messages: [
      { sender: "Aarav", text: "Guys, I have some news. I'm moving next month." },
      { sender: "Priya", text: "Wait, you're leaving the city?" },
      { sender: "Aarav", text: "Yeah, got a place near my new office." },
      { sender: "Rohan", text: "That's actually huge." },
      { sender: "Neha", text: "When are you leaving?" },
      { sender: "Aarav", text: "Probably around the 20th." },
      { sender: "Vikram", text: "Then we're definitely doing one proper farewell before that." },
      { sender: "Sneha", text: "Absolutely. No disappearing without a goodbye." }
    ]
  },

  // --- Batch 6 (51–60) ---
  {
    id: 51,
    title: "Congratulating someone on finishing something big",
    messages: [
      { sender: "Ananya", text: "Guys, I finally submitted my thesis!" },
      { sender: "Priya", text: "FINALLY 😭" },
      { sender: "Rohan", text: "After all those late nights, it's actually done." },
      { sender: "Kabir", text: "How does it feel?" },
      { sender: "Ananya", text: "Weird. I don't know what to do with my evening now 😂" },
      { sender: "Neha", text: "Enjoy it. You've earned the break." },
      { sender: "Vikram", text: "We should celebrate this weekend." },
      { sender: "Sneha", text: "Absolutely. Dinner is happening." }
    ]
  },
  {
    id: 52,
    title: "Someone shares difficult news",
    messages: [
      { sender: "Rohan", text: "Guys, I got some bad news today." },
      { sender: "Aarav", text: "What happened?" },
      { sender: "Rohan", text: "Things at home have been pretty difficult lately." },
      { sender: "Priya", text: "I'm really sorry, Rohan." },
      { sender: "Neha", text: "You don't have to explain anything you're not comfortable sharing." },
      { sender: "Kabir", text: "If you need anything from us, just ask." },
      { sender: "Vikram", text: "Seriously. We're here." },
      { sender: "Rohan", text: "Thanks, guys. I really appreciate it." }
    ]
  },
  {
    id: 53,
    title: "Trending movie/show recommendation",
    messages: [
      { sender: "Priya", text: "Has everyone watched that new series yet?" },
      { sender: "Rohan", text: "Started it yesterday." },
      { sender: "Kabir", text: "Is it actually good?" },
      { sender: "Rohan", text: "I'm three episodes in and I'm hooked." },
      { sender: "Ananya", text: "No spoilers please." },
      { sender: "Neha", text: "Should we all watch it together?" },
      { sender: "Vikram", text: "I'm in." },
      { sender: "Sneha", text: "Saturday night then. Everyone start episode one before that." }
    ]
  },
  {
    id: 54,
    title: "Pop-culture argument",
    messages: [
      { sender: "Rohan", text: "I'm saying it again: Actor A is better than Actor B." },
      { sender: "Kabir", text: "Absolutely not." },
      { sender: "Priya", text: "Depends on the role." },
      { sender: "Ananya", text: "Finally, someone reasonable." },
      { sender: "Neha", text: "Actor B has way more range." },
      { sender: "Vikram", text: "But Actor A has better screen presence." },
      { sender: "Sneha", text: "We've somehow turned a casual chat into a courtroom." },
      { sender: "Aarav", text: "And there is still no verdict 😂" }
    ]
  },
  {
    id: 55,
    title: "Funny video/meme",
    messages: [
      { sender: "Kabir", text: "😂 😂 Guys, look at this." },
      { sender: "Priya", text: "NOOOO 😭" },
      { sender: "Rohan", text: "The ending killed me." },
      { sender: "Ananya", text: "I watched it three times." },
      { sender: "Neha", text: "Why does this remind me of Vikram?" },
      { sender: "Vikram", text: "How am I involved in this??" },
      { sender: "Sneha", text: "You aren't. That's what makes it funnier." },
      { sender: "Vikram", text: "I'm leaving this group." }
    ]
  },
  {
    id: 56,
    title: "Movie night",
    messages: [
      { sender: "Neha", text: "Movie night tomorrow?" },
      { sender: "Aarav", text: "Yes." },
      { sender: "Rohan", text: "Action movie." },
      { sender: "Priya", text: "No. Something funny." },
      { sender: "Kabir", text: "Thriller?" },
      { sender: "Ananya", text: "We've spent ten minutes choosing and haven't agreed on anything." },
      { sender: "Vikram", text: "Let's shortlist three and vote." },
      { sender: "Sneha", text: "Good idea. Majority wins." }
    ]
  },
  {
    id: 57,
    title: "Book recommendation",
    messages: [
      { sender: "Ananya", text: "Just finished a really good book." },
      { sender: "Priya", text: "What's it called?" },
      { sender: "Ananya", text: "The Silent Patient." },
      { sender: "Rohan", text: "Is it actually worth reading?" },
      { sender: "Ananya", text: "Definitely, especially if you like psychological mysteries." },
      { sender: "Kabir", text: "Don't tell me anything about the ending." },
      { sender: "Ananya", text: "I won't. Just read it." },
      { sender: "Neha", text: "Adding it to my list." }
    ]
  },
  {
    id: 58,
    title: "Running group joke",
    messages: [
      { sender: "Vikram", text: "Reminder: meeting at 7 tomorrow." },
      { sender: "Rohan", text: "“7” according to Vikram or actual 7?" },
      { sender: "Priya", text: "😂" },
      { sender: "Vikram", text: "Very funny. I'm always on time." },
      { sender: "Kabir", text: "You once arrived after the event ended." },
      { sender: "Vikram", text: "That happened ONE time." },
      { sender: "Neha", text: "We have photographic evidence." },
      { sender: "Vikram", text: "I'm never living that down, am I?" }
    ]
  },
  {
    id: 59,
    title: "Roommates dividing chores/bills",
    messages: [
      { sender: "Aarav", text: "Can we please decide who's cleaning the kitchen this week?" },
      { sender: "Kabir", text: "I cleaned it last week." },
      { sender: "Priya", text: "I did the bathroom, though." },
      { sender: "Neha", text: "I'll take the kitchen if someone handles the trash." },
      { sender: "Rohan", text: "I'll do the trash." },
      { sender: "Ananya", text: "I'll sweep and mop tomorrow." },
      { sender: "Vikram", text: "I'll handle the grocery bill." },
      { sender: "Sneha", text: "Great. Everyone has a job. Problem solved." }
    ]
  },
  {
    id: 60,
    title: "Noisy neighbors",
    messages: [
      { sender: "Priya", text: "Does anyone else hear that music?" },
      { sender: "Neha", text: "Yep. It's been going on for an hour." },
      { sender: "Rohan", text: "My room is literally vibrating." },
      { sender: "Kabir", text: "Should we complain?" },
      { sender: "Ananya", text: "Maybe ask them politely first." },
      { sender: "Vikram", text: "I'll go downstairs and talk to them." },
      { sender: "Priya", text: "Thanks. Hopefully they'll turn it down." },
      { sender: "Vikram", text: "Update: they apologized and lowered the volume." }
    ]
  }
];

module.exports = { BURSTS_60 };
