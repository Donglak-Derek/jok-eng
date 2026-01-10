import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const karaokeFear: Script = {
  id: "party-karaoke-fear",
  title: "The Karaoke Trap",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "boss_battles",
  cleanedEnglish: "Singing badly is a requirement, not a mistake.",
  imageUrl: "/images/scenarios/karaoke_fear.png",
  difficulty: "Medium 🌶️🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "My friends dragged me to a [karaoke bar].",
      keywords: [
        { word: "karaoke bar", definition: "Hidden: singing venue" },
      ],
    },
    {
      id: "s2",
      en: "I told them I only sing [in the shower].",
      keywords: [
        { word: "in the shower", definition: "Hidden: privately" },
      ],
    },
    {
      id: "s3",
      en: "They put my name down for 'Bohemian Rhapsody' [as a joke].",
      keywords: [
        { word: "as a joke", definition: "Hidden: for fun/prank" },
      ],
    },
    {
      id: "s4",
      en: "I panicked, closed my eyes, and [screamed the lyrics].",
      keywords: [
        { word: "screamed the lyrics", definition: "Hidden: sang loudly/badly" },
      ],
    },
    {
      id: "s5",
      en: "The crowd cheered because confidence is better than [talent].",
      keywords: [
        { word: "talent", definition: "Hidden: singing ability" },
      ],
    },
  ],

  culturalNote: {
    title: "Karaoke Culture",
    content: "Karaoke is very popular in Asia and the West. In Western bars, you sing in front of strangers. The secret is that nobody cares if you are a good singer; they care if you are entertaining. 'Bohemian Rhapsody' is famously difficult to sing, making it a classic 'trap' song for beginners."
  },

  quizItems: [
    {
      question: "Where does the narrator usually sing?",
      options: ["On stage", "In the car", "In the shower", "Nowhere"],
      correctIndex: 2,
      explanation: "They claim to only sing privately 'in the shower'."
    },
    {
      question: "What song did they have to sing?",
      options: ["Happy Birthday", "Bohemian Rhapsody", "Wonderwall", "Let It Go"],
      correctIndex: 1,
      explanation: "The friends chose the complex song 'Bohemian Rhapsody'."
    },
    {
      question: "What is the lesson?",
      options: ["Never sing", "Drink more water", "Confidence > Talent", "Leave early"],
      correctIndex: 2,
      explanation: "The crowd cheered for the effort and confidence, not the skill."
    }
  ]
};
