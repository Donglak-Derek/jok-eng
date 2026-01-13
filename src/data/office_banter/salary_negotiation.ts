import { Script } from "@/types";

export const salaryNegotiation: Script = {
  id: "salary-negotiation",
  title: "Show Me The Money: Salary Negotiation",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Get paid what you're worth without sweating through your shirt.",
    imageUrl: "/images/scenarios/salary_negotiation_3d.png",
  
  // Engagement
  culturalInsights: {
    title: "The Table Tennis Rule",
    content: "Salary negotiation in the West is expected, like a game of table tennis. If they serve a number and you just say 'okay', the game ends too early. They usually budget for a 'rally' (a counter-offer). Not negotiating can actually make you look less senior or confident."
  },
  quizItems: [
    {
      question: "They offer $90k. You wanted $100k. What is the best first move?",
      options: [
        "Say 'No, I need $100k'.",
        "Accept it immediately so you don't lose the job.",
        "Express enthusiasm, then ask if there is 'flexibility' on the base.",
        "Walk away."
      ],
      correctIndex: 2,
      explanation: "Always stay positive ('I love the role...') before pivoting to the money ('...but is there flexibility?')."
    },
    {
      question: "What is an 'Anchor'?",
      options: [
        "A heavy weight that stops you from moving.",
        "The first number put on the table, which sets the baseline for the rest of the negotiation.",
        "The final offer.",
        "A bonus."
      ],
      correctIndex: 1,
      explanation: "The first number (the Anchor) pulls the final result towards it. That's why high anchors usually result in higher final salaries."
    },
    {
      question: "Why is silence powerful?",
      options: [
        "It scares the recruiter.",
        "It gives you time to think.",
        "It creates social pressure for *them* to fill the void, often by improving the offer.",
        "It's rude."
      ],
      correctIndex: 2,
      explanation: "Most people hate silence and will talk to fill it. Let the recruiter be the one to break the silence."
    }
  ],

  sentences: [
    {
      id: "sal-1",
      en: "The 'Anchor'",
      keywords: [
        { word: "Market rate", definition: "Average pay for this role" },
        { word: "Value", definition: "Why you are worth it" }
      ],
      scenario: "Setting the Stage",
      badResponse: {
          text: "I don't know, maybe $70k? Whatever you think is fair.",
          why: "Never let them guess your worth."
      },
      goodResponse: {
          text: "Based on my research of the [market rate] and my specific value, I'm looking for a base between [$95k and $105k].",
          why: "Authorized, researched, and sets a strong anchor."
      }
    },
    {
      id: "sal-2",
      en: "The Counter",
      keywords: [
        { word: "Flexibility", definition: "Willingness to compromise" },
        { word: "Total comp", definition: "Salary + Equity + Bonus + Benefits" }
      ],
      scenario: "They offer less than you wanted",
      badResponse: {
          text: "That's too low. I can't take that.",
          why: "Too aggressive. Shuts down the conversation."
      },
      goodResponse: {
          text: "Is there [flexibility] on the base, or perhaps we can look at the [total compensation] package?",
          why: "Keeps the door open for creative solutions."
      }
    },
    {
      id: "sal-3",
      en: "The Raise Request",
      keywords: [
        { word: "Accomplishment", definition: "Successful achievement" },
        { word: "Adjustment", definition: "A formal change in pay" }
      ],
      scenario: "Asking for a Raise",
      badResponse: {
          text: "I've been here a year and I need more money due to inflation.",
          why: "Focuses on your needs, not your value."
      },
      goodResponse: {
          text: "Over the last year, I've taken on X and Y, leading to a [20% increase] in sales. I'd like to discuss a [salary adjustment].",
          why: "Tie the money directly to what you did for them."
      }
    },
     {
      id: "sal-4",
      en: "The Silence Tactic",
      keywords: [
        { word: "Pause", definition: "A temporary stop" },
        { word: "Compel", definition: "Force someone to speak" }
      ],
      scenario: "They make an offer. You want more.",
      badResponse: {
          text: "Okay cool thanks!",
          why: "Accepted too fast."
      },
      goodResponse: {
          text: "Thank you for the offer. ... [Silence] ...",
          why: "They will often fill the silence by improving the deal."
      }
    }
  ]
};
