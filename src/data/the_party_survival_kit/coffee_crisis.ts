import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const coffeeCrisis: Script = {
  id: "story-coffee-crisis",
  title: "The Coffee Size Crisis",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish: "Ordering a 'Small' coffee shouldn't require a translator.",
  imageUrl: "/images/scenarios/coffee_crisis.png",
  difficulty: "Mild 🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "I asked for a [small coffee] at the fancy cafe.",
      keywords: [
        { word: "small coffee", definition: "Hidden: simple request" },
      ],
    },
    {
      id: "s2",
      en: "The barista stared and said, 'We only have [Tall, Grande, or Venti].'",
      keywords: [
        { word: "Tall, Grande, or Venti", definition: "Hidden: confusing size names" },
      ],
    },
    {
      id: "s3",
      en: "I said 'Tall sounds big, so I'll take [the tiny one].'",
      keywords: [
        { word: "the tiny one", definition: "Hidden: smallest size" },
      ],
    },
    {
      id: "s4",
      en: "She handed me a 'Tall' cup that was [huge].",
      keywords: [
        { word: "huge", definition: "Hidden: unexpectedly large" },
      ],
    },
    {
      id: "s5",
      en: "I learned 'Tall' means [Small] in coffee language, which makes zero sense.",
      keywords: [
        { word: "Small", definition: "Hidden: the actual size" },
      ],
    },
  ],

  culturalNote: {
    title: "Why is this funny?",
    content: "Coffee chains like Starbucks use Italian-ish words for sizes that confuse everyone. 'Tall' sounds like 'Big', but it's actually their 'Small'. 'Venti' means 20 (ounces). The joke is that you need to learn a secret language just to get generic caffeine."
  },

  quizItems: [
    {
      question: "What does 'Tall' usually mean in normal English?",
      options: ["Short", "Wide", "High / Big", "Heavy"],
      correctIndex: 2,
      explanation: "Tall normally describes height/size, so calling a small cup 'Tall' is logically confusing."
    },
    {
      question: "What size did the narrator actually want?",
      options: ["A bucket", "A small", "A Venti", "A gallon"],
      correctIndex: 1,
      explanation: "He asked for a small, but got confused by the naming convention."
    },
    {
      question: "Why do cafes do this?",
      options: ["To be annoying", "To sound fancy/European", "They forgot English", "It's a law"],
      correctIndex: 1,
      explanation: "It's a branding strategy to make the coffee experience feel more premium or 'authentic'."
    }
  ]
};
