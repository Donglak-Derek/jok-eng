import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const corporateDecoder: Script = {
  id: "corporate-decoder",
  title: "Office Politics Decoder",
  categorySlug: "office_banter",
  categoryName: CATEGORY_NAMES["office_banter"],
  cleanedEnglish: "Translating 'Professional' into 'Real Talk'.",
  imageUrl: "/images/scenarios/corporate_decoder_3d.png",
  difficulty: "Medium 🌶️🌶️",
  type: "decoder",
  
  decoderItems: [
    {
      id: "cd1",
      phrase: "Let's [take this offline].",
      literalMeaning: "Let us discuss this outside of the current meeting.",
      actualMeaning: "Stop talking. You are arguing about details that nobody else cares about, and you are ruining my agenda.",
      dangerLevel: "Danger 🛑", // 90
      survivalTip: "Do NOT keep arguing. Nod, say 'Sounds good', and shut up immediately.",
      conversation: {
        speakerA: "boss",
        speakerB: "me",
        textA: "That's an interesting point, but let's take this offline.",
        textB: "Understood. Moving on.",
        contextNote: "It's the polite way to say 'You are derailing the meeting'."
      },
      keywords: [
          { word: "take this offline", definition: "Stop talking publicly; you are derailing the meeting." }
      ]
    },
    {
      id: "cd2",
      phrase: "[Per my last email]...",
      literalMeaning: "According to the email I sent previously.",
      actualMeaning: "Can you read? I already answered this yesterday. You are wasting my time.",
      dangerLevel: "Caution ⚠️", // 50
      survivalTip: "Apologize briefly and read the thread before replying again.",
      conversation: {
        speakerA: "coworker",
        speakerB: "me",
        textA: "When is the deadline for this?",
        textB: "Per my last email, it is due on Friday at 5 PM.",
        contextNote: "It is the corporate equivalent of screaming."
      },
      keywords: [
          { word: "Per my last email", definition: "Passive-aggressive for 'I already told you this'." }
      ]
    },
    {
      id: "cd3",
      phrase: "I [don't have the bandwidth].",
      literalMeaning: "My transmission capacity is full.",
      actualMeaning: "I am too busy for your low-priority request. Go ask someone else.",
      dangerLevel: "Safe ✅", // 15
      survivalTip: "Respect it. Do not push, or you become 'annoying'. ask 'When might be a better time?'",
      conversation: {
        speakerA: "coworker",
        speakerB: "me",
        textA: "Can you help me fix this bug?",
        textB: "I'd love to, but I don't have the bandwidth this sprint.",
        contextNote: "A professional way to say 'No'."
      },
      keywords: [
          { word: "don't have the bandwidth", definition: "Corporate speak for 'I'm too busy' or 'No'." }
      ]
    },
    {
      id: "cd4",
      phrase: "Let's [circle back] on this.",
      literalMeaning: "Let us return to this topic later.",
      actualMeaning: "I have no idea what the answer is, or I want to avoid making a decision right now.",
      dangerLevel: "Caution ⚠️", // 40
      survivalTip: "If it's important, set a reminder to bring it up again. Otherwise, it will die forever.",
      conversation: {
        speakerA: "client",
        speakerB: "me",
        textA: "Can we add this extra feature for free?",
        textB: "That's a great question. Let's circle back on that after we review the budget.",
        contextNote: "Used to delay conflict or difficult decisions."
      },
      keywords: [
          { word: "circle back", definition: "Delaying tactic; often used to avoid immediate conflict." }
      ]
    },
    {
      id: "cd5",
      phrase: "[Moving forward]...",
      literalMeaning: "In the future.",
      actualMeaning: "You messed up. I am not firing you, but don't you dare do it again.",
      dangerLevel: "Danger 🛑", // 80
      survivalTip: "Take the feedback seriously. It is a warning.",
      conversation: {
        speakerA: "boss",
        speakerB: "me",
        textA: "Moving forward, please cc me on all client emails.",
        textB: "Understood. Will do.",
        contextNote: "Usually follows a mistake you made."
      },
      keywords: [
          { word: "Moving forward", definition: "Transition phrase that implies a previous mistake was made." }
      ]
    },
    {
      id: "cd6",
      phrase: "Just a [gentle reminder].",
      literalMeaning: "I am reminding you softly.",
      actualMeaning: " GIVE. ME. THE. THING. I asked 3 times already.",
      dangerLevel: "Caution ⚠️", // 60
      survivalTip: "Reply immediately with the item or a strict ETA. Their patience is gone.",
      conversation: {
        speakerA: "coworker",
        speakerB: "me",
        textA: "Just a gentle reminder to submit your timesheet.",
        textB: "Doing it right now! Sorry for the delay.",
        contextNote: "There is nothing 'gentle' about this phrase."
      },
      keywords: [
          { word: "gentle reminder", definition: "Not gentle; implies impatience and urgency." }
      ]
    }
  ],

  summaryPoints: [
    "'Offline' means 'Shut up'.",
    "'Per my last email' means 'Read the thread'.",
    "'Bandwidth' is a polite 'No'.",
    "'Moving forward' is a warning.",
    "Corporate speak is designed to hide conflict."
  ],

  quizItems: [
    {
      question: "If your boss says 'Let's take this offline', what should you do?",
      options: ["Keep arguing to prove your point", "Stop talking and agree", "Leave the room immediately", "Cry"],
      correctIndex: 1,
      explanation: "It means you are derailing the meeting. Stop talking to save face."
    },
    {
      question: "What is the emotion behind 'Per my last email'?",
      options: ["Joy", "Confusion", "Annoyance/Aggression", "Sadness"],
      correctIndex: 2,
      explanation: "It is a passive-aggressive way of saying 'I already told you this, why aren't you listening?'"
    },
    {
      question: "When someone says 'I don't have the bandwidth', they mean:",
      options: ["Their internet is slow", "They are physically wide", "They are prioritizing other work over yours", "They want a promotion"],
      correctIndex: 2,
      explanation: "It's a professional way to say they are too busy for your request."
    }
  ]
};
