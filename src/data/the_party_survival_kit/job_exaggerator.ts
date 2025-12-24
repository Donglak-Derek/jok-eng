import { Script } from "@/types";

export const jobExaggerator: Script = {
  id: "party_job_exaggerator",
  type: "story_flow",
  title: "The Job Exaggerator",
  categorySlug: "the_party_survival_kit",
  categoryName: "The Party Survival Kit",
  cleanedEnglish: "Make a boring job sound epic. Turn 'online shopping' into 'logistics management'.",
  icon: "📦",
  context: "Use this when introducing yourself to make a boring topic fun.",
  segments: [
    {
      step: "The Setup",
      text: "I manage high-stakes international logistics...",
      keywords: [
        { word: "high-stakes", definition: "involving serious risks or big consequences" },
        { word: "logistics", definition: "handling the details of an operation" }
      ],
      note: "Sound very serious and professional.",
    },
    {
      step: "The Twist",
      text: "...which mostly means I track my own Amazon packages.",
      keywords: [
        { word: "mostly", definition: "mainly; usually" },
        { word: "track", definition: "to follow the progress of something" },
      ],
      note: "Smile and drop the serious tone.",
    },
    {
      step: "The Punchline",
      text: "It's a stressful life, but someone has to order the vitamins.",
      keywords: [
        { word: "stressful", definition: "causing worry or tension" },
        { word: "order", definition: "to request good or services" },
      ],
      note: "Shrug your shoulders.",
    },
  ],
  sentences: [],
};
