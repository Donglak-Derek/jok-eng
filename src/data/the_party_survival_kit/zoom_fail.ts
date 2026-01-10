import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const zoomFail: Script = {
  id: "story-zoom-fail",
  title: "The Zoom Mute Disaster",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "advanced",
  cleanedEnglish: "The modern horror story of thinking you are muted when you are definitely not.",
  imageUrl: "/images/scenarios/zoom_fail.png",
  difficulty: "Medium 🌶️🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "During the company all-hands meeting, my cat [knocked over] my coffee.",
      keywords: [
        { word: "knocked over", definition: "Hidden: pushed down" },
      ],
    },
    {
      id: "s2",
      en: "I shouted, '[Get out of here, you monster!]' at the top of my lungs.",
      keywords: [
        { word: "monster", definition: "Hidden: scary creature" },
      ],
    },
    {
      id: "s3",
      en: "Then I saw the CEO pause and ask, '[Is there a problem, Dave?]' associated with me.",
      keywords: [
        { word: "Is there a problem", definition: "Hidden: asking about issue" },
      ],
    },
    {
      id: "s4",
      en: "I wasn't on [mute].",
      keywords: [
        { word: "mute", definition: "Hidden: microphone off" },
      ],
    },
    {
      id: "s5",
      en: "I had to explain I was talking to a cat, not [the boss].",
      keywords: [
        { word: "the boss", definition: "Hidden: manager / CEO" },
      ],
    },
  ],

  culturalNote: {
    title: "Why is this funny?",
    content: "Since remote work became common, the 'hot mic' (unmuted microphone) is a classic fear. Shouting insults at a pet while your boss thinks you are shouting at *them* is the ultimate workplace nightmare. 'Monster' is a funny exaggeration for a cat, but a terrible thing to call a CEO."
  },

  quizItems: [
    {
      question: "What was the 'monster'?",
      options: ["The CEO", "The Cat", "The Coffee", "Dave"],
      correctIndex: 1,
      explanation: "He was yelling at his clumsy cat."
    },
    {
      question: "What does 'on mute' mean?",
      options: ["Can't speak", "Microphone is disabled", "Camera is off", "Internet is down"],
      correctIndex: 1,
      explanation: "It means no one can hear you."
    },
    {
      question: "Why did the CEO pause?",
      options: ["He hates cats", "He heard someone yelling insults", "His video froze", "He needed coffee"],
      correctIndex: 1,
      explanation: "The narrator yelled 'Get out of here you monster' so loud it interrupted the meeting."
    }
  ]
};
