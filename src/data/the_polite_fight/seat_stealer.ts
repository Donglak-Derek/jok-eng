import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const seatStealer: Script = {
  id: "polite-seat-stealer",
  title: "The Seat Stealer",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to kick someone out of your assigned seat without causing air rage.",
  imageUrl: "/images/scenarios/seat_stealer_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The 'Confusion' Strategy",
    content: "When someone is in your seat, saying 'Get out' makes you the bad guy, even if you are right. The polite trick is to pretend you are confused. Saying 'I think I might be in this seat?' forces them to check their ticket without feeling attacked."
  },
  sentences: [
    {
      id: "seat-1",
      scenario: "You board the plane. Someone is in 14B. Your ticket says 14B.",
      en: "The Confused Inquiry",
      keywords: [
        { word: "check", definition: "verify" },
        { word: "ticket", definition: "boarding pass" }
      ],
      badResponse: {
        text: "You: 'You're in my seat. Move.'",
        why: "Too aggressive for a metal tube in the sky."
      },
      goodResponse: {
        text: "You: 'Sorry, I think I might be in 14B? Could we quicky [check] our [ticket] numbers?'",
        why: "Acting unsure ('I think I might be') allows them to save face. It assumes it was an honest mistake."
      }
    },
    {
      id: "seat-2",
      scenario: "They say: 'Oh, can we switch? I want to sit with my wife.'",
      en: "The Seat Rejection",
      keywords: [
        { word: "comfortable", definition: "at ease" },
        { word: "aisle", definition: "walkway seat" }
      ],
      badResponse: {
        text: "You: 'No. I paid extra.'",
        why: "Valid, but cold. You are stuck next to them for 5 hours."
      },
      goodResponse: {
        text: "You: 'I totally understand, but I get motion sickness and really need the [aisle] to stay [comfortable].'",
        why: "Medical reasons ('motion sickness', 'leg cramp') are the best excuses because people can't argue with biology."
      }
    },
    {
      id: "seat-3",
      scenario: "They won't move. They are ignoring you.",
      en: "The Flight Attendant",
      keywords: [
        { word: "assist", definition: "help" },
        { word: "confusion", definition: "mix-up" }
      ],
      badResponse: {
        text: "You: 'Hey! I'm talking to you!'",
        why: "Shouting starts a fight."
      },
      goodResponse: {
        text: "You: (To staff) 'Excuse me, there seems to be a bit of [confusion] with the seating. Could you [assist] us?'",
        why: "Delegating the conflict to authority is the only safe move when diplomacy fails."
      }
    }
  ],
  quizItems: [
    {
      question: "Why should you pretend to be confused ('I think I might be here')?",
      options: [
        "Because you are dumb.",
        "To allow the other person to correct their mistake without embarrassment.",
        "Because you can't read.",
        "To trick them."
      ],
      correctIndex: 1,
      explanation: "Proving you are right is less important than getting the seat peacefully."
    },
    {
      question: "What is the best excuse to refuse a seat swap?",
      options: [
        "I hate you.",
        "I paid more money.",
        "A medical/physical reason (Motion sickness, height, anxiety).",
        "No."
      ],
      correctIndex: 2,
      explanation: "People respect physical needs more than preferences."
    },
    {
      question: "If they refuse to move, what do you do?",
      options: [
        "Sit on them.",
        "Call the flight attendant.",
        "Cry.",
        "Go to the cockpit."
      ],
      correctIndex: 1,
      explanation: "Never fight on a plane. Authority figures are there for this exact reason."
    }
  ]
};
