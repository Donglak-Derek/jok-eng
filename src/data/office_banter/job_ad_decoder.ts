import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const jobAdDecoder: Script = {
  id: "job-ad-decoder",
  title: "Job Description 'Red Flags'",
  categorySlug: "office_banter",
  categoryName: CATEGORY_NAMES["office_banter"],
  cleanedEnglish: "What 'We work hard, play hard' actually means.",
  imageUrl: "/images/scenarios/job_ad_decoder_3d.png",
  difficulty: "Medium 🌶️🌶️",
  type: "decoder",
  
  decoderItems: [
    {
      id: "ja1",
      phrase: "[Fast-paced environment].",
      literalMeaning: "Things move quickly here.",
      actualMeaning: "We are understaffed, everything is on fire, and you will have no time to think.",
      dangerLevel: "Danger 🛑", // 80
      survivalTip: "Ask: 'How do you handle burnout prevention?' If they look confused, run.",
      conversation: {
        speakerA: "recruiter",
        speakerB: "me",
        textA: "We thrive in a fast-paced environment.",
        textB: "I see. How does the team prioritize tasks to avoid crunch?",
        contextNote: "Often code for 'poor planning'."
      },
      keywords: [
          { word: "Fast-paced environment", definition: "Euphemism for chaos, understaffing, and constant emergencies." }
      ]
    },
    {
      id: "ja2",
      phrase: "We are [like a family].",
      literalMeaning: "We are close-knit and supportive.",
      actualMeaning: "We have no boundaries. We will expect you to work unpaid overtime because 'family helps family'.",
      dangerLevel: "Danger 🛑", // 95
      survivalTip: "Professional teams are 'teams', not 'families'. Families are dysfunctional; teams have rules.",
      conversation: {
        speakerA: "CEO",
        speakerB: "me",
        textA: "Here at TechCorp, we are a family.",
        textB: "That sounds nice. How do you handle work-life balance?",
        contextNote: "Run away. Emotional manipulation is coming."
      },
      keywords: [
          { word: "like a family", definition: "Implies lack of boundaries and expectation of unpaid sacrifice." }
      ]
    },
    {
      id: "ja3",
      phrase: "Must be willing to [wear many hats].",
      literalMeaning: "You will have varied responsibilities.",
      actualMeaning: "We fired the designer and the PM, so you are now the engineer, designer, and PM. You get paid for one job.",
      dangerLevel: "Caution ⚠️", // 60
      survivalTip: "Clarify exactly what the 'hats' are. If it's unrelated work (e.g., coder doing sales), beware.",
      conversation: {
        speakerA: "recruiter",
        speakerB: "me",
        textA: "You'll need to wear many hats.",
        textB: "Could you define the core 3 responsibilities I'd be measured on?",
        contextNote: "Great for startups, bad for 'stable' jobs."
      },
      keywords: [
          { word: "wear many hats", definition: "Doing multiple jobs for one salary; common in startups." }
      ]
    },
    {
      id: "ja4",
      phrase: "[Competitive salary].",
      literalMeaning: "Our pay matches other companies.",
      actualMeaning: "Average at best. If it was 'Excellent', we would list the number.",
      dangerLevel: "Caution ⚠️", // 50
      survivalTip: "Check Glassdoor/Levels.fyi. 'Competitive' usually means 'Market Average'.",
      conversation: {
        speakerA: "ad",
        speakerB: "me",
        textA: "Competitive salary + equity.",
        textB: "What is the salary range for this role?",
        contextNote: "Transparency is confidence. Vague is suspicious."
      },
      keywords: [
          { word: "Competitive salary", definition: "Usually means average or below average; lacks transparency." }
      ]
    },
    {
      id: "ja5",
      phrase: "[Self-starter].",
      literalMeaning: "You take initiative.",
      actualMeaning: "We have absolutely no training or onboarding process. You are on your own, good luck.",
      dangerLevel: "Caution ⚠️", // 40
      survivalTip: "Ask: 'What does the first 30 days of onboarding look like?'",
      conversation: {
        speakerA: "manager",
        speakerB: "me",
        textA: "We need a self-starter who hits the ground running.",
        textB: "I love autonomy. Do you have documentation for the codebase?",
        contextNote: "Often means 'sink or swim'."
      },
      keywords: [
          { word: "Self-starter", definition: "Code for 'We have no training program; figure it out yourself'." }
      ]
    },
    {
      id: "ja6",
      phrase: "[Work hard, play hard].",
      literalMeaning: "We work seriously and have fun parties.",
      actualMeaning: "We work 80 hours a week, and then we have mandatory drinking events where you can't go home.",
      dangerLevel: "Danger 🛑", // 90
      survivalTip: "This is often a sign of a 'Bro Culture' or high-pressure sales environment.",
      conversation: {
        speakerA: "recruiter",
        speakerB: "me",
        textA: "Our culture is very 'work hard, play hard'.",
        textB: "What do people typically do after work hours?",
        contextNote: "Expect peer pressure to stay late."
      },
      keywords: [
          { word: "Work hard, play hard", definition: "High burnout culture with mandatory social obligations." }
      ]
    }
  ],

  summaryPoints: [
    "'Family' usually means toxic lack of boundaries.",
    "'Fast-paced' often implies chaos and burnout.",
    "'Wear many hats' means doing 3 jobs for 1 salary.",
    "'Self-starter' means zero training provided.",
    "If the salary was great, they would just tell you."
  ],

  quizItems: [
    {
      question: "If a job ad says 'We are a family', you should be:",
      options: ["Excited for the love", "Suspicious of potential boundary issues", "Looking for adoption papers", "Ready to move in"],
      correctIndex: 1,
      explanation: "Work is valid transactional relationship. Families are emotional and messy. Mixing them leads to guilt-tripping."
    },
    {
      question: "What does 'Fast-paced environment' often hide?",
      options: ["They walk fast", "They have fast computers", "Poor planning and understaffing", "Quick promotions"],
      correctIndex: 2,
      explanation: "It usually means everything is an emergency because they didn't plan ahead."
    },
    {
      question: "If they ask you to 'wear many hats' without extra pay, it effectively means:",
      options: ["You get a free hat", "You are getting a pay cut per hour of responsibility", "You are very talented", "It's a fashion show"],
      correctIndex: 1,
      explanation: "Doing two peoples' jobs for one salary is a great deal... for the company."
    }
  ]
};
