import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const techInterview: Script = {
  id: "interview-tech",
  title: "Sprint Planning Humor",
  categorySlug: "office_banter",
  categoryName: CATEGORY_NAMES["office_banter"],
  cleanedEnglish:
    "Use light jokes about standups, bugs, and meetings to survive office banter without sounding negative.",
  sentences: [
    {
      id: "s1",
      en: "In standup I joke, 'Yesterday I fought with a semicolon and lost.'",
      keywords: [
        { word: "standup", definition: "daily team status meeting" },
        { word: "semicolon", definition: "punctuation mark (;)" },
      ],
    },
    {
      id: "s2",
      en: "People relax because I'm honest but not whining.",
      keywords: [
        { word: "honest", definition: "truthful" },
        { word: "whining", definition: "complaining annoyingly" },
      ],
    },
    {
      id: "s3",
      en: "When planning, I say, 'Let's give the bug a cool codename so we don't fear it.'",
      keywords: [
        { word: "codename", definition: "secret name for a project" },
        { word: "fear", definition: "be afraid of" },
      ],
    },
    {
      id: "s4",
      en: "It sounds playful, but we still estimate honestly.",
      keywords: [
        { word: "estimate", definition: "calculate roughly" },
        { word: "playful", definition: "fun and lighthearted" },
      ],
    },
    {
      id: "s5",
      en: "If a PM asks for more scope, I reply, 'Sure, do we unlock a new team when we beat this level?'",
      keywords: [
        { word: "scope", definition: "amount of work/features" },
        { word: "level", definition: "stage in a game" },
      ],
    },
    {
      id: "s6",
      en: "They laugh and clarify priorities.",
      keywords: [
        { word: "clarify", definition: "make clear" },
        { word: "priorities", definition: "most important tasks" },
      ],
    },
    {
      id: "s7",
      en: "During retro, I say, 'Let's roast bugs, not teammates.'",
      keywords: [
        { word: "retro", definition: "retrospective meeting" },
        { word: "teammate", definition: "coworker" },
      ],
    },
    {
      id: "s8",
      en: "That keeps feedback sharp but friendly.",
      keywords: [
        { word: "feedback", definition: "comments on performance" },
        { word: "friendly", definition: "kind and pleasant" },
      ],
    },
    {
      id: "s9",
      en: "Small jokes make meetings feel like humans talking, not tickets shouting.",
      keywords: [
        { word: "ticket", definition: "task in issue tracker" },
        { word: "shout", definition: "speak very loudly" },
      ],
    },
  ],
};
