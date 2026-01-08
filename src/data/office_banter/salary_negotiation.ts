import { Script } from "@/types";

export const salaryNegotiation: Script = {
  id: "salary-negotiation",
  title: "Show Me The Money: Salary Negotiation",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Get paid what you're worth without sweating through your shirt.",
    imageUrl: "/images/scenarios/networking_coffee.png",
  sentences: [
    {
      id: "sal-1",
      en: "The 'Anchor' (Setting the stage)",
      keywords: [
        { word: "Market rate", definition: "The average pay for a specific job" },
        { word: "Value", definition: "Why you are worth the investment" }
      ],
      scenario: "They ask: 'What are your salary expectations?'",
      badResponse: {
        text: "I don't know, maybe $70k? Whatever you think is fair.",
        why: "You just lost money. Never let them guess your worth."
      },
      goodResponse: {
        text: "Based on my research of the market rate and the specific value I bring to this role, I'm looking for a base between $95k and $105k.",
        why: "Authorized, researched, and sets a strong anchor."
      }
    },
    {
      id: "sal-2",
      en: "The 'Lowball' Counter",
      keywords: [
        { word: "Flexibility", definition: "Willingness to change or compromise" },
        { word: "Total comp", definition: "Salary + Equity + Bonus + Benefits" }
      ],
      scenario: "They offer less than you wanted.",
      badResponse: {
        text: "That's too low. I can't take that.",
        why: "Too aggressive. Shuts down the conversation."
      },
      goodResponse: {
        text: "I appreciate the offer. It is a bit lower than I expected. Is there flexibility on the base, or perhaps we can look at the total compensation package?",
        why: "Keeps the door open and invites creative solutions."
      }
    },
    {
      id: "sal-3",
      en: "The 'Raise' Request",
      keywords: [
        { word: "Accomplishment", definition: "Something that has been achieved successfully" },
        { word: "Adjustment", definition: "A small alteration or movement" }
      ],
      scenario: "Asking for a raise at your current job.",
      badResponse: {
        text: "I've been here a year and I need more money due to inflation.",
        why: "Focuses on your needs, not your value to the company."
      },
      goodResponse: {
        text: "Over the last year, I've taken on X and Y, leading to a 20% increase in sales. I'd like to discuss a salary adjustment to reflect this new level of contribution.",
        why: "Tie the money directly to what you did for them."
      }
    },
     {
      id: "sal-4",
      en: "The 'Silence' Tactic",
      keywords: [
        { word: "Pause", definition: "A temporary stop" },
        { word: "Compel", definition: "Force or oblige someone to do something" }
      ],
      scenario: "They make an offer. You want more.",
      badResponse: {
        text: "Okay cool thanks!",
        why: "Accepted too fast."
      },
      goodResponse: {
        text: "(Silence... count to 3)",
        why: "Silence is uncomfortable. Often, they will fill it by improving the offer or explaining themselves."
      }
    }
  ]
};
