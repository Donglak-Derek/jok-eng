import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const tacoTuesday: Script = {
  id: "party-taco-tuesday",
  title: "Taco Tuesday",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "basics",
  cleanedEnglish: "A fun story about misinterpreting a weekly food special as a serious cultural holiday.",
  imageUrl: "/images/scenarios/taco_tuesday.png",
  difficulty: "Mild 🌶️",
  mode: "cloze",
  type: "script",
  
  // Interactive Script (Cloze Mode)
  sentences: [
    {
      id: "s1",
      en: "I thought 'Taco Tuesday' was a [major cultural event] in America.",
      keywords: [
        { word: "major cultural event", definition: "Hidden: serious holiday" },
      ],
    },
    {
      id: "s2",
      en: "So I wore my best [suit and tie] to the Mexican restaurant.",
      keywords: [
        { word: "suit and tie", definition: "Hidden: formal clothes" },
      ],
    },
    {
      id: "s3",
      en: "Everyone else was in [shorts and t-shirts] eating cheap tacos.",
      keywords: [
        { word: "shorts and t-shirts", definition: "Hidden: casual clothes" },
      ],
    },
    {
      id: "s4",
      en: "The waiter asked if I was coming from a [funeral].",
      keywords: [
        { word: "funeral", definition: "Hidden: ceremony for the dead" },
      ],
    },
    {
      id: "s5",
      en: "I said, 'No, I'm here to [respect] the taco.'",
      keywords: [
        { word: "respect", definition: "Hidden: honor" },
      ],
    },
  ],

  // Culture Context
  culturalInsights: {
    title: "Why is this funny?",
    content: "In the US, 'Taco Tuesday' isn't a holiday. It's just a marketing trick where restaurants sell cheap tacos (usually $1 or $2) on Tuesdays. It's a very casual event. Dressing up for it looks ridiculous because it's associated with saving money and eating greasy food, not fine dining."
  },

  // Exit Ticket
  quizItems: [
    {
      question: "What is Taco Tuesday?",
      options: ["A national religious holiday", "A weekly discount on tacos", "A formal Mexican celebration", "A day to wear suits"],
      correctIndex: 1,
      explanation: "It's a weekly promotion where restaurants offer discounted tacos, usually for $1-2."
    },
    {
      question: "Why was the narrator's outfit funny?",
      options: ["It was too colorful", "He was naked", "He wore a suit to a cheap, casual event", "He wore a taco costume"],
      correctIndex: 2,
      explanation: "Taco Tuesday is extremely casual. Wearing a suit signals you completely misunderstood the 'vibe'."
    },
    {
      question: "What did the waiter ask?",
      options: ["If he wanted mild sauce", "If he was coming from a funeral", "If he was the health inspector", "If he wanted to buy the restaurant"],
      correctIndex: 1,
      explanation: "Because he was dressed so formally and somberly in a casual setting, the waiter jokingly assumed someone had died."
    }
  ]
};
