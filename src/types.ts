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
};

export type Script = {
  id: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  cleanedEnglish: string; // Used as summary
  icon?: string;
  sentences: Sentence[];
  // New fields for story_flow and decoder
  type?: "script" | "story_flow" | "decoder";
  context?: string;
  segments?: {
    step: string;
    text: string;
    keywords?: Keyword[];
    note: string;
  }[];
  decoderItems?: DecoderItem[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type UserScript = Script & {
  userId: string;
  createdAt: number; // timestamp
  originalPrompt: {
    context: string;
    myRole: string;
    otherRole: string;
    plot: string;
  };
  isPublic?: boolean;
  repeats?: number;
};
