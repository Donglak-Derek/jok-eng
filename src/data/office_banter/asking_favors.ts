import { Script } from "@/types";

export const askingFavors: Script = {
  id: "asking-favors",
  title: "The Art of Asking Favors",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "How to get help without being 'that annoying guy'.",
  sentences: [
    {
      id: "favor-1",
      en: "The 'Temperature Check'",
      keywords: [
        { word: "Bandwidth", definition: "Mental capacity or time available" },
        { word: "Heads-down", definition: "Concentrating hard on work" }
      ],
      scenario: "You need to interrupt someone who looks busy.",
      badResponse: {
        text: "Hey, can you look at this right now?",
        why: "Presumes their time is less important than yours. "
      },
      goodResponse: {
        text: "Hey, gentle interruption - do you have a quick sec, or are you heads-down on something?",
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
      scenario: "You can't finish your work until they do theirs.",
      badResponse: {
        text: "I'm waiting on you to finish the report.",
        why: "Sounds accusatory and passive-aggressive."
      },
      goodResponse: {
        text: "I'm currently blocked on the slide deck until I get those numbers. Could you let me know when you might have them?",
        why: "Focuses on the *work flow*, not the *person's delay*."
      }
    },
    {
      id: "favor-3",
      en: "Asking for 'Brain Power'",
      keywords: [
        { word: "Perspective", definition: "A particular attitude toward or way of regarding something" },
        { word: "Sounding board", definition: "A person with whom one discusses an idea or opinion" }
      ],
      scenario: "You need advice, not a task.",
      badResponse: {
        text: "Tell me how to do this.",
        why: "Demanding."
      },
      goodResponse: {
        text: "Can I pick your brain for 5 minutes? I'd love your perspective on how to tackle this client issue.",
        why: "Flattery ('I value your brain') goes a long way."
      }
    },
    {
      id: "favor-4",
      en: "The 'Big Ask' (Trading Favors)",
      keywords: [
        { word: "Capital", definition: "Social credit or goodwill" },
        { word: "Reciprocity", definition: "The practice of exchanging things with others for mutual benefit" }
      ],
      scenario: "Asking for something that will take them a long time.",
      badResponse: {
        text: "I need you to redo this whole spreadsheet by tomorrow.",
        why: "Entitled. Offers nothing in return."
      },
      goodResponse: {
        text: "I know this is a heavy lift and I really appreciate you helping me out. I owe you one—lunch is on me next week?",
        why: "Acknowledges the effort and offers immediate reciprocity."
      }
    },
    {
      id: "favor-5",
      en: "The 'No' Acceptance",
      keywords: [
        { word: "Boundaries", definition: "A line that marks the limits of an area" },
        { word: "Gracious", definition: "Courteous, kind, and pleasant" }
      ],
      scenario: "They say they are too busy to help.",
      badResponse: {
        text: "Oh... okay. I guess I'll fail then.",
        why: "Guilt-tripping is unprofessional."
      },
      goodResponse: {
        text: "Totally understand, you've got a full plate. I'll figure out a workaround. Thanks anyway!",
        why: "Protects the relationship for the next time you need to ask."
      }
    }
  ]
};
