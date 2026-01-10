import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const datingAppCrash: Script = {
  id: "date_app_crash",
  title: "Dating App Crash",
  type: "decoder",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Apps are designed to keep you swiping, not dating. Here is what their notifications really mean.",
  imageUrl: "/images/scenarios/dating_app_crash.png",
  sentences: [],
  decoderItems: [
    {
      id: "app_1",
      phrase: "It's a Match!",
      literalMeaning: "Two people liked each other.",
      actualMeaning: "You have 24 hours to say something witty or this match will expire forever.",
      dangerLevel: "⏳ Time Sensitive",
      survivalTip: "Do not say 'Hey'. Ask a question about their bio immediately.",
    },
    {
      id: "app_2",
      phrase: "No more profiles in your area.",
      literalMeaning: "You have viewed everyone nearby.",
      actualMeaning: "You are addicted. Put the phone down and go outside.",
      dangerLevel: "💀 Reality Check",
      survivalTip: "Delete the app for 3 days. Your mental health needs a reboot.",
    },
    {
      id: "app_3",
      phrase: "Someone liked you! Upgrade to see who.",
      literalMeaning: "Pay money to reveal a secret admirer.",
      actualMeaning: "The person who liked you lives 5,000 miles away or is a bot.",
      dangerLevel: "💸 Scam",
      survivalTip: "Do not pay. If they were close and compatible, you would see them in the stack.",
    },
    {
      id: "app_4",
      phrase: "Ghosting (No Notification)",
      literalMeaning: "Silence.",
      actualMeaning: "They found someone else, deleted the app, or died. You will never know.",
      dangerLevel: "👻 Spooky",
      survivalTip: "Unmatch after 3 days of silence. Clean up your digital space.",
    },
    {
      id: "app_5",
      phrase: "He/She is typing...",
      literalMeaning: "A message is being drafted.",
      actualMeaning: "They are overthinking their response, or they typed 'lol' and fell asleep.",
      dangerLevel: "🤔 Anxiety",
      survivalTip: "Put the phone away. obsession is not attractive.",
    },
  ],
};
