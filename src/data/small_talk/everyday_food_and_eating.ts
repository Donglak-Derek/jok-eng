import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const foodAndEating: Script = {
  id: "everyday-food-and-eating",
  title: "Dining Drama",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Navigating menus, allergies, and the awkwardness of 'The Bill'.",
  imageUrl: "/images/scenarios/dining_bill_shock_3d.png",
  mode: "cloze",

  culturalInsights: {
    title: "The Bill Dance",
    content: "When the check comes, it's polite to offer 'I've got this' or 'Shall we split it?'. In the US, splitting 'down the middle' (50/50) is common for friends, even if one person ate slightly more, just to save time. And NEVER forget the tip (20%)."
  },

  quizItems: [
    {
      question: "You found a hair in your soup. How do you tell the waiter?",
      options: [
        "Scream and throw the soup.",
        "Whisper politely 'Excuse me, I think there is a hair in this'.",
        "Eat around it.",
        "Leave without paying."
      ],
      correctIndex: 1,
      explanation: "Mistakes happen. Being quiet and polite ('Whisper') saves the waiter from embarrassment and usually gets you a free meal."
    },
    {
      question: "Someone offers to pay the whole bill ('It's on me!'). You should:",
      options: [
        "Say 'Okay!' immediately.",
        "Argue for 20 minutes.",
        "Offer to pay once ('Are you sure?'), then accept graciously.",
        "Run away."
      ],
      correctIndex: 2,
      explanation: "This is 'The Dance'. You must offer to pay once to show you aren't a moocher, but let them accept the glory."
    },
    {
      question: "There is one piece of pizza left. You want it. You say:",
      options: [
        "Mine!",
        "Does anyone want the last piece?",
        "Eat it immediately.",
        "Touch it so no one else wants it."
      ],
      correctIndex: 1,
      explanation: "Always ask. Usually, people will say 'No, go ahead!'."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Dietary Fuss",
      scenario: "Asking about ingredients",
      keywords: [
        { word: "Side", definition: "Put separate" },
        { word: "Allergic", definition: "Medical reaction" }
      ],
      badResponse: {
          text: "I hate onions. Don't put them in.",
          why: "Sounds like a toddler."
      },
      goodResponse: {
          text: "Does this come with onions? I'm actually [allergic], so could I get them on the [side] or removed?",
          why: "Medical framing ('allergic') gets taken more seriously than preference."
      }
    },
    {
      id: "s2",
      en: "The Indecisive Order",
      scenario: "Waiter arrives but you aren't ready",
      keywords: [
        { word: "Minute", definition: "More time" },
        { word: "Decide", definition: "Choose" }
      ],
      goodResponse: {
          text: "Sorry, we need just one more [minute] to [decide]. Everything looks too good!",
          why: "Flattery ('Everything looks good') makes the delay less annoying."
      }
    },
    {
      id: "s3",
      en: "The 'Send Back' (Polite)",
      scenario: "The food is cold or wrong",
      keywords: [
        { word: "Bother", definition: "Annoy" },
        { word: "Cold", definition: "Not hot" }
      ],
      badResponse: {
          text: "This is garbage. Take it away.",
          why: "Rude."
      },
      goodResponse: {
          text: "I'm so sorry to [bother] you, but this came out a little [cold]. Would you mind heating it up?",
          why: "Apologizing ('Sorry to bother') puts the server on your side."
      }
    },
    {
      id: "s4",
      en: "The Bill Split",
      scenario: "Deciding who pays",
      keywords: [
        { word: "Split", definition: "Divide" },
        { word: "Venmo", definition: "Payment App" }
      ],
      goodResponse: {
          text: "Shall we just [split] it down the middle? I can [Venmo] you my half.",
          why: "Splitting equally saves the math headache."
      }
    },
    {
      id: "s5",
      en: "The Treat",
      scenario: "You want to pay for everyone",
      keywords: [
        { word: "Got this", definition: "Will pay" },
        { word: "Treat", definition: "Gift" }
      ],
      goodResponse: {
          text: "No, put your wallet away. I've [got this]. It's my [treat].",
          why: "Firm but generous."
      }
    }
  ]
};
