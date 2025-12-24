import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const gymSmallTalk: Script = {
  id: "everyday-gym-small-talk",
  title: "Gym Small Talk",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "We talk about reps, rest, and reality: pretending the treadmill isn't judging us.",
  sentences: [
    {
      id: "s1",
      en: "Hey, are you using this bench?",
      keywords: [
        { word: "bench", definition: "exercise seat" },
        { word: "use", definition: "occupy" },
      ],
    },
    {
      id: "s2",
      en: "Go ahead, I was just resting.",
      keywords: [
        { word: "go ahead", definition: "proceed / use it" },
        { word: "resting", definition: "taking a break" },
      ],
    },
    {
      id: "s3",
      en: "How many sets do you have left?",
      keywords: [
        { word: "set", definition: "group of reps" },
        { word: "left", definition: "remaining" },
      ],
    },
    {
      id: "s4",
      en: "Just one, then I'll wipe it down.",
      keywords: [{ word: "wipe down", definition: "clean with towel" }],
    },
    {
      id: "s5",
      en: "The treadmill looks too honest today.",
      keywords: [
        { word: "treadmill", definition: "running machine" },
        { word: "honest", definition: "telling truth (about fitness)" },
      ],
    },
    {
      id: "s6",
      en: "We laugh and raise the speed anyway.",
      keywords: [
        { word: "raise", definition: "increase" },
        { word: "speed", definition: "velocity" },
      ],
    },
    {
      id: "s7",
      en: "Let's pretend it's cardio and not survival.",
      keywords: [
        { word: "pretend", definition: "act as if" },
        { word: "cardio", definition: "aerobic exercise" },
      ],
    },
    {
      id: "s8",
      en: "See you next week, maybe.",
      keywords: [{ word: "maybe", definition: "perhaps" }],
    },
  ],
};
