import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const hobbiesFreeTime: Script = {
  id: "everyday-hobbies-free-time",
  title: "Hobbies and Free Time",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Practice talking about hobbies and free time. Share what you like to do after work or on weekends.",
  sentences: [
    {
      id: "s1",
      en: "I enjoy watching movies on weekends.",
      keywords: [
        { word: "enjoy", definition: "get pleasure from" },
        { word: "weekends", definition: "Sat/Sun" },
      ],
    },
    {
      id: "s2",
      en: "After work, I like to listen to music.",
      keywords: [
        { word: "after work", definition: "post-job time" },
        { word: "listen", definition: "hear" },
      ],
    },
    {
      id: "s3",
      en: "Sometimes I play video games to relax.",
      keywords: [
        { word: "video games", definition: "digital games" },
        { word: "relax", definition: "unwind" },
      ],
    },
    {
      id: "s4",
      en: "I like cooking new recipes at home.",
      keywords: [
        { word: "cooking", definition: "preparing food" },
        { word: "recipes", definition: "cooking instructions" },
      ],
    },
    {
      id: "s5",
      en: "On weekends, I usually go hiking with friends.",
      keywords: [
        { word: "hiking", definition: "walking in nature" },
        { word: "friends", definition: "mates" },
      ],
    },
    {
      id: "s6",
      en: "I sometimes read books before sleeping.",
      keywords: [
        { word: "read", definition: "scan text" },
        { word: "before sleeping", definition: "pre-bedtime" },
      ],
    },
    {
      id: "s7",
      en: "I like playing soccer on Sundays.",
      keywords: [
        { word: "soccer", definition: "football sport" },
        { word: "Sundays", definition: "first day of week" },
      ],
    },
    {
      id: "s8",
      en: "Sometimes I draw pictures when I feel creative.",
      keywords: [
        { word: "draw", definition: "sketch" },
        { word: "creative", definition: "artistic" },
      ],
    },
    {
      id: "s9",
      en: "I love spending time with my family in the park.",
      keywords: [
        { word: "spending time", definition: "being with" },
        { word: "park", definition: "green space" },
      ],
    },
    {
      id: "s10",
      en: "In my free time, I practice speaking English.",
      keywords: [
        { word: "free time", definition: "spare time" },
        { word: "practice", definition: "rehearse" },
      ],
    },
    {
      id: "s11",
      en: "I sometimes watch YouTube videos to learn new things.",
      keywords: [
        { word: "YouTube", definition: "video platform" },
        { word: "learn", definition: "acquire knowledge" },
      ],
    },
    {
      id: "s12",
      en: "I enjoy taking long walks in the evening.",
      keywords: [
        { word: "walks", definition: "strolls" },
        { word: "evening", definition: "nighttime" },
      ],
    },
  ],
};
