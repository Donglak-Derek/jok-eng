import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theMenuDecoder: Script = {
  id: "the_menu_decoder",
  title: "The Menu Decoder",
  type: "decoder",
  section: "The Dating Minefield",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "What their order actually says about them (and you).",
  imageUrl: "/images/scenarios/menu_decoder.png",
  decoderItems: [
    {
      id: "menu-1",
      phrase: "I'll [just have water].",
      literalMeaning: "They are not thirsty for other beverages.",
      actualMeaning: "I am planning my escape and don't want to wait for a bill.",
      dangerLevel: "Medium - Flight Risk",
      survivalTip: "Ask if they're in a rush. If yes, don't order a 3-course meal.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "I'll just have water, thanks.",
         textB: "Oh, are you not hungry?",
         contextNote: "If they don't even order an appetizer, this date might be over in 20 minutes."
      },
      keywords: [
          { word: "just have water", definition: "A signal of low investment or a desire to leave quickly." }
      ]
    },
    {
      id: "menu-2",
      phrase: "What's the '[Market Price]'?",
      literalMeaning: "Asking the cost of a seasonal item.",
      actualMeaning: "I am either very rich or very worried about my credit card limit.",
      dangerLevel: "Low - Practical",
      survivalTip: "If they order it without asking the price, marry them (or run, they might be reckless).",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "I'll take the lobster. Market price.",
         textB: "Bold choice!",
         contextNote: "Confidence is key. Or financial irresponsibility. Hard to tell."
      },
      keywords: [
          { word: "Market Price", definition: "A variable price; asking reveals financial caution." }
      ]
    },
    {
      id: "menu-3",
      phrase: "I'm not hungry, I'll just have a [bite of yours].",
      literalMeaning: "I will not order food.",
      actualMeaning: "I will eat 50% of your fries and pretend it didn't happen.",
      dangerLevel: "High - Fry Thief",
      survivalTip: "Order extra fries. Protect your plate.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "I'm not hungry. I'll just steal a fry.",
         textB: "You can order your own, it's on me!",
         contextNote: "Always offer to buy them their own. It saves friendships."
      },
      keywords: [
          { word: "bite of yours", definition: "The 'Fry Thief' tactic; claims no hunger but eats your food." }
      ]
    },
    {
      id: "menu-4",
      phrase: "I'll have the garden salad, [dressing on the side].",
      literalMeaning: "I want a healthy, light meal.",
      actualMeaning: "I am judging your double-bacon cheeseburger with every fiber of my being.",
      dangerLevel: "High - The Health Police",
      survivalTip: "Do NOT offer them a fry. They will look at it like it's poison.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Just a salad for me. Are you sure you want all those carbs?",
         textB: "Yes. I love carbs.",
         contextNote: "If they comment on your food choices on date one, run."
      },
      keywords: [
          { word: "dressing on the side", definition: "A specific control request; usually implies strict diet or fussiness." }
      ]
    },
    {
      id: "menu-5",
      phrase: "Let's just order a bunch of things and [share].",
      literalMeaning: "I want to try many dishes.",
      actualMeaning: "I have control issues and want to curate your entire meal.",
      dangerLevel: "Medium - The Merger",
      survivalTip: "Pick one thing you strictly do NOT want to share to establish boundaries.",
      conversation: {
         speakerA: "Them",
         speakerB: "You",
         textA: "Let's get five appetizers and share everything!",
         textB: "Great, but I'm getting the steak for myself.",
         contextNote: "Sharing is caring, but forced sharing is controlling."
      },
      keywords: [
          { word: "share", definition: "Forced sharing can be a sign of poor boundary respect." }
      ]
    }
  ],
  quizItems: [
    {
      question: "What does ordering 'Just water' often signal on a first date?",
      options: ["Hydration focus", "Budget consciousness", "A planned quick escape", "Religious fasting"],
      correctIndex: 2,
      explanation: "If they don't order a drink or food, they are keeping the interaction low-investment so they can leave quickly."
    },
    {
      question: "If someone asks 'What's the Market Price?', they are likely...",
      options: ["A fisherman", "Worried about the cost", "Showing off", "Allergic to seafood"],
      correctIndex: 1,
      explanation: "It's a subtle way to check if they can afford the dish without looking cheap."
    },
    {
      question: "What is a 'Fry Thief'?",
      options: ["A person who steals raw potatoes", "Someone who orders no food but eats yours", "A restaurant burglar", "A fast food worker"],
      correctIndex: 1,
      explanation: "The Fry Thief claims they aren't hungry, then proceeds to eat half of your meal."
    }
  ],
  summaryPoints: [
      "Ordering water is a sign of a quick exit.",
      "The 'Fry Thief' is a real dating archetype.",
      "How they treat the waiter tells you everything."
  ]
};
