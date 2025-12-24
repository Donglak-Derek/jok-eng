import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const workplaceCommunication: Script = {
  id: "everyday-workplace-communication",
  title: "Workplace Communication",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Simple sentences for asking help, giving updates, and saying you finished something at work.",
  sentences: [
    {
      id: "s1",
      en: "Can you help me with this?",
      keywords: [
        { word: "help", definition: "assist" },
        { word: "with", definition: "in regards to" },
      ],
    },
    {
      id: "s2",
      en: "I finished the build.",
      keywords: [
        { word: "finished", definition: "completed" },
        { word: "build", definition: "assembly" },
      ],
    },
    {
      id: "s3",
      en: "Do you need me for the next task?",
      keywords: [
        { word: "next", definition: "following" },
        { word: "task", definition: "assignment" },
      ],
    },
    {
      id: "s4",
      en: "Can I take this to the shopkeeper?",
      keywords: [
        { word: "take", definition: "bring" },
        { word: "shopkeeper", definition: "store manager" },
      ],
    },
    {
      id: "s5",
      en: "The part is missing.",
      keywords: [
        { word: "part", definition: "component" },
        { word: "missing", definition: "lost" },
      ],
    },
    {
      id: "s6",
      en: "I already checked the instructions.",
      keywords: [
        { word: "checked", definition: "reviewed" },
        { word: "instructions", definition: "directions" },
      ],
    },
    {
      id: "s7",
      en: "Should I move this to the display?",
      keywords: [
        { word: "move", definition: "relocate" },
        { word: "display", definition: "showcase area" },
      ],
    },
    {
      id: "s8",
      en: "I will start the next project now.",
      keywords: [
        { word: "start", definition: "begin" },
        { word: "project", definition: "work assignment" },
      ],
    },
    {
      id: "s9",
      en: "Do you want me to fix this?",
      keywords: [
        { word: "fix", definition: "repair" },
        { word: "want", definition: "desire" },
      ],
    },
    {
      id: "s10",
      en: "Everything is ready now.",
      keywords: [
        { word: "everything", definition: "all things" },
        { word: "ready", definition: "prepared" },
      ],
    },
    {
      id: "s11",
      en: "Can I take a short break?",
      keywords: [
        { word: "short", definition: "brief" },
        { word: "break", definition: "rest" },
      ],
    },
    {
      id: "s12",
      en: "Let me know if you need me.",
      keywords: [
        { word: "let me know", definition: "inform me" },
        { word: "need", definition: "require help from" },
      ],
    },
  ],
};
