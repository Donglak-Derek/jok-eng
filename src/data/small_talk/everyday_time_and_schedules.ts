import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const timeAndSchedules: Script = {
  id: "everyday-time-and-schedules",
  title: "Zoom Buffer Talk",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Light lines for the awkward two minutes before a call starts—keep it breezy, then land on the agenda.",
    imageUrl: "/images/scenarios/small_talk_generic.png",
  sentences: [
    {
      id: "s1",
      en: "Hey! Thanks for hopping on—how's your week going?",
      keywords: [
        { word: "hopping on", definition: "joining the call" },
        { word: "week", definition: "Mon-Fri" },
      ],
    },
    {
      id: "s2",
      en: "I promise this will be quick—no surprise marathons.",
      keywords: [
        { word: "promise", definition: "guarantee" },
        { word: "marathon", definition: "long event" },
      ],
    },
    {
      id: "s3",
      en: "Do you need a minute to close out the last meeting?",
      keywords: [
        { word: "close out", definition: "finish up" },
        { word: "meeting", definition: "session" },
      ],
    },
    {
      id: "s4",
      en: "We’ll wrap by the half-hour so you can escape on time.",
      keywords: [
        { word: "wrap", definition: "finish" },
        { word: "escape", definition: "leave" },
      ],
    },
    {
      id: "s5",
      en: "Where are you calling from today—home base or office?",
      keywords: [
        { word: "calling from", definition: "location" },
        { word: "home base", definition: "home office" },
      ],
    },
    {
      id: "s6",
      en: "If my Wi‑Fi acts up, I'll switch to audio.",
      keywords: [
        { word: "acts up", definition: "malfunctions" },
        { word: "switch to", definition: "change to" },
      ],
    },
    {
      id: "s7",
      en: "Shall we start with a quick recap and then decisions?",
      keywords: [
        { word: "recap", definition: "summary" },
        { word: "decision", definition: "conclusion" },
      ],
    },
    {
      id: "s8",
      en: "Great, let's dive in before the calendar monster grabs us.",
      keywords: [
        { word: "dive in", definition: "get started" },
        { word: "calendar", definition: "schedule" },
      ],
    },
  ],
};
