import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const techInterview: Script = {
  id: "interview-tech",
  title: "Sprint Planning Humor",
  categorySlug: "office_banter",
  categoryName: CATEGORY_NAMES["office_banter"],
  cleanedEnglish:
    "Use light jokes about standups, bugs, and meetings to survive office banter without sounding negative.",
  imageUrl: "/images/scenarios/tech_interview_3d.png",
  // Engagement
  culturalNote: {
    title: "Sprint Planning Rituals",
    content: "Agile rituals (Standup, Planning, Retro) can become monotonous. Using lightweight humor helps the team bond. It transforms the tone from 'a list of complaints' to 'a team solving a puzzle together'. However, avoid cynicism; keep it constructive."
  },
  quizItems: [
    {
      question: "What is the goal of a humorous standup update?",
      options: [
        "To waste time.",
        "To show you are human and relaxed (confident), not stressed.",
        "To make fun of the Product Manager.",
        "To avoid reporting your actual progress."
      ],
      correctIndex: 1,
      explanation: "A relaxed developer is often seen as a senior developer. Panic signals inexperience."
    },
    {
      question: "Why should you 'roast bugs, not teammates'?",
      options: [
        "Teammates have feelings; bugs do not.",
        "It focuses the team against a common enemy (the code), rather than each other.",
        "It makes retrogit spectives safe.",
        "All of the above."
      ],
      correctIndex: 3,
      explanation: "Psychological safety is the #1 predictor of high-performing teams."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "In standup I joke, 'Yesterday I fought with a [semicolon] and lost.'",
      keywords: [
        { word: "standup", definition: "daily team status meeting" },
        { word: "semicolon", definition: "syntax error source" },
      ],
    },
    {
      id: "s2",
      en: "People relax because I'm [honest] but not [whining].",
      keywords: [
        { word: "honest", definition: "truthful" },
        { word: "whining", definition: "complaining annoyingly" },
      ],
    },
    {
      id: "s3",
      en: "When planning, I say, 'Let's give the bug a [cool codename] so we don't fear it.'",
      keywords: [
        { word: "codename", definition: "secret name for a project" },
        { word: "fear", definition: "be anxiety-ridden" },
      ],
    },
    {
      id: "s4",
      en: "It sounds [playful], but we still estimate [honestly].",
      keywords: [
        { word: "estimate", definition: "calculate effort" },
        { word: "playful", definition: "fun and lighthearted" },
      ],
    },
    {
      id: "s5",
      en: "If a PM asks for more scope, I reply, 'Sure, do we unlock a [new team] when we beat this level?'",
      keywords: [
        { word: "scope", definition: "amount of work/features" },
        { word: "level", definition: "stage in a game" },
      ],
    },
    {
      id: "s6",
      en: "They laugh and [clarify priorities].",
      keywords: [
        { word: "clarify", definition: "make clear" },
        { word: "priorities", definition: "most important tasks" },
      ],
    },
    {
      id: "s7",
      en: "During retro, I say, 'Let's [roast bugs], not teammates.'",
      keywords: [
        { word: "retro", definition: "retrospective meeting" },
        { word: "roast", definition: "criticize humorously" },
      ],
    },
    {
      id: "s8",
      en: "That keeps feedback [sharp] but [friendly].",
      keywords: [
        { word: "sharp", definition: "precise/critical" },
        { word: "friendly", definition: "kind and pleasant" },
      ],
    },
    {
      id: "s9",
      en: "Small jokes make meetings feel like [humans talking], not [tickets shouting].",
      keywords: [
        { word: "ticket", definition: "task in Jira" },
        { word: "shouting", definition: "aggressive communication" },
      ],
    },
  ],
};
