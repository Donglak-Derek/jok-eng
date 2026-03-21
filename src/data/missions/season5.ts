import { Mission } from "@/types";

export const season5Missions: Mission[] = [
  {
    day: 41,
    phase: 2,
    module: "Decoding Subtext",
    title: "The ‘That’s Interesting’ Trap",
    imageUrl: "/images/missions/day41.png",
    image_description: "3D clay style, a glass-walled conference room. A senior manager with glasses is leaning back, looking at your presentation slide with a neutral expression.",
    strategic_brief: "The Polite Pivot. In the US, ‘Interesting’ is a neutral word used to avoid saying ‘I don’t like this’ or ‘This is weird.’",
    cloze_setup: "I should [**] their [**] before I assume they agree.",
    cloze_keywords: ["gauge", "stance"],
    scenario_text: "You just finished sharing a bold new idea. Your boss says: “Hmm. That’s a very... interesting perspective, Han.”",
    options: [
      {
        id: "A",
        text: "Thanks! I’m glad you find it interesting. Should I start the next phase?",
        vibe_score: 30,
        feedback: "Stop! You missed the ‘Vibe.’ They aren’t convinced. If you move forward now, you’ll look out of touch.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Thanks. Is there a specific part you’d like me to dive deeper into, or any concerns?",
        vibe_score: 95,
        feedback: "Perfect. You recognized the ‘Soft No’ and opened the door for honest feedback.",
        allow_retry: false
      }
    ],
    x_ray: "When an American says ‘Interesting’ without a smile, it usually means ‘I disagree, but I don’t want to hurt your feelings yet.’",
    season: 5,
    xp: 100
  },
  {
    day: 42,
    phase: 2,
    module: "Decoding Subtext",
    title: "Professional Aggression",
    imageUrl: "/images/missions/day42.png",
    image_description: "3D clay style, a smartphone screen showing an email notification. The subject line is ‘RE: Project Update’ and the first line is visible.",
    strategic_brief: "The Email Sword. Phrases like ‘Per my last email’ are the American way of saying ‘You aren’t listening and I’m annoyed.’",
    cloze_setup: "I should [**] the [**] rather than [**].",
    cloze_keywords: ["face the music", "getting defensive"],
    scenario_text: "A teammate emails you: “Per my last email, the deadline was actually yesterday. Do you have the files?”",
    options: [
      {
        id: "A",
        text: "Sorry for the mix-up! I missed that note. Sending them over now.",
        vibe_score: 90,
        feedback: "Good. You de-escalated the ‘Vibe’ by owning the mistake quickly.",
        allow_retry: false
      },
      {
        id: "B",
        text: "You don’t need to be so rude. I am working as fast as I can.",
        vibe_score: 10,
        feedback: "Disaster. You just turned a ‘Work Error’ into a ‘Personal War.’ Stay professional.",
        allow_retry: true
      }
    ],
    x_ray: "‘Per my last email’ is a ‘Yellow Card’ in the office. It means: ‘I’ve already told you this, don’t make me tell you again.’",
    season: 5,
    xp: 100
  },
  {
    day: 43,
    phase: 2,
    module: "Decoding Subtext",
    title: "The ‘Soft’ Deadline",
    imageUrl: "/images/missions/day43.png",
    image_description: "3D clay style, a coworker standing by your desk, holding a laptop. They are looking at you with a casual, relaxed posture.",
    strategic_brief: "The Urgency Mask. Americans hate to sound like ‘Dictators.’ They use soft phrases for hard requirements.",
    cloze_setup: "I should [**] a [**] even if they didn’t give me one.",
    cloze_keywords: ["Confirm", "Time"],
    scenario_text: "A coworker drops a task on your desk: “Hey, could you take a look at this when you have a chance?”",
    options: [
      {
        id: "A",
        text: "Sure! Does this need to be done by EOD (End of Day), or can it wait until tomorrow?",
        vibe_score: 95,
        feedback: "Perfect. You translated ‘When you have a chance’ into a real deadline.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Okay, I will do it next week when I am less busy.",
        vibe_score: 40,
        feedback: "Risky. To them, ‘When you have a chance’ often means ‘Today or Tomorrow.’ Next week is too late.",
        allow_retry: true
      }
    ],
    x_ray: "In the US, ‘When you have a chance’ is a test of your ‘Proactiveness.’ It’s an invitation to show you prioritize their work.",
    season: 5,
    xp: 100
  },
  {
    day: 44,
    phase: 2,
    module: "Decoding Subtext",
    title: "The Feedback Sandwich",
    imageUrl: "/images/missions/day44.png",
    image_description: "3D clay style, a one-on-one meeting with a manager. They are smiling and nodding, but they have a list of ‘Notes’ on their iPad.",
    strategic_brief: "The ‘But’ Pivot. Americans wrap criticism in two layers of praise. You must listen for the ‘Middle’ layer.",
    cloze_setup: "The [**] is [**] found [**] the word [**].",
    cloze_keywords: ["usually", "right after"],
    scenario_text: "Your manager says: “You’ve been doing great work on the design, BUT I’d like to see you participate more in meetings. Otherwise, keep it up!”",
    options: [
      {
        id: "A",
        text: "Focus on: ‘They said I’m doing great work! I don’t need to change anything.’",
        vibe_score: 30,
        feedback: "Wrong. You missed the meat of the sandwich. The ‘participation’ part is what they actually care about.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Focus on: ‘I need to speak up more in meetings. How can I do that better?’",
        vibe_score: 95,
        feedback: "Yes! You ignored the ‘Bread’ and found the ‘Meat.’ You are growing.",
        allow_retry: false
      }
    ],
    x_ray: "The ‘Bread’ (Praise) is to keep you happy. The ‘Meat’ (Criticism) is what gets you promoted.",
    season: 5,
    xp: 100
  },
  {
    day: 45,
    phase: 2,
    module: "Decoding Subtext",
    title: "The ‘Swing’ Logic",
    imageUrl: "/images/missions/day45.png",
    image_description: "3D clay style, a manager walking past your office door. They pause for a split second and point toward their office.",
    strategic_brief: "The Unscheduled Sync. ‘Swing by my office later’ is a polite way of saying ‘We need to talk privately.’",
    cloze_setup: "A ‘[**]’ is usually [**], but I should [**] it seriously.",
    cloze_keywords: ["Swing By", "take it seriously"],
    scenario_text: "Your boss says: “Hey Han, swing by my office before you head out today.”",
    options: [
      {
        id: "A",
        text: "Go there immediately with your notebook and a positive attitude.",
        vibe_score: 95,
        feedback: "Perfect. Treating ‘Informal’ requests with ‘Formal’ preparation shows you are a Power Player.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Wait until you’re walking to your car and just poke your head in: ‘You wanted me?’",
        vibe_score: 40,
        feedback: "Too casual. If they asked to see you ‘Before you head out,’ they likely have something specific to discuss.",
        allow_retry: true
      }
    ],
    x_ray: "In the US, ‘Swing by’ is a way to lower the pressure of a meeting, but the content of the meeting is still important.",
    season: 5,
    xp: 100
  },
  {
    day: 46,
    phase: 2,
    module: "Decoding Subtext",
    title: "The ‘I Hear You’ Signal",
    imageUrl: "/images/missions/day46.png",
    image_description: "3D clay style, two coworkers in a debate. One has their arms crossed but is nodding slowly while the other person talks.",
    strategic_brief: "Acknowledgment vs. Agreement. Americans will often ‘Validate’ your feelings as a way to say ‘I’m done listening to your argument.’",
    cloze_setup: "‘[**]’ means they [**] my words, [**] my [**].",
    cloze_keywords: ["I hear you", "not necessarily"],
    scenario_text: "You are arguing for a change. Your coworker says: “I hear what you’re saying, Han. Let’s move on to the next topic.”",
    options: [
      {
        id: "A",
        text: "Keep arguing because they said they ‘Hear’ you, so you think you’re winning.",
        vibe_score: 20,
        feedback: "Stop! They just ‘Hard-Closed’ the conversation. Pushing further will make you look ‘Difficult.’",
        allow_retry: true
      },
      {
        id: "B",
        text: "Stop, nod, and move on. Re-approach later with more data.",
        vibe_score: 95,
        feedback: "Perfect. You recognized the ‘Social Red Light.’ Save your energy for a better time.",
        allow_retry: false
      }
    ],
    x_ray: "In the US, ‘I hear you’ is the ‘Esc’ key on the keyboard. It ends the current process gracefully.",
    season: 5,
    xp: 100
  },
  {
    day: 47,
    phase: 2,
    module: "Decoding Subtext",
    title: "The ‘Loop In’ Meaning",
    imageUrl: "/images/missions/day47.png",
    image_description: "3D clay style, a group of coworkers in a huddle. One person is pointing to another person who isn’t there.",
    strategic_brief: "The Inclusion Test. ‘Looping someone in’ is about visibility and political safety, not just sharing info.",
    cloze_setup: "[**] people in is about [**] and [**].",
    cloze_keywords: ["engaging people in", "building relationships", "transparency"],
    scenario_text: "Your boss says: “Make sure you loop Sarah in on that email thread.”",
    options: [
      {
        id: "A",
        text: "Copy Sarah on the email and add a quick note: ‘Sarah, looping you in for visibility.’",
        vibe_score: 95,
        feedback: "Perfect. You followed the ‘Political Map’ of the office. Sarah feels respected.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Just forward the final result to Sarah at the end of the week.",
        vibe_score: 40,
        feedback: "Wrong. Your boss wanted Sarah to see the *process*, not just the result. You’ve now made Sarah feel ‘Left out.’",
        allow_retry: true
      }
    ],
    x_ray: "In America, ‘Visibility’ is currency. Looping someone in is like giving them a seat at the table.",
    season: 5,
    xp: 100
  },
  {
    day: 48,
    phase: 2,
    module: "Decoding Subtext",
    title: "The Weekend ‘Safe’ Talk",
    imageUrl: "/images/missions/day48.png",
    image_description: "3D clay style, Monday morning in the office. People are standing by their desks with coffee, chatting casually.",
    strategic_brief: "The ‘Normalcy’ Check. Americans use ‘How was your weekend?’ to see if you are a relatable human, not to hear your secrets.",
    cloze_setup: "I should share a [**] detail that shows I have a [**] [**].",
    cloze_keywords: ["outside of work", "share a detail"],
    scenario_text: "A coworker asks: “Hey Han! Do anything fun this weekend?”",
    options: [
      {
        id: "A",
        text: "Not much, just caught up on some sleep and went to the park. How about you?",
        vibe_score: 95,
        feedback: "Perfect. It’s ‘Relatable’ and ‘Safe.’ It keeps the ‘Vibe’ friendly and professional.",
        allow_retry: false
      },
      {
        id: "B",
        text: "I had a very deep philosophical realization about my purpose in life.",
        vibe_score: 30,
        feedback: "Too heavy! Monday morning is for ‘Small Talk,’ not ‘Soul Talk.’ You’ve made them uncomfortable.",
        allow_retry: true
      }
    ],
    x_ray: "The ‘Weekend Update’ is a social glue. It proves you aren’t just a work-robot.",
    season: 5,
    xp: 100
  },
  {
    day: 49,
    phase: 2,
    module: "Decoding Subtext",
    title: "The False Invitation",
    imageUrl: "/images/missions/day49.png",
    image_description: "3D clay style, two coworkers walking toward the exit. One turns back and waves casually.",
    strategic_brief: "The Future ‘Maybe.’ Phrases like ‘We should grab lunch sometime’ are often social decorations, not actual plans.",
    cloze_setup: "‘[**]’ [**] means ‘[**]’ [**] I [**] it.",
    cloze_keywords: ["Sometime", "unless", "usually"],
    scenario_text: "A coworker says: “Hey, we should grab lunch sometime and talk about that project!”",
    options: [
      {
        id: "A",
        text: "Awesome! I’ll send you a calendar invite for Thursday.",
        vibe_score: 85,
        feedback: "Good. You are ‘Calling their bluff’ in a professional way. If they say no, you’ll know they weren’t serious.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Wait at your desk every day for them to come ask you for lunch.",
        vibe_score: 20,
        feedback: "You’ll be waiting forever. They’ve likely already forgotten they said it.",
        allow_retry: true
      }
    ],
    x_ray: "In the US, ‘Sometime’ is a way to end a conversation on a ‘High Note.’ It is a ‘Vibe,’ not a ‘Commitment.’",
    season: 5,
    xp: 100
  },
  {
    day: 50,
    phase: 2,
    module: "Decoding Subtext",
    title: "The Annual Review Hyperbole",
    imageUrl: "/images/missions/day50.png",
    image_description: "3D clay style, an iPad screen showing a self-evaluation form with sliders and text boxes. A hand is holding a stylus.",
    strategic_brief: "The ‘Bragging’ Requirement. In the US, being ‘Humble’ during a review is actually a career mistake.",
    cloze_setup: "I should [**] my [**] because my boss [**] [**].",
    cloze_keywords: ["achievements", "showcase", "expects me to"],
    scenario_text: "The form asks: “Rate your performance this year from 1 to 5.” You feel like you did a solid, good job.",
    options: [
      {
        id: "A",
        text: "Choose ‘4’ and list 3 specific wins. Say: ‘I’ve really grown in [X] and [Y].’",
        vibe_score: 95,
        feedback: "Perfect. In America, if you don’t ‘Market’ yourself, no one else will. A ‘4’ is the ‘Honest Pro’ score.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Choose ‘3’ because you don’t want to sound arrogant.",
        vibe_score: 40,
        feedback: "Wrong. A ‘3’ in an American review often means ‘Average’ or ‘Replaceable.’ Don’t undersell yourself.",
        allow_retry: true
      }
    ],
    x_ray: "The Annual Review is a ‘Sales Pitch’ where YOU are the product. If you don’t believe in the product, why should they?",
    season: 5,
    xp: 100,
    achievementId: "subtext-expert"
  }
];
