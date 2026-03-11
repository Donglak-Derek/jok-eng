import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const videoDiagnosticGreeting: Script = {
    id: "video_diagnostic_greeting",
    title: "The Diagnostic Greeting",
    categorySlug: "american_culture",
    categoryName: "American Culture",
    cleanedEnglish: "How to handle the common 'How are you?' trap effectively.",
    imageUrl: "/images/scenarios/greetings_introvert_3d.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Changed to standard watch URL
    mode: "cloze",
    quizItems: [
        {
            id: "q1",
            question: "When the cashier asks 'How are you?', they are expecting you to...",
            options: [
                "Give a detailed account of your day",
                "Explain your current medical problems",
                "Give a short, positive response like 'Good, how are you?'",
                "Ignore them completely"
            ],
            correctIndex: 2,
            explanation: "In American culture, 'How are you?' from a stranger is just a greeting, not a literal question about your well-being."
        }
    ],
    segments: [
        {
            step: "1",
            text: "The Social Ping",
            note: "Greeting an acquaintance: Matches the social expectation perfectly.",
            keywords: [
                { word: "Good", definition: "Fine/Okay" },
                { word: "Yourself", definition: "And you?" }
            ]
        }
    ]
};

export const videoCelestialGreeting: Script = {
    id: "video_celestial_greeting",
    title: "The Celestial Greeting",
    categorySlug: "american_culture",
    categoryName: "American Culture",
    cleanedEnglish: "Mastering the 'What's up?' response.",
    imageUrl: "/images/scenarios/greetings_introvert_3d.png",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw", // Placeholder
    mode: "cloze",
    quizItems: [
        {
            id: "vcgq1",
            question: "When someone asks 'What's up?', you should typically reply with...",
            options: [
                "Everything that happened to you today",
                "'Not much, you?'",
                "Look up at the ceiling",
                "Explain your life goals"
            ],
            correctIndex: 1,
            explanation: "It's just a casual greeting, not a literal question about direction."
        }
    ],
    segments: [
        {
            step: "1",
            text: "The Sky Trap",
            note: "Responding to 'What's up?': Standard, relaxed response.",
            keywords: [
                { word: "Much", definition: "A lot" },
                { word: "Chilling", definition: "Relaxing" }
            ]
        }
    ]
};

export const videoTexasSurvival: Script = {
    id: "video_texas_survival",
    title: "Texas Small Talk",
    categorySlug: "american_culture",
    categoryName: "American Culture",
    cleanedEnglish: "Survival phrases for the Lone Star State.",
    imageUrl: "/images/scenarios/greetings_introvert_3d.png",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0", // Placeholder
    mode: "cloze",
    quizItems: [
        {
            id: "vtsq1",
            question: "What is the appropriate response to 'Howdy' in Texas?",
            options: [
                "Hello there, partner",
                "Good day to you",
                "Howdy, how y'all doing?",
                "I am fine, thank you"
            ],
            correctIndex: 2,
            explanation: "Returning the 'Howdy' and acknowledging the group with 'y'all' is a sign of respect."
        }
    ],
    segments: [
        {
            step: "1",
            text: "The Howdy Habit",
            note: "Meeting a local in Texas: Instant local points for using 'y'all' correctly.",
            keywords: [
                { word: "Howdy", definition: "Hello" },
                { word: "Doing", definition: "How are things" }
            ]
        }
    ]
};

export const videoScenarios = [
    videoDiagnosticGreeting,
    videoCelestialGreeting,
    videoTexasSurvival
];
