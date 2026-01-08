import { Script } from "@/types";

export const passiveAggressive: Script = {
  id: "texting-passive-aggressive",
  title: "Passive Aggressive Decoder",
  categorySlug: "texting_decoder",
  categoryName: "Texting Decoder",
  cleanedEnglish: "Are they mad or just typing fast?",
  summaryPoints: [
    "Punctuation is volume. K. is shouting silence.",
    "Brevity changes meaning. 'Fine' is rarely fine.",
    "Ellipses (...) imply something is left unsaid—usually judgment."
  ],
    imageUrl: "/images/scenarios/texting_generic.png",
  decoderItems: [
    {
      id: "pass-1",
      phrase: "K.",
      literalMeaning: "Okay / Acknowledged.",
      actualMeaning: "I am annoyed and I want this conversation to end immediately.",
      dangerLevel: "High - Run",
      survivalTip: "Do not double text. Give them space or call them if it's urgent."
    },
    {
      id: "pass-2",
      phrase: "Fine.",
      literalMeaning: "I agree / It is acceptable.",
      actualMeaning: "I don't like it, but I'm done arguing. proceeding will build resentment.",
      dangerLevel: "Medium - Caution",
      survivalTip: "Ask 'You don't sound fully on board—what's your hesitation?' to drain the resentment."
    },
    {
      id: "pass-3",
      phrase: "Funny...",
      literalMeaning: "That is humorous.",
      actualMeaning: "That is suspicious, offensive, or I think you're lying.",
      dangerLevel: "High - Red Flag",
      survivalTip: "Stop and clarify. 'Did that come across wrong?'"
    },
    {
      id: "pass-4",
      phrase: "??",
      literalMeaning: "I have a question.",
      actualMeaning: "What the hell are you talking about? / Are you stupid?",
      dangerLevel: "Medium - Aggressive",
      survivalTip: "Assume clarity issues, not malice. Rephrase your last message simply."
    }
  ]
};
