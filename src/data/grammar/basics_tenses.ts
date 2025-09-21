import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const basicsTenses: Script = {
  id: "grammar-basics-tenses",
  title: "Tense Basics",
  categorySlug: "grammar",
  categoryName: CATEGORY_NAMES["grammar"],
  cleanedEnglish:
    "Learn present, past, and future with simple, clear examples you can reuse in daily conversations.",
  sentences: [
    { id: "s1", en: "I eat breakfast at 8.", ko: "나는 8시에 아침을 먹어요.", keywords: [ { word: "eat", meaningKo: "먹다" }, { word: "breakfast", meaningKo: "아침 식사" } ] },
    { id: "s2", en: "I am eating now.", ko: "나는 지금 먹고 있어요.", keywords: [ { word: "am eating", meaningKo: "먹고 있는 중(진행형)" } ] },
    { id: "s3", en: "I ate breakfast at 8.", ko: "나는 8시에 아침을 먹었어요.", keywords: [ { word: "ate", meaningKo: "먹었다(과거)" } ] },
    { id: "s4", en: "I was eating when you called.", ko: "네가 전화했을 때 나는 먹고 있었어요.", keywords: [ { word: "was eating", meaningKo: "먹고 있었다(과거진행)" } ] },
    { id: "s5", en: "I will eat after work.", ko: "일 끝나고 먹을 거예요.", keywords: [ { word: "will", meaningKo: "~할 것이다(미래)" } ] },
    { id: "s6", en: "I have eaten already.", ko: "나는 이미 먹었어요.", keywords: [ { word: "have eaten", meaningKo: "이미 먹었다(현재완료)" } ] },
    { id: "s7", en: "I have been eating slowly.", ko: "나는 천천히 먹고 있었어요.", keywords: [ { word: "have been", meaningKo: "~해오고 있다(완료진행)" }, { word: "slowly", meaningKo: "천천히" } ] },
    { id: "s8", en: "I will have eaten by 8.", ko: "8시까지는 먹었을 거예요.", keywords: [ { word: "will have eaten", meaningKo: "~까지는 먹었을 것이다(미래완료)" } ] },
  ],
};

