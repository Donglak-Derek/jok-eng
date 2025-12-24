import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const grammarArticles: Script = {
  id: "grammar-articles",
  title: "Tone Softeners",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Short add-ons that make sarcasm and banter feel safe—useful for emails and chats.",
  sentences: [
    {
      id: "s1",
      en: "Add 'just kidding' when you're unsure they caught the joke.",
      keywords: [
        { word: "just kidding", definition: "only joking" },
        { word: "caught", definition: "understood" },
      ],
    },
    {
      id: "s2",
      en: "Use 'no offense' before a teasing remark to show it's friendly.",
      keywords: [
        { word: "no offense", definition: "don't be insulted" },
        { word: "teasing", definition: "playful provocation" },
      ],
    },
    {
      id: "s3",
      en: "Say 'to be fair' to balance criticism with context.",
      keywords: [
        { word: "to be fair", definition: "considering all sides" },
        { word: "context", definition: "circumstances" },
      ],
    },
    {
      id: "s4",
      en: "'Just a heads up' softens a warning.",
      keywords: [
        { word: "heads up", definition: "advance warning" },
        { word: "warning", definition: "statement of danger/problem" },
      ],
    },
    {
      id: "s5",
      en: "'Friendly reminder' keeps a nudge polite.",
      keywords: [
        { word: "friendly reminder", definition: "polite notice" },
        { word: "nudge", definition: "gentle push/reminder" },
      ],
    },
    {
      id: "s6",
      en: "Add 'if that's cool' when asking for a small favor.",
      keywords: [
        { word: "favor", definition: "act of kindness" },
        { word: "cool", definition: "acceptable / okay" },
      ],
    },
    {
      id: "s7",
      en: "'No pressure' lowers tension after a request.",
      keywords: [
        { word: "pressure", definition: "force or persuasion" },
        { word: "tension", definition: "mental/emotional strain" },
      ],
    },
    {
      id: "s8",
      en: "'Kidding/not kidding' signals playful truth.",
      keywords: [
        { word: "kidding", definition: "joking" },
        { word: "truth", definition: "reality" },
      ],
    },
    {
      id: "s9",
      en: "Finish with 'what do you think?' to invite their take.",
      keywords: [
        { word: "invite", definition: "ask to participate" },
        { word: "take", definition: "opinion or perspective" },
      ],
    },
    {
      id: "s10",
      en: "If it lands badly, add 'Sorry, meant that as a joke.'",
      keywords: [
        { word: "land badly", definition: "be received poorly" },
        { word: "meant", definition: "intended" },
      ],
    },
  ],
};
