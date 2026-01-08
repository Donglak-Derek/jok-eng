import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const basicsTenses: Script = {
  id: "grammar-basics-tenses",
  title: "Sarcasm Detector 101",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Spot when someone is being sarcastic and reply without sounding offended or confused.",
    imageUrl: "/images/scenarios/sarcasm_generic.png",
  sentences: [
    {
      id: "s1",
      en: "Friend: 'Oh great, another Monday.' Tone: sarcastic complaint.",
      keywords: [
        { word: "sarcastic", definition: "using irony to mock" },
        { word: "tone", definition: "vocal pitch and style" },
      ],
    },
    {
      id: "s2",
      en: "You: 'Same here. Did we accidentally order extra Monday?' playful agreement.",
      keywords: [
        { word: "accidentally", definition: "by mistake" },
        { word: "order", definition: "request goods" },
      ],
    },
    {
      id: "s3",
      en: "If someone says 'Love waiting in line,' they mean they hate it.",
      keywords: [
        { word: "mean", definition: "intend to say" },
        { word: "hate", definition: "dislike intensely" },
      ],
    },
    {
      id: "s4",
      en: "You can reply, 'Right? We should get loyalty points for patience.'",
      keywords: [
        { word: "loyalty points", definition: "rewards for regular customers" },
        { word: "patience", definition: "ability to wait without anger" },
      ],
    },
    {
      id: "s5",
      en: "Sarcasm often uses flat tone and exaggeration.",
      keywords: [
        { word: "flat tone", definition: "voice without emotion" },
        { word: "exaggeration", definition: "making something seem extreme" },
      ],
    },
    {
      id: "s6",
      en: "If you’re unsure, ask lightly: 'Is that a joke or mission statement?'",
      keywords: [
        { word: "unsure", definition: "not certain" },
        { word: "mission statement", definition: "formal summary of aims" },
      ],
    },
    {
      id: "s7",
      en: "If they laugh, you matched their style. If not, shift to sincere.",
      keywords: [
        { word: "sincere", definition: "genuine and honest" },
        { word: "shift", definition: "change direction/focus" },
      ],
    },
    {
      id: "s8",
      en: "You can say, 'Got it. So for real—what do you prefer?'",
      keywords: [
        { word: "for real", definition: "seriously / truthfully" },
        { word: "prefer", definition: "like better" },
      ],
    },
  ],
};
