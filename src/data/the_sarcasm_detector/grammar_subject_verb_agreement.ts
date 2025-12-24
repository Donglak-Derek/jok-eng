import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const subjectVerbAgreement: Script = {
  id: "grammar-subject-verb-agreement",
  title: "Subject-Verb Agreement",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Practice making the subject and verb match correctly. This helps your English sound natural, even when speaking fast.",
  sentences: [
    {
      id: "s1",
      en: "He go to work every day. ❌",
      keywords: [
        { word: "go", definition: "move (verb base)" },
        { word: "work", definition: "job/employment" },
      ],
    },
    {
      id: "s2",
      en: "He goes to work every day. ✅",
      keywords: [
        { word: "goes", definition: "moves (singular)" },
        { word: "every day", definition: "daily" },
      ],
    },
    {
      id: "s3",
      en: "She like coffee. ❌",
      keywords: [
        { word: "like", definition: "enjoy (verb base)" },
        { word: "coffee", definition: "beverage" },
      ],
    },
    {
      id: "s4",
      en: "She likes coffee. ✅",
      keywords: [
        { word: "likes", definition: "enjoys (singular)" },
        { word: "coffee", definition: "beverage" },
      ],
    },
    {
      id: "s5",
      en: "The dog eat fast. ❌",
      keywords: [
        { word: "dog", definition: "animal" },
        { word: "eat", definition: "consume (verb base)" },
      ],
    },
    {
      id: "s6",
      en: "The dog eats fast. ✅",
      keywords: [
        { word: "eats", definition: "consumes (singular)" },
        { word: "fast", definition: "quickly" },
      ],
    },
    {
      id: "s7",
      en: "My friend live in Dallas. ❌",
      keywords: [
        { word: "friend", definition: "companion" },
        { word: "live", definition: "reside (verb base)" },
      ],
    },
    {
      id: "s8",
      en: "My friend lives in Dallas. ✅",
      keywords: [
        { word: "lives", definition: "resides (singular)" },
        { word: "Dallas", definition: "city name" },
      ],
    },
    {
      id: "s9",
      en: "The teacher teach English. ❌",
      keywords: [
        { word: "teacher", definition: "educator" },
        { word: "teach", definition: "instruct (verb base)" },
      ],
    },
    {
      id: "s10",
      en: "The teacher teaches English. ✅",
      keywords: [
        { word: "teaches", definition: "instructs (singular)" },
        { word: "English", definition: "language" },
      ],
    },
    {
      id: "s11",
      en: "It rain a lot here. ❌",
      keywords: [
        { word: "rain", definition: "precipitate (verb base)" },
        { word: "a lot", definition: "large quantity" },
      ],
    },
    {
      id: "s12",
      en: "It rains a lot here. ✅",
      keywords: [
        { word: "rains", definition: "precipitates (singular)" },
        { word: "here", definition: "in this place" },
      ],
    },
    {
      id: "s13",
      en: "The car need gas. ❌",
      keywords: [
        { word: "car", definition: "vehicle" },
        { word: "need", definition: "require (verb base)" },
      ],
    },
    {
      id: "s14",
      en: "The car needs gas. ✅",
      keywords: [
        { word: "needs", definition: "requires (singular)" },
        { word: "gas", definition: "fuel" },
      ],
    },
    {
      id: "s15",
      en: "My boss want results fast. ❌",
      keywords: [
        { word: "boss", definition: "manager" },
        { word: "want", definition: "desire (verb base)" },
      ],
    },
    {
      id: "s16",
      en: "My boss wants results fast. ✅",
      keywords: [
        { word: "wants", definition: "desires (singular)" },
        { word: "results", definition: "outcomes" },
      ],
    },
  ],
};
