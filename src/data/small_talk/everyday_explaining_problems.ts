import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const explainingProblems: Script = {
  id: "everyday-explaining-problems",
  title: "The Complaint Department",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Reporting bugs, broken stuff, and wrong orders without being a 'Karen'.",
  imageUrl: "/images/scenarios/complaint_department_3d.png",

  culturalNote: {
    title: "The 'Sandwich' Method",
    content: "When complaining, sandwich the bad news between two polite things. 'Hi! (Polite) This is broken (Bad). Thanks for helping! (Polite)'. It stops the other person from getting defensive."
  },

  quizItems: [
    {
      question: "Your hotel room is noisy. You call the front desk:",
      options: [
        "SHUT THEM UP!",
        "Hi, sorry to bother you, but there's a lot of noise next door.",
        "I demand a refund immediately.",
        "Call the police."
      ],
      correctIndex: 1,
      explanation: "Starting with 'Sorry to bother you' (even though it's their fault) is a psychological trick to get better service."
    },
    {
      question: "You dropped your phone in water. You tell the repair shop:",
      options: [
        "It just stopped working on its own. (Lie)",
        "I gave it a bath. Is it fixable?",
        "Fix it now.",
        "It's the phone's fault."
      ],
      correctIndex: 1,
      explanation: "Repair techs appreciate honesty. They know when you are lying about water damage."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Tech Support Call",
      scenario: "Your internet is down",
      keywords: [
        { word: "Cycling", definition: "Turning on/off" },
        { word: "Connecting", definition: "Linking" }
      ],
      badResponse: {
          text: "Nothing works. Fix it.",
          why: "Helpless."
      },
      goodResponse: {
          text: "I've tried [cycling] the power, but it's still not [connecting]. Any ideas?",
          why: "Shows you tried to fix it yourself first. Techs love this."
      }
    },
    {
      id: "s2",
      en: "The Wrong Order",
      scenario: "You ordered chicken, got fish",
      keywords: [
        { word: "Mix-up", definition: "Confusion/Mistake" },
        { word: "Ordered", definition: "Requested" }
      ],
      badResponse: {
          text: "You are stupid.",
          why: "Abusive and unnecessary."
      },
      goodResponse: {
          text: "Excuse me? I think there might be a [mix-up]. I actually [ordered] the chicken.",
          why: "'Mix-up' implies an innocent accident, not incompetence."
      }
    },
    {
      id: "s3",
      en: "The Mystery Sound",
      scenario: "Car/Appliance making noise",
      keywords: [
        { word: "Funny", definition: "Weird/Strange" },
        { word: "Noise", definition: "Sound" }
      ],
      goodResponse: {
          text: "It's making a [funny] clunking [noise] when I turn it on. It sounds angry.",
          why: "Describing the sound helps diagnose the problem."
      }
    },
    {
      id: "s4",
      en: "The Missing Item",
      scenario: "Delivery arrived incomplete",
      keywords: [
        { word: "Seem", definition: "Appear" },
        { word: "Short", definition: "Missing" }
      ],
      goodResponse: {
          text: "Hi, I just opened the box and we [seem] to be [short] one bracket.",
          why: "'Seem to be' softens the accusation that they forgot it."
      }
    },
    {
      id: "s5",
      en: "The Manager Request",
      scenario: "Front line staff can't help",
      keywords: [
        { word: "Escalate", definition: "Take higher" },
        { word: "Supervisor", definition: "Manager" }
      ],
      goodResponse: {
          text: "I understand your hands are tied. Is there a [supervisor] I could speak to to [escalate] this?",
          why: "Professional way to ask for the boss without screaming."
      }
    }
  ]
};
