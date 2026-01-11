import { Script } from "@/types";

export const interviewIntro: Script = {
  id: "interview-intro",
  title: "Ace the Intro: 'Tell Me About Yourself'",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Master the 2-minute elevator pitch of your career.",
    imageUrl: "/images/scenarios/coffee_crisis.png",
  // Engagement
  culturalNote: {
    title: "The 'Elevator Pitch' Culture",
    content: "In Western business culture, you are expected to 'sell yourself' in 60 seconds or less. This isn't bragging; it's considered efficient communication. The 'Tell me about yourself' question is not an invitation for your life story—it's a test of whether you can summarize your professional value quickly."
  },
  quizItems: [
    {
      question: "What is the best structure for your introduction?",
      options: ["Past, Present, Future", "Childhood, College, Now", "Future goals only", "A list of your hobbies"],
      correctIndex: 0,
      explanation: "Start with your background (Past), explain your current role (Present), and pivot to what you want next (Future)."
    },
    {
      question: "Why should you avoid listing every duty you've ever had?",
      options: ["It makes you look too busy", "It's boring and generic", "The interviewer already knows", "It scares them"],
      correctIndex: 1,
      explanation: "Recruiters care about *achievements* (what you improved), not just a list of tasks that anyone could do."
    },
    {
      question: "How long should your answer be?",
      options: ["10 seconds", "2 minutes max", "5 minutes", "As long as it takes"],
      correctIndex: 1,
      explanation: "Two minutes is the 'sweet spot'. Anything longer risks losing their attention; anything shorter might lack detail."
    }
  ],

  sentences: [
    {
      id: "intro-1a",
      en: "The Past (Your Background)", // Fallback title
      keywords: [
        { word: "Foundation", definition: "Start with your title" }
      ],
      scenario: "Step 1: The Past (Start Strong)",
      badResponse: {
          text: "Well, I was born in Ohio, and then I went to school...",
          why: "Too far back. Start with your current professional title."
      },
      goodResponse: {
          text: "I've been a [marketing manager] for 5 years focused on [digital growth].",
          why: "Establishes immediately who you are and what you do."
      }
    },
    {
      id: "intro-1b",
      en: "The Present (Your Achievement)",
      keywords: [
        { word: "Impact", definition: "Prove it with numbers" }
      ],
      scenario: "Step 2: The Present (Prove It)",
      badResponse: {
          text: "I am responsible for emailing clients.",
          why: "Lists duties. Boring."
      },
      goodResponse: {
          text: "Recently, I led a project that [doubled our traffic] in six months.",
          why: "Highlights a specific, measurable win."
      }
    },
    {
      id: "intro-1c",
      en: "The Future (The Pivot)",
      keywords: [
        { word: "Pivot", definition: "Connect it to this job" }
      ],
      scenario: "Step 3: The Future (Connect It)",
      badResponse: {
          text: "So yeah, I need to get out of my current place.",
          why: "Negative and needy."
      },
      goodResponse: {
          text: "Now, I'm looking to bring those skills to a [larger team] like yours.",
          why: "Shows you want *this* job, not just *any* job."
      }
    },
    {
      id: "intro-2",
      en: "Highlighting Achievements",
      keywords: [
        { word: "Impact", definition: "A marked effect or influence" },
        { word: "Metric", definition: "A standard of measurement" }
      ],
      scenario: "Describing your current role",
      badResponse: {
          text: "I handle the calendar and emails.",
          why: "Describes tasks anyone can do."
      },
      goodResponse: {
          text: "I streamlined [client communication], which reduced [response times] by 40%.",
          why: "Focuses on the *impact* you made."
      }
    },
    {
      id: "intro-3",
      en: "The 'Why Us?' Transition",
      keywords: [
        { word: "Pivot", definition: "To change direction securely" },
        { word: "Align", definition: "To give support to" }
      ],
      scenario: "Ending your introduction",
      badResponse: {
          text: "So yeah, that's me. I need a new job.",
          why: "Ends on a low, needy note."
      },
      goodResponse: {
          text: "I admire your company's [commitment to innovation], and I see a perfect [alignment] with my background.",
          why: "Pivots the focus back to *them*."
      }
    },
    {
      id: "intro-4",
      en: "Handling Gaps",
      keywords: [
        { word: "Sabbatical", definition: "A period of leave for rest/study" },
        { word: "Upskill", definition: "To learn new skills" }
      ],
      scenario: "Explaining a gap year",
      badResponse: {
          text: "I didn't do much last year. Just chilled.",
          why: "Sounds lazy or unmotivated."
      },
      goodResponse: {
          text: "I took a [purposeful break] to upskill in Python, which [refreshed my perspective] for this role.",
          why: "Frames the time off as productive."
      }
    },
    {
      id: "intro-5",
      en: "Closing the Opener",
      keywords: [
        { word: "Concise", definition: "Giving a lot of info clearly and briefly" },
        { word: "Ramble", definition: "To talk at length continuously" }
      ],
      scenario: "Stopping before you ramble",
      badResponse: {
          text: "...and then in 2018 I moved to... oh wait...",
          why: "You lost their attention 3 minutes ago."
      },
      goodResponse: {
          text: "That's a [high-level overview]. I'm happy to [dive deeper] into any of those roles.",
          why: "Checks in with the interviewer."
      }
    }
  ]
};
