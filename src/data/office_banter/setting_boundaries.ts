import { Script } from "@/types";

export const settingBoundaries: Script = {
  id: "setting-boundaries",
  title: "The Art of Saying 'No' (Politely)",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Protect your time without looking lazy.",
    imageUrl: "/images/scenarios/setting_boundaries_3d.png",
  // Engagement
  culturalNote: {
    title: "Saying 'No' is a Superpower",
    content: "In Western work culture, having no boundaries is not seen as 'dedicated'; it is often seen as 'disorganized' or 'prone to burnout'. Leaders respect employees who can prioritize effectively. The key is to say 'No' not because you are lazy, but because you care about quality."
  },
  quizItems: [
    {
      question: "Why should you say no to extra work when you are already full?",
      options: [
        "To annoy your boss.",
        "To protect the quality of your current work.",
        "So you can go home early.",
        "Because you are lazy."
      ],
      correctIndex: 1,
      explanation: "If you do everything, you do nothing well. Prioritization ensures quality."
    },
    {
      question: "What is the best way to handle a weekend email?",
      options: [
        "Reply immediately to show you are working.",
        "Reply angrily.",
        "Wait until Monday morning.",
        "Delete it."
      ],
      correctIndex: 2,
      explanation: "Replying on weekends teaches people that you are available on weekends. Train them to respect your off-time."
    },
    {
      question: "How do you handle 'scope creep' (adding extra tasks)?",
      options: [
        "Just do it for free.",
        "Complain to HR.",
        "Accept it but clarify the impact on the timeline or cost.",
        "Say no without explanation."
      ],
      correctIndex: 2,
      explanation: "Everything has a cost. It is professional to remind the client/boss that new tasks = more time."
    }
  ],

  sentences: [
    {
      id: "bound-1",
      en: "The 'Capacity' Capacity",
      keywords: [
        { word: "Capacity", definition: "Maximum amount you can produce" },
        { word: "Prioritize", definition: "Treat as more important" }
      ],
      scenario: "Boss adds work when you are swamped",
      badResponse: {
          text: "I can't do that. I'm too busy.",
          why: "Sounds like a refusal to work."
      },
      goodResponse: {
          text: "I'd love to help, but I'm at full [capacity]. To ensure quality, which project should I [prioritize]?",
          why: "Forces them to make the trade-off decision."
      }
    },
    {
      id: "bound-2",
      en: "The 'Weekend' Warrior",
      keywords: [
        { word: "Unplug", definition: "Disconnect from work" },
        { word: "Recharge", definition: "Regain energy" }
      ],
      scenario: "Email received at 9 PM on Friday",
      badResponse: {
          text: "I'm not working right now.",
          why: "A bit blunt."
      },
      goodResponse: {
          text: "(Don't reply until Monday). Or: 'Received! I'll dive into this [first thing] Monday morning.'",
          why: "Sets a precedent that you are offline."
      }
    },
    {
      id: "bound-3",
      en: "The 'Meeting' Decline",
      keywords: [
        { word: "Deadline", definition: "Latest time for completion" },
        { word: "Focus", definition: "Center of interest or activity" }
      ],
      scenario: "Invited to a useless meeting",
      badResponse: {
          text: "This meeting is a waste of time.",
          why: "Rude."
      },
      goodResponse: {
          text: "Given my current [deadlines], I'll skip this to [focus] on the launch. I'll read the notes after.",
          why: "Shows you prioritize work over talk."
      }
    },
    {
      id: "bound-4",
      en: "The 'Scope Creep' Pushback",
      keywords: [
        { word: "Scope", definition: "Extent of the area/subject matter" },
        { word: "Timeline", definition: "Schedule" }
      ],
      scenario: "Client asks for 'just one extra thing'",
      badResponse: {
          text: "Sure, I'll do it.",
          why: "You just worked for free."
      },
      goodResponse: {
          text: "Happy to add that! Since it wasn't in the original [scope], it will extend the [timeline] by 2 days.",
          why: "Make them aware of the cost."
      }
    }
  ]
};
