import { Script } from "@/types";

export const furnitureRefusal: Script = {
  id: "furniture_refusal",
  title: "The Favor Refusal",
  categorySlug: "the_polite_fight",
  categoryName: "The Polite Fight",
  section: "Friends & Family",
  cleanedEnglish: "How to say no to big favors (like moving) without losing a friend.",
  type: "script",
  mode: "standard",
  difficulty: "Spicy 🌶️🌶️🌶️",
  context: "A close friend asks you to help them move apartments this weekend. You hate moving and have a bad back / other plans.",
  imageUrl: "/images/scenarios/furniture_refusal.jpg",
  culturalInsights: {
    title: "Cultural Context: The 'Moving' Tax",
    content: "Asking friends to help move is a classic 'young fancy-free' tradition. However, as people get older (late 20s+), it becomes culturally acceptable to hire movers. Refusing to help move is not a sin, but how you do it matters. You need to separate the 'labor' from the 'support'.",
  },
  sentences: [
    {
      id: "1",
      scenario: "Friend: 'Hey man, I'm moving this Saturday. Can you come help me lift some boxes and the couch?'",
      en: "I can't do the heavy lifting, but I can bring pizza?",
      keywords: [
        { word: "heavy lifting", definition: "Physical hard work; moving furniture" },
        { word: "cheerleader", definition: "Someone who supports but doesn't play" },
      ],
      badResponse: {
        text: "No way. Moving sucks. Hire someone.",
        why: "While true, this is too blunt. It mocks their request and makes you sound unsupportive.",
      },
      goodResponse: {
        text: "Oh man, I'm retiring from [heavy lifting] these days! My back won't forgive me. I can't haul boxes, but I can swing by with pizza?",
        why: "Using humor ('retiring') softens the no. You refuse the specific task (lifting) but offer a supportive alternative (food/morale) so you aren't abandoning them completely.",
      },
    },
    {
      id: "2",
      scenario: "Friend: 'Really? I'm kind of desperate. Movers are so expensive.'",
      en: "I hear you, but physically I'm not up for it.",
      keywords: [
        { word: "bad back", definition: "Chronic back pain (common excuse, often true)" },
        { word: "up for it", definition: "Willing or able to do something" },
      ],
      badResponse: {
        text: "Not my problem. You should have saved money.",
        why: "This is judgmental and kicks them when they are down. Friends don't lecture friends on finances during a crisis.",
      },
      goodResponse: {
        text: "I totally get that movers are pricey, but physically I'm just not [up for it]. Trust me, you don't want me dropping your TV!",
        why: "You validate their struggle ('get that they are pricey') but hold your physical boundary. Self-deprecation ('dropping your TV') lightens the mood.",
      },
    },
    {
      id: "3",
      scenario: "You want to offer emotional support instead of physical labor.",
      en: "How about I come over once you're settled and we break in the new place?",
      keywords: [
        { word: "settled", definition: "Unpacked and comfortable in a new home" },
        { word: "break in", definition: "To celebrate or use something new for the first time" },
      ],
      badResponse: {
        text: "Call me when you're done.",
        why: "This sounds selfish, like you only want the fun parts of friendship.",
      },
      goodResponse: {
        text: "Tell you what—once you're [settled], let me come over and we'll [break in] the new patio with a few beers. My treat.",
        why: "This pivots the interaction to a future positive event. It reminds them that you value their new home, you just don't want to carry the sofa there.",
      },
    },
  ],
  quizItems: [
    {
      question: "What is the 'Pizza Strategy' for refusing labor?",
      options: [
        "Throwing pizza at them",
        "Refusing the hard work but offering a smaller, supportive contribution (food)",
        "Eating pizza while they work",
      ],
      correctIndex: 1,
      explanation: "It shows you care about *them* even if you won't do the *work*. It maintains the social bond.",
    },
    {
      question: "Why avoid saying 'You should have saved money'?",
      options: [
        "It's judgmental and unhelpful in the moment",
        "It's financial advice",
        "It's true",
      ],
      correctIndex: 0,
      explanation: "When a friend is stressed/desperate, they need empathy, not a lecture. 'Not my problem' destroys relationships.",
    },
    {
      question: "What does 'break in' mean in this context?",
      options: [
        "To damage something",
        "To enter illegally",
        "To celebrate/use a new space for the first time",
      ],
      correctIndex: 2,
      explanation: "To 'break in a new place' usually means to have the first drink, party, or relax session there.",
    },
  ],
};
