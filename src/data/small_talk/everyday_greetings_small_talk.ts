import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const greetingsSmallTalk: Script = {
  id: "casual_small_talk_1",
  title: "The Art of Hello",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Mastering the 'How are you?' ritual and escaping awkwardly long chats.",
  imageUrl: "/images/scenarios/greetings_introvert_3d.png",
  mode: "cloze",

  culturalNote: {
    title: "The 'How are you?' Trap",
    content: "In Western culture (especially US/UK), 'How are you?' is a greeting, NOT a question. The only correct answer is 'Good, you?'. If you answer 'Actually, I am sad', people will panic. Save the truth for close friends."
  },

  quizItems: [
    {
      question: "You see an acquaintance on the street, but you are in a rush. What do you do?",
      options: [
        "Hide behind a tree.",
        "Stop and talk for 20 minutes.",
        "Smile, wave, and keep walking.",
        "Sprint past them screaming."
      ],
      correctIndex: 2,
      explanation: "The 'Smile and Wave' allows you to acknowledge them politey without stopping. It is the ultimate survival move."
    },
    {
      question: "Someone asks 'What's up?'. You answer:",
      options: [
        "The sky.",
        "Not much, just chilling. You?",
        "I am currently walking.",
        "My blood pressure."
      ],
      correctIndex: 1,
      explanation: "'Not much' is the standard default response to 'What's up?'."
    },
    {
      question: "You forget someone's name immediately after they introduce themselves. You say:",
      options: [
        "Who are you?",
        "I'm so sorry, I'm blanking on your name.",
        "Hey... You!",
        "Run away."
      ],
      correctIndex: 1,
      explanation: "Honesty is better than guessing and calling 'Mike' 'Steve' for three months."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Default Setting",
      scenario: "Standard Greeting Ritual",
      keywords: [
        { word: "Good", definition: "Fine/Okay" },
        { word: "Yourself", definition: "And you?" }
      ],
      badResponse: {
          text: "I have a headache and my cat is sick.",
          why: "Too much information (TMI)."
      },
      goodResponse: {
          text: "I'm [good], thanks! How about [yourself]?",
          why: "The script everyone expects. Stick to it."
      }
    },
    {
      id: "s2",
      en: "The Rush Escape",
      scenario: "You don't have time to stop",
      keywords: [
        { word: "Run", definition: "Hurry" },
        { word: "Catch up", definition: "Talk later" }
      ],
      badResponse: {
          text: "Bye.",
          why: "Rude."
      },
      goodResponse: {
          text: "Hey! So good to see you. I've actually gotta [run], but let's [catch up] soon!",
          why: "Positive ('Good to see you') + Valid Excuse ('Gotta run')."
      }
    },
    {
      id: "s3",
      en: "The Name Blank",
      scenario: "You forgot their name",
      keywords: [
        { word: "Bad", definition: "Terrible" },
        { word: "Names", definition: "Labels for people" }
      ],
      goodResponse: {
          text: "I am so [bad] with names, remind me again?",
          why: "Honesty is better than guessing 'Steve' and being wrong."
      }
    },
    {
      id: "s4",
      en: "The Weather Filler",
      scenario: "Silence is getting awkward",
      keywords: [
        { word: "Believe", definition: "Accept as true" },
        { word: "Freezing", definition: "Very cold" }
      ],
      goodResponse: {
          text: "Can you [believe] this weather? It's absolutely [freezing] today.",
          why: "Weather is the universal 'safe topic' when you have nothing else to say."
      }
    },
    {
      id: "s5",
      en: "The Closing Statement",
      scenario: "Ending the conversation",
      keywords: [
        { word: "Great", definition: "Excellent" },
        { word: "Seeing", definition: "Meeting" }
      ],
      goodResponse: {
          text: "Well, it was [great] seeing you! Have a good one.",
          why: "Clear end signal. 'Well...' usually signals the start of the goodbye."
      }
    }
  ]
};
