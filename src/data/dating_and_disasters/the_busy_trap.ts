import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theBusyTrap: Script = {
  id: "date_busy_trap",
  title: "The 'Busy' Trap",
  section: "The Dating Minefield",
  type: "decoder",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Is he ghosting you or just CEO of a Fortune 500 company? (Spoiler: He's ghosting you).",
  sentences: [],
    imageUrl: "/images/scenarios/the_busy_trap.png",
  decoderItems: [
    {
      id: "busy_1",
      phrase: "I'm super busy this week.",
      literalMeaning: "My schedule is packed with work/events.",
      actualMeaning: "You are not a priority. People make time for people they like.",
      dangerLevel: "⚠️ Medium",
      survivalTip: "Match their energy. Say 'No worries, me too.' Do not double text.",
    },
    {
      id: "busy_2",
      phrase: "My phone died.",
      literalMeaning: "Battery reached 0%.",
      actualMeaning: "I saw your text, ignored it, and now I need an excuse for the 6-hour delay.",
      dangerLevel: "🤔 Low/Medium",
      survivalTip: "Accept it once. If their battery dies every Friday night, they are lying.",
    },
    {
      id: "busy_3",
      phrase: "I'm bad at texting.",
      literalMeaning: "I struggle with digital communication skills.",
      actualMeaning: "I'm bad at texting *you*. I text my friends instantly.",
      dangerLevel: "🚩 High / Soft Rejection",
      survivalTip: "This is a soft rejection. Lower your expectations to zero.",
    },
    {
      id: "busy_4",
      phrase: "Maybe, let me check my schedule.",
      literalMeaning: "I need to verify my availability.",
      actualMeaning: "No. (But I might say yes if my better plans fall through).",
      dangerLevel: "⚠️ Medium",
      survivalTip: "Don't hold the date. Make other plans. You are the backup option.",
    },
    {
      id: "busy_5",
      phrase: "Something came up.",
      literalMeaning: "An unexpected event occurred.",
      actualMeaning: "I found something better to do / I just don't want to go.",
      dangerLevel: "🔥 High",
      survivalTip: "If they don't propose a new time immediately ('Can we do Tuesday instead?'), they are done.",
    },
  ],
};
