import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const interviewSmartQuestion: Script = {
  id: "interview-smart-question",
  title: "Banter With the PM",
  categorySlug: "office_banter",
  categoryName: CATEGORY_NAMES["office_banter"],
  cleanedEnglish:
    "How to joke with a PM about bugs, show you’re not defensive, and still look like the teammate they want to work with.",
  sentences: [
    {
      id: "s1",
      en: "PMs always ask about bugs like they're ordering coffee.",
      keywords: [
        { word: "PM", definition: "Product Manager" },
        { word: "bug", definition: "software error" },
      ],
    },
    {
      id: "s2",
      en: "I smile and say, 'Great, which bug is your favorite child?'",
      keywords: [
        { word: "favorite", definition: "preferred above all others" },
        { word: "smile", definition: "facial expression of happiness" },
      ],
    },
    {
      id: "s3",
      en: "They laugh because I’m not defensive.",
      keywords: [
        { word: "defensive", definition: "overly sensitive to criticism" },
        { word: "laugh", definition: "make sounds of amusement" },
      ],
    },
    {
      id: "s4",
      en: "Then I ask, 'What’s one bug we can leave unfixed to tell stories about later?'",
      keywords: [
        { word: "unfixed", definition: "not repaired" },
        { word: "later", definition: "at a future time" },
      ],
    },
    {
      id: "s5",
      en: "That question shows I'm okay with real life, not just perfect slides.",
      keywords: [
        { word: "real life", definition: "actual reality, not theory" },
        { word: "perfect", definition: "flawless" },
      ],
    },
    {
      id: "s6",
      en: "They usually say, 'We’ll ship with fewer surprises.'",
      keywords: [
        { word: "ship", definition: "release software to users" },
        { word: "surprise", definition: "unexpected event" },
      ],
    },
    {
      id: "s7",
      en: "Now we’re joking together, not fighting about blame.",
      keywords: [
        { word: "blame", definition: "responsibility for a fault" },
        { word: "together", definition: "with each other" },
      ],
    },
    {
      id: "s8",
      en: "We finish with, 'Cool, let's kill the worst bug and roast the rest later.'",
      keywords: [
        { word: "finish", definition: "bring to an end" },
        { word: "roast", definition: "criticize humorously" },
      ],
    },
  ],
};
