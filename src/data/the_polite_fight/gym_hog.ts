import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const gymHog: Script = {
  id: "polite-gym-hog",
  title: "The Gym Equipment Hog",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "Getting the machine you need when someone has been texting on it for 10 minutes.",
    imageUrl: "/images/scenarios/polite_generic.png",
  sentences: [
    {
      id: "gym-1-rude",
      en: "Rude: 'Are you done yet? You've been there forever.'",
      keywords: [
        { word: "Forever", definition: "For all future time (exaggeration)" },
      ],
    },
    {
      id: "gym-1-polite",
      en: "Polite: 'Hey there, do you have many sets left?'",
      keywords: [
        { word: "Sets", definition: "A group of repetitions of an exercise" },
        { word: "Left", definition: "Remaining" }
      ],
    },
    {
      id: "gym-2-rude",
      en: "Rude: 'Get off your phone and workout.'",
      keywords: [
        { word: "Get off", definition: "Leave/Exit (aggressive)" },
      ],
    },
    {
      id: "gym-2-polite",
      en: "Polite: 'Mind if I work in while you rest?'",
      keywords: [
        { word: "Work in", definition: "Take turns on the machine during rest periods" },
        { word: "Mind", definition: "Object to / Be annoyed by" }
      ],
    },
    {
      id: "gym-3-rude",
      en: "Rude: 'I'm taking this machine next.'",
      keywords: [
        { word: "Taking", definition: "Claiming possession" },
      ],
    },
    {
      id: "gym-3-polite",
      en: "Polite: 'Would you mind letting me know when you're finished? I'd love to grab it after you.'",
      keywords: [
        { word: "Grab it", definition: "Use it (casual)" },
        { word: "Finished", definition: "Done with the activity" }
      ],
    }
  ]
};
