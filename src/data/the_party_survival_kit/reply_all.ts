import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const replyAllApocalypse: Script = {
  id: "story-reply-all",
  title: "The Reply-All Apocalypse",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "advanced",
  cleanedEnglish: "Sending a private rant to the entire company by mistake.",
  imageUrl: "/images/scenarios/reply_all.png",
  difficulty: "Spicy 🌶️🌶️🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "The CEO sent a weird email, and I wanted to joke about it with [my work bestie].",
      keywords: [
        { word: "my work bestie", definition: "Hidden: close colleague" },
      ],
    },
    {
      id: "s2",
      en: "I wrote 'He sounds like a [confused robot]' and hit send.",
      keywords: [
        { word: "confused robot", definition: "Hidden: funny insult" },
      ],
    },
    {
      id: "s3",
      en: "Immediately, my screen flooded with '[out of office]' replies.",
      keywords: [
        { word: "out of office", definition: "Hidden: auto-responses" },
      ],
    },
    {
      id: "s4",
      en: "I realized I had hit [Reply All] instead of Reply.",
      keywords: [
        { word: "Reply All", definition: "Hidden: send to everyone" },
      ],
    },
    {
      id: "s5",
      en: "I prepared my resume because I knew I was [fired].",
      keywords: [
        { word: "fired", definition: "Hidden: losing job" },
      ],
    },
  ],

  culturalNote: {
    title: "Why is this funny?",
    content: "The 'Reply All' fail is a classic corporate horror trope. Calling the CEO a 'confused robot' to the entire company (including the CEO) is basically professional suicide. The flood of 'Out of Office' replies is the signature sign that you just spammed thousands of people."
  },

  quizItems: [
    {
      question: "What is the difference between Reply and Reply All?",
      options: ["No difference", "Reply goes to sender, Reply All goes to everyone copied", "Reply All is safer", "Reply includes emojis"],
      correctIndex: 1,
      explanation: "Reply All copies everyone on the original email thread."
    },
    {
      question: "What did he call the CEO?",
      options: ["A genius", "A confused robot", "A nice guy", "A monster"],
      correctIndex: 1,
      explanation: "He made a joke about the CEO's writing style."
    },
    {
      question: "Why did he prepare his resume?",
      options: ["He wanted a promotion", "He expected to be fired", "He was bored", "It was updated daily"],
      correctIndex: 1,
      explanation: "Insulting the boss in front of the whole company usually leads to termination."
    }
  ]
};
