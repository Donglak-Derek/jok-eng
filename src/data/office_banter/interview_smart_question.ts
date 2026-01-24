import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const interviewSmartQuestion: Script = {
  id: "interview-smart-question",
  title: "Banter With the PM",
  categorySlug: "office_banter",
  categoryName: CATEGORY_NAMES["office_banter"],
  cleanedEnglish:
    "How to joke with a PM about bugs, show you’re not defensive, and still look like the teammate they want to work with.",
  imageUrl: "/images/scenarios/pm_banter_3d.png",
  // Engagement
  culturalInsights: {
    title: "Product Managers vs. Engineers",
    content: "The relationship between PMs and Engineers is famous for its tension. PMs want things 'fast and perfect'; Engineers want things 'stable and realistic'. Humor is the best bridge. Joking about bugs or scope creep relieves tension and builds camaraderie."
  },
  quizItems: [
    {
      question: "Why should you joke about bugs instead of getting defensive?",
      options: [
        "Because bugs are funny.",
        "To show you don't care.",
        "To show confidence and that you aren't hiding anything.",
        "To blame the QA team."
      ],
      correctIndex: 2,
      explanation: "Defensiveness suggests unparalleled insecurity. Humor suggests you are in control."
    },
    {
      question: "What is the 'perfect' project?",
      options: [
        "One with no bugs.",
        "One that ships on time.",
        "A myth. Real projects always have trade-offs.",
        "Your first project."
      ],
      correctIndex: 2,
      explanation: "Acknowledging that 'perfect slides' aren't 'real life' shows maturity."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "PMs always ask about bugs like they're [ordering coffee].",
      keywords: [
        { word: "ordering coffee", definition: "casually, without stress" },
        { word: "PM", definition: "Product Manager" },
      ],
    },
    {
      id: "s2",
      en: "I smile and say, 'Great, which bug is your [favorite child]?'",
      keywords: [
        { word: "favorite child", definition: "preferred above all others (joke)" },
        { word: "defensive", definition: "overly sensitive" },
      ],
    },
    {
      id: "s3",
      en: "They laugh because I’m [not defensive].",
      keywords: [
        { word: "not defensive", definition: "Hidden: accepting feedback" },
        { word: "defensive", definition: "protecting oneself from criticism" },
        { word: "camaraderie", definition: "friendship and trust" },
      ],
    },
    {
      id: "s4",
      en: "Then I ask, 'What’s one bug we can [leave unfixed] to tell stories about later?'",
      keywords: [
        { word: "leave unfixed", definition: "Hidden: allow small flaws" },
        { word: "unfixed", definition: "not repaired" },
        { word: "legacy", definition: "long-lasting impact" },
      ],
    },
    {
      id: "s5",
      en: "That question shows I'm okay with [real life], not just [perfect slides].",
      keywords: [
        { word: "real life", definition: "actual reality, not theory" },
        { word: "perfect slides", definition: "idealized presentation" },
      ],
    },
    {
      id: "s6",
      en: "They usually say, 'We’ll [ship] with fewer surprises.'",
      keywords: [
        { word: "ship", definition: "release software to users" },
        { word: "surprises", definition: "unexpected bugs" },
      ],
    },
    {
      id: "s7",
      en: "Now we’re joking [together], not fighting about [blame].",
      keywords: [
        { word: "together", definition: "Hidden: shared experience" },
        { word: "blame", definition: "Hidden: finding fault" },
        { word: "blame", definition: "responsibility for a fault" },
        { word: "us vs them", definition: "divisive mindset" },
      ],
    },
    {
      id: "s8",
      en: "We finish with, 'Cool, let's kill the worst bug and [roast] the rest later.'",
      keywords: [
        { word: "roast", definition: "criticize humorously" },
        { word: "prioritize", definition: "do first things first" },
      ],
    },
  ],
};
