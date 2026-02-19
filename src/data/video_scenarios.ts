import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const videoDiagnosticGreeting: Script = {
    id: "video_diagnostic_greeting",
    title: "The Diagnostic Greeting",
    categorySlug: "small_talk",
    categoryName: CATEGORY_NAMES["small_talk"],
    cleanedEnglish: "How to handle the common 'How are you?' trap effectively.",
    imageUrl: "/images/scenarios/greetings_introvert_3d.png",
    mode: "cloze",
    culturalInsights: {
        title: "Diagnostic vs. Social",
        content: "When someone says 'How are you?', they aren't asking for a medical diagnosis. It's a social ping. If you give a long answer, you're breaking the protocol!"
    },
    sentences: [
        {
            id: "vdg1",
            en: "The Social Ping",
            scenario: "Greeting an acquaintance",
            keywords: [
                { word: "Good", definition: "Fine/Okay" },
                { word: "Yourself", definition: "And you?" }
            ],
            goodResponse: {
                text: "I'm [good], thanks! How about [yourself]?",
                why: "Matches the social expectation perfectly."
            }
        }
    ]
};

export const videoCelestialGreeting: Script = {
    id: "video_celestial_greeting",
    title: "The Celestial Greeting",
    categorySlug: "small_talk",
    categoryName: CATEGORY_NAMES["small_talk"],
    cleanedEnglish: "Mastering the 'What's up?' response.",
    imageUrl: "/images/scenarios/greetings_introvert_3d.png",
    mode: "cloze",
    culturalInsights: {
        title: "What's Up?",
        content: "This is often just a synonym for 'Hello'. You don't actually need to report anything that is happening 'up'."
    },
    sentences: [
        {
            id: "vcg1",
            en: "The Sky Trap",
            scenario: "Responding to 'What's up?'",
            keywords: [
                { word: "Much", definition: "A lot" },
                { word: "Chilling", definition: "Relaxing" }
            ],
            goodResponse: {
                text: "Not [much], just [chilling]. What's up with you?",
                why: "Standard, relaxed response."
            }
        }
    ]
};

export const videoTexasSurvival: Script = {
    id: "video_texas_survival",
    title: "Texas Small Talk",
    categorySlug: "small_talk",
    categoryName: CATEGORY_NAMES["small_talk"],
    cleanedEnglish: "Survival phrases for the Lone Star State.",
    imageUrl: "/images/scenarios/greetings_introvert_3d.png",
    mode: "cloze",
    culturalInsights: {
        title: "Southern Hospitality",
        content: "In Texas, 'Howdy' is more than a greeting; it's an invitation to a friendly (but brief) exchange."
    },
    sentences: [
        {
            id: "vts1",
            en: "The Howdy Habit",
            scenario: "Meeting a local in Texas",
            keywords: [
                { word: "Howdy", definition: "Hello" },
                { word: "Doing", definition: "How are things" }
            ],
            goodResponse: {
                text: "[Howdy]! How y'all [doing] today?",
                why: "Instant local points for using 'y'all' correctly."
            }
        }
    ]
};

export const videoScenarios = [
    videoDiagnosticGreeting,
    videoCelestialGreeting,
    videoTexasSurvival
];
