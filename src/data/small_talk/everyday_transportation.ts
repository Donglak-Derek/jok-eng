import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const transportation: Script = {
  id: "everyday-transportation",
  title: "The Uber Dilemma",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "To talk or not to talk? Navigating rideshare awkwardness.",
  imageUrl: "/images/scenarios/uber_dilemma_3d.png",
  mode: "cloze",

  culturalInsights: {
    title: "The 5-Star Rating Game",
    content: "In Uber/Lyft culture, both the driver and passenger rate each other. The golden rule: Be ready on time, don't slam the door, and read the vibe. If the driver isn't talking, they probably want quiet. If they are chatting, a little polite banter ensures a 5-star rating."
  },

  quizItems: [
    {
      question: "The driver is silent. You want to open the window. What do you do?",
      options: [
        "Just open it without asking.",
        "Ask 'Do you mind if I crack the window?'",
        "Suffer in silence.",
        "Break the glass."
      ],
      correctIndex: 1,
      explanation: "Always ask before adjusting the environment (windows, AC, music). 'Crack the window' means opening it slightly."
    },
    {
      question: "You are ending the ride. What is the standard polite goodbye?",
      options: [
        "Get out silently.",
        "Here is money.",
        "Thanks, have a good one!",
        "Drive faster next time."
      ],
      correctIndex: 2,
      explanation: "'Have a good one' is the universal casual upbeat goodbye in the US."
    },
    {
      question: "The driver is talking about their divorce. You just want quiet. You say:",
      options: [
        "Stop talking.",
        "I'm sorry to hear that. I've had a long day so I'm gonna zone out a bit.",
        "That sucks.",
        "Get a lawyer."
      ],
      correctIndex: 1,
      explanation: "Politely invoking 'tiredness' is the best way to stop a conversation without offending them."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Entry Greeting",
      scenario: "Getting into the car",
      keywords: [
        { word: "Confirm", definition: "Check verify" },
        { word: "Heading to", definition: "Going towards" }
      ],
      badResponse: {
          text: "(Get in silently and stare at phone)",
          why: "Creepy and rude."
      },
      goodResponse: {
          text: "Hi, how's it going? Heading to [Main Street], right?",
          why: "Friendly verification to ensure you aren't being kidnapped."
      }
    },
    {
      id: "s2",
      en: "The Temperature negotiation",
      scenario: "It is freezing inside the car",
      keywords: [
        { word: "Blast", definition: "Blowing strongly" },
        { word: "AC", definition: "Air Conditioning" }
      ],
      badResponse: {
          text: "Turn off the cold.",
          why: "Too direct."
      },
      goodResponse: {
          text: "Do you mind if we turn down the AC just a bit? It's a little [chilly] back here.",
          why: "Polite request using 'Do you mind'."
      }
    },
    {
      id: "s3",
      en: "The 'Chatty Driver' Defense",
      scenario: "Driver keeps talking but you are tired",
      keywords: [
        { word: "Long day", definition: "Exhausting day" },
        { word: "Zone out", definition: "Stop paying attention/relax" }
      ],
      goodResponse: {
          text: "Yeah... (polite laugh). Sorry, I've had such a [long day], I'm probably just going to [zone out] for a bit.",
          why: "Politely shuts down conversation without being mean."
      }
    },
    {
      id: "s4",
      en: "The Navigation Assist",
      scenario: "Driver looks confused",
      keywords: [
        { word: "Pull up", definition: "Stop the car" },
        { word: "Right here", definition: "Exact spot" }
      ],
      badResponse: {
          text: "You missed the turn! Stop!",
          why: "Panic inducing."
      },
      goodResponse: {
          text: "You can just [pull up] right here on the corner. That's perfect, thanks.",
          why: "Calm guidance for the drop-off."
      }
    },
    {
      id: "s5",
      en: "The Exit",
      scenario: "Getting out",
      keywords: [
        { word: "Safe", definition: "Unharmed" },
        { word: "Rating", definition: "Score" }
      ],
      goodResponse: {
          text: "Thanks for the ride! Drive distinct safe. 5 stars!",
          why: "Explicitly mentioning '5 stars' often guarantees you get 5 stars back."
      }
    }
  ]
};
