import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const potluckPanic: Script = {
  id: "party-potluck-panic",
  title: "Potluck Panic",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish: "When you bring chips to a gourmet feast.",
  imageUrl: "/images/scenarios/potluck_panic.png",
  difficulty: "Mild 🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "I was invited to a [potluck dinner] last night.",
      keywords: [
        { word: "potluck dinner", definition: "Hidden: everyone brings a dish" },
      ],
    },
    {
      id: "s2",
      en: "I forgot to cook, so I bought [potato chips].",
      keywords: [
        { word: "potato chips", definition: "Hidden: lazy snack option" },
      ],
    },
    {
      id: "s3",
      en: "Everyone else brought [homemade lasagna] and fancy salads.",
      keywords: [
        { word: "homemade lasagna", definition: "Hidden: effort-filled food" },
      ],
    },
    {
      id: "s4",
      en: "I poured my chips into a [fancy bowl] to hide my shame.",
      keywords: [
        { word: "fancy bowl", definition: "Hidden: disguise attempt" },
      ],
    },
    {
      id: "s5",
      en: "Surprisingly, the chips were the first thing [to vanish].",
      keywords: [
        { word: "to vanish", definition: "Hidden: to be eaten completely" },
      ],
    },
  ],

  culturalNote: {
    title: "Potluck Etiquette",
    content: "A potluck is a party where guests bring food to share. The 'rule' is usually to make something yourself, but store-bought items are common last-minute saves. Bringing just a bag of chips when others cooked elaborate meals can feel embarrassing, but ironically, people often love the junk food most."
  },

  quizItems: [
    {
      question: "What is a potluck?",
      options: ["Gambling game", "Shared meal party", "Cooking competition", "Restaurant name"],
      correctIndex: 1,
      explanation: "A potluck is a gathering where each guest contributes a dish of food."
    },
    {
      question: "What mistake did the narrator make?",
      options: ["Forgot to go", "Didn't cook anything", "Ate everything", "Spilled the food"],
      correctIndex: 1,
      explanation: "They forgot to cook and bought chips instead."
    },
    {
      question: "What happened to the chips?",
      options: ["No one ate them", "They got soggy", "They were eaten first", "The host threw them away"],
      correctIndex: 2,
      explanation: "Despite being simple, the chips were very popular and vanished first."
    }
  ]
};
