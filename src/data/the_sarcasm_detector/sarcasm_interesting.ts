import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmInteresting: Script = {
  id: "sarcasm-interesting",
  title: "That's... Interesting",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "The polite way to say 'I hate it'. Decoding the word 'Interesting' in different contexts.",
  imageUrl: "/images/scenarios/sarcasm_interesting_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The Safe Word",
    content: "When English speakers encounter something weird, ugly, or bad, they rarely say 'I hate it'. That is too aggressive. Instead, they say 'That's... interesting'. It is the ultimate social shield to avoid lying ('It's great') but also avoid truth ('It's ugly')."
  },
  sentences: [
    {
      id: "s1",
      scenario: "Your friend cooks a new dish. It tastes like burnt rubber. You say:",
      en: "The Taste Test",
      keywords: [
        { word: "flavor", definition: "taste" },
        { word: "texture", definition: "mouthfeel" }
      ],
      badResponse: {
        text: "You: 'This is garbage.'",
        why: "Too honest. You will hurt their feelings."
      },
      goodResponse: {
        text: "You: 'Wow! It has such a unique [flavor]. The [texture] is really... distinct.'",
        why: "You complimented the 'uniqueness' without actually saying it was good."
      }
    },
    {
      id: "s2",
      scenario: "You see abstract art that looks like a child threw paint at a wall. The artist asks what you think.",
      en: "The Art Critic",
      keywords: [
        { word: "bold", definition: "daring/risky" },
        { word: "choice", definition: "decision" }
      ],
      badResponse: {
        text: "You: 'My toddler could do this.'",
        why: "Insulting. Even if true, it's rude to the artist's face."
      },
      goodResponse: {
        text: "You: 'It's certainly a [bold] choice. Very... [conceptual].'",
        why: "'Bold' is code for 'crazy' or 'risky'. You sounded intellectual but non-committal."
      }
    },
    {
      id: "s3",
      scenario: "A coworker tells you a long, boring story about their stamp collection. You want to be polite.",
      en: "The Boring Story",
      keywords: [
        { word: "fascinating", definition: "very interesting (often fake)" },
        { word: "hobby", definition: "pastime" }
      ],
      badResponse: {
        text: "You: 'I am bored. Stop.'",
        why: "Social suicide. You can't just tell people they are boring."
      },
      goodResponse: {
        text: "You: 'Wow, that is [fascinating]. What a detailed [hobby] you have.'",
        why: "You validated their passion without promising to listen to more."
      }
    },
    {
      id: "s4",
      scenario: "Someone shows you their new haircut. It is a disaster.",
      en: "The Bad Haircut",
      keywords: [
        { word: "look", definition: "style/appearance" },
        { word: "different", definition: "not the same" }
      ],
      badResponse: {
        text: "You: 'Oh no. What happened?'",
        why: "They probably already know it's bad. Don't confirm their fears."
      },
      goodResponse: {
        text: "You: 'It's a whole new [look]! very [different] for you.'",
        why: "'Different' is the neutral sibling of 'Interesting'. It acknowledges the change without judging it."
      }
    }
  ],
  quizItems: [
    {
      question: "If you show someone your art and they pause before saying 'It's... interesting', they mean:",
      options: [
        "They are thinking deeply about it.",
        "They love it.",
        "They don't like it or don't get it.",
        "They want to buy it."
      ],
      correctIndex: 2,
      explanation: "The pause + 'interesting' is the giveaway. If they liked it, they would say 'It's amazing!' instantly."
    },
    {
      question: "What is a polite synonym for 'weird' in a professional setting?",
      options: [
        "Crazy.",
        "Unique.",
        "Stupid.",
        "Bad."
      ],
      correctIndex: 1,
      explanation: "'Unique' is the positive spin on 'Weird'. It frames the strangeness as a special quality."
    },
    {
      question: "Why do use vague words like 'Interesting' or 'Different'?",
      options: [
        "To lie maliciously.",
        "To confuse people.",
        "To preserve the relationship while avoiding false praise.",
        "Because we don't know other words."
      ],
      correctIndex: 2,
      explanation: "It's about social preservation. Honesty without kindness is brutality."
    }
  ]
};
