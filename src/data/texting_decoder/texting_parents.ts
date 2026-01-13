import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const textingParents: Script = {
  id: "texting-parents",
  title: "Parent Texting Decoder",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Decipher your mom and dad's cryptic messages.",
  type: "decoder",
  section: "signal_decoders",
  imageUrl: "/images/scenarios/texting_parents.png",
  summaryPoints: [
    "Parents view texting as a telegram service (pay per letter).",
    "They misuse acronyms often (LOL = Lots of Love).",
    "A call is always the goal."
  ],
  decoderItems: [
    {
      id: "parent-1",
      phrase: "Call me.",
      literalMeaning: "Please ring my phone.",
      actualMeaning: "I can't find the Netflix password / I pressed a button and the TV is blue.",
      dangerLevel: "Low - Tech Support",
      survivalTip: "Call them. It's faster than typing instructions for 45 minutes."
    },
    {
      id: "parent-2",
      phrase: "Grandma passed away LOL",
      literalMeaning: "Grandma died and I am laughing out loud.",
      actualMeaning: "Grandma died, Lots Of Love.",
      dangerLevel: "High - Awkward",
      survivalTip: "Do not point out the mistake right now. Just offer condolences."
    },
    {
      id: "parent-3",
      phrase: "👍 (The Dad Thumbs Up)",
      literalMeaning: "Good.",
      actualMeaning: "I read your long emotional text. I have no emotions to share back. I am proud but silent.",
      dangerLevel: "Safe",
      survivalTip: "Accept it. This is the highest form of praise you will get."
    },
    {
      id: "parent-4",
      phrase: "Your aunt Sharon says hi....",
      literalMeaning: "Aunt Sharon sends greetings.",
      actualMeaning: "Why don't you visit more? We are all getting old.",
      dangerLevel: "Medium - Guilt Trip",
      survivalTip: "Reply 'Say hi back!' and change the subject to avoid the guilt spiral."
    },
    {
      id: "parent-5",
      phrase: "ARE YOU COMING HOME FOR DINNER",
      literalMeaning: "They are shouting the question.",
      actualMeaning: "They forgot caps lock was on. They are asking politely.",
      dangerLevel: "Safe",
      survivalTip: "Ignore the volume. Answer the question."
    }
  ],
  quizItems: [
    {
      question: "What does 'LOL' usually mean when a parent types it?",
      options: [
        "Laughing Out Loud",
        "Lots Of Love",
        "Loss Of Life"
      ],
      correctIndex: 1,
      explanation: "Parents often confuse the old acronym 'Lots of Love' with the modern 'Laughing Out Loud'."
    },
    {
      question: "If a parent sends a text saying 'Call me', what is the likely urgency?",
      options: [
        "Emergency",
        "They probably just have a tech question",
        "They are angry"
      ],
      correctIndex: 1,
      explanation: "Usually, 'Call me' just means 'I don't want to type' or 'I can't find a button'."
    },
    {
      question: "How should you interpret a '👍' from your Dad?",
      options: [
        "He is dismissing you",
        "He is angry",
        "He acknowledges and approves (High praise)"
      ],
      correctIndex: 2,
      explanation: "For dads, a thumbs up is efficient and signifies complete approval."
    }
  ]
};
