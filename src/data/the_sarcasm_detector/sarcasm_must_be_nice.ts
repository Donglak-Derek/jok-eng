import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmMustBeNice: Script = {
  id: "sarcasm-must-be-nice",
  title: "Must Be Nice",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "The ultimate phrase for jealousy. When 'Nice' means 'I hate you because I am jealous'.",
  imageUrl: "/images/scenarios/sarcasm_must_be_nice_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The Jealousy Trap",
    content: "'Must be nice' is pure passive-aggression. It takes your happiness or success and twists it into guilt. It implies: 'You have it easy, and I suffer'."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You leave work at 5:00 PM. Your coworker (who is staying late) says: 'Leaving already? Must be nice.'",
      en: "The Slacker Accusation",
      keywords: [
        { word: "finished", definition: "completed" },
        { word: "hours", definition: "scheduled time" }
      ],
      badResponse: {
        text: "You: 'Sorry! I feel bad.'",
        why: "Don't apologize for doing your job correctly. They are trying to guilt you."
      },
      goodResponse: {
        text: "You: 'Yep! I [finished] my work. See you during normal [hours] tomorrow!'",
        why: "Cheerfully owning it ('Yep!') neutralizes their attempt to shame you."
      }
    },
    {
      id: "s2",
      scenario: "You buy a new phone. Someone says: 'Must be nice to be rich.'",
      en: "The Money Envy",
      keywords: [
        { word: "priorities", definition: "choices" },
        { word: "saved", definition: "kept money" }
      ],
      badResponse: {
        text: "You: 'I'm not rich! It was on sale!'",
        why: "Defending your finances is a trap. You don't owe them an audit."
      },
      goodResponse: {
        text: "You: 'It's all about [priorities]. I [saved] for months for this.'",
        why: "You remind them that 'nice' things come from hard work, not magic."
      }
    },
    {
      id: "s3",
      scenario: "You mention sleeping until noon on Saturday. A parent says: 'Must be nice to have no responsibilities.'",
      en: "The Martyr",
      keywords: [
        { word: "choice", definition: "decision" },
        { word: "rest", definition: "sleep" }
      ],
      badResponse: {
        text: "You: 'I have responsibilities too! I have a cat!'",
        why: "Comparing a cat to a child will make them angrier. Don't engage."
      },
      goodResponse: {
        text: "You: 'It was a great [choice]. Enjoy your kids, I'll enjoy my [rest].'",
        why: "Politely agreeing ('It was great') shuts down the comparison game."
      }
    },
    {
      id: "s4",
      scenario: "You travel for work. 'Must be nice to get a free vacation.'",
      en: "The Work Trip Myth",
      keywords: [
        { word: "meetings", definition: "work gathering" },
        { word: "hotel", definition: "temporary lodging" }
      ],
      badResponse: {
        text: "You: 'It's actually really hard work.'",
        why: "They won't believe you. Work trips always look like fun from the outside."
      },
      goodResponse: {
        text: "You: 'If you like [meetings] inside a windowless [hotel], it's paradise.'",
        why: "A little sarcastic truth shatters their fantasy."
      }
    }
  ],
  quizItems: [
    {
      question: "What emotion drives the phrase 'Must be nice'?",
      options: [
        "Happiness for you.",
        "Jealousy and resentment.",
        "Curiosity.",
        "Fear."
      ],
      correctIndex: 1,
      explanation: "It is the sound of envy. They want what you have but are angry they don't have it."
    },
    {
      question: "If you apologize when someone says 'Must be nice', what happens?",
      options: [
        "They feel better.",
        "You validate their guilt-trip and feel bad.",
        "You become best friends.",
        "They give you money."
      ],
      correctIndex: 1,
      explanation: "Apologizing accepts the premise that you *should* feel guilty for your success/luck."
    },
    {
      question: "Is 'Must be nice' ever a genuine compliment?",
      options: [
        "Yes, in very rare, specific tones.",
        "No.",
        "Only if said by a robot.",
        "Maybe?"
      ],
      correctIndex: 1,
      explanation: "Almost never. Even if they mean it, the phrase carries too much negative baggage. Avoid it."
    }
  ]
};
