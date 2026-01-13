import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const unsolicitedAdvice: Script = {
  id: "polite-unsolicited-advice",
  title: "The 'Advice' You Didn't Ask For",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "Shutting down nosy comments about your life/diet/dating without starting a war.",
  imageUrl: "/images/scenarios/unsolicited_advice_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The 'Interesting' Shield",
    content: "When people give unwanted advice, they usually want to feel smart or helpful. Fighting them ('That is stupid') hurts their ego. The best defense is to call their idea 'Interesting' or 'A unique perspective'. It acknowledges them without agreeing to anything."
  },
  sentences: [
    {
      id: "advice-1",
      scenario: "Relative says: 'You know, you should really lose some weight.'",
      en: "The Pivot",
      keywords: [
        { word: "happy", definition: "content" },
        { word: "perspective", definition: "viewpoint" }
      ],
      badResponse: {
        text: "You: 'Mind your own business, you old hag.'",
        why: "Correct sentiment, but it ruins Thanksgiving dinner."
      },
      goodResponse: {
        text: "You: 'That's an interesting [perspective]! I'm actually really [happy] with my routine right now, though.'",
        why: "Blocking the advice with your own happiness ('I'm happy') makes you bulletproof."
      }
    },
    {
      id: "advice-2",
      scenario: "Co-worker says: 'If I were you, I would do this project totally differently.'",
      en: "The Management",
      keywords: [
        { word: "handle", definition: "manage" },
        { word: "appreciate", definition: "value" }
      ],
      badResponse: {
        text: "You: 'Nobody asked you, Dave.'",
        why: "Aggressive dismissal creates a workplace enemy."
      },
      goodResponse: {
        text: "You: 'I [appreciate] you looking out for the team, but I'm going to [handle] this my own way for now.'",
        why: "You validate their intention ('looking out') while firmly rejecting their method."
      }
    },
    {
      id: "advice-3",
      scenario: "Friend keeps pushing: 'You really need to break up with him.'",
      en: "The Soft No",
      keywords: [
        { word: "mind", definition: "memory/thoughts" },
        { word: "decide", definition: "choose" }
      ],
      badResponse: {
        text: "You: 'Stop telling me what to do!'",
        why: "This sounds like a tantrum."
      },
      goodResponse: {
        text: "You: 'I'll definitely keep that in [mind] if I [decide] to make a change.'",
        why: "'If' is the key word. It protects your autonomy."
      }
    }
  ],
  quizItems: [
    {
      question: "What is the best way to respond to rude advice?",
      options: [
        "Scream.",
        "Agree with them.",
        "Neutral acknowledgment ('Interesting').",
        "Run away."
      ],
      correctIndex: 2,
      explanation: "Being neutral gives them nothing to fight against. It ends the conversation."
    },
    {
      question: "Why do people give advice you didn't ask for?",
      options: [
        "They are evil.",
        "They often want to feel useful or superior.",
        "They are paid by the government.",
        "They are robots."
      ],
      correctIndex: 1,
      explanation: "Understanding their ego helps you manage it without getting angry."
    },
    {
      question: "What does 'I'll keep that in mind' usually mean?",
      options: [
        "I will do it immediately.",
        "I will write it down.",
        "I heard you, but I will probably ignore it (Polite dismissal).",
        "My brain is full."
      ],
      correctIndex: 2,
      explanation: "It is a standard polite way to say 'No, thank you'."
    }
  ]
};
