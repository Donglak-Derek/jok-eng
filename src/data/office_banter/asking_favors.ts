import { Script } from "@/types";

export const askingFavors: Script = {
  id: "asking-favors",
  title: "The Art of Asking Favors",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "How to get help without being 'that annoying guy'.",
  
  // Engagement
  culturalNote: {
    title: "The 'Soft Ask' vs. The Command",
    content: "In many Western workplaces, direct commands ('Do this') are seen as rude, even from bosses. We use 'Soft Asks' ('Do you have a second?', 'Could you possibly...') to show respect for the other person's time and autonomy. It allows them to say 'no' or 'not now' without conflict."
  },
  quizItems: [
    {
      question: "You need a coworker to check your report ASAP. What is the best approach?",
      options: [
        "Send it with 'URGENT: READ NOW' subject line.",
        "Walk to their desk and start talking immediately.",
        "Slack them: 'Hey, are you heads-down or do you have 5 mins for a quick sanity check?'",
        "Email their boss to complain they haven't checked it yet."
      ],
      correctIndex: 2,
      explanation: "Checking their status ('heads-down') first shows respect. Using 'sanity check' makes the request feel smaller and collaborative."
    },
    {
      question: "Why is 'I'm waiting on you' considered a bad phrase?",
      options: [
        "It's too short.",
        "It sounds accusatory, like you are blaming them for your delay.",
        "It's grammatically incorrect.",
        "It's too formal."
      ],
      correctIndex: 1,
      explanation: "It focuses on *their* failure. Better to say 'I'm blocked on X' (focusing on the workflow) or 'When do you think X might be ready?' (focusing on the schedule)."
    }
  ],

  imageUrl: "/images/scenarios/asking_favors_3d.png",
  sentences: [
    {
      id: "favor-1",
      en: "The 'Temperature Check'",
      keywords: [
        { word: "Bandwidth", definition: "Mental capacity or time available" },
        { word: "Heads-down", definition: "Concentrating hard on work" }
      ],
      scenario: "Interrupting someone busy",
      badResponse: {
          text: "Hey, can you look at this right now?",
          why: "Presumes their time is cheap."
      },
      goodResponse: {
          text: "Hey, [gentle interruption] - do you have a quick sec, or are you [heads-down] on something?",
          why: "Respects their flow and gives them an 'out'."
      }
    },
    {
      id: "favor-2",
      en: "The 'Blocked' Request",
      keywords: [
        { word: "Blocker", definition: "Something preventing progress" },
        { word: "Urgency", definition: "Importance requiring swift action" }
      ],
      scenario: "Chasing a delay",
      badResponse: {
          text: "I'm waiting on you to finish the report.",
          why: "Sounds accusatory."
      },
      goodResponse: {
          text: "I'm currently [blocked] on the slide deck until I get those numbers. Could you let me know when you might have them?",
          why: "Focuses on the *work flow*, not the *person*."
      }
    },
    {
      id: "favor-3",
      en: "Asking for 'Brain Power'",
      keywords: [
        { word: "Perspective", definition: "A particular way of regarding something" },
        { word: "Sounding board", definition: "A person to test ideas on" }
      ],
      scenario: "Asking for advice",
      badResponse: {
          text: "Tell me how to do this.",
          why: "Demanding."
      },
      goodResponse: {
          text: "Can I [pick your brain] for 5 minutes? I'd love your [perspective] on how to tackle this client issue.",
          why: "Flattery ('I value your brain') goes a long way."
      }
    },
    {
      id: "favor-4",
      en: "The 'Big Ask'",
      keywords: [
        { word: "Capital", definition: "Social credit or goodwill" },
        { word: "Reciprocity", definition: "Exchanging things for mutual benefit" }
      ],
      scenario: "Asking for a huge favor",
      badResponse: {
          text: "I need you to redo this whole spreadsheet by tomorrow.",
          why: "Entitled."
      },
      goodResponse: {
          text: "I know this is a [heavy lift] and I really appreciate you helping me out. I [owe you one] - lunch on me?",
          why: "Acknowledges effort and offers reciprocity."
      }
    },
    {
      id: "favor-5",
      en: "The Graceful 'No'",
      keywords: [
        { word: "Boundaries", definition: "Limits of responsibility" },
        { word: "Gracious", definition: "Courteous and kind" }
      ],
      scenario: "Accepting a Rejection",
      badResponse: {
          text: "Oh... okay. I guess I'll fail then.",
          why: "Guilt-tripping is unprofessional."
      },
      goodResponse: {
          text: "Totally understand, you've got a [full plate]. I'll figure out a workaround. Thanks anyway!",
          why: "Protects the relationship for next time."
      }
    }
  ]
};
