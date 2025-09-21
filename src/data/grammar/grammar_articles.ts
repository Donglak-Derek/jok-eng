import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const grammarArticles: Script = {
  id: "grammar-articles",
  title: "Articles: a, an, the, no article",
  categorySlug: "grammar",
  categoryName: CATEGORY_NAMES["grammar"],
  cleanedEnglish:
    "Practice using articles in English: a, an, the, and when no article is needed. These help make your sentences clear and natural.",
  sentences: [
    {
      id: "s1",
      en: "I bought a chair yesterday.",
      ko: "저는 어제 의자 하나를 샀어요.",
      keywords: [
        { word: "a", meaningKo: "하나 (처음 언급)" },
        { word: "chair", meaningKo: "의자" },
      ],
    },
    {
      id: "s2",
      en: "She wants an apple for lunch.",
      ko: "그녀는 점심에 사과 하나를 원해요.",
      keywords: [
        { word: "an", meaningKo: "하나 (모음 앞)" },
        { word: "apple", meaningKo: "사과" },
      ],
    },
    {
      id: "s3",
      en: "The chair in the corner is broken.",
      ko: "구석에 있는 그 의자가 부서졌어요.",
      keywords: [
        { word: "the", meaningKo: "그 (특정)" },
        { word: "corner", meaningKo: "구석" },
      ],
    },
    {
      id: "s4",
      en: "The sun is bright today.",
      ko: "오늘은 해가 밝아요.",
      keywords: [
        { word: "the sun", meaningKo: "해 (유일한 것)" },
        { word: "bright", meaningKo: "밝은" },
      ],
    },
    {
      id: "s5",
      en: "I like music.",
      ko: "저는 음악을 좋아해요.",
      keywords: [
        { word: "music", meaningKo: "음악 (셀 수 없음)" },
        { word: "like", meaningKo: "좋아하다" },
      ],
    },
    {
      id: "s6",
      en: "She studies English every day.",
      ko: "그녀는 매일 영어를 공부해요.",
      keywords: [
        { word: "English", meaningKo: "영어" },
        { word: "study", meaningKo: "공부하다" },
      ],
    },
    {
      id: "s7",
      en: "I need a tool to fix this.",
      ko: "저는 이걸 고치려면 도구가 하나 필요해요.",
      keywords: [
        { word: "tool", meaningKo: "도구" },
        { word: "fix", meaningKo: "고치다" },
      ],
    },
    {
      id: "s8",
      en: "He is an honest man.",
      ko: "그는 정직한 사람이에요.",
      keywords: [
        { word: "honest", meaningKo: "정직한" },
        { word: "an", meaningKo: "하나 (발음 모음 앞)" },
      ],
    },
    {
      id: "s9",
      en: "The book on the table is mine.",
      ko: "책상 위에 있는 그 책은 제 거예요.",
      keywords: [
        { word: "book", meaningKo: "책" },
        { word: "mine", meaningKo: "내 것" },
      ],
    },
    {
      id: "s10",
      en: "Water is important for life.",
      ko: "물은 삶에 중요해요.",
      keywords: [
        { word: "water", meaningKo: "물" },
        { word: "important", meaningKo: "중요한" },
      ],
    },
  ],
};
