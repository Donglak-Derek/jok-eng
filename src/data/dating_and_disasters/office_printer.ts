import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const officePrinter: Script = {
  id: "skit-office-printer",
  title: "Dating App Crash",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish:
    "A short scene about a first date planned by an app that keeps crashing—relatable, awkward, and easy to tell at parties.",
  sentences: [
    {
      id: "s1",
      en: "My dating app crashed while booking our first date.",
      keywords: [
        { word: "crash", definition: "to stop working suddenly" },
        { word: "first date", definition: "initial romantic meeting" },
      ],
    },
    {
      id: "s2",
      en: "The app said, 'Error: feelings not found.'",
      keywords: [
        { word: "error", definition: "a mistake or failure" },
        { word: "feelings", definition: "emotions" },
      ],
    },
    {
      id: "s3",
      en: "I joked, 'Okay, we’ll improvise like real people.'",
      keywords: [
        { word: "improvise", definition: "create or perform spontaneously" },
        { word: "joked", definition: "said something funny" },
      ],
    },
    {
      id: "s4",
      en: "She laughed and suggested a walk instead of a fancy restaurant.",
      keywords: [
        { word: "suggest", definition: "propose an idea" },
        { word: "fancy", definition: "elaborate and expensive" },
      ],
    },
    {
      id: "s5",
      en: "We grabbed street tacos and called it 'beta testing.'",
      keywords: [
        { word: "street tacos", definition: "tacos sold by street vendors" },
        { word: "beta testing", definition: "testing software before release" },
      ],
    },
    {
      id: "s6",
      en: "When it rained, I said, 'Patch notes: new weather feature.'",
      keywords: [
        { word: "patch notes", definition: "list of changes in an update" },
        { word: "feature", definition: "a distinct attribute or aspect" },
      ],
    },
    {
      id: "s7",
      en: "She replied, 'Fine, but I'm charging for QA.'",
      keywords: [
        { word: "charging", definition: "demanding payment" },
        { word: "QA", definition: "Quality Assurance (testing)" },
      ],
    },
    {
      id: "s8",
      en: "We both agreed the bug made the date better.",
      keywords: [
        { word: "agree", definition: "have the same opinion" },
        { word: "bug", definition: "error in a computer program" },
      ],
    },
  ],
};
