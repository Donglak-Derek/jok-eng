export type Keyword = {
  word: string;
  meaningKo: string;
};

export type Sentence = {
  id: string;
  en: string;
  ko: string;
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

export type Script = {
  id: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  cleanedEnglish: string; // Used as summary for story_flow
  cleanedKorean?: string; // Korean summary
  icon?: string;
  sentences: Sentence[];
  // New fields for story_flow
  type?: "script" | "story_flow";
  context?: string;
  segments?: {
    step: string;
    text: string;
    ko?: string;
    keywords?: Keyword[];
    note: string;
  }[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  descriptionKo?: string;
  image: string;
};

