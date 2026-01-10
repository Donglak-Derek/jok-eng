import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const officePrinter: Script = {
  id: "skit-office-printer",
  title: "The Offline Date",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish:
    "A short scene about a first date planned by an app that keeps crashing—relatable, awkward, and easy to tell at parties.",
    imageUrl: "/images/scenarios/the_offline_date.png",
  mode: "cloze",
  sentences: [
    {
      id: "s1",
      en: "My [dating app] crashed while booking our first date.",
      keywords: [
        { word: "dating app", definition: "mobile application for dating" },
      ],
    },
    {
      id: "s2",
      en: "The app said, '[Error]: feelings not found.'",
      keywords: [
        { word: "Error", definition: "a mistake or failure" },
      ],
    },
    {
      id: "s3",
      en: "I joked, 'Okay, we’ll [improvise] like real people.'",
      keywords: [
        { word: "improvise", definition: "create or perform spontaneously" },
      ],
    },
    {
      id: "s4",
      en: "She laughed and suggested a walk instead of a [fancy restaurant].",
      keywords: [
        { word: "fancy restaurant", definition: "expensive and formal dining place" },
      ],
    },
    {
      id: "s5",
      en: "We grabbed street tacos and called it '[beta testing].'",
      keywords: [
        { word: "beta testing", definition: "testing software before release" },
      ],
    },
    {
      id: "s6",
      en: "When it rained, I said, '[Patch notes]: new weather feature.'",
      keywords: [
        { word: "Patch notes", definition: "list of changes in an update" },
      ],
    },
    {
      id: "s7",
      en: "She replied, 'Fine, but I'm charging for [QA].'",
      keywords: [
        { word: "QA", definition: "Quality Assurance (testing)" },
      ],
    },
    {
      id: "s8",
      en: "We both agreed the [bug] made the date better.",
      keywords: [
        { word: "bug", definition: "error in a computer program" },
      ],
    },
  ],
  culturalNote: {
    title: "The Tech Metaphor",
    content: "This scenario is funny because it treats a romantic date like a piece of software. Terms like 'beta testing' (trying something new), 'patch notes' (updates), and 'QA' (testing for quality) are usually used for coding, not dating. It shows two 'nerdy' people bonding over their shared awkwardness."
  },
  quizItems: [
    {
      question: "What happened to the dating app?",
      options: ["It found a match", "It crashed", "It asked for money", "It deleted the account"],
      correctIndex: 1,
      explanation: "The story starts with the app crashing (stopping working) right before their date."
    },
    {
      question: "What did they call the street tacos?",
      options: ["Dinner", "Beta testing", "The main event", "A mistake"],
      correctIndex: 1,
      explanation: "They jokingly called the tacos 'beta testing', implying the date was a rough, early version of a relationship."
    },
    {
      question: "Why did she mention 'QA'?",
      options: ["She wanted to be paid for testing the 'date'", "She works in QA", "She didn't like the rain", "She was bored"],
      correctIndex: 0,
      explanation: "She joked that if the date was software (with 'weather features' like rain), she should be paid for Quality Assurance testing."
    }
  ]
};
