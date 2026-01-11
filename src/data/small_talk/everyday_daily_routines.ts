import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const dailyRoutines: Script = {
  id: "everyday-daily-routines",
  title: "The Morning Rush",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Battling the snooze button, missing keys, and coffee dependency.",
  imageUrl: "/images/scenarios/morning_rush_3d.png",

  culturalNote: {
    title: "The 10-Minute Lie",
    content: "When someone says 'I'm 5 minutes away', they usually haven't left the house. In casual culture, being 5-10 minutes late is often forgiven, but 'on time' basically means '5 minutes late'."
  },

  quizItems: [
    {
      question: "You hit snooze 3 times and are late. You text your boss:",
      options: [
        "I quit.",
        "My alarm is broken.",
        "Running a few minutes behind! See you shortly.",
        "I am asleep."
      ],
      correctIndex: 2,
      explanation: "Keep it brief. 'Running behind' implies you are moving, even if you are panic-eating toast."
    },
    {
      question: "Someone asks 'Are you a morning person?'. You are not. You say:",
      options: [
        "No.",
        "I speak only after 10 AM.",
        "I hate the sun.",
        "Yes (Lie)."
      ],
      correctIndex: 1,
      explanation: "A humorous exaggeration ('I speak after 10 AM') is a relatable way to set boundaries."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Alarm Struggle",
      scenario: "Waking up difficultly",
      keywords: [
        { word: "Snooze", definition: "Delay alarm" },
        { word: "Zombie", definition: "Half-dead/tired" }
      ],
      badResponse: {
          text: "I am tired.",
          why: "Boring."
      },
      goodResponse: {
          text: "I hit [snooze] four times. I'm basically a functioning [zombie] right now.",
          why: "Vivid imagery ('Zombie') is funnier than just 'tired'."
      }
    },
    {
      id: "s2",
      en: "The Coffee Need",
      scenario: "Before you have gathered energy",
      keywords: [
        { word: "Human", definition: "A person" },
        { word: "System", definition: "Body/Brain" }
      ],
      goodResponse: {
          text: "Don't ask me hard questions yet. I need coffee to feel [human] again.",
          why: "Relatable hyperbolic statement."
      }
    },
    {
      id: "s3",
      en: "The Lost Items",
      scenario: "You can't find your things",
      keywords: [
        { word: "Keys", definition: "Unlocker" },
        { word: "Disappeared", definition: "Vanished" }
      ],
      badResponse: {
          text: "I lost my keys.",
          why: "Basic."
      },
      goodResponse: {
          text: "I swear my [keys] just [disappeared] into another dimension. They were right here!",
          why: "Blaming 'another dimension' reduces the stress of being disorganized."
      }
    },
    {
      id: "s4",
      en: "The Traffic Check",
      scenario: "Checking navigation app",
      keywords: [
        { word: "Red", definition: "Traffic jam color" },
        { word: "Commute", definition: "Journey to work" }
      ],
      goodResponse: {
          text: "Ugh, the map is all [red]. This [commute] is going to be painful.",
          why: "Shared suffering about traffic builds connection."
      }
    },
    {
      id: "s5",
      en: "The Arrival",
      scenario: "Finally getting to work/school",
      keywords: [
        { word: "Made it", definition: "Arrived" },
        { word: "Piece", definition: "Whole" }
      ],
      goodResponse: {
          text: "Well, we [made it] in one [piece]. Let's do this.",
          why: "Positive affirmation to start the day."
      }
    }
  ]
};
