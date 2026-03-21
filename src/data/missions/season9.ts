import { Mission } from "@/types";

export const season9Missions: Mission[] = [
  {
    day: 81,
    phase: 3,
    module: "Mastery & Leadership",
    title: "Negotiating the Raise",
    imageUrl: "/images/missions/day81.png",
    image_description: "3D clay style, a private office with a view of a city skyline. You are sitting across from your boss. A document is on the table between you.",
    strategic_brief: "The Market Value Logic. In the US, a raise isn’t a reward for ‘Time Served’; it’s a ‘Market Correction’ for the value you provide.",
    cloze_setup: "I should base my [**] on [**] data, not [**].",
    cloze_keywords: ["base on", "personal needs"],
    scenario_text: "Boss: “You’ve done great this year, Han. What are your expectations for compensation moving forward?”",
    options: [
      {
        id: "A",
        text: "I’ve been here a year and my rent went up, so I was hoping for a 10% raise.",
        vibe_score: 30,
        feedback: "Weak. Your rent is not the company’s problem. You sound like you’re asking for a favor, not a promotion.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Based on the 20% increase in team velocity I led this year, I’m looking for a salary that reflects that impact.",
        vibe_score: 98,
        feedback: "Masterful. You linked the money to the ‘Impact’ (Velocity). This is how Power Players negotiate.",
        allow_retry: false
      }
    ],
    x_ray: "Americans respect people who know their ‘Market Value.’ If you don’t ask for it, they assume you don’t know it.",
    season: 9,
    xp: 100
  },
  {
    day: 82,
    phase: 3,
    module: "Mastery & Leadership",
    title: "The ‘Classy’ Exit",
    imageUrl: "/images/missions/day82.png",
    image_description: "3D clay style, you are standing in your manager’s office. You just accepted a better job offer elsewhere. It’s time to give your notice.",
    strategic_brief: "Protecting the Bridge. The tech world is small. How you leave a job is how you are remembered for the next 10 years.",
    cloze_setup: "I should [**] [**] and a [**] [**].",
    cloze_keywords: ["focus on", "smooth"],
    scenario_text: "Boss: “I’m sad to see you go. How do you want to handle your last two weeks?”",
    options: [
      {
        id: "A",
        text: "I’m checking out now. I’ll just do the bare minimum until Friday.",
        vibe_score: 10,
        feedback: "Bridge Burner. You just erased 2 years of good work in 2 seconds. Word will travel.",
        allow_retry: true
      },
      {
        id: "B",
        text: "I want to make sure the team is set up for success. I’ve already started a transition doc for my replacement.",
        vibe_score: 95,
        feedback: "Elite. You are leaving as a ‘Hero.’ This boss will hire you again in 5 years at a higher level.",
        allow_retry: false
      }
    ],
    x_ray: "The ‘Two-Week Notice’ is a test of character. Leaving with a ‘Succession Plan’ is the ultimate professional move.",
    season: 9,
    xp: 100
  },
  {
    day: 83,
    phase: 3,
    module: "Mastery & Leadership",
    title: "Managing Up",
    imageUrl: "/images/missions/day83.png",
    image_description: "3D clay style, you are in a 1-on-1. Your boss is overwhelmed and forgetting things. You need to lead your leader.",
    strategic_brief: "The Executive Assistant Mindset. Don’t wait for orders. Anticipate their needs and provide solutions before they ask.",
    cloze_setup: "[**] is about [**] my boss's [**] [**].",
    cloze_keywords: ["Managing up", "reducing"],
    scenario_text: "Boss: “Uh, I forgot... did we decide on the budget for the new tool?”",
    options: [
      {
        id: "A",
        text: "Yes, we talked about it Tuesday. Don’t you remember?",
        vibe_score: 25,
        feedback: "Too aggressive. You made them feel stupid. Not a smart move for your career.",
        allow_retry: true
      },
      {
        id: "B",
        text: "I have the notes right here! I’ve outlined the two options we liked. Want me to send over the summary?",
        vibe_score: 98,
        feedback: "Perfect. You became their ‘Memory.’ You are now indispensable.",
        allow_retry: false
      }
    ],
    x_ray: "A ‘Power Player’ makes their boss look good. When your boss succeeds because of you, you rise with them.",
    season: 9,
    xp: 100
  },
  {
    day: 84,
    phase: 3,
    module: "Mastery & Leadership",
    title: "Strategic Silence",
    imageUrl: "/images/missions/day84.png",
    image_description: "3D clay style, a high-level boardroom. Everyone is arguing about a mistake. You know the answer, but the room is too loud.",
    strategic_brief: "The Power of the Pause. Sometimes, the most influential person in the room is the one who says the least.",
    cloze_setup: "I should wait for the [**] [**] before I [**] the [**].",
    cloze_keywords: ["to peak", "provide"],
    scenario_text: "The argument is going in circles. When do you speak?",
    options: [
      {
        id: "A",
        text: "Wait until there is a tired silence, then speak calmly and slowly.",
        vibe_score: 95,
        feedback: "Masterful. Silence acts as a spotlight. When you finally speak, everyone will lean in.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Try to shout over everyone so they know you have the answer.",
        vibe_score: 30,
        feedback: "You just added to the noise. You look like a participant, not a leader.",
        allow_retry: true
      }
    ],
    x_ray: "In the US, ‘Noise’ is cheap. ‘Clarity’ is expensive. Be the one who provides clarity.",
    season: 9,
    xp: 100
  },
  {
    day: 85,
    phase: 3,
    module: "Mastery & Leadership",
    title: "American Storytelling",
    imageUrl: "/images/missions/day85.png",
    image_description: "3D clay style, you are giving a presentation to the whole company. There are no bullet points on the slide, just a powerful photo.",
    strategic_brief: "Data vs. Narrative. Americans don’t follow ‘Charts’; they follow ‘Stories.’ Turn your project into a journey.",
    cloze_setup: "I should [**] the [**] problem, then show the [**] solution.",
    cloze_keywords: ["lead with", "underlying", "comprehensive"],
    scenario_text: "How do you start your talk about the new app update?",
    options: [
      {
        id: "A",
        text: "First, I’ll show you the system architecture and the database schema.",
        vibe_score: 40,
        feedback: "Boring. You’re talking to their brains, not their hearts. They will check their phones in 5 minutes.",
        allow_retry: true
      },
      {
        id: "B",
        text: "I want to tell you about a user named ‘Minsu.’ He spent 3 hours trying to do [Task]. Here’s how we fixed that.",
        vibe_score: 95,
        feedback: "Brilliant. You made it personal. Now they care about the technical details because they care about Minsu.",
        allow_retry: false
      }
    ],
    x_ray: "The ‘Hero’s Journey’ is the default American logic. Your user is the hero; your app is the sword.",
    season: 9,
    xp: 100
  },
  {
    day: 86,
    phase: 3,
    module: "Mastery & Leadership",
    title: "Regional Vibe Shifting",
    imageUrl: "/images/missions/day86.png",
    image_description: "3D clay style, you are traveling to a branch office in New York (or California). The vibe is different from your home office in Texas.",
    strategic_brief: "The Cultural Chameleon. US ‘Vibe’ changes by region. NYC is fast/blunt; SF is casual/visionary; The South is polite/indirect.",
    cloze_setup: "I should [**] my communication [**] to match the [**].",
    cloze_keywords: ["tailor", "communication style", "local culture"],
    scenario_text: "You are in NYC. People are talking fast and interrupting. How do you respond?",
    options: [
      {
        id: "A",
        text: "Match their speed. Be blunt, fast, and get straight to the point.",
        vibe_score: 95,
        feedback: "Perfect. In NYC, ‘Slow’ is seen as ‘Unprepared.’ Speed is a sign of respect for their time.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Ask them to please be more polite and wait their turn to speak.",
        vibe_score: 20,
        feedback: "You’ll be eaten alive. They aren’t being rude; they’re being ‘Efficient.’ Adapt or fail.",
        allow_retry: true
      }
    ],
    x_ray: "The US is a continent, not a country. A ‘Power Player’ knows which version of ‘American’ to speak.",
    season: 9,
    xp: 100
  },
  {
    day: 87,
    phase: 3,
    module: "Mastery & Leadership",
    title: "Influencing Peers",
    imageUrl: "/images/missions/day87.png",
    image_description: "3D clay style, sitting at a round table with peers from other departments. You need their help, but you aren’t their boss.",
    strategic_brief: "Soft Power. You don’t have ‘Authority,’ so you must use ‘Alignment.’ Show them how helping you helps *them*.",
    cloze_setup: "Influence is about finding the [**] between our [**].",
    cloze_keywords: ["confluence", "disparate objectives"],
    scenario_text: "How do you ask the Marketing Lead for a favor?",
    options: [
      {
        id: "A",
        text: "I really need this for my project. Can you just do it quickly?",
        vibe_score: 30,
        feedback: "Transactional and selfish. They have their own work to do.",
        allow_retry: true
      },
      {
        id: "B",
        text: "I noticed your team is focused on [Goal]. If we do this together, it will make your next launch much smoother.",
        vibe_score: 98,
        feedback: "Excellent. You framed your ‘Favor’ as an ‘Opportunity’ for them.",
        allow_retry: false
      }
    ],
    x_ray: "In a flat hierarchy, ‘Social Capital’ is the only currency. Spend it by helping others first.",
    season: 9,
    xp: 100
  },
  {
    day: 88,
    phase: 3,
    module: "Mastery & Leadership",
    title: "Setting Executive Boundaries",
    imageUrl: "/images/missions/day88.png",
    image_description: "3D clay style, it’s 8 PM on a Friday. Your boss pings you with a ‘non-emergency’ question. You are with your family.",
    strategic_brief: "The Respect Boundary. If you always answer at 8 PM, you teach people that your time has no value.",
    cloze_setup: "I should [**] my [**] to avoid [**] and [**].",
    cloze_keywords: ["burnout", "workload", "earn respect"],
    scenario_text: "Do you answer the ping immediately?",
    options: [
      {
        id: "A",
        text: "Yes, I want them to know I am the hardest worker on the team.",
        vibe_score: 45,
        feedback: "Short-term win, long-term loss. You’re setting a standard you can’t keep.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Wait until Monday morning (or Sunday night) and give a high-quality answer then.",
        vibe_score: 90,
        feedback: "Correct. Executives respect people who have a life. It signals you are ‘In Demand’ and ‘Disciplined.’",
        allow_retry: false
      }
    ],
    x_ray: "Availability is not the same as Value. A ‘Power Player’ is available when it matters, not whenever they are called.",
    season: 9,
    xp: 100
  },
  {
    day: 89,
    phase: 3,
    module: "Mastery & Leadership",
    title: "The Executive Summary",
    imageUrl: "/images/missions/day89.png",
    image_description: "3D clay style, a very short email draft on a screen. 3 bullet points. No ‘Fluff.’",
    strategic_brief: "The TL;DR Culture. The higher up you go, the less people read. Master the ‘Bottom Line Up Front’ (BLUF).",
    cloze_setup: "I should put the most [**] information in the [**] sentence.",
    cloze_keywords: ["salient", "introductory"],
    scenario_text: "You are updating the CEO on a project. What is the first sentence?",
    options: [
      {
        id: "A",
        text: "We are on track for a June 1st launch with no budget blockers.",
        vibe_score: 98,
        feedback: "Perfect. You answered the only two questions the CEO has in 12 words.",
        allow_retry: false
      },
      {
        id: "B",
        text: "I wanted to let you know that we’ve been working really hard and the team is doing great...",
        vibe_score: 40,
        feedback: "Too slow. They stopped reading at ‘I wanted to let you know.’",
        allow_retry: true
      }
    ],
    x_ray: "In the C-Suite, ‘Time’ is the most expensive resource. If you save them time, you are an ally.",
    season: 9,
    xp: 100
  },
  {
    day: 90,
    phase: 3,
    module: "Mastery & Leadership",
    title: "The Grand Finale: The Keynote",
    imageUrl: "/images/missions/day90.png",
    image_description: "3D clay style, a massive stage with bright lights. You are holding a microphone, looking out at a huge crowd. You are smiling and confident.",
    strategic_brief: "The Transformation. You aren’t ‘Learning English’ anymore. You are leading a movement. Own the stage.",
    cloze_setup: "I am no longer an [**]; I am a [**].",
    cloze_keywords: ["victim", "survivor"],
    scenario_text: "You finish your speech. The audience is silent, then bursts into applause. What is your final ‘Vibe’ move?",
    options: [
      {
        id: "A",
        text: "Bow your head and walk off quickly because you’re embarrassed.",
        vibe_score: 30,
        feedback: "You just apologized for your success. Don’t do that. Own the moment.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Stand tall, smile, say ‘Thank you,’ and make eye contact with the front row before leaving.",
        vibe_score: 100,
        feedback: "LEGENDARY. You have completed the 90-day map. You are a Cultural Power Player.",
        allow_retry: false
      }
    ],
    x_ray: "The journey from Day 1 to Day 90 wasn’t about words. It was about the person you became while saying them.",
    season: 9,
    xp: 100,
    achievementId: "leadership-legend"
  }
];
