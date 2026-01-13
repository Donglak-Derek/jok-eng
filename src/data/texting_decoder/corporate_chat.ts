import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const corporateChat: Script = {
  id: "texting-corporate-chat",
  title: "Corporate Chat Etiquette",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Slack/Teams rules to save your career.",
  type: "script",
  section: "life_work",
  difficulty: "Medium 🌶️🌶️",
  imageUrl: "/images/scenarios/corporate_chat.png",
  sentences: [
    {
      id: "corp-1",
      en: "The 'No Hello' Rule",
      keywords: [
        { word: "Efficiency", definition: "Achieving maximum productivity" },
      ],
      scenario: "Messaging a coworker you haven't spoken to today.",
      badResponse: {
        text: "Hi.",
        why: "This is a cliffhanger. Now they have to wait for you to type the rest. It causes anxiety."
      },
      goodResponse: {
        text: "Hi [Name], quick question about the Q3 report...",
        why: "Say hi and your point in the SAME message. It respects their time."
      }
    },
    {
      id: "corp-2",
      en: "The '@channel' Abuse",
      keywords: [
        { word: "Notification", definition: "Action of notifying someone" },
      ],
      scenario: "Asking a non-urgent question in a large group.",
      badResponse: {
        text: "@channel Has anyone seen my stapler?",
        why: "You just pinged 500 people for a trivial annoyance. Everyone hates this."
      },
      goodResponse: {
        text: "Has anyone seen a stapler? (No tag)",
        why: "Only use @channel if the building is on fire."
      }
    },
    {
      id: "corp-3",
      en: "The 'Thumb' Response",
      keywords: [
        { word: "Acknowledgment", definition: "Acceptance of the truth or existence" },
      ],
      scenario: "Boss gives an instruction.",
      badResponse: {
        text: "Okay.",
        why: "Not terrible, but can clutter the chat if everyone does it."
      },
      goodResponse: {
        text: "(React with 👍)",
        why: "The perfect way to say 'Received and understood' without notifying everyone else in the channel."
      }
    },
    {
      id: "corp-4",
      en: "Use Threads",
      keywords: [
        { word: "Thread", definition: "Group of linked messages" }
      ],
      scenario: "Replying to a specific message in a busy channel.",
      badResponse: {
        text: "Replying in the main chat.",
        why: "It interrupts other conversations and makes it hard to follow."
      },
      goodResponse: {
        text: "(Reply in Thread)",
        why: "Keeps the main channel clean and organized."
      }
    }
  ]
};
