import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const healthAndFeelings: Script = {
  id: "everyday-health-feelings",
  title: "Calling in Sick",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Communicating burnout, illness, and the 'Sunday Scaries' without oversharing.",
  imageUrl: "/images/scenarios/calling_in_sick_3d.png",
  mode: "cloze",

  culturalNote: {
    title: "The 'Mental Health Day'",
    content: "It's becoming acceptable to take a sick day for mental exhaustion, not just flu. You don't need to give details. 'I'm not feeling well' covers everything from vomiting to 'I cannot deal with people today'."
  },

  quizItems: [
    {
      question: "You have a cold. Your boss asks for details. What do you provide?",
      options: [
        "A photo of your tissue.",
        "A detailed description of your mucus.",
        "Just say 'I have a bad head cold and need rest'.",
        "Nothing."
      ],
      correctIndex: 2,
      explanation: "Keep it vague. Nobody wants the gross details."
    },
    {
      question: "It is Sunday night and you dread Monday. This is called:",
      options: [
        "The Sunday Scaries.",
        "The Weekend End.",
        "Monday Fear.",
        "Job Hate."
      ],
      correctIndex: 0,
      explanation: "'The Sunday Scaries' is the popular term for pre-work week anxiety."
    },
    {
      question: "You are burnt out. A colleague asks if you can take on a new project. You say:",
      options: [
        "No.",
        "I'd love to, but I'm at capacity right now.",
        "I am dead inside.",
        "Sure! (Lie)."
      ],
      correctIndex: 1,
      explanation: "'At capacity' is the professional way to say 'I will explode if you give me one more thing'."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Sick Text",
      scenario: "Messaging your boss",
      keywords: [
        { word: "Make it", definition: "Attend" },
        { word: "Under the weather", definition: "Sick" }
      ],
      badResponse: {
          text: "I am vomiting.",
          why: "Gross. Too much info."
      },
      goodResponse: {
          text: "I won't be able to [make it] in today. I'm feeling a bit [under the weather].",
          why: "'Under the weather' is the perfect professional idiom for 'sick'."
      }
    },
    {
      id: "s2",
      en: "The Burnout Signal",
      scenario: "Admitting you are tired",
      keywords: [
        { word: "Fried", definition: "Burned out/Exhausted" },
        { word: "Brain", definition: "Mind" }
      ],
      goodResponse: {
          text: "Honestly, my [brain] is [fried]. It's been a long week.",
          why: "Colloquial way to say you are mentally exhausted."
      }
    },
    {
      id: "s3",
      en: "The Decline",
      scenario: "Refusing plans because you are tired",
      keywords: [
        { word: "Low battery", definition: "No energy" },
        { word: "Pass", definition: "Decline" }
      ],
      badResponse: {
          text: "No I don't want to go.",
          why: "Harsh."
      },
      goodResponse: {
          text: "I'm running on [low battery] tonight, so I'll take a [pass]. Next time?",
          why: "Tech metaphor ('low battery') is universally understood."
      }
    },
    {
      id: "s4",
      en: "The Recovery",
      scenario: "Returning to work after sickness",
      keywords: [
        { word: "Mend", definition: "Healing" },
        { word: "Alive", definition: "Living" }
      ],
      goodResponse: {
          text: "I'm on the [mend], thanks! Finally feeling [alive] again.",
          why: "Positive spin on returning to health."
      }
    },
    {
      id: "s5",
      en: "The Stress Check",
      scenario: "Friend asks how you are",
      keywords: [
        { word: "Swamped", definition: "Very busy" },
        { word: "Hanging in", definition: "Surviving" }
      ],
      goodResponse: {
          text: "We're completely [swamped] at work, but I'm [hanging in] there.",
          why: "'Hanging in there' implies struggle but resilience."
      }
    }
  ]
};
