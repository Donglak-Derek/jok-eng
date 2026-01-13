import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const doorHoldDilemma: Script = {
  id: "party-door-hold",
  title: "The Door Hold Dilemma",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "basics",
  cleanedEnglish: "Holding the door for someone who is just a little too far away.",
  imageUrl: "/images/scenarios/hug_shake.png", // Reusing an awkward social interaction image since generation failed
  difficulty: "Mild 🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "I held the door for a woman who was about [20 feet away].",
      keywords: [
        { word: "20 feet away", definition: "Hidden: too far" },
      ],
    },
    {
      id: "s2",
      en: "She saw me and felt forced to do the '[awkward run]'.",
      keywords: [
        { word: "awkward run", definition: "Hidden: half-jog" },
      ],
    },
    {
      id: "s3",
      en: "I stood there like a [doorman] for what felt like an hour.",
      keywords: [
        { word: "doorman", definition: "Hidden: hotel worker" },
      ],
    },
    {
      id: "s4",
      en: "She arrived [out of breath] and whispered 'Thanks'.",
      keywords: [
        { word: "out of breath", definition: "Hidden: panting" },
      ],
    },
    {
      id: "s5",
      en: "I realized my politeness actually [ruined her day].",
      keywords: [
        { word: "ruined her day", definition: "Hidden: made it worse" },
      ],
    },
  ],

  culturalInsights: {
    title: "Why is this funny?",
    content: "Politeness has a 'Goldilocks zone'. If you hold a door when someone is too far away, you force them to run so they don't keep you waiting. This creates the 'awkward run/jog'. You think you're being nice, but you're actually creating a social burden."
  },

  quizItems: [
    {
      question: "What is the 'awkward run'?",
      options: ["A marathon", "A light jog to show urgency/politeness", "Running away", "Dancing"],
      correctIndex: 1,
      explanation: "It's the specific half-run people do to show they aren't trying to waste your time."
    },
    {
      question: "Why was holding the door a mistake?",
      options: ["She was too far away", "It was locked", "She hated doors", "He dragged her"],
      correctIndex: 0,
      explanation: "Distance matters. Too far, and it becomes an obligation."
    },
    {
      question: "What did he feel like?",
      options: ["A king", "A doorman", "A hero", "A ghost"],
      correctIndex: 1,
      explanation: "He felt like a paid employee (doorman) stuck holding the door."
    }
  ]
};
