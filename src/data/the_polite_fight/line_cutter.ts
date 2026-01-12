import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const lineCutter: Script = {
  id: "polite-line-cutter",
  title: "The Line Cutter Defense",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to stop someone from skipping the line without causing a scene.",
  imageUrl: "/images/scenarios/line_cutter_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The Queue Sanctity",
    content: "Cutting in line (or 'jumping the queue') is a major social crime in English-speaking cultures. However, directly shouting 'Get back!' is also seen as aggressive. The polite strategy is to assume it was a mistake and 'helpfully' inform them where the line starts."
  },
  sentences: [
    {
      id: "line-1",
      scenario: "Someone drifts in front of you while you are waiting for coffee.",
      en: "The Helpful Correction",
      keywords: [
        { word: "excuse", definition: "pardon" },
        { word: "starts", definition: "begins" }
      ],
      badResponse: {
        text: "You: 'Hey! Back of the line!'",
        why: "Barking orders makes you look like the aggressor, even if you are right."
      },
      goodResponse: {
        text: "You: '[Excuse] me, I believe the line actually [starts] back there.'",
        why: "Using 'I believe' softens the blow. You are correcting their 'mistake', not attacking their character."
      }
    },
    {
      id: "line-2",
      scenario: "They pretend not to hear you.",
      en: "The Group Shame",
      keywords: [
        { word: "waiting", definition: "staying in patience" },
        { word: "sure", definition: "certain" }
      ],
      badResponse: {
        text: "You: 'Are you deaf?'",
        why: "Insulting them escalates the situation immediately."
      },
      goodResponse: {
        text: "You: 'So sorry, we've all been [waiting] a while. Just wanted to make [sure] you saw the end of the queue.'",
        why: "Using 'we' recruits the rest of the line to your side. It creates social pressure."
      }
    },
    {
      id: "line-3",
      scenario: "They say 'I'm just with my friend' (who is at the front).",
      en: "The Friend Excuse",
      keywords: [
        { word: "fair", definition: "just/equitable" },
        { word: "wait", definition: "hold on" }
      ],
      badResponse: {
        text: "You: 'I don't care about your friend.'",
        why: "Too aggressive."
      },
      goodResponse: {
        text: "You: 'That's nice, but it's not really [fair] to the people who did [wait].'",
        why: "Appealing to 'fairness' is a strong cultural lever."
      }
    }
  ],
  quizItems: [
    {
      question: "What is the best way to confront a line cutter?",
      options: [
        "Push them out of the way.",
        "Pretend you think they made a mistake.",
        "Cry.",
        "Cut in front of them."
      ],
      correctIndex: 1,
      explanation: "Assuming it was an accident allows them to leave the spot without losing face (ego)."
    },
    {
      question: "Why should you use the word 'We' (e.g., 'We have been waiting')?",
      options: [
        "Because you are a king.",
        "To imply group consensus and social pressure.",
        "To sound louder.",
        "It is a typo."
      ],
      correctIndex: 1,
      explanation: "Line cutters might fight one person, but they rarely fight a whole group."
    },
    {
      question: "Is 'jumping the queue' a serious offense?",
      options: [
        "No, nobody cares.",
        "Yes, especially in the UK and dealing with tired people.",
        "Only at the movies.",
        "Yes, it is punishable by jail."
      ],
      correctIndex: 1,
      explanation: "It violates the basic social contract of fairness."
    }
  ]
};
