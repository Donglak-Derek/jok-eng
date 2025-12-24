import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const modalVerbsPractice: Script = {
  id: "grammar-modal-verbs",
  title: "Modal Verbs Practice",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Modal verbs like can, could, would, should, and might help you sound polite, flexible, and professional in English. Practice them with many examples.",
  sentences: [
    {
      id: "s1",
      en: "I can fix it.",
      keywords: [
        { word: "can", definition: "be able to" },
        { word: "fix", definition: "repair" },
      ],
    },
    {
      id: "s2",
      en: "She can speak Korean.",
      keywords: [
        { word: "speak", definition: "talk in a language" },
        { word: "Korean", definition: "language of Korea" },
      ],
    },
    {
      id: "s3",
      en: "We can meet tomorrow.",
      keywords: [
        { word: "meet", definition: "gather together" },
        { word: "tomorrow", definition: "day after today" },
      ],
    },
    {
      id: "s4",
      en: "Could you help me?",
      keywords: [
        { word: "could", definition: "polite request form" },
        { word: "help", definition: "assist" },
      ],
    },
    {
      id: "s5",
      en: "I could call him later.",
      keywords: [
        { word: "call", definition: "phone someone" },
        { word: "later", definition: "at a future time" },
      ],
    },
    {
      id: "s6",
      en: "We could go for a walk.",
      keywords: [
        { word: "go for a walk", definition: "take a stroll" },
        { word: "could", definition: "possible possibility" },
      ],
    },
    {
      id: "s7",
      en: "I would like some coffee.",
      keywords: [
        { word: "would like", definition: "politely want" },
        { word: "coffee", definition: "beverage" },
      ],
    },
    {
      id: "s8",
      en: "He would help if he were here.",
      keywords: [
        { word: "would", definition: "conditional indicator" },
        { word: "if", definition: "introducing a condition" },
      ],
    },
    {
      id: "s9",
      en: "I would travel more if I had time.",
      keywords: [
        { word: "travel", definition: "journey" },
        { word: "if I had time", definition: "conditional on time" },
      ],
    },
    {
      id: "s10",
      en: "You should practice more.",
      keywords: [
        { word: "should", definition: "advisable to" },
        { word: "practice", definition: "repeat to improve" },
      ],
    },
    {
      id: "s11",
      en: "He should study tonight.",
      keywords: [
        { word: "study", definition: "learn" },
        { word: "tonight", definition: "this coming night" },
      ],
    },
    {
      id: "s12",
      en: "We should leave early.",
      keywords: [
        { word: "leave early", definition: "depart before expected" },
        { word: "should", definition: "advisable to" },
      ],
    },
    {
      id: "s13",
      en: "It might rain today.",
      keywords: [
        { word: "might", definition: "possible possibility" },
        { word: "rain", definition: "water from sky" },
      ],
    },
    {
      id: "s14",
      en: "She might be late.",
      keywords: [
        { word: "late", definition: "not on time" },
        { word: "might", definition: "possible possibility" },
      ],
    },
    {
      id: "s15",
      en: "I might go to the party.",
      keywords: [
        { word: "party", definition: "social gathering" },
        { word: "go", definition: "move to a place" },
      ],
    },
  ],
};
