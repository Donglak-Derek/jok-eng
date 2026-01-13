import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theWrongWave: Script = {
  id: "the_wrong_wave",
  title: "The Wrong Wave",
  type: "script",
  section: "Social Emergencies",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "You wave back at someone enthusiastically, only to realize they were waving at the person behind you.",
  imageUrl: "/images/scenarios/wrong_wave.png",
  mode: "cloze",
  sentences: [
    {
      id: "s1",
      en: "I saw a cute girl [waving] at me from across the street.",
      keywords: [{ word: "waving", definition: "moving hand to say hello" }]
    },
    {
      id: "s2",
      en: "I smiled big and [waved] back.",
      keywords: [{ word: "waved", definition: "past tense of wave" }]
    },
    {
      id: "s3",
      en: "She looked [confused] and pointed behind me.",
      keywords: [{ word: "confused", definition: "unable to understand what is happening" }]
    },
    {
      id: "s4",
      en: "I realized she was looking at her [friend].",
      keywords: [{ word: "friend", definition: "a person one knows and likes" }]
    },
    {
      id: "s5",
      en: "I instantly pretended I was [fixing] my hair.",
      keywords: [{ word: "fixing", definition: "adjusting or repairing" }]
    },
    {
      id: "s6",
      en: "Ideally, I would have [vanished] into thin air.",
      keywords: [{ word: "vanished", definition: "disappeared completely" }]
    },
    {
      id: "s7",
      en: "Instead, I just walked [away] in shame.",
      keywords: [{ word: "away", definition: "to a different place" }]
    }
  ],
  culturalInsights: {
    title: " The Recovery Move",
    content: "When you wave at the wrong person, you have two options: 1. Pretend you were smoothing your hair (the 'slick' move). 2. Commit to the wave and wave at everyone else too (the 'chaos' move)."
  },
  quizItems: [
    {
      question: "What is the classic cover-up for a wrong wave?",
      options: ["Running away", "Pretending to fix your hair", "Yelling 'Stop!'", "Falling down"],
      correctIndex: 1,
      explanation: "Smoothing your hair makes it look like your hand was already up for a reason, saving you a tiny bit of dignity."
    },
    {
      question: "How does the narrator feel at the end?",
      options: ["Proud", "Hungry", "Ashamed", "Excited"],
      correctIndex: 2,
      explanation: "Shame involves feeling humiliated or foolish, which is the standard reaction to this social error."
    }
  ]
};
