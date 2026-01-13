import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const genZSlang: Script = {
  id: "texting-gen-z",
  title: "Gen Z Slang Pack 1",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Don't sound 'cringe'. Basic slang you should know.",
  type: "script",
  section: "slang_vocab",
  mode: "cloze",
  difficulty: "Spicy 🌶️🌶️🌶️",
  imageUrl: "/images/scenarios/gen_z_slang.png",
  sentences: [
    {
      id: "genz-1",
      en: "No Cap / Cap",
      keywords: [
        { word: "Cap", definition: "A lie or falsehood" },
        { word: "No Cap", definition: "No lie / For real" }
      ],
      scenario: "Confirming you are telling the truth.",
      badResponse: {
        text: "I am not telling a falsehood.",
        why: "Too formal."
      },
      goodResponse: {
        text: "That pizza was the best I've ever had, [no cap].",
        why: "Means 'no lie' or 'seriously'. Using it correctly builds instant rapport."
      }
    },
    {
      id: "genz-2",
      en: "Bet",
      keywords: [
        { word: "Bet", definition: "Yes / Okay / Sounds good" }
      ],
      scenario: "Making plans. Friend says 'Let's meet at 7.'",
      badResponse: {
        text: "I agree to this proposition.",
        why: "Robotic."
      },
      goodResponse: {
        text: "[Bet].",
        why: "Simple way to say 'Yes', 'Okay', or 'It's a plan'. It's confident."
      }
    },
    {
      id: "genz-3",
      en: "Sus",
      keywords: [
        { word: "Sus", definition: "Suspicious or shady" }
      ],
      scenario: "Something seems wrong or untrustworthy.",
      badResponse: {
        text: "That behavior appears dubious.",
        why: "Are you a detective from the 1800s?"
      },
      goodResponse: {
        text: "That guy acting kinda [sus].",
        why: "Short for suspicious. Standard vocabulary for anything shady."
      }
    },
    {
      id: "genz-4",
      en: "Ghosting",
      keywords: [
        { word: "Ghosting", definition: "Disappearing without notice" }
      ],
      scenario: "Someone stops replying suddenly.",
      badResponse: {
        text: "He ceased all correspondence.",
        why: "Formal."
      },
      goodResponse: {
        text: "I think he [ghosted] me. I haven't heard from him in a week.",
        why: "The modern term for disappearing without a goodbye."
      }
    },
    {
      id: "genz-5",
      en: "Cringe",
      keywords: [
        { word: "Cringe", definition: "Second-hand embarrassment" }
      ],
      scenario: "Watching someone try too hard to be cool.",
      badResponse: {
        text: "That is embarrassing.",
        why: "A bit plain."
      },
      goodResponse: {
        text: "That's actually so [cringe].",
        why: "Used as an adjective now. It means it makes you physically wince."
      }
    }
  ],
  quizItems: [
    {
      question: "If someone says your outfit is 'No Cap', what do they mean?",
      options: [
        "You are not wearing a hat",
        "It is actually good (No lie)",
        "It is bad"
      ],
      correctIndex: 1,
      explanation: "'No Cap' means 'No Lie'. They are seriously complimenting you."
    },
    {
      question: "What does 'Sus' mean?",
      options: [
        "Sustainable",
        "Suspicious / Shady",
        "Susceptible"
      ],
      correctIndex: 1,
      explanation: "Sus is short for Suspicious. Used when something feels off."
    },
    {
      question: "If someone replies 'Bet' to your plan, are they gambling?",
      options: [
        "Yes, they want to wager money",
        "No, it means 'Okay' or 'Agreed'",
        "No, it means 'Maybe'"
      ],
      correctIndex: 1,
      explanation: "'Bet' is a confirmation. It means 'You can bet on it' or simply 'Yes'."
    }
  ]
};
