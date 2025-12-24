import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const autocorrect: Script = {
  id: "standup-autocorrect",
  title: "Name Game at the Bar",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish:
    "When you forget names at a party, you need a joke that saves you. This bit teaches how to admit it with humor and keep the vibe light.",
  icon: "🏷️",
  sentences: [
    {
      id: "s1",
      en: "At crowded bars, I forget names every five minutes.",
      keywords: [
        { word: "crowded", definition: "filled with many people" },
        { word: "forget", definition: "fail to remember" },
      ],
    },
    {
      id: "s2",
      en: "So I joke, 'Sorry, my brain's autocorrect keeps renaming you.'",
      keywords: [
        { word: "autocorrect", definition: "automatic spelling correction" },
        { word: "rename", definition: "to give a new name to" },
      ],
    },
    {
      id: "s3",
      en: "They laugh because I own the mistake.",
      keywords: [
        { word: "own", definition: "to admit or accept responsibility" },
        { word: "mistake", definition: "an error or wrong action" },
      ],
    },
    {
      id: "s4",
      en: "Then I ask, 'Remind me before I call you Captain again?'",
      keywords: [
        { word: "remind", definition: "cause someone to remember" },
        { word: "again", definition: "one more time" },
      ],
    },
    {
      id: "s5",
      en: "Now it's an inside joke, not a weird pause.",
      keywords: [
        { word: "inside joke", definition: "joke shared by a specific group" },
        { word: "pause", definition: "a temporary stop or silence" },
      ],
    },
    {
      id: "s6",
      en: "If they forget my name too, I high-five and say, 'Great, we’re even.'",
      keywords: [
        { word: "high-five", definition: "clapping hands as a greeting" },
        { word: "even", definition: "equal in score or status" },
      ],
    },
    {
      id: "s7",
      en: "This keeps the vibe playful instead of tense.",
      keywords: [
        { word: "playful", definition: "fun and lighthearted" },
        { word: "tense", definition: "nervous or unable to relax" },
      ],
    },
    {
      id: "s8",
      en: "Plus, I actually remember after joking about it.",
      keywords: [
        { word: "remember", definition: "recall to mind" },
        { word: "after", definition: "later in time" },
      ],
    },
  ],
};
