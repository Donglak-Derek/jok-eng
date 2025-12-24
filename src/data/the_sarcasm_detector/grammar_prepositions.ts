import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const prepositionsPractice: Script = {
  id: "grammar-prepositions",
  title: "Prepositions Practice",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Practice common prepositions like at, in, on, to, for, about, and of. These small words change meaning a lot, so correct use is important.",
  sentences: [
    {
      id: "s1",
      en: "I’m good at making furniture.",
      keywords: [
        { word: "good at", definition: "skilled in" },
        { word: "furniture", definition: "movable articles" },
      ],
    },
    {
      id: "s2",
      en: "She is interested in Korean culture.",
      keywords: [
        { word: "interested in", definition: "want to know about" },
        { word: "culture", definition: "social behavior" },
      ],
    },
    {
      id: "s3",
      en: "They live in Texas.",
      keywords: [
        { word: "live in", definition: "reside within" },
        { word: "Texas", definition: "state in USA" },
      ],
    },
    {
      id: "s4",
      en: "The meeting is at 3 p.m.",
      keywords: [
        { word: "meeting", definition: "scheduled gathering" },
        { word: "at", definition: "specific time indicator" },
      ],
    },
    {
      id: "s5",
      en: "The book is on the table.",
      keywords: [
        { word: "book", definition: "written work" },
        { word: "on", definition: "positioned above" },
      ],
    },
    {
      id: "s6",
      en: "Can you send this email to me?",
      keywords: [
        { word: "send to", definition: "transmit towards" },
        { word: "email", definition: "electronic mail" },
      ],
    },
    {
      id: "s7",
      en: "This gift is for you.",
      keywords: [
        { word: "gift", definition: "present" },
        { word: "for", definition: "intended recipient indicator" },
      ],
    },
    {
      id: "s8",
      en: "We talked about the new project.",
      keywords: [
        { word: "talk about", definition: "discuss" },
        { word: "project", definition: "planned undertaking" },
      ],
    },
    {
      id: "s9",
      en: "This is the cover of the book.",
      keywords: [
        { word: "cover of", definition: "outside part belonging to" },
        { word: "book", definition: "written work" },
      ],
    },
    {
      id: "s10",
      en: "She is afraid of spiders.",
      keywords: [
        { word: "afraid of", definition: "frightened by" },
        { word: "spider", definition: "eight-legged arachnid" },
      ],
    },
    {
      id: "s11",
      en: "I will meet you at the station.",
      keywords: [
        { word: "meet at", definition: "gather at location" },
        { word: "station", definition: "train/bus stop" },
      ],
    },
    {
      id: "s12",
      en: "He put the phone in his pocket.",
      keywords: [
        { word: "put in", definition: "place inside" },
        { word: "pocket", definition: "clothing bag" },
      ],
    },
    {
      id: "s13",
      en: "The picture is on the wall.",
      keywords: [
        { word: "picture", definition: "image" },
        { word: "wall", definition: "vertical side of room" },
      ],
    },
    {
      id: "s14",
      en: "I’m looking forward to the weekend.",
      keywords: [
        { word: "look forward to", definition: "await with excitement" },
        { word: "weekend", definition: "Sat/Sun" },
      ],
    },
    {
      id: "s15",
      en: "Thank you for your help.",
      keywords: [
        { word: "thank for", definition: "express gratitude for" },
        { word: "help", definition: "assistance" },
      ],
    },
  ],
};
