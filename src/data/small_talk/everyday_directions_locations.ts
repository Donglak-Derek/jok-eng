import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const directionsAndLocations: Script = {
  id: "everyday-directions-locations",
  title: "Lost in Translation",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Asking for directions when Google Maps betrays you.",
  imageUrl: "/images/scenarios/lost_upside_down_map_3d.png",
  mode: "cloze",

  culturalNote: {
    title: "Landmark Navigation",
    content: "Locals rarely use street names ('Turn on 4th Ave'). They use landmarks: 'Turn left at the Starbucks', 'Go past the big ugly statue'. If you look confused, they will usually point and say 'It's that way'."
  },

  quizItems: [
    {
      question: "You are visibly lost. A local asks if you need help. You say:",
      options: [
        "Go away.",
        "Yes, I am looking for the station.",
        "I live here. (Lie)",
        "Scream."
      ],
      correctIndex: 1,
      explanation: "Most people enter 'Helper Mode' instantly. Just say what you are looking for."
    },
    {
      question: "Someone gives you complicated directions. You didn't understand. You say:",
      options: [
        "Thanks! (Walk away and cry).",
        "Could you repeat that last part?",
        "You speak too fast.",
        "Whatever."
      ],
      correctIndex: 1,
      explanation: "It is better to ask for a repeat than to walk in the wrong direction for 20 minutes."
    },
    {
      question: "A local says 'It's just down the road'. How far is it?",
      options: [
        "1 minute.",
        "5 minutes.",
        "Could be 5 minutes, could be 5 miles.",
        "Right here."
      ],
      correctIndex: 2,
      explanation: "'Just down the road' is a dangerous, vague unit of measurement. Be skeptical."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Confused Tourist",
      scenario: "Your phone GPS died",
      keywords: [
        { word: "Turned around", definition: "Lost/Disoriented" },
        { word: "Direction", definition: "Way" }
      ],
      badResponse: {
          text: "Where is the museum?",
          why: "A bit abrupt."
      },
      goodResponse: {
          text: "Excuse me, I'm a little [turned around]. Could you point me in the [direction] of the museum?",
          why: "'Turned around' sounds less pathetic than 'lost'."
      }
    },
    {
      id: "s2",
      en: "The Landmark Check",
      scenario: "Verifying the path",
      keywords: [
        { word: "Past", definition: "Beyond" },
        { word: "Big", definition: "Large" }
      ],
      goodResponse: {
          text: "So I go [past] the big church, then turn right? Got it.",
          why: "Repeating the instructions back ensures you understood."
      }
    },
    {
      id: "s3",
      en: "The Uber Pickup",
      scenario: "Explaining where you are by phone",
      keywords: [
        { word: "Standing", definition: "Positioned" },
        { word: "Corner", definition: "Intersection" }
      ],
      goodResponse: {
          text: "I'm [standing] right on the [corner], next to the bright yellow mailbox.",
          why: "Visual cues (color, object) helps drivers find you faster than addresses."
      }
    },
    {
      id: "s4",
      en: "The Distance Query",
      scenario: "Deciding to walk or drive",
      keywords: [
        { word: "Walkable", definition: "Close enough to walk" },
        { word: "Hop in", definition: "Get in" }
      ],
      badResponse: {
          text: "Is it far?",
          why: "Vague."
      },
      goodResponse: {
          text: "Is it [walkable] from here, or should I [hop in] a cab?",
          why: "Specifically asks about effort required."
      }
    },
    {
      id: "s5",
      en: "The Bathroom Emergency",
      scenario: "You need a toilet NOW",
      keywords: [
        { word: "Restroom", definition: "Toilet" },
        { word: "Closest", definition: "Nearest" }
      ],
      goodResponse: {
          text: "Sorry to ask, but do you know where the [closest] public [restroom] is?",
          why: "Polite but urgent."
      }
    }
  ]
};
