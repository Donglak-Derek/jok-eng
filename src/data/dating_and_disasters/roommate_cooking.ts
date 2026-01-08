import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const roommateCooking: Script = {
  id: "skit-roommate-cooking",
  title: "Kitchen Disaster Date",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish:
    "A date that turns into a cooking-show fail—great for telling friends because it’s self-aware and still sweet.",
    imageUrl: "/images/scenarios/dating_generic.png",
  sentences: [
    {
      id: "s1",
      en: "We cooked together on a third date to save money.",
      keywords: [
        { word: "third date", definition: "third romantic meeting" },
        { word: "save money", definition: "avoid unnecessary expenses" },
      ],
    },
    {
      id: "s2",
      en: "I said, 'Welcome to my cooking show: Burning Water with Me.'",
      keywords: [
        { word: "burning", definition: "on fire or very hot" },
        { word: "welcome", definition: "greet someone kindly" },
      ],
    },
    {
      id: "s3",
      en: "The pasta stuck together like we were at a team-building event.",
      keywords: [
        { word: "stuck", definition: "fixed in one place" },
        { word: "team-building", definition: "activities to improve teamwork" },
      ],
    },
    {
      id: "s4",
      en: "The smoke alarm yelled louder than we did.",
      keywords: [
        { word: "smoke alarm", definition: "device that warns of fire" },
        { word: "yell", definition: "shout loudly" },
      ],
    },
    {
      id: "s5",
      en: "I joked, 'That's our live studio audience.'",
      keywords: [
        { word: "audience", definition: "spectators at an event" },
        { word: "live", definition: "broadcast as it happens" },
      ],
    },
    {
      id: "s6",
      en: "We opened windows for a 'commercial break.'",
      keywords: [
        { word: "commercial break", definition: "pause for advertisements" },
        { word: "window", definition: "opening in a wall for light/air" },
      ],
    },
    {
      id: "s7",
      en: "She said, 'Next time we order pizza and just roast our days.'",
      keywords: [
        { word: "order", definition: "request food" },
        { word: "roast", definition: "criticize or mock humorously" },
      ],
    },
    {
      id: "s8",
      en: "We laughed, ate crunchy pasta, and still had fun.",
      keywords: [
        { word: "crunchy", definition: "making a sharp noise when bitten" },
        { word: "still", definition: "nevertheless; even so" },
      ],
    },
  ],
};
