import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const customerServiceBasics: Script = {
  id: "everyday-customer-service-basics",
  title: "Customer Service Basics",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Useful phrases for helping customers politely and clearly. These sentences focus on giving directions, explaining items, and offering help.",
  sentences: [
    {
      id: "s1",
      en: "Hello, can I help you find something?",
      keywords: [
        { word: "help", definition: "assist" },
        { word: "find", definition: "locate" },
      ],
    },
    {
      id: "s2",
      en: "That item is in aisle 5, bin 12.",
      keywords: [
        { word: "aisle", definition: "walkway between shelves" },
        { word: "bin", definition: "container" },
      ],
    },
    {
      id: "s3",
      en: "This product is out of stock right now.",
      keywords: [
        { word: "product", definition: "item for sale" },
        { word: "out of stock", definition: "unavailable" },
      ],
    },
    {
      id: "s4",
      en: "You can order it online.",
      keywords: [
        { word: "order", definition: "request purchase" },
        { word: "online", definition: "on the internet" },
      ],
    },
    {
      id: "s5",
      en: "Please wait here for a moment.",
      keywords: [
        { word: "wait", definition: "stay" },
        { word: "moment", definition: "short time" },
      ],
    },
    {
      id: "s6",
      en: "I will check the stock for you.",
      keywords: [
        { word: "check", definition: "verify" },
        { word: "stock", definition: "inventory" },
      ],
    },
    {
      id: "s7",
      en: "This item comes in different colors.",
      keywords: [
        { word: "different", definition: "not the same" },
        { word: "colors", definition: "hues" },
      ],
    },
    {
      id: "s8",
      en: "Would you like me to show you?",
      keywords: [
        { word: "show", definition: "display / guide" },
        { word: "would you like", definition: "do you want" },
      ],
    },
    {
      id: "s9",
      en: "The return desk is over there.",
      keywords: [
        { word: "return", definition: "give back" },
        { word: "desk", definition: "service counter" },
      ],
    },
    {
      id: "s10",
      en: "You need the receipt to return this item.",
      keywords: [
        { word: "receipt", definition: "proof of purchase" },
        { word: "return", definition: "give back for refund" },
      ],
    },
    {
      id: "s11",
      en: "I can call someone to help you.",
      keywords: [
        { word: "call", definition: "summon" },
        { word: "someone", definition: "a person" },
      ],
    },
    {
      id: "s12",
      en: "Please follow me, I’ll show you the way.",
      keywords: [
        { word: "follow", definition: "come after" },
        { word: "way", definition: "path" },
      ],
    },
    {
      id: "s13",
      en: "The assembly instructions are inside the box.",
      keywords: [
        { word: "assembly", definition: "putting together" },
        { word: "instructions", definition: "directions" },
      ],
    },
    {
      id: "s14",
      en: "This item is heavy, let me get a cart for you.",
      keywords: [
        { word: "heavy", definition: "great weight" },
        { word: "cart", definition: "wheeled carrier" },
      ],
    },
    {
      id: "s15",
      en: "Thank you for waiting.",
      keywords: [
        { word: "thank you", definition: "expression of gratitude" },
        { word: "waiting", definition: "staying until ready" },
      ],
    },
  ],
};
