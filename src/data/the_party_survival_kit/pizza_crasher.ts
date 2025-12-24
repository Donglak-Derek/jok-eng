import { Script } from "@/types";

export const pizzaCrasher: Script = {
  id: "party_pizza_crasher",
  type: "story_flow",
  title: "The Pizza Crasher",
  categorySlug: "the_party_survival_kit",
  categoryName: "The Party Survival Kit",
  cleanedEnglish: "How do you know the host? A funny way to admit you don't really know anyone.",
  icon: "🍕",
  context: "Use this when someone asks 'How do you know the host?' and you want to be funny.",
  segments: [
    {
      step: "The Setup",
      text: "I told everyone I'm the host's distant cousin...",
      keywords: [{ word: "distant cousin", definition: "a relative who is not closely related" }],
      note: "Whisper this like a secret.",
    },
    {
      step: "The Twist",
      text: "...but actually, I just followed the smell of free pizza.",
      keywords: [
        { word: "actually", definition: "in fact; truthfully" },
        { word: "smell", definition: "scent or odor" },
      ],
      note: "Point to your nose or the food table.",
    },
    {
      step: "The Punchline",
      text: "Don't tell anyone, or I'll have to share my slice.",
      keywords: [
        { word: "share", definition: "give a portion to others" },
        { word: "slice", definition: "a piece cut from something" },
      ],
      note: "Wink or make a 'shh' gesture.",
    },
  ],
  sentences: [],
};
