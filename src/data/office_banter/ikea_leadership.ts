import { Script } from "@/types";

export const ikeaLeadership: Script = {
  id: "ikea-leadership",
  title: "Values-Based Leadership (IKEA Style)",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Leading with 'Togetherness' and 'Cost-consciousness'.",
    imageUrl: "/images/scenarios/ikea_leadership_3d.png",
  // Engagement
  culturalInsights: {
    title: "Swedish Leadership Style",
    content: "The IKEA leadership style reflects Swedish culture: flat hierarchy, consensus decision-making, and 'Jantelagen' (The Law of Jante), which discourages individual bragging. Leaders are expected to be humble coaches ('Servant Leadership') rather than authoritarian bosses.",
    vocabulary: [
      { word: "Flat Hierarchy", definition: "Organization with few levels of middle management" },
      { word: "Consensus", definition: "General agreement among a group" },
      { word: "Jantelagen", definition: "Cultural code: 'You are not better than anyone else'" }
    ]
  },
  quizItems: [
    {
      question: "What does 'Tillsammans' mean in IKEA culture?",
      options: [
        "Work harder.",
        "Togetherness.",
        "Save money.",
        "Sell furniture."
      ],
      correctIndex: 1,
      explanation: "Tillsammans means 'Together'. It is the core value that no method is more effective than the good collaboration of people."
    },
    {
      question: "How should an IKEA leader handle a dirty floor?",
      options: [
        "Call the cleaner immediately.",
        "Ignore it, they have bigger problems.",
        "Clean it up themselves to set an example.",
        "Yell at the staff."
      ],
      correctIndex: 2,
      explanation: "Leadership by example is key. No task is 'too small' for a leader."
    },
    {
      question: "Why should you verify a number instead of guessing?",
      options: [
        "It takes less time.",
        "Guessing destroys trust if you are wrong.",
        "It doesn't matter.",
        "You should always guess."
      ],
      correctIndex: 1,
      explanation: "Credibility takes years to build and seconds to lose. It is better to admit you don't know and find the answer than to provide false information."
    }
  ],

  sentences: [
    {
      id: "ikea-1",
      en: "Value: Togetherness",
      keywords: [
        { word: "Guidance", definition: "Advice aimed at resolving a problem" },
        { word: "Collaboration", definition: "Working together" },
        { word: "together", definition: "As a unified group" },
        { word: "collective intelligence", definition: "The combined brainpower of the team" }
      ],
      scenario: "During a crisis (The Power of 'We')",
      badResponse: {
          text: "I told everyone what to do. I solved it.",
          why: "Too hierarchical. 'I' wording."
      },
      goodResponse: {
          text: "I gathered the team to brainstorm. We solved it [together], because I believe the best solutions come from our [collective intelligence].",
          why: "Demonstrates 'Tillsammans' (Togetherness)."
      }
    },
    {
      id: "ikea-2",
      en: "Value: Lead by Example",
      keywords: [
        { word: "Integrity", definition: "Honesty and moral principles" },
        { word: "Modeling", definition: "Showing others how to act" },
        { word: "rolled up my sleeves", definition: "Got ready to work hard personally" },
        { word: "no task is too small", definition: "Humble attitude to do any work" }
      ],
      scenario: "The store floor is messy",
      badResponse: {
          text: "I called a janitor to clean it up while I sat in my office.",
          why: "Disconnects you from the reality."
      },
      goodResponse: {
          text: "I [rolled up my sleeves] and started helping clear tables. My team saw that [no task is too small] for a leader.",
          why: "Shows you lead from the front, not a desk."
      }
    },
    {
      id: "ikea-3",
      en: "Value: Cost-consciousness",
      keywords: [
        { word: "Efficiency", definition: "Max productivity, min waste" },
        { word: "Optimization", definition: "Making the best use of resources" },
        { word: "smartly", definition: "Intelligently and efficiently" },
        { word: "spending luxury money", definition: "Using budget on unnecessary expensive items" }
      ],
      scenario: "Planning an event on a low budget",
      badResponse: {
          text: "We cancelled it because we're poor.",
          why: "Giving up instad of being creative."
      },
      goodResponse: {
          text: "We ordered pizza and did a potluck. We utilized our resources [smartly] to focus on bonding, not [spending luxury money].",
          why: "Doing more with less."
      }
    },
    {
      id: "ikea-4",
      en: "Value: Give and Take Responsibility",
      keywords: [
        { word: "Empowerment", definition: "Authority given to someone" },
        { word: "Trust", definition: "Firm belief in reliability" },
        { word: "ownership", definition: "Full responsibility for the outcome" },
        { word: "trusted them", definition: "Had confidence in their ability" }
      ],
      scenario: "Developing a junior employee",
      badResponse: {
          text: "I checked every detail before letting them launch.",
          why: "Micromanagement kills growth."
      },
      goodResponse: {
          text: "I gave them the [ownership] of the project. I was there for support, but I [trusted them] to make the final call.",
          why: "Empowers the co-worker to grow."
      }
    },
    {
      id: "ikea-5",
      en: "Value: Renew and Improve",
      keywords: [
        { word: "Innovation", definition: "A new method or idea" },
        { word: "Stagnation", definition: "Lack of growth" },
        { word: "challenged the status quo", definition: "Questioned the current way of doing things" },
        { word: "better", definition: "Improved or more effective" }
      ],
      scenario: "A process is 10 years old",
      badResponse: {
          text: "If it ain't broke, don't fix it.",
          why: "Accepting the status quo."
      },
      goodResponse: {
          text: "I [challenged the status quo]. Just because it works doesn't mean it can't be [better].",
          why: "Constantly looking for a better way."
      }
    },
    {
      id: "ikea-6",
      en: "Value: Simplicity",
      keywords: [
        { word: "Bureaucracy", definition: "Overly complicated procedure" },
        { word: "Directness", definition: "Being plain and straightforward" },
        { word: "boiled it down", definition: "Simplified to the essential parts" },
        { word: "straightforward", definition: "Direct and easy to understand" }
      ],
      scenario: "Communicating a new strategy",
      badResponse: {
          text: "I wrote a 50-page document on the theory.",
          why: "Overcomplicated."
      },
      goodResponse: {
          text: "I [boiled it down] to three bullet points. Solving the problem in a [straightforward] way is always best.",
          why: "Simplicity is a virtue."
      }
    }
  ]
};
