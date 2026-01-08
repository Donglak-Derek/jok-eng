import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const verbTensesConsistency: Script = {
  id: "grammar-verb-tenses-consistency",
  title: "Verb Tenses Consistency",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Practice keeping your verb tenses consistent. Focus on present simple vs present continuous, and past simple vs present perfect.",
    imageUrl: "/images/scenarios/sarcasm_generic.png",
  sentences: [
    {
      id: "s1",
      en: "I work at IKEA every day.",
      keywords: [
        { word: "work", definition: "labor / have a job" },
        { word: "every day", definition: "daily frequency" },
      ],
    },
    {
      id: "s2",
      en: "I am working at IKEA right now.",
      keywords: [
        { word: "working", definition: "laboring now" },
        { word: "right now", definition: "at this moment" },
      ],
    },
    {
      id: "s3",
      en: "She studies English after work.",
      keywords: [
        { word: "studies", definition: "learns habitually" },
        { word: "after work", definition: "post-employment time" },
      ],
    },
    {
      id: "s4",
      en: "She is studying English this evening.",
      keywords: [
        { word: "studying", definition: "learning now" },
        { word: "this evening", definition: "tonight" },
      ],
    },
    {
      id: "s5",
      en: "I finished my project yesterday.",
      keywords: [
        { word: "finished", definition: "completed (past)" },
        { word: "yesterday", definition: "day before today" },
      ],
    },
    {
      id: "s6",
      en: "I have finished my project already.",
      keywords: [
        { word: "have finished", definition: "completed (perfect)" },
        { word: "already", definition: "before now" },
      ],
    },
    {
      id: "s7",
      en: "They traveled to Korea last year.",
      keywords: [
        { word: "traveled", definition: "journeyed (past)" },
        { word: "last year", definition: "year before this" },
      ],
    },
    {
      id: "s8",
      en: "They have traveled to Korea many times.",
      keywords: [
        { word: "have traveled", definition: "journeyed (experience)" },
        { word: "many times", definition: "often" },
      ],
    },
    {
      id: "s9",
      en: "I live in Texas.",
      keywords: [
        { word: "live", definition: "reside (permanent)" },
        { word: "Texas", definition: "US State" },
      ],
    },
    {
      id: "s10",
      en: "I am living in Texas for now.",
      keywords: [
        { word: "living", definition: "residing (temporary)" },
        { word: "for now", definition: "temporarily" },
      ],
    },
    {
      id: "s11",
      en: "He worked at a bank two years ago.",
      keywords: [
        { word: "worked", definition: "labored (past)" },
        { word: "two years ago", definition: "24 months back" },
      ],
    },
    {
      id: "s12",
      en: "He has worked at a bank before.",
      keywords: [
        { word: "has worked", definition: "has labored (experience)" },
        { word: "before", definition: "previously" },
      ],
    },
    {
      id: "s13",
      en: "We eat lunch at noon every day.",
      keywords: [
        { word: "eat lunch", definition: "consume midday meal" },
        { word: "noon", definition: "12:00 PM" },
      ],
    },
    {
      id: "s14",
      en: "We are eating lunch right now.",
      keywords: [
        { word: "eating", definition: "consuming now" },
        { word: "right now", definition: "at this moment" },
      ],
    },
    {
      id: "s15",
      en: "I saw that movie last week.",
      keywords: [
        { word: "saw", definition: "viewed (past)" },
        { word: "last week", definition: "week before this" },
      ],
    },
    {
      id: "s16",
      en: "I have seen that movie before.",
      keywords: [
        { word: "have seen", definition: "viewed (experience)" },
        { word: "before", definition: "previously" },
      ],
    },
  ],
};
