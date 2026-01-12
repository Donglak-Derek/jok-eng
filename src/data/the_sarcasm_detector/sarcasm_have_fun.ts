import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmHaveFun: Script = {
  id: "sarcasm-have-fun",
  title: "Have Fun!",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "When 'Fun' means 'Misery'. Wishing someone luck for a terrible task.",
  imageUrl: "/images/scenarios/sarcasm_have_fun_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The Misery High-Five",
    content: "We say 'Have fun!' for parties. But we also say it when someone has to do something awful, like filing taxes or cleaning a toilet. In this context, it is a sarcastic way of saying 'I am glad it is you and not me'."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You have to stay late on Friday to fix a spreadsheet. Colleague leaving the office: 'Have fun!'",
      en: "The Escape",
      keywords: [
        { word: "jealous", definition: "envious" },
        { word: "drink", definition: "beverage" }
      ],
      badResponse: {
        text: "You: 'Thanks, I will!'",
        why: "Don't pretend you enjoy suffering. It makes you look like a robot."
      },
      goodResponse: {
        text: "You: 'Don't pretend you're [jealous]. Have a [drink] for me.'",
        why: "Acknowledge that they are lucky to leave and you are unlucky to stay."
      }
    },
    {
      id: "s2",
      scenario: "You are going to lunch with your angry in-laws. Partner: 'Have fun.'",
      en: "The Lion's Den",
      keywords: [
        { word: "survive", definition: "stay alive" },
        { word: "hero", definition: "brave person" }
      ],
      badResponse: {
        text: "You: 'It will be lovely.'",
        why: "Denial helps nobody. You both know it will be a disaster."
      },
      goodResponse: {
        text: "You: 'If I don't [survive], tell the world I died a [hero].'",
        why: "Using 'death' metaphors is a classic way to joke about awkward social obligations."
      }
    },
    {
      id: "s3",
      scenario: "You are cleaning up a huge mess your dog made. Neighbor: 'Looks like a party. Have fun!'",
      en: "The Bystander",
      keywords: [
        { word: "help", definition: "assist" },
        { word: "watch", definition: "observe" }
      ],
      badResponse: {
        text: "You: 'You too!'",
        why: "Saying 'You too' makes no sense here. They aren't doing anything."
      },
      goodResponse: {
        text: "You: 'Unless you want to [help], keep walking and don't [watch].'",
        why: "Sarcastic 'Have fun' from bystanders often deserves a sharp response."
      }
    },
    {
      id: "s4",
      scenario: "You are on hold with customer service for 2 hours. 'Enjoy the music!'",
      en: "The Corporate Torture",
      keywords: [
        { word: "insane", definition: "crazy" },
        { word: "hang up", definition: "end call" }
      ],
      badResponse: {
        text: "You: 'The music is nice.'",
        why: "Stockholm Syndrome. Never compliment hold music."
      },
      goodResponse: {
        text: "You: 'I am going [insane]. I might [hang up] just to save my soul.'",
        why: "Hyperbole ('save my soul') is the correct response to bureaucratic torture."
      }
    }
  ],
  quizItems: [
    {
      question: "If someone says 'Have fun' about a root canal, what do they mean?",
      options: [
        "They think dentistry is a hobby.",
        "They are mocking your pain playfully.",
        "They want you to smile.",
        "They are a dentist."
      ],
      correctIndex: 1,
      explanation: "It is irony. They know it will be painful/boring, so 'Have fun' highlights the misery."
    },
    {
      question: "What is the correct tone response to a sarcastic 'Have fun'?",
      options: [
        "Sincere gratitude.",
        "A dry laugh or sarcastic 'Thanks'.",
        "Anger.",
        "Crying."
      ],
      correctIndex: 1,
      explanation: "Fight sarcasm with sarcasm. A dry 'Oh yeah, it's gonna be a blast' is perfect."
    },
    {
      question: "Can 'Have fun' be rude?",
      options: [
        "Never.",
        "Yes, if they caused the mess you have to clean up.",
        "Only on Tuesdays.",
        "If they shout it."
      ],
      correctIndex: 1,
      explanation: "If I spill coffee and say 'Have fun cleaning that up', I am a monster. Context is key."
    }
  ]
};
