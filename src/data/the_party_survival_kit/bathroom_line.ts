import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const bathroomLine: Script = {
  id: "party-bathroom-line",
  title: "The Bathroom Line",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "basics",
  cleanedEnglish: "The worst place for small talk.",
  imageUrl: "/images/scenarios/bathroom_line_3d.png",
  difficulty: "Mild 🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "I have been standing in this [hallway] for 20 minutes.",
      keywords: [
        { word: "hallway", definition: "Hidden: waiting area" },
      ],
    },
    {
      id: "s2",
      en: "The guy in front of me decides to [start a conversation].",
      keywords: [
        { word: "start a conversation", definition: "Hidden: unwanted chatting" },
      ],
    },
    {
      id: "s3",
      en: "He asks, 'So, [come here often?]' which is weird.",
      keywords: [
        { word: "come here often?", definition: "Hidden: bad pickup line" },
      ],
    },
    {
      id: "s4",
      en: "I just nodded and prayed for the [door to open].",
      keywords: [
        { word: "door to open", definition: "Hidden: escape route" },
      ],
    },
    {
      id: "s5",
      en: "When it finally did, we both awkwardly cheered [hooray].",
      keywords: [
        { word: "hooray", definition: "Hidden: celebration" },
      ],
    },
  ],

  culturalInsights: {
    title: "Bathroom Lines",
    content: "At house parties, there is often only one bathroom. The line becomes a purgatory where you are trapped with strangers. The etiquette is usually to stay silent or complain about the wait together. Trying to make deep conversation here is considered socially awkward."
  },

  quizItems: [
    {
      question: "Where is the narrator?",
      options: ["At a bar", "In a bathroom line", "In a car", "At work"],
      correctIndex: 1,
      explanation: "Standing in the hallway waiting for the bathroom."
    },
    {
      question: "What did the stranger do?",
      options: ["Cut the line", "Left", "Started chatting", "Fell asleep"],
      correctIndex: 2,
      explanation: "He tried to start a conversation while waiting."
    },
    {
      question: "Why was it awkward?",
      options: ["They were enemies", "He used a cliché line", "The narrator was hungry", "The music was loud"],
      correctIndex: 1,
      explanation: "Asking 'So, come here often?' in a house hallway is a weird/cliché thing to say."
    }
  ]
};
