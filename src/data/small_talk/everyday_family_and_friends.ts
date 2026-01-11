import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const familyAndFriends: Script = {
  id: "everyday-family-and-friends",
  title: "Family Interrogation",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Surviving invasive questions about marriage, jobs, and babies.",
  imageUrl: "/images/scenarios/family_interrogation_3d.png",

  culturalNote: {
    title: "The 'Privacy' Buffer",
    content: "In some cultures, commenting on weight or salary is normal. In the West, it is RUDE. If someone asks 'Why aren't you married?', you can joke, deflect, or simply say 'I'm focusing on me right now'. You don't owe them an explanation."
  },

  quizItems: [
    {
      question: "Your aunt asks 'When are you having a baby?'. You don't want to answer. You say:",
      options: [
        "None of your business.",
        "We're just practicing a lot right now!",
        "When the economy collapses.",
        "Oh, look at the time! (Run away)"
      ],
      correctIndex: 1,
      explanation: "A joke (even a slightly risky one) is the best way to shut down nosy questions without starting a fight."
    },
    {
      question: "A friend keeps cancelling plans. You want to see them. You say:",
      options: [
        "I hate you.",
        "You are flaky.",
        "No worries! Let me know when things calm down.",
        "Block them."
      ],
      correctIndex: 2,
      explanation: "'Low pressure' is the key. Making them feel guilty will just make them avoid you more."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Relationship Status",
      scenario: "Relative: 'Are you dating anyone?'",
      keywords: [
        { word: "Career", definition: "Job path" },
        { word: "Married", definition: "Wedded to" }
      ],
      badResponse: {
          text: "I am lonely and sad.",
          why: "Depressing."
      },
      goodResponse: {
          text: "Nope! I'm actually [married] to my [career] right now. It's very serious.",
          why: "Funny, confident, and shuts down the topic."
      }
    },
    {
      id: "s2",
      en: "The Weight Comment",
      scenario: "Relative: 'You look... healthy.'",
      keywords: [
        { word: "Living", definition: "Being alive" },
        { word: "Good life", definition: "Happy existence" }
      ],
      badResponse: {
          text: "Are you calling me fat?",
          why: "Start of a fight."
      },
      goodResponse: {
          text: "I know, right? Just [living] the [good life]! More cake, please.",
          why: "Owning it takes the power away from them."
      }
    },
    {
      id: "s3",
      en: "The Job Comparison",
      scenario: "Friend: 'My cousin makes $200k...'",
      keywords: [
        { word: "Happy", definition: "Glad" },
        { word: "Lane", definition: "Path/Track" }
      ],
      goodResponse: {
          text: "That's amazing for him! I'm pretty [happy] in my own [lane] though.",
          why: "Politely refuses to compete."
      }
    },
    {
      id: "s4",
      en: "The Never-Ending Story",
      scenario: "Uncle is telling a boring story",
      keywords: [
        { word: "Wild", definition: "Crazy" },
        { word: "Grab", definition: "Get" }
      ],
      goodResponse: {
          text: "Wow, that is [wild]. Hey, I'm gonna [grab] another drink, do you want anything?",
          why: "The classic 'Drink Refill' escape move."
      }
    },
    {
      id: "s5",
      en: "The Flaky Friend",
      scenario: "Friend cancels last minute",
      keywords: [
        { word: "Worries", definition: "Concerns" },
        { word: "Rain check", definition: "Reschedule" }
      ],
      goodResponse: {
          text: "No [worries]! We'll take a [rain check]. Rest up!",
          why: "Be the chill friend. They will appreciate it."
      }
    }
  ]
};
