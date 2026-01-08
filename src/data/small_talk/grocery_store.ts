import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const groceryStore: Script = {
  id: "everyday-grocery-store",
  title: "At the Grocery Store",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "A quick trip becomes a language workout: finding items, asking staff, and resisting the snack aisle.",
    imageUrl: "/images/scenarios/small_talk_generic.png",
  sentences: [
    {
      id: "s1",
      en: "I grabbed a basket at the entrance.",
      keywords: [
        { word: "basket", definition: "container for carrying" },
        { word: "entrance", definition: "way in" },
      ],
    },
    {
      id: "s2",
      en: "Excuse me, where is the bread?",
      keywords: [
        { word: "excuse me", definition: "pardon me" },
        { word: "bread", definition: "baked dough food" },
      ],
    },
    {
      id: "s3",
      en: "It's on aisle seven, next to milk.",
      keywords: [
        { word: "aisle", definition: "walkway" },
        { word: "next to", definition: "beside" },
      ],
    },
    {
      id: "s4",
      en: "I compared prices and picked a loaf.",
      keywords: [
        { word: "compare", definition: "examine differences" },
        { word: "loaf", definition: "whole bread unit" },
      ],
    },
    {
      id: "s5",
      en: "The snack aisle tried to tempt me.",
      keywords: [
        { word: "snack", definition: "light meal/treat" },
        { word: "tempt", definition: "attract" },
      ],
    },
    {
      id: "s6",
      en: "I waved at the free samples.",
      keywords: [{ word: "free sample", definition: "complimentary taste" }],
    },
    {
      id: "s7",
      en: "At checkout, I said, 'Card, please.'",
      keywords: [
        { word: "checkout", definition: "payment area" },
        { word: "card", definition: "credit/debit card" },
      ],
    },
    {
      id: "s8",
      en: "The receipt was longer than my list.",
      keywords: [
        { word: "receipt", definition: "proof of purchase" },
        { word: "list", definition: "shopping notes" },
      ],
    },
  ],
};
