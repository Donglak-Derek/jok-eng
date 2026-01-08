import { Script } from "@/types";

export const interviewIntro: Script = {
  id: "interview-intro",
  title: "Ace the Intro: 'Tell Me About Yourself'",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "Master the 2-minute elevator pitch of your career.",
    imageUrl: "/images/scenarios/networking_coffee.png",
  sentences: [
    {
      id: "intro-1",
      en: "The 'Past, Present, Future' Formula",
      keywords: [
        { word: "Formula", definition: "A method or procedure" },
        { word: "Structure", definition: "The arrangement of parts" }
      ],
      scenario: "The interviewer asks the classic opening question.",
      badResponse: {
        text: "Well, I was born in Ohio, and then I went to school...",
        why: "Don't start with your biography. It's too long and irrelevant."
      },
      goodResponse: {
        text: "I've been a marketing manager for 5 years, focused on digital growth. Recently, I led a project that doubled our traffic. Now, I'm looking to bring those skills to a larger team like yours.",
        why: "Connects your history directly to why you are here now."
      }
    },
    {
      id: "intro-2",
      en: "Highlighting Achievements, Not Duties",
      keywords: [
        { word: "Impact", definition: "A marked effect or influence" },
        { word: "Metric", definition: "A standard of measurement" }
      ],
      scenario: "Describing your current role.",
      badResponse: {
        text: "I am responsible for emailing clients and managing the calendar.",
        why: "This describes duties anyone could do. It's boring."
      },
      goodResponse: {
        text: "In my current role, I streamlined our client communication, which reduced response times by 40%.",
        why: "Focuses on the *impact* you made, using numbers."
      }
    },
    {
      id: "intro-3",
      en: "The 'Why Us?' transition",
      keywords: [
        { word: "Pivot", definition: "To change direction securely" },
        { word: "Align", definition: "To give support to" }
      ],
      scenario: "Ending your introduction.",
      badResponse: {
        text: "So yeah, that's me. I need a new job.",
        why: "Ends on a low, needy note."
      },
      goodResponse: {
        text: "That experience led me here. I admire your company's commitment to innovation, and I see a perfect alignment with my background in product dev.",
        why: "Pivots the focus back to *them* and why you fit."
      }
    },
    {
      id: "intro-4",
      en: "Handling the 'gap' (if you have one)",
      keywords: [
        { word: "Sabbatical", definition: "A period of leave for rest/study" },
        { word: "Upskill", definition: "To learn new skills" }
      ],
      scenario: "You took a year off.",
      badResponse: {
        text: "I didn't do much last year. Just chilled.",
        why: "Sounds lazy or unmotivated."
      },
      goodResponse: {
        text: "I took a purposeful career break to upskill in Python and travel, which refreshed my perspective and readiness for this challenge.",
        why: "Frames the time off as productive and intentional."
      }
    },
    {
      id: "intro-5",
      en: "Keep it concise (The 2-minute rule)",
      keywords: [
        { word: "Concise", definition: "Giving a lot of info clearly and briefly" },
        { word: "Ramble", definition: "To talk at length continuously" }
      ],
      scenario: "You realize you've been talking for 5 minutes.",
      badResponse: {
        text: "...and then in 2018 I moved to... oh wait, let me go back to 2017...",
        why: "You lost their attention 3 minutes ago."
      },
      goodResponse: {
        text: "That's a high-level overview of my background. I'm happy to dive deeper into any of those roles if you'd like.",
        why: "Checks in with the interviewer and respects their time."
      }
    }
  ]
};
