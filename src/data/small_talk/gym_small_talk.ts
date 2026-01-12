import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const gymSmallTalk: Script = {
  id: "everyday-gym-small-talk",
  title: "The Gym Jungle",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Navigating sweat, sets, and unsolicited advice.",
  imageUrl: "/images/scenarios/gym_hover_3d.png",
  mode: "cloze",

  culturalNote: {
    title: "Gym Etiquette 101",
    content: "The Gym is a place of solitude in public. Talking is generally discouraged unless necessary (asking for equipment). Headphones = 'Do Not Disturb'. If someone has headphones on, do not talk to them unless the building is on fire."
  },

  quizItems: [
    {
      question: "Someone is sitting on the machine looking at their phone. You want to use it. You ask:",
      options: [
        "Get off the phone!",
        "How many sets do you have left?",
        "Stare at them until they move.",
        "Call the police."
      ],
      correctIndex: 1,
      explanation: "'How many sets left?' is the universal code for 'Hurry up, I am waiting'."
    },
    {
      question: "What does 'Can I work in?' mean?",
      options: [
        "Can I get a job here?",
        "Can we share the machine between sets?",
        "Can I work out inside your house?",
        "Can I spot you?"
      ],
      correctIndex: 1,
      explanation: "'Working in' means taking turns on the machine while the other person rests. It is efficient and polite."
    },
    {
      question: "Someone tries to talk to you while you have headphones on. You:",
      options: [
        "Take them off and smile.",
        "Point to your ears and shrug.",
        "Scream.",
        "Pretend you are deaf."
      ],
      correctIndex: 1,
      explanation: "Unless it's an emergency, pointing to headphones is the universal 'I am in the zone' signal."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Hover maneuver",
      scenario: "Asking for equipment",
      keywords: [
        { word: "Using", definition: "Occupying" },
        { word: "Resting", definition: "Not working" }
      ],
      badResponse: {
          text: "Are you done?",
          why: "Can sound aggressive."
      },
      goodResponse: {
          text: "Hey, are you [using] this, or just [resting] between sets?",
          why: "Polite clarification."
      }
    },
    {
      id: "s2",
      en: "Asking to Share",
      scenario: "Machine is busy but they are slow",
      keywords: [
        { word: "Work in", definition: "Share usage" },
        { word: "Mind", definition: "Object/Care" }
      ],
      badResponse: {
          text: "My turn.",
          why: "Childish."
      },
      goodResponse: {
          text: "Do you [mind] if I [work in] while you rest?",
          why: "The standard phrase for sharing equipment."
      }
    },
    {
      id: "s3",
      en: "The Unsolicited Advice",
      scenario: "Someone tries to correct your form",
      keywords: [
        { word: "Good", definition: "Okay/Fine" },
        { word: "Focus", definition: "Concentrate" }
      ],
      badResponse: {
          text: "Shut up.",
          why: "Rude (even if they deserve it)."
      },
      goodResponse: {
          text: "Thanks, but I'm [good]. Just [focusing] on my own routine today.",
          why: "Firm boundary setting."
      }
    },
    {
      id: "s4",
      en: "The Spot Request",
      scenario: "You need help for safety",
      keywords: [
        { word: "Spot", definition: "Assist with weight" },
        { word: "Heavy", definition: "Difficult weight" }
      ],
      goodResponse: {
          text: "Hey, could you give me a quick [spot]? I'm trying a heavier weight.",
          why: "Most people are happy to help for 30 seconds."
      }
    },
    {
      id: "s5",
      en: "The Wipe Down",
      scenario: "Leaving the machine sweaty",
      keywords: [
        { word: "Gross", definition: "Disgusting" },
        { word: "Courtesy", definition: "Politeness" }
      ],
      goodResponse: {
          text: "Don't worry, I'll wipe it down—nobody wants my [sweat] as a souvenir.",
          why: "Self-deprecating humor + hygiene = win."
      }
    }
  ]
};
