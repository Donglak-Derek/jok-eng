import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const greetingsSmallTalk: Script = {
  id: "everyday-greetings-small-talk",
  title: "Elevator Armor",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Small talk that buys you 60 seconds in an elevator, hallway, or lobby—friendly, light, and easy to exit.",
  sentences: [
    {
      id: "s1",
      en: "Hey! Made it before the coffee disappears.",
      keywords: [
        { word: "made it", definition: "arrived successfully" },
        { word: "disappears", definition: "vanishes / runs out" },
      ],
    },
    {
      id: "s2",
      en: "How's your day treating you so far?",
      keywords: [
        { word: "treating you", definition: "going for you" },
        { word: "so far", definition: "up to now" },
      ],
    },
    {
      id: "s3",
      en: "Nice to see you—surviving the week?",
      keywords: [
        { word: "surviving", definition: "getting through tough times" },
        { word: "week", definition: "Mon-Fri work days" },
      ],
    },
    {
      id: "s4",
      en: "That weather is doing stand-up comedy today—sunny then dramatic.",
      keywords: [
        { word: "stand-up", definition: "comedy performance" },
        { word: "dramatic", definition: "sudden and striking" },
      ],
    },
    {
      id: "s5",
      en: "Any fun plans after work or just couch-hero mode?",
      keywords: [
        { word: "plans", definition: "intentions" },
        { word: "couch", definition: "sofa" },
      ],
    },
    {
      id: "s6",
      en: "I’m on my third coffee—wish me luck.",
      keywords: [
        { word: "third", definition: "number 3 in sequence" },
        { word: "wish me luck", definition: "hope for my success" },
      ],
    },
    {
      id: "s7",
      en: "If you need the good snacks, they’re hiding in the second drawer.",
      keywords: [
        { word: "snack", definition: "light food" },
        { word: "drawer", definition: "sliding storage box" },
      ],
    },
    {
      id: "s8",
      en: "Okay, this is your floor—have a good one!",
      keywords: [
        { word: "floor", definition: "level of building" },
        { word: "have a good one", definition: "have a good day" },
      ],
    },
  ],
};
