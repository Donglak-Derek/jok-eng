import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const hugShakeFumble: Script = {
  id: "party-hug-shake",
  title: "The Hug-Shake Fumble",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "advanced",
  cleanedEnglish: "That awkward dance when you don't know if it's a handshake or a hug.",
  imageUrl: "/images/scenarios/hug_shake_3d.png",
  difficulty: "Spicy 🌶️🌶️🌶️",
  mode: "cloze",
  type: "script",
  
  sentences: [
    {
      id: "s1",
      en: "I met my friend's friend, and I went in for a [handshake].",
      keywords: [
        { word: "handshake", definition: "Hidden: formal greeting" },
      ],
    },
    {
      id: "s2",
      en: "But he opened his arms wide for a [bear hug].",
      keywords: [
        { word: "bear hug", definition: "Hidden: big warm embrace" },
      ],
    },
    {
      id: "s3",
      en: "I panicked and ended up [punching his chest] while holding his waist.",
      keywords: [
        { word: "punching his chest", definition: "Hidden: accidental hit" },
      ],
    },
    {
      id: "s4",
      en: "We froze in this awkward [tango] for five seconds.",
      keywords: [
        { word: "tango", definition: "Hidden: dance" },
      ],
    },
    {
      id: "s5",
      en: "I patted his back and whispered '[Good game].'",
      keywords: [
        { word: "Good game", definition: "Hidden: sports phrase" },
      ],
    },
  ],

  culturalInsights: {
    title: "Why is this funny?",
    content: "The 'Hug-Shake' is a universal moment of social panic. It happens when greeting rules collide (Formal vs Casual). Ending it with 'Good game'—a phrase used by athletes after a match—makes it even funnier because it acknowledges the physical struggle as if it were a sport."
  },

  quizItems: [
    {
      question: "What caused the awkwardness?",
      options: ["Bad breath", "Mismatched greeting styles", "He fell over", "He was a ghost"],
      correctIndex: 1,
      explanation: "One person went for a handshake (formal), the other for a hug (casual/warm)."
    },
    {
      question: "What is a 'bear hug'?",
      options: ["A fight with a bear", "A tight, enthusiastic hug", "A brand of honey", "A lazy greeting"],
      correctIndex: 1,
      explanation: "It's an idiom for a very strong, wrapping embrace."
    },
    {
      question: "Why was 'Good game' weird to say?",
      options: ["They weren't playing sports", "It was a video game", "It was perfect", "He hates games"],
      correctIndex: 0,
      explanation: "You say 'Good game' after a competition. Saying it after a greeting implies the hug was a battle."
    }
  ]
};
