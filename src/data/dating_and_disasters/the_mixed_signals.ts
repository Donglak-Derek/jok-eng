import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theMixedSignals: Script = {
  id: "the_mixed_signals",
  title: "Mixed Signals Decoder",
  type: "decoder",
  section: "The Dating Minefield",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Deciphering vague texts and confusing status updates.",
  imageUrl: "/images/scenarios/mixed_signals.png",
  decoderItems: [
    {
      id: "mixed-1",
      phrase: "I'm not looking for anything serious right now.",
      literalMeaning: "I want a casual connection.",
      actualMeaning: "I want to date you, but I also want to date other people.",
      dangerLevel: "Medium - Casual Only",
      survivalTip: "Believe them. Do not try to change their mind.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Just so you know, I'm not looking for anything serious.",
         textB: "Cool, me neither.",
         contextNote: "If you want serious, leave now. If you want fun, stay."
      }
    },
    {
      id: "mixed-2",
      phrase: "Let's just see where things go.",
      literalMeaning: "Let's observe the future.",
      actualMeaning: "I have no plan and I am making zero promises.",
      dangerLevel: "Low - Go with the Flow",
      survivalTip: "Enjoy the ride, but don't delete your dating apps yet.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "I don't like labels. Let's just see where things go.",
         textB: "Sure, no pressure.",
         contextNote: "This usually means they are keeping their options open."
      }
    },
    {
      id: "mixed-3",
      phrase: "I'm really bad at texting.",
      literalMeaning: "I lack texting skills.",
      actualMeaning: "You are not a priority, so I reply when I'm bored.",
      dangerLevel: "High - Low Interest",
      survivalTip: "Match their energy. Stop texting them first.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Sorry about the late reply, I'm bad at texting.",
         textB: "No worries!",
         contextNote: "People make time for people they like. 'Bad at texting' is a myth."
      }
    },
    {
      id: "mixed-4",
      phrase: "I'm really focusing on my career right now.",
      literalMeaning: "Work is my priority.",
      actualMeaning: "I have no space for your emotional needs, but I might call you at 2 AM.",
      dangerLevel: "Medium - The CEO",
      survivalTip: "Let them date their job. You find someone who has time.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "My startup is just consuming my life.",
         textB: "Sounds successful! Good luck.",
         contextNote: "If they are 'too busy' for coffee, they are too busy for a relationship."
      }
    },
    {
      id: "mixed-5",
      phrase: "I just got out of a long relationship.",
      literalMeaning: "I am recently single.",
      actualMeaning: "I am emotionally unavailable and will likely use you as a therapist or a rebound.",
      dangerLevel: "High - The Rebounder",
      survivalTip: "Proceed with extreme caution. You are likely a temporary fix.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "My ex and I only broke up two weeks ago.",
         textB: "Oh wow. That's fresh.",
         contextNote: "You do not want to be the first pancake."
      }
    }
  ],
  summaryPoints: [
      "Believe people when they say they aren't looking for serious.",
      "'See where things go' implies a lack of commitment.",
      "If they wanted to text you, they would."
  ]
};
