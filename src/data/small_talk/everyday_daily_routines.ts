import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const dailyRoutines: Script = {
  id: "everyday-daily-routines",
  title: "Daily Routines",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Daily routines are about talking simply and clearly about your schedule, meals, and habits. These sentences help you explain your everyday life.",
    imageUrl: "/images/scenarios/small_talk_generic.png",
  sentences: [
    {
      id: "s1",
      en: "I wake up at 5 a.m. every day.",
      keywords: [
        { word: "wake up", definition: "stop sleeping" },
        { word: "every day", definition: "daily" },
      ],
    },
    {
      id: "s2",
      en: "I brush my teeth and wash my face.",
      keywords: [
        { word: "brush teeth", definition: "clean teeth" },
        { word: "wash face", definition: "clean face with water" },
      ],
    },
    {
      id: "s3",
      en: "I eat breakfast at 6 a.m.",
      keywords: [
        { word: "breakfast", definition: "morning meal" },
        { word: "eat", definition: "consume food" },
      ],
    },
    {
      id: "s4",
      en: "I leave home and drive to work.",
      keywords: [
        { word: "leave home", definition: "depart from house" },
        { word: "drive", definition: "operate a car" },
      ],
    },
    {
      id: "s5",
      en: "I start work at 6:30 in the morning.",
      keywords: [
        { word: "start work", definition: "begin job" },
        { word: "morning", definition: "early part of day" },
      ],
    },
    {
      id: "s6",
      en: "I take a short break around 10 a.m.",
      keywords: [
        { word: "break", definition: "rest period" },
        { word: "around", definition: "approximately" },
      ],
    },
    {
      id: "s7",
      en: "I eat lunch at 12 noon.",
      keywords: [
        { word: "lunch", definition: "midday meal" },
        { word: "noon", definition: "12:00 PM" },
      ],
    },
    {
      id: "s8",
      en: "I finish work at 2:30 p.m.",
      keywords: [
        { word: "finish work", definition: "end job" },
        { word: "afternoon", definition: "time after noon" },
      ],
    },
    {
      id: "s9",
      en: "I drive back home and rest.",
      keywords: [
        { word: "drive back", definition: "return by car" },
        { word: "rest", definition: "relax" },
      ],
    },
    {
      id: "s10",
      en: "Sometimes I take a short nap.",
      keywords: [
        { word: "nap", definition: "short sleep" },
        { word: "sometimes", definition: "occasionally" },
      ],
    },
    {
      id: "s11",
      en: "I eat dinner with my family at 6 p.m.",
      keywords: [
        { word: "dinner", definition: "evening meal" },
        { word: "family", definition: "relatives" },
      ],
    },
    {
      id: "s12",
      en: "After dinner, I study or work on my projects.",
      keywords: [
        { word: "study", definition: "learn" },
        { word: "project", definition: "planned work" },
      ],
    },
    {
      id: "s13",
      en: "I watch TV or listen to music to relax.",
      keywords: [
        { word: "watch TV", definition: "view television" },
        { word: "relax", definition: "become less tense" },
      ],
    },
    {
      id: "s14",
      en: "I prepare things for the next day.",
      keywords: [
        { word: "prepare", definition: "get ready" },
        { word: "next day", definition: "following day" },
      ],
    },
    {
      id: "s15",
      en: "I go to bed at 10 p.m.",
      keywords: [
        { word: "go to bed", definition: "lie down to sleep" },
        { word: "night", definition: "dark time of day" },
      ],
    },
  ],
};
