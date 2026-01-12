import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const lateFriend: Script = {
  id: "polite-late-friend",
  title: "The Chronic Late-Comer",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to tell a friend to be on time without ruining the friendship.",
  imageUrl: "/images/scenarios/late_friend_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The 'Worry' Tactic",
    content: "When someone is late, they expect you to be angry. If you are angry, they become defensive ('Traffic was bad!'). The polite hack is to be 'worried'. Saying 'I was worried something happened!' forces them to apologize for scaring you, rather than arguing about time."
  },
  sentences: [
    {
      id: "late-1",
      scenario: "Friend arrives 20 minutes late. No text.",
      en: "The Concern Switch",
      keywords: [
        { word: "worried", definition: "anxious/concerned" },
        { word: "okay", definition: "safe/fine" }
      ],
      badResponse: {
        text: "You: 'You're late again! Rude!'",
        why: "This guarantees a fight."
      },
      goodResponse: {
        text: "You: 'Hey! I was getting [worried]! Is everything [okay]?'",
        why: "Reframing anger as concern makes you look like a saint. They will feel guilty instantly."
      }
    },
    {
      id: "late-2",
      scenario: "They say 'Yeah, sorry, just bad traffic.'",
      en: "The Boundary",
      keywords: [
        { word: "start", definition: "begin" },
        { word: "wait", definition: "stay for" }
      ],
      badResponse: {
        text: "You: 'Next time buy a watch.'",
        why: "Sarcasm helps no one."
      },
      goodResponse: {
        text: "You: 'Glad you're safe! Next time, if it's more than 15 mins, I might just [start] ordering so I don't [wait] too long.'",
        why: "Setting a boundary ('I will start without you') is better than setting a punishment."
      }
    },
    {
      id: "late-3",
      scenario: "Planning the next meet-up.",
      en: "The Pre-Emptive Strike",
      keywords: [
        { word: "tight", definition: "strict/limited" },
        { word: "sharp", definition: "exactly on time" }
      ],
      badResponse: {
        text: "You: 'Try not to be late this time.'",
        why: "You sound like their mother."
      },
      goodResponse: {
        text: "You: 'I've got a [tight] schedule that night, so let's aim for 7:00 [sharp] so we have enough time to hang.'",
        why: "Blaming your 'tight schedule' makes punctuality a necessity, not a preference."
      }
    }
  ],
  quizItems: [
    {
      question: "Why is 'I was worried' better than 'I am angry'?",
      options: [
        "It confuses them.",
        "It makes them defensive.",
        "It triggers their empathy instead of their ego.",
        "It is a lie."
      ],
      correctIndex: 2,
      explanation: "People fight back against anger. They apologize for causing worry."
    },
    {
      question: "What is the best consequence for lateness?",
      options: [
        "Screaming.",
        "Starting without them (Natural Consequence).",
        "Ending the friendship.",
        "Throwing water."
      ],
      correctIndex: 1,
      explanation: "It respects your own time without actively punishing them."
    },
    {
      question: "How do you signal expectation of punctuality?",
      options: [
        "Use the word 'Sharp'.",
        "Send 50 texts.",
        "Call the police.",
        "Show up early."
      ],
      correctIndex: 0,
      explanation: "'7:00 Sharp' is the universal code for 'Do not be late'."
    }
  ]
};
