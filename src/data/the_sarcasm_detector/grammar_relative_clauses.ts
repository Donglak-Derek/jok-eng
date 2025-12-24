import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const relativeClauses: Script = {
  id: "grammar-relative-clauses",
  title: "Relative Clauses (who, which, that)",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Relative clauses use words like who, which, and that to connect ideas smoothly and add more detail about a person or thing.",
  sentences: [
    {
      id: "s1",
      en: "The coworker who helped me was kind.",
      keywords: [
        { word: "coworker", definition: "work colleague" },
        { word: "who", definition: "pronoun for people" },
      ],
    },
    {
      id: "s2",
      en: "I met a teacher who loves music.",
      keywords: [
        { word: "teacher", definition: "instructor" },
        { word: "loves", definition: "likes greatly" },
      ],
    },
    {
      id: "s3",
      en: "She has a friend who can speak Korean.",
      keywords: [
        { word: "friend", definition: "close associate" },
        { word: "speak", definition: "talk" },
      ],
    },
    {
      id: "s4",
      en: "The book which I bought yesterday is very interesting.",
      keywords: [
        { word: "book", definition: "written volume" },
        { word: "interesting", definition: "holding attention" },
      ],
    },
    {
      id: "s5",
      en: "This is the song which makes me happy.",
      keywords: [
        { word: "song", definition: "musical composition" },
        { word: "happy", definition: "feeling joy" },
      ],
    },
    {
      id: "s6",
      en: "I like the chair that is in the living room.",
      keywords: [
        { word: "chair", definition: "seat" },
        { word: "living room", definition: "lounge area" },
      ],
    },
    {
      id: "s7",
      en: "She wore the dress that her mom gave her.",
      keywords: [
        { word: "dress", definition: "woman's garment" },
        { word: "gave", definition: "presented to" },
      ],
    },
    {
      id: "s8",
      en: "The computer that I use every day is old.",
      keywords: [
        { word: "computer", definition: "electronic machine" },
        { word: "old", definition: "aged / not new" },
      ],
    },
    {
      id: "s9",
      en: "Do you know the man who is standing over there?",
      keywords: [
        { word: "man", definition: "adult male" },
        { word: "standing", definition: "upright on feet" },
      ],
    },
    {
      id: "s10",
      en: "The store which sells furniture is closed today.",
      keywords: [
        { word: "store", definition: "shop" },
        { word: "furniture", definition: "household items" },
      ],
    },
    {
      id: "s11",
      en: "That’s the dog that barks all night.",
      keywords: [
        { word: "dog", definition: "canine" },
        { word: "barks", definition: "makes loud noise" },
      ],
    },
    {
      id: "s12",
      en: "She is the person who always smiles.",
      keywords: [
        { word: "person", definition: "human being" },
        { word: "smiles", definition: "makes happy face" },
      ],
    },
  ],
};
