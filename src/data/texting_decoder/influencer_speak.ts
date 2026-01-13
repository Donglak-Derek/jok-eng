import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const influencerSpeak: Script = {
  id: "influencer-speak",
  title: "Influencer Speak",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Terms you see on TikTok and Instagram daily.",
  type: "script",
  section: "slang_vocab",
  mode: "cloze",
  difficulty: "Spicy 🌶️🌶️🌶️",
  imageUrl: "/images/scenarios/influencer_speak.png",
  sentences: [
    {
      id: "inf-1",
      en: "Gatekeep",
      keywords: [
        { word: "Withhold", definition: "Refuse to give" }
      ],
      scenario: "Someone asks where you got your cool jacket.",
      badResponse: {
        text: "I will not tell you.",
        why: "Rude."
      },
      goodResponse: {
        text: "I'm not gonna [gatekeep]! I got it at Uniqlo.",
        why: "To 'gatekeep' is to hide information to stay cool. Sharing = anti-gatekeeping."
      }
    },
    {
      id: "inf-2",
      en: "Glow Up",
      keywords: [
        { word: "Transformation", definition: "A thorough or dramatic change" }
      ],
      scenario: "You see an old friend looking amazing.",
      badResponse: {
        text: "You look better than before.",
        why: "Specifically implies they looked bad before."
      },
      goodResponse: {
        text: "Wow! Look at this [glow up]!",
        why: "Implies a positive transformation in confidence and style."
      }
    },
    {
      id: "inf-3",
      en: "Gaslight",
      keywords: [
        { word: "Manipulate", definition: "Control or influence cleverly/unfairly" }
      ],
      scenario: "Someone tries to convince you that you didn't say something you definitely said.",
      badResponse: {
        text: "You are lying to me about reality.",
        why: "A bit heavy."
      },
      goodResponse: {
        text: "Stop trying to [gaslight] me, I know what I said.",
        why: "Gaslighting is making someone question their own sanity. (Note: Often overused on the internet for simple lying)."
      }
    },
    {
      id: "inf-4",
      en: "Main Character Energy",
      keywords: [
        { word: "Protagonist", definition: "The leading character" }
      ],
      scenario: "Your friend walks in wearing a stunning outfit.",
      badResponse: {
        text: "You look very noticeable.",
        why: "Neutral."
      },
      goodResponse: {
        text: "Okay!! Serving [main character energy] today!",
        why: "Means they are living their life like a movie star."
      }
    }
  ],
  quizItems: [
    {
      question: "What does 'Gatekeeping' mean?",
      options: [
        "Guarding a physical gate",
        "Withholding information to stay cool/exclusive",
        "Sharing everything you know"
      ],
      correctIndex: 1,
      explanation: "Gatekeeping is when someone refuses to share where they got something (like a shirt or song) to keep it for themselves."
    },
    {
      question: "If someone has a 'Glow Up', what happened?",
      options: [
        "They got a tan",
        "They improved their appearance/confidence dramatically",
        "They put on too much makeup"
      ],
      correctIndex: 1,
      explanation: "A Glow Up is a significant positive transformation, usually in looks or vibe."
    },
    {
      question: "What is 'Gaslighting' (in the internet sense)?",
      options: [
        "Turning on a stove",
        "Lighting a fire",
        "Manipulating someone into doubting their reality (or just lying)"
      ],
      correctIndex: 2,
      explanation: "Real gaslighting is psychological abuse, but online it often just means 'trying to trick me' or 'lying'."
    }
  ]
};
