import { Script } from "@/types";

export const greetingsSmallTalk: Script = {
  id: "casual_small_talk_1",
  title: "Casual Small Talk",
  categorySlug: "small_talk",
  categoryName: "Small Talk",
  cleanedEnglish: "Simple greetings and questions to start a friendly conversation.",
  
  // Engagement Data
  imageUrl: "/images/categories/small_talk.svg", // Using placeholder for now
  culturalNote: {
    title: "The 'How are you?' Trap",
    content: "In Western culture, 'How are you?' is often just a greeting, not a real question. A simple 'Good, you?' is usually expected unless you're talking to a close friend."
  },
  quizItems: [
    {
      question: "If someone says 'How's it going?', what is a natural response?",
      options: ["I am 70kg.", "Not bad, you?", "Yes, I am going.", "My existential dread is rising."],
      correctIndex: 1,
      explanation: "'Not bad, you?' is the most natural, low-pressure response to a casual greeting."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "Hey! Made it before the coffee disappears.",
      keywords: [
        { word: "made it", definition: "arrived successfully" },
        { word: "disappears", definition: "vanishes / runs out" },
      ],
    },
    {
      id: "s2",
      en: "How's your day treating you so far?",
      keywords: [
        { word: "treating you", definition: "going for you" },
        { word: "so far", definition: "up to now" },
      ],
    },
    {
      id: "s3",
      en: "Nice to see you—surviving the week?",
      keywords: [
        { word: "surviving", definition: "getting through tough times" },
        { word: "week", definition: "Mon-Fri work days" },
      ],
    },
    {
      id: "s4",
      en: "That weather is doing stand-up comedy today—sunny then dramatic.",
      keywords: [
        { word: "stand-up", definition: "comedy performance" },
        { word: "dramatic", definition: "sudden and striking" },
      ],
    },
    {
      id: "s5",
      en: "Any fun plans after work or just couch-hero mode?",
      keywords: [
        { word: "plans", definition: "intentions" },
        { word: "couch", definition: "sofa" },
      ],
    },
    {
      id: "s6",
      en: "I’m on my third coffee—wish me luck.",
      keywords: [
        { word: "third", definition: "number 3 in sequence" },
        { word: "wish me luck", definition: "hope for my success" },
      ],
    },
    {
      id: "s7",
      en: "If you need the good snacks, they’re hiding in the second drawer.",
      keywords: [
        { word: "snack", definition: "light food" },
        { word: "drawer", definition: "sliding storage box" },
      ],
    },
    {
      id: "s8",
      en: "Okay, this is your floor—have a good one!",
      keywords: [
        { word: "floor", definition: "level of building" },
        { word: "have a good one", definition: "have a good day" },
      ],
    },
  ],
};
