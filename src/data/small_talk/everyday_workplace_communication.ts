import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const workplaceCommunication: Script = {
  id: "everyday-workplace-communication",
  title: "The Water Cooler",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Surviving the coffee machine, dodging gossip, and looking busy.",
  imageUrl: "/images/scenarios/water_cooler_hiding_3d.png",

  culturalNote: {
    title: "Safe Topics vs. Danger Zones",
    content: "At work, stick to 'Safe Topics': The weekend, weather, sports, and TV shows. Avoid 'Danger Zones': Politics, religion, and who is getting fired. The goal of work small talk is to be friendly but neutral."
  },

  quizItems: [
    {
      question: "A coworker starts gossiping about the boss. What is the safest move?",
      options: [
        "Agree enthusiastically.",
        "Record the conversation.",
        "Say 'That sounds tough' and change the subject.",
        "Insult the boss too."
      ],
      correctIndex: 2,
      explanation: "Neutral deflection ('That sounds tough') protects you. Joining in makes you a co-conspirator."
    },
    {
      question: "It is Monday morning. You haven't had coffee. Someone asks 'How are you?'.",
      options: [
        "Scream.",
        "Ignore them.",
        "Say 'Ask me again after my second coffee' (with a smile).",
        "Explain your insomnia in detail."
      ],
      correctIndex: 2,
      explanation: "The 'Need Coffee' joke is a universal, acceptable way to say 'I am tired' without being negative."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Monday Morning Grunt",
      scenario: "Pre-coffee interaction",
      keywords: [
        { word: "Caffeine", definition: "Stimulant in coffee" },
        { word: "Loading", definition: "Starting up" }
      ],
      badResponse: {
          text: "Leave me alone.",
          why: "Too hostile."
      },
      goodResponse: {
          text: "Hey! I'm still [loading]... ask me again after the [caffeine] hits.",
          why: "Relatable humor diffuses the grumpiness."
      }
    },
    {
      id: "s2",
      en: "The Weekend Recap",
      scenario: "The inevitable 'How was your weekend?'",
      keywords: [
        { word: "Key", definition: "Low-key (relaxed)" },
        { word: "Recharge", definition: "Rest energy" }
      ],
      badResponse: {
          text: "I stared at the wall.",
          why: "A bit depressing."
      },
      goodResponse: {
          text: "It was pretty low-[key], actually. Just [recharged] the batteries. How about yours?",
          why: "Frame 'doing nothing' as 'recharging'. Sounds professional."
      }
    },
    {
      id: "s3",
      en: "The Gossip Deflection",
      scenario: "Someone tries to tell you drama",
      keywords: [
        { word: "Loop", definition: "In the know" },
        { word: "Focus", definition: "Concentrate" }
      ],
      badResponse: {
          text: "Tell me everything!",
          why: "Trap. Don't do it."
      },
      goodResponse: {
          text: "Oh really? I'm honestly so out of the [loop] lately, I've just been [focused] on this project.",
          why: "Claiming ignorance ('out of the loop') keeps your hands clean."
      }
    },
    {
      id: "s4",
      en: "The Fake Exit",
      scenario: "You need to escape a conversation",
      keywords: [
        { word: "Jump", definition: "Go quickly" },
        { word: "Meeting", definition: "Gathering" }
      ],
      goodResponse: {
          text: "I'd love to chat more, but I actually have to [jump] into a call in 5 minutes.",
          why: "The 'upcoming call' is the perfect un-argueable excuse."
      }
    },
    {
      id: "s5",
      en: "The 'Leaving Early' Defense",
      scenario: "Leaving at 4:55 PM",
      keywords: [
        { word: "Head out", definition: "Leave" },
        { word: "Tomorrow", definition: "Next day" }
      ],
      goodResponse: {
          text: "Alright, I'm gonna [head out]. See you guys [tomorrow]!",
          why: "Announce your departure confidently. Don't sneak out like a criminal."
      }
    }
  ]
};
