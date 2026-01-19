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
  difficulty?: "Mild 🌶️" | "Medium 🌶️🌶️" | "Spicy 🌶️🌶️🌶️";
  context?: string;
  tone?: string; // e.g. "Spicy", "Funny"
  format?: string; // e.g. "Social Dojo"
  segments?: {
    step: string;
    text: string;
    keywords?: Keyword[];
    note: string;
  }[];
  decoderItems?: DecoderItem[];
  // Phase 1: New Engagement Fields
  imageUrl?: string; 
  culturalInsights?: {
    title: string;
    content: string;
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
  commentsCount?: number;
  shares?: number;
  saves?: number;
};

export interface Comment {
  id: string;
  scenarioId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  text: string;
  createdAt: number;
}

export interface UserStats {
  userId: string;
  totalScenariosCreated: number;
  totalPractices: number;
  totalLikesReceived: number;
  currentStreak?: number;
  lastPracticeTimestamp?: number; // Milliseconds
  longestStreak?: number;
}

export interface UserProfile {
  uid: string;
  occupation: string;
  hobbies: string[];
  humorStyle: string; // e.g., "Witty", "Dad Jokes", "Sarcastic"
  motherLanguage: string; // To help with specific translation nuances
  onboardingCompleted: boolean;
}

export const JOB_CATEGORIES = {
  "Tech & Data": ["Software Engineer", "Data Scientist", "Product Manager", "Designer", "IT Support"],
  "Business & Finance": ["Sales Rep", "Marketing", "HR Specialist", "Accountant", "Consultant"],
  "Healthcare": ["Doctor", "Nurse", "Pharmacist", "Therapist"],
  "Service & Hospitality": ["Chef / Cook", "Server / Barista", "Retail Staff", "Customer Support", "Hotel Staff"],
  "Education": ["Teacher", "Professor", "Student"],
  "Trades & Labor": ["Construction", "Electrician", "Driver", "Logistics"],
  "Other": ["Freelancer", "Founder", "Other"]
};
