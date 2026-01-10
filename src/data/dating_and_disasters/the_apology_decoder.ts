import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theApologyDecoder: Script = {
  id: "the_apology_decoder",
  title: "The Apology Decoder",
  type: "decoder",
  section: "The Dating Minefield",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Translating 'fake' apologies into the truth.",
  imageUrl: "/images/scenarios/apology_decoder.png",
  decoderItems: [
    {
      id: "sorry-1",
      phrase: "I'm sorry you feel that way.",
      literalMeaning: "I regret your emotions.",
      actualMeaning: "I am not sorry at all. You are being dramatic.",
      dangerLevel: "High - Gaslighting",
      survivalTip: "Do not accept this. It's a non-apology.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Look, I'm sorry you feel hurt.",
         textB: "But are you sorry for what you did?",
         contextNote: "Notice they apologized for YOUR feelings, not THEIR actions."
      }
    },
    {
      id: "sorry-2",
      phrase: "It's not you, it's me.",
      literalMeaning: "The problem is internal to me.",
      actualMeaning: "It is definitely you. I just want to leave without a fight.",
      dangerLevel: "Medium - Breakup Cliché",
      survivalTip: "Accept the breakup and move on. Don't ask for details.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "It's not you, it's me. I need space.",
         textB: "Okay. Goodbye.",
         contextNote: "This phrase is the universal exit code. There is no negotiating."
      }
    },
    {
      id: "sorry-3",
      phrase: "I was just joking!",
      literalMeaning: "It was intended as humor.",
      actualMeaning: "I said something mean, but you got offended, so now I'm backtracking.",
      dangerLevel: "Critical - Jerk Alert",
      survivalTip: "If the 'joke' hurt you, it wasn't a joke. It was an insult.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Wow, you gained weight! ... I was just joking!",
         textB: "Could you explain the punchline?",
         contextNote: "Asking them to explain the joke usually makes them realize how rude it was."
      }
    },
    {
      id: "sorry-4",
      phrase: "I'm sorry, I've just been so crazy busy.",
      literalMeaning: "My schedule is full.",
      actualMeaning: "You were not high enough on my priority list to send a 10-second text.",
      dangerLevel: "Medium - The Busy Bee",
      survivalTip: "Stop texting them. If they want to see you, they will find time.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Sorry I ghosted! Work has been insane.",
         textB: "No worries.",
         contextNote: "Everyone is busy. Obama found time to date Michelle while running for Senate."
      }
    },
    {
      id: "sorry-5",
      phrase: "I didn't mean to hurt you.",
      literalMeaning: "My intent was innocent.",
      actualMeaning: "I definitely did the thing that hurt you, I just didn't want the consequences.",
      dangerLevel: "High - The Accidental Villain",
      survivalTip: "Intent doesn't erase impact. Ask how they plan to fix it.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "I didn't mean to make you cry!",
         textB: "But you did. So what now?",
         contextNote: "Focus on the outcome, not their 'good intentions'."
      }
    }
  ],
  summaryPoints: [
      "An apology without change is just manipulation.",
      "'It's not you, it's me' means it's over.",
      "Jokes shouldn't hurt."
  ]
};
