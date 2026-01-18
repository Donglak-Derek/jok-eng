import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theIrishGoodbye: Script = {
  id: "party-irish-goodbye",
  title: "The Irish Goodbye",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "boss_battles",
  cleanedEnglish: "I'm not rude, I'm just efficient at leaving.",
  imageUrl: "/images/scenarios/irish_goodbye_3d.png",
  difficulty: "Spicy 🌶️🌶️🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "The party was fun, but now I am [exhausted].",
      keywords: [
        { word: "exhausted", definition: "Hidden: very tired" },
      ],
    },
    {
      id: "s2",
      en: " saying goodbye to everyone will take [another hour].",
      keywords: [
        { word: "another hour", definition: "Hidden: too much time" },
      ],
    },
    {
      id: "s3",
      en: "So I decided to pull an [Irish Goodbye].",
      keywords: [
        { word: "Irish Goodbye", definition: "Hidden: leaving without saying bye" },
      ],
    },
    {
      id: "s4",
      en: "I slowly [backed away] while nobody was looking.",
      keywords: [
        { word: "backed away", definition: "Hidden: retreated secretly" },
      ],
    },
    {
      id: "s5",
      en: "Now I am home in my pajamas, with [zero regrets].",
      keywords: [
        { word: "zero regrets", definition: "Hidden: feeling good about it" },
      ],
    },
  ],

  culturalInsights: {
    title: "What is an Irish Goodbye?",
    content: "Also known as 'Ghosting' or 'The French Leave', it means leaving a social gathering without saying goodbye to anyone. It's often considered rude by older generations, but modern social etiquette accepts it as a practical way to escape large parties without getting stuck in long farewell conversations."
  },

  quizItems: [
    {
      question: "What is the main goal of an Irish Goodbye?",
      options: ["To steal food", "To leave quietly", "To offend the host", "To hide in the bathroom"],
      correctIndex: 1,
      explanation: "The goal is to exit without the long process of saying farewells."
    },
    {
      question: "Why did the narrator do it?",
      options: ["They were tired", "They hated everyone", "They had an emergency", "They were hungry"],
      correctIndex: 0,
      explanation: "The narrator was exhausted and didn't want to spend an hour saying goodbye."
    },
    {
      question: "How does the narrator feel about it?",
      options: ["Guilty", "Ashamed", "Happy/Regret-free", "Confused"],
      correctIndex: 2,
      explanation: "They are home in pajamas with 'zero regrets'."
    }
  ]
};
