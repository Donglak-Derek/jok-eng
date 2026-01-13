import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const borrowingBlackHole: Script = {
  id: "polite-borrowing-black-hole",
  title: "The Borrowing Black Hole",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to ask for your stuff back without sounding like a loan shark.",
  imageUrl: "/images/scenarios/borrowing_black_hole_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The 'I Need It' Excuse",
    content: "Asking for a borrowed item back can feel awkward because it implies you don't trust them to return it (even if they forgot!). The polite hack is to invent a specific reason you need it *right now*. This forces them to return it immediately without you having to accuse them of being lazy."
  },
  sentences: [
    {
      id: "borrow-1",
      scenario: "Friend has had your book for 6 months.",
      en: "The Reference Check",
      keywords: [
        { word: "finish", definition: "complete" },
        { word: "chance", definition: "opportunity" }
      ],
      badResponse: {
        text: "You: 'Give me my book back! You stole it!'",
        why: "Calling a friend a thief is a friendship-ender."
      },
      goodResponse: {
        text: "You: 'Hey! Did you have a [chance] to [finish] that book yet? No rush if not!'",
        why: "'No rush' is a polite lie. It takes the pressure off while reminding them they have it."
      }
    },
    {
      id: "borrow-2",
      scenario: "They say 'Oh, not yet, I'll get to it soon.' (You want it back now)",
      en: "The Sudden Need",
      keywords: [
        { word: "reference", definition: "look up info" },
        { word: "check", definition: "verify" }
      ],
      badResponse: {
        text: "You: 'No, give it back now. You are too slow.'",
        why: "Insulting their reading speed is petty."
      },
      goodResponse: {
        text: "You: 'Actually, could I grab it back just to [check] a [reference]? I need it for a project.'",
        why: "Creating a 'project' gives you a valid deadline. They can't argue with a necessity."
      }
    },
    {
      id: "borrow-3",
      scenario: "Someone borrowed money ($20) and 'forgot'.",
      en: "The Casual Reminder",
      keywords: [
        { word: "settle", definition: "pay debt" },
        { word: "transfer", definition: "send money" }
      ],
      badResponse: {
        text: "You: 'Where is my money??'",
        why: "For small amounts ($20), aggression looks desperate."
      },
      goodResponse: {
        text: "You: 'Hey, next time you're on Venmo/CashApp, want to [settle] up for that lunch? No rush, just doing my monthly [transfer].'",
        why: "Framing it as 'doing accounts' or 'monthly admin' makes the request sound routine, not personal."
      }
    }
  ],
  quizItems: [
    {
      question: "Why is it awkward to ask for borrowed things back?",
      options: [
        "It isn't awkward.",
        "It implies distrust or stinginess.",
        "It is illegal.",
        "Nobody borrows things."
      ],
      correctIndex: 1,
      explanation: "It highlights a failure in the social contract (they failed to return it)."
    },
    {
      question: "What is the best way to get an item back quickly?",
      options: [
        "Steal it back.",
        "Invent a specific reason you need it (The 'Need it now' excuse).",
        "Cry.",
        "Wait forever."
      ],
      correctIndex: 1,
      explanation: "If you 'need it for work' or 'a trip', they have to return it immediately."
    },
    {
      question: "For small money debts, what is the best tone?",
      options: [
        "Casual.",
        "Legalistic.",
        "Threatening.",
        "Romantic."
      ],
      correctIndex: 0,
      explanation: "Treat big debts seriously. Treat small debts casually to preserve the relationship."
    }
  ]
};
