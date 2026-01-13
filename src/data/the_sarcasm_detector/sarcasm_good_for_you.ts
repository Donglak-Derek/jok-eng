import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmGoodForYou: Script = {
  id: "sarcasm-good-for-you",
  title: "Good For You",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "The phrase that kills bragging instantly. Decoding 'Good for you'.",
  imageUrl: "/images/scenarios/sarcasm_good_for_you_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The Conversation Killer",
    content: "When someone says 'Good for you' with a flat tone and no follow-up question, they are not congratulating you. They are saying: 'I do not care, please stop talking about yourself'."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You brag about your new diet. 'I haven't eaten carbs in 3 days.' Your friend says: 'Good for you.'",
      en: "The Diet Boring",
      keywords: [
        { word: "interested", definition: "caring" },
        { word: "topic", definition: "subject" }
      ],
      badResponse: {
        text: "You: 'Yeah, let me tell you about my kale shake...'",
        why: "Stop! They are bored. Continuing will make them hate you."
      },
      goodResponse: {
        text: "You: 'Anyway, enough about me. Are you [interested] in grabbing food?'",
        why: "Pivot immediately. You took the hint that they don't care about your diet."
      }
    },
    {
      id: "s2",
      scenario: "You talk about how much money you make. 'My bonus was huge this year.' Colleague: 'Good for you.'",
      en: "The Money Brag",
      keywords: [
        { word: "uncomfortable", definition: "awkward" },
        { word: "private", definition: "personal" }
      ],
      badResponse: {
        text: "You: 'I might buy a boat.'",
        why: "Talking about money makes people hate you. They are shutting you down."
      },
      goodResponse: {
        text: "You: 'Sorry, that was [uncomfortable]. Money talk should stay [private].'",
        why: "Apologize for being tacky. 'Good for you' was a warning shot."
      }
    },
    {
      id: "s3",
      scenario: "You explain why you don't own a TV. 'I prefer books.' Date: 'Good for you.'",
      en: "The Moral Superiority",
      keywords: [
        { word: "judgmental", definition: "critical" },
        { word: "hobby", definition: "activity" }
      ],
      badResponse: {
        text: "You: 'TV rots your brain.'",
        why: "Now you are just insulting them. They already think you are condescending."
      },
      goodResponse: {
        text: "You: 'I didn't mean to sound [judgmental]. It's just my weird [hobby].'",
        why: "Soften your stance. Make it about your quirk, not your superiority."
      }
    },
    {
      id: "s4",
      scenario: "A child shows you a drawing of a stick. You say: 'Good for you!'",
      en: "The Only Exception",
      keywords: [
        { word: "encourage", definition: "support" },
        { word: "nice", definition: "kind" }
      ],
      badResponse: {
        text: "You: 'It is bad.'",
        why: "Don't crush children."
      },
      goodResponse: {
        text: "You: 'I want to [encourage] them. It is [nice] to see them try.'",
        why: "With kids (or dogs), high-pitched 'Good for you' works. With adults? Never."
      }
    }
  ],
  quizItems: [
    {
      question: "If an adult says 'Good for you' and looks away, what should you do?",
      options: [
        "Continue the story in more detail.",
        "Stop talking about yourself immediately.",
        "Ask 'Are you jealous?'",
        "High five them."
      ],
      correctIndex: 1,
      explanation: "Looking away + 'Good for you' is the universal signal for 'I am bored'."
    },
    {
      question: "Why does 'Good for you' sound sarcastic?",
      options: [
        "It is too short.",
        "It focuses on 'You' (isolation) rather than 'Us' (connection).",
        "It uses the word 'Good'.",
        "It is French."
      ],
      correctIndex: 1,
      explanation: "It creates a distance. 'That's amazing!' invites connection. 'Good for you' pushes you away."
    },
    {
      question: "What is a better alternative to 'Good for you' if you aren't being sarcastic?",
      options: [
        "That's nice.",
        "That's awesome! How did you do it?",
        "Okay.",
        "Cool story bro."
      ],
      correctIndex: 1,
      explanation: "Asking a follow-up question ('How?') proves you are actually interested."
    }
  ]
};
