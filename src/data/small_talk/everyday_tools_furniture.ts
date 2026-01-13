import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const toolsAndFurniture: Script = {
  id: "everyday-tools-furniture",
  title: "The DIY Disaster",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Surviving flat-pack furniture assembly without a divorce.",
  imageUrl: "/images/scenarios/diy_disaster_3d.png",
  mode: "cloze",

  culturalInsights: {
    title: "The 'Extra Screw' Panic",
    content: "There is a universal law of furniture assembly: You will always have one screw left over. You have two choices: Panic and verify every step, or pretend it was a 'spare' and hope the chair doesn't collapse."
  },

  quizItems: [
    {
      question: "You are building a bookshelf. It looks crooked. You say:",
      options: [
        "It's ruined.",
        "It adds character.",
        "Burn it.",
        "The floor is uneven."
      ],
      correctIndex: 1,
      explanation: "'It adds character' is the phrase used to describe any mistake in DIY projects."
    },
    {
      question: "You dropped a tiny screw on the carpet. What do you do?",
      options: [
        "Use a magnet.",
        "Step on it later with bare feet.",
        "Buy a new house.",
        "Scream."
      ],
      correctIndex: 1,
      explanation: "Sadly, stepping on it later is the most common way to find it."
    },
    {
      question: "You have one screw left over after building a table. You say:",
      options: [
        "It's a spare!",
        "The table will collapse.",
        "I am a failure.",
        "Call the manufacturer."
      ],
      correctIndex: 0,
      explanation: "Optimistic denial ('It's a spare') is the only way to maintain sanity."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Instructions Blame",
      scenario: "You are confused by the diagram",
      keywords: [
        { word: "Sense", definition: "Logic" },
        { word: "Upside down", definition: "Inverted" }
      ],
      badResponse: {
          text: "I am stupid.",
          why: "Don't blame yourself."
      },
      goodResponse: {
          text: "These instructions make zero [sense]. Are we holding the paper [upside down]?",
          why: "Always blame the manual, not your brain."
      }
    },
    {
      id: "s2",
      en: "The Missing Tool",
      scenario: "You need a screwdriver",
      keywords: [
        { word: "Phillips", definition: "Cross-head screw" },
        { word: "Flathead", definition: "Line-head screw" }
      ],
      goodResponse: {
          text: "Do we have a [Phillips] head screwdriver? This one is a [flathead] and it's stripping the screw.",
          why: "Knowing your screwdriver types makes you look pro."
      }
    },
    {
      id: "s3",
      en: "The Heavy Lift",
      scenario: "Moving the box",
      keywords: [
        { word: "Back", definition: "Spine" },
        { word: "Legs", definition: "Lower limbs" }
      ],
      goodResponse: {
          text: "Lift with your [legs], not your [back]! This thing weighs a ton.",
          why: "Classic dad advice for heavy lifting."
      }
    },
    {
      id: "s4",
      en: "The Mystery part",
      scenario: "You have a piece left over",
      keywords: [
        { word: "Left over", definition: "Remaining" },
        { word: "Spare", definition: "Extra backup" }
      ],
      badResponse: {
          text: "Oh no. We failed.",
          why: "Panic."
      },
      goodResponse: {
          text: "Why is there one screw [left over]? Let's just assume it's a [spare]...",
          why: "Optimistic denial is key to finishing."
      }
    },
    {
      id: "s5",
      en: "The Finished Product",
      scenario: "Looking at your creation",
      keywords: [
        { word: "Wobbly", definition: "Unsteady" },
        { word: "Masterpiece", definition: "Great work" }
      ],
      goodResponse: {
          text: "It's a little [wobbly], but it's a [masterpiece]. Good job team.",
          why: "Accepting imperfection is the final stage of DIY."
      }
    }
  ]
};
