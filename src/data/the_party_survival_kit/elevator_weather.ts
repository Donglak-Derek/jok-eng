import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const elevatorWeather: Script = {
  id: "party-elevator-weather",
  title: "The Elevator Weather Bot",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "basics",
  cleanedEnglish: "When you run out of things to say and become a meteorologist.",
  imageUrl: "/images/scenarios/elevator_weather_3d.png",
  difficulty: "Mild 🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "I was stuck in the elevator with my [neighbor] for 10 floors.",
      keywords: [
        { word: "neighbor", definition: "Hidden: live next door" },
      ],
    },
    {
      id: "s2",
      en: "The silence was [deafening].",
      keywords: [
        { word: "deafening", definition: "Hidden: extremely loud (ironic)" },
      ],
    },
    {
      id: "s3",
      en: "So I looked at the ceiling and said, '[Sure is using the weather].'",
      keywords: [
        { word: "Sure is using the weather", definition: "Hidden: nonsense phrase" },
      ],
    },
    {
      id: "s4",
      en: "My brain meant to say 'Sure is nice weather', but it [short-circuited].",
      keywords: [
        { word: "short-circuited", definition: "Hidden: stopped working" },
      ],
    },
    {
      id: "s5",
      en: "He nodded slowly and replied, '[Absolutely].'",
      keywords: [
        { word: "Absolutely", definition: "Hidden: total agreement" },
      ],
    },
  ],

  culturalInsights: {
    title: "Why is this funny?",
    content: "Elevator silence is physically painful for many people. We feel forced to make 'Small Talk', usually about the weather. The joke here is the 'brain short-circuit'—generating a sentence that means nothing ('Sure is using the weather'), and the neighbor politely agreeing anyway just to survive the interaction."
  },

  quizItems: [
    {
      question: "What does 'deafening silence' mean?",
      options: ["The elevator was broken", "The silence was very noticeable and uncomfortable", "Everyone was shouting", "They were deaf"],
      correctIndex: 1,
      explanation: "It's an oxymoron. It means the silence feels heavy and loud because of the awkwardness."
    },
    {
      question: "What happens when a brain 'short-circuits' (idiom)?",
      options: ["You die", "You get a headache", "You stop thinking clearly/make a mistake", "You become a robot"],
      correctIndex: 2,
      explanation: "Like an electrical glich, it means your thought process was interrupted or confused."
    },
    {
      question: "Why did the neighbor agree?",
      options: ["The weather was using them", "He understood the code", "He just wanted to be polite", "He was crazy"],
      correctIndex: 2,
      explanation: "In polite society, we often agree with nonsense just to avoid conflict or awkward questions."
    }
  ]
};
