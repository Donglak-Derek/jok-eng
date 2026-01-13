import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmClearly: Script = {
  id: "sarcasm-clearly",
  title: "Clearly / Obviously",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "How to call someone stupid without using bad words. Decoding 'Clearly' and 'Obviously'.",
  imageUrl: "/images/scenarios/sarcasm_clearly_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The Intellectual Slap",
    content: "When explaining something, adding 'Clearly' or 'Obviously' at the start implies: 'This is simple, so why don't you understand it?'. It is a way to claim intellectual superiority. Watch out for it in meetings."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You ask a question in a meeting. The presenter sighs and says: 'Well, obviously, we considered that.'",
      en: "The Meeting Slap",
      keywords: [
        { word: "asked", definition: "inquired" },
        { word: "explain", definition: "describe details" }
      ],
      badResponse: {
        text: "You: 'Oh, okay. Sorry.'",
        why: "Don't apologize for asking a question. They are being defensive."
      },
      goodResponse: {
        text: "You: 'If it was obvious, I wouldn't have [asked]. Can you [explain] the details?'",
        why: "You stood your ground. If they claim it's obvious, force them to prove it."
      }
    },
    {
      id: "s2",
      scenario: "You make a small mistake. A coworker says: 'Clearly, you didn't read the manual.'",
      en: "The Assumption",
      keywords: [
        { word: "mistake", definition: "error" },
        { word: "helpful", definition: "useful" }
      ],
      badResponse: {
        text: "You: 'I am so stupid. You are right.'",
        why: "Don't let them define your competence based on one error."
      },
      goodResponse: {
        text: "You: 'I read it. This is a specific [mistake]. pointing it out isn't [helpful].'",
        why: "You separated the mistake from your intelligence. 'Clearly' was an overreach."
      }
    },
    {
      id: "s3",
      scenario: "Someone is losing an argument. They say: 'Well, clearly you just don't get it.'",
      en: "The Exit Strategy",
      keywords: [
        { word: "understand", definition: "comprehend" },
        { word: "convince", definition: "persuade" }
      ],
      badResponse: {
        text: "You: 'I do get it! I am smart!'",
        why: "They are baiting you. Arguing about your intelligence diverts from the real topic."
      },
      goodResponse: {
        text: "You: 'I [understand] fine. You just failed to [convince] me.'",
        why: "Reframing: The problem isn't your brain, it's their argument."
      }
    },
    {
      id: "s4",
      scenario: "A friend is explaining a movie plot you already know. They keep saying 'Obviously... obviously...'",
      en: "The Mansplainer",
      keywords: [
        { word: "know", definition: "be aware of" },
        { word: "skip", definition: "move past" }
      ],
      badResponse: {
        text: "You: (Silence)",
        why: "Silence just encourages them to keep talking down to you."
      },
      goodResponse: {
        text: "You: 'I [know] all this. Can we [skip] to the part I don't know?'",
        why: "Politely interrupting 'obvious' explanations saves everyone time."
      }
    }
  ],
  quizItems: [
    {
      question: "Why is 'Obviously' considered rude in an explanation?",
      options: [
        "It is too long.",
        "It implies the listener is stupid for not knowing already.",
        "It is bad grammar.",
        "It is too loud."
      ],
      correctIndex: 1,
      explanation: "If it was truly obvious, it wouldn't need to be said. Saying it insults the listener's awareness."
    },
    {
      question: "Your boss says 'Clearly, we need to work harder'. mental translation:",
      options: [
        "The windows are clear.",
        "I am happy with our work.",
        "You are failing and I am disappointed.",
        "Let's have a party."
      ],
      correctIndex: 2,
      explanation: "'Clearly' here frames the failure as an undeniable fact."
    },
    {
      question: "What is the non-sarcastic synonym for 'Clearly'?",
      options: [
        "Ironically.",
        "Visibly / It seems.",
        "Stupidly.",
        "Never."
      ],
      correctIndex: 1,
      explanation: "You can use 'It seems' to be polite. 'Clearly' is the aggressive version."
    }
  ]
};
