import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theBillStandoff: Script = {
  id: "the_bill_standoff",
  title: "The Bill Standoff",
  type: "script",
  section: "The Dating Minefield",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "The check arrives. Who reaches for it? The dance of 'fake searching for your wallet'.",
  imageUrl: "/images/scenarios/bill_standoff.png",
  mode: "cloze",
  sentences: [
    {
      id: "s1",
      en: "The waiter dropped the [check] on the table.",
      keywords: [{ word: "check", definition: "restaurant bill" }],
    },
    {
      id: "s2",
      en: "There was a long, awkward [silence].",
      keywords: [],
    },
    {
      id: "s3",
      en: "I did the '[wallet pat]' maneuver.",
      keywords: [{ word: "wallet pat", definition: "pretending to check pockets for money" }],
    },
    {
      id: "s4",
      en: "She didn't move, so I said, 'I've [got this].'",
      keywords: [{ word: "got this", definition: "I will pay for this" }],
    },
    {
      id: "s5",
      en: "She immediately said, 'Oh, thank you!' with [zero hesitation].",
      keywords: [{ word: "zero hesitation", definition: "instantly; no waiting" }],
    },
    {
      id: "s6",
      en: "I realized I ordered the [lobster].",
      keywords: [{ word: "lobster", definition: "expensive seafood dish" }],
    },
    {
      id: "s7",
      en: "My bank account began to [weep].",
      keywords: [{ word: "weep", definition: "cry softly" }],
    }
  ],
  culturalInsights: {
    title: "Who Pays?",
    content: "In modern dating, 'Whoever asks, pays' is the safest rule. However, many people still do the 'Bill Dance' where both pretend to offer, even if one expects to pay. Offering to 'split the bill' (go Dutch) is usually acceptable on a first date."
  },
  quizItems: [
    {
      question: "What does 'I've got this' mean in a restaurant?",
      options: ["I caught the ball", "I understand", "I will pay the bill", "I am sick"],
      correctIndex: 2,
      explanation: "It's a confident way to say you are taking care of the payment."
    },
    {
      question: "What is the 'wallet pat'?",
      options: ["Paying immediately", "Fake checking your pockets", "Hitting your wallet", "Stealing a wallet"],
      correctIndex: 1,
      explanation: "It's a performative gesture to show you are willing to pay, waiting to see if the other person offers."
    }
  ]
};
