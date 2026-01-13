import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const teamworkCollaboration: Script = {
  id: "everyday-teamwork-collaboration",
  title: "The Group Project",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Herding cats, dividing tasks, and politely telling people to do their job.",
  imageUrl: "/images/scenarios/group_project_chaos_3d.png",
  mode: "cloze",

  culturalInsights: {
    title: "The 'We' vs 'I'",
    content: "In teamwork, always say 'We' when things go well ('We did great!'). When they go bad, avoid saying 'You' ('You failed'). Use passive voice or 'We' to soften the blow ('We missed the deadline')."
  },

  quizItems: [
    {
      question: "No one is taking notes during the meeting. You say:",
      options: [
        "Write this down, idiots.",
        "Should we capture these action items?",
        "I am leaving.",
        "I will remember everything. (Lie)"
      ],
      correctIndex: 1,
      explanation: "'Capture action items' is corporate speak for 'Write down what we actually have to do'."
    },
    {
      question: "A teammate has a terrible idea. You say:",
      options: [
        "That is the worst idea ever.",
        "I hate it.",
        "Interesting! How would that work with X?",
        "Shut up."
      ],
      correctIndex: 2,
      explanation: "'Interesting' allows you to explore the flaws gently without rejecting them personally."
    },
    {
      question: "You finished a group project. You say:",
      options: [
        "Finally, it's over.",
        "I did all the work.",
        "Nice work everyone! We crushed that.",
        "I am going home."
      ],
      correctIndex: 2,
      explanation: "Always celebrate the win with the team, even if you did do all the work."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Divider",
      scenario: "Splitting up the work",
      keywords: [
        { word: "Tackle", definition: "Handle" },
        { word: "Divide and conquer", definition: "Split up to win" }
      ],
      goodResponse: {
          text: "Why don't we [divide and conquer]? I'll [tackle] the slides if you handle the data.",
          why: "Efficient and assertive leadership move."
      }
    },
    {
      id: "s2",
      en: "The Alignment Check",
      scenario: "Making sure everyone agrees",
      keywords: [
        { word: "Page", definition: "Sheet of paper" },
        { word: "Sync", definition: "Synchronize" }
      ],
      badResponse: {
          text: "Do you understand?",
          why: "Can sound condescending."
      },
      goodResponse: {
          text: "Just want to make sure we're all on the same [page]. Let's [sync] up quickly.",
          why: "'Same page' implies unity."
      }
    },
    {
      id: "s3",
      en: "The Volunteer",
      scenario: "Nobody wants to do the hard task",
      keywords: [
        { word: "Bullet", definition: "Projectile" },
        { word: "Take one", definition: "Accept" }
      ],
      goodResponse: {
          text: "Alright, I'll take one for the team and handle the spreadsheet. Someone has to bite the [bullet].",
          why: "Shows you are a martyr hero (Bite the bullet)."
      }
    },
    {
      id: "s4",
      en: "The Gentle Nudge",
      scenario: "Someone is late with their part",
      keywords: [
        { word: "Update", definition: "Status report" },
        { word: "Blocked", definition: "Stopped" }
      ],
      badResponse: {
          text: "Where is it??",
          why: "Panic."
      },
      goodResponse: {
          text: "Hey, just checking in on that [update]? I'm a little [blocked] until I get those files.",
          why: "Phrasing it as 'I am blocked' makes it about workflow, not personal failure."
      }
    },
    {
      id: "s5",
      en: "The Celebration",
      scenario: "Finishing the project",
      keywords: [
        { word: "Crushed", definition: "Did very well" },
        { word: "Effort", definition: "Work" }
      ],
      goodResponse: {
          text: "Nice work everyone! We absolutely [crushed] that. great team [effort].",
          why: "Always celebrate the win."
      }
    }
  ]
};
