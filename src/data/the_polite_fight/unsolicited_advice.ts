import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const unsolicitedAdvice: Script = {
  id: "polite-unsolicited-advice",
  title: "The 'Advice' You Didn't Ask For",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "Shutting down nosy comments about your life/diet/dating.",
    imageUrl: "/images/scenarios/polite_generic.png",
  sentences: [
    {
      id: "advice-1-rude",
      en: "Rude: 'Mind your own business.'",
      keywords: [
        { word: "Business", definition: "Personal affairs" },
      ],
    },
    {
      id: "advice-1-polite",
      en: "Polite: 'That's an interesting perspective! I've actually got a plan I'm happy with right now, though.'",
      keywords: [
        { word: "Perspective", definition: "Point of view" },
        { word: "Happy with", definition: "Satisfied" }
      ],
    },
    {
      id: "advice-2-rude",
      en: "Rude: 'I don't care what you think.'",
      keywords: [
        { word: "Care", definition: "Feel concern or interest" },
      ],
    },
    {
      id: "advice-2-polite",
      en: "Polite: 'I appreciate you looking out for me, but I'm going to handle this my own way.'",
      keywords: [
        { word: "Looking out for", definition: "Trying to protect/help" },
        { word: "Handle", definition: "Manage/Deal with" }
      ],
    },
    {
      id: "advice-3-rude",
      en: "Rude: 'Stop telling me what to do.'",
      keywords: [
        { word: "Stop", definition: "Cease action" },
      ],
    },
    {
      id: "advice-3-polite",
      en: "Polite: 'I'll definitely keep that in mind if I decide to switch things up.'",
      keywords: [
        { word: "Keep in mind", definition: "Remember for consideration" },
        { word: "Switch things up", definition: "Change routines/methods" }
      ],
    }
  ]
};
