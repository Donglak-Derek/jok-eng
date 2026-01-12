import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmNoOffense: Script = {
  id: "sarcasm-no-offense",
  title: "No Offense, But...",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "The polite warning that a huge insult is coming. Decoding 'No offense'.",
  imageUrl: "/images/scenarios/sarcasm_no_offense_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "The Offensive Shield",
    content: "When someone starts a sentence with 'No offense', they are 100% about to offend you. It is a fake shield used to excuse rude comments. It translates to: 'I know this is mean, but I want to say it anyway without consequences'."
  },
  sentences: [
    {
      id: "s1",
      scenario: "Your friend looks at your new haircut and says: 'No offense, but it makes you look old.'",
      en: "The Personal Attack",
      keywords: [
        { word: "rude", definition: "impolite" },
        { word: "asked", definition: "requested" }
      ],
      badResponse: {
        text: "You: 'None taken!'",
        why: "Do not accept the insult. They were rude."
      },
      goodResponse: {
        text: "You: 'That was [rude]. I didn't remember [asked] for your opinion.'",
        why: "You called out the insult. 'No offense' does not give them permission to be mean."
      }
    },
    {
      id: "s2",
      scenario: "A coworker questions your skills. 'No offense, but are you sure you can handle this?'",
      en: "The Competence Trap",
      keywords: [
        { word: "doubt", definition: "uncertainty/distrust" },
        { word: "qualified", definition: "skilled enough" }
      ],
      badResponse: {
        text: "You: 'Maybe you're right.'",
        why: "Don't let their fake politeness undermine your confidence."
      },
      goodResponse: {
        text: "You: 'Why do you [doubt] me? I am fully [qualified] for this.'",
        why: "Directly challenging the hidden insult exposes their doubt as baseless."
      }
    },
    {
      id: "s3",
      scenario: "Someone eats all your food. 'No offense, but you weren't eating it.'",
      en: "The Greedy Excuse",
      keywords: [
        { word: "mine", definition: "belongs to me" },
        { word: "ask", definition: "request permission" }
      ],
      badResponse: {
        text: "You: 'It's okay.'",
        why: "It is not okay to steal. 'No offense' is not a magic spell for forgiveness."
      },
      goodResponse: {
        text: "You: 'It was [mine]. Next time, [ask] first.'",
        why: "Set the boundary. Facts (it was yours) beat their weak excuse."
      }
    },
    {
      id: "s4",
      scenario: "A stranger criticizes your parenting/dog/car. 'No offense, but you're doing it wrong.'",
      en: "The Stranger Judge",
      keywords: [
        { word: "business", definition: "concern/affair" },
        { word: "help", definition: "assistance" }
      ],
      badResponse: {
        text: "You: 'Oh, thanks for the tip.'",
        why: "Don't thank strangers for unsolicited criticism."
      },
      goodResponse: {
        text: "You: 'This is none of your [business]. I don't need your [help].'",
        why: "Be firm. Strangers have no right to judge you under the guise of 'No offense'."
      }
    }
  ],
  quizItems: [
    {
      question: "What comes after the phrase 'No offense, but...'?",
      options: [
        "A compliment.",
        "A neutral fact.",
        "Something offensive.",
        "A question about the weather."
      ],
      correctIndex: 2,
      explanation: "It is a grammatical rule: 'No offense' is always followed by an insult."
    },
    {
      question: "Why do people say 'No offense'?",
      options: [
        "To be nice.",
        "To protect themselves from your anger.",
        "Because they are confused.",
        "To sound smart."
      ],
      correctIndex: 1,
      explanation: "It's a defensive maneuver. They want to say the mean thing but don't want to be the 'bad guy'."
    },
    {
      question: "What is the best response to 'No offense'?",
      options: [
        "Smile and agree.",
        "Say 'None taken' immediately.",
        "Ignore the 'No offense' part and address the insult.",
        "Say 'Thank you'."
      ],
      correctIndex: 2,
      explanation: "Strip away the shield. React to what they actually said."
    }
  ]
};
