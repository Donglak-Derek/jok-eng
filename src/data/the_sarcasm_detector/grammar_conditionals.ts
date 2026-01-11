import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const conditionalsPractice: Script = {
  id: "grammar-conditionals",
  title: "The 'If Only' Excuses",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "How to use 'if' sentences to give fake excuses, subtle threats, and passive-aggressive advice.",
  imageUrl: "/images/scenarios/sarcasm_generic.png",
  sentences: [
    {
      id: "s1",
      en: "If I were you, I would stop talking right now.",
      keywords: [
        { word: "If I were you", definition: "advice phrase" },
        { word: "stop talking", definition: "be quiet" },
      ],
    },
    {
      id: "s2",
      en: "If you had asked me earlier, I might have cared.",
      keywords: [
        { word: "might have", definition: "possibility in past" },
        { word: "cared", definition: "had interest" },
      ],
    },
    {
      id: "s3",
      en: "If I have time, I might look at it. (Meaning: No)",
      keywords: [
        { word: "If I have time", definition: "conditional condition" },
        { word: "might", definition: "low probability" },
      ],
    },
    {
      id: "s4",
      en: "If it were up to me, this would be done differently.",
      keywords: [
        { word: "up to me", definition: "my decision" },
        { word: "differently", definition: "in another way" },
      ],
    },
    {
      id: "s5",
      en: "If you say so.",
      keywords: [
        { word: "If you say so", definition: "doubting agreement" },
      ],
    },
    {
      id: "s6",
      en: "If that’s what you think, good luck.",
      keywords: [
        { word: "good luck", definition: "sarcastic well wish" },
      ],
    },
    {
      id: "s7",
      en: "If only common sense were common.",
      keywords: [
        { word: "If only", definition: "strong wish/regret" },
        { word: "common sense", definition: "basic judgment" },
      ],
    },
    {
      id: "s8",
      en: "I would help, if I wasn't so 'busy'.",
      keywords: [
        { word: "busy", definition: "occupied (used ironically)" },
      ],
    },
    {
      id: "s9",
      en: "If you’re happy with that quality, then great.",
      keywords: [
        { word: "happy with", definition: "satisfied by" },
        { word: "quality", definition: "standard of work" },
      ],
    },
    {
      id: "s10",
      en: "If I win the lottery, I won't tell you, but there will be signs.",
      keywords: [
        { word: "lottery", definition: "gambling prize" },
        { word: "signs", definition: "hints / clues" },
      ],
    },
  ],
};
