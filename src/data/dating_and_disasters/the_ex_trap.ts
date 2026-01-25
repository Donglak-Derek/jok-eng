import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theExTrap: Script = {
  id: "date_ex_trap",
  title: "The 'Ex' Trap",
  section: "The Dating Minefield",
  type: "decoder",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Talking about exes is a minefield. Here is how to spot the explosions before they happen.",
  sentences: [],
    imageUrl: "/images/scenarios/the_ex_trap.png",
  decoderItems: [
    {
      id: "ex_1",
      phrase: "My ex was [crazy].",
      literalMeaning: "My former partner had mental health struggles.",
      actualMeaning: "I lack emotional intelligence and likely drove them 'crazy'. I take no responsibility.",
      dangerLevel: "💀 Critical (The Classic Red Flag)",
      survivalTip: "Run. If all their exes are 'crazy', the common denominator is THEM.",
      keywords: [
          { word: "crazy", definition: "A dismissive label often used to gaslight partners." }
      ]
    },
    {
      id: "ex_2",
      phrase: "We're still really [close].",
      literalMeaning: "We maintained a platonic bond.",
      actualMeaning: "We have unresolved boundaries and might still be hooking up.",
      dangerLevel: "🔥 High",
      survivalTip: "Ask questions. If they text every day or hang out 1-on-1, you are the third wheel.",
      keywords: [
          { word: "close", definition: "Intimately connected (emotionally or physically)." }
      ]
    },
    {
      id: "ex_3",
      phrase: "I've never been in a [serious] relationship.",
      literalMeaning: "I haven't had a long-term partner.",
      actualMeaning: "I have commitment issues or avoid emotional intimacy.",
      dangerLevel: "⚠️ Medium",
      survivalTip: "If they are over 30, this is a concern. Proceed slowly and check for avoidant behavior.",
      keywords: [
          { word: "serious", definition: "Committed, long-term." }
      ]
    },
    {
      id: "ex_4",
      phrase: "She just didn't understand my [vision].",
      literalMeaning: "We had different career goals.",
      actualMeaning: "I am unemployed or delusional, and she wanted me to get a real job.",
      dangerLevel: "⚠️ Medium",
      survivalTip: "Check if 'vision' pays the rent.",
      keywords: [
          { word: "vision", definition: "Future goals (or delusions of grandeur)." }
      ]
    },
    {
      id: "ex_5",
      phrase: "I don't really believe in [labels].",
      literalMeaning: "I dislike traditional relationship titles.",
      actualMeaning: "I will waste your time for 6 months and then date someone else properly.",
      dangerLevel: "🚩 High",
      survivalTip: "Believe them. Do not try to be the one to 'change' them. You will lose.",
      keywords: [
          { word: "labels", definition: "Titles like 'boyfriend' or 'girlfriend'." }
      ]
    },
  ],
  quizItems: [
    {
      question: "What does it usually mean if someone says all their exes are 'crazy'?",
      options: [
        "They have bad luck.",
        "They are the problem.",
        "They date exciting people.",
        "It's a compliment."
      ],
      correctIndex: 1,
      explanation: "It's a classic red flag. It shows a lack of accountability."
    },
    {
      question: "If they don't believe in 'labels', they likely...",
      options: [
        "Are very modern.",
        "Want a committed relationship.",
        "Want the benefits of dating without the responsibility.",
        "Are already married."
      ],
      correctIndex: 2,
      explanation: "Avoiding labels is often avoiding commitment."
    },
    {
      question: "Are they friends with their ex? What counts as a red flag?",
      options: [
        "They send a birthday text.",
        "They hang out 1-on-1 constantly.",
        "They are polite.",
        "They have mutual friends."
      ],
      correctIndex: 1,
      explanation: "Boundaries are key. Constant 1-on-1 contact suggests unresolved feelings."
    }
  ],
  culturalInsights: {
    title: "The Ex Factor",
    content: "Talking about exes early on is tricky. In English dating culture, how someone speaks about their past partners (respectfully vs. bitterly) tells you how they will eventually speak about you.",
    vocabulary: [
      { word: "Red Flag", definition: "A warning sign of danger or bad character." },
      { word: "Gaslighting", definition: "Manipulating someone to question their own reality." },
      { word: "Third Wheel", definition: "The unnecessary extra person in a couple's dynamic." }
    ]
  }
};
