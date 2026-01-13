import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theElevatorFart: Script = {
  id: "the_elevator_fart",
  title: "The Elevator Fart",
  type: "script",
  section: "Social Emergencies",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "You are trapped in a metal box with strangers and a bad smell. Here is how to survive the silence.",
  imageUrl: "/images/scenarios/elevator_fart.png",
  mode: "cloze",
  sentences: [
    {
      id: "s1",
      en: "I was in a crowded elevator going to the 30th floor.",
      keywords: []
    },
    {
      id: "s2",
      en: "Suddenly, a terrible smell filled the [trapped] space.",
      keywords: [{ word: "trapped", definition: "unable to escape" }]
    },
    {
      id: "s3",
      en: "Everyone stayed completely [silent].",
      keywords: [{ word: "silent", definition: "making no noise" }]
    },
    {
      id: "s4",
      en: "I tried not to make eye contact with the [culprit].",
      keywords: [{ word: "culprit", definition: "the person responsible for a crime or bad act" }]
    },
    {
      id: "s5",
      en: "The man next to me started [coughing] loudly to cover it up.",
      keywords: [{ word: "coughing", definition: "expelling air from the lungs abruptly" }]
    },
    {
      id: "s6",
      en: "We all [ignored] the reality until the doors opened.",
      keywords: [{ word: "ignored", definition: "refused to take notice of" }]
    },
    {
      id: "s7",
      en: "I have never walked [out] of a building so fast.",
      keywords: [{ word: "out", definition: "away from the inside" }]
    }
  ],
  culturalInsights: {
    title: "Elevator Etiquette",
    content: "In an elevator, the social rule is 'ignore everything'. If someone farts, no one acknowledges it. To say something would be more awkward than the smell itself."
  },
  quizItems: [
    {
      question: "What is the 'Golden Rule' of elevator farts?",
      options: ["Point at the person", "Laugh loudly", "Ignore it completely", "Pull the emergency alarm"],
      correctIndex: 2,
      explanation: "Acknowledging the smell breaks the social contract of the elevator. Silence is the only polite option."
    },
    {
      question: "Why did the man start coughing?",
      options: ["He was sick", "To make noise and cover the awkwardness", "To ask for help", "He was allergic to elevators"],
      correctIndex: 1,
      explanation: "People sometimes make unnecessary noise (coughing, shifting feet) to break the tension of an awkward silence."
    }
  ]
};
