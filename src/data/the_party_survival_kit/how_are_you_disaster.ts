import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const howAreYouDisaster: Script = {
  id: "story-how-are-you",
  title: "The 'How Are You' Essay",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "basics",
  cleanedEnglish: "When 'small talk' accidentally becomes a therapy session.",
  imageUrl: "/images/scenarios/how_are_you.png",
  difficulty: "Medium 🌶️🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "My boss passed my desk and asked '[How are you?]' without stopping.",
      keywords: [
        { word: "How are you?", definition: "Hidden: Hello" },
      ],
    },
    {
      id: "s2",
      en: "I stood up and began explaining my [chronic back pain].",
      keywords: [
        { word: "chronic back pain", definition: "Hidden: personal medical issue" },
      ],
    },
    {
      id: "s3",
      en: "He kept walking, but I shouted '[And my cat is sick!]' down the hall.",
      keywords: [
        { word: "And my cat is sick!", definition: "Hidden: TMI (Too Much Information)" },
      ],
    },
    {
      id: "s4",
      en: "The entire office went [silent].",
      keywords: [
        { word: "silent", definition: "Hidden: awkward quiet" },
      ],
    },
    {
      id: "s5",
      en: "I learned that 'How are you' actually just means '[Hi]'.",
      keywords: [
        { word: "Hi", definition: "Hidden: simple greeting" },
      ],
    },
  ],

  culturalNote: {
    title: "Why is this funny?",
    content: "In English-speaking professional cultures, 'How are you?' is a greeting, not a question. The only correct answer is 'Good, you?'. Actual life updates are considered 'oversharing' and make people uncomfortable. The narrator failing to realize the boss wasn't even stopping to listen adds to the physical comedy."
  },

  quizItems: [
    {
      question: "What is the correct answer to 'How are you?' at work?",
      options: ["A detailed medical report", "Good, how are you?", "Silence", "A list of grievances"],
      correctIndex: 1,
      explanation: "It's a phatic expression—a social lubricant with no deep meaning."
    },
    {
      question: "Why did the boss keep walking?",
      options: ["He hated the narrator", "He was rude", "He was just saying hello", "He was deaf"],
      correctIndex: 2,
      explanation: "He didn't expect an answer because he was just acknowledging the narrator's presence."
    },
    {
      question: "What does TMI stand for?",
      options: ["Too Many Items", "Too Much Information", "Time Money Interest", "Tuesday Morning Intel"],
      correctIndex: 1,
      explanation: "We use TMI when someone shares personal details that make things awkward."
    }
  ]
};
