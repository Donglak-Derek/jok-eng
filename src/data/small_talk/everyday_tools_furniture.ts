import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const toolsAndFurniture: Script = {
  id: "everyday-tools-furniture",
  title: "Tools and Furniture Vocabulary",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Practice useful sentences with tools, furniture parts, and common actions. These will help at work and in daily life.",
  sentences: [
    {
      id: "s1",
      en: "Can you pass me the screwdriver?",
      keywords: [
        { word: "screwdriver", definition: "tool for turning screws" },
        { word: "pass", definition: "give / hand over" },
      ],
    },
    {
      id: "s2",
      en: "I need a hammer to fix this.",
      keywords: [
        { word: "hammer", definition: "tool for hitting nails" },
        { word: "fix", definition: "repair" },
      ],
    },
    {
      id: "s3",
      en: "The table leg is loose.",
      keywords: [
        { word: "table leg", definition: "support for table" },
        { word: "loose", definition: "wobbly" },
      ],
    },
    {
      id: "s4",
      en: "Please hold the shelf while I screw it in.",
      keywords: [
        { word: "shelf", definition: "flat storage board" },
        { word: "screw in", definition: "fasten with screw" },
      ],
    },
    {
      id: "s5",
      en: "We need more nails for this build.",
      keywords: [
        { word: "nails", definition: "metal spikes" },
        { word: "build", definition: "construction project" },
      ],
    },
    {
      id: "s6",
      en: "The chair is missing a screw.",
      keywords: [
        { word: "chair", definition: "seat" },
        { word: "screw", definition: "threaded fastener" },
      ],
    },
    {
      id: "s7",
      en: "Use the drill to make a hole.",
      keywords: [
        { word: "drill", definition: "boring tool" },
        { word: "hole", definition: "opening" },
      ],
    },
    {
      id: "s8",
      en: "The sofa cushion is very soft.",
      keywords: [
        { word: "sofa", definition: "couch" },
        { word: "cushion", definition: "soft pillow" },
      ],
    },
    {
      id: "s9",
      en: "Can you tighten this bolt with a wrench?",
      keywords: [
        { word: "bolt", definition: "large screw" },
        { word: "wrench", definition: "turning tool" },
      ],
    },
    {
      id: "s10",
      en: "The bookshelf is too heavy to move alone.",
      keywords: [
        { word: "bookshelf", definition: "case for books" },
        { word: "heavy", definition: "weighty" },
      ],
    },
    {
      id: "s11",
      en: "This drawer is stuck.",
      keywords: [
        { word: "drawer", definition: "sliding compartment" },
        { word: "stuck", definition: "jammed" },
      ],
    },
    {
      id: "s12",
      en: "Be careful, the glass top can break easily.",
      keywords: [
        { word: "glass top", definition: "glass surface" },
        { word: "break", definition: "shatter" },
      ],
    },
    {
      id: "s13",
      en: "IKEA has a simple design style.",
      keywords: [
        { word: "design", definition: "plan/look" },
        { word: "style", definition: "fashion/manner" },
      ],
    },
    {
      id: "s14",
      en: "We should measure the space before building the bed.",
      keywords: [
        { word: "measure", definition: "take dimensions" },
        { word: "space", definition: "area" },
      ],
    },
    {
      id: "s15",
      en: "This lamp gives warm light.",
      keywords: [
        { word: "lamp", definition: "light fixture" },
        { word: "light", definition: "illumination" },
      ],
    },
  ],
};
