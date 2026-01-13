import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const punctuationPsychology: Script = {
  id: "texting-punctuation",
  title: "Punctuation Psychology",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "What one little dot (.) actually means in a text.",
  type: "decoder",
  section: "signal_decoders",
  imageUrl: "/images/scenarios/punctuation.png",
  summaryPoints: [
    "The Period (.) is aggressive. Avoid it in short texts.",
    "Ellipses (...) imply you are waiting for more or judging.",
    "Multiple exclamations (!!) are safe. Single (!) can be risky."
  ],
  decoderItems: [
    {
      id: "punc-1",
      phrase: "Okay.",
      literalMeaning: "Agreement.",
      actualMeaning: "I am angry, annoyed, or ending this conversation aggressively.",
      dangerLevel: "High - Aggressive",
      survivalTip: "Remove the period. Just say 'Okay' or 'kk' to be safe."
    },
    {
      id: "punc-2",
      phrase: "Thanks.",
      literalMeaning: "Gratitude.",
      actualMeaning: "I am obligated to say this, but I am not actually happy.",
      dangerLevel: "Medium - Cold",
      survivalTip: "Add an exclamation mark ('Thanks!') to sound genuine."
    },
    {
      id: "punc-3",
      phrase: "...",
      literalMeaning: "A pause in speech.",
      actualMeaning: "I am judging you, waiting for you to fix what you just said, or making it awkward on purpose.",
      dangerLevel: "High - Judgmental",
      survivalTip: "Ask 'Did I miss something?' to break the tension."
    },
    {
      id: "punc-4",
      phrase: "FINE",
      literalMeaning: "Good / Acceptable.",
      actualMeaning: "I hate this, but I am shouting acceptance to make you shut up.",
      dangerLevel: "Critical - Run",
      survivalTip: "Do NOT proceed. Call them immediately."
    },
    {
      id: "punc-5",
      phrase: "no worries",
      literalMeaning: "Do not worry.",
      actualMeaning: "You messed up, but I am too polite to yell at you.",
      dangerLevel: "Low - Passive",
      survivalTip: "Accept the grace, but don't do it again."
    }
  ]
};
