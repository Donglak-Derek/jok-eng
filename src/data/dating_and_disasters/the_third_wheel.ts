import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theThirdWheel: Script = {
  id: "the_third_wheel",
  title: "The Third Wheel",
  type: "script",
  section: "Social Emergencies",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Stuck with a couple who is fighting or making out? Here is your exit strategy.",
  imageUrl: "/images/scenarios/third_wheel.png",
  mode: "cloze",
  sentences: [
    {
      id: "s1",
      en: "I was having dinner with my friend and her [new boyfriend].",
      keywords: [{ word: "new boyfriend", definition: "fresh romantic partner" }],
    },
    {
      id: "s2",
      en: "They started [feeding] each other dessert.",
      keywords: [{ word: "feeding", definition: "putting food in someone else's mouth" }],
    },
    {
      id: "s3",
      en: "I became the invisible [third wheel].",
      keywords: [{ word: "third wheel", definition: "unwanted extra person with a couple" }],
    },
    {
      id: "s4",
      en: "Then they began to [argue] about his ex.",
      keywords: [{ word: "argue", definition: "fight verbally" }],
    },
    {
      id: "s5",
      en: "I pulled out my phone and [scrolled] aggressively.",
      keywords: [{ word: "scrolled", definition: "looking through content on a phone screen" }],
    },
    {
      id: "s6",
      en: "Finally, I said, 'I have to go walk my [goldfish].'",
      keywords: [{ word: "goldfish", definition: "a fish (classic fake excuse)" }],
    },
    {
      id: "s7",
      en: "They didn't even [notice] I left.",
      keywords: [{ word: "notice", definition: "Hidden: realize I was gone" }],
    },
  ],
  culturalInsights: {
    title: "Third Wheeling",
    content: "Being a 'Third Wheel' is universally awkward. If the couple ignores you (to fight or flirt), it's socially acceptable to leave early. Crazy excuses like 'walking my fish' are a funny way to signal 'I need to escape now'."
  },
  quizItems: [
    {
      question: "What is a 'Third Wheel'?",
      options: ["A tricycle part", "An extra person with a couple", "A lucky person", "A waiter"],
      correctIndex: 1,
      explanation: "It refers to the extra wheel that isn't needed on a bicycle (two wheels), representing the awkward extra person."
    },
    {
      question: "Why did the narrator say they had to 'walk their goldfish'?",
      options: ["They own a fish walking leash", "It was a real emergency", "It was a ridiculous excuse to leave", "They were drunk"],
      correctIndex: 2,
      explanation: "You can't walk a fish. It's a joke excuse to show how desperate they were to leave."
    }
  ]
};
