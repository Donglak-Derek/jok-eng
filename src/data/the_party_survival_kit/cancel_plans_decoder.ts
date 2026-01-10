
import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theCancelPlansDecoder: Script = {
  id: "party-cancel-plans-decoder",
  title: "The Cancel Plans Decoder",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "boss_battles",
  cleanedEnglish: "How to bail on plans without losing friends.",
  imageUrl: "/images/scenarios/cancel_plans.png",
  difficulty: "Spicy 🌶️🌶️🌶️",
  type: "decoder",
  
  decoderItems: [
    {
      id: "d1",
      phrase: "I'm tentative for tonight.",
      literalMeaning: "I am not 100% sure I can come.",
      actualMeaning: "I am absolutely not coming, but I'm too scared to say no yet.",
      dangerLevel: "Caution ⚠️", // 50
      survivalTip: "Assume they aren't coming. Don't buy a ticket for them.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "Hey! Are you still coming to the dinner?",
        textB: "I'm tentative. Work is crazy right now.",
        contextNote: "Use 'tentative' to soften the blow of a likely cancellation."
      }
    },
    {
      id: "d2",
      phrase: "Let's play it by ear.",
      literalMeaning: "We will decide based on how we feel later.",
      actualMeaning: "I want to keep my options open in case something better comes up (or I just want to nap).",
      dangerLevel: "Caution ⚠️", // 50
      survivalTip: "Don't wait for them. Make your own plans.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "What time should we meet at the bar?",
        textB: "Let's play it by ear. I might be busy until late.",
        contextNote: "'Play it by ear' sounds spontaneous, but often causes scheduling chaos."
      }
    },
    {
      id: "d3",
      phrase: "I'm feeling a bit under the weather.",
      literalMeaning: "I am slightly sick.",
      actualMeaning: "I am physically fine, but socially exhausted. I need to recharge alone.",
      dangerLevel: "Safe ✅", // 15 (Socially acceptable lie)
      survivalTip: "Do NOT ask for details. Just wish them well and let them stay home.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "We're all heading to the club! You ready?",
        textB: "Ah, I'm feeling a bit under the weather actually.",
        contextNote: "This is the ultimate 'Get Out of Jail Free' card for introverts."
      }
    },
    {
      id: "d4",
      phrase: "Something came up.",
      literalMeaning: "An unexpected event occurred.",
      actualMeaning: "I forgot we had plans, or I double-booked myself.",
      dangerLevel: "Danger 🛑", // 90
      survivalTip: "This is often a weak excuse. If you use it, have a backup reason ready.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "You're 30 minutes late. Everything okay?",
        textB: "So sorry, something came up at the last minute.",
        contextNote: "Using vague excuses like 'something' usually makes people suspicious."
      }
    },
    {
      id: "d5",
      phrase: "Ideally, I'd love to go.",
      literalMeaning: "In a perfect world, I want to attend.",
      actualMeaning: "In this world, there is a 0% chance I am going.",
      dangerLevel: "Danger 🛑", // 90
      survivalTip: "The word 'ideally' is the kill switch. It separates desire from reality.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "It's your ex's birthday party. You have to come.",
        textB: "Ideally, I'd love to go and support him.",
        contextNote: "'Ideally' is a polite way of describing a fantasy world you don't live in."
      }
    },
  ],

  summaryPoints: [
    "Being 'tentative' usually means 'no'.",
    "'Playing it by ear' means they are waiting for a better offer.",
    "'Under the weather' is the polite code for social battery drain.",
    "'Something came up' is vague and suspicious.",
    "If they start a sentence with 'Ideally', they aren't coming."
  ],

  quizItems: [
    {
      question: "What does 'I'm tentative' usually mean?",
      options: ["I will definitely be there", "I am 50/50", "I am probably not coming", "I am lost"],
      correctIndex: 2,
      explanation: "It's a soft way of preparing you for a cancellation."
    },
    {
      question: "If someone says they are 'under the weather', what should you do?",
      options: ["Call an ambulance", "Demand proof", "Wish them well and leave them alone", "Go to their house"],
      correctIndex: 2,
      explanation: "It's the universally accepted code for 'I need to stay home', whether sick or just tired."
    },
    {
      question: "What is the danger of 'Let's play it by ear'?",
      options: ["They might hurt their ears", "You can't make firm plans", "It means they hate music", "It's very rude"],
      correctIndex: 1,
      explanation: "It leaves the plan undefined, so you might be left waiting."
    }
  ]
};
