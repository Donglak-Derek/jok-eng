export type Keyword = {
  word: string;
  definition: string;
};

export type Sentence = {
  id: string;
  en: string;
  keywords: Keyword[];
  // New "Mistake -> Fix" format fields
  scenario?: string;
  badResponse?: {
    text: string;
    why: string;
  };
  goodResponse?: {
    text: string;
    why: string;
  };
  audioUrl?: string; // Cached audio for sentence
};

export type DecoderItem = {
  id: string;
  phrase: string;
  literalMeaning: string;
  actualMeaning: string;
  dangerLevel: string;
  survivalTip: string;
  keywords?: Keyword[];
  conversation?: {
    speakerA: string;
    speakerB: string;
    textA: string;
    textB: string;
    contextNote?: string;
  };
  audioUrl?: string;
};

export type Script = {
  id: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  section?: string; // Optional grouping for category pages
  cleanedEnglish: string; // Used as summary
  icon?: string;
  sentences?: Sentence[];
  // New fields for story_flow and decoder
  type?: "script" | "story_flow" | "decoder";
  mode?: "standard" | "cloze"; // New mode for StoryTeller
  difficulty?: string; // e.g. "Beginner", "Normal", "Native" or "Spicy 🌶️"
  length?: string; // e.g. "Bite-sized", "Deep Dive"
  context?: string;
  tone?: string; // e.g. "Spicy", "Funny"
  format?: string; // e.g. "Social Dojo"
  segments?: {
    step: string;
    text: string;
    keywords?: Keyword[];
    note: string;
    audioUrl?: string;
  }[];
  decoderItems?: DecoderItem[];
  // Phase 1: New Engagement Fields
  audioUrl?: string; // New: For Audio Caching
  imageUrl?: string; 
  culturalInsights?: {
    title: string;
    content: string;
    vocabulary?: { word: string; definition: string; }[];
  };
  quizItems?: {
    id?: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  summaryPoints?: string[]; // For Signal Decoder review
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
  color?: string; // Phase 1: Accent Color
};

export type UserScript = Script & {
  userId: string;
  createdAt: number; // timestamp
  authorName?: string;
  authorPhotoURL?: string;
  authorOccupation?: string; // NEW: For Smart Feed
  authorAgeGroup?: string; // NEW: For Vibe Context
  authorCountry?: string; // NEW: For Cultural Context
  likes?: number; // count
  likedBy?: string[]; // user IDs
  originalScenarioId?: string; // For saved copies
  isRemix?: boolean;
  originalPrompt: {
    context: string;
    myRole: string;
    otherRole: string;
    plot: string;
  };
  isPublic?: boolean;
  repeats?: number;
  shares?: number;
  saves?: number;
  remixCount?: number;
};

export interface UserStats {
  userId: string;
  totalScenariosCreated: number;
  totalPractices: number;
  totalRemixesInspired: number;
  currentStreak?: number;
  lastPracticeTimestamp?: number; // Milliseconds
  longestStreak?: number;
}

export interface UserProfile {
  uid: string;
  displayName?: string;
  occupation: string;
  // NEW VIBE FACTORS
  ageGroup?: (typeof GENERATION_GROUPS)[number]; // Replaced "Age Groups" with "Generations" for better Vibe/Privacy
  gender?: "Male" | "Female" | "Non-binary"; // Optional, affects perspective
  interests?: string[]; // e.g. "Tech", "Art" (Phase 2)
  hobbies: string[];
  humorStyle: string; // e.g., "Witty", "Dad Jokes", "Sarcastic"
  motherLanguage: string; // To help with specific translation nuances
  superpower?: string; // e.g. "Empathy", "Wit"
  kryptonite?: string; // e.g. "Small Talk", "Confrontation"
  onboardingCompleted: boolean;
  subscription?: UserSubscription;
}

export interface UserSubscription {
  tier: 'free' | 'pro' | 'admin';
  status: 'active' | 'canceled' | 'expired' | 'past_due';
  credits: {
    dailyLimit: number;
    usage: number; // Renamed from remaining to usage for easier counting
    lastRefill: number; // Timestamp
  };
  features: {
    premiumTTS: boolean;
    advancedAnalytics: boolean;
    unlimitedRemix: boolean;
  };
}

// Replaced "Age Groups" with "Generations" for better Vibe/Privacy
export const GENERATION_GROUPS = [
  "Gen Z (Zoomer)",
  "Millennial",
  "Gen X",
  "Boomer", 
  "Silent Gen"
] as const;

export const CULTURE_OPTIONS = [
  "Korea 🇰🇷",
  "Japan 🇯🇵",
  "China 🇨🇳",
  "USA 🇺🇸",
  "UK 🇬🇧",
  "Europe 🇪🇺",
  "Latin America 🌎",
  "India 🇮🇳",
  "Middle East 🕌",
  "Southeast Asia 🌏",
  "Other"
] as const;

export const JOB_CATEGORIES = {
  "Tech & Data": ["Software Engineer", "Data Scientist", "Product Manager", "Designer", "IT Support"],
  "Business & Finance": ["Sales Rep", "Marketing", "HR Specialist", "Accountant", "Consultant"],
  "Healthcare": ["Doctor", "Nurse", "Pharmacist", "Therapist"],
  "Service & Hospitality": ["Chef / Cook", "Server / Barista", "Retail Staff", "Customer Support", "Hotel Staff"],
  "Education": ["Teacher", "Professor", "Student"],
  "Trades & Labor": ["Construction", "Electrician", "Driver", "Logistics"],
  "Other": ["Freelancer", "Founder", "Other"]
};
