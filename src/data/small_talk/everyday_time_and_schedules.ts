import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const timeAndSchedules: Script = {
  id: "everyday-time-and-schedules",
  title: "Running Late",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish: "Excuses for lateness, time zone math, and the 'Hard Stop'.",
  imageUrl: "/images/scenarios/running_late_sprint_3d.png",
  mode: "cloze",

  culturalInsights: {
    title: "The 'Hard Stop'",
    content: "If you want to leave a meeting on time, announce a 'Hard Stop' at the start. 'I have a hard stop at 3 PM'. It creates a social contract that ANYONE can leave at 3 PM without being rude."
  },

  quizItems: [
    {
      question: "You are going to be 10 minutes late. You text:",
      options: [
        "Nothing. Hope they don't notice.",
        "Traffic is crazy! (Lie)",
        "Running 10 mins behind, please start without me!",
        "Cancel everything."
      ],
      correctIndex: 2,
      explanation: "Giving permission to 'start without me' releases the pressure on everyone waiting."
    },
    {
      question: "You need to reschedule a meeting. You say:",
      options: [
        "I don't want to meet today.",
        "Something came up. Can we push to tomorrow?",
        "I quit.",
        "Ghost them."
      ],
      correctIndex: 1,
      explanation: "'Something came up' is the universal vague excuse for 'I am busy or tired'."
    },
    {
      question: "You want to leave a meeting exactly at 5 PM. You say at the start:",
      options: [
        "I am leaving at 5.",
        "Just a heads-up, I have a hard stop at 5 sharp.",
        "Please hurry up.",
        "Don't talk too much."
      ],
      correctIndex: 1,
      explanation: "'Hard stop' creates a social contract that allows you to leave without being rude."
    }
  ],

  sentences: [
    {
      id: "s1",
      en: "The Late Arrival",
      scenario: "Joining a meeting late",
      keywords: [
        { word: "Held up", definition: "Delayed" },
        { word: "Ran over", definition: "Went too long" }
      ],
      badResponse: {
          text: "I overslept.",
          why: "Unprofessional."
      },
      goodResponse: {
          text: "So sorry I'm late! My last meeting [ran over] and I got [held up].",
          why: "Blaming the previous meeting is the standard corporate excuse."
      }
    },
    {
      id: "s2",
      en: "The Hard Stop",
      scenario: "Setting boundaries on time",
      keywords: [
        { word: "Hard stop", definition: "Must leave time" },
        { word: "Sharp", definition: "Exactly" }
      ],
      goodResponse: {
          text: "Just a heads-up, I have a [hard stop] at 3:00 [sharp] today.",
          why: "Sets expectation immediately."
      }
    },
    {
      id: "s3",
      en: "The Reschedule",
      scenario: "Cancelling plans",
      keywords: [
        { word: "Push", definition: "Move time" },
        { word: "Crazy", definition: "Busy" }
      ],
      badResponse: {
          text: "No.",
          why: "Rude."
      },
      goodResponse: {
          text: "My day has gone totally [crazy]. Can we [push] our chat to tomorrow?",
          why: "'Push' sounds softer than 'Cancel' or 'Reschedule'."
      }
    },
    {
      id: "s4",
      en: "The Time Zone Math",
      scenario: "Scheduling with different regions",
      keywords: [
        { word: "EST", definition: "Eastern Time" },
        { word: "Pacific", definition: "West Coast Time" }
      ],
      goodResponse: {
          text: "Wait, is that 2 PM your time or my time? I always mess up the [EST] to [Pacific] conversion.",
          why: "Humble admission avoids missed meetings."
      }
    },
    {
      id: "s5",
      en: "The 'Wrap It Up' Signal",
      scenario: "Meeting is dragging on",
      keywords: [
        { word: "Conscious", definition: "Aware" },
        { word: "Time", definition: "Clock" }
      ],
      goodResponse: {
          text: "I want to be [conscious] of everyone's [time]—should we wrap up?",
          why: "You look like a hero for saving everyone from a long meeting."
      }
    }
  ]
};
