import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const teamworkCollaboration: Script = {
  id: "everyday-teamwork-collaboration",
  title: "Teamwork and Collaboration",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Practice how to work together by offering help, asking politely, and suggesting ideas. These sentences are useful at work and in daily life.",
    imageUrl: "/images/scenarios/small_talk_generic.png",
  sentences: [
    {
      id: "s1",
      en: "Should we move this together?",
      keywords: [
        { word: "move", definition: "change place" },
        { word: "together", definition: "as a group" },
      ],
    },
    {
      id: "s2",
      en: "Do you need any help?",
      keywords: [
        { word: "help", definition: "assistance" },
        { word: "need", definition: "require" },
      ],
    },
    {
      id: "s3",
      en: "Can I give you a hand?",
      keywords: [
        { word: "give a hand", definition: "assist something" },
        { word: "can I", definition: "may I" },
      ],
    },
    {
      id: "s4",
      en: "Let’s finish this together.",
      keywords: [
        { word: "finish", definition: "complete" },
        { word: "together", definition: "jointly" },
      ],
    },
    {
      id: "s5",
      en: "Could you hold this for me?",
      keywords: [
        { word: "hold", definition: "grasp / support" },
        { word: "for me", definition: "on my behalf" },
      ],
    },
    {
      id: "s6",
      en: "I’ll take care of this part.",
      keywords: [
        { word: "take care of", definition: "handle" },
        { word: "part", definition: "section" },
      ],
    },
    {
      id: "s7",
      en: "Can you check if this is straight?",
      keywords: [
        { word: "check", definition: "inspect" },
        { word: "straight", definition: "not crooked" },
      ],
    },
    {
      id: "s8",
      en: "What do you think about this idea?",
      keywords: [
        { word: "think", definition: "believe / opine" },
        { word: "idea", definition: "concept" },
      ],
    },
    {
      id: "s9",
      en: "Maybe we should try another way.",
      keywords: [
        { word: "try", definition: "attempt" },
        { word: "another way", definition: "different method" },
      ],
    },
    {
      id: "s10",
      en: "I’ll help you lift this side.",
      keywords: [
        { word: "lift", definition: "raise up" },
        { word: "side", definition: "edge/end" },
      ],
    },
    {
      id: "s11",
      en: "Let’s take a short break together.",
      keywords: [
        { word: "break", definition: "rest period" },
        { word: "short", definition: "brief" },
      ],
    },
    {
      id: "s12",
      en: "Could you show me how you did it?",
      keywords: [
        { word: "show", definition: "demonstrate" },
        { word: "how", definition: "in what way" },
      ],
    },
    {
      id: "s13",
      en: "That looks heavy. Do you want help?",
      keywords: [
        { word: "heavy", definition: "having great weight" },
        { word: "looks", definition: "appears" },
      ],
    },
    {
      id: "s14",
      en: "Let’s talk and plan before we start.",
      keywords: [
        { word: "plan", definition: "strategize" },
        { word: "before", definition: "prior to" },
      ],
    },
    {
      id: "s15",
      en: "We can finish faster if we work together.",
      keywords: [
        { word: "faster", definition: "more quickly" },
        { word: "work together", definition: "collaborate" },
      ],
    },
  ],
};
