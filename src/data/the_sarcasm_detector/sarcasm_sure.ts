import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmSure: Script = {
  id: "sarcasm-sure",
  title: "Sure.",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "Decoding the weakest word in English. When 'Sure' means 'No'.",
  imageUrl: "/images/scenarios/sarcasm_sure_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The Non-Committal Yes",
    content: "If you ask for a favor and get a 'Yes!', you are safe. If you get a 'Sure...', be careful. The pause and the tone change everything. 'Sure' often means 'I will do it, but I don't want to' or 'I don't believe you'."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You tell your boss: 'I'll have that report done by tonight.' Boss: 'Sure...'",
      en: "The Doubtful Sure",
      keywords: [
        { word: "skeptical", definition: "doubtful" },
        { word: "deadline", definition: "time limit" }
      ],
      badResponse: {
        text: "You: 'Great, thanks!'",
        why: "You ignored their doubt. They think you will fail."
      },
      goodResponse: {
        text: "You: 'You sound [skeptical]. I can hit the [deadline], don't worry.'",
        why: "Address the doubt head-on to reassure them."
      }
    },
    {
      id: "s2",
      scenario: "You ask a friend to help you move house on Sunday. Friend: 'Uh, sure.'",
      en: "The Reluctant Yes",
      keywords: [
        { word: "obligation", definition: "forced duty" },
        { word: "beer", definition: "reward drink" }
      ],
      badResponse: {
        text: "You: 'Awesome! See you at 6am!'",
        why: "They clearly don't want to go. Don't push your luck."
      },
      goodResponse: {
        text: "You: 'No [obligation] if you're busy! I'll buy [beer] and pizza.'",
        why: "Acknowledge their reluctance and sweeten the deal to be polite."
      }
    },
    {
      id: "s3",
      scenario: "You tell a crazy story about meeting a celebrity. Friend: 'Sure, sure.'",
      en: "The Dismissal",
      keywords: [
        { word: "believe", definition: "think is true" },
        { word: "evidence", definition: "proof" }
      ],
      badResponse: {
        text: "You: 'Why are you nodding like that?'",
        why: "They think you are lying or crazy. Nodding fast means 'stop talking'."
      },
      goodResponse: {
        text: "You: 'You don't [believe] me? I have phtographic [evidence]!'",
        why: "Call out their disbelief playfully. Show the receipts."
      }
    },
    {
      id: "s4",
      scenario: "Partner: 'Do I look okay?' You: 'Sure.'",
      en: "The Trap Answer",
      keywords: [
        { word: "enthusiasm", definition: "excitement" },
        { word: "beautiful", definition: "very pretty" }
      ],
      badResponse: {
        text: "You: 'What? I said yes!'",
        why: "'Sure' implies 'Accetable' or 'Mediocre'. It is the wrong answer for compliments."
      },
      goodResponse: {
        text: "You: 'More than sure. You look [beautiful]!'",
        why: "Correct yourself immediately. Compliments need enthusiasm, not apathy."
      }
    }
  ],
  quizItems: [
    {
      question: "Which 'Yes' word is the least enthusiastic?",
      options: [
        "Absolutely!",
        "Yes!",
        "Definitely.",
        "Sure."
      ],
      correctIndex: 3,
      explanation: "'Sure' is the bottom of the barrel. It is the 'yes' of least resistance."
    },
    {
      question: "If you ask for a date and they say 'Sure...', what does the pause mean?",
      options: [
        "They are excited.",
        "They are checking their calendar.",
        "They are hesitating and probably want to say no.",
        "They fell asleep."
      ],
      correctIndex: 2,
      explanation: "Hesitation is information. A slow 'Sure' is a 'No' dressed up as politeness."
    },
    {
      question: "When is 'Sure' perfectly okay?",
      options: [
        "Answering 'Can I have a glass of water?'",
        "answering 'Do you love me?'",
        "Answering 'Am I fired?'",
        "Answering 'Is the building on fire?'"
      ],
      correctIndex: 0,
      explanation: "For small, low-stakes requests, 'Sure' is fine. For emotional questions, it is too cold."
    }
  ]
};
