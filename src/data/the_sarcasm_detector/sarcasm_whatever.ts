import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmWhatever: Script = {
  id: "sarcasm-whatever",
  title: "Whatever.",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "The most dangerous word in English. It doesn't mean 'anything', it means 'I am done with you'.",
  imageUrl: "/images/scenarios/sarcasm_whatever_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The Conversation Killer",
    content: "When used as a standalone sentence, 'Whatever' is not a choice—it is a weapon. It signals total apathy and dismissal. It says 'I don't care enough to argue with you anymore'. Use with extreme caution."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You are arguing about where to eat. After 10 minutes, your partner rolls their eyes and says: 'Fine. Whatever.'",
      en: "The Fake Compromise",
      keywords: [
        { word: "care", definition: "have interest" },
        { word: "fight", definition: "argue" }
      ],
      badResponse: {
        text: "You: 'Great! Pizza it is!'",
        why: "Huge mistake. They are not agreeing; they are giving up. The pizza will taste like resentment."
      },
      goodResponse: {
        text: "You: 'You clearly don't [care], but I don't want to [fight]. Pick something else.'",
        why: "Calling out the apathy ('You don't care') forces them to re-engage or admit they are annoyed."
      }
    },
    {
      id: "s2",
      scenario: "You apologize for a mistake, but it sounds insincere. Your friend shrugs and says: 'Yeah, whatever.'",
      en: "The Wet Blanket",
      keywords: [
        { word: "sorry", definition: "apologetic" },
        { word: "fix", definition: "repair" }
      ],
      badResponse: {
        text: "You: 'Glad we're cool.'",
        why: "You are not cool. 'Whatever' here means 'I don't accept your apology but I'm tired of talking'."
      },
      goodResponse: {
        text: "You: 'That didn't sound like you believe I'm [sorry]. How can I [fix] this?'",
        why: "You recognized the dismissal and pushed for a real resolution."
      }
    },
    {
      id: "s3",
      scenario: "Someone corrects your grammar. You reply: 'Whatever, you know what I meant.'",
      en: "The Defensive Shield",
      keywords: [
        { word: "point", definition: "meaning" },
        { word: "petty", definition: "small/trivial" }
      ],
      badResponse: {
        text: "You: 'Thank you for the lesson.'",
        why: "Don't thank them for being annoying."
      },
      goodResponse: {
        text: "You: 'Whatever. The [point] is clear, stop being so [petty].'",
        why: "Here, YOU are using 'Whatever' correctly to dismiss their trivial correction."
      }
    },
    {
      id: "s4",
      scenario: "You ask a teenager to clean their room. They walk away muttering: 'Whatever.'",
      en: "The Teenager",
      keywords: [
        { word: "attitude", definition: "bad behavior" },
        { word: "ignoring", definition: "not listening" }
      ],
      badResponse: {
        text: "You: 'Have a nice day!'",
        why: "Ignoring the disrespect undermines your authority."
      },
      goodResponse: {
        text: "You: 'Don't give me that [attitude]. I'm not [ignoring] this mess.'",
        why: "You called out the disrespectful tone immediately."
      }
    }
  ],
  quizItems: [
    {
      question: "If you are fighting and your partner says 'Whatever', who won the argument?",
      options: [
        "You did.",
        "They did.",
        "Nobody. The relationship just took damage.",
        "The pizza place."
      ],
      correctIndex: 2,
      explanation: "'Whatever' is a scorched-earth tactic. It ends the battle but poisons the war."
    },
    {
      question: "Is 'Whatever' ever polite?",
      options: [
        "Yes, when offering guests a choice of drinks.",
        "No, never.",
        "Only in British English.",
        "If you whisper it."
      ],
      correctIndex: 0,
      explanation: "Wait! Trick question. In 'Whatever you would like', it IS polite. But as a standalone word? Never."
    },
    {
      question: "Someone says 'Do whatever you want'. What should you do?",
      options: [
        "Exactly what you want.",
        "Be very careful and ask what THEY want.",
        "Run away.",
        "Dance."
      ],
      correctIndex: 1,
      explanation: "This is a trap. It usually means 'Do what I want, or I will be mad'."
    }
  ]
};
