import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const nameForget: Script = {
  id: "party-name-forget",
  title: "The Name Game Shame",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "advanced",
  cleanedEnglish: "Meeting someone and forgetting their name 10 seconds later.",
  imageUrl: "/images/scenarios/name_forget.png",
  difficulty: "Medium 🌶️🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "I met a guy at a party and he told me his name was [something simple].",
      keywords: [
        { word: "something simple", definition: "Hidden: easy name" },
      ],
    },
    {
      id: "s2",
      en: "Ten seconds later, my brain was completely [blank].",
      keywords: [
        { word: "blank", definition: "Hidden: empty" },
      ],
    },
    {
      id: "s3",
      en: "I tried to trick him by asking '[How do you spell your name?]' again.",
      keywords: [
        { word: "How do you spell your name?", definition: "Hidden: trick question" },
      ],
    },
    {
      id: "s4",
      en: "He looked at me weirdly and said, '[B-O-B].'",
      keywords: [
        { word: "B-O-B", definition: "Hidden: Bob" },
      ],
    },
    {
      id: "s5",
      en: "I just nodded and said, '[Wow, so unique].'",
      keywords: [
        { word: "Wow, so unique", definition: "Hidden: sarcastic save" },
      ],
    },
  ],

  culturalNote: {
    title: "Why is this funny?",
    content: "Forgetting a name immediately is a common social anxiety. The 'spelling trick' usually works—unless the name is incredibly short and common, like Bob or Tom. Then you look insane for asking how to spell it, and even crazier for calling 'Bob' a unique name."
  },

  quizItems: [
    {
      question: "Why did he ask how to spell the name?",
      options: ["He loves spelling", "To rediscover the name without admitting he forgot", "He was writing a book", "He was drunk"],
      correctIndex: 1,
      explanation: "It's a common social hack to get someone to say their name again."
    },
    {
      question: "What was the name?",
      options: ["Balthazar", "Bob", "Ben", "Bill"],
      correctIndex: 1,
      explanation: "It was 'Bob' - extremely simple."
    },
    {
      question: "Why was the ending sarcastic?",
      options: ["Bob is a rare name", "Bob is a very common name", "He was angry", "He was tired"],
      correctIndex: 1,
      explanation: "Calling 'Bob' unique is clearly a lie because it's one of the most common names in English."
    }
  ]
};
