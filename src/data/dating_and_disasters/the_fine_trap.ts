import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theFineTrap: Script = {
  id: "date_fine_trap",
  title: "The 'Fine' Trap",
  type: "decoder",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Passive-aggression is a love language nobody wants to speak. Learn to decode the silence.",
  sentences: [],
    imageUrl: "/images/scenarios/dating_generic.png",
  decoderItems: [
    {
      id: "fine_1",
      phrase: "I'm fine.",
      literalMeaning: " I am okay / vaguely positive.",
      actualMeaning: "I am furious, but I want you to figure out why without me telling you.",
      dangerLevel: "🔥 High",
      survivalTip: "Do NOT say 'Okay, good.' Ask 'Are you sure? You seem quiet.' Proceed with extreme caution.",
    },
    {
      id: "fine_2",
      phrase: "Do whatever you want.",
      literalMeaning: "I am giving you permission to choose.",
      actualMeaning: "If you do that thing, we are going to have a massive fight later.",
      dangerLevel: "💀 Critical",
      survivalTip: "This is a trap. Do not do 'whatever you want'. Do what THEY want, or compromise immediately.",
    },
    {
      id: "fine_3",
      phrase: "It's funny how...",
      literalMeaning: "I am about to share a humorous observation.",
      actualMeaning: "I am about to bring up a grudge from 3 months ago that I have been stewing on.",
      dangerLevel: "⚠️ Medium",
      survivalTip: "Brace yourself. Listen without interrupting. Do not laugh. It is NOT funny.",
    },
    {
      id: "fine_4",
      phrase: "No, I'm not mad.",
      literalMeaning: "I am not feeling anger.",
      actualMeaning: "I am seething, but I don't want to look 'crazy' by admitting it yet.",
      dangerLevel: "🔥 High",
      survivalTip: "You probably forgot an anniversary or liked someone's photo. buy food immediately.",
    },
    {
      id: "fine_5",
      phrase: "I guess it's okay.",
      literalMeaning: "I approve of this.",
      actualMeaning: "I hate it, but I don't want to be the bad guy who says no.",
      dangerLevel: "🤔 Medium",
      survivalTip: "They are disappointed. Offer an alternative option before locking this in.",
    },
  ],
};
