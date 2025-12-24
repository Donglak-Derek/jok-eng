import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const busStop: Script = {
  id: "standup-bus-stop",
  title: "The Party Survival Story",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish:
    "A go-to story for bars, parties, and group dinners so you don’t freeze—self-aware, short, and ends with a playful twist instead of an awkward silence.",
  icon: "🚌",
  sentences: [
    {
      id: "s1",
      en: "I keep one short story ready for parties so I don't freeze.",
      keywords: [
        { word: "freeze", definition: "become unable to move or speak" },
        { word: "ready", definition: "fully prepared" },
      ],
    },
    {
      id: "s2",
      en: "It starts simple: 'I got on the wrong bus once.'",
      keywords: [
        { word: "wrong", definition: "incorrect; not right" },
        { word: "once", definition: "at one time in the past" },
      ],
    },
    {
      id: "s3",
      en: "People lean in because everyone has a travel mistake.",
      keywords: [
        { word: "lean in", definition: "move forward to listen closely" },
        { word: "mistake", definition: "an error or bad judgement" },
      ],
    },
    {
      id: "s4",
      en: "I add a quick joke: 'The sign said Dogs Only. I barked to be polite.'",
      keywords: [
        { word: "sign", definition: "notice giving information" },
        { word: "polite", definition: "showing good manners" },
      ],
    },
    {
      id: "s5",
      en: "They laugh because it's self-deprecating and short.",
      keywords: [
        { word: "self-deprecating", definition: "modest about oneself" },
        { word: "short", definition: "brief in duration" },
      ],
    },
    {
      id: "s6",
      en: "Then I pivot: 'Anyway, what’s your best wrong-turn story?'",
      keywords: [
        { word: "pivot", definition: "to change direction/topic" },
        { word: "wrong-turn", definition: "going the wrong way" },
      ],
    },
    {
      id: "s7",
      en: "Now they talk, and I sip my drink like a pro emcee.",
      keywords: [
        { word: "emcee", definition: "host of an event (MC)" },
        { word: "sip", definition: "drink slowly" },
      ],
    },
    {
      id: "s8",
      en: "If it flops, I just point at the DJ and cheer.",
      keywords: [
        { word: "flop", definition: "fail completely" },
        { word: "cheer", definition: "shout for encouragement" },
      ],
    },
  ],
};
