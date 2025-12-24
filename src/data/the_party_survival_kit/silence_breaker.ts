import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const silenceBreaker: Script = {
  id: "standup-silence-breaker",
  title: "The Silence Breaker",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish:
    "When conversation dies, don't talk about the weather. Use this line to bond over shared awkwardness.",
  icon: "🦗",
  sentences: [
    {
      id: "sb1",
      en: "The silence is getting loud, so I just smile.",
      keywords: [
        { word: "silence", definition: "complete absence of sound" },
        { word: "loud", definition: "intense or noticeable" },
      ],
    },
    {
      id: "sb2",
      en: "I don't say 'Nice weather,' because that's boring.",
      keywords: [
        { word: "boring", definition: "not interesting; dull" },
      ],
    },
    {
      id: "sb3",
      en: "Instead, I ask: 'On a scale of 1 to 10, how much do we regret not staying home?'",
      keywords: [
        { word: "scale", definition: "a range of values for measuring" },
        { word: "regret", definition: "feel sad or disappointed about" },
      ],
    },
    {
      id: "sb4",
      en: "It works because it's honest and relatable.",
      keywords: [
        { word: "relatable", definition: "easy to understand and connect with" },
      ],
    },
    {
      id: "sb5",
      en: "If they say '10', I say 'Let's order pizza here.'",
      keywords: [
        { word: "order", definition: "request food or drink" },
      ],
    },
  ],
};
