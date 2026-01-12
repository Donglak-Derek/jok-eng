import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const loudNeighbor: Script = {
  id: "polite-loud-neighbor",
  title: "The 2AM Party Neighbor",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to ask for silence without making enemies next door.",
  imageUrl: "/images/scenarios/loud_neighbor_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The Thin Wall Defense",
    content: "Directly criticizing a neighbor ('You are loud') creates a permanent enemy. The polite trick is to blame the building. By saying 'These walls are so thin', you shift the blame to the architecture, making it a shared problem rather than a personal attack."
  },
  sentences: [
    {
      id: "neighbor-1",
      scenario: "It is Tuesday, 11 PM. Your neighbor is blasting techno music.",
      en: "The Friendly Knock",
      keywords: [
        { word: "notch", definition: "small amount" },
        { word: "early", definition: "start of day" }
      ],
      badResponse: {
        text: "You: 'Open up! Shut it down!'",
        why: "Starting at 100% anger leaves no room for negotiation."
      },
      goodResponse: {
        text: "You: 'Hey! Looks like a fun party. I've got an [early] start tomorrow, could you take it down a [notch]?'",
        why: "Validating their fun ('Looks fun') before asking for a favor reduces defensiveness."
      }
    },
    {
      id: "neighbor-2",
      scenario: "They say 'Is it really that loud?'",
      en: "The Building Blame",
      keywords: [
        { word: "walls", definition: "structure" },
        { word: "hear", definition: "perceive sound" }
      ],
      badResponse: {
        text: "You: 'Yes, you are deafening.'",
        why: "Calling them loud feels like an attack."
      },
      goodResponse: {
        text: "You: 'Honestly, these [walls] are paper thin. I can [hear] everything.'",
        why: "You are blaming the poor construction, not their party."
      }
    },
    {
      id: "neighbor-3",
      scenario: "It happens again the next night.",
      en: "The Firm Reminder",
      keywords: [
        { word: "police", definition: "cops" },
        { word: "cool", definition: "relaxed/okay" }
      ],
      badResponse: {
        text: "You call the police immediately.",
        why: "Escalating to cops ends any chance of a friendly relationship."
      },
      goodResponse: {
        text: "You: 'Hey man, we want to be [cool] with you, but we can't sleep. Don't make us call the [police].'",
        why: "A warning ('Don't make us') is better than a surprise attack."
      }
    }
  ],
  quizItems: [
    {
      question: "Why should you blame the walls?",
      options: [
        "Because walls have feelings.",
        "To avoid blaming the neighbor personally.",
        "Because it is scientifically true.",
        "To sound smart."
      ],
      correctIndex: 1,
      explanation: "It saves face. 'We are both victims of this bad building' creates camaraderie."
    },
    {
      question: "What does 'take it down a notch' mean?",
      options: [
        "Turn the volume down a little bit.",
        "Destroy the stereo.",
        "Move to a lower floor.",
        "Drink less alcohol."
      ],
      correctIndex: 0,
      explanation: "It is a common idiom for reducing intensity or volume slightly."
    },
    {
      question: "When is it okay to be rude to a loud neighbor?",
      options: [
        "Immediately.",
        "Never, you have to live next to them.",
        "If they are eating pizza.",
        "If it is a Tuesday."
      ],
      correctIndex: 1,
      explanation: "Even if they obey you, a neighbor who hates you can make your life miserable in other ways. Stay diplomatic."
    }
  ]
};
