import { Script } from "@/types";

export const resignationGraceful: Script = {
  id: "resignation-graceful",
  title: "Leaving Without Burning Bridges",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "How to quit like a pro.",
    imageUrl: "/images/scenarios/resignation_graceful_3d.png",
  // Engagement
  culturalNote: {
    title: "The 'Good' Goodbye",
    content: "The tech world is small. The person you quit today might be your hiring manager in 5 years. A graceful resignation protects your reputation ('Your network is your net worth'). It is standard to give 2 weeks' notice and offer help with the transition."
  },
  quizItems: [
    {
      question: "What is the most important goal when resigning?",
      options: [
        "To tell them how bad the company is.",
        "To leave on good terms (protect your reputation).",
        "To get a higher counter-offer.",
        "To steal office supplies."
      ],
      correctIndex: 1,
      explanation: "Burning bridges feels good for a moment but hurts you forever. Leave classy."
    },
    {
      question: "What should you focus on during the transition period?",
      options: [
        "Doing as little as possible.",
        "Complaining to coworkers.",
        "Documenting your work and training others.",
        "Taking long lunches."
      ],
      correctIndex: 2,
      explanation: "A seamless handoff is the final professional gift you give to your team."
    },
    {
      question: "How honest should you be in an exit interview?",
      options: [
        "Brutally honest.",
        "Diplomatically honest (constructive).",
        "Lie and say everything was perfect.",
        "Refuse to speak."
      ],
      correctIndex: 1,
      explanation: "Frame criticism as 'opportunities for growth' for the company, not personal attacks on people."
    }
  ],

  sentences: [
    {
      id: "quit-1",
      en: "The 'Notice'",
      keywords: [
        { word: "Opportunity", definition: "A set of circumstances making it possible to do something" },
        { word: "Grateful", definition: "Feeling or showing an appreciation" }
      ],
      scenario: "Telling your boss you are leaving",
      badResponse: {
          text: "I quit. I hate this place.",
          why: "Hurts you for 5 years."
      },
      goodResponse: {
          text: "I've been offered a new [opportunity] I can't turn down. I'm incredibly [grateful] for the mentorship you've given me.",
          why: "Classic, professional, and keeps the relationship intact."
      }
    },
    {
      id: "quit-2",
      en: "The 'Transition' Plan",
      keywords: [
        { word: "Seamless", definition: "Smooth and continuous" },
        { word: "Handoff", definition: "Transferring responsibility" }
      ],
      scenario: "Discussing next steps",
      badResponse: {
          text: "I'm checking out. Don't ask me to do anything.",
          why: "Unprofessional."
      },
      goodResponse: {
          text: "My goal is a [seamless handoff]. I've started documenting processes. Who should I [train] on these tasks?",
          why: "Ensures a glowing recommendation later."
      }
    },
    {
      id: "quit-3",
      en: "The Exit Interview",
      keywords: [
        { word: "Constructive", definition: "Serving a useful purpose" },
        { word: "Diplomatic", definition: "Sensitive and effective communication" }
      ],
      scenario: "HR asks the real reason",
      badResponse: {
          text: "My boss is a nightmare.",
          why: "They won't fix it, and it burns a bridge."
      },
      goodResponse: {
          text: "I was looking for more growth in X, which this new role provides. The team is great, but could benefit from [clarity] on Y.",
          why: "Constructive, not destructive."
      }
    },
    {
      id: "quit-4",
      en: "The 'Goodbye' Email",
      keywords: [
        { word: "Privilege", definition: "A special right or advantage" },
        { word: "Stay in touch", definition: "Maintain contact" }
      ],
      scenario: "Last day email",
      badResponse: {
          text: "Later losers!",
          why: "Childish."
      },
      goodResponse: {
          text: "It's been a [privilege] to work with you all. Here is my personal email—let's definitely [stay in touch].",
          why: "Classy exit. Network is net worth."
      }
    }
  ]
};
