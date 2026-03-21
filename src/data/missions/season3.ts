import { Mission } from "@/types";

export const season3Missions: Mission[] = [
  {
    day: 21,
    phase: 1,
    module: "The Neighborhood",
    title: "The Garage‑Door Wave",
    imageUrl: "/images/missions/day21.png",
    image_description: "3D clay style, a neighbor by their mailbox looks over.",
    strategic_brief: "A 3‑second wave says “We’re good” without starting a chat.",
    cloze_setup: "A [**] is a quick [**] that protects my [**].",
    cloze_keywords: ["wave", "acknowledgment", "time"],
    scenario_text: "You grab your mail and see your neighbor across the street.",
    options: [
      {
        id: "A",
        text: "Give a short wave and small nod, then head inside.",
        vibe_score: 95,
        feedback: "Friendly and low‑effort—ideal for suburban norms.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Look down and pretend you didn’t notice.",
        vibe_score: 30,
        feedback: "Often reads as standoffish. A wave is easier.",
        allow_retry: true
      }
    ],
    x_ray: "Light acknowledgment builds neighborhood goodwill.",
    season: 3,
    xp: 100
  },
  {
    day: 22,
    phase: 1,
    module: "The Neighborhood",
    title: "The Mailroom Chat",
    imageUrl: "/images/missions/day22.png",
    image_description: "3D clay style, modern apartment mailroom; a neighbor juggles a big box.",
    strategic_brief: "In shared spaces, talk about the environment—never overshare.",
    cloze_setup: "I should [**] the [**] rather than [**] personal details.",
    cloze_keywords: ["comment on", "situation", "diving into"],
    scenario_text: "Neighbor: “The lobby AC is totally broken today.”",
    options: [
      {
        id: "A",
        text: "I know—feels like a sauna. Hope they fix it soon!",
        vibe_score: 95,
        feedback: "Validates their experience and keeps it light.",
        allow_retry: false
      },
      {
        id: "B",
        text: "My name is…, I work at…, and my rent is…",
        vibe_score: 15,
        feedback: "Too much for a 30‑second moment.",
        allow_retry: true
      }
    ],
    x_ray: "Shared inconveniences are safe, easy icebreakers.",
    season: 3,
    xp: 100
  },
  {
    day: 23,
    phase: 1,
    module: "The Neighborhood",
    title: "The Dog‑Park Intro",
    imageUrl: "/images/missions/day23.png",
    image_description: "3D clay style, dogs greeting each other; owners stand apart.",
    strategic_brief: "Talk to the human through the dog—age, breed, and personality are safe topics.",
    cloze_setup: "The dog is the [**] for the [**].",
    cloze_keywords: ["bridge", "conversation"],
    scenario_text: "Another owner looks at your dog. How do you start?",
    options: [
      {
        id: "A",
        text: "How old is he? So much energy!",
        vibe_score: 95,
        feedback: "Perfect dog‑first opener.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Do you live in that expensive corner house?",
        vibe_score: 20,
        feedback: "Too personal; focus on the pets.",
        allow_retry: true
      }
    ],
    x_ray: "Pets are public; finances and addresses are private.",
    season: 3,
    xp: 100
  },
  {
    day: 24,
    phase: 1,
    module: "The Neighborhood",
    title: "The Utility Call",
    imageUrl: "/images/missions/day24.png",
    image_description: "3D clay style, on hold with a utility company.",
    strategic_brief: "Be the calm, collaborative caller—they’ll want to help you.",
    cloze_setup: "[**] and [**] makes the agent [**] [**] me.",
    cloze_keywords: ["Politeness", "clarity", "want to", "help"],
    scenario_text: "Agent: “How can I help you today?”",
    options: [
      {
        id: "A",
        text: "Hi! I think there’s a billing error—could you help me take a look?",
        vibe_score: 95,
        feedback: "Invites partnership instead of blame.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Your company took $50 from me. Fix it now.",
        vibe_score: 10,
        feedback: "Targets the person, not the problem. Slows solutions.",
        allow_retry: true
      }
    ],
    x_ray: "“Could you help me understand…?” gently moves people toward the data.",
    season: 3,
    xp: 100
  },
  {
    day: 25,
    phase: 1,
    module: "The Neighborhood",
    title: "The Trash Rules",
    imageUrl: "/images/missions/day25.png",
    image_description: "3D clay style, blue recycle bin and black trash bin on a curb.",
    strategic_brief: "Neat, rule‑following disposal signals you’re a considerate neighbor.",
    cloze_setup: "[**] the [**] shows I [**] the [**].",
    cloze_keywords: ["Following", "guidelines", "respect", "community"],
    scenario_text: "You have a large cardboard box. What’s the move?",
    options: [
      {
        id: "A",
        text: "Break it down flat; place it inside the blue bin.",
        vibe_score: 95,
        feedback: "Efficient and appreciated.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Leave the big box sitting on top.",
        vibe_score: 30,
        feedback: "Looks messy and can block pickup.",
        allow_retry: true
      }
    ],
    x_ray: "Orderly bins = instant neighborhood credibility.",
    season: 3,
    xp: 100
  },
  {
    day: 26,
    phase: 1,
    module: "The Neighborhood",
    title: "The Nextdoor Scroll",
    imageUrl: "/images/missions/day26.png",
    image_description: "3D clay style, a neighborhood app shows a tense comment thread.",
    strategic_brief: "Observe before you post; learn local norms without taking sides.",
    cloze_setup: "I should [**] more than I [**] on these apps.",
    cloze_keywords: ["read", "post"],
    scenario_text: "You see an argument about a nearby park.",
    options: [
      {
        id: "A",
        text: "Read for context; stay quiet for now.",
        vibe_score: 95,
        feedback: "Smart—collect intel first.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Jump in with a strong opinion and tell people they’re wrong.",
        vibe_score: 20,
        feedback: "Easily backfires. Build presence before influence.",
        allow_retry: true
      }
    ],
    x_ray: "Digital spaces have local etiquette too; learn it first.",
    season: 3,
    xp: 100
  },
  {
    day: 27,
    phase: 1,
    module: "The Neighborhood",
    title: "Becoming a Regular",
    imageUrl: "/images/missions/day27.png",
    image_description: "3D clay style, a barista recognizes you at a cozy cafe.",
    strategic_brief: "A familiar face turns a big city into a small town.",
    cloze_setup: "Being a “[**]” creates a [**] [**] in a new [**].",
    cloze_keywords: ["regular", "sense of", "belonging", "place"],
    scenario_text: "Barista: “Hey! The usual today?”",
    options: [
      {
        id: "A",
        text: "Yes, please! How’s your morning going?",
        vibe_score: 95,
        feedback: "Keeps the relationship warm and easy.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Actually, something different. (Flat tone.)",
        vibe_score: 60,
        feedback: "Fine, but you missed a chance to connect.",
        allow_retry: true
      }
    ],
    x_ray: "Micro‑rituals build a community you can feel.",
    season: 3,
    xp: 100
  },
  {
    day: 28,
    phase: 1,
    module: "The Neighborhood",
    title: "The Noise Knock",
    imageUrl: "/images/missions/day28.png",
    image_description: "3D clay style, apartment hallway at night; music from a door.",
    strategic_brief: "Blame the situation, not the person—most people will adjust.",
    cloze_setup: "I should [**] the noise as an [**] rather than an [**].",
    cloze_keywords: ["frame", "issue", "accusation"],
    scenario_text: "You knock; they open. What do you say?",
    options: [
      {
        id: "A",
        text: "Hey—sorry to bug you! The walls are thin—could you turn it down a bit?",
        vibe_score: 95,
        feedback: "Kind, specific, and actionable.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Be quiet! I’m trying to sleep and you’re rude.",
        vibe_score: 15,
        feedback: "Likely escalates tension.",
        allow_retry: true
      }
    ],
    x_ray: "Third‑party framing (thin walls, building rules) reduces defensiveness.",
    season: 3,
    xp: 100
  },
  {
    day: 29,
    phase: 1,
    module: "The Neighborhood",
    title: "The ‘Stop By’ Bluff",
    imageUrl: "/images/missions/day29.png",
    image_description: "3D clay style, neighbor waves while leaving: “Stop by whenever!”",
    strategic_brief: "“Whenever” usually means “Text first.”",
    cloze_setup: "“[**]” is a [**] [**], not a [**].",
    cloze_keywords: ["Whenever", "friendly phrase", "scheduled invite"],
    scenario_text: "They say: “Stop by whenever!” What’s the move?",
    options: [
      {
        id: "A",
        text: "Wait a week, then text: “Still up for that drink? When’s good?”",
        vibe_score: 95,
        feedback: "Turns a vague idea into a real plan—perfect.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Knock on their door 10 minutes later.",
        vibe_score: 10,
        feedback: "Feels intrusive without a heads‑up.",
        allow_retry: true
      }
    ],
    x_ray: "In the U.S., most social plans start with a text.",
    season: 3,
    xp: 100
  },
  {
    day: 30,
    phase: 1,
    module: "The Neighborhood",
    title: "The Housewarming Invite",
    imageUrl: "/images/missions/day30.png",
    image_description: "3D clay style, a neighbor shows you a BBQ invite.",
    strategic_brief: "Guests bring something small—never arrive empty‑handed.",
    cloze_setup: "I should always [**] what I can [**] to the party.",
    cloze_keywords: ["ask", "bring/contribute"],
    scenario_text: "They invite you to a BBQ. What do you ask?",
    options: [
      {
        id: "A",
        text: "That sounds great! What can I bring—drinks or a side?",
        vibe_score: 95,
        feedback: "Shows you understand the hosting culture.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Okay—what time is the food ready?",
        vibe_score: 30,
        feedback: "Reads like a customer, not a guest.",
        allow_retry: true
      }
    ],
    x_ray: "Even if they say “Nothing,” bring a simple drink or snack as a courtesy.",
    season: 3,
    xp: 100,
    achievementId: "neighborhood-hero"
  }
];
