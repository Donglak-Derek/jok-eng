import { Script } from "@/types";

export const ikeaLeadership: Script = {
  id: "ikea-leadership",
  title: "Values-Based Leadership (IKEA Style)",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Leading with 'Togetherness' and 'Cost-consciousness'.",
  sentences: [
    {
      id: "ikea-1",
      en: "Value: Togetherness (Tillsammans)",
      keywords: [
        { word: "Guidance", definition: "Advice or information aimed at resolving a problem" },
        { word: "Collaboration", definition: "The action of working with someone to produce or create something" }
      ],
      scenario: "During a crisis, how do you manage the team?",
      badResponse: {
        text: "I told everyone what to do because I'm the boss and I know best.",
        why: "Too hierarchical. Ignores the collective strength."
      },
      goodResponse: {
        text: "I gathered the team to brainstorm. We solved it together, because I believe the best solutions come from our collective intelligence, not just one person.",
        why: "Demonstrates 'Tillsammans' - we are stronger together."
      }
    },
    {
      id: "ikea-2",
      en: "Value: Lead by Example",
      keywords: [
        { word: "Integrity", definition: "The quality of being honest and having strong moral principles" },
        { word: "Modeling", definition: "Showing others how to act by doing it yourself" }
      ],
      scenario: "The store is busy and the floor is messy.",
      badResponse: {
        text: "I called a janitor to clean it up while I sat in my office.",
        why: "Disconnects you from the reality of the floor."
      },
      goodResponse: {
        text: "I rolled up my sleeves and started helping clear tables. My team saw that no task is 'too small' for a leader, which boosted morale.",
        why: "Shows you lead from the front, not from a desk."
      }
    },
    {
      id: "ikea-3",
      en: "Value: Cost-consciousness",
      keywords: [
        { word: "Efficiency", definition: "Achieving max productivity with min wasted effort" },
        { word: "Optimization", definition: "Making the best or most effective use of a situation or resource" }
      ],
      scenario: "Planning a team event on a tight budget.",
      badResponse: {
        text: "We just cancelled the event because we didn't have enough money for a fancy dinner.",
        why: "Giving up instead of being creative."
      },
      goodResponse: {
        text: "We ordered pizza and did a potluck instead of a gala. We utilized our resources smartly to focus on bonding, not spending luxury money.",
        why: "Shows you can do more with less (doing it a different way)."
      }
    },
    {
      id: "ikea-4",
      en: "Value: Give and Take Responsibility",
      keywords: [
        { word: "Empowerment", definition: "Authority or power given to someone to do something" },
        { word: "Trust", definition: "Firm belief in the reliability of someone" }
      ],
      scenario: "A junior employee has a new idea.",
      badResponse: {
        text: "I checked every detail of their work before letting them launch it.",
        why: "Micromanagement kills growth."
      },
      goodResponse: {
        text: "I gave them the ownership of the project. I was there for support, but I trusted them to make the final call. They grew so much from that trust.",
        why: "Empowers the co-worker to grow."
      }
    },
    {
      id: "ikea-5",
      en: "Value: Renew and Improve",
      keywords: [
        { word: "Innovation", definition: "A new method, idea, product, etc." },
        { word: "Stagnation", definition: "Lack of activity, growth, or development" }
      ],
      scenario: "A process has been done the same way for 10 years.",
      badResponse: {
        text: "If it ain't broke, don't fix it. We kept it the same.",
        why: "Accepting the status quo."
      },
      goodResponse: {
        text: "I challenged the status quo. We found a way to automate it, saving 5 hours a week. Just because it works doesn't mean it can't be better.",
        why: "Constantly looking for a better way."
      }
    },
    {
      id: "ikea-6",
      en: "Value: Simplicity",
      keywords: [
        { word: "Bureaucracy", definition: "Excessively complicated administrative procedure" },
        { word: "Directness", definition: "The quality of being plain and straightforward" }
      ],
      scenario: "Communicating a new strategy.",
      badResponse: {
        text: "I wrote a 50-page document explaining the theoretical framework.",
        why: "Overcomplicated and hard to understand."
      },
      goodResponse: {
        text: "I boiled it down to three bullet points. Solving the problem in a straightforward, practical way is always better than a complex one.",
        why: "Simplicity is a virtue. Straightforward and practical."
      }
    }
  ]
};
