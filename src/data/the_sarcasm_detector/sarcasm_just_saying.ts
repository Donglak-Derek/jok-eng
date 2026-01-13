import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmJustSaying: Script = {
  id: "sarcasm-just-saying",
  title: "I'm Just Saying",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "The coward's way of giving an unsolicited opinion. Decoding 'Just saying'.",
  imageUrl: "/images/scenarios/sarcasm_just_saying_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The Opinion Shield",
    content: "When someone ends a rude comment with 'I'm just saying', they are trying to escape responsibility. They are claiming to be a neutral observer of facts, when actually they are judging you. It means: 'Don't get mad at me for speaking the truth'."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You are eating a burger. Your friend says: 'That has a lot of calories. Just saying.'",
      en: "The Health Police",
      keywords: [
        { word: "judgment", definition: "critical opinion" },
        { word: "enjoy", definition: "take pleasure in" }
      ],
      badResponse: {
        text: "You: 'Yeah, I shouldn't eat this.'",
        why: "Don't let them shame you while you eat."
      },
      goodResponse: {
        text: "You: 'I don't need your [judgment]. Let me [enjoy] my food.'",
        why: "Call it what it is: judgment, not 'just saying'."
      }
    },
    {
      id: "s2",
      scenario: "You talk about your relationship. 'He doesn't sound very nice. Just saying.'",
      en: "The Relationship Expert",
      keywords: [
        { word: "know", definition: "have knowledge" },
        { word: "opinion", definition: "personal view" }
      ],
      badResponse: {
        text: "You: 'You're right, he's awful.'",
        why: "Unless you asked for advice, don't let them plant negative seeds."
      },
      goodResponse: {
        text: "You: 'You don't [know] him. Keep your [opinion] to yourself.'",
        why: "Remind them that 'just saying' doesn't mean they know the whole story."
      }
    },
    {
      id: "s3",
      scenario: "A coworker comments on your long hours. 'You work too hard. Just saying.'",
      en: "The Concern Troll",
      keywords: [
        { word: "manage", definition: "control/handle" },
        { word: "worry", definition: "be anxious" }
      ],
      badResponse: {
        text: "You: 'I know, I'm crazy.'",
        why: "Self-deprecation just validates their criticism."
      },
      goodResponse: {
        text: "You: 'I can [manage] my time. Don't [worry] about me.'",
        why: "Dismiss their fake concern politely but firmly."
      }
    },
    {
      id: "s4",
      scenario: "Someone insults your favorite movie. 'It was boring. Just saying.'",
      en: "The Fact Maker",
      keywords: [
        { word: "fact", definition: "truth" },
        { word: "subjective", definition: "personal opinion" }
      ],
      badResponse: {
        text: "You: 'No it wasn't!'",
        why: "Don't argue taste. You can't win."
      },
      goodResponse: {
        text: "You: 'That's not a [fact], that's [subjective]. I loved it.'",
        why: "Clarify that their opinion is not the universal truth."
      }
    }
  ],
  quizItems: [
    {
      question: "What does 'I'm just saying' usually imply?",
      options: [
        "I am speaking words.",
        "My opinion is a fact and you should listen.",
        "I am singing.",
        "I have a sore throat."
      ],
      correctIndex: 1,
      explanation: "It frames a subjective (often rude) opinion as an objective observation."
    },
    {
      question: "Your friend insults your outfit and adds 'Just saying'. You feel:",
      options: [
        "Happy.",
        "Grateful.",
        "Annoyed and judged.",
        "Hungry."
      ],
      correctIndex: 2,
      explanation: "It's annoying because it's unsolicited criticism without taking responsibility."
    },
    {
      question: "Is 'Just saying' a good way to give advice?",
      options: [
        "Yes, it softens the blow.",
        "No, it sounds passive-aggressive.",
        "Only if you whisper it.",
        "Yes, always."
      ],
      correctIndex: 1,
      explanation: "If you want to give advice, ask permission. Don't drop a bomb and run away with 'Just saying'."
    }
  ]
};
