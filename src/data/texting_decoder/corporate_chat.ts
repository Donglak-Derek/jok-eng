import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const corporateChat: Script = {
  id: "texting-corporate-chat",
  title: "Corporate Chat Etiquette",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Slack/Teams rules to save your career.",
  sentences: [
    {
      id: "corp-1",
      en: "The 'Hello' Cliffhanger",
      keywords: [
        { word: "Suspense", definition: "State of feeling excited or anxious uncertainty" },
        { word: "Inefficient", definition: "Not achieving maximum productivity" }
      ],
      scenario: "Messaging a coworker.",
      badResponse: {
        text: "Hi.",
        why: "Now they have to wait for you to type the rest. It causes anxiety."
      },
      goodResponse: {
        text: "Hi [Name], quick question about the Q3 report...",
        why: "The 'No Hello' rule. Say hi and your point in the SAME message."
      }
    },
    {
      id: "corp-2",
      en: "The '@channel' Abuse",
      keywords: [
        { word: "Notification", definition: "Action of notifying someone" },
        { word: "Disruption", definition: "Disturbance or problems which interrupt an event/activity" }
      ],
      scenario: "Asking a question relevant to one person.",
      badResponse: {
        text: "@channel Has anyone seen my stapler?",
        why: "You just pinged 500 people for a customized annoyance."
      },
      goodResponse: {
        text: "@here (or just ask without tagging) anyone seen a stapler?",
        why: "Use tags sparingly. Respect attention spans."
      }
    },
    {
      id: "corp-3",
      en: "The 'Thumb' Response",
      keywords: [
        { word: "Acknowledgment", definition: "Acceptance of the truth or existence of something" },
        { word: "Closure", definition: "A feeling that an emotional or traumatic experience has been resolved" }
      ],
      scenario: "Boss gives an instruction.",
      badResponse: {
        text: "(No reply)",
        why: "Did you see it? Did you die?"
      },
      goodResponse: {
        text: "(React with 👍)",
        why: "The perfect way to say 'Received and understood' without cluttering the chat with 'Okay' messages."
      }
    },
    {
      id: "corp-4",
      en: "Detailed Feedback",
      keywords: [
        { word: "Nuance", definition: "A subtle difference in or shade of meaning" },
        { word: "Thread", definition: "Group of linked messages" }
      ],
      scenario: "Giving complex feedback.",
      badResponse: {
        text: "Sending 20 separate one-line messages.",
        why: "Their phone buzzes 20 times. It's annoying."
      },
      goodResponse: {
        text: "Write one long paragraph or use a Thread.",
        why: "Keeps the main channel clean."
      }
    }
  ]
};
