import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const foodAndEating: Script = {
  id: "everyday-food-and-eating",
  title: "Food and Eating",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Practice sentences for ordering food, talking about meals, and sharing food preferences in daily life.",
    imageUrl: "/images/scenarios/small_talk_generic.png",
  sentences: [
    {
      id: "s1",
      en: "I’ll have coffee and a sandwich.",
      keywords: [
        { word: "coffee", definition: "caffeinated drink" },
        { word: "sandwich", definition: "bread with filling" },
      ],
    },
    {
      id: "s2",
      en: "Can I see the menu, please?",
      keywords: [
        { word: "menu", definition: "food list" },
        { word: "please", definition: "polite request" },
      ],
    },
    {
      id: "s3",
      en: "What do you recommend?",
      keywords: [
        { word: "recommend", definition: "suggest" },
        { word: "what", definition: "which thing" },
      ],
    },
    {
      id: "s4",
      en: "I’d like a bowl of soup and some bread.",
      keywords: [
        { word: "bowl", definition: "deep dish" },
        { word: "soup", definition: "liquid food" },
      ],
    },
    {
      id: "s5",
      en: "Is this dish spicy?",
      keywords: [
        { word: "dish", definition: "food item" },
        { word: "spicy", definition: "hot flavor" },
      ],
    },
    {
      id: "s6",
      en: "Can I get this without cheese?",
      keywords: [
        { word: "without", definition: "excluding" },
        { word: "cheese", definition: "dairy product" },
      ],
    },
    {
      id: "s7",
      en: "I’ll take it to go.",
      keywords: [
        { word: "to go", definition: "takeaway" },
        { word: "take", definition: "carry" },
      ],
    },
    {
      id: "s8",
      en: "Can we have the bill, please?",
      keywords: [
        { word: "bill", definition: "check/cost" },
        { word: "please", definition: "request" },
      ],
    },
    {
      id: "s9",
      en: "What’s your favorite food?",
      keywords: [
        { word: "favorite", definition: "most liked" },
        { word: "food", definition: "edible things" },
      ],
    },
    {
      id: "s10",
      en: "My favorite meal is fried chicken and rice.",
      keywords: [
        { word: "meal", definition: "eating occasion" },
        { word: "fried chicken", definition: "cooked poultry" },
      ],
    },
    {
      id: "s11",
      en: "I usually eat cereal for breakfast.",
      keywords: [
        { word: "usually", definition: "normally" },
        { word: "breakfast", definition: "morning meal" },
      ],
    },
    {
      id: "s12",
      en: "For lunch, I had a salad and some fruit.",
      keywords: [
        { word: "lunch", definition: "noon meal" },
        { word: "salad", definition: "greens mix" },
      ],
    },
    {
      id: "s13",
      en: "Let’s eat dinner together tonight.",
      keywords: [
        { word: "dinner", definition: "evening meal" },
        { word: "together", definition: "as a group" },
      ],
    },
    {
      id: "s14",
      en: "I’m hungry. Let’s order something.",
      keywords: [
        { word: "hungry", definition: "needing food" },
        { word: "order", definition: "request food" },
      ],
    },
    {
      id: "s15",
      en: "This tastes really good!",
      keywords: [
        { word: "taste", definition: "flavor" },
        { word: "good", definition: "delicious" },
      ],
    },
  ],
};
