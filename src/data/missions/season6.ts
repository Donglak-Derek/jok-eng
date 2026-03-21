import { Mission } from "@/types";

export const season6Missions: Mission[] = [
  {
    day: 51,
    phase: 2,
    module: "Humor & Irony",
    title: "The Deadpan Detective",
    imageUrl: "/images/missions/day51.png",
    image_description: "3D clay style, a coworker standing by a printer that is obviously jammed and smoking. They look at you with a completely straight face and no smile.",
    strategic_brief: "Recognizing Irony. Americans often say the exact opposite of the truth to highlight how obvious a situation is. This is ‘Deadpan’ humor.",
    cloze_setup: "If the words [**] the [**], it is [**] a [**].",
    cloze_keywords: ["likely", "don't match"],
    scenario_text: "The printer is broken. Your coworker looks at it and says: “Wow, I love how reliable our technology is.”",
    options: [
      {
        id: "A",
        text: "Actually, it is not reliable. It is broken right now.",
        vibe_score: 30,
        feedback: "Whoops! You ‘Fact-Checked’ a joke. This makes you look like you have no sense of humor.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Laugh and say: “Yeah, it’s a masterpiece of engineering, isn’t it?”",
        vibe_score: 95,
        feedback: "Perfect! You played along with the irony. You’ve officially ‘viped’ with the teammate.",
        allow_retry: false
      }
    ],
    x_ray: "When someone says something obviously false with a straight face, they are inviting you to complain with them through humor.",
    season: 6,
    xp: 100
  },
  {
    day: 52,
    phase: 2,
    module: "Humor & Irony",
    title: "Self-Deprecation Logic",
    imageUrl: "/images/missions/day52.png",
    image_description: "3D clay style, a senior executive standing on a small stage at an office meeting. He is pointing at a slide with a small typo and chuckling.",
    strategic_brief: "Lowering the Shield. Americans in power often make fun of their own mistakes to seem ‘Relatable’ and ‘Human.’",
    cloze_setup: "[**] [**] is a [**] [**] in the US.",
    cloze_keywords: ["Making fun of", "sign of"],
    scenario_text: "The CEO says: “As you can see by this typo, I clearly didn’t graduate top of my class!” Everyone laughs. What do you do?",
    options: [
      {
        id: "A",
        text: "Smile and laugh along with the group.",
        vibe_score: 95,
        feedback: "Correct. You recognized the ‘Social Signal’—he is telling everyone it’s okay to be human.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Say loudly: “Yes, it is very important to check your spelling next time.”",
        vibe_score: 10,
        feedback: "Social Suicide. You just ‘attacked’ someone who was being vulnerable. Never turn their self-joke into a real criticism.",
        allow_retry: true
      }
    ],
    x_ray: "In the US, only confident people make fun of themselves. By laughing, you acknowledge their status and their humility.",
    season: 6,
    xp: 100
  },
  {
    day: 53,
    phase: 2,
    module: "Humor & Irony",
    title: "The Pop Culture Bridge",
    imageUrl: "/images/missions/day53.png",
    image_description: "3D clay style, a group of coworkers at a lunch table. One is imitating a famous movie character or mentioning a viral meme.",
    strategic_brief: "The Shared Screen. Americans use TV shows (The Office, Succession) and memes as a common language.",
    cloze_setup: "I don’t need to [**] the show to [**] the feeling.",
    cloze_keywords: ["take in", "relate to"],
    scenario_text: "A coworker says: “This project is starting to feel like a scene from Inception.” You haven’t seen the movie. How do you respond?",
    options: [
      {
        id: "A",
        text: "I haven’t seen that movie. What is it about?",
        vibe_score: 60,
        feedback: "Honest, but it stops the fun. It turns the ‘Vibe’ into a ‘Lesson’.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Laugh and say: “Haha, it is getting pretty confusing, right?”",
        vibe_score: 90,
        feedback: "Smart. You used context clues (Inception = confusing/dreamlike) to keep the conversation moving.",
        allow_retry: false
      }
    ],
    x_ray: "You don’t need to be an expert on Hollywood. Just react to the emotion behind the reference.",
    season: 6,
    xp: 100
  },
  {
    day: 54,
    phase: 2,
    module: "Humor & Irony",
    title: "The ‘Dad Joke’ Test",
    imageUrl: "/images/missions/day54.png",
    image_description: "3D clay style, an older manager with a punny t-shirt. He just told a really bad, cheesy joke at the start of a meeting.",
    strategic_brief: "The Groan Ritual. ‘Dad jokes’ are intentionally bad. The goal is to create a shared ‘groan’ or lighthearted moment.",
    cloze_setup: "A ‘Dad Joke’ is [**] [**], not [**].",
    cloze_keywords: ["'Dad Joke'", "meant to be"],
    scenario_text: "Manager: “Why did the scarecrow win an award? Because he was outstanding in his field!” (Silence).",
    options: [
      {
        id: "A",
        text: "Roll your eyes playfully or give a small ‘Oh man...’ laugh.",
        vibe_score: 95,
        feedback: "Perfect. This is the ‘Correct’ response to a pun. You are participating in the ritual.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Stare blankly because you don’t think it’s funny.",
        vibe_score: 40,
        feedback: "Too serious. You’re bringing a ‘Cold Vibe’ to a moment meant for ‘Warmth’.",
        allow_retry: true
      }
    ],
    x_ray: "In the US, bad jokes are used to break the tension of a ‘Serious’ workplace.",
    season: 6,
    xp: 100
  },
  {
    day: 55,
    phase: 2,
    module: "Humor & Irony",
    title: "American Hyperbole",
    imageUrl: "/images/missions/day55.png",
    image_description: "3D clay style, a coworker holding a sandwich. They look like they just won the lottery.",
    strategic_brief: "The ‘Best Ever’ Logic. Americans use extreme words (‘Amazing’, ‘Incredible’, ‘Life-changing’) for very small things.",
    cloze_setup: "I should [**] the [**] of their words by 50%.",
    cloze_keywords: ["downplay", "significance"],
    scenario_text: "Your coworker bites into a taco and says: “Oh my god, this is literally the greatest thing I have ever eaten in my life.”",
    options: [
      {
        id: "A",
        text: "Say: “Wow, really? Is it better than your wedding dinner?”",
        vibe_score: 40,
        feedback: "Too literal! You’re ruining their ‘Hype’.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Smile and say: “That good, huh? I’ll have to try that place!”",
        vibe_score: 95,
        feedback: "Perfect. You matched their ‘Hype Vibe’ without being literal.",
        allow_retry: false
      }
    ],
    x_ray: "Hyperbole is just a way to show ‘Enthusiasm.’ It’s not a statement of fact.",
    season: 6,
    xp: 100
  },
  {
    day: 56,
    phase: 2,
    module: "Humor & Irony",
    title: "Workplace Slang 101",
    imageUrl: "/images/missions/day56.png",
    image_description: "3D clay style, a laptop screen with a Slack message from a younger coworker: ‘That presentation was fire. No cap.’",
    strategic_brief: "The Age Gap. Slang is used to show ‘Authenticity’ and ‘Coolness.’ Use it sparingly unless you are 100% sure of the meaning.",
    cloze_setup: "I should [**] slang before I try to [**] it.",
    cloze_keywords: ["grasp", "wield"],
    scenario_text: "A junior dev says your code change was ‘Goated.’ How do you react?",
    options: [
      {
        id: "A",
        text: "Say: “Thanks! I appreciate the support.”",
        vibe_score: 95,
        feedback: "Safe and professional. You acknowledged the praise without trying too hard to sound ‘Gen Z’.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Say: “Yes, it is very fire, no cap, my bro.”",
        vibe_score: 20,
        feedback: "Cringe! You sound like you are trying way too hard. Stick to your own voice.",
        allow_retry: true
      }
    ],
    x_ray: "You don’t need to speak like a teenager to be liked. Just ‘Understanding’ the slang is 90% of the battle.",
    season: 6,
    xp: 100
  },
  {
    day: 57,
    phase: 2,
    module: "Humor & Irony",
    title: "The ‘Light’ Roast",
    imageUrl: "/images/missions/day57.png",
    image_description: "3D clay style, standing with a group of work friends. One friend points at your very bright, colorful new sneakers and grins.",
    strategic_brief: "The Trust Test. In the US, if a friend makes a small, harmless joke about you, it means they finally feel ‘Safe’ with you.",
    cloze_setup: "A ‘[**]’ from a [**] is a [**] [**].",
    cloze_keywords: ["Roast", "sign of"],
    scenario_text: "Friend: “Whoa, Han! Are those shoes bright enough? I think I need sunglasses just to look at your feet!” (Everyone laughs).",
    options: [
      {
        id: "A",
        text: "Get offended and explain: “They were very expensive and are high quality.”",
        vibe_score: 30,
        feedback: "Wrong. You just made everyone feel awkward. You ‘Failed’ the trust test.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Laugh and say: “I know, right? I wanted to make sure you guys could find me if I got lost!”",
        vibe_score: 95,
        feedback: "BOOM. You leaned into the joke. You are now ‘One of us.’",
        allow_retry: false
      }
    ],
    x_ray: "If someone jokes about you, joke with them. It shows you have high ‘Social EQ’ and aren’t easily hurt.",
    season: 6,
    xp: 100
  },
  {
    day: 58,
    phase: 2,
    module: "Humor & Irony",
    title: "Sports as Currency",
    imageUrl: "/images/missions/day58.png",
    image_description: "3D clay style, Monday morning by the elevator. Two guys are talking about ‘The Game’ last night with a lot of energy.",
    strategic_brief: "The Ultimate Safe Topic. You don’t need to love sports; you just need to know ‘The Narrative’ (who won/who lost).",
    cloze_setup: "Sports are a [**] way to build [**] without being personal.",
    cloze_keywords: ["invaluable", "camaraderie"],
    scenario_text: "Coworker: “Can you believe that comeback last night? Unreal!”",
    options: [
      {
        id: "A",
        text: "I don’t watch sports. I think it is a waste of time.",
        vibe_score: 10,
        feedback: "Social Wall. You just killed the mood and made yourself sound elitist.",
        allow_retry: true
      },
      {
        id: "B",
        text: "I didn’t catch the whole thing, but I saw the highlights! Crazy ending, right?",
        vibe_score: 90,
        feedback: "Perfect. You participated in the ‘Energy’ without needing to be an expert.",
        allow_retry: false
      }
    ],
    x_ray: "In the US, ‘The Game’ is the default small talk. Knowing the ‘Vibe’ of the local team is a huge social advantage.",
    season: 6,
    xp: 100
  },
  {
    day: 59,
    phase: 2,
    module: "Humor & Irony",
    title: "Irony vs. Sincerity",
    imageUrl: "/images/missions/day59.png",
    image_description: "3D clay style, a coworker gives you a high-five after you finish a long presentation. They say: “Well, that was a total disaster.” (They are smiling).",
    strategic_brief: "Decoding the Smile. If someone says something negative but is smiling/high-fiving, they mean the opposite.",
    cloze_setup: "The [**] always tells the [**] of the words.",
    cloze_keywords: ["context", "meaning"],
    scenario_text: "You did a great job. Coworker smiles and says: “Wow, you really messed that up, Han!”",
    options: [
      {
        id: "A",
        text: "Smile back and say: “I know, I’ll try to be even worse next time!”",
        vibe_score: 95,
        feedback: "Perfect irony! You matched their ‘Reverse Praise’.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Look worried and ask: “Wait, what did I do wrong?”",
        vibe_score: 40,
        feedback: "You missed the irony. Now they feel bad for making a joke and things are awkward.",
        allow_retry: true
      }
    ],
    x_ray: "Americans often use ‘Negative Irony’ to praise someone who is doing so well that it’s obvious.",
    season: 6,
    xp: 100
  },
  {
    day: 60,
    phase: 2,
    module: "Humor & Irony",
    title: "The Happy Hour Ritual",
    imageUrl: "/images/missions/day60.png",
    image_description: "3D clay style, a dimly lit, cozy bar/restaurant at 5:30 PM. Coworkers are holding drinks (beers/sodas) and standing in a loose circle.",
    strategic_brief: "The Transition Zone. Happy Hour is where ‘Work Han’ becomes ‘Person Han.’",
    cloze_setup: "At Happy Hour, I should [**] about the project and [**] about life.",
    cloze_keywords: ["catch up", "talk shop"],
    scenario_text: "A coworker brings up the big deadline on Monday while everyone is drinking. What do you do?",
    options: [
      {
        id: "A",
        text: "Immediately start talking about the spreadsheet and the budget.",
        vibe_score: 20,
        feedback: "Vibe Killer! Nobody wants to think about Monday at 5:30 PM on Friday.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Say: “Let’s worry about that on Monday! Right now, I just want to know where you got those shoes!”",
        vibe_score: 95,
        feedback: "Legendary. You ‘Protected the Vibe.’ Everyone will love you for this.",
        allow_retry: false
      }
    ],
    x_ray: "Happy Hour is a ‘Sanctuary.’ The person who brings ‘Stress’ into the ‘Sanctuary’ is never invited back.",
    season: 6,
    xp: 100,
    achievementId: "humor-buff"
  }
];
