import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theBusyTrap: Script = {
  id: "date_busy_trap",
  title: "The 'Busy' Trap",
  section: "The Dating Minefield",
  type: "decoder",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Is he ghosting you or just CEO of a Fortune 500 company? (Spoiler: He's ghosting you).",
  sentences: [],
    imageUrl: "/images/scenarios/the_busy_trap.png",
  decoderItems: [
    {
      id: "busy_1",
      phrase: "I'm super [busy] this week.",
      literalMeaning: "My schedule is packed with work/events.",
      actualMeaning: "You are not a priority. People make time for people they like.",
      dangerLevel: "⚠️ Medium",
      survivalTip: "Match their energy. Say 'No worries, me too.' Do not double text.",
      keywords: [
          { word: "busy", definition: "Often a polite excuse to avoid commitment." }
      ]
    },
    {
      id: "busy_2",
      phrase: "My phone [died].",
      literalMeaning: "Battery reached 0%.",
      actualMeaning: "I saw your text, ignored it, and now I need an excuse for the 6-hour delay.",
      dangerLevel: "🤔 Low/Medium",
      survivalTip: "Accept it once. If their battery dies every Friday night, they are lying.",
      keywords: [
          { word: "died", definition: "Ran out of battery (often used as a convenient excuse)." }
      ]
    },
    {
      id: "busy_3",
      phrase: "I'm bad at [texting].",
      literalMeaning: "I struggle with digital communication skills.",
      actualMeaning: "I'm bad at texting *you*. I text my friends instantly.",
      dangerLevel: "🚩 High / Soft Rejection",
      survivalTip: "This is a soft rejection. Lower your expectations to zero.",
      keywords: [
          { word: "texting", definition: "The primary mode of modern dating communication." }
      ]
    },
    {
      id: "busy_4",
      phrase: "Maybe, let me [check] my schedule.",
      literalMeaning: "I need to verify my availability.",
      actualMeaning: "No. (But I might say yes if my better plans fall through).",
      dangerLevel: "⚠️ Medium",
      survivalTip: "Don't hold the date. Make other plans. You are the backup option.",
      keywords: [
          { word: "check", definition: "To verify; here implies hesitation." }
      ]
    },
    {
      id: "busy_5",
      phrase: "Something [came up].",
      literalMeaning: "An unexpected event occurred.",
      actualMeaning: "I found something better to do / I just don't want to go.",
      dangerLevel: "🔥 High",
      survivalTip: "If they don't propose a new time immediately ('Can we do Tuesday instead?'), they are done.",
      keywords: [
          { word: "came up", definition: "Happened unexpectedly." }
      ]
    },
  ],
  quizItems: [
    {
      question: "If someone says 'I'm bad at texting', what do they usually mean?",
      options: [
        "They have big thumbs.",
        "They truly prefer phone calls.",
        "You are not a priority for them.",
        "They lost their phone."
      ],
      correctIndex: 2,
      explanation: "People text who they like. 'Bad at texting' is usually a soft rejection."
    },
    {
      question: "What is the best response to 'I'm super busy this week'?",
      options: [
        "Ask them for their schedule every day.",
        "Say 'No worries' and wait for them to reach out.",
        "Send an angry emoji.",
        "Show up at their house."
      ],
      correctIndex: 1,
      explanation: "Match their energy. If they want to see you, they will suggest a time."
    },
    {
      question: "If they cancel ('Something came up') without resizing, you should...",
      options: [
        "Move on.",
        "Wait by the phone.",
        "Ask 'Why?' repeatedly.",
        "Apologize."
      ],
      correctIndex: 0,
      explanation: "Canceling without a new plan usually means low interest."
    }
  ],
  culturalInsights: {
    title: "The Busy Culture",
    content: "In Western dating culture, 'busy' is the ultimate shield. It's polite but firm. It avoids the awkwardness of a direct 'no'. Understanding this code saves you time and dignity.",
    vocabulary: [
      { word: "Soft Rejection", definition: "Rejecting someone indirectly to avoid conflict." },
      { word: "Ghosting", definition: "Disappearing without explanation." },
      { word: "Backup Option", definition: "Someone you keep around just in case better plans fail." }
    ]
  }
};
