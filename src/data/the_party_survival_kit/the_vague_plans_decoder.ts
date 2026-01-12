
import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theVaguePlansDecoder: Script = {
  id: "party-vague-plans-decoder",
  title: "The Vague Plans Decoder",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "boss_battles",
  cleanedEnglish: "Translating 'Let's do this again' into reality.",
  imageUrl: "/images/scenarios/vague_plans.png",
  difficulty: "Spicy 🌶️🌶️🌶️",
  type: "decoder",
  
  decoderItems: [
    {
      id: "d1",
      phrase: "We should do this again [sometime].",
      literalMeaning: "We should repeat this event in the future.",
      actualMeaning: "Goodbye forever. I am being polite, but I have no intention of initiating plans.",
      dangerLevel: "Caution ⚠️", // 50
      survivalTip: "If they don't set a specific date, it's just a pleasantry. Don't follow up.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "This was fun! We should do this again sometime.",
        textB: "Totally! Let me know when you're free.",
        contextNote: "'Sometime' usually means 'no time soon'."
      },
      keywords: [
          { word: "sometime", definition: "Indefinite future; likely never without a specific date." }
      ]
    },
    {
      id: "d2",
      phrase: "Let's grab coffee [soon].",
      literalMeaning: "Let us meet for coffee in the near future.",
      actualMeaning: "I like you enough to suggest a low-effort meeting, but not enough to schedule it now.",
      dangerLevel: "Safe ✅", // 15
      survivalTip: "This is a genuine opener, but the ball is in your court to make it concrete.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "It was great running into you! Let's grab coffee soon.",
        textB: "I'd love that. How's next Tuesday?",
        contextNote: "If you want it to happen, offer a specific day immediately."
      },
      keywords: [
           { word: "soon", definition: "No specific time frame; shows interest but no commitment." }
      ]
    },
    {
      id: "d3",
      phrase: "[I'll text you].",
      literalMeaning: "I will send you a text message.",
      actualMeaning: "The conversation is over. Please stop talking so I can leave.",
      dangerLevel: "Caution ⚠️", // 50
      survivalTip: "Don't ask 'When?'. Just say 'Sounds good' and walk away.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "Anyway, I gotta run. I'll text you.",
        textB: "Cool, talk to you later.",
        contextNote: "It's the most common way to end an awkward street encounter."
      },
      keywords: [
          { word: "I'll text you", definition: "A polite way to end interaction; conversation terminator." }
      ]
    },
    {
      id: "d4",
      phrase: "[I'll let you know].",
      literalMeaning: "I will inform you of my decision later.",
      actualMeaning: "The answer is no, but I don't want to reject you to your face.",
      dangerLevel: "Danger 🛑", // 90
      survivalTip: "Assume the answer is no and make other plans.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "Are you coming to the movie on Friday?",
        textB: "I have to check my schedule. I'll let you know.",
        contextNote: "If they wanted to come, they would say 'Probably!' or 'Yes!'."
      },
      keywords: [
          { word: "I'll let you know", definition: "A soft rejection; avoid waiting on this." }
      ]
    },
    {
      id: "d5",
      phrase: "[I'm around]!",
      literalMeaning: "I will be in the general vicinity.",
      actualMeaning: "I have no specific plans, but I'm also not committing to hanging out with you.",
      dangerLevel: "Safe ✅", // 15
      survivalTip: "It means they are available, but they want you to do the work of planning.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "Are you free this weekend?",
        textB: "Yeah, I'm around! What are you thinking?",
        contextNote: "This is a green light, but a lazy one."
      },
      keywords: [
          { word: "I'm around", definition: "Available but passive; puts the burden of planning on you." }
      ]
    },
  ],

  summaryPoints: [
    "'Sometime' is the enemy of actual plans.",
    "'I'll let you know' is almost always a soft 'no'.",
    "'I'll text you' is a conversation terminator, not a promise.",
    "If they don't offer a date, it's just politeness.",
    "Coffee is the universal 'low stakes' catch-up offer."
  ],

  quizItems: [
    {
      question: "What does 'We should do this again sometime' typically mean?",
      options: ["I want to do this tomorrow", "I hate you", "Goodbye, possibly forever", "I have a specific date in mind"],
      correctIndex: 2,
      explanation: "Without a specific time attached, it's just a polite way to say goodbye."
    },
    {
      question: "If someone says 'I'll let you know', you should:",
      options: ["Book the tickets immediately", "Wait by the phone", "Assume they aren't coming", "Demand an answer now"],
      correctIndex: 2,
      explanation: "It usually means they are looking for an excuse not to go."
    },
    {
      question: "Why is 'Let's grab coffee' safer than 'Let's have dinner'?",
      options: ["Coffee is cheaper", "It's low commitment and short", "Everyone likes coffee", "Dinner is for dates only"],
      correctIndex: 1,
      explanation: "Coffee is a low-stakes activity that can be as short as 20 minutes, making it a 'safe' invite."
    }
  ]
};
