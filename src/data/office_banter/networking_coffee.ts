import { Script } from "@/types";

export const networkingCoffee: Script = {
  id: "networking-coffee",
  title: "The Virtual Coffee Chat",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Building allies without being awkward.",
  sentences: [
    {
      id: "net-1",
      en: "The 'Reach Out'",
      keywords: [
        { word: "Admire", definition: "Regard with respect or warm approval" },
        { word: "Insight", definition: "A deep understanding of a person or thing" }
      ],
      scenario: "Asking a senior leader for a chat.",
      badResponse: {
        text: "Can I talk to you?",
        why: "Vague and demanding of time."
      },
      goodResponse: {
        text: "I've admired your work on the X project. I'd love to buy you a (virtual) coffee and hear your insights on leadership. Do you have 15 mins?",
        why: "Flattering, specific (`15 mins`), and clear intent."
      }
    },
    {
      id: "net-2",
      en: "The 'Ice Breaker'",
      keywords: [
        { word: "Topic", definition: "A matter dealt with in a text, discourse, or conversation" },
        { word: "Commonality", definition: "The state of sharing features or attributes" }
      ],
      scenario: "Start of the call. Awkward silence.",
      badResponse: {
        text: "So... work is crazy right?",
        why: "Generic small talk."
      },
      goodResponse: {
        text: "I saw on Slack you just wrapped up the Q4 planning. How does it feel to have that across the finish line?",
        why: "Shows you paid attention to their world."
      }
    },
    {
      id: "net-3",
      en: "The 'Ask' (Mentorship)",
      keywords: [
        { word: "Guidance", definition: "Advice or information aimed at resolving a problem" },
        { word: "Trajectory", definition: "The path followed by an object moving under the action of given forces" }
      ],
      scenario: "You want them to mentor you.",
      badResponse: {
        text: "Will you be my mentor?",
        why: "Too big a commitment upfront. Like proposing on the first date."
      },
      goodResponse: {
        text: "Your career trajectory is exactly where I want to go. Could I occasionally bounce ideas off you as I navigate this next year?",
        why: "Low pressure, high compliment."
      }
    },
    {
      id: "net-4",
      en: "The 'Close'",
      keywords: [
        { word: "Value", definition: "The importance, worth, or usefulness of something" },
        { word: "Reciprocate", definition: "Respond to (a gesture or action) by making a corresponding one" }
      ],
      scenario: "Ending the chat.",
      badResponse: {
        text: "Okay bye.",
        why: "Abrupt."
      },
      goodResponse: {
        text: "This was incredibly valuable, thank you. Is there anything I can help you with or support your team on right now?",
        why: "Offer value back. Networking is a two-way street."
      }
    }
  ]
};
