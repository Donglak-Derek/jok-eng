import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const crypticDating: Script = {
  id: "cryptic-dating",
  title: "The 'Soft' Reject",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Translating 'Let's see' into 'No'.",
  type: "decoder",
  section: "signal_decoders",
  imageUrl: "/images/scenarios/cryptic_dating.png",
  summaryPoints: [
    "If it's not a 'Hell Yes', it's a 'No'.",
    "People are afraid to be direct, so they soften the blow.",
    "Busyness is the most common fake excuse."
  ],
  decoderItems: [
    {
      id: "reject-1",
      phrase: "I've just been so busy lately.",
      literalMeaning: "My schedule is full.",
      actualMeaning: "I am not too busy. I am just not busy for YOU. Everyone looks at their phone 100 times a day.",
      dangerLevel: "High - It's over",
      survivalTip: "Stop texting. If they want to see you, they will make time."
    },
    {
      id: "reject-2",
      phrase: "You're too good for me.",
      literalMeaning: "I am unworthy.",
      actualMeaning: "I want to break up with you but I want to be the victim so I don't feel guilty.",
      dangerLevel: "Critical - Manipulation",
      survivalTip: "Agree with them. 'Yeah, I probably am.' Then leave."
    },
    {
      id: "reject-3",
      phrase: "Let's see how I feel closer to the date.",
      literalMeaning: "I will assess my energy levels.",
      actualMeaning: "I am waiting for a better offer. You are the backup plan.",
      dangerLevel: "Medium - Disrespectful",
      survivalTip: "Make other plans. Don't be an option."
    },
    {
      id: "reject-4",
      phrase: "I'm not ready for a relationship right now.",
      literalMeaning: "I need time to be single.",
      actualMeaning: "I am not ready for a relationship WITH YOU.",
      dangerLevel: "High - Clarity",
      survivalTip: "Believe them. Move on instantly."
    }
  ],
  quizItems: [
    {
      question: "What does 'I've just been so busy lately' usually translate to?",
      options: [
        "They are working 100 hours a week",
        "They lost their phone",
        "You are not a priority"
      ],
      correctIndex: 2,
      explanation: "Everyone is busy. If they liked you, they would send a text."
    },
    {
      question: "Translate: 'You're too good for me.'",
      options: [
        "I am insecure and need reassurance",
        "I want to break up but I don't want to look like the bad guy",
        "You are actually perfect"
      ],
      correctIndex: 1,
      explanation: "It's a classic manipulation to shift the guilt onto their own 'inadequacy' while dumping you."
    },
    {
      question: "If they say 'Let's see how I feel closer to the date', what should you do?",
      options: [
        "Wait patiently",
        "Ask them every hour",
        "Make other plans"
      ],
      correctIndex: 2,
      explanation: "This phrase means you are a backup plan. Don't be a backup plan."
    }
  ]
};
