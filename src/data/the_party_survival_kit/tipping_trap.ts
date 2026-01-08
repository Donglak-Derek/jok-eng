import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const tippingTrap: Script = {
  id: "story-tipping-trap",
  title: "The Tipping Trap",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish: "A chaotic story about chasing a waiter to give them loose change.",
  imageUrl: "/images/scenarios/tipping_trap.png",
  difficulty: "Spicy 🌶️🌶️🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "I saw the bill was $20, so I left a [$2 coin] on the table.",
      keywords: [
        { word: "$2 coin", definition: "Hidden: 10% tip" },
      ],
    },
    {
      id: "s2",
      en: "The waiter gave me a look that could [melt steel].",
      keywords: [
        { word: "melt steel", definition: "Hidden: furious anger" },
      ],
    },
    {
      id: "s3",
      en: "I panicked and ran after him, shouting 'I have [quarters]!'",
      keywords: [
        { word: "quarters", definition: "Hidden: 25 cent coins" },
      ],
    },
    {
      id: "s4",
      en: "He stopped, turned, and said 'Keep your [laundry money], honey.'",
      keywords: [
        { word: "laundry money", definition: "Hidden: worthless change" },
      ],
    },
    {
      id: "s5",
      en: "I realized in America, tipping 10% is basically [an insult].",
      keywords: [
        { word: "an insult", definition: "Hidden: very rude" },
      ],
    },
  ],

  culturalNote: {
    title: "Why is this funny?",
    content: "Tipping in the US is serious business. While 10% might be fine in Europe or Asia, in the US, 15-20% is the standard minimum. Leaving coins (especially quarters) implies you're just dumping your trash on the table. The waiter's 'laundry money' burn highlights how little value the coins had to him compared to the insult."
  },

  quizItems: [
    {
      question: "What is the standard tip in the US?",
      options: ["Round up to nearest dollar", "10%", "15-20% minimum", "Included in the bill"],
      correctIndex: 2,
      explanation: "Service workers rely on tips. 20% is standard for good service."
    },
    {
      question: "Why was 'quarters' the wrong thing to shout?",
      options: ["Waiters hate math", "Coins are heavy", "It sounds cheap and childish", "Quarters are fake money"],
      correctIndex: 2,
      explanation: "Offering small coins creates an image of digging in your couch for spare change, not rewarding professional service."
    },
    {
      question: "What does 'melt steel' describe?",
      options: ["The food was hot", "The waiter's angry stare", "The weather outside", "The messy table"],
      correctIndex: 1,
      explanation: "It's a metaphor for an intense, burning glare of anger."
    }
  ]
};
