import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const chattyStranger: Script = {
  id: "polite-chatty-stranger",
  title: "The Chatty Stranger",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to end a conversation on a plane/bus without being rude.",
  imageUrl: "/images/scenarios/chatty_stranger_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The 'Exit' Strategy",
    content: "Americans especially love to chat with strangers. If you want to stop, simply going silent is rude. You need a 'Transition Phrase' that validates the conversation ('It was great talking to you') followed by an 'Action' ('I'm going to read now')."
  },
  sentences: [
    {
      id: "chat-1",
      scenario: "The person next to you has been talking for 20 minutes. You want to sleep.",
      en: "The Gradual Fade",
      keywords: [
        { word: "catch", definition: "get/obtain" },
        { word: "nap", definition: "short sleep" }
      ],
      badResponse: {
        text: "You: (Put on headphones while they are talking)",
        why: "This is the universal sign for 'I hate you'."
      },
      goodResponse: {
        text: "You: 'It's been great chatting! I'm going to try to [catch] a quick [nap] before we land.'",
        why: "You announced your exit politely. Now putting on headphones is acceptable."
      }
    },
    {
      id: "chat-2",
      scenario: "They keep talking even after you closed your eyes.",
      en: "The Headphones",
      keywords: [
        { word: "focus", definition: "concentrate" },
        { word: "podcast", definition: "audio show" }
      ],
      badResponse: {
        text: "You: 'SHHHH!'",
        why: "You are not a librarian."
      },
      goodResponse: {
        text: "You: 'Sorry, I really need to [focus] on this [podcast], I'm listening for work.'",
        why: "Work is a sacred excuse. People respect 'studying' or 'working' more than 'ignoring you'."
      }
    },
    {
      id: "chat-3",
      scenario: "They ask for your phone number as you leave.",
      en: "The Social Media Deflection",
      keywords: [
        { word: "active", definition: "using often" },
        { word: "connect", definition: "link up" }
      ],
      badResponse: {
        text: "You: 'No thanks.'",
        why: "A bit harsh after a long flight."
      },
      goodResponse: {
        text: "You: 'I'm not really [active] on my phone, but nice meeting you! Safe travels!'",
        why: "A vague lie ('not active') + a warm goodbye ('Safe travels') is the best way to ghost someone in real life."
      }
    }
  ],
  quizItems: [
    {
      question: "What is the rude way to stop a conversation?",
      options: [
        "Saying 'I need to sleep'.",
        "Putting on headphones mid-sentence.",
        "Saying 'Nice talking to you'.",
        "Fake fainting."
      ],
      correctIndex: 1,
      explanation: "It signals that you don't even respect them enough to warn them."
    },
    {
      question: "What is a 'Transition Phrase'?",
      options: [
        "A magic spell.",
        "A phrase that signals the end of a topic (e.g., 'Well, anyway...').",
        "A grammar rule.",
        "A lie."
      ],
      correctIndex: 1,
      explanation: "It warns the other person that the interaction is closing."
    },
    {
      question: "Why is 'I need to work' a good excuse?",
      options: [
        "Because work is boring.",
        "Because it creates an unbreakable barrier (The Work Wall).",
        "It isn't.",
        "Because it implies you are rich."
      ],
      correctIndex: 1,
      explanation: "Socializing is optional. Work is mandatory. Mandatory trumps optional."
    }
  ]
};
