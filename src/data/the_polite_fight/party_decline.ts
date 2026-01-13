import { Script } from "@/types";

export const partyDecline: Script = {
  id: "party_decline",
  title: "The Art of Saying No",
  categorySlug: "the_polite_fight",
  categoryName: "The Polite Fight",
  section: "Friends & Family",
  cleanedEnglish: "How to decline an invitation without over-explaining or lying.",
  type: "script",
  mode: "standard",
  difficulty: "Medium 🌶️🌶️",
  context: "A friend invites you to a big birthday party, but you are exhausted and just want to stay home.",
  imageUrl: "/images/scenarios/party_decline.jpg",
  culturalInsights: {
    title: "Cultural Context: The Value of 'No'",
    content: "In many Western cultures, 'No' is a complete sentence. You don't need to invent a fake illness or a family emergency to decline an invite. Simple honesty (softened with gratitude) is often respected more than a flaky excuse. Over-explaining can actually make you sound guilty or like you're lying.",
  },
  sentences: [
    {
      id: "1",
      scenario: "Your friend sends a text: 'Hey! Having a huge bash for my 30th on Saturday! You in?' You want to say no.",
      en: "I'd love to, but I'm beat. I'm going to sit this one out.",
      keywords: [
        { word: "beat", definition: "Very tired; exhausted" },
        { word: "sit this one out", definition: "Choose not to participate in an event" },
      ],
      badResponse: {
        text: "I can't go. I think I might be getting sick... cough cough.",
        why: "Lying creates anxiety (what if they see you out?). It also sets a precedent that you need a 'medical excuse' to say no.",
      },
      goodResponse: {
        text: "Thanks for the invite! I'm honestly [beat] this week, so I'm going to [sit this one out]. Have a blast though!",
        why: "It starts with gratitude ('Thanks'), gives a brief, honest reason ('beat'), and closes with kindness ('Have a blast'). No fake excuses needed.",
      },
    },
    {
      id: "2",
      scenario: "They push back: 'Come on! It won't be the same without you! Just for an hour?'",
      en: "I appreciate it, but I really need to recharge. Catch you next time?",
      keywords: [
        { word: "recharge", definition: "Rest and recover energy" },
        { word: "catch you", definition: "See you / meet you" },
      ],
      badResponse: {
        text: "Ugh, fine. I guess I can come for a bit.",
        why: "Reluctant agreement leads to resentment. You'll be grumpy at the party, and your friend will feel it.",
      },
      goodResponse: {
        text: "I really appreciate the push, but I need to [recharge] my batteries. I'll [catch you] next week for coffee?",
        why: "You acknowledge their desire to see you, but hold your boundary ('need to recharge'). Offering an alternative ('next week') shows you still value the friendship.",
      },
    },
    {
      id: "3",
      scenario: "The next day, they post photos. You feel a bit of FOMO (Fear Of Missing Out) or guilt.",
      en: "Looks like an amazing night! Glad you guys had fun.",
      keywords: [
        { word: "FOMO", definition: "Fear Of Missing Out" },
        { word: "blast", definition: "A very fun time" },
      ],
      badResponse: {
        text: "(Radio silence - you say nothing)",
        why: "Ignoring their joy makes it seem like you're mad or jealous. Acknowledging it validates their fun without you needing to be there.",
      },
      goodResponse: {
        text: "Looks like an absolute [blast]! So glad you guys had a great night.",
        why: "This confirms that you are happy *for* them, even if you weren't *with* them. It removes any lingering awkwardness about your absence.",
      },
    },
  ],
  quizItems: [
    {
      question: "Why is 'I think I'm sick' a risky excuse?",
      options: [
        "It makes people worry too much",
        "It's a lie that creates anxiety and sets a bad precedent",
        "It's too short",
      ],
      correctIndex: 1,
      explanation: "Lying forces you to 'maintain the lie.' Simple honesty ('I'm tired') is sustainable and respects the friendship.",
    },
    {
      question: "What does 'sit this one out' mean?",
      options: [
        "To sit on a chair outside",
        "To decline participating in a specific event",
        "To waiting for a better offer",
      ],
      correctIndex: 1,
      explanation: "It's a sporty idiom meaning you will stay on the 'bench' for this specific game/event, but aren't quitting the team (friendship).",
    },
    {
      question: "If a friend pushes you to come after you said no, what is the best strategy?",
      options: [
        "Get angry and block them",
        "Cave in and go",
        "Reiterate your need (broken record) but offer a future alternative",
      ],
      correctIndex: 2,
      explanation: "Stand firm on your boundary ('need to recharge') but soften the blow by suggesting a future low-energy meetup (coffee).",
    },
  ],
};
