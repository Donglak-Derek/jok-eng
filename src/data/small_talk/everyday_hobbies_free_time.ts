import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const hobbiesFreeTime: Script = {
  id: "everyday-hobbies-free-time",
  title: "The Hobby Humblebrag",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Making 'doing nothing' sound like a lifestyle choice.",
  imageUrl: "/images/scenarios/hobby_humblebrag_3d.png",
  mode: "cloze",

  culturalInsights: {
    title: "The 'Busy' Badge",
    content: "In modern culture, being 'busy' is often seen as a status symbol. If you say you did nothing, people might think you are boring. So we invent 'activities' like 'catch-up admin' (Netflix) or 'self-care' (sleeping)."
  },

  quizItems: [
    {
      question: "Someone asks what you do for fun. You mostly watch TikTok. You say:",
      options: [
        "I stare at a screen until my eyes bleed.",
        "I'm really into digital content curation.",
        "I like keeping up with current trends and media.",
        "I have no life."
      ],
      correctIndex: 2,
      explanation: "'Keeping up with trends' sounds sophisticated. It's all about branding."
    },
    {
      question: "You want to leave a party to go home and sleep. You say:",
      options: [
        "You people bore me.",
        "I have an early morning tomorrow.",
        "I hate this.",
        "Goodbye forever."
      ],
      correctIndex: 1,
      explanation: "'I have an early morning' is the classic, unchallengeable excuse to leave events early."
    },
    {
      question: "You did nothing all weekend. A coworker asks what you did. You say:",
      options: [
        "I was a lazy slob.",
        "Just caught up on some life admin and rested.",
        "I stared at a wall.",
        "None of your business."
      ],
      correctIndex: 1,
      explanation: "'Life admin' makes laundry and sleeping sound productive."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Binge Watch",
      scenario: "Admitting you watched TV all weekend",
      keywords: [
        { word: "Season", definition: "Set of episodes" },
        { word: "Binge", definition: "Consume all at once" }
      ],
      badResponse: {
          text: "I didn't move from the sofa.",
          why: "A bit sad."
      },
      goodResponse: {
          text: "Honestly, I just [binged] the entire new [season] of that chef show. No regrets.",
          why: "Owning it ('No regrets') makes it a fun activity rather than laziness."
      }
    },
    {
      id: "s2",
      en: "The Hiking Myth",
      scenario: "Talking about outdoor plans",
      keywords: [
        { word: "Nature", definition: "Outdoors" },
        { word: "Disconnect", definition: "Go offline" }
      ],
      goodResponse: {
          text: "I'm trying to get into [nature] more, just to [disconnect] for a bit.",
          why: "Sounds virtuous and healthy."
      }
    },
    {
      id: "s3",
      en: "The Foodie",
      scenario: "Talking about restaurants",
      keywords: [
        { word: "Spot", definition: "Restaurant/Place" },
        { word: "Booked", definition: "Reserved" }
      ],
      goodResponse: {
          text: "We checked out that new sushi [spot]. It's impossible to get into, but we got lucky and [booked] a table.",
          why: "Subtle brag ('impossible to get into')."
      }
    },
    {
      id: "s4",
      en: "The 'Project' that never ends",
      scenario: "Renovating or learning something",
      keywords: [
        { word: "Tinkering", definition: "Working casually" },
        { word: "Side project", definition: "Hobby work" }
      ],
      goodResponse: {
          text: "I've been [tinkering] with some coding as a [side project]. It's slow going, though.",
          why: "Shows ambition without promising results."
      }
    },
    {
      id: "s5",
      en: "The Social Battery",
      scenario: "Declining an invite",
      keywords: [
        { word: "Low key", definition: "Relaxed" },
        { word: "Recover", definition: "Heal/Rest" }
      ],
      goodResponse: {
          text: "I think I'm going to keep it [low key] this weekend. Need to [recover] from the work week.",
          why: "Everyone respects the need to recover."
      }
    }
  ]
};
