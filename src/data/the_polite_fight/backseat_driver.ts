import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const backseatDriver: Script = {
  id: "polite-backseat-driver",
  title: "The Backseat Driver",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to silence a passenger who won't stop criticizing your driving.",
  imageUrl: "/images/scenarios/backseat_driver_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The 'Focus' Card",
    content: "Driving is a safety issue. The polite way to shut down a critic is not to say 'I know how to drive' (Ego battle), but to say 'I need to focus' (Safety). No one wants to distract the driver, so they will shut up immediately."
  },
  sentences: [
    {
      id: "drive-1",
      scenario: "Friend says: 'You should have turned there! You're going too fast!'",
      en: "The Safety Shield",
      keywords: [
        { word: "focus", definition: "concentrate" },
        { word: "monitor", definition: "watch/track" }
      ],
      badResponse: {
        text: "You: 'Shut up! I'm driving!'",
        why: "A bit too aggressive implies you are stressed."
      },
      goodResponse: {
        text: "You: 'Hey, I really need to [focus] on the GPS right now. Could you help me [monitor] the map instead?'",
        why: "Giving them a job ('monitor the map') channels their energy into something useful."
      }
    },
    {
      id: "drive-2",
      scenario: "They gasp loudly every time you brake.",
      en: "The Gasp check",
      keywords: [
        { word: "nervous", definition: "anxious" },
        { word: "relax", definition: "calm down" }
      ],
      badResponse: {
        text: "You: 'Stop making that noise! It's annoying!'",
        why: "They will deny doing it."
      },
      goodResponse: {
        text: "You: 'Everything okay? The gasping is making me a bit [nervous]. Maybe [relax] and close your eyes?'",
        why: "Pointing out that *they* are making *you* nervous reverses the dynamic. They are now the danger."
      }
    },
    {
      id: "drive-3",
      scenario: "They suggest a 'better route' you don't want to take.",
      en: "The Captain's Call",
      keywords: [
        { word: "stick to", definition: "keep following" },
        { word: "confused", definition: "mixed up" }
      ],
      badResponse: {
        text: "You: 'My way is better.'",
        why: "Invites an argument."
      },
      goodResponse: {
        text: "You: 'I'm going to [stick to] the route I know so I don't get [confused]. Thanks though!'",
        why: "You aren't claiming your way is faster, just 'safer' for you. Unarguable."
      }
    }
  ],
  quizItems: [
    {
      question: "What is the best way to stop backseat driving?",
      options: [
        "Eject them from the car.",
        "Claim you need silence to 'Focus' for safety.",
        "Drive faster.",
        "Turn up the music."
      ],
      correctIndex: 1,
      explanation: "Safety is the ultimate trump card in a car conversation."
    },
    {
      question: "Why should you give them a job (e.g., Check the map)?",
      options: [
        "They are bored.",
        "It misdirects their anxiety into a task.",
        "To annoy them.",
        "Because you are lost."
      ],
      correctIndex: 1,
      explanation: "Most backseat drivers are just anxious control freaks. Give them something to control."
    },
    {
      question: "If someone gasps when you drive, what does it mean?",
      options: [
        "They are dying.",
        "They are trying to control you with fear.",
        "They saw a ghost.",
        "The car is broken."
      ],
      correctIndex: 1,
      explanation: "It is a passive-aggressive way to say 'You are a bad driver'."
    }
  ]
};
