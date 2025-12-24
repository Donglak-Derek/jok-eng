import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const comparativesSuperlatives: Script = {
  id: "grammar-comparatives-superlatives",
  title: "Comparatives and Superlatives",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Comparatives compare two things, and superlatives show the highest level. They are useful in interviews, presentations, and daily conversations.",
  sentences: [
    {
      id: "s1",
      en: "This chair is more comfortable than that one.",
      keywords: [
        { word: "comfortable", definition: "providing physical ease" },
        { word: "than", definition: "conjunction for comparison" },
      ],
    },
    {
      id: "s2",
      en: "Today is hotter than yesterday.",
      keywords: [
        { word: "hotter", definition: "having higher temperature" },
        { word: "yesterday", definition: "the day before today" },
      ],
    },
    {
      id: "s3",
      en: "This is better than I expected.",
      keywords: [
        { word: "better", definition: "more good" },
        { word: "expected", definition: "thought likely to happen" },
      ],
    },
    {
      id: "s4",
      en: "She is more confident than before.",
      keywords: [
        { word: "confident", definition: "feeling sure of oneself" },
        { word: "before", definition: "at an earlier time" },
      ],
    },
    {
      id: "s5",
      en: "This tool is easier to use than that one.",
      keywords: [
        { word: "easier", definition: "less difficult" },
        { word: "tool", definition: "implement for working" },
      ],
    },
    {
      id: "s6",
      en: "This is the best idea we’ve had.",
      keywords: [
        { word: "best", definition: "most good" },
        { word: "idea", definition: "thought or suggestion" },
      ],
    },
    {
      id: "s7",
      en: "She is the most talented person on the team.",
      keywords: [
        { word: "talented", definition: "having natural skill" },
        { word: "team", definition: "group working together" },
      ],
    },
    {
      id: "s8",
      en: "This is the worst mistake I ever made.",
      keywords: [
        { word: "worst", definition: "most bad" },
        { word: "mistake", definition: "error" },
      ],
    },
    {
      id: "s9",
      en: "He is the fastest worker in our group.",
      keywords: [
        { word: "fastest", definition: "most rapid" },
        { word: "worker", definition: "person who works" },
      ],
    },
    {
      id: "s10",
      en: "That was the most exciting game I’ve ever seen.",
      keywords: [
        { word: "exciting", definition: "causing enthusiasm" },
        { word: "game", definition: "activity for amusement" },
      ],
    },
    {
      id: "s11",
      en: "My bag is heavier than yours.",
      keywords: [
        { word: "heavier", definition: "having more weight" },
        { word: "bag", definition: "container for carrying" },
      ],
    },
    {
      id: "s12",
      en: "This project is more important than the others.",
      keywords: [
        { word: "important", definition: "of great value" },
        { word: "others", definition: "other things/people" },
      ],
    },
    {
      id: "s13",
      en: "That movie was funnier than I thought.",
      keywords: [
        { word: "funnier", definition: "more amusing" },
        { word: "thought", definition: "idea or opinion" },
      ],
    },
    {
      id: "s14",
      en: "This is the cheapest option we can choose.",
      keywords: [
        { word: "cheapest", definition: "lowest in price" },
        { word: "option", definition: "choice" },
      ],
    },
    {
      id: "s15",
      en: "She is the kindest teacher I’ve ever met.",
      keywords: [
        { word: "kindest", definition: "most friendly" },
        { word: "teacher", definition: "person who instructs" },
      ],
    },
  ],
};
