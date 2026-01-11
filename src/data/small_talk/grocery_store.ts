import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const groceryStore: Script = {
  id: "everyday-grocery-store",
  title: "The Grocery Gauntlet",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Surviving the aisles, judging carts, and the checkout interrogation.",
  imageUrl: "/images/scenarios/small_talk_generic.png", // Will update later
  
  culturalNote: {
    title: "The Checkout Chit-Chat",
    content: "In many Western countries (especially the US), cashiers are expected to be chatted to. Silence is seen as rude. They will ask 'Did you find everything okay?' or 'Any big plans for the weekend?'. You don't need a real answer—just be friendly!"
  },

  quizItems: [
    {
      question: "The cashier asks 'Did you find everything okay?'. You couldn't find pickles. What do you say?",
      options: [
        "Scream 'NO! WHERE ARE THE PICKLES?'",
        "Say 'Yes, thanks' because you just want to go home.",
        "Launch a formal complaint.",
        "Ignore them completely."
      ],
      correctIndex: 1,
      explanation: "Unless it's a genuine emergency, most people just say 'Yes, thanks' to keep the line moving. It's a ritual, not an investigation."
    },
    {
      question: "You want to get past someone blocking the aisle. You say:",
      options: [
        "Move it!",
        "Just sneaking past ya!",
        "Honk loudly.",
        "Touch their shoulder silently."
      ],
      correctIndex: 1,
      explanation: "'Just sneaking past' or 'Ope, let me squeeze by' is the polite, non-confrontational way to ask for space."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Cursed Cart",
      scenario: "Picking a shopping cart",
      keywords: [
        { word: "Wobbly", definition: "Unsteady, moving side to side" },
        { word: "Drifting", definition: "Moving passively/aimlessly" }
      ],
      badResponse: {
          text: "This cart is broken. I will kick it.",
          why: " Aggressive."
      },
      goodResponse: {
          text: "Of course I picked the one with the [wobbly] wheel that keeps [drifting] into the shelf.",
          why: "Relatable internal monologue."
      }
    },
    {
      id: "s2",
      en: "The Aisle Block",
      scenario: "Someone is blocking your way",
      keywords: [
        { word: "Sneak past", definition: "Move quietly around" },
        { word: "Ope", definition: "Midwestern sound of accidental bump" }
      ],
      badResponse: {
          text: "Move.",
          why: "Rude."
      },
      goodResponse: {
          text: "Excuse me, I'm just going to [sneak past] you there to grab the milk.",
          why: "The classic 'polite squeeze' maneuver."
      }
    },
    {
      id: "s3",
      en: "The Free Sample Trap",
      scenario: "Taking a sample you don't intend to buy",
      keywords: [
        { word: "Guilt", definition: "Feeling of doing wrong" },
        { word: "Pretend", definition: "Act as if true" }
      ],
      goodResponse: {
          text: "Mmm, delicious! I'll definitely... [think about] buying this. (Walks away fast)",
          why: "We all do it. Eating the cheese and running away."
      }
    },
    {
      id: "s4",
      en: "The Checkout Interaction",
      scenario: "Cashier asks: 'Find everything okay?'",
      keywords: [
        { word: "Autopilot", definition: "Doing without thinking" },
        { word: "Small talk", definition: "Polite conversation" }
      ],
      badResponse: {
          text: "No. I am sad.",
          why: "Too much information (TMI) for a cashier."
      },
      goodResponse: {
          text: "Yep, all good thanks! How's your [shift] going?",
          why: "Polite, standard, returns the question."
      }
    },
    {
      id: "s5",
      en: "The Card Reader Panic",
      scenario: "The machine beeps loudly at you",
      keywords: [
        { word: "Chip", definition: "Electronic part of card" },
        { word: "Remove", definition: "Take out" }
      ],
      goodResponse: {
          text: "Why is the 'Remove Card' noise so [aggressive]? I'm not stealing it!",
          why: "Why do they always sound like an alarm?"
      }
    }
  ]
};
