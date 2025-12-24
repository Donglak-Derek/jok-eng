import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const questionForms: Script = {
  id: "grammar-question-forms",
  title: "Is This a Joke?",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Questions that politely check tone—useful when you’re not sure if someone is serious or sarcastic.",
  sentences: [
    {
      id: "s1",
      en: "Sorry, is that a joke or for real?",
      keywords: [
        { word: "for real", definition: "genuine/serious" },
        { word: "joke", definition: "something said for fun" },
      ],
    },
    {
      id: "s2",
      en: "Are we being sarcastic or should I be worried?",
      keywords: [
        { word: "sarcastic", definition: "mocking irony" },
        { word: "worried", definition: "anxious" },
      ],
    },
    {
      id: "s3",
      en: "Did you mean that literally or are we venting?",
      keywords: [
        { word: "literally", definition: "exactly as stated" },
        { word: "venting", definition: "expressing strong emotion" },
      ],
    },
    {
      id: "s4",
      en: "Do you want me to fix it or just laugh with you?",
      keywords: [
        { word: "fix", definition: "solve" },
        { word: "laugh", definition: "express amusement" },
      ],
    },
    {
      id: "s5",
      en: "Was that sarcasm or am I missing context?",
      keywords: [
        { word: "context", definition: "background" },
        { word: "missing", definition: "not catching" },
      ],
    },
    {
      id: "s6",
      en: "Are you serious, or is this your comedy set?",
      keywords: [
        { word: "serious", definition: "not joking" },
        { word: "set", definition: "comedy routine" },
      ],
    },
    {
      id: "s7",
      en: "Should I laugh or grab a notepad?",
      keywords: [
        { word: "grab", definition: "take hold of" },
        { word: "notepad", definition: "pad for notes" },
      ],
    },
    {
      id: "s8",
      en: "Want me to take that seriously or keep it light?",
      keywords: [
        { word: "seriously", definition: "sincerely" },
        { word: "keep it light", definition: "stay casual/fun" },
      ],
    },
  ],
};
