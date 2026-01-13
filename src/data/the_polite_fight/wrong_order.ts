import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const wrongOrder: Script = {
  id: "polite-wrong-order",
  title: "The Wrong Coffee Order",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "You ordered iced. They gave you hot. How to get it fixed without feeling guilty.",
  imageUrl: "/images/scenarios/wrong_order_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The Strategic Apology",
    content: "In polite English (especially British/Canadian), we often apologize when OTHER people make mistakes. We say 'I think I might have said the wrong thing' even when we didn't. This allows the other person to fix the mistake without feeling stupid or attacked."
  },
  sentences: [
    {
      id: "order-1",
      scenario: "Barista hands you a hot latte. You definitely ordered iced.",
      en: "The Self-Blame",
      keywords: [
        { word: "iced", definition: "cold with ice" },
        { word: "sorry", definition: "apology" }
      ],
      badResponse: {
        text: "You: 'I said iced. Remake this.'",
        why: "Correct, but cold. It creates tension."
      },
      goodResponse: {
        text: "You: 'So [sorry], I think I might have asked for this [iced]?'",
        why: "Taking the blame ('I think I might have') makes them eager to help you."
      }
    },
    {
      id: "order-2",
      scenario: "They look annoyed but agree to fix it.",
      en: "The Reinforcement",
      keywords: [
        { word: "messed up", definition: "made a mistake" },
        { word: "swap", definition: "exchange" }
      ],
      badResponse: {
        text: "You: 'Finally. Get it right this time.'",
        why: "Never kick someone when they are correcting a mistake."
      },
      goodResponse: {
        text: "You: 'I totally [messed up] explaining it. Can we [swap] this for an iced one?'",
        why: "Doubling down on self-deprecation ('totally messed up') ensures they don't spit in your drink."
      }
    },
    {
      id: "order-3",
      scenario: "They hand you the new drink.",
      en: "The Gratitude",
      keywords: [
        { word: "appreciate", definition: "value" },
        { word: "rush", definition: "hurry" }
      ],
      badResponse: {
        text: "You: (Grab drink and walk away silently)",
        why: "Silence implies you are still angry."
      },
      goodResponse: {
        text: "You: 'No [rush] at all! I really [appreciate] you fixing it.'",
        why: "Leaving them with a compliment ('appreciate you') resets the interaction to positive."
      }
    }
  ],
  quizItems: [
    {
      question: "Why do we apologize when the Barista makes a mistake?",
      options: [
        "Because we are stupid.",
        "It is specific to coffee shops.",
        "It is a social tool to reduce tension (Face Saving).",
        "It increases the price."
      ],
      correctIndex: 2,
      explanation: "It isn't about guilt. It's about lubrication. It makes the transaction smooth."
    },
    {
      question: "If you are rude to a barista, what is the risk?",
      options: [
        "They might cry.",
        "They might give you bad service (or worse, decaf).",
        "They will call your mom.",
        "Nothing."
      ],
      correctIndex: 1,
      explanation: "Service workers have power over your food. Be nice."
    },
    {
      question: "What is the best tone for correcting an order?",
      options: [
        "Confused and apologetic.",
        "Angry and loud.",
        "Silent staring.",
        "Sarcastic clapping."
      ],
      correctIndex: 0,
      explanation: "Acting confused ('Oh, did I say hot?') is safer than acting superior."
    }
  ]
};
