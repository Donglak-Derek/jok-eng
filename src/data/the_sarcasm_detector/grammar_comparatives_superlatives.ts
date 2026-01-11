import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const comparativesSuperlatives: Script = {
  id: "grammar-comparatives-superlatives",
  title: "The Drama Queen",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Master the art of exaggeration. Use comparatives and superlatives to be dramatic, sarcastic, or mockingly enthusiastic.",
  imageUrl: "/images/scenarios/sarcasm_generic.png",
  sentences: [
    {
      id: "s1",
      en: "This is the 'best' idea I've ever heard. (Sarcasm)",
      keywords: [
        { word: "best", definition: "highest quality (fake)" },
      ],
    },
    {
      id: "s2",
      en: "Could you be any 'slower'?",
      keywords: [
        { word: "slower", definition: "more slow" },
      ],
    },
    {
      id: "s3",
      en: "That is the 'worst' excuse in history.",
      keywords: [
        { word: "worst", definition: "most bad" },
        { word: "in history", definition: "of all time" },
      ],
    },
    {
      id: "s4",
      en: "Oh, you are 'so' much smarter than everyone else.",
      keywords: [
        { word: "smarter", definition: "more intelligent" },
      ],
    },
    {
      id: "s5",
      en: "This meeting is 'more' exciting than watching paint dry.",
      keywords: [
        { word: "more exciting", definition: "better (ironic)" },
        { word: "paint dry", definition: "boring activity" },
      ],
    },
    {
      id: "s6",
      en: "You are the 'greatest' human to ever live. (Mocking)",
      keywords: [
        { word: "greatest", definition: "best" },
        { word: "mocking", definition: "making fun of" },
      ],
    },
    {
      id: "s7",
      en: "It’s 'less' of a plan and 'more' of a disaster.",
      keywords: [
        { word: "less of", definition: "not really" },
        { word: "disaster", definition: "catastrophe" },
      ],
    },
    {
      id: "s8",
      en: "I couldn't be 'happier' to work this weekend.",
      keywords: [
        { word: "couldn't be", definition: "impossible to be" },
        { word: "happier", definition: "more joy" },
      ],
    },
    {
      id: "s9",
      en: "That's the 'least' you could do.",
      keywords: [
        { word: "least", definition: "minimum amount" },
      ],
    },
    {
      id: "s10",
      en: "You are 'more' right than you know.",
      keywords: [
        { word: "more right", definition: "correct to a high degree" },
      ],
    },
  ],
};
