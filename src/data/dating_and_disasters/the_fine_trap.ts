import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theFineTrap: Script = {
  id: "date_fine_trap",
  title: "The 'Fine' Trap",
  type: "decoder",
  section: "The Dating Minefield",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish: "Passive-aggression is a love language nobody wants to speak. Learn to decode the silence.",
  sentences: [],
    imageUrl: "/images/scenarios/the_fine_trap.png",
  decoderItems: [
    {
      id: "fine_1",
      phrase: "I'm [fine].",
      literalMeaning: " I am okay / vaguely positive.",
      actualMeaning: "I am furious, but I want you to figure out why without me telling you.",
      dangerLevel: "🔥 High",
      survivalTip: "Do NOT say 'Okay, good.' Ask 'Are you sure? You seem quiet.' Proceed with extreme caution.",
      keywords: [
          { word: "fine", definition: "In conflicts, this almost never means 'good'." }
      ]
    },
    {
      id: "fine_2",
      phrase: "Do [whatever] you want.",
      literalMeaning: "I am giving you permission to choose.",
      actualMeaning: "If you do that thing, we are going to have a massive fight later.",
      dangerLevel: "💀 Critical",
      survivalTip: "This is a trap. Do not do 'whatever you want'. Do what THEY want, or compromise immediately.",
      keywords: [
          { word: "whatever", definition: "A dismissive word signaling resignation or anger." }
      ]
    },
    {
      id: "fine_3",
      phrase: "It's [funny] how...",
      literalMeaning: "I am about to share a humorous observation.",
      actualMeaning: "I am about to bring up a grudge from 3 months ago that I have been stewing on.",
      dangerLevel: "⚠️ Medium",
      survivalTip: "Brace yourself. Listen without interrupting. Do not laugh. It is NOT funny.",
      keywords: [
          { word: "funny", definition: "Here, implies irony or bitterness, not humor." }
      ]
    },
    {
      id: "fine_4",
      phrase: "No, I'm not [mad].",
      literalMeaning: "I am not feeling anger.",
      actualMeaning: "I am seething, but I don't want to look 'crazy' by admitting it yet.",
      dangerLevel: "🔥 High",
      survivalTip: "You probably forgot an anniversary or liked someone's photo. Buy food immediately.",
      keywords: [
          { word: "mad", definition: "Angry." }
      ]
    },
    {
      id: "fine_5",
      phrase: "I guess it's [okay].",
      literalMeaning: "I approve of this.",
      actualMeaning: "I hate it, but I don't want to be the bad guy who says no.",
      dangerLevel: "🤔 Medium",
      survivalTip: "They are disappointed. Offer an alternative option before locking this in.",
      keywords: [
          { word: "okay", definition: "Acceptable, but barely." }
      ]
    },
  ],
  quizItems: [
    {
      question: "Translation check: 'Do whatever you want'.",
      options: [
        "Go have fun!",
        "I don't care.",
        "Don't you dare do that.",
        "I am hungry."
      ],
      correctIndex: 2,
      explanation: "It's a test. They want you to consider their feelings, not actually do whatever you want."
    },
    {
      question: "If they say 'I'm fine' with a short tone, you should...",
      options: [
        "Believe them.",
        "Ignore them.",
        "Ask gently what's wrong.",
        "Start gaming."
      ],
      correctIndex: 2,
      explanation: "'Fine' is rarely fine. It's often passive-aggressive code for 'I is upset'."
    },
    {
      question: "Passive-aggressiveness is characterized by...",
      options: [
        "Direct yelling.",
        "Indirect expression of hostility.",
        "Silent treatment only.",
        "Physical fighting."
      ],
      correctIndex: 1,
      explanation: "It's expressing anger without directly owning up to it (e.g., sarcasm, backhanded comments)."
    }
  ],
  culturalInsights: {
    title: "Passive-Aggression 101",
    content: "Some cultures value directness. Others value harmony. Passive-aggression happens when people are afraid of conflict but still want to express anger. It's confusing for everyone, especially language learners.",
    vocabulary: [
      { word: "Passive-Aggressive", definition: "Indirectly expressing negative feelings instead of openly addressing them." },
      { word: "Stewing", definition: "Being angry about something for a long time." },
      { word: "Grudge", definition: "A persistent feeling of ill will or resentment." }
    ]
  }
};
