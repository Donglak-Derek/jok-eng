import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const karenDiffuser: Script = {
  id: "karen-diffuser",
  title: "The 'Karen' Diffuser",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to complain to customer service without being the worst customer they see all day.",
  imageUrl: "/images/scenarios/karen_diffuser_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The Complaint Sandwich",
    content: "Service workers are used to being yelled at. To get what you want, you must separate yourself from the 'Karens'. The trick is to state facts without emotion, and if possible, use the 'Sandwich Method': Start with understanding, insert the complaint, end with gratitude."
  },
  sentences: [
    {
      id: "karen-1",
      scenario: "You bought milk that is expired. You return to the store.",
      en: "The Fact Check",
      keywords: [
        { word: "expired", definition: "past date" },
        { word: "sorry", definition: "apology (polite)" }
      ],
      badResponse: {
        text: "You: 'This is disgusting! Are you trying to poison people?'",
        why: "Hyperbole ('poison') makes you look crazy. It puts the clerk on the defensive."
      },
      goodResponse: {
        text: "You: 'Hey, so [sorry] to be that guy, but I think this milk is [expired].'",
        why: "'Sorry to be that guy' acknowledges that returning items is annoying, which builds empathy."
      }
    },
    {
      id: "karen-2",
      scenario: "Waitress brings you the wrong dish.",
      en: "The Confusion Shield",
      keywords: [
        { word: "verify", definition: "check" },
        { word: "ordered", definition: "requested" }
      ],
      badResponse: {
        text: "You: 'I didn't order this! Take it back!'",
        why: "Treating the server like a servant is the fastest way to get bad service."
      },
      goodResponse: {
        text: "You: 'I think this might be different from what I [ordered]. Could we quicky [verify]?'",
        why: "Phrasing it as 'verifying' suggests it might be a system error, not their personal failure."
      }
    },
    {
      id: "karen-3",
      scenario: "The price on the receipt is higher than the shelf price.",
      en: "The Vivid Memory",
      keywords: [
        { word: "vividly", definition: "clearly" },
        { word: "check", definition: "investigate" }
      ],
      badResponse: {
        text: "You: 'You are ripping me off! That label said $5!'",
        why: "Accusing a minimum wage worker of theft ('ripping me off') is insane."
      },
      goodResponse: {
        text: "You: 'I [vividly] remember seeing a different price on the shelf. Can we [check]?'",
        why: "'Vividly' implies you are certain, but 'Can we check' invites them to see for themselves."
      }
    }
  ],
  quizItems: [
    {
      question: "What is the main goal when complaining politely?",
      options: [
        "To make the worker cry.",
        "To get what you want without ruining someone's day.",
        "To get a free meal.",
        "To prove you are smart."
      ],
      correctIndex: 1,
      explanation: "Politeness is strategic. Happy workers solve problems faster."
    },
    {
      question: "Why should you say 'Sorry to be that guy'?",
      options: [
        "Because you are weak.",
        "It signals self-awareness that complaining is awkward.",
        "Because you are Canadian.",
        "It is a law."
      ],
      correctIndex: 1,
      explanation: "It disarms the situation immediately."
    },
    {
      question: "Which of these is a 'Karen' move?",
      options: [
        "Asking to speak to the manager immediately.",
        "Smiling.",
        "Saying 'no thank you'.",
        "Waiting in line."
      ],
      correctIndex: 0,
      explanation: "Escalating to authority before trying to solve it nicely is a classic Karen trait."
    }
  ]
};
