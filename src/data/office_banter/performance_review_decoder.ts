import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const performanceReviewDecoder: Script = {
  id: "performance-review-decoder",
  title: "Performance Review Decoder",
  categorySlug: "office_banter",
  categoryName: CATEGORY_NAMES["office_banter"],
  cleanedEnglish: "Decoding what 'Meets Expectations' really impacts.",
  imageUrl: "/images/scenarios/performance_review_decoder_3d.png",
  difficulty: "Medium 🌶️🌶️",
  type: "decoder",
  
  decoderItems: [
    {
      id: "pr1",
      phrase: "You need more visibility.",
      literalMeaning: "People need to see you more.",
      actualMeaning: "You are doing good work, but the executives have no idea who you are. Start bragging.",
      dangerLevel: "Caution ⚠️", // 50
      survivalTip: "Don't just work hard. Send 'Weekly Wins' emails and speak up in town halls.",
      conversation: {
        speakerA: "manager",
        speakerB: "me",
        textA: "Great code, but you need more visibility.",
        textB: "I'll start demoing my features at the All-Hands meeting.",
        contextNote: "If the VP doesn't know you, you can't get promoted."
      }
    },
    {
      id: "pr2",
      phrase: "Exceeds Expectations.",
      literalMeaning: "You did better than asked.",
      actualMeaning: "You are a top performer. We will give you a 3% raise instead of 2%.",
      dangerLevel: "Safe ✅", // 10
      survivalTip: "This is the best rating. Use it to negotiate for equity or a title change immediately.",
      conversation: {
        speakerA: "manager",
        speakerB: "me",
        textA: "Congrats, you got 'Exceeds Expectations'.",
        textB: "Thank you! Does this putting me in line for Senior Engineer next cycle?",
        contextNote: "Leverage this momentum now."
      }
    },
    {
      id: "pr3",
      phrase: "Communication style is too 'direct'.",
      literalMeaning: "You speak clearly.",
      actualMeaning: "You were right, but you hurt someone's feelings. You need to use more 'fluff' words.",
      dangerLevel: "Danger 🛑", // 75
      survivalTip: "Use the 'Sandwich Method' (Compliment, Criticism, Compliment). Never just say 'This is bad'.",
      conversation: {
        speakerA: "boss",
        speakerB: "me",
        textA: "Peers feel your style is too direct.",
        textB: "I see. I will focus on softening my feedback delivery.",
        contextNote: "Being 'right' isn't enough; you have to be 'nice'."
      }
    },
    {
      id: "pr4",
      phrase: "We need you to step up.",
      literalMeaning: "Move to a higher level.",
      actualMeaning: "We fired the person above you, and we want you to do their job without a promotion.",
      dangerLevel: "Danger 🛑", // 85
      survivalTip: "Ask: 'Does this new responsibility come with a title change or salary adjustment?'",
      conversation: {
        speakerA: "boss",
        speakerB: "me",
        textA: "With Sarah gone, we need you to step up.",
        textB: "Happy to help. Can we discuss how this changes my role definition?",
        contextNote: "Beware of 'acting' roles that never become permanent."
      }
    },
    {
      id: "pr5",
      phrase: "Not a cultural fit.",
      literalMeaning: "You don't match our values.",
      actualMeaning: "We just personally don't like you. This is the vague reason we use to fire people.",
      dangerLevel: "Danger 🛑", // 100
      survivalTip: "Start looking for a new job immediately. You cannot fix this.",
      conversation: {
        speakerA: "HR",
        speakerB: "me",
        textA: "We feel you aren't a cultural fit.",
        textB: "I understand.",
        contextNote: "There is no coming back from this."
      }
    },
    {
      id: "pr6",
      phrase: "Passionate.",
      literalMeaning: "You care a lot.",
      actualMeaning: "You get angry and emotional in meetings. Calm down.",
      dangerLevel: "Caution ⚠️", // 60
      survivalTip: "In business, 'passionate' is often code for 'hard to control'. Try to be more stoic.",
      conversation: {
        speakerA: "coworker",
        speakerB: "me",
        textA: "He is very... passionate about this feature.",
        textB: "I'll try to keep the emotion out of the next debate.",
        contextNote: "Passion is good until it becomes 'drama'."
      }
    }
  ],

  summaryPoints: [
    "'Visibility' means marketing yourself to leadership.",
    "'Direct' means rude.",
    "'Step up' often means unpaid work.",
    "'Cultural fit' is the catch-all for rejection.",
    "Performance reviews are 50% work, 50% politics."
  ],

  quizItems: [
    {
      question: "If you are told you need more 'visibility', what should you do?",
      options: ["Wear brighter clothes", "Do nothing, good work speaks for itself", "Proactively share your wins with leadership", "Stand on your desk"],
      correctIndex: 2,
      explanation: "Good work does NOT speak for itself. You must be your own advocate."
    },
    {
      question: "What does 'Communication is too direct' usually imply?",
      options: ["You are too efficient", "You are being perceived as rude or aggressive", "You talk too fast", "You are a genius"],
      correctIndex: 1,
      explanation: "It means you are neglecting the emotional side of communication (diplomacy)."
    },
    {
      question: "If told you are 'Not a cultural fit', the best move is:",
      options: ["Argue regarding the culture", "Promise to change", "Update your resume", "Bring donuts"],
      correctIndex: 2,
      explanation: "This is a fundamental rejection of *personality*, not skills. It is rarely fixable."
    }
  ]
};
