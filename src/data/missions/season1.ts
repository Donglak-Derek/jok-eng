import { Mission } from "@/types";

export const season1Missions: Mission[] = [
  {
    day: 1,
    phase: 1,
    module: "The Arrival",
    title: "The Customs Officer",
    imageUrl: "/images/missions/day1.png",
    image_description: "3D clay style, first-person view at an airport customs booth; an officer glances at your passport.",
    strategic_brief: "In official settings, brief answers read as confident and cooperative.",
    cloze_setup: "In this situation, I should be [**] and avoid [**].",
    cloze_keywords: ["direct", "over-explaining"],
    scenario_text: "Officer: “What is the purpose of your visit?”",
    options: [
      {
        id: "A",
        text: "I’m here for work, and I might do some sightseeing too!",
        vibe_score: 45,
        feedback: "Friendly, but too much detail. Keep it short.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Business. Attending a two-week conference.",
        vibe_score: 95,
        feedback: "Exactly right—clear, specific, and efficient.",
        allow_retry: false
      }
    ],
    x_ray: "Short, factual answers help officers move quickly and signal you’re organized.",
    season: 1,
    xp: 100
  },
  {
    day: 2,
    phase: 1,
    module: "The Arrival",
    title: "The Uber Greeting",
    imageUrl: "/images/missions/day2.png",
    image_description: "3D clay style, a clean car door open on a curb; a driver smiles from the front seat.",
    strategic_brief: "A quick, warm greeting makes the ride comfortable—even if you don’t talk much later.",
    cloze_setup: "A quick [**] is [**], but a long [**] is [**].",
    cloze_keywords: ["hello", "helpful", "story", "optional"],
    scenario_text: "Driver: “Hey! How’s your morning going so far?”",
    options: [
      {
        id: "A",
        text: "Good, thanks! How about you?",
        vibe_score: 90,
        feedback: "Perfect balance—polite and light.",
        allow_retry: false
      },
      {
        id: "B",
        text: "(Silence) Go to this address, please.",
        vibe_score: 15,
        feedback: "Feels cold in the U.S. A quick greeting sets a friendly tone.",
        allow_retry: true
      }
    ],
    x_ray: "“How’s it going?” often functions as a social handshake. A short reply is enough.",
    season: 1,
    xp: 100
  },
  {
    day: 3,
    phase: 1,
    module: "The Arrival",
    title: "Hotel Check‑in",
    imageUrl: "/images/missions/day3.png",
    image_description: "3D clay style, a bright lobby; a receptionist stands behind a marble counter.",
    strategic_brief: "In U.S. service culture, polite requests are welcome—especially with soft openers.",
    cloze_setup: "I can [**] for a change if I am [**].",
    cloze_keywords: ["ask", "polite"],
    scenario_text: "Reception: “I have you in room 302.” You prefer a higher floor.",
    options: [
      {
        id: "A",
        text: "Is there any chance a higher floor is available?",
        vibe_score: 95,
        feedback: "Great phrasing—optimistic, respectful, and easy to say yes to.",
        allow_retry: false
      },
      {
        id: "B",
        text: "302 is too low. Give me a better room.",
        vibe_score: 25,
        feedback: "Too forceful. A softer ask works better.",
        allow_retry: true
      }
    ],
    x_ray: "“Is there any chance…?” is a magic opener. It invites help without pressure.",
    season: 1,
    xp: 100
  },
  {
    day: 4,
    phase: 1,
    module: "The Arrival",
    title: "The First Tip",
    imageUrl: "/images/missions/day4.png",
    image_description: "3D clay style, a bellhop by a hotel room door, smiling with two suitcases.",
    strategic_brief: "Tipping for hands-on help is common; pair the cash with a sincere thank-you.",
    cloze_setup: "Tipping is a [**] for someone's [**].",
    cloze_keywords: ["thank-you", "help"],
    scenario_text: "The bellhop finishes setting your bags inside.",
    options: [
      {
        id: "A",
        text: "Hand over $5 and say: “Thanks so much for the help!”",
        vibe_score: 95,
        feedback: "Perfect—gracious and straightforward.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Hand the cash silently and look away.",
        vibe_score: 40,
        feedback: "Works, but can feel awkward. A quick thank-you matters.",
        allow_retry: true
      }
    ],
    x_ray: "In many U.S. settings, tipping acknowledges effort and builds positive rapport.",
    season: 1,
    xp: 100
  },
  {
    day: 5,
    phase: 1,
    module: "The Arrival",
    title: "Ordering Coffee",
    imageUrl: "/images/missions/day5.png",
    image_description: "3D clay style, a busy cafe counter; a barista in a green apron waits to take your order.",
    strategic_brief: "Customizing orders is normal. “Can I get…?” is friendly and natural.",
    cloze_setup: "Ordering coffee is about [**] and [**].",
    cloze_keywords: ["clarity", "speed"],
    scenario_text: "Barista: “What can I get for you?” You want a latte with oat milk.",
    options: [
      {
        id: "A",
        text: "Can I get a latte with oat milk, please?",
        vibe_score: 90,
        feedback: "Natural and efficient.",
        allow_retry: false
      },
      {
        id: "B",
        text: "I want one coffee with the milk from oats.",
        vibe_score: 40,
        feedback: "Understandable, but a bit awkward. Use the local phrasing.",
        allow_retry: true
      }
    ],
    x_ray: "“Can I get…?” reads as confident and courteous in U.S. cafes.",
    season: 1,
    xp: 100
  },
  {
    day: 6,
    phase: 1,
    module: "The Arrival",
    title: "The Grocery Aisle",
    imageUrl: "/images/missions/day6.png",
    image_description: "3D clay style, a cereal aisle with another shopper in front of the shelf you need.",
    strategic_brief: "Personal space is a high priority; “Excuse me” signals a polite approach.",
    cloze_setup: "I should use the [**] to [**] someone’s space.",
    cloze_keywords: ["phrase “Excuse me”", "enter"],
    scenario_text: "Someone stands in front of the cereal you want. What do you do?",
    options: [
      {
        id: "A",
        text: "Wait silently until they move.",
        vibe_score: 50,
        feedback: "Safe, but can feel awkward or take a while.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Say “Excuse me” with a small smile and reach in.",
        vibe_score: 95,
        feedback: "Exactly—brief, polite, and effective.",
        allow_retry: false
      }
    ],
    x_ray: "“Excuse me” = “I’m coming in briefly; thanks for the space.”",
    season: 1,
    xp: 100
  },
  {
    day: 7,
    phase: 1,
    module: "The Arrival",
    title: "The Checkout Line",
    imageUrl: "/images/missions/day7.png",
    image_description: "3D clay style, grocery checkout; a cashier scans items; total shows on a small screen.",
    strategic_brief: "“Did you find everything?” is a polite closer, not a real audit.",
    cloze_setup: "This question is a [**], not a [**].",
    cloze_keywords: ["polite closer", "detailed survey"],
    scenario_text: "Cashier: “Did you find everything okay today?”",
    options: [
      {
        id: "A",
        text: "Yep, all set! Thanks.",
        vibe_score: 95,
        feedback: "Keeps the line moving and the vibe positive.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Actually, I couldn’t find a specific organic brand of eggs…",
        vibe_score: 30,
        feedback: "Too late in the process; save special requests for the floor staff beforehand.",
        allow_retry: true
      }
    ],
    x_ray: "At the register, the goal is smooth closure, not troubleshooting.",
    season: 1,
    xp: 100
  },
  {
    day: 8,
    phase: 1,
    module: "The Arrival",
    title: "The ‘How are you?’ Drive‑by",
    imageUrl: "/images/missions/day8.png",
    image_description: "3D clay style, passing a neighbor in a hallway; both of you keep walking.",
    strategic_brief: "If feet are moving, it’s a greeting; if feet stop, it’s a conversation.",
    cloze_setup: "When someone is [**], “How are you?” is [**] a [**].",
    cloze_keywords: ["walking", "just", "hello"],
    scenario_text: "Neighbor (walking past): “Hey, how’s it going?”",
    options: [
      {
        id: "A",
        text: "Good! How are you?",
        vibe_score: 95,
        feedback: "Perfect—match their pace and keep moving.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Stop and explain your whole day.",
        vibe_score: 20,
        feedback: "That creates a time trap. Keep it light.",
        allow_retry: true
      }
    ],
    x_ray: "Read the body language; motion = micro‑greeting.",
    season: 1,
    xp: 100
  },
  {
    day: 9,
    phase: 1,
    module: "The Arrival",
    title: "Public Transit Norms",
    imageUrl: "/images/missions/day9.png",
    image_description: "3D clay style, inside a subway or bus; most riders wear headphones.",
    strategic_brief: "On transit, giving others quiet is a sign of respect.",
    cloze_setup: "[**] is a [**] space where people want [**].",
    cloze_keywords: ["Public transit", "shared", "personal space"],
    scenario_text: "You sit down next to someone. Start small talk?",
    options: [
      {
        id: "A",
        text: "No—look out the window or at your phone.",
        vibe_score: 95,
        feedback: "Typical U.S. norm, especially in big cities.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Yes—ask about their day to be friendly.",
        vibe_score: 30,
        feedback: "May feel intrusive to strangers in this context.",
        allow_retry: true
      }
    ],
    x_ray: "Silence in crowded spaces helps everyone feel comfortable.",
    season: 1,
    xp: 100
  },
  {
    day: 10,
    phase: 1,
    module: "The Arrival",
    title: "The Solo Dinner",
    imageUrl: "/images/missions/day10.png",
    image_description: "3D clay style, host stand in a cozy restaurant; bar seats and tables visible.",
    strategic_brief: "At the bar, you’re more socially available; a table is more private.",
    cloze_setup: "Sitting at the [**] is for [**]; the [**] is for [**].",
    cloze_keywords: ["bar", "chatting", "table", "focus/quiet"],
    scenario_text: "Host: “Just one? Table or the bar?”",
    options: [
      {
        id: "A",
        text: "The bar is great, thanks.",
        vibe_score: 90,
        feedback: "Good if you want casual conversation or bartender interaction.",
        allow_retry: false
      },
      {
        id: "B",
        text: "I’d prefer a table, please.",
        vibe_score: 90,
        feedback: "Good if you want to read, work, or decompress.",
        allow_retry: false
      }
    ],
    x_ray: "Choose based on your social energy—no wrong answer.",
    season: 1,
    xp: 100,
    achievementId: "arrival-pro"
  }
];
