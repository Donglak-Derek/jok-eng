import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const gymHog: Script = {
  id: "polite-gym-hog",
  title: "The Gym Equipment Hog",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to get a machine without starting a fight. The art of 'Working In'.",
  imageUrl: "/images/scenarios/gym_hog_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "Gym Etiquette 101",
    content: "In Western gyms, it is rude to hover silently. However, it is also rude to occupy a machine while texting. The polite middle ground is asking to 'work in'—sharing the machine during rest periods. It turns a conflict into a collaboration."
  },
  sentences: [
    {
      id: "gym-1",
      scenario: "Someone has been sitting on the leg press looking at Instagram for 5 minutes.",
      en: "The Hover",
      keywords: [
        { word: "sets", definition: "groups of reps" },
        { word: "many", definition: "quantity" }
      ],
      badResponse: {
        text: "You: 'Are you done yet? You've been there forever.'",
        why: "Exaggeration ('forever') makes you sound aggressive. They will likely go slower just to spite you."
      },
      goodResponse: {
        text: "You: 'Hey! Do you have [many] [sets] left?'",
        why: "A casual, direct question. It prompts them to be aware of their time usage without accusing them."
      }
    },
    {
      id: "gym-2",
      scenario: "They say: 'Yeah, I have 3 more sets.' (Implies a long wait)",
      en: "The Proposal",
      keywords: [
        { word: "mind", definition: "objection" },
        { word: "work in", definition: "share turns" }
      ],
      badResponse: {
        text: "You: 'I'll just wait here and stare at you.'",
        why: "Creepy and passive-aggressive."
      },
      goodResponse: {
        text: "You: 'Would you [mind] if I [work in] while you rest?'",
        why: "This is the golden phrase. Most people will say yes because they lose nothing."
      }
    },
    {
      id: "gym-3",
      scenario: "They ignore you and keep texting.",
      en: "The Gentle Nudge",
      keywords: [
        { word: "waiting", definition: "patiently staying" },
        { word: "grab", definition: "use quickly" }
      ],
      badResponse: {
        text: "You: 'Get off your phone!'",
        why: "Starting a shouting match won't get you leg gains."
      },
      goodResponse: {
        text: "You: 'I've been [waiting] a bit. Can I just [grab] the machine for one quick set?'",
        why: "Emphasizing 'quick' makes it harder for them to say no without looking like a jerk."
      }
    }
  ],
  quizItems: [
    {
      question: "What does 'work in' mean at the gym?",
      options: [
        "To get a job there.",
        "To share a machine by taking turns during rest periods.",
        "To break into the gym.",
        "To work out inside the machine."
      ],
      correctIndex: 1,
      explanation: "It is the standard term for sharing equipment efficiently."
    },
    {
      question: "If someone is texting on a machine, what is the best approach?",
      options: [
        "Kick their phone.",
        "Ask how many sets they have left.",
        "Stare at them angrily.",
        "Call the police."
      ],
      correctIndex: 1,
      explanation: "Asking a question breaks their trance politely."
    },
    {
      question: "Why should you avoid saying 'You've been there forever'?",
      options: [
        "It is inaccurate.",
        "It attacks them personally and invites conflict.",
        "It is too long.",
        "Forever is a long time."
      ],
      correctIndex: 1,
      explanation: "Accusatory language puts people on the defensive."
    }
  ]
};
