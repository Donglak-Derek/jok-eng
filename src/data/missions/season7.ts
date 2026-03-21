import { Mission } from "@/types";

export const season7Missions: Mission[] = [
  {
    day: 61,
    phase: 3,
    module: "Productive Conflict",
    title: "The Strategic Interrupt",
    imageUrl: "/images/missions/day61.png",
    image_description: "3D clay style, a fast-paced Zoom meeting with 6 people. One person is talking with a lot of hand gestures. There is a small gap in their breathing.",
    strategic_brief: "Finding the Gap. In US meetings, waiting for ‘Silence’ means you’ll never speak. You must lean in and claim your space.",
    cloze_setup: "Interrupting is [**] if I am [**] to the conversation.",
    cloze_keywords: ["out of line", "bystander"],
    scenario_text: "The Lead is talking quickly about the roadmap. You have a critical technical concern. How do you jump in?",
    options: [
      {
        id: "A",
        text: "Wait until the meeting is completely over, then send a long email.",
        vibe_score: 40,
        feedback: "Too late. The decision is already made. You look like you’re hiding behind your keyboard.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Lean forward, raise a hand slightly, and say: “Can I just jump in with a quick point on that?”",
        vibe_score: 95,
        feedback: "Power Move. ‘Can I just jump in’ is the polite American signal that you have something important to say.",
        allow_retry: false
      }
    ],
    x_ray: "In America, the ‘Floor’ belongs to whoever takes it. If you wait to be asked, people assume you have nothing to say.",
    season: 7,
    xp: 100
  },
  {
    day: 62,
    phase: 3,
    module: "Productive Conflict",
    title: "The ‘I See it Differently’ Frame",
    imageUrl: "/images/missions/day62.png",
    image_description: "3D clay style, a glass-walled office. You are sitting across from a coworker who just proposed a plan you think will fail. They look confident.",
    strategic_brief: "De-personalizing Conflict. Don’t say ‘You are wrong.’ Say ‘The data shows something else.’",
    cloze_setup: "I should attack the [**], not the [**].",
    cloze_keywords: ["Idea", "Person"],
    scenario_text: "Coworker: “I think we should launch this on Monday no matter what.” What is your response?",
    options: [
      {
        id: "A",
        text: "I see it a bit differently. Looking at the test results, I’m worried about the stability. What do you think?",
        vibe_score: 95,
        feedback: "Excellent. ‘I see it a bit differently’ is the ultimate ‘Safe’ way to disagree with a peer.",
        allow_retry: false
      },
      {
        id: "B",
        text: "That is a bad idea. We are not ready and you know it.",
        vibe_score: 20,
        feedback: "Aggressive. You just turned a technical debate into a personal fight. They will stop listening now.",
        allow_retry: true
      }
    ],
    x_ray: "By framing disagreement as a ‘different perspective’ based on ‘data,’ you allow the other person to change their mind without losing face.",
    season: 7,
    xp: 100
  },
  {
    day: 63,
    phase: 3,
    module: "Productive Conflict",
    title: "Saying ‘No’ to the Boss",
    imageUrl: "/images/missions/day63.png",
    image_description: "3D clay style, your manager is standing at your desk with a new stack of folders. They look stressed and are asking for ‘one more thing.’",
    strategic_brief: "The Capacity Argument. A Power Player doesn’t say ‘No.’ They say ‘If I do this, what should I stop doing?’",
    cloze_setup: "I should [**] my ‘No’ as a [**] of [**].",
    cloze_keywords: ["frame", "'No'"],
    scenario_text: "Boss: “Han, I know you’re busy, but can you finish this report by 5 PM?”",
    options: [
      {
        id: "A",
        text: "I’d love to help with that. If I prioritize this, should I push the project build to tomorrow?",
        vibe_score: 95,
        feedback: "Perfect. You aren’t saying ‘No’; you are asking the boss to help you manage your time.",
        allow_retry: false
      },
      {
        id: "B",
        text: "No, I am already too busy. It is impossible.",
        vibe_score: 30,
        feedback: "Too blunt. It sounds like you aren’t a ‘Team Player.’ Always offer a trade-off.",
        allow_retry: true
      }
    ],
    x_ray: "American bosses value ‘Can-do’ attitudes. When you ask to ‘Prioritize,’ you are still saying ‘Yes’ to their authority while saying ‘No’ to the workload.",
    season: 7,
    xp: 100
  },
  {
    day: 64,
    phase: 3,
    module: "Productive Conflict",
    title: "Defending Your Design",
    imageUrl: "/images/missions/day64.png",
    image_description: "3D clay style, you are presenting a UI design on a large screen. A stakeholder says: “I don’t like the color blue. Make it red.”",
    strategic_brief: "The Expert Pivot. Don’t defend your ‘Taste.’ Defend the ‘User Goal.’",
    cloze_setup: "I should link my [**] to the [**] [**].",
    cloze_keywords: ["link to", "objective"],
    scenario_text: "Stakeholder: “Red is my favorite color. Let’s change the whole dashboard to red.”",
    options: [
      {
        id: "A",
        text: "Okay, you’re the boss. I will change it.",
        vibe_score: 40,
        feedback: "Weak. You lost your authority as a designer. They hired you for your expertise, not your ‘Yes’.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Interesting. We chose blue because it tests higher for user trust. Would red still align with that goal?",
        vibe_score: 95,
        feedback: "Brilliant. You used the ‘Interesting’ pivot and challenged them to prove their idea with data.",
        allow_retry: false
      }
    ],
    x_ray: "When you defend an idea with ‘Logic’ rather than ‘Feeling,’ you become a strategic partner instead of just a ‘worker.’",
    season: 7,
    xp: 100
  },
  {
    day: 65,
    phase: 3,
    module: "Productive Conflict",
    title: "Handling the ‘Talk-over’",
    imageUrl: "/images/missions/day65.png",
    image_description: "3D clay style, a mid-meeting scene. You are speaking, but a louder coworker starts talking right over you as if you aren’t there.",
    strategic_brief: "Reclaiming the Floor. If someone interrupts you, don’t stop. Finish your sentence or use a ‘Hold’ phrase.",
    cloze_setup: "I must [**] my [**] [**].",
    cloze_keywords: ["control my temper", "without getting angry"],
    scenario_text: "Coworker: “Actually, let me stop you there—” (They keep talking). What do you do?",
    options: [
      {
        id: "A",
        text: "Stop immediately and look at your notes with a sad face.",
        vibe_score: 20,
        feedback: "You just taught them that they can ignore you. This hurts your career long-term.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Keep talking for 3 seconds, then say: “One sec, let me just finish this thought and then I’ll hand it over.”",
        vibe_score: 95,
        feedback: "Masterful. You were polite but firm. You held the ‘Power’ in the room.",
        allow_retry: false
      }
    ],
    x_ray: "In the US, ‘Niceness’ is often confused with ‘Weakness.’ Holding your ground shows you believe your ideas have value.",
    season: 7,
    xp: 100
  },
  {
    day: 66,
    phase: 3,
    module: "Productive Conflict",
    title: "The Professional Apology",
    imageUrl: "/images/missions/day66.png",
    image_description: "3D clay style, you are in a small meeting room. You made a mistake that cost the team a day of work. Everyone is looking at you.",
    strategic_brief: "Accountability over Excuse. A Power Player takes 100% responsibility and immediately moves to the solution.",
    cloze_setup: "An apology is about [**], not [**].",
    cloze_keywords: ["responsibility", "justification"],
    scenario_text: "Team: “The server went down because of that code you pushed.”",
    options: [
      {
        id: "A",
        text: "That was my mistake. I own that. Here is how I’m fixing it and how we’ll prevent it next time.",
        vibe_score: 98,
        feedback: "Perfect. This actually increases your status. People trust leaders who admit mistakes.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Well, the documentation was confusing and nobody told me the rules...",
        vibe_score: 10,
        feedback: "Total Failure. You sound like a child making excuses. You just lost all your ‘Power Player’ points.",
        allow_retry: true
      }
    ],
    x_ray: "In the US, ‘Mistakes’ are okay. ‘Excuses’ are not. Own the error to end the conflict immediately.",
    season: 7,
    xp: 100
  },
  {
    day: 67,
    phase: 3,
    module: "Productive Conflict",
    title: "The ‘Hard’ Feedback",
    imageUrl: "/images/missions/day67.png",
    image_description: "3D clay style, you are a Lead now. You are talking to a junior developer who is making the same mistake every day. It’s time to be firm.",
    strategic_brief: "The ‘Behavior’ Lock. Focus on the ‘Impact’ of their actions on the team.",
    cloze_setup: "Feedback should be [**] and [**]-focused.",
    cloze_keywords: ["constructive", "solution-focused"],
    scenario_text: "How do you tell them they need to improve?",
    options: [
      {
        id: "A",
        text: "You’re doing great, but maybe try to check your code more?",
        vibe_score: 50,
        feedback: "Too soft. They won’t take you seriously. This is a ‘Sandwich’ with no meat.",
        allow_retry: true
      },
      {
        id: "B",
        text: "I’ve noticed a pattern in your PRs. This is slowing the team down. What can we do to fix this by next week?",
        vibe_score: 95,
        feedback: "Strong Leadership. You stated the fact, the impact, and a deadline for a solution.",
        allow_retry: false
      }
    ],
    x_ray: "Good leaders protect the team’s standards. High-vibe conflict means being honest enough to help someone grow.",
    season: 7,
    xp: 100
  },
  {
    day: 68,
    phase: 3,
    module: "Productive Conflict",
    title: "Escalating a Problem",
    imageUrl: "/images/missions/day68.png",
    image_description: "3D clay style, sitting at a desk, typing a message to your manager. A coworker is being consistently rude and it’s affecting your work.",
    strategic_brief: "The Business Case for HR. Don’t complain about ‘Feelings.’ Complain about ‘Productivity.’",
    cloze_setup: "[**] is a [**] [**], not a [**] one.",
    cloze_keywords: ["Escalation", "tool"],
    scenario_text: "How do you tell your boss about the rude coworker?",
    options: [
      {
        id: "A",
        text: "He’s mean and I don’t like working with him. He makes me sad.",
        vibe_score: 20,
        feedback: "This sounds like school drama. It won’t get you a professional result.",
        allow_retry: true
      },
      {
        id: "B",
        text: "I’m concerned about the communication friction with [Name]. It’s starting to delay our sprints. Can we discuss a solution?",
        vibe_score: 95,
        feedback: "Perfect. You linked the behavior to ‘Delaying Sprints.’ Now it’s a business problem they must solve.",
        allow_retry: false
      }
    ],
    x_ray: "Managers care about ‘Results.’ If you frame conflict as an obstacle to results, they will move mountains for you.",
    season: 7,
    xp: 100
  },
  {
    day: 69,
    phase: 3,
    module: "Productive Conflict",
    title: "Negotiating a Deadline",
    imageUrl: "/images/missions/day69.png",
    image_description: "3D clay style, a calendar on a screen with ‘Launch Day’ highlighted in red. It is clearly impossible to meet the date.",
    strategic_brief: "Under-promise, Over-deliver. It is better to have a ‘Hard Fight’ now than a ‘Hard Failure’ later.",
    cloze_setup: "A [**] deadline is better than a [**] promise.",
    cloze_keywords: ["firm", "vague"],
    scenario_text: "The client wants it by Friday. You know it takes until Tuesday. What do you do?",
    options: [
      {
        id: "A",
        text: "Say ‘Okay’ and then apologize on Friday when it’s not done.",
        vibe_score: 10,
        feedback: "This is how you get fired. You just lost all your professional credibility.",
        allow_retry: true
      },
      {
        id: "B",
        text: "If we want this done right, we need until Tuesday. I’m not comfortable rushing the testing phase.",
        vibe_score: 92,
        feedback: "Strong. You stood up for ‘Quality.’ This is what a Senior professional does.",
        allow_retry: false
      }
    ],
    x_ray: "American clients value ‘Predictability’ over ‘Politeness.’ Tell them the truth today so they can plan for it.",
    season: 7,
    xp: 100
  },
  {
    day: 70,
    phase: 3,
    module: "Productive Conflict",
    title: "The Heated Brainstorm",
    imageUrl: "/images/missions/day70.png",
    image_description: "3D clay style, 5 people in a room with a whiteboard. Ideas are flying and people are disagreeing loudly. It feels intense.",
    strategic_brief: "Passionate, Not Angry. In the US, a loud debate is often a sign of a ‘Healthy’ team. Don’t hide from the noise.",
    cloze_setup: "[**] is a sign of [**] to the [**].",
    cloze_keywords: ["High intensity", "commitment", "objective"],
    scenario_text: "Everyone is arguing. You have a third option that solves both sides. How do you lead the room?",
    options: [
      {
        id: "A",
        text: "Stand up, go to the whiteboard, and say: “I think I see a middle path. Can I show you guys something?”",
        vibe_score: 98,
        feedback: "MASTERFUL. You just took control of the room. You are officially a Power Player.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Sit in the corner and wait for them to stop yelling.",
        vibe_score: 30,
        feedback: "You’re invisible. You missed the chance to be the ‘Hero’ who solved the conflict.",
        allow_retry: true
      }
    ],
    x_ray: "Conflict is the ‘Fire’ that makes the ‘Steel’ of a great project. Jump into the fire to lead the way out.",
    season: 7,
    xp: 100,
    achievementId: "conflict-resolver"
  }
];
