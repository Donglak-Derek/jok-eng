import { Script } from "@/types";

export const networkingCoffee: Script = {
  id: "networking-coffee",
  title: "The Virtual Coffee Chat",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Building allies without being awkward.",
    imageUrl: "/images/scenarios/coffee_crisis.png",
  // Engagement
  culturalNote: {
    title: "The Art of the 'Coffee Chat'",
    content: "In the US, asking for a 'virtual coffee' (15-20 mins) is the standard way to build a network. It is less formal than an interview but more structured than a random chat. The goal is connection, not an immediate job offer. Always respect the time limit strictly."
  },
  quizItems: [
    {
      question: "What is the primary goal of a networking coffee?",
      options: [
        "To ask for a job immediately.",
        "To build a relationship and learn.",
        "To complain about your current boss.",
        "To get free coffee."
      ],
      correctIndex: 1,
      explanation: "Networking is about planting seeds (relationships), not harvesting fruit (jobs) on day one."
    },
    {
      question: "How long should your initial request generally be?",
      options: [
        "1 hour.",
        "15-20 minutes.",
        "5 minutes.",
        "Open-ended."
      ],
      correctIndex: 1,
      explanation: "15 minutes is a 'low risk' ask for a busy person. They are more likely to say yes."
    },
    {
      question: "How should you end the call?",
      options: [
        "Just hang up.",
        "Ask when they can hire you.",
        "Ask 'Is there anything I can do to support you?'.",
        "Ask for their boss's email."
      ],
      correctIndex: 2,
      explanation: "Offering value back (reciprocity) turns a favor into a partnership."
    }
  ],

  sentences: [
    {
      id: "net-1",
      en: "The 'Reach Out'",
      keywords: [
        { word: "Admire", definition: "Regard with respect" },
        { word: "Insight", definition: "A deep understanding" }
      ],
      scenario: "Asking a senior leader for a chat",
      badResponse: {
          text: "Can I talk to you?",
          why: "Vague and demanding."
      },
      goodResponse: {
          text: "I've [admired] your work on Project X. I'd love to buy you a coffee and hear your [insights]. Do you have 15 mins?",
          why: "Flattering, specific, and clear intent."
      }
    },
    {
      id: "net-2",
      en: "The 'Ice Breaker'",
      keywords: [
        { word: "Topic", definition: "Subject of conversation" },
        { word: "Commonality", definition: "Sharing features" }
      ],
      scenario: "Start of the call",
      badResponse: {
          text: "So... work is crazy right?",
          why: "Generic complaining."
      },
      goodResponse: {
          text: "I saw on Slack you just [wrapped up] Q4 planning. How does it feel to have that across the [finish line]?",
          why: "Shows you follow their work."
      }
    },
    {
      id: "net-3",
      en: "The 'Ask' (Mentorship)",
      keywords: [
        { word: "Guidance", definition: "Advice aimed at resolving a problem" },
        { word: "Trajectory", definition: "Path of your career" }
      ],
      scenario: "You want them to mentor you",
      badResponse: {
          text: "Will you be my mentor?",
          why: "Too big a commitment upfront."
      },
      goodResponse: {
          text: "Your career [trajectory] is where I want to go. Could I occasionally [bounce ideas] off you this year?",
          why: "Low pressure, high compliment."
      }
    },
    {
      id: "net-4",
      en: "The 'Close'",
      keywords: [
        { word: "Value", definition: "Importance or usefulness" },
        { word: "Reciprocate", definition: "Respond in kind" }
      ],
      scenario: "Ending the chat",
      badResponse: {
          text: "Okay bye.",
          why: "Abrupt taker."
      },
      goodResponse: {
          text: "This was incredibly [valuable], thank you. Is there anything I can do to [support] your team right now?",
          why: "Offer value back."
      }
    }
  ]
};
