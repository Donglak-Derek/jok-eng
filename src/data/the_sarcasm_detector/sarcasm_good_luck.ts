import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmGoodLuck: Script = {
  id: "sarcasm-good-luck",
  title: "Good Luck With That",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "When 'Good Luck' means 'You will fail'. Recognizing doubt and dismissal.",
  imageUrl: "/images/scenarios/sarcasm_good_luck_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The Curse of 'That'",
    content: "'Good luck' is nice. 'Good luck with THAT' is sarcastic. Adding 'that' creates distance, implying 'I want no part of this disaster'. It is a way of washing your hands of someone's bad idea."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You say you are going to fix your own plumbing. Your friend smirks: 'Good luck with that.'",
      en: "The Doubt",
      keywords: [
        { word: "confidence", definition: "belief in success" },
        { word: "call", definition: "phone contact" }
      ],
      badResponse: {
        text: "You: 'Thanks for the support!'",
        why: "Being sincere makes you look naive. They think you will flood your house."
      },
      goodResponse: {
        text: "You: 'I sense your lack of [confidence]. I'll [call] you when I succeed.'",
        why: "Playful defiance. You hear the doubt and challenge it."
      }
    },
    {
      id: "s2",
      scenario: "You plan to drive through rush hour traffic in 20 minutes. A local says: 'Good luck.' (Dry tone)",
      en: "The Impossible Mission",
      keywords: [
        { word: "impossible", definition: "cannot happen" },
        { word: "warning", definition: "caution" }
      ],
      badResponse: {
        text: "You: 'I am a fast driver.'",
        why: "You are ignoring reality. They know something you don't."
      },
      goodResponse: {
        text: "You: 'Is it [impossible]? Thanks for the [warning].'",
        why: "Taking the sarcasm as a factual warning is the smartest move for local advice."
      }, 
    },
    {
      id: "s3",
      scenario: "You tell a coworker you are going to ask the angry boss for a raise. They say: 'Wow. Good luck.'",
      en: "The Funeral",
      keywords: [
        { word: "scary", definition: "frightening" },
        { word: "need", definition: "require" }
      ],
      badResponse: {
        text: "You: 'I know, right? I deserve it.'",
        why: "You missed the danger signal. Their 'Good luck' was a goodbye."
      },
      goodResponse: {
        text: "You: 'You make it sound [scary]. Do I [need] body armor?'",
        why: "Using humor to acknowledge the danger levels the playing field."
      }
    },
    {
      id: "s4",
      scenario: "You are trying to assemble IKEA furniture without instructions.",
      en: "The Solo Pilot",
      keywords: [
        { word: "easy", definition: "simple" },
        { word: "watch", definition: "observe" }
      ],
      badResponse: {
        text: "You: 'It's easy logic.'",
        why: "Famous last words."
      },
      goodResponse: {
        text: "You: 'Don't just wish me luck, come [watch] the disaster. It won't be [easy].'",
        why: "Inviting them to watch the potential failure shows confidence and humor."
      }
    }
  ],
  quizItems: [
    {
      question: "What is the difference between 'Good luck!' and 'Good luck with THAT'?",
      options: [
        "No difference.",
        "'That' implies distance and judgment.",
        "'That' is more formal.",
        "'That' is friendlier."
      ],
      correctIndex: 1,
      explanation: "'With that' points at the activity like it's a dirty diaper. It signals 'I am not involved'."
    },
    {
      question: "If someone says 'Good luck' in a low, flat voice, it means:",
      options: [
        "They hope you win.",
        "They think you will lose/fail.",
        "They are tired.",
        "They are jealous."
      ],
      correctIndex: 1,
      explanation: "The flat tone removes the 'Good' from 'Good luck'. It becomes a prediction of doom."
    },
    {
      question: "When should you use the sarcastic 'Good luck'?",
      options: [
        "At a wedding.",
        "Before a surgery.",
        "When a friend is doing something stupid but harmless.",
        "Never."
      ],
      correctIndex: 2,
      explanation: "It's perfect for low-stakes bad ideas (like eating a super spicy pepper). Ideally avoid for serious life events."
    }
  ]
};
