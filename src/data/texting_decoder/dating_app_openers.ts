import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const datingAppOpeners: Script = {
  id: "texting-dating-apps",
  title: "Dating App Openers",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "What to say when 'Hey' isn't enough.",
  sentences: [
    {
      id: "date-1",
      en: "The 'Hey' Problem",
      keywords: [
        { word: "Low effort", definition: "Not trying very hard" },
        { word: "Generic", definition: "Lacking imagination or individuality" }
      ],
      scenario: "You match with someone cute.",
      badResponse: {
        text: "Hey.",
        why: "They have 50 other messages saying 'Hey'. You will be ignored."
      },
      goodResponse: {
        text: "Hey [Name], that hiking photo is epic! Is that in [Location]?",
        why: "Use their name + comment on a specific photo + ask a question."
      }
    },
    {
      id: "date-2",
      en: "The 'How are you?' Trap",
      keywords: [
        { word: "Boring", definition: "Not interesting; tedious" },
        { word: "Dead end", definition: "A situation offering no prospects of progress" }
      ],
      scenario: "Starting the conversation.",
      badResponse: {
        text: "How are you?",
        why: "The answer is always 'Good, you?'. Conversation dies immediately."
      },
      goodResponse: {
        text: "How's your week going? Anything exciting happen or just surviving?",
        why: "Gives them two prompts (exciting or surviving) to elaborate on."
      }
    },
    {
      id: "date-3",
      en: "The 'Gif' Opener",
      keywords: [
        { word: "Visual", definition: "Relating to seeing or sight" },
        { word: "Personality", definition: "Characteristics that form an individual's distinctive character" }
      ],
      scenario: "You don't know what to write.",
      badResponse: {
        text: "(Sending a random generic gif)",
        why: "Can be hit or miss."
      },
      goodResponse: {
        text: "(Send a funny gif relevant to their bio) + 'This is literally me if we went to [Place in their bio]'.",
        why: "Contextualizes the image."
      }
    },
    {
      id: "date-4",
      en: "The 'Or' Question",
      keywords: [
        { word: "Debate", definition: "Argue about (a subject), especially in a formal manner" },
        { word: "Engagement", definition: "The action of engaging or being engaged" }
      ],
      scenario: "Trying to get a reply.",
      badResponse: {
        text: "You look nice.",
        why: "A compliment is nice, but doesn't *demand* a reply."
      },
      goodResponse: {
        text: "Important debate: Pineapple on pizza. Yes or jail?",
        why: "Low stakes, fun controversy. Easy to answer."
      }
    }
  ]
};
