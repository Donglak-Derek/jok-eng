import { Script } from "@/types";

export const storyConstructionScript: Script = {
  id: "party_01",
  type: "story_flow",
  title: "The 'Where are you from?' Deflector",
  categorySlug: "the_party_survival_kit",
  categoryName: "The Party Survival Kit",
  cleanedEnglish: "The Story Construction: Break a story into Hook -> Context -> Punchline.",
  icon: "🌏",
  context: "Use this when someone asks where you are from, but you want to be funny, not boring.",
  segments: [
    {
      step: "The Setup",
      text: "I'm from Korea...",
      note: "Say this normally.",
    },
    {
      step: "The Twist",
      text: "...which means I'm legally required to be good at StarCraft.",
      note: "Pause for 1 second before saying 'StarCraft'.",
    },
    {
      step: "The Punchline",
      text: "But honestly? I lose to easy bots.",
      note: "Say this with a sigh/disappointed face.",
    },
  ],
  sentences: [], // Empty for story_flow type
};
