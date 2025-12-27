import { Script } from "@/types";

export const settingBoundaries: Script = {
  id: "setting-boundaries",
  title: "The Art of Saying 'No' (Politely)",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Protect your time without looking lazy.",
  sentences: [
    {
      id: "bound-1",
      en: "The 'Capacity' Capacity",
      keywords: [
        { word: "Capacity", definition: "The maximum amount that something can contain/produce" },
        { word: "Quality", definition: "The standard of something as measured against other things" }
      ],
      scenario: "Your boss dumps a new project on you when you're swamped.",
      badResponse: {
        text: "I can't do that. I'm too busy.",
        why: "Sounds like a complaint or refusal to work."
      },
      goodResponse: {
        text: "I'd love to help with this, but I'm at full capacity with Project A. To ensure quality, which would you prefer I prioritize?",
        why: "Forces them to choose, putting the management decision back on them."
      }
    },
    {
      id: "bound-2",
      en: "The 'Weekend' Warrior",
      keywords: [
        { word: "Unplug", definition: "Disconnect from work/technology" },
        { word: "Recharge", definition: "Regain energy" }
      ],
      scenario: "Email received at 9 PM on Friday.",
      badResponse: {
        text: "I'm not working right now.",
        why: "A bit blunt."
      },
      goodResponse: {
        text: "(Don't reply until Monday). Or: 'Received! I'll dive into this first thing Monday morning.'",
        why: "Sets a precedent that you are not available 24/7."
      }
    },
    {
      id: "bound-3",
      en: "The 'Meeting' Decline",
      keywords: [
        { word: "Optional", definition: "Available to be chosen but not obligatory" },
        { word: "Catch up", definition: "Succeed in reaching a person who is ahead" }
      ],
      scenario: "Invited to a useless meeting.",
      badResponse: {
        text: "This meeting is a waste of time.",
        why: "Rude to the organizer."
      },
      goodResponse: {
        text: "Given my current deadlines, I'll skip this one to focus on the launch. I'll read the notes afterwards to catch up.",
        why: "Shows you are prioritizing work over talk."
      }
    },
    {
      id: "bound-4",
      en: "The 'Scope Creep' Pushback",
      keywords: [
        { word: "Scope creep", definition: "Uncontrolled growth in a project's scope" },
        { word: "Timeline", definition: "A schedule for when a process or procedure will be carried out" }
      ],
      scenario: "Client asks for 'just one small extra thing'.",
      badResponse: {
        text: "Sure, I'll do it.",
        why: "You just worked for free. It never stops."
      },
      goodResponse: {
        text: "Happy to add that! Since it wasn't in the original scope, it will extend the timeline by 2 days. Does that work for you?",
        why: "Actions have consequences. Make them aware of the cost."
      }
    }
  ]
};
