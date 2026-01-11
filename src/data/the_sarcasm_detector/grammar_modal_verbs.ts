import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const modalVerbsPractice: Script = {
  id: "grammar-modal-verbs",
  title: "The Politeness Scale",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "How to use 'can', 'could', and 'should' to turn orders into requests, or requests into demands.",
  imageUrl: "/images/scenarios/sarcasm_generic.png",
  sentences: [
    {
      id: "s1",
      en: "You 'can' leave early? Or asking if you 'may'?",
      keywords: [
        { word: "can", definition: "ability" },
        { word: "may", definition: "permission" },
      ],
    },
    {
      id: "s2",
      en: "You 'should' probably double-check that.",
      keywords: [
        { word: "should", definition: "strong advice" },
        { word: "double-check", definition: "verify again" },
      ],
    },
    {
      id: "s3",
      en: "You 'might' want to rethink that outfit.",
      keywords: [
        { word: "might", definition: "gentle suggestion" },
        { word: "rethink", definition: "consider again" },
      ],
    },
    {
      id: "s4",
      en: "Could you possibly be any louder?",
      keywords: [
        { word: "Could you", definition: "polite request frame" },
        { word: "possibly", definition: "emphasis" },
      ],
    },
    {
      id: "s5",
      en: "I 'would' love to, but I don't want to.",
      keywords: [
        { word: "would love to", definition: "polite refusal filler" },
      ],
    },
    {
      id: "s6",
      en: "We 'must' do lunch sometime. (Meaning: Never)",
      keywords: [
        { word: "must", definition: "obligation (fake)" },
        { word: "sometime", definition: "vague future" },
      ],
    },
    {
      id: "s7",
      en: "You 'will' regret this.",
      keywords: [
        { word: "will", definition: "certainty/threat" },
        { word: "regret", definition: "feel sorry for" },
      ],
    },
    {
      id: "s8",
      en: "Shall we pretend this meeting is useful?",
      keywords: [
        { word: "Shall we", definition: "suggestion" },
        { word: "pretend", definition: "act falsely" },
      ],
    },
    {
      id: "s9",
      en: "That 'ought' to be enough.",
      keywords: [
        { word: "ought to", definition: "should" },
        { word: "enough", definition: "sufficient" },
      ],
    },
    {
      id: "s10",
      en: "I 'could' help, but I'm observing right now.",
      keywords: [
        { word: "observing", definition: "watching only" },
      ],
    },
  ],
};
