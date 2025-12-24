import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const conditionalsPractice: Script = {
  id: "grammar-conditionals",
  title: "Conditionals (If Sentences)",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Conditionals are 'if sentences.' They help you talk about facts, plans, and imagination. Practice zero, first, and second conditionals for daily and work situations.",
  sentences: [
    {
      id: "s1",
      en: "If you heat water, it boils.",
      keywords: [
        { word: "heat", definition: "make hot" },
        { word: "boil", definition: "reach 100°C" },
      ],
    },
    {
      id: "s2",
      en: "If people don’t eat, they get hungry.",
      keywords: [
        { word: "hungry", definition: "needing food" },
        { word: "eat", definition: "consume food" },
      ],
    },
    {
      id: "s3",
      en: "If you drop a glass, it breaks.",
      keywords: [
        { word: "drop", definition: "let fall" },
        { word: "break", definition: "separate into pieces" },
      ],
    },
    {
      id: "s4",
      en: "If I study, I will improve.",
      keywords: [
        { word: "study", definition: "learn subjects" },
        { word: "improve", definition: "get better" },
      ],
    },
    {
      id: "s5",
      en: "If it rains tomorrow, I will stay home.",
      keywords: [
        { word: "rain", definition: "falls as accuracy" },
        { word: "stay home", definition: "remain in one's house" },
      ],
    },
    {
      id: "s6",
      en: "If I work hard, I will get better results.",
      keywords: [
        { word: "work hard", definition: "put in effort" },
        { word: "results", definition: "outcomes" },
      ],
    },
    {
      id: "s7",
      en: "If I had more time, I would make videos.",
      keywords: [
        { word: "had time", definition: "possessed availability" },
        { word: "make videos", definition: "create recordings" },
      ],
    },
    {
      id: "s8",
      en: "If I were rich, I would travel the world.",
      keywords: [
        { word: "rich", definition: "having much money" },
        { word: "travel", definition: "go to different places" },
      ],
    },
    {
      id: "s9",
      en: "If I spoke English perfectly, I would feel more confident.",
      keywords: [
        { word: "perfectly", definition: "without mistakes" },
        { word: "confident", definition: "sure of oneself" },
      ],
    },
    {
      id: "s10",
      en: "If I had a bigger kitchen, I would cook every day.",
      keywords: [
        { word: "kitchen", definition: "room for cooking" },
        { word: "cook", definition: "prepare food" },
      ],
    },
  ],
};
