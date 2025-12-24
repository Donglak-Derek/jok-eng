import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const netflixTrap: Script = {
  id: "date_03",
  title: "The 'Netflix' Trap",
  type: "decoder",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Dating in English is about subtext. This helps you read between the lines.", /* Context summary */
  sentences: [], // Empty because we use decoderItems
  decoderItems: [
    {
      id: "item_1",
      phrase: "Do you want to come over and watch a movie?",
      literalMeaning: "Watching a film on a television screen.",
      actualMeaning: "Netflix and Chill (Hooking up).",
      dangerLevel: "🔥 High",
      survivalTip: "If you go, assume intimacy is expected. If you just want to watch a movie, suggest a cinema instead.",
    },
    {
       id: "item_2",
       phrase: "I'm not looking for anything serious right now.",
       literalMeaning: "I am busy and cannot commit to a relationship.",
       actualMeaning: "I want to date you casually, but I will never be your boyfriend/girlfriend.",
       dangerLevel: "⚠️ Medium",
       survivalTip: "Believe them. Do not think you can change their mind. Run if you want marriage.",
    },
    {
        id: "item_3",
        phrase: "We should do this again sometime.",
        literalMeaning: "I enjoyed this and want to repeat it.",
        actualMeaning: "I am being polite. I might never call you again.",
        dangerLevel: "🤔 Low (Confusing)",
        survivalTip: "Sometime = Never. If they say 'Next Tuesday', it's real. If it's 'Sometime', don't hold your breath.",
    },
    {
        id: "item_4",
        phrase: "You're too good for me.",
        literalMeaning: "My self-esteem is low and you are superior.",
        actualMeaning: "I want to break up (or not commit) without looking like the bad guy.",
        dangerLevel: "🚩 Red Flag",
        survivalTip: "Agree with them. Say 'You're right, I am.' and walk away. They are telling you they will disappoint you.",
    },
    {
        id: "item_5",
        phrase: "I'm just focusing on my career right now.",
        literalMeaning: "I am very ambitious and busy with work.",
        actualMeaning: "I have time for dating, just not with you.",
        dangerLevel: "📉 Rejection",
        survivalTip: "Do not wait for them to be 'less busy'. Respect the rejection and move on.",
    },
    {
        id: "item_6",
        phrase: "Let's play it by ear.",
        literalMeaning: "We will decide plans based on how we feel later.",
        actualMeaning: "You are my backup plan. If nothing better comes up, I'll see you.",
        dangerLevel: "⏳ Flake Risk",
        survivalTip: "Don't leave your schedule open. Make other plans. If they confirm last minute, tell them you're busy.",
    }
  ]
};
