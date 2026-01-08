import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const wrongOrder: Script = {
  id: "polite-wrong-order",
  title: "The Wrong Coffee Order",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "You ordered iced. They gave you hot. How to fix it without feeling guilty.",
    imageUrl: "/images/scenarios/polite_generic.png",
  sentences: [
    {
      id: "order-1-rude",
      en: "Rude: 'I said iced. This is hot. Remake it.'",
      keywords: [
        { word: "Remake", definition: "Make again" },
      ],
    },
    {
      id: "order-1-polite",
      en: "Polite: 'So sorry, I think I might have asked for this iced?'",
      keywords: [
        { word: "Might have", definition: "Possibility (takes partial blame)" },
        { word: "Asked for", definition: "Requested" }
      ],
    },
    {
      id: "order-2-rude",
      en: "Rude: 'Can't you get a simple order right?'",
      keywords: [
        { word: "Simple", definition: "Easy to understand/do" },
      ],
    },
    {
      id: "order-2-polite",
      en: "Polite: 'I totally messed up explaining it, but is there any way we could swap this for an iced one?'",
      keywords: [
        { word: "Swap", definition: "Exchange" },
        { word: "Messed up", definition: "Made a mistake (self-deprecation)" }
      ],
    },
    {
      id: "order-3-rude",
      en: "Rude: 'I want a refund if I have to wait.'",
      keywords: [
        { word: "Refund", definition: "Repayment of money" },
      ],
    },
    {
      id: "order-3-polite",
      en: "Polite: 'No rush at all, take your time! I really appreciate you fixing it.'",
      keywords: [
        { word: "No rush", definition: "Don't hurry" },
        { word: "Appreciate", definition: "Recognize the full worth of" }
      ],
    }
  ]
};
