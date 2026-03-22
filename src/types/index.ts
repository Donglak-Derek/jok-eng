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

  // New fields for Open Mic & Skit
  section?: 'hook' | 'twist' | 'punchline';
  speaker?: 'A' | 'B';
  mood?: string;
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
  seriesId?: string; // New: For episodic content
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
  videoUrl?: string; // New: For Video Scenarios
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
  relatedBlogId?: string; // New: For Content Loop
  relatedBlogUrl?: string; // New: For Content Loop
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
  color?: string; // Phase 1: Accent Color
  // Monetization fields
  isPremium?: boolean;
  price?: number; // Optional price for one-time unlock (in cents or USD)
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

  // Monetization fields
  purchasedCategories?: string[]; // Array of category slugs the user has bought outright

  subscription?: UserSubscription;
}

export interface UserSubscription {
  tier: 'free' | 'pro' | 'admin';
  status: 'active' | 'canceled' | 'expired' | 'past_due';
  features: {
    premiumTTS: boolean;
    advancedAnalytics: boolean;
  };
}

export interface UserProgress {
  uid: string;
  currentDay: number;
  completedDays: number[];
  totalXP: number;
  personaType?: string; // e.g. "The Silent Expert", "The Power Player"
  streak: number;
  lastCompletedDate?: string; // ISO string for streak calculation
  lastPracticeTimestamp?: number; // Precise timestamp for mathematical calculations
  activityLog?: Record<string, number>; // YYYY-MM-DD -> session count
  badges: string[]; // Achievement IDs
  completions?: number; // Number of times 90-day roadmap was finished
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

// Phase 4: Roadmap / 90-Day Challenge
export type MissionOption = {
  id: string;
  text: string;
  vibe_score: number;
  feedback: string;
  allow_retry: boolean;
  audioUrl?: string;
};

export type Mission = {
  day: number;
  phase: number;
  module: string;
  title: string;
  imageUrl?: string;
  image_description?: string;
  strategic_brief: string;
  cloze_setup: string;
  cloze_keywords: string[];
  scenario_text: string;
  scenarioAudioUrl?: string;
  options: MissionOption[];
  x_ray: string;
  x_rayAudioUrl?: string;
  cloze_translations?: Record<string, string>;
  season: number;
  xp: number;
  achievementId?: string;
  // Legacy fields for safety
  character?: string;
  cloze_dialogue?: string;
};

export type Season = {
  id: number;
  title: string;
  days: [number, number]; // [startDay, endDay]
  description: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
};
