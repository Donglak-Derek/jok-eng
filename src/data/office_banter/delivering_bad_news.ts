import { Script } from "@/types";

export const deliveringBadNews: Script = {
  id: "delivering-bad-news",
  title: "Delivering Bad News (Without Panic)",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "How to tell your boss things are going wrong.",
    imageUrl: "/images/scenarios/delivering_bad_news_3d.png",
  // Engagement
  culturalInsights: {
    title: "Bad News Travels Fast",
    content: "Western business culture prefers 'Bad news early' over 'Bad news late'. Hiding a problem until the deadline is seen as a betrayal of trust. Admitting mistakes quickly and proposing solutions ('The Solution Sandwich') is seen as a sign of maturity and competence."
  },
  quizItems: [
    {
      question: "You realize you will miss a deadline next week. What do you do?",
      options: [
        "Work all night to fix it without telling anyone.",
        "Tell your boss immediately, explaining the risk and your plan to mitigate it.",
        "Wait until the deadline passes to apologize.",
        "Blame the software."
      ],
      correctIndex: 1,
      explanation: "Proactive communication allows the team to adjust expectations or offer help. Surprises are the enemy."
    },
    {
      question: "What is the 'Solution Sandwich'?",
      options: [
        "Two compliments with a criticism in the middle.",
        "Two problems with a solution in the middle.",
        "Stating the problem, offering options to fix it, and recommending the best one.",
        "Eating lunch at your desk."
      ],
      correctIndex: 2,
      explanation: "Don't just dump a dead rat on your boss's desk. Bring a shovel (a solution)."
    },
    {
      question: "If you made a mistake, how should you apologize?",
      options: [
        "Say 'I'm sorry, I suck'.",
        "Make excuses about how busy you were.",
        "Take ownership ('My oversight') and explain how you will prevent it next time.",
        "Ignore it and hope they forget."
      ],
      correctIndex: 2,
      explanation: "Extreme ownership builds respect. Excuses destroy it."
    }
  ],

  sentences: [
    {
      id: "news-1",
      en: "The 'Early Warning'",
      keywords: [
        { word: "Heads up", definition: "An advance warning" },
        { word: "Mitigate", definition: "Make less severe" }
      ],
      scenario: "You might miss a deadline",
      badResponse: {
          text: "(Hide it until the deadline passes)",
          why: "Surprises are bad."
      },
      goodResponse: {
          text: "Just a [heads up], we're hitting some snags. There's a risk of a delay, but I'm working to [mitigate] it.",
          why: "Proactive communication builds trust."
      }
    },
    {
      id: "news-2",
      en: "The 'Solution' Sandwich",
      keywords: [
        { word: "Roadblock", definition: "A barrier to progress" },
        { word: "Options", definition: "Choices" }
      ],
      scenario: "Reporting a failure",
      badResponse: {
          text: "It broke. I don't know what to do.",
          why: "Dumping a problem on them."
      },
      goodResponse: {
          text: "We hit a [roadblock]. Here are three [options] to fix it: A, B, or C. I recommend B.",
          why: "Come with solutions, not just problems."
      }
    },
    {
      id: "news-3",
      en: "Owning the Mistake",
      keywords: [
        { word: "Oversight", definition: "Unintentional failure to notice something" },
        { word: "Rectify", definition: "Put something right" }
      ],
      scenario: "You messed up",
      badResponse: {
          text: "It wasn't my fault, the software glitched.",
          why: "Excuses look weak."
      },
      goodResponse: {
          text: "That was my [oversight]. I take full responsibility. Here is how I'm [rectifying] it immediately.",
          why: "Extreme ownership is respected."
      }
    },
    {
      id: "news-4",
      en: "Saying 'I Don't Know'",
      keywords: [
        { word: "Verify", definition: "Make sure that something is true" },
        { word: "Circle back", definition: "Return to a subject later" }
      ],
      scenario: "Asked a question you don't know",
      badResponse: {
          text: "Uhh... I think maybe...",
          why: "Guessing is dangerous."
      },
      goodResponse: {
          text: "I don't have that number right now. Let me [verify] it and [circle back] to you in 10 minutes.",
          why: "Confident competence."
      }
    }
  ]
};
