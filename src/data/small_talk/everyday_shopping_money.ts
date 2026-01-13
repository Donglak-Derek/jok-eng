import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const shoppingAndMoney: Script = {
  id: "everyday-shopping-money",
  title: "Retail Therapy",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Just browsing, asking for discounts, and buyer's remorse.",
  imageUrl: "/images/scenarios/retail_therapy_browsing_3d.png",
  mode: "cloze",

  culturalInsights: {
    title: "The 'Just Looking' Defense",
    content: "Shop assistants are trained to greet you immediately. If you don't want help, the standard phrase is 'I'm just browsing, thanks!'. This effectively makes you invisible to them until you need something."
  },

  quizItems: [
    {
      question: "You try on a shirt. It looks terrible. The assistant asks 'How was it?'. You say:",
      options: [
        "It is ugly.",
        "It didn't quite work for me.",
        "I hate this store.",
        "Burn it."
      ],
      correctIndex: 1,
      explanation: "'It didn't work for me' is a polite way to say 'I look bad in this' or 'I don't like it'."
    },
    {
      question: "You want to know if there is a sale coming up. You ask:",
      options: [
        "Make this cheaper.",
        "Is this the best price?",
        "Any chance of a discount?",
        "I have no money."
      ],
      correctIndex: 2,
      explanation: "'Any chance of a discount?' is casual and low-risk. Worst they say is no."
    },
    {
      question: "A salesperson is following you. You want them to stop. You say:",
      options: [
        "Go away.",
        "I'm just browsing, thanks!",
        "I have no money.",
        "I am stealing this."
      ],
      correctIndex: 1,
      explanation: "'Just browsing' is the magic spell to make salespeople disappear."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Hovering Assistant",
      scenario: "Salesperson asks if you need help",
      keywords: [
        { word: "Browsing", definition: "Looking around" },
        { word: "Give a yell", definition: "Call out" }
      ],
      badResponse: {
          text: "Go away.",
          why: "Rude."
      },
      goodResponse: {
          text: "I'm just [browsing] for now, thanks! I'll [give a yell] if I need anything.",
          why: "Polite dismissal."
      }
    },
    {
      id: "s2",
      en: "The Price Shock",
      scenario: "Item is more expensive than expected",
      keywords: [
        { word: "Steep", definition: "Expensive" },
        { word: "Budget", definition: "Spending limit" }
      ],
      goodResponse: {
          text: "Oof, that's a little [steep] for my [budget] today.",
          why: "Honest but polite rejection based on price."
      }
    },
    {
      id: "s3",
      en: "The Polite Return",
      scenario: "You decided not to buy it",
      keywords: [
        { word: "Think about", definition: "Consider" },
        { word: "Lap", definition: "Walk around" }
      ],
      badResponse: {
          text: "I don't want it anymore.",
          why: "A bit blunt."
      },
      goodResponse: {
          text: "I'm going to [think about] it and do another [lap] around the store.",
          why: "The classic lie. You are never coming back."
      }
    },
    {
      id: "s4",
      en: "The Impulse Buy",
      scenario: "Buying something you don't need",
      keywords: [
        { word: "Treat", definition: "Reward" },
        { word: "Resist", definition: "Stop myself" }
      ],
      goodResponse: {
          text: "I really shouldn't... but I can't [resist]. Trying to [treat] myself today.",
          why: "Justifying the purchase makes you feel better."
      }
    },
    {
      id: "s5",
      en: "The Return Policy",
      scenario: "Checking if you can bring it back",
      keywords: [
        { word: "Change my mind", definition: "Decide differently" },
        { word: "Receipt", definition: "Proof of purchase" }
      ],
      goodResponse: {
          text: "Just in case I [change my mind], what's the return policy with the [receipt]?",
          why: "Smart shopping behavior."
      }
    }
  ]
};
