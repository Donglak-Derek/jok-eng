import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theSalaryQuestion: Script = {
  id: "the_salary_question",
  title: "The Salary Question",
  type: "decoder",
  section: "Social Emergencies",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Navigating polite (and rude) ways to talk about money.",
  imageUrl: "/images/scenarios/salary_question.png",
  decoderItems: [
    {
      id: "salary-1",
      phrase: "So, is the pay good?",
      literalMeaning: "Is the compensation adequate?",
      actualMeaning: "I want to know if you make more money than me.",
      dangerLevel: "Medium - Comparison Trap",
      survivalTip: "Give a vague answer: 'It pays the bills!' or 'I can't complain.'",
      conversation: {
         speakerA: "Friend",
         speakerB: "You",
         textA: "Congrats on the new job! Is the pay good?",
         textB: "It's competitive. I'm happy with it.",
         contextNote: "Use corporate buzzwords like 'competitive' to avoid giving a number."
      }
    },
    {
      id: "salary-2",
      phrase: "I'm broke until payday.",
      literalMeaning: "I have no cash right now.",
      actualMeaning: "Please pay for my dinner, but don't make me ask directly.",
      dangerLevel: "High - The Mooch",
      survivalTip: "In Korea/Asia, friends often take turns paying. If they never take a turn, stop inviting them.",
      conversation: {
         speakerA: "Friend",
         speakerB: "You",
         textA: "Ugh, I'm so broke until Friday.",
         textB: "Let's go somewhere cheap then, or just hang out at the park.",
         contextNote: "Don't offer to pay unless you genuinely want to. Suggest a free activity instead."
      }
    },
    {
      id: "salary-3",
      phrase: "Rent is so expensive these days.",
      literalMeaning: "Housing costs are high.",
      actualMeaning: "I am fishing for information about how much YOUR rent is.",
      dangerLevel: "Low - Nosy Neighbor",
      survivalTip: "Agree with the general sentiment without revealing your own costs.",
      conversation: {
         speakerA: "Acquaintance",
         speakerB: "You",
         textA: "Rent is crazy! Your building looks fancy, must be pricey.",
         textB: "Yeah, the whole city is getting expensive!",
         contextNote: "Deflect the personal question back to the general market."
      }
    },
    {
      id: "salary-4",
      phrase: "We should go to [Expensive Place], it's on me!",
      literalMeaning: "I will pay for us.",
      actualMeaning: "I just got a bonus/raise and I want to show off.",
      dangerLevel: "Low - The Flex",
      survivalTip: "Enjoy the meal! Just say thank you.",
      conversation: {
         speakerA: "Friend",
         speakerB: "You",
         textA: "Let's go to the steakhouse tonight. My treat.",
         textB: "Wow, are we celebrating something?",
         contextNote: "If someone insists on paying to celebrate, let them. It's their moment."
      }
    },
    {
      id: "salary-5",
      phrase: "How much did that cost?",
      literalMeaning: "What was the price?",
      actualMeaning: "I am judging your spending habits.",
      dangerLevel: "Medium - Pocket Watcher",
      survivalTip: "Say: 'I got a great deal on it' and change the subject.",
      conversation: {
         speakerA: "Relative",
         speakerB: "You",
         textA: "Nice watch. How much did that cost?",
         textB: "Too much! But I love it.",
         contextNote: "You strictly do not have to tell people what you spend."
      }
    }
  ],
  summaryPoints: [
      "Money talk is sensitive. Vague answers are your best shield.",
      "Don't let 'broke' friends guilt you into paying every time.",
      "You never owe anyone a specific number."
  ]
};
