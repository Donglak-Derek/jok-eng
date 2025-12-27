import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const loudNeighbor: Script = {
  id: "polite-loud-neighbor",
  title: "The 2AM Party Neighbor",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "Asking your neighbor to turn it down without starting a war.",
  sentences: [
    {
      id: "neighbor-1-rude",
      en: "Rude: 'Shut up! Some of us have jobs!'",
      keywords: [
        { word: "Shut up", definition: "Stop talking/making noise (very rude)" },
      ],
    },
    {
      id: "neighbor-1-polite",
      en: "Polite: 'Hey! Looks like a fun party. I've got an early morning tomorrow, so would you mind keeping it down just a notch?'",
      keywords: [
        { word: "Notch", definition: "Small degree/amount" },
        { word: "Keep it down", definition: "Reduce the volume" }
      ],
    },
    {
      id: "neighbor-2-rude",
      en: "Rude: 'I'm calling the police if you don't stop.'",
      keywords: [
        { word: "Police", definition: "Law enforcement" },
      ],
    },
    {
      id: "neighbor-2-polite",
      en: "Polite: 'I'd hate to be a buzzkill, but the bass is shaking my walls a bit.'",
      keywords: [
        { word: "Buzzkill", definition: "Person who spoils the fun" },
        { word: "Bass", definition: "Low frequency sound" }
      ],
    },
    {
      id: "neighbor-3-rude",
      en: "Rude: 'You are the worst neighbors ever.'",
      keywords: [
        { word: "Worst", definition: "Most bad" },
      ],
    },
    {
      id: "neighbor-3-polite",
      en: "Polite: 'Thanks so much for understanding, I really appreciate it. Enjoy the rest of your night!'",
      keywords: [
        { word: "Understanding", definition: "Sympathetically aware of others' feelings" },
      ],
    }
  ]
};
