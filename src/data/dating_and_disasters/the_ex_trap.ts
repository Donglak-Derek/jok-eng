import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theExTrap: Script = {
  id: "date_ex_trap",
  title: "The 'Ex' Trap",
  type: "decoder",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Talking about exes is a minefield. Here is how to spot the explosions before they happen.",
  sentences: [],
    imageUrl: "/images/scenarios/the_ex_trap.png",
  decoderItems: [
    {
      id: "ex_1",
      phrase: "My ex was crazy.",
      literalMeaning: "My former partner had mental health struggles.",
      actualMeaning: "I lack emotional intelligence and likely drove them 'crazy'. I take no responsibility.",
      dangerLevel: "💀 Critical (The Classic Red Flag)",
      survivalTip: "Run. If all their exes are 'crazy', the common denominator is THEM.",
    },
    {
      id: "ex_2",
      phrase: "We're still really close friends.",
      literalMeaning: "We maintained a platonic bond.",
      actualMeaning: "We have unresolved boundaries and might still be hooking up.",
      dangerLevel: "🔥 High",
      survivalTip: "Ask questions. If they text every day or hang out 1-on-1, you are the third wheel.",
    },
    {
      id: "ex_3",
      phrase: "I've never been in a serious relationship.",
      literalMeaning: "I haven't had a long-term partner.",
      actualMeaning: "I have commitment issues or avoid emotional intimacy.",
      dangerLevel: "⚠️ Medium",
      survivalTip: "If they are over 30, this is a concern. Proceed slowly and check for avoidant behavior.",
    },
    {
      id: "ex_4",
      phrase: "She just didn't understand my vision.",
      literalMeaning: "We had different career goals.",
      actualMeaning: "I am unemployed or delusional, and she wanted me to get a real job.",
      dangerLevel: "⚠️ Medium",
      survivalTip: "Check if 'vision' pays the rent.",
    },
    {
      id: "ex_5",
      phrase: "I don't really believe in labels.",
      literalMeaning: "I dislike traditional relationship titles.",
      actualMeaning: "I will waste your time for 6 months and then date someone else properly.",
      dangerLevel: "🚩 High",
      survivalTip: "Believe them. Do not try to be the one to 'change' them. You will lose.",
    },
  ],
};
