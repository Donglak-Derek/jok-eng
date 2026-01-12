import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theFineTrap: Script = {
  id: "sarcasm-the-fine-trap",
  title: "The 'Fine' Trap",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "When 'fine' means the opposite. Learn to spot the tone difference between genuine agreement and passive-aggressive anger.",
  imageUrl: "/images/scenarios/sarcasm_generic.png",
  mode: "cloze",
  culturalNote: {
    title: "The Danger of 'Fine'",
    content:
      "In English, the word 'fine' is a chameleon. Said brightly, it means 'okay'. But said with a flat or dropping tone, it often means 'I am angry but avoiding a fight' or 'This is terrible'. When a partner or colleague says 'It's fine' with a sigh, DO NOT assume everything is okay.",
  },
  sentences: [
    {
      id: "s1",
      scenario: "You apologize for being late. Your friend sighs, looks away, and says in a flat voice: 'Oh, don't worry about it. It's fine.'",
      en: "The Flat Fine",
      keywords: [
        { word: "not fine", definition: "Recognizing the lie" },
        { word: "keep you waiting", definition: "Acknowledging the delay" },
      ],
      badResponse: {
        text: "You: 'Great! I'm glad you're not mad.'",
        why: "You missed the tone. They are definitely mad. Ignoring it makes you look insensitive.",
      },
      goodResponse: {
        text: "You: 'I can tell it's [not fine]. I'm really sorry to [keep you waiting].'",
        why: "You acknowledged the underlying emotion (the sarcasm) despite their words.",
      },
    },
    {
      id: "s2",
      scenario: "You suggest a restaurant. Your partner raises their eyebrows and says: 'Sure, if you want to wait two hours for a table, that sounds *fun*.'",
      en: "The 'Fun' Trap",
      keywords: [
        { word: "point", definition: "Valid observation" },
        { word: "crowded", definition: "Too many people" },
      ],
      badResponse: {
        text: "You: 'Yeah, I love waiting! Let's go.'",
        why: "You took 'fun' literally. They are mocking the idea of waiting.",
      },
      goodResponse: {
        text: "You: 'Good [point]. Where should we go that isn't [crowded]?'",
        why: "You caught the sarcasm ('fun' = miserable) and pivoted to a better plan.",
      },
    },
    {
      id: "s3",
      scenario: "A coworker sees you struggling with a printer that never works. Coworker: 'Wow, that printer is just the pinnacle of modern technology, isn't it?'",
      en: "The Tech Praise",
      keywords: [
        { word: "genius", definition: "Brilliant (Sarcastic)" },
        { word: "frustration", definition: "Annoyance" },
      ],
      badResponse: {
        text: "You: 'I know! It's so high-tech.'",
        why: "You praised a broken machine. You missed that 'pinnacle' was hyperbole for 'garbage'.",
      },
      goodResponse: {
        text: "You: 'Truly engineering [genius]. I think it feeds on [frustration].'",
        why: "You joined in the banter by adding your own sarcastic exaggeration.",
      },
    },
    {
      id: "s4",
      scenario: "You ask your boss if you can leave early during a crisis. They smile tight and say: 'Do whatever you think is best for your career.'",
      en: "The Career Threat",
      keywords: [
        { word: "stay", definition: "remain" },
        { word: "important", definition: "critical priority" },
      ],
      badResponse: {
        text: "You: 'Thanks! See you tomorrow!'",
        why: "This was a trap. 'Do whatever you think' was a threat, not permission.",
      },
      goodResponse: {
        text: "You: 'Actually, I'll [stay] and help finish this. It is [important].'",
        why: "You recognized the passive-aggressive warning and made the wise choice.",
      },
    },
  ],
  quizItems: [
    {
      question: "If someone says 'It's fine' with a flat, low tone, what do they likely mean?",
      options: [
        "They are perfectly happy.",
        "They are tired physically.",
        "They are unhappy or angry.",
        "They are excited.",
      ],
      correctIndex: 2,
      explanation: "A flat, low tone usually signals detachment or suppressed anger. If they were happy, the pitch would be higher.",
    },
    {
      question: "What is the best way to respond to sarcasm in a friendly situation?",
      options: [
        "Ignore it and take it literally.",
        "Get angry and shout.",
        "Acknowledge the true meaning or join the banter.",
        "Ask for a dictionary definition.",
      ],
      correctIndex: 2,
      explanation: "Playfully acknowledging the sarcasm ('Yeah, pure genius') builds connection. Taking it literally kills the vibe.",
    },
    {
      question: "Someone says 'Oh, I just LOVE early morning meetings' while rolling their eyes. They mean:",
      options: [
        "They are excited.",
        "They hate them.",
        "They are confused.",
        "They love mornings but hate meetings."
      ],
      correctIndex: 1,
      explanation: "Rolling eyes + 'LOVE' = Classic sarcasm tone for 'I hate this'."
    }
  ],
};
