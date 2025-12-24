import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const karenDiffuser: Script = {
  id: "karen-diffuser",
  title: "The 'Karen' Diffuser",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish:
    "How to complain to customer service without being a 'Karen'. Alternates between what NOT to say (Rude) and what TO say (Polite).",
  sentences: [
    {
      id: "s1_rude",
      en: "Rude: 'This milk is expired. It's disgusting.'",
      keywords: [
        { word: "disgusting", definition: "causing strong dislike" },
        { word: "expired", definition: "past its valid period" },
      ],
    },
    {
      id: "s1_polite",
      en: "Polite: 'Hey, so sorry to be that guy, but I think this milk is expired.'",
      keywords: [
        { word: "that guy", definition: "annoying person who complains" },
      ],
    },
    {
      id: "s2_rude",
      en: "Rude: 'You messed up my order. Fix it.'",
      keywords: [
        { word: "messed up", definition: "made a mistake" },
        { word: "fix it", definition: "correct the problem" },
      ],
    },
    {
      id: "s2_polite",
      en: "Polite: 'I think this might be different from what I ordered. Could we double check?'",
      keywords: [
        { word: "double check", definition: "verify again" },
      ],
    },
    {
      id: "s3_rude",
      en: "Rude: 'Why is this taking so long? Hurry up.'",
      keywords: [
        { word: "hurry up", definition: "do it faster" },
      ],
    },
    {
      id: "s3_polite",
      en: "Polite: 'Just checking on the status of my order, I have to run soon.'",
      keywords: [
        { word: "status", definition: "current situation" },
        { word: "run", definition: "leave quickly" },
      ],
    },
    {
      id: "s4_rude",
      en: "Rude: 'The price on the shelf was different. You're ripping me off.'",
      keywords: [
        { word: "rip off", definition: "cheat someone financially" },
      ],
    },
    {
      id: "s4_polite",
      en: "Polite: 'I vividly remember seeing a different price on the shelf. Can we verify?'",
      keywords: [
        { word: "vividly", definition: "clearly and in detail" },
        { word: "verify", definition: "check if true" },
      ],
    },
    {
      id: "s5_rude",
      en: "Rude: 'This food is cold. I'm not paying for this.'",
      keywords: [
        { word: "paying", definition: "giving money" },
      ],
    },
    {
      id: "s5_polite",
      en: "Polite: 'The dish seems a bit under temperature. Could it be warmed up?'",
      keywords: [
        { word: "under temperature", definition: "not hot enough" },
        { word: "warm up", definition: "make hot again" },
      ],
    },
  ],
};
