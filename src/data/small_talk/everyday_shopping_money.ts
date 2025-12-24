import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const shoppingAndMoney: Script = {
  id: "everyday-shopping-money",
  title: "Coffee Line Chit-Chat",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Friendly lines for ordering coffee and joking about prices without sounding rude.",
  sentences: [
    {
      id: "s1",
      en: "Hi! Can I get an iced latte, medium?",
      keywords: [
        { word: "iced latte", definition: "cold espresso milk drink" },
        { word: "medium", definition: "middle size" },
      ],
    },
    {
      id: "s2",
      en: "Could you make it a little less sweet?",
      keywords: [
        { word: "less sweet", definition: "reduced sugar" },
        { word: "make it", definition: "prepare it" },
      ],
    },
    {
      id: "s3",
      en: "Is it okay to tap here, or do I need to sign?",
      keywords: [
        { word: "tap", definition: "contactless payment" },
        { word: "sign", definition: "write signature" },
      ],
    },
    {
      id: "s4",
      en: "Wow, coffee got fancy—does this come with a free life coach?",
      keywords: [
        { word: "fancy", definition: "elaborate/expensive" },
        { word: "life coach", definition: "mentor" },
      ],
    },
    {
      id: "s5",
      en: "Is there a loyalty card or should I start a punch card of tears?",
      keywords: [
        { word: "loyalty card", definition: "rewards card" },
        { word: "punch card", definition: "card marked per visit" },
      ],
    },
    {
      id: "s6",
      en: "I’ll grab a croissant too—why not live boldly.",
      keywords: [
        { word: "grab", definition: "buy quickly" },
        { word: "boldly", definition: "courageously" },
      ],
    },
    {
      id: "s7",
      en: "Could I get a receipt? My budget likes to see evidence.",
      keywords: [
        { word: "receipt", definition: "payment record" },
        { word: "get", definition: "receive" },
      ],
    },
    {
      id: "s8",
      en: "Name's Derek—thanks! Hope the line stays calm for you.",
      keywords: [
        { word: "line", definition: "queue" },
        { word: "stay calm", definition: "remain peaceful" },
      ],
    },
  ],
};
