import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const roommateCooking: Script = {
  id: "skit-roommate-cooking",
  title: "Kitchen Disaster Date",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish:
    "A date that turns into a cooking-show fail—great for telling friends because it’s self-aware and still sweet.",
    imageUrl: "/images/scenarios/kitchen_disaster_date.png",
  mode: "cloze",
  sentences: [
    {
      id: "s1",
      en: "We cooked together on a third date to [save money].",
      keywords: [
        { word: "save money", definition: "avoid unnecessary expenses" },
      ],
    },
    {
      id: "s2",
      en: "I said, 'Welcome to my cooking show: [Burning] Water with Me.'",
      keywords: [
        { word: "Burning", definition: "on fire or very hot" },
      ],
    },
    {
      id: "s3",
      en: "The pasta [stuck] together like we were at a team-building event.",
      keywords: [
        { word: "stuck", definition: "fixed in one place" },
      ],
    },
    {
      id: "s4",
      en: "The [smoke alarm] yelled louder than we did.",
      keywords: [
        { word: "smoke alarm", definition: "device that warns of fire" },
      ],
    },
    {
      id: "s5",
      en: "I joked, 'That's our [live studio audience].'",
      keywords: [
        { word: "live studio audience", definition: "spectators present at a broadcast" },
      ],
    },
    {
      id: "s6",
      en: "We opened windows for a '[commercial break].'",
      keywords: [
        { word: "commercial break", definition: "pause for advertisements" },
      ],
    },
    {
      id: "s7",
      en: "She said, 'Next time we order pizza and just [roast] our days.'",
      keywords: [
        { word: "roast", definition: "criticize or mock humorously" },
      ],
    },
    {
      id: "s8",
      en: "We laughed, ate [crunchy] pasta, and still had fun.",
      keywords: [
        { word: "crunchy", definition: "hard texture that makes noise when chewed" },
      ],
    },
  ],
  culturalNote: {
    title: "Cooking Dates",
    content: "Cooking dates are often seen as romantic but stressful. By treating their disaster like a 'TV Cooking Show' (with an audience and commercial breaks), they turned a stressful situation into a shared joke."
  },
  quizItems: [
    {
      question: "Why did they decide to cook?",
      options: ["To show off skills", "To save money", "Because restaurants were closed", "For a contest"],
      correctIndex: 1,
      explanation: "They wanted to save money on their third date."
    },
    {
      question: "What was the 'live studio audience'?",
      options: ["Their roommates", "The neighbors", "The smoke alarm", "A TV crew"],
      correctIndex: 2,
      explanation: "The narrator jokingly called the loud smoke alarm their 'live studio audience' because it was making so much noise."
    },
    {
      question: "What did they agree to do next time?",
      options: ["Take cooking classes", "Go to a fancy restaurant", "Order pizza", "Break up"],
      correctIndex: 2,
      explanation: "After the disaster, she suggested ordering pizza next time instead of cooking."
    }
  ]
};
