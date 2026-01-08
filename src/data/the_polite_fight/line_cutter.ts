import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const lineCutter: Script = {
  id: "polite-line-cutter",
  title: "The Line Cutter Defense",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to stop someone from skipping the line without causing a scene.",
    imageUrl: "/images/scenarios/polite_generic.png",
  sentences: [
    {
      id: "line-1-rude",
      en: "Rude: 'Hey! Get to the back of the line!'",
      keywords: [
        { word: "Get back", definition: "Command to return" },
        { word: "Line", definition: "Queue of people" }
      ],
    },
    {
      id: "line-1-polite",
      en: "Polite: 'Excuse me, I believe the line actually starts back there.'",
      keywords: [
        { word: "Believe", definition: "Think/suppose (softens the claim)" },
        { word: "Actually", definition: "As the truth or facts of a situation" }
      ],
    },
    {
      id: "line-2-rude",
      en: "Rude: 'Are you blind? We are all waiting.'",
      keywords: [
        { word: "Blind", definition: "Unable to see (used as insult)" },
        { word: "Waiting", definition: "Staying where one is until something happens" }
      ],
    },
    {
      id: "line-2-polite",
      en: "Polite: 'So sorry, we've all been waiting a bit. Just wanted to make sure you saw the end of the queue.'",
      keywords: [
        { word: "Queue", definition: "British/Formal word for line" },
        { word: "Make sure", definition: "Ensure (assumes it was an accident)" }
      ],
    },
    {
      id: "line-3-rude",
      en: "Rude: 'Don't pretend you didn't see us.'",
      keywords: [
        { word: "Pretend", definition: "Bahave so as to make it appear that something is the case when it is not" },
      ],
    },
    {
      id: "line-3-polite",
      en: "Polite: 'I think there might be a bit of confusion on where the line forms.'",
      keywords: [
        { word: "Confusion", definition: "Uncertainty about what is happening" },
        { word: "Forms", definition: "Starts/Assembles" }
      ],
    }
  ]
};
