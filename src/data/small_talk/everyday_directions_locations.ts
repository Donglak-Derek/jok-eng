import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const directionsAndLocations: Script = {
  id: "everyday-directions-locations",
  title: "Directions and Locations",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Learn how to ask and give directions at work or outside. These sentences help you talk about places and locations clearly.",
  sentences: [
    {
      id: "s1",
      en: "Where is the restroom?",
      keywords: [
        { word: "restroom", definition: "toilet / bathroom" },
        { word: "where", definition: "location query" },
      ],
    },
    {
      id: "s2",
      en: "The restroom is next to the cafeteria.",
      keywords: [
        { word: "next to", definition: "beside" },
        { word: "cafeteria", definition: "dining hall" },
      ],
    },
    {
      id: "s3",
      en: "How do I get to the showroom?",
      keywords: [
        { word: "get to", definition: "arrive at" },
        { word: "showroom", definition: "display room" },
      ],
    },
    {
      id: "s4",
      en: "The showroom is straight ahead.",
      keywords: [
        { word: "straight ahead", definition: "directly forward" },
        { word: "ahead", definition: "in front" },
      ],
    },
    {
      id: "s5",
      en: "Turn left at the corner.",
      keywords: [
        { word: "turn left", definition: "go left" },
        { word: "corner", definition: "junction" },
      ],
    },
    {
      id: "s6",
      en: "Turn right after the stairs.",
      keywords: [
        { word: "turn right", definition: "go right" },
        { word: "stairs", definition: "steps" },
      ],
    },
    {
      id: "s7",
      en: "The elevator is near the entrance.",
      keywords: [
        { word: "elevator", definition: "lift" },
        { word: "entrance", definition: "entry door" },
      ],
    },
    {
      id: "s8",
      en: "Go past the kitchen section.",
      keywords: [
        { word: "go past", definition: "pass by" },
        { word: "section", definition: "area" },
      ],
    },
    {
      id: "s9",
      en: "The office is on the second floor.",
      keywords: [
        { word: "office", definition: "workplace" },
        { word: "second floor", definition: "level 2" },
      ],
    },
    {
      id: "s10",
      en: "Walk down this hallway.",
      keywords: [
        { word: "hallway", definition: "corridor" },
        { word: "walk down", definition: "proceed along" },
      ],
    },
    {
      id: "s11",
      en: "The cafeteria is next to the showroom.",
      keywords: [
        { word: "cafeteria", definition: "canteen" },
        { word: "next to", definition: "adjacent" },
      ],
    },
    {
      id: "s12",
      en: "Go through that door and turn left.",
      keywords: [
        { word: "go through", definition: "pass via" },
        { word: "door", definition: "gateway" },
      ],
    },
    {
      id: "s13",
      en: "The parking lot is behind the building.",
      keywords: [
        { word: "parking lot", definition: "car park" },
        { word: "behind", definition: "at the back of" },
      ],
    },
    {
      id: "s14",
      en: "Is it far from here?",
      keywords: [
        { word: "far", definition: "long distance" },
        { word: "from here", definition: "starting here" },
      ],
    },
    {
      id: "s15",
      en: "No, it’s very close.",
      keywords: [
        { word: "close", definition: "near" },
        { word: "very", definition: "extremely" },
      ],
    },
  ],
};
