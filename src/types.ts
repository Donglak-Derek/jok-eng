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
  cleanedEnglish: string;
  sentences: Sentence[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

