import { Mission } from "@/types";

export const season4Missions: Mission[] = [
  {
    day: 31,
    phase: 2,
    module: "The Office OS",
    title: "The 15-Second Bio",
    imageUrl: "/images/missions/day31.png",
    image_description: "3D clay style, first-person view standing in a bright modern office with a standing desk. A smiling coworker in a branded hoodie is holding a coffee and looking at you.",
    strategic_brief: "The ‘Value-First’ Intro. In the US, your name is less important than what you ‘Do’ for the team. Keep it short and high-energy.",
    cloze_setup: "I should [**] my [**] and one [**] [**].",
    cloze_keywords: ["lead with", "detail"],
    scenario_text: "A new teammate walks up: “Hey! I’m Sarah from Design. You’re the new dev, right?”",
    options: [
      {
        id: "A",
        text: "Hi Sarah! I’m Han. I’m joining the backend team. Just moved here from Seoul!",
        vibe_score: 95,
        feedback: "Perfect. You gave your Name, Role, and a ‘Conversation Hook’ (Seoul).",
        allow_retry: false
      },
      {
        id: "B",
        text: "My name is Dong Lak Han. I have 10 years of experience in Java and Python.",
        vibe_score: 40,
        feedback: "A bit too formal. This sounds like a resume, not a greeting. Save the ‘10 years’ for the LinkedIn profile.",
        allow_retry: true
      }
    ],
    x_ray: "American ‘Work-Talk’ is a mix of 80% professional and 20% personal. Giving a small personal fact (where you are from) makes you ‘Safe’ to talk to.",
    season: 4,
    xp: 100
  },
  {
    day: 32,
    phase: 2,
    module: "The Office OS",
    title: "The Watercooler Pivot",
    imageUrl: "/images/missions/day32.png",
    image_description: "3D clay style, an office breakroom with a high-end coffee machine. Two coworkers are laughing about a TV show. You are standing nearby.",
    strategic_brief: "The Open Circle. If people are standing in a way that leaves a gap, you are invited to listen, but not necessarily to speak yet.",
    cloze_setup: "I can [**] the group without [**] the flow.",
    cloze_keywords: ["intervene", "disrupting the flow"],
    scenario_text: "Two coworkers are talking about a crazy football game. You know nothing about football. What do you do?",
    options: [
      {
        id: "A",
        text: "Stand near them, nod, and smile. If they look at you, say “Sounds like a wild game!”",
        vibe_score: 90,
        feedback: "Great. You ‘Validated’ the vibe without needing to be an expert. You’re now part of the circle.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Walk up and ask: “What are the rules of football? I want to learn.”",
        vibe_score: 30,
        feedback: "Too heavy. You just killed their fun conversation by turning it into a lesson. Just ‘Vibe’ for now.",
        allow_retry: true
      }
    ],
    x_ray: "Joining a group isn’t about what you say; it’s about matching their ‘Energy Level.’ If they are excited, look excited.",
    season: 4,
    xp: 100
  },
  {
    day: 33,
    phase: 2,
    module: "The Office OS",
    title: "The ‘Slack’ Vibe",
    imageUrl: "/images/missions/day33.png",
    image_description: "3D clay style, a close-up of a laptop screen showing a Slack channel. A message from a teammate says: “Hey! You got a sec to look at this bug?”",
    strategic_brief: "The Digital Handshake. Slack is ‘Business Casual.’ Use emojis to show you aren’t an angry robot.",
    cloze_setup: "I should use [**] to soften the [**] of my text.",
    cloze_keywords: ["euphemisms", "impact"],
    scenario_text: "You are busy, but you can help in 10 minutes. How do you reply?",
    options: [
      {
        id: "A",
        text: "I am busy right now. 10 minutes.",
        vibe_score: 25,
        feedback: "Too blunt! In text, this sounds like you are shouting. It feels cold.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Hey! Just finishing something up—I’ll ping you in 10! 👍",
        vibe_score: 95,
        feedback: "Perfect. The ‘👍’ and ‘Hey!’ make you sound helpful and approachable.",
        allow_retry: false
      }
    ],
    x_ray: "In US digital culture, ‘No Emoji = Angry.’ Adding a simple thumbs-up or a smile is like a ‘Social Insurance’ policy.",
    season: 4,
    xp: 100
  },
  {
    day: 34,
    phase: 2,
    module: "The Office OS",
    title: "The Pre-Meeting 2 Minutes",
    imageUrl: "/images/missions/day34.png",
    image_description: "3D clay style, a Zoom/Teams call screen with 4 avatars. People are waiting for the Host to start. One person is talking about their weekend.",
    strategic_brief: "The ‘Dead Air’ Rule. Americans hate silence. The 2 minutes before a meeting starts is for ‘Relationship Maintenance.’",
    cloze_setup: "[**] before a [**] [**] [**] with the [**].",
    cloze_keywords: ["Small talk", "builds", "team"],
    scenario_text: "Everyone is waiting. Someone asks you: “Han, how’s the new apartment coming along?”",
    options: [
      {
        id: "A",
        text: "It’s good. (Silence)",
        vibe_score: 35,
        feedback: "Conversation Killer. You just made the whole Zoom call feel ‘Awkward.’",
        allow_retry: true
      },
      {
        id: "B",
        text: "Good! Finally got a couch yesterday. It’s starting to feel like home!",
        vibe_score: 95,
        feedback: "Perfect. You gave a small detail that others can comment on. You kept the ‘Vibe’ alive.",
        allow_retry: false
      }
    ],
    x_ray: "Being ‘Good at your job’ in America includes being ‘Good to be around.’ Don’t skip the small talk.",
    season: 4,
    xp: 100
  },
  {
    day: 35,
    phase: 2,
    module: "The Office OS",
    title: "The ‘Reply All’ Etiquette",
    imageUrl: "/images/missions/day35.png",
    image_description: "3D clay style, an email inbox on a screen. 50 people are on a thread saying ‘Congrats!’ to a coworker. Your mouse is over the reply button.",
    strategic_brief: "The Noise Filter. Don’t be the person who fills 50 inboxes with a ‘Me too’ message.",
    cloze_setup: "I should [**] the sender [**] if my message is just a ‘Congrats’.",
    cloze_keywords: ["rub someone the wrong way", "terse"],
    scenario_text: "Your boss sends an email to the whole department announcing a promotion. Everyone is hitting ‘Reply All’ to say ‘Congrats!’. What do you do?",
    options: [
      {
        id: "A",
        text: "Hit ‘Reply All’ and say ‘Congrats! So well deserved!’",
        vibe_score: 50,
        feedback: "Acceptable, but annoying to many people. You’re adding to the ‘Digital Noise’.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Send a separate, private email to the person: ‘Hey! Saw the news, huge congrats!’",
        vibe_score: 95,
        feedback: "High Vibe. It feels more personal to them and keeps the rest of the team’s inbox clean.",
        allow_retry: false
      }
    ],
    x_ray: "Respecting people’s ‘Inbox Space’ is a hidden way to show you are a high-level professional.",
    season: 4,
    xp: 100
  },
  {
    day: 36,
    phase: 2,
    module: "The Office OS",
    title: "The Coffee Run",
    imageUrl: "/images/missions/day36.png",
    image_description: "3D clay style, standing at your desk, putting on a jacket. Your coworker is looking at you.",
    strategic_brief: "The ‘Favor’ Loop. Offering to grab a coffee for a teammate is the fastest way to turn a ‘Coworker’ into a ‘Work Friend.’",
    cloze_setup: "Offering a [**] is a [**] way to build [**].",
    cloze_keywords: ["low-cost", "free trial", "customer loyalty"],
    scenario_text: "You are going to the breakroom or Starbucks. How do you phrase the offer?",
    options: [
      {
        id: "A",
        text: "Hey, I’m grabbing a coffee. Want me to get you one?",
        vibe_score: 95,
        feedback: "Perfect. Simple and low-pressure. Even if they say no, they will appreciate that you asked.",
        allow_retry: false
      },
      {
        id: "B",
        text: "I am going to get coffee. Do you need anything?",
        vibe_score: 75,
        feedback: "Good, but ‘Want me to get you one?’ sounds a bit more like a friendly offer.",
        allow_retry: true
      }
    ],
    x_ray: "In the US, ‘Favors’ aren’t about the coffee; they are about showing that you are ‘Thinking of the Team.’",
    season: 4,
    xp: 100
  },
  {
    day: 37,
    phase: 2,
    module: "The Office OS",
    title: "The Desk Stop",
    imageUrl: "/images/missions/day37.png",
    image_description: "3D clay style, walking up to a coworker's desk. They have headphones on and are typing quickly.",
    strategic_brief: "The Visual Cue. Headphones are the universal ‘Do Not Disturb’ sign. If you must interrupt, use a ‘Soft Opener.’",
    cloze_setup: "I should [**] their [**] before I start talking.",
    cloze_keywords: ["size up", "demeanor"],
    scenario_text: "You need a quick answer on a project. They are wearing headphones. What do you do?",
    options: [
      {
        id: "A",
        text: "Tap them on the shoulder and start talking immediately.",
        vibe_score: 10,
        feedback: "Social Disaster. Never touch a coworker to get their attention. It’s seen as aggressive.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Stand 3 feet away, wait for them to look up, and say: “Hey, sorry to bug you! Got a quick sec?”",
        vibe_score: 95,
        feedback: "Perfect. You respected their bubble and gave them the option to say ‘Later’.",
        allow_retry: false
      }
    ],
    x_ray: "The phrase ‘Got a quick sec?’ is the ‘Escape Hatch’ for Americans. It lets them finish their thought before they talk to you.",
    season: 4,
    xp: 100
  },
  {
    day: 38,
    phase: 2,
    module: "The Office OS",
    title: "Decoding ‘Business Casual’",
    imageUrl: "/images/missions/day38.png",
    image_description: "3D clay style, standing in front of a mirror at home. You have a suit, a hoodie, and a polo shirt laid out on the bed.",
    strategic_brief: "The Middle Ground. In modern US offices, being ‘Over-dressed’ is sometimes as bad as being ‘Under-dressed.’",
    cloze_setup: "It’s better to be [**] slightly more [**] than everyone else.",
    cloze_keywords: ["ahead of the curve", "on the ball"],
    scenario_text: "The company says the vibe is ‘Casual.’ What do you wear for your first big presentation?",
    options: [
      {
        id: "A",
        text: "A full suit and tie.",
        vibe_score: 40,
        feedback: "Too much. You’ll make everyone else feel uncomfortable. You look like you’re trying too hard.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Dark jeans and a nice button-down shirt or polo.",
        vibe_score: 95,
        feedback: "The Sweet Spot. It shows you care about the meeting but you ‘get’ the company culture.",
        allow_retry: false
      }
    ],
    x_ray: "American style is about ‘Effortless Competence.’ You want to look like you put in effort, but not like you’re worried about it.",
    season: 4,
    xp: 100
  },
  {
    day: 39,
    phase: 2,
    module: "The Office OS",
    title: "The Birthday Celebration",
    imageUrl: "/images/missions/day39.png",
    image_description: "3D clay style, a group of coworkers gathered around a desk with a store-bought cake. Someone is lighting candles.",
    strategic_brief: "The ‘Mandatory Fun.’ Even if you find it cheesy, participating in office celebrations is how you prove you are a ‘Cultural Fit.’",
    cloze_setup: "[**] in [**] [**] [**] [**] with the group.",
    cloze_keywords: ["Participating", "rituals", "builds"],
    scenario_text: "Everyone is singing ‘Happy Birthday’ to a coworker you don’t know very well. What do you do?",
    options: [
      {
        id: "A",
        text: "Stay at your desk and keep working to show you are productive.",
        vibe_score: 30,
        feedback: "Wrong. You look like a ‘Robot.’ People will think you are ‘Too good’ for the team.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Stand with the group, clap, and say ‘Happy Birthday!’ at the end.",
        vibe_score: 95,
        feedback: "Perfect. You don’t have to be the loudest person, but you must be ‘Present’.",
        allow_retry: false
      }
    ],
    x_ray: "In the US, ‘The Team’ is a family-lite. If the family is celebrating, you show up for 5 minutes.",
    season: 4,
    xp: 100
  },
  {
    day: 40,
    phase: 2,
    module: "The Office OS",
    title: "The Team Lunch",
    imageUrl: "/images/missions/day40.png",
    image_description: "3D clay style, a large round table at a casual Mexican restaurant. 6 coworkers are sitting around it, laughing and ordering chips.",
    strategic_brief: "The Safe Zone. A team lunch is a test of your ‘Humanity.’ Talk about hobbies, food, and movies—not the project due at 5 PM.",
    cloze_setup: "Team lunches are for [**] building, not [**] updates.",
    cloze_keywords: ["team building", "status updates"],
    scenario_text: "The conversation dies down for a second. What do you say?",
    options: [
      {
        id: "A",
        text: "So, how is the Q4 budget report looking, Sarah?",
        vibe_score: 20,
        feedback: "Ugh! You just brought ‘Work’ to the ‘Lunch.’ Everyone is now sighing internally.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Has anyone tried that new pizza place down the street? I heard it’s great.",
        vibe_score: 95,
        feedback: "Excellent. Food is the ultimate ‘Safe Topic.’ It keeps the mood light and fun.",
        allow_retry: false
      }
    ],
    x_ray: "At lunch, you aren’t an Engineer; you are a Person who eats. Focus on the ‘Person’ part.",
    season: 4,
    xp: 100,
    achievementId: "office-pro"
  }
];
