import { Mission } from "@/types";

export const season2Missions: Mission[] = [
  {
    day: 11,
    phase: 1,
    module: "The Service Economy",
    title: "The Math of Respect",
    imageUrl: "/images/missions/day11.png",
    image_description: "3D clay style, a tip screen shows 18%, 20%, 25%, and No Tip.",
    strategic_brief: "Tipping norms vary by setting; seated service often expects ~20%.",
    cloze_setup: "Tipping is a [**] norm, not just a [**].",
    cloze_keywords: ["cultural", "calculation"],
    scenario_text: "Counter coffee order; the barista flips the screen toward you.",
    options: [
      {
        id: "A",
        text: "Tap 20% and smile.",
        vibe_score: 95,
        feedback: "Generous and appreciated—common in many places.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Select “No Tip” for a simple drip coffee.",
        vibe_score: 70,
        feedback: "Acceptable at counters in some areas, though you may feel social pressure.",
        allow_retry: true
      }
    ],
    x_ray: "Tip expectations shift by city and venue; observe local patterns.",
    season: 2,
    xp: 100
  },
  {
    day: 12,
    phase: 1,
    module: "The Service Economy",
    title: "The Refill Culture",
    imageUrl: "/images/missions/day12.png",
    image_description: "3D clay style, server with pitcher passes a table with half‑empty soda.",
    strategic_brief: "Basic refills (water, soda, drip coffee) are often complimentary in sit‑down restaurants.",
    cloze_setup: "Refills are often [**], so I don’t need to be [**].",
    cloze_keywords: ["free/complimentary", "hesitant"],
    scenario_text: "Your glass is half‑empty and the server walks by.",
    options: [
      {
        id: "A",
        text: "Wait for the offer; say “Yes, please!”",
        vibe_score: 95,
        feedback: "Matches common practice—simple and smooth.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Call out: “How much for another soda?”",
        vibe_score: 40,
        feedback: "Can sound transactional; most refills don’t add cost.",
        allow_retry: true
      }
    ],
    x_ray: "Servers often keep drinks topped up automatically—accept it with a smile.",
    season: 2,
    xp: 100
  },
  {
    day: 13,
    phase: 1,
    module: "The Service Economy",
    title: "The Retail Return",
    imageUrl: "/images/missions/day13.png",
    image_description: "3D clay style, customer service desk with a clerk and a boxed item.",
    strategic_brief: "U.S. stores usually allow straightforward returns within policy—no dramatic story needed.",
    cloze_setup: "I can be [**] about my return without being [**].",
    cloze_keywords: ["clear", "apologetic"],
    scenario_text: "Clerk: “Anything wrong with it, or did you change your mind?”",
    options: [
      {
        id: "A",
        text: "It just didn’t work for me. I’d like a refund, please.",
        vibe_score: 95,
        feedback: "Direct and polite—perfect.",
        allow_retry: false
      },
      {
        id: "B",
        text: "I’m so sorry to bother you, I feel bad but I don’t need it…",
        vibe_score: 50,
        feedback: "Extra emotion isn’t necessary. Treat it like a simple transaction.",
        allow_retry: true
      }
    ],
    x_ray: "Keep returns businesslike: short reason + polite tone.",
    season: 2,
    xp: 100
  },
  {
    day: 14,
    phase: 1,
    module: "The Service Economy",
    title: "The Pharmacy Script",
    imageUrl: "/images/missions/day14.png",
    image_description: "3D clay style, pharmacy counter with pick‑up and drop‑off signs.",
    strategic_brief: "Name and birth date are the fast path to your record; offer them first.",
    cloze_setup: "Speed is [**]. I should [**] with my [**] and [**].",
    cloze_keywords: ["key", "lead", "name", "birthday"],
    scenario_text: "Pharmacist: “Hi, picking up?”",
    options: [
      {
        id: "A",
        text: "Yes, for Han—H‑A‑N. Birthday January 1st, 1990.",
        vibe_score: 95,
        feedback: "Excellent—spelling helps them find you quickly.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Yes, my doctor sent a prescription for cold medicine.",
        vibe_score: 40,
        feedback: "They need your identity first to locate the order.",
        allow_retry: true
      }
    ],
    x_ray: "Offer the exact data they need to pull up your record fast.",
    season: 2,
    xp: 100
  },
  {
    day: 15,
    phase: 1,
    module: "The Service Economy",
    title: "The Haircut Vibe",
    imageUrl: "/images/missions/day15.png",
    image_description: "3D clay style, seated in a salon chair facing the mirror; stylist holds scissors.",
    strategic_brief: "Describe the end look (clean, low‑maintenance), not the math (centimeters).",
    cloze_setup: "I should [**] the [**] I want, not just the [**].",
    cloze_keywords: ["describe", "result", "measurements"],
    scenario_text: "Stylist: “What are we doing today?”",
    options: [
      {
        id: "A",
        text: "Clean and low‑maintenance, shorter on the sides.",
        vibe_score: 90,
        feedback: "Gives a clear vision with room for expertise.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Please cut exactly 1.5 centimeters everywhere.",
        vibe_score: 30,
        feedback: "Precision isn’t bad, but it limits the pro from flattering your features.",
        allow_retry: true
      }
    ],
    x_ray: "Give the vision; let the expert choose the technique.",
    season: 2,
    xp: 100
  },
  {
    day: 16,
    phase: 1,
    module: "The Service Economy",
    title: "The Polite Nudge",
    imageUrl: "/images/missions/day16.png",
    image_description: "3D clay style, a restaurant table waiting; the server passes by.",
    strategic_brief: "Check in collaboratively—signal patience while asking for help.",
    cloze_setup: "I should ask for an [**], not a [**].",
    cloze_keywords: ["update", "accusation"],
    scenario_text: "Food is late. How do you get an update?",
    options: [
      {
        id: "A",
        text: "Excuse me—just checking on our order. No rush!",
        vibe_score: 95,
        feedback: "Polite and effective; keeps the relationship positive.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Why is our food so late? Everyone else is eating.",
        vibe_score: 20,
        feedback: "Sounds confrontational; often slows help instead of speeding it up.",
        allow_retry: true
      }
    ],
    x_ray: "Soft openers get attention without putting people on the defensive.",
    season: 2,
    xp: 100
  },
  {
    day: 17,
    phase: 1,
    module: "The Service Economy",
    title: "Delivery Directions",
    imageUrl: "/images/missions/day17.png",
    image_description: "3D clay style, a phone map; message from driver: “Can’t find your building.”",
    strategic_brief: "Landmarks beat numbers when visibility is poor.",
    cloze_setup: "I should give a [**] that helps them [**].",
    cloze_keywords: ["landmark", "spot me"],
    scenario_text: "Driver is lost. What do you text?",
    options: [
      {
        id: "A",
        text: "I’m in Building 4, next to the big blue dumpster.",
        vibe_score: 95,
        feedback: "Clear, specific, and easy to see.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Read the address again; it’s correct.",
        vibe_score: 10,
        feedback: "Unhelpful and frustrating when they’re already trying.",
        allow_retry: true
      }
    ],
    x_ray: "Help them help you—visual cues save time.",
    season: 2,
    xp: 100
  },
  {
    day: 18,
    phase: 1,
    module: "The Service Economy",
    title: "Deflecting the Sales Pitch",
    imageUrl: "/images/missions/day18.png",
    image_description: "3D clay style, a gym lobby; a staffer mentions an upgrade.",
    strategic_brief: "Friendly but firm boundaries end a pitch without conflict.",
    cloze_setup: "I can say [**] without causing [**].",
    cloze_keywords: ["no", "friction"],
    scenario_text: "Staffer: “For $10 more, you get the sauna! Don’t you want it?”",
    options: [
      {
        id: "A",
        text: "I’m good with the basic plan for now—thanks for the offer!",
        vibe_score: 95,
        feedback: "Clear boundary, kind tone.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Maybe… I’ll think about it and let you know next month.",
        vibe_score: 50,
        feedback: "Leaves the door open; you may get repeated follow‑ups.",
        allow_retry: true
      }
    ],
    x_ray: "“I’m good” is a polite U.S. shorthand for “No, thank you.”",
    season: 2,
    xp: 100
  },
  {
    day: 19,
    phase: 1,
    module: "The Service Economy",
    title: "The Tip Screen Moment",
    imageUrl: "/images/missions/day19.png",
    image_description: "3D clay style, a fast‑casual counter; tip options on a tablet.",
    strategic_brief: "Counter service often fits a flat $1–$2 tip or 10–15%; don’t panic‑tap.",
    cloze_setup: "The [**] is a [**], not a [**].",
    cloze_keywords: ["tip screen", "prompt", "pressure test"],
    scenario_text: "You just got a sandwich; the 20% button is big and bright.",
    options: [
      {
        id: "A",
        text: "Choose Custom Tip and add $1–$2.",
        vibe_score: 90,
        feedback: "Balanced for counter service; feels fair.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Tap 25% because you feel watched.",
        vibe_score: 40,
        feedback: "Over‑tipping from anxiety can lead to regret. Decide calmly.",
        allow_retry: true
      }
    ],
    x_ray: "Match your tip to the service style; confidence beats pressure.",
    season: 2,
    xp: 100
  },
  {
    day: 20,
    phase: 1,
    module: "The Service Economy",
    title: "The Group Bill",
    imageUrl: "/images/missions/day20.png",
    image_description: "3D clay style, friends with phones around one check.",
    strategic_brief: "One person pays; everyone else sends instantly via app.",
    cloze_setup: "Splitting the bill is about [**] and [**].",
    cloze_keywords: ["fairness", "trust"],
    scenario_text: "Friend: “I’ll put it on my card; just Venmo me.”",
    options: [
      {
        id: "A",
        text: "Awesome, thanks—sending my share now.",
        vibe_score: 95,
        feedback: "Sending before leaving the table is A+ etiquette.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Let’s calculate who ate what exactly, including tax.",
        vibe_score: 30,
        feedback: "Can feel nitpicky. Even splits keep the vibe easy.",
        allow_retry: true
      }
    ],
    x_ray: "Fast paybacks preserve group harmony over a few dollars.",
    season: 2,
    xp: 100,
    achievementId: "service-master"
  }
];
