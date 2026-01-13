import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmGreat: Script = {
  id: "sarcasm-great-job",
  title: "Great Job (Not)",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "When praise is actually poison. Decoding 'Great', 'Perfect', and 'Just what I needed'.",
  imageUrl: "/images/scenarios/sarcasm_great_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The Inverted Superlative",
    content: "When things go wrong, English speakers often default to extreme praise to highlight the failure. If a car breaks down, we say 'Perfect'. If it starts raining, we say 'Just great'. It's a coping mechanism: we laugh so we don't scream."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You drop a stack of plates. They shatter everywhere. A bystander says: 'Great job.'",
      en: "The Clumsy Clap",
      keywords: [
        { word: "smooth", definition: "graceful" },
        { word: "help", definition: "assist" }
      ],
      badResponse: {
        text: "You: 'Thank you!'",
        why: "They are mocking your clumsiness. Accepting the praise makes you look oblivious."
      },
      goodResponse: {
        text: "You: 'Yeah, real [smooth], right? Don't [help], just watch.'",
        why: "You acknowledged your mistake ('real smooth') and called out their unhelpfulness."
      }
    },
    {
      id: "s2",
      scenario: "You missed the last bus home by one minute. You say to nobody:",
      en: "The Solo Sarcasm",
      keywords: [
        { word: "perfect", definition: "ideal (sarcastic: disastrous)" },
        { word: "day", definition: "outcome of events" }
      ],
      badResponse: {
        text: "You: 'This is very bad.'",
        why: "Too literal. Venting requires more dramatic flair."
      },
      goodResponse: {
        text: "You: 'Just [perfect]. This is exactly how I wanted to end my [day].'",
        why: "Framing the disaster as your 'plan' is a classic way to vent frustration."
      }
    },
    {
      id: "s3",
      scenario: "A team member deletes the wrong file. The leader sighs and says: 'Brilliant.'",
      en: "The Corporate Critique",
      keywords: [
        { word: "recover", definition: "get back" },
        { word: "backup", definition: "saved copy" }
      ],
      badResponse: {
        text: "You: 'Thanks boss!'",
        why: "Accepting sarcasm as praise is dangerous at work. They are angry."
      },
      goodResponse: {
        text: "You: 'It was a mistake. I'm trying to [recover] it from the [backup].'",
        why: "Ignore the sarcasm. Focus immediately on the solution to defuse the anger."
      }
    },
    {
      id: "s4",
      scenario: "You buy a cheap umbrella. It breaks instantly in the wind. You say:",
      en: "The Product Review",
      keywords: [
        { word: "quality", definition: "standard of excellence" },
        { word: "money", definition: "funds" }
      ],
      badResponse: {
        text: "You: 'This umbrella is broken.'",
        why: "A statement of fact. Boring."
      },
      goodResponse: {
        text: "You: 'Top [quality] engineering here. Best [money] I ever spent.'",
        why: "Mocking the cheap product by calling it 'top engineering' highlights how bad it is."
      }
    }
  ],
  quizItems: [
    {
      question: "If something terrible happens and someone says 'Just great', what tone do they usually use?",
      options: [
        "High pitched and happy.",
        "Whispered.",
        "Flat, falling tone.",
        "Singing."
      ],
      correctIndex: 2,
      explanation: "A falling intonation signals the opposite meaning. 'Great' (↘) = 'Terrible'."
    },
    {
      question: "Why do we use positive words ('Perfect', 'Brilliant') for bad situations?",
      options: [
        "To confuse enemies.",
        "To emphasize the failure through irony.",
        "Because we lack vocabulary.",
        "We are optimistic."
      ],
      correctIndex: 1,
      explanation: "The contrast between the word ('Perfect') and the reality (Disaster) highlights how bad it is."
    },
    {
      question: "Your boss says 'Nice work' after you make a mistake. You should:",
      options: [
        "Ask for a raise.",
        "Say 'Thanks'.",
        "Apologize and fix the mistake.",
        "Laugh."
      ],
      correctIndex: 2,
      explanation: "This is a reprimand disguised as a compliment. Treat it as a warning."
    }
  ]
};
