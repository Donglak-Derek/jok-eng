import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const giftFace: Script = {
  id: "party-gift-face",
  title: "The 'Gift Face'",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish: "Pretending to love ugly socks is an art form.",
  imageUrl: "/images/scenarios/gift_face.png",
  difficulty: "Spicy 🌶️🌶️🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "It was my birthday, and my aunt handed me a [lumpy package].",
      keywords: [
        { word: "lumpy package", definition: "Hidden: shapeless gift" },
      ],
    },
    {
      id: "s2",
      en: "I unwrapped it to reveal a [neon green sweater].",
      keywords: [
        { word: "neon green sweater", definition: "Hidden: ugly clothing" },
      ],
    },
    {
      id: "s3",
      en: "I had to instantly perfect my ['Gift Face'].",
      keywords: [
        { word: "Gift Face", definition: "Hidden: fake smile" },
      ],
    },
    {
      id: "s4",
      en: "I smiled wide and said '[It is... so unique!]' with false joy.",
      keywords: [
        { word: "It is... so unique!", definition: "Hidden: polite lie" },
      ],
    },
    {
      id: "s5",
      en: "Inside, I was already planning which closet to [hide it in].",
      keywords: [
        { word: "hide it in", definition: "Hidden: store forever" },
      ],
    },
  ],

  culturalNote: {
    title: "The Art of Receiving Gifts",
    content: "In Western culture, you must open gifts in front of the giver. If you don't like it, you cannot show it. You must use your 'Gift Face'—a polite, enthusiastic smile—and say something neutral like 'Wow, I don't have anything like this!' to avoid hurting feelings."
  },

  quizItems: [
    {
      question: "What is 'Gift Face'?",
      options: ["A mask", "A fake smile of gratitude", "A disappointed look", "A funny face"],
      correctIndex: 1,
      explanation: "It's the performance of looking happy when receiving a bad gift."
    },
    {
      question: "What did the narrator receive?",
      options: ["Money", "A car", "A neon green sweater", "A puppy"],
      correctIndex: 2,
      explanation: "An ugly neon green sweater."
    },
    {
      question: "What does 'unique' mean in this context?",
      options: ["One of a kind", "Expensive", "Ugly/Weird", "Perfect"],
      correctIndex: 2,
      explanation: "It's a polite code word for something that looks strange or bad."
    }
  ]
};
