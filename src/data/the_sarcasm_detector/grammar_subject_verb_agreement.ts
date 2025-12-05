import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const subjectVerbAgreement: Script = {
  id: "grammar-subject-verb-agreement",
  title: "Subject-Verb Agreement",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Practice making the subject and verb match correctly. This helps your English sound natural, even when speaking fast.",
  sentences: [
    {
      id: "s1",
      en: "He go to work every day. ❌",
      ko: "그는 매일 일하러 가요. ❌",
      keywords: [
        { word: "go", meaningKo: "가다" },
        { word: "work", meaningKo: "일, 직장" },
      ],
    },
    {
      id: "s2",
      en: "He goes to work every day. ✅",
      ko: "그는 매일 일하러 가요. ✅",
      keywords: [
        { word: "goes", meaningKo: "간다" },
        { word: "every day", meaningKo: "매일" },
      ],
    },
    {
      id: "s3",
      en: "She like coffee. ❌",
      ko: "그녀는 커피를 좋아해요. ❌",
      keywords: [
        { word: "like", meaningKo: "좋아하다" },
        { word: "coffee", meaningKo: "커피" },
      ],
    },
    {
      id: "s4",
      en: "She likes coffee. ✅",
      ko: "그녀는 커피를 좋아해요. ✅",
      keywords: [
        { word: "likes", meaningKo: "좋아한다" },
        { word: "coffee", meaningKo: "커피" },
      ],
    },
    {
      id: "s5",
      en: "The dog eat fast. ❌",
      ko: "그 개는 빨리 먹어요. ❌",
      keywords: [
        { word: "dog", meaningKo: "개" },
        { word: "eat", meaningKo: "먹다" },
      ],
    },
    {
      id: "s6",
      en: "The dog eats fast. ✅",
      ko: "그 개는 빨리 먹어요. ✅",
      keywords: [
        { word: "eats", meaningKo: "먹는다" },
        { word: "fast", meaningKo: "빨리" },
      ],
    },
    {
      id: "s7",
      en: "My friend live in Dallas. ❌",
      ko: "내 친구는 댈러스에 살아요. ❌",
      keywords: [
        { word: "friend", meaningKo: "친구" },
        { word: "live", meaningKo: "살다" },
      ],
    },
    {
      id: "s8",
      en: "My friend lives in Dallas. ✅",
      ko: "내 친구는 댈러스에 살아요. ✅",
      keywords: [
        { word: "lives", meaningKo: "산다" },
        { word: "Dallas", meaningKo: "댈러스" },
      ],
    },
    {
      id: "s9",
      en: "The teacher teach English. ❌",
      ko: "선생님은 영어를 가르쳐요. ❌",
      keywords: [
        { word: "teacher", meaningKo: "선생님" },
        { word: "teach", meaningKo: "가르치다" },
      ],
    },
    {
      id: "s10",
      en: "The teacher teaches English. ✅",
      ko: "선생님은 영어를 가르쳐요. ✅",
      keywords: [
        { word: "teaches", meaningKo: "가르친다" },
        { word: "English", meaningKo: "영어" },
      ],
    },
    {
      id: "s11",
      en: "It rain a lot here. ❌",
      ko: "여기에는 비가 많이 와요. ❌",
      keywords: [
        { word: "rain", meaningKo: "비 오다" },
        { word: "a lot", meaningKo: "많이" },
      ],
    },
    {
      id: "s12",
      en: "It rains a lot here. ✅",
      ko: "여기에는 비가 많이 와요. ✅",
      keywords: [
        { word: "rains", meaningKo: "비가 온다" },
        { word: "here", meaningKo: "여기" },
      ],
    },
    {
      id: "s13",
      en: "The car need gas. ❌",
      ko: "그 차는 기름이 필요해요. ❌",
      keywords: [
        { word: "car", meaningKo: "차" },
        { word: "need", meaningKo: "필요하다" },
      ],
    },
    {
      id: "s14",
      en: "The car needs gas. ✅",
      ko: "그 차는 기름이 필요해요. ✅",
      keywords: [
        { word: "needs", meaningKo: "필요하다" },
        { word: "gas", meaningKo: "기름" },
      ],
    },
    {
      id: "s15",
      en: "My boss want results fast. ❌",
      ko: "내 상사는 빠른 결과를 원해요. ❌",
      keywords: [
        { word: "boss", meaningKo: "상사" },
        { word: "want", meaningKo: "원하다" },
      ],
    },
    {
      id: "s16",
      en: "My boss wants results fast. ✅",
      ko: "내 상사는 빠른 결과를 원해요. ✅",
      keywords: [
        { word: "wants", meaningKo: "원한다" },
        { word: "results", meaningKo: "결과" },
      ],
    },
  ],
};
