import { Script } from "@/types";

export const resignationGraceful: Script = {
  id: "resignation-graceful",
  title: "Leaving Without Burning Bridges",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "How to quit like a pro.",
  sentences: [
    {
      id: "quit-1",
      en: "The 'Notice'",
      keywords: [
        { word: "Opportunity", definition: "A set of circumstances that makes it possible to do something" },
        { word: "Grateful", definition: "Feeling or showing an appreciation of kindness; thankful" }
      ],
      scenario: "Telling your boss you are leaving.",
      badResponse: {
        text: "I quit. I hate this place.",
        why: "Feels good for 5 seconds. Hurts you for 5 years."
      },
      goodResponse: {
        text: "I've been offered a new opportunity that I can't turn down. I'm incredibly grateful for the mentorship you've given me here.",
        why: "Classic, professional, and keeps the relationship intact."
      }
    },
    {
      id: "quit-2",
      en: "The 'Transition' Plan",
      keywords: [
        { word: "Seamless", definition: "Smooth and continuous" },
        { word: "Handoff", definition: "The act of transferring something to another person" }
      ],
      scenario: "Discussing next steps during notice period.",
      badResponse: {
        text: "I'm checking out. Don't ask me to do anything.",
        why: "Unprofessional."
      },
      goodResponse: {
        text: "My goal is a seamless handoff. I've already started documenting my processes. Who should I train on these tasks?",
        why: "Leaving them in a good spot ensures a glowing recommendation later."
      }
    },
    {
      id: "quit-3",
      en: "The Exit Interview",
      keywords: [
        { word: "Constructive", definition: "Serving a useful purpose; tending to build up" },
        { word: "Diplomatic", definition: "Dealing with people in a sensitive and effective way" }
      ],
      scenario: "Hr asks why you are really leaving.",
      badResponse: {
        text: "My boss is a nightmare and the pay sucks.",
        why: "They won't fix it, and it will get back to your boss."
      },
      goodResponse: {
        text: "I was looking for more growth in X area, which this new role provides. I think the team here is great, but could benefit from more clarity on Y.",
        why: "Diplomatically honest. Constructive, not destructive."
      }
    },
    {
      id: "quit-4",
      en: "The 'Goodbye' Email",
      keywords: [
        { word: "Journey", definition: "Act of traveling from one place to another (metaphorical)" },
        { word: "Stay in touch", definition: "Maintain contact" }
      ],
      scenario: "Last day email to the company.",
      badResponse: {
        text: "Later losers!",
        why: "Childish."
      },
      goodResponse: {
        text: "It's been a privilege to work with you all. I've learned so much. Here is my LinkedIn/personal email—let's definitely stay in touch.",
        why: "Classy exit. Your network is your net worth."
      }
    }
  ]
};
