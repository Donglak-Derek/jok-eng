import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const punctuationPsychology: Script = {
  id: "texting-punctuation",
  title: "Punctuation Psychology",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "What one little dot (.) actually means in a text.",
    imageUrl: "/images/scenarios/texting_generic.png",
  sentences: [
    {
      id: "punc-1",
      en: "The Period (.)",
      keywords: [
        { word: "Finality", definition: "The fact or impression of being an irreversible ending" },
        { word: "Aggression", definition: "Hostile or violent behavior" }
      ],
      scenario: "Replying 'Okay' to a friend.",
      badResponse: {
        text: "Okay.",
        why: "To a friend, a period adds unintended seriousness or anger."
      },
      goodResponse: {
        text: "Okay",
        why: "Leaving the period off keeps it casual and open."
      }
    },
    {
      id: "punc-2",
      en: "Multiple Exclamations (!!)",
      keywords: [
        { word: "Enthusiasm", definition: "Intense and eager enjoyment" },
        { word: "Tone", definition: "The general character or attitude of a writing" }
      ],
      scenario: "Saying thank you for a favor.",
      badResponse: {
        text: "Thanks.",
        why: "Can sound sarcastic or ungrateful."
      },
      goodResponse: {
        text: "Thanks!!",
        why: "One exclamation mark is standard polite. Two shows genuine happiness."
      }
    },
    {
      id: "punc-3",
      en: "The Ellipsis (...)",
      keywords: [
        { word: "Hesitation", definition: "The action of pausing or waiting" },
        { word: "Ominous", definition: "Giving the impression that something bad is going to happen" }
      ],
      scenario: "Answering 'How are you?'",
      badResponse: {
        text: "I am fine...",
        why: "Implies 'I am NOT fine, please ask me why'."
      },
      goodResponse: {
        text: "I'm good!",
        why: "Clear and positive. Unless you want drama, avoid the trailing dots."
      }
    },
    {
      id: "punc-4",
      en: "All Caps (ALL CAPS)",
      keywords: [
        { word: "Shouting", definition: "Speaking very loudly" },
        { word: "Urgency", definition: "Importance requiring swift action" }
      ],
      scenario: "Reminding someone of a meeting (non-urgent).",
      badResponse: {
        text: "REMEMBER THE MEETING AT 3.",
        why: "You are screaming at them."
      },
      goodResponse: {
        text: "Remember the meeting at 3!",
        why: "Friendly reminder."
      }
    }
  ]
};
