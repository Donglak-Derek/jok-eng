import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const netflixTrap: Script = {
  id: "date_03",
  title: "The Netflix Trap",
  section: "The Dating Minefield",
  type: "decoder",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Dating in English is about subtext. This helps you read between the lines.", /* Context summary */
  sentences: [], // Empty because we use decoderItems
    imageUrl: "/images/scenarios/netflix_trap.png",
  decoderItems: [
    {
      id: "item_1",
      phrase: "Do you want to come over and [watch a movie]?",
      literalMeaning: "Watching a film on a television screen.",
      actualMeaning: "Netflix and Chill (Hooking up).",
      dangerLevel: "🔥 High",
      survivalTip: "If you go, assume intimacy is expected. If you just want to watch a movie, suggest a cinema instead.",
      keywords: [
          { word: "watch a movie", definition: "Code for 'Netflix and Chill'; assumes intimacy." }
      ]
    },
    {
       id: "item_2",
       phrase: "I'm [not looking for anything serious] right now.",
       literalMeaning: "I am busy and cannot commit to a relationship.",
       actualMeaning: "I want to date you casually, but I will never be your boyfriend/girlfriend.",
       dangerLevel: "⚠️ Medium",
       survivalTip: "Believe them. Do not think you can change their mind. Run if you want marriage.",
       keywords: [
          { word: "not looking for anything serious", definition: "Believe them; they are not seeking a commitment." }
       ]
    },
    {
        id: "item_3",
        phrase: "We should do this again [sometime].",
        literalMeaning: "I enjoyed this and want to repeat it.",
        actualMeaning: "I am being polite. I might never call you again.",
        dangerLevel: "🤔 Low (Confusing)",
        survivalTip: "Sometime = Never. If they say 'Next Tuesday', it's real. If it's 'Sometime', don't hold your breath.",
        keywords: [
          { word: "sometime", definition: "Indefinite future; polite for 'probably never'." }
        ]
    },
    {
        id: "item_4",
        phrase: "You're [too good for me].",
        literalMeaning: "My self-esteem is low and you are superior.",
        actualMeaning: "I want to break up (or not commit) without looking like the bad guy.",
        dangerLevel: "🚩 Red Flag",
        survivalTip: "Agree with them. Say 'You're right, I am.' and walk away. They are telling you they will disappoint you.",
        keywords: [
          { word: "too good for me", definition: "Self-deprecating breakup tactic to avoid guilt." }
        ]
    },
    {
        id: "item_5",
        phrase: "I'm just [focusing on my career] right now.",
        literalMeaning: "I am very ambitious and busy with work.",
        actualMeaning: "I have time for dating, just not with you.",
        dangerLevel: "📉 Rejection",
        survivalTip: "Do not wait for them to be 'less busy'. Respect the rejection and move on.",
        keywords: [
          { word: "focusing on my career", definition: "A respectable-sounding excuse for 'I'm not interested'." }
        ]
    },
    {
        id: "item_6",
        phrase: "Let's [play it by ear].",
        literalMeaning: "We will decide plans based on how we feel later.",
        actualMeaning: "You are my backup plan. If nothing better comes up, I'll see you.",
        dangerLevel: "⏳ Flake Risk",
        survivalTip: "Don't leave your schedule open. Make other plans. If they confirm last minute, tell them you're busy.",
        keywords: [
           { word: "play it by ear", definition: "Keeping options open; typically means you are Plan B." }
        ]
    }
  ],
  quizItems: [
    {
      question: "What does 'come over and watch a movie' usually imply?",
      options: ["A film analysis discussion", "Physical intimacy (Netflix and Chill)", "They have a new TV", "They are lonely"],
      correctIndex: 1,
      explanation: "In modern dating, 'watching a movie' at home early in dating is code for hooking up."
    },
    {
      question: "If they say 'I'm not looking for anything serious', you should:",
      options: ["Try to change their mind", "Wait for them", "Believe them immediately", "Ask why"],
      correctIndex: 2,
      explanation: "When someone tells you who they are, believe them the first time."
    },
    {
      question: "Why is 'You're too good for me' a red flag?",
      options: ["It's a compliment", "It means they are rich", "They are setting low expectations", "They are truly humble"],
      correctIndex: 2,
      explanation: "They are preemptively excusing their future bad behavior by claiming you deserve better."
    }
  ]
};
