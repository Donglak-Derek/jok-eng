import { Mission } from "@/types";

export const season8Missions: Mission[] = [
  {
    day: 71,
    phase: 3,
    module: "Personal Branding",
    title: "The Elevator Pitch",
    imageUrl: "/images/missions/day71.png",
    image_description: "3D clay style, inside a sleek elevator with glass doors. You are standing next to a Senior VP who just asked “So, what are you working on?”",
    strategic_brief: "The 30-Second ROI. An executive doesn’t want a status report; they want to know the ‘Impact’ you are creating for the business.",
    cloze_setup: "My [**] should focus on the [**] I [**], not the [**] I [**].",
    cloze_keywords: ["pitch", "provide", "perform"],
    scenario_text: "The VP smiles: “I’ve heard your name in a few meetings. What’s your focus lately?”",
    options: [
      {
        id: "A",
        text: "I’m mostly just fixing bugs in the CSS and updating some Figma files.",
        vibe_score: 35,
        feedback: "Too small. You sound like a ‘Worker,’ not a ‘Partner.’ Use higher-level language.",
        allow_retry: true
      },
      {
        id: "B",
        text: "I’m leading the UI overhaul to improve our conversion rates. We’re already seeing a 10% lift in the pilot.",
        vibe_score: 98,
        feedback: "Perfect! You linked your work to a business metric (Conversion) and showed leadership.",
        allow_retry: false
      }
    ],
    x_ray: "Executives think in ‘Numbers’ and ‘Growth.’ If you talk their language, they remember your name.",
    season: 8,
    xp: 100
  },
  {
    day: 72,
    phase: 3,
    module: "Personal Branding",
    title: "The Strategic ‘Humble-Brag’",
    imageUrl: "/images/missions/day72.png",
    image_description: "3D clay style, a LinkedIn post on a smartphone screen. It has a photo of you receiving a small internal award. You are writing the caption.",
    strategic_brief: "Visibility is Credibility. Sharing wins in the US isn’t ‘Arrogance’—it’s ‘Career Documentation.’",
    cloze_setup: "I should share [**] to build [**] with people outside my [**].",
    cloze_keywords: ["build rapport", "immediate team"],
    scenario_text: "You just won ‘Employee of the Month.’ How do you share it on the company Slack?",
    options: [
      {
        id: "A",
        text: "Say nothing. If I’m good, people will eventually find out.",
        vibe_score: 20,
        feedback: "Wrong. Silence in the US is often invisible. Nobody has time to hunt for your achievements.",
        allow_retry: true
      },
      {
        id: "B",
        text: "So honored to win this! Huge thanks to the team for supporting the new design system launch. We’re just getting started!",
        vibe_score: 95,
        feedback: "Excellent. You shared the win but redirected the praise to the ‘Team’ and the ‘Project.’",
        allow_retry: false
      }
    ],
    x_ray: "The ‘Humble-Brag’ formula: [Achievement] + [Gratitude for Team] + [Future Goal].",
    season: 8,
    xp: 100
  },
  {
    day: 73,
    phase: 3,
    module: "Personal Branding",
    title: "The Event Exit Strategy",
    imageUrl: "/images/missions/day73.png",
    image_description: "3D clay style, a networking mixer with people holding wine glasses. You are talking to someone, but the conversation is dead and you want to meet someone else.",
    strategic_brief: "Protecting Your Time. Power Players know how to end a conversation without being rude so they can keep networking.",
    cloze_setup: "Ending a [**] [**] [**] for both [**].",
    cloze_keywords: ["is a sign of", "people's time"],
    scenario_text: "You’ve been talking to a vendor for 10 minutes. How do you leave?",
    options: [
      {
        id: "A",
        text: "It was great meeting you! I’m going to go make a few more rounds, but let’s connect on LinkedIn.",
        vibe_score: 95,
        feedback: "Polite and professional. You gave a clear reason and a ‘Next Step’ (LinkedIn).",
        allow_retry: false
      },
      {
        id: "B",
        text: "I have to go to the bathroom now. Bye.",
        vibe_score: 30,
        feedback: "Childish. Everyone knows you’re just running away. Use the ‘Making Rounds’ excuse instead.",
        allow_retry: true
      }
    ],
    x_ray: "In the US, ‘Making the rounds’ is a standard networking phrase that implies you are a busy, in-demand professional.",
    season: 8,
    xp: 100
  },
  {
    day: 74,
    phase: 3,
    module: "Personal Branding",
    title: "The Internal Interview Vibe",
    imageUrl: "/images/missions/day74.png",
    image_description: "3D clay style, a formal office setting. You are sitting across from a manager from a DIFFERENT department. You want to transfer to their team.",
    strategic_brief: "Cultural Translation. You aren’t just a ‘worker’; you are a ‘Solution.’ Match your skills to their specific pain points.",
    cloze_setup: "I must translate my [**] into their [**].",
    cloze_keywords: ["lost in translation", "nuance"],
    scenario_text: "The Manager asks: “Why should I bring you onto the Product team?”",
    options: [
      {
        id: "A",
        text: "I’m a very hard worker and I always do what I’m told.",
        vibe_score: 40,
        feedback: "Too passive. They want a ‘Leader’ and a ‘Thinker,’ not just a ‘Doer.’",
        allow_retry: true
      },
      {
        id: "B",
        text: "I’ve seen how the dev team struggles with design handoffs. I want to use my UI/UX background to bridge that gap and speed up our shipping.",
        vibe_score: 98,
        feedback: "Perfect. You identified a ‘Problem’ (Handoffs) and offered yourself as the ‘Bridge.’",
        allow_retry: false
      }
    ],
    x_ray: "Internal mobility in the US is about ‘Internal Marketing.’ Show them how you make their life easier.",
    season: 8,
    xp: 100
  },
  {
    day: 75,
    phase: 3,
    module: "Personal Branding",
    title: "The ‘Stay Top of Mind’ Follow-up",
    imageUrl: "/images/missions/day75.png",
    image_description: "3D clay style, a laptop screen with a drafted email to a mentor you haven’t talked to in 3 months.",
    strategic_brief: "Low-Pressure Nurturing. Networking is a long game. A 2-sentence ‘Hello’ keeps the door open.",
    cloze_setup: "Follow-ups should be [**] and [**]-free.",
    cloze_keywords: ["concise", "hassle-free"],
    scenario_text: "What do you write to a mentor just to say hello?",
    options: [
      {
        id: "A",
        text: "Hey! Just wanted to share that I used your advice on [Project] and it worked! Hope you’re doing well.",
        vibe_score: 95,
        feedback: "Perfect. You gave them a ‘Win’ based on their advice. Mentors love feeling helpful.",
        allow_retry: false
      },
      {
        id: "B",
        text: "Hi, do you have any job openings for me yet? I am still waiting.",
        vibe_score: 10,
        feedback: "Desperate and transactional. You just burned a bridge. Never ask for a favor in every email.",
        allow_retry: true
      }
    ],
    x_ray: "The best time to network is when you DON’T need a job. It builds a foundation of genuine trust.",
    season: 8,
    xp: 100
  },
  {
    day: 76,
    phase: 3,
    module: "Personal Branding",
    title: "Public Speaking ‘Vibe’",
    imageUrl: "/images/missions/day76.png",
    image_description: "3D clay style, standing behind a podium in a small hall. People are looking at you. You are about to present.",
    strategic_brief: "The Enthusiasm Gap. In the US, if you aren’t ‘Excited’ about your topic, the audience will be ‘Bored.’",
    cloze_setup: "My [**] is more important than my [**] during a [**].",
    cloze_keywords: ["delivery", "talk"],
    scenario_text: "How do you start your presentation?",
    options: [
      {
        id: "A",
        text: "Hi. My name is Han. Today I will talk about user research. (Monotone voice).",
        vibe_score: 30,
        feedback: "Too dry. You’ve already lost the room. Use a ‘Hook.’",
        allow_retry: true
      },
      {
        id: "B",
        text: "I’m so excited to share what we found! We talked to 50 users, and what they said surprised us...",
        vibe_score: 95,
        feedback: "Great! ‘Excited’ and ‘Surprised’ are high-vibe words that grab attention.",
        allow_retry: false
      }
    ],
    x_ray: "American audiences crave ‘Engagement.’ Even if you are nervous, fake the energy until you feel it.",
    season: 8,
    xp: 100
  },
  {
    day: 77,
    phase: 3,
    module: "Personal Branding",
    title: "The Power Introduction",
    imageUrl: "/images/missions/day77.png",
    image_description: "3D clay style, you are introducing two people at a conference. One is a high-level CEO, the other is your talented friend.",
    strategic_brief: "The ‘Context’ Gift. Don’t just give names; give them a reason to talk to each other.",
    cloze_setup: "A good intro provides a [**] between two [**].",
    cloze_keywords: ["Bridge", "Interests"],
    scenario_text: "How do you introduce your friend to the CEO?",
    options: [
      {
        id: "A",
        text: "CEO, this is my friend Min. Min, this is the CEO.",
        vibe_score: 40,
        feedback: "Lazy. Now they have to do the hard work of finding a topic. Help them!",
        allow_retry: true
      },
      {
        id: "B",
        text: "Sarah, I’d like you to meet Min. He’s the one who built that AI tool I was telling you about.",
        vibe_score: 98,
        feedback: "Masterful. You gave them a ‘Conversation Hook’ immediately. You are a ‘Connector.’",
        allow_retry: false
      }
    ],
    x_ray: "Being a ‘Connector’ is a high-status role. When you help others network, you increase your own value.",
    season: 8,
    xp: 100
  },
  {
    day: 78,
    phase: 3,
    module: "Personal Branding",
    title: "The Thought Leader Comment",
    imageUrl: "/images/missions/day78.png",
    image_description: "3D clay style, a tablet screen showing a post by a famous industry leader. You want to leave a comment that gets noticed.",
    strategic_brief: "Insight over Flattery. Don’t just say ‘Great post.’ Add a perspective that shows you are a peer.",
    cloze_setup: "I should add [**] to the [**] [**] [**].",
    cloze_keywords: ["rather than", "just agreeing"],
    scenario_text: "An industry leader posts about the future of UI. What is your comment?",
    options: [
      {
        id: "A",
        text: "Great post! Thanks for sharing!",
        vibe_score: 50,
        feedback: "Generic. Nobody will click your profile after reading this.",
        allow_retry: true
      },
      {
        id: "B",
        text: "Really interesting point on [X]. I’ve seen that in my own work at [Company], specifically when we tried [Y].",
        vibe_score: 95,
        feedback: "Excellent. You showed you are ‘In the trenches’ doing real work.",
        allow_retry: false
      }
    ],
    x_ray: "Social media for professionals is about ‘Proof of Work.’ Every comment is a tiny resume.",
    season: 8,
    xp: 100
  },
  {
    day: 79,
    phase: 3,
    module: "Personal Branding",
    title: "Asking for Mentorship",
    imageUrl: "/images/missions/day79.png",
    image_description: "3D clay style, sitting in a coffee shop with a senior professional you admire. You want them to be your official mentor.",
    strategic_brief: "The Specific Ask. Don’t ask ‘Will you be my mentor?’ (Too heavy). Ask for ‘Time’ on a ‘Topic.’",
    cloze_setup: "[**] should start with a [**] [**] for [**].",
    cloze_keywords: ["Mentorship", "request"],
    scenario_text: "How do you ask for their help?",
    options: [
      {
        id: "A",
        text: "Can you please teach me everything you know about being a manager?",
        vibe_score: 30,
        feedback: "Too much pressure. They’ll say no because it sounds like a part-time job.",
        allow_retry: true
      },
      {
        id: "B",
        text: "I really admire how you handle stakeholders. Could I buy you a coffee once a month to get your take on my current projects?",
        vibe_score: 95,
        feedback: "Perfect. You identified their ‘Superpower’ and asked for a small, defined amount of time.",
        allow_retry: false
      }
    ],
    x_ray: "In the US, people love to give advice but they hate to give ‘Commitment.’ Start small and build the habit.",
    season: 8,
    xp: 100
  },
  {
    day: 80,
    phase: 3,
    module: "Personal Branding",
    title: "The High-Stakes Interview",
    imageUrl: "/images/missions/day80.png",
    image_description: "3D clay style, 3 people sitting across a table from you. It’s the final round for your dream job. They ask: “Why should we hire you over the other candidates?”",
    strategic_brief: "The Culture-Fit Closer. At this level, everyone has the skills. They are looking for the ‘Vibe’ and ‘Mission Alignment.’",
    cloze_setup: "I should focus on my [**] and my [**] with the team.",
    cloze_keywords: ["Uniqueness", "Fit"],
    scenario_text: "What is your closing argument?",
    options: [
      {
        id: "A",
        text: "Because I have the most years of experience and I am very loyal.",
        vibe_score: 50,
        feedback: "A bit boring. Loyalty is a ‘given.’ They want a ‘Growth Engine.’",
        allow_retry: true
      },
      {
        id: "B",
        text: "I bring a global perspective to UI that matches your expansion goals. I’m not just here to design; I’m here to help you scale.",
        vibe_score: 98,
        feedback: "BOOM. You just stopped being an ‘Applicant’ and started being a ‘Strategic Asset.’",
        allow_retry: false
      }
    ],
    x_ray: "In the final round, it’s not about ‘Can you do the job?’ it’s ‘Do we want to win with you?’",
    season: 8,
    xp: 100,
    achievementId: "branding-expert"
  }
];
