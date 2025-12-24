import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const transportation: Script = {
  id: "everyday-transportation",
  title: "Uber & Taxi Banter",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Light lines for rideshares—fast small talk that makes you sound friendly without oversharing.",
  sentences: [
    {
      id: "s1",
      en: "Hey, thanks for picking me up—how's your day going?",
      keywords: [
        { word: "pick up", definition: "collect passenger" },
        { word: "how's your day", definition: "greeting" },
      ],
    },
    {
      id: "s2",
      en: "Traffic is wild today, right?",
      keywords: [
        { word: "traffic", definition: "vehicle congestion" },
        { word: "wild", definition: "crazy/chaotic" },
      ],
    },
    {
      id: "s3",
      en: "If there's a faster route, I'm all for it.",
      keywords: [
        { word: "route", definition: "path" },
        { word: "all for it", definition: "totally agree" },
      ],
    },
    {
      id: "s4",
      en: "I’m headed to a friend's thing—trying not to be late.",
      keywords: [
        { word: "headed to", definition: "going towards" },
        { word: "late", definition: "delayed" },
      ],
    },
    {
      id: "s5",
      en: "Mind if I crack a window just a bit?",
      keywords: [
        { word: "mind if", definition: "do you object if" },
        { word: "crack a window", definition: "open slightly" },
      ],
    },
    {
      id: "s6",
      en: "Thanks for the smooth driving—feels like a bonus nap zone.",
      keywords: [
        { word: "smooth", definition: "gentle" },
        { word: "bonus", definition: "extra" },
      ],
    },
    {
      id: "s7",
      en: "By the way, do you have a favorite podcast or playlist for rides?",
      keywords: [
        { word: "podcast", definition: "audio show" },
        { word: "playlist", definition: "music list" },
      ],
    },
    {
      id: "s8",
      en: "This is my stop—thanks and have a chill shift!",
      keywords: [
        { word: "stop", definition: "drop-off point" },
        { word: "shift", definition: "work period" },
      ],
    },
  ],
};
