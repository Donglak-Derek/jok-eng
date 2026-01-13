import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const sarcasmThanks: Script = {
  id: "sarcasm-thanks-a-lot",
  title: "Thanks a Lot",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish: "Is it gratitude or blame? Learn how 'Thanks' can mean 'It is your fault'.",
  imageUrl: "/images/scenarios/sarcasm_thanks_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "The Weaponized 'Thanks'",
    content: "In English, 'Thanks a lot' is dangerous. If said with a smile and high pitch, it is genuine. If said with a flat tone or stress on 'LOT', it means 'You ruined everything'."
  },
  sentences: [
    {
      id: "s1",
      scenario: "You forgot to lock the door and the cat escaped. Your roommate sighs deeply and says: 'Thanks a lot.'",
      en: "The Blame Game",
      keywords: [
        { word: "fault", definition: "responsibility for a mistake" },
        { word: "help", definition: "assist" }
      ],
      badResponse: {
        text: "You: 'You're welcome! Happy to help!'",
        why: "You took it literally. They are blaming you for losing the cat."
      },
      goodResponse: {
        text: "You: 'I know it's my [fault]. I'll go [help] find him right now.'",
        why: "You accepted the blame hidden in the sarcasm and offered a solution."
      }
    },
    {
      id: "s2",
      scenario: "You give your friend advice they didn't ask for. They look away and say: 'Yeah, thanks for the input.'",
      en: "The Dismissal",
      keywords: [
        { word: "stop", definition: "cease action" },
        { word: "topic", definition: "subject of conversation" }
      ],
      badResponse: {
        text: "You: 'I have more advice if you want!'",
        why: "They are trying to stop the conversation. They don't want your input."
      },
      goodResponse: {
        text: "You: 'I'll [stop] there. Let's change the [topic].'",
        why: "You recognized they were annoyed and politely backed off."
      }
    },
    {
      id: "s3",
      scenario: "It starts pouring rain at your picnic. Your friend looks at the sky and says: 'Well, thanks for that, Universe.'",
      en: "The Cosmic Blame",
      keywords: [
        { word: "bad luck", definition: "unfortunate events" },
        { word: "inside", definition: "indoors" }
      ],
      badResponse: {
        text: "You: 'The Universe can't hear you.'",
        why: "Don't be literal. They are just venting frustration at the situation."
      },
      goodResponse: {
        text: "You: 'Just our [bad luck]. Let's move the food [inside].'",
        why: "You joined the frustration and proposed a practical fix."
      }
    },
    {
      id: "s4",
      scenario: "You finally reply to a text after 3 days. They reply: 'Thanks for getting back to me... eventually.'",
      en: "The Late Reply",
      keywords: [
        { word: "bad", definition: "not good" },
        { word: "busy", definition: "occupied" }
      ],
      badResponse: {
        text: "You: 'No problem!'",
        why: "The 'eventually' is a heavy criticism. Treating it as 'no problem' is rude."
      },
      goodResponse: {
        text: "You: 'I know I look [bad]. I was swamped, but shouldn't have been too [busy] to reply.'",
        why: "You acknowledged the 'eventually' sting and apologized for the delay."
      }
    }
  ],
  quizItems: [
    {
      question: "If someone emphasizes the word 'LOT' in 'Thanks a LOT', they usually mean:",
      options: [
        "They are extremely grateful.",
        "They are blaming you.",
        "They are loud.",
        "They are happy."
      ],
      correctIndex: 1,
      explanation: "Stress on 'LOT' + flat tone is the universal marker for sarcastic blame."
    },
    {
      question: "Your friend says 'Thanks for the advice' but looks annoyed. You should:",
      options: [
        "Give them more advice.",
        "Ask 'Did you hear me?'",
        "Stop talking and change the subject.",
        "Shout."
      ],
      correctIndex: 2,
      explanation: "They are using 'Thanks' as a period to end the sentence—and the topic."
    },
    {
      question: "What is the best apology for a sarcastic 'Thanks for being late'?",
      options: [
        "You're welcome.",
        "It wasn't that long.",
        "I know, I messed up. Sorry.",
        "Time is an illusion."
      ],
      correctIndex: 2,
      explanation: "Own the mistake. Defensiveness just makes the sarcasm worse."
    }
  ]
};
