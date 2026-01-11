import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const relativeClauses: Script = {
  id: "grammar-relative-clauses",
  title: "The Over-Explainer",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Use relative clauses to add unnecessary details that make you sound condescending or annoyed.",
  imageUrl: "/images/scenarios/sarcasm_generic.png",
  sentences: [
    {
      id: "s1",
      en: "The button, 'which is the big red one', needs to be pressed.",
      keywords: [
        { word: "which is", definition: "clause introducing detail" },
        { word: "big red one", definition: "obvious feature" },
      ],
    },
    {
      id: "s2",
      en: "My boss, 'who thinks he knows everything', is wrong.",
      keywords: [
        { word: "who thinks", definition: "opinion clause" },
        { word: "knows everything", definition: "omniscient (ironic)" },
      ],
    },
    {
      id: "s3",
      en: "The email, 'that I sent three days ago', answers this.",
      keywords: [
        { word: "that I sent", definition: "reminder clause" },
        { word: "answers this", definition: "provides solution" },
      ],
    },
    {
      id: "s4",
      en: "People 'who actually read instructions' succeed.",
      keywords: [
        { word: "who actually", definition: "sarcastic emphasis" },
        { word: "read instructions", definition: "follow guide" },
      ],
    },
    {
      id: "s5",
      en: "The deadline, 'which we discussed yesterday', hasn't changed.",
      keywords: [
        { word: "discussed", definition: "talked about" },
        { word: "hasn't changed", definition: "is same" },
      ],
    },
    {
      id: "s6",
      en: "He is a man 'whose ego is larger than the room'.",
      keywords: [
        { word: "whose ego", definition: "sense of self-importance" },
        { word: "larger than", definition: "bigger than" },
      ],
    },
    {
      id: "s7",
      en: "It’s a problem 'that only you seem to have'.",
      keywords: [
        { word: "only you", definition: "unique to you" },
        { word: "seem to have", definition: "appear to possess" },
      ],
    },
    {
      id: "s8",
      en: "The trash, 'which is overflowing', won't empty itself.",
      keywords: [
        { word: "overflowing", definition: "spilling out" },
        { word: "empty itself", definition: "act automatically" },
      ],
    },
    {
      id: "s9",
      en: "Customers 'who shout' get served last.",
      keywords: [
        { word: "shout", definition: "yell" },
        { word: "served last", definition: "helped at end" },
      ],
    },
    {
      id: "s10",
      en: "This is the report 'which nobody asked for'.",
      keywords: [
        { word: "nobody", definition: "no person" },
        { word: "asked for", definition: "requested" },
      ],
    },
  ],
};
