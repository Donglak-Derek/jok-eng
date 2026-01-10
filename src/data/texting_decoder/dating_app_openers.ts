import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const datingAppOpeners: Script = {
  id: "dating_app_openers",
  title: "Dating App Decoding",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Decode common dating app opening lines.",
  type: "decoder",

  // Engagement Data
  imageUrl: "/images/categories/dating.svg",
  summaryPoints: [
     "Low effort = Low interest. 'Hey' usually means they are mass-messaging.",
     "Overly specific compliments (about your body) are often red flags.",
     "Humor is the best filter. If they don't get your joke, move on."
  ],

  decoderItems: [
    {
      id: "date-1",
      phrase: "Hey",
      literalMeaning: "Hello",
      actualMeaning: "I am boring, lazy, or sending this to 50 people.",
      dangerLevel: "Medium - Boring",
      survivalTip: "Reply with a specific question about their profile to see if they're real.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Hey",
         textB: "Hey...",
         contextNote: "Notice how the conversation died instantly? This is why 'Hey' is a trap."
      }
    },
    {
      id: "date-2",
      phrase: "You smile with your eyes",
      literalMeaning: "Your eyes form a crescent shape when you smile.",
      actualMeaning: "I read a pickup artist book from 2005.",
      dangerLevel: "High - Cringe",
      survivalTip: "Ignore the compliment, ask what they do for work."
    },
    {
      id: "date-3",
      phrase: "I'm fluent in sarcasm",
      literalMeaning: "I speak ironically.",
      actualMeaning: "I will be mean to you and call it a joke.",
      dangerLevel: "Critical - Run",
      survivalTip: "Test them early. If they get offended easily, unmatch."
    },
    {
      id: "date-4",
      phrase: "School of Hard Knocks",
      literalMeaning: "Life taught me lessons.",
      actualMeaning: "I am unemployed and angry about it.",
      dangerLevel: "High - Red Flag",
      survivalTip: "Ask about their goals. If they just complain, exit."
    }
  ]
};
