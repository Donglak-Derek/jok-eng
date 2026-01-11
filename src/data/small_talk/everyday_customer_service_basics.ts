import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const customerServiceBasics: Script = {
  id: "everyday-customer-service-basics",
  title: "The Salon Chair",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Surviving 30 minutes of forced eye contact and reflection.",
  imageUrl: "/images/scenarios/salon_awkwardness_3d.png",

  culturalNote: {
    title: "The 'Mirror Talk' Rule",
    content: "Hairdressers and barbers are unofficial therapists. It's polite to answer their questions, but if you close your eyes, most will take the hint that you want a 'Silent Cut'. Also, always tip 15-20% in the US, even if you hate it."
  },

  quizItems: [
    {
      question: "The barber asks 'So, any plans for the weekend?'. You have no plans. You say:",
      options: [
        "I have no friends.",
        "Just taking it easy, catching up on sleep. You?",
        "Why do you ask?",
        "Silence."
      ],
      correctIndex: 1,
      explanation: "'Taking it easy' is the perfect code for 'I am doing nothing and I love it'. It sounds positive."
    },
    {
      question: "They show you the back of your head with a mirror. You hate it. You say:",
      options: [
        "I refuse to pay.",
        "It looks great, thanks!",
        "Ew.",
        "Cry."
      ],
      correctIndex: 1,
      explanation: "Unless it is a disaster that can be fixed, social contract dictates you lie and say 'Great, thanks!' then cry in the car."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Vague Request",
      scenario: "Describing what you want",
      keywords: [
        { word: "Trim", definition: "Cut a small amount" },
        { word: "Clean up", definition: "Make neat" }
      ],
      badResponse: {
          text: "Make it shorter.",
          why: "Too vague. You will end up bald."
      },
      goodResponse: {
          text: "Just a [trim] on top, and can we [clean up] the sides? Keep the length.",
          why: "Specific but uses standard terminology."
      }
    },
    {
      id: "s2",
      en: "The Awkward Silence",
      scenario: "The chatting dies down",
      keywords: [
        { word: "Zone out", definition: "Stop focusing" },
        { word: "Relax", definition: "Rest" }
      ],
      goodResponse: {
          text: "I'm just going to close my eyes and [relax] for a bit while you work.",
          why: "Polite way to initiate the 'Silent Cut'."
      }
    },
    {
      id: "s3",
      en: "The Temperature Check",
      scenario: "Water is boiling hot",
      keywords: [
        { word: "Scalding", definition: "Burning hot" },
        { word: "Bit", definition: "Small amount" }
      ],
      badResponse: {
          text: "AHHH! IT BURNS!",
          why: "Dramatic."
      },
      goodResponse: {
          text: "It's a little hot—could we turn it down just a [smidge]?",
          why: "'Smidge' softens the complaint."
      }
    },
    {
      id: "s4",
      en: "The Big Reveal",
      scenario: "They show you the mirror",
      keywords: [
        { word: "Fresh", definition: "New/Clean" },
        { word: "Lighter", definition: "Less weight" }
      ],
      goodResponse: {
          text: "That looks [fresh]! Feels much [lighter]. Thanks.",
          why: "Generic positive feedback suitable for any haircut."
      }
    },
    {
      id: "s5",
      en: "The Tip Panic",
      scenario: "Paying at the counter",
      keywords: [
        { word: "Appreciate", definition: "Value" },
        { word: "Card", definition: "Payment method" }
      ],
      goodResponse: {
          text: "I really [appreciate] you fitting me in. Can I leave the tip on the card?",
          why: "Clarifies payment method politely."
      }
    }
  ]
};
