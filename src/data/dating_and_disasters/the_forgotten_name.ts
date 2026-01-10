import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theForgottenName: Script = {
  id: "the_forgotten_name",
  title: "The Forgotten Name",
  type: "script",
  section: "Social Emergencies",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "You run into someone you know, but their name is completely gone. Here is how to survive.",
  imageUrl: "/images/scenarios/forgotten_name.png",
  mode: "cloze",
  sentences: [
    {
      id: "s1",
      en: "I saw a guy from college waving at me.",
      keywords: [],
    },
    {
      id: "s2",
      en: "My brain was completely [blank].",
      keywords: [{ word: "blank", definition: "empty; no thoughts" }],
    },
    {
      id: "s3",
      en: "I tried the 'Hey... [you]!' strategy.",
      keywords: [{ word: "you", definition: "generic greeting to avoid using a name" }],
    },
    {
      id: "s4",
      en: "He asked, 'Do you remember my name?'",
      keywords: [],
    },
    {
      id: "s5",
      en: "I panicked and said, 'Of course, I'm just [terrible with names].'",
      keywords: [{ word: "terrible with names", definition: "common excuse for forgetting" }],
    },
    {
      id: "s6",
      en: "He said, 'I'm your cousin, Dave.'",
      keywords: [],
    },
    {
      id: "s7",
      en: "It was [mortifying].",
      keywords: [{ word: "mortifying", definition: "extremely embarrassing" }],
    }
  ],
  culturalNote: {
    title: "The 'Name Fishing' Technique",
    content: "If you forget a name, try introducing them to someone else immediately: 'Have you met my friend...?' forcing them to say their own name. Or just be honest: 'My brain is failing me today, remind me?'"
  },
  quizItems: [
    {
      question: "What is the 'Hey... you!' strategy used for?",
      options: ["To be friendly", "To avoid saying a name you forgot", "To start a fight", "To practice grammar"],
      correctIndex: 1,
      explanation: "It's a generic greeting people use when they can't remember the other person's name."
    },
    {
      question: "What does 'mortifying' mean?",
      options: ["Funny", "A little awkward", "Extremely embarrassing", "Scary"],
      correctIndex: 2,
      explanation: "Mortifying means so embarrassing you want to die (mort-)."
    }
  ]
};
