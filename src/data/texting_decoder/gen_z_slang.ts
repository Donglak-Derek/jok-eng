import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const genZSlang: Script = {
  id: "texting-gen-z",
  title: "Gen Z Slang Pack 1",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Don't sound 'cringe'. Basic slang you should know.",
  sentences: [
    {
      id: "genz-1",
      en: "No Cap / Cap",
      keywords: [
        { word: "Lie", definition: "An intentionally false statement" },
        { word: "Authentic", definition: "Of bisputed origin; genuine" }
      ],
      scenario: "Confirming you are telling the truth.",
      badResponse: {
        text: "I am not telling a falsehood.",
        why: "Too formal."
      },
      goodResponse: {
        text: "That pizza was the best I've ever had, no cap.",
        why: "Means 'no lie' or 'seriously'."
      }
    },
    {
      id: "genz-2",
      en: "Bet",
      keywords: [
        { word: "Agreement", definition: "Harmony or accordance in opinion or feeling" },
        { word: "Confirmation", definition: "The action of confirming something" }
      ],
      scenario: "Making plans. Friend says 'Let's meet at 7.'",
      badResponse: {
        text: "I agree to this proposition.",
        why: "Robotic."
      },
      goodResponse: {
        text: "Bet.",
        why: "Simple way to say 'Yes', 'Okay', or 'It's a plan'."
      }
    },
    {
      id: "genz-3",
      en: "Sus",
      keywords: [
        { word: "Suspicious", definition: "Having or showing a cautious distrust" },
        { word: "Shady", definition: "Of doubtful honesty or legality" }
      ],
      scenario: "Something seems wrong or untrustworthy.",
      badResponse: {
        text: "That behavior appears dubious.",
        why: "Are you a detective from the 1800s?"
      },
      goodResponse: {
        text: "That guy acting kinda sus.",
        why: "Short for suspicious. Used for people or situations."
      }
    },
    {
      id: "genz-4",
      en: "Ghosting",
      keywords: [
        { word: "Disappear", definition: "Cease to be visible" },
        { word: "Communication", definition: "The exchanging of information" }
      ],
      scenario: "Someone stops replying suddenly.",
      badResponse: {
        text: "He ceased all correspondence without notice.",
        why: "Formal."
      },
      goodResponse: {
        text: "I think he ghosted me. I haven't heard from him in a week.",
        why: "The modern term for disappearing without a goodbye."
      }
    }
  ]
};
