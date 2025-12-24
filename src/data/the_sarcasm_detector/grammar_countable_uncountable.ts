import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const countableUncountable: Script = {
  id: "grammar-countable-uncountable",
  title: "Countable vs Uncountable Nouns",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Practice using countable and uncountable nouns. Learn when to use many, much, a few, and a little with natural sentences.",
  sentences: [
    {
      id: "s1",
      en: "I have many books at home.",
      keywords: [
        { word: "many", definition: "large number of (countable)" },
        { word: "books", definition: "written works" },
      ],
    },
    {
      id: "s2",
      en: "She doesn’t drink much coffee.",
      keywords: [
        { word: "much", definition: "large amount of (uncountable)" },
        { word: "coffee", definition: "brewed beverage" },
      ],
    },
    {
      id: "s3",
      en: "There are a few chairs in the room.",
      keywords: [
        { word: "a few", definition: "some (countable)" },
        { word: "chairs", definition: "seats" },
      ],
    },
    {
      id: "s4",
      en: "There is a little water in the bottle.",
      keywords: [
        { word: "a little", definition: "small amount (uncountable)" },
        { word: "water", definition: "clear liquid" },
      ],
    },
    {
      id: "s5",
      en: "We need many tools for this project.",
      keywords: [
        { word: "tools", definition: "implements for working" },
        { word: "project", definition: "planned work" },
      ],
    },
    {
      id: "s6",
      en: "He doesn’t have much money.",
      keywords: [
        { word: "money", definition: "currency" },
        { word: "much", definition: "large amount (uncountable)" },
      ],
    },
    {
      id: "s7",
      en: "I saw many people at the park.",
      keywords: [
        { word: "many", definition: "large number (countable)" },
        { word: "people", definition: "humans" },
      ],
    },
    {
      id: "s8",
      en: "There isn’t much time left.",
      keywords: [
        { word: "time", definition: "duration" },
        { word: "left", definition: "remaining" },
      ],
    },
    {
      id: "s9",
      en: "Can I get a few apples?",
      keywords: [
        { word: "a few", definition: "some (countable)" },
        { word: "apples", definition: "fruit" },
      ],
    },
    {
      id: "s10",
      en: "Please give me a little sugar.",
      keywords: [
        { word: "a little", definition: "small amount (uncountable)" },
        { word: "sugar", definition: "sweetener" },
      ],
    },
    {
      id: "s11",
      en: "How many chairs are there?",
      keywords: [
        { word: "how many", definition: "quantity query (countable)" },
        { word: "chairs", definition: "seats" },
      ],
    },
    {
      id: "s12",
      en: "How much rice do you need?",
      keywords: [
        { word: "how much", definition: "quantity query (uncountable)" },
        { word: "rice", definition: "grain" },
      ],
    },
    {
      id: "s13",
      en: "We only have a few minutes before the meeting.",
      keywords: [
        { word: "a few", definition: "a small number" },
        { word: "minutes", definition: "units of time" },
      ],
    },
    {
      id: "s14",
      en: "There is a little milk in the fridge.",
      keywords: [
        { word: "a little", definition: "small amount" },
        { word: "milk", definition: "dairy liquid" },
      ],
    },
    {
      id: "s15",
      en: "I don’t have many friends in this city.",
      keywords: [
        { word: "friends", definition: "companions" },
        { word: "city", definition: "large town" },
      ],
    },
    {
      id: "s16",
      en: "He doesn’t eat much bread.",
      keywords: [
        { word: "bread", definition: "baked food" },
        { word: "much", definition: "large amount" },
      ],
    },
  ],
};
