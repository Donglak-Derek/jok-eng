import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const verbTensesConsistency: Script = {
  id: "grammar-verb-tenses-consistency",
  title: "Verb Tenses Consistency",
  categorySlug: "grammar",
  categoryName: CATEGORY_NAMES["grammar"],
  cleanedEnglish:
    "Practice keeping your verb tenses consistent. Focus on present simple vs present continuous, and past simple vs present perfect.",
  sentences: [
    {
      id: "s1",
      en: "I work at IKEA every day.",
      ko: "저는 매일 이케아에서 일해요.",
      keywords: [
        { word: "work", meaningKo: "일하다" },
        { word: "every day", meaningKo: "매일" },
      ],
    },
    {
      id: "s2",
      en: "I am working at IKEA right now.",
      ko: "저는 지금 이케아에서 일하고 있어요.",
      keywords: [
        { word: "working", meaningKo: "일하고 있다" },
        { word: "right now", meaningKo: "지금" },
      ],
    },
    {
      id: "s3",
      en: "She studies English after work.",
      ko: "그녀는 퇴근 후 영어를 공부해요.",
      keywords: [
        { word: "studies", meaningKo: "공부하다" },
        { word: "after work", meaningKo: "퇴근 후" },
      ],
    },
    {
      id: "s4",
      en: "She is studying English this evening.",
      ko: "그녀는 오늘 저녁에 영어 공부를 하고 있어요.",
      keywords: [
        { word: "studying", meaningKo: "공부하고 있다" },
        { word: "this evening", meaningKo: "오늘 저녁" },
      ],
    },
    {
      id: "s5",
      en: "I finished my project yesterday.",
      ko: "어제 제 프로젝트를 끝냈어요.",
      keywords: [
        { word: "finished", meaningKo: "끝냈다" },
        { word: "yesterday", meaningKo: "어제" },
      ],
    },
    {
      id: "s6",
      en: "I have finished my project already.",
      ko: "제 프로젝트를 이미 끝냈어요.",
      keywords: [
        { word: "have finished", meaningKo: "이미 끝냈다" },
        { word: "already", meaningKo: "이미" },
      ],
    },
    {
      id: "s7",
      en: "They traveled to Korea last year.",
      ko: "그들은 작년에 한국을 여행했어요.",
      keywords: [
        { word: "traveled", meaningKo: "여행했다" },
        { word: "last year", meaningKo: "작년" },
      ],
    },
    {
      id: "s8",
      en: "They have traveled to Korea many times.",
      ko: "그들은 여러 번 한국에 여행 갔어요.",
      keywords: [
        { word: "have traveled", meaningKo: "여행해 왔다" },
        { word: "many times", meaningKo: "여러 번" },
      ],
    },
    {
      id: "s9",
      en: "I live in Texas.",
      ko: "저는 텍사스에 살아요.",
      keywords: [
        { word: "live", meaningKo: "살다" },
        { word: "Texas", meaningKo: "텍사스" },
      ],
    },
    {
      id: "s10",
      en: "I am living in Texas for now.",
      ko: "저는 지금 당분간 텍사스에서 살고 있어요.",
      keywords: [
        { word: "living", meaningKo: "살고 있다" },
        { word: "for now", meaningKo: "당분간" },
      ],
    },
    {
      id: "s11",
      en: "He worked at a bank two years ago.",
      ko: "그는 2년 전에 은행에서 일했어요.",
      keywords: [
        { word: "worked", meaningKo: "일했다" },
        { word: "two years ago", meaningKo: "2년 전" },
      ],
    },
    {
      id: "s12",
      en: "He has worked at a bank before.",
      ko: "그는 전에 은행에서 일해본 적 있어요.",
      keywords: [
        { word: "has worked", meaningKo: "일해본 적 있다" },
        { word: "before", meaningKo: "전에" },
      ],
    },
    {
      id: "s13",
      en: "We eat lunch at noon every day.",
      ko: "우리는 매일 정오에 점심을 먹어요.",
      keywords: [
        { word: "eat lunch", meaningKo: "점심을 먹다" },
        { word: "noon", meaningKo: "정오" },
      ],
    },
    {
      id: "s14",
      en: "We are eating lunch right now.",
      ko: "우리는 지금 점심을 먹고 있어요.",
      keywords: [
        { word: "eating", meaningKo: "먹고 있다" },
        { word: "right now", meaningKo: "지금" },
      ],
    },
    {
      id: "s15",
      en: "I saw that movie last week.",
      ko: "지난주에 그 영화를 봤어요.",
      keywords: [
        { word: "saw", meaningKo: "봤다" },
        { word: "last week", meaningKo: "지난주" },
      ],
    },
    {
      id: "s16",
      en: "I have seen that movie before.",
      ko: "그 영화를 전에 본 적 있어요.",
      keywords: [
        { word: "have seen", meaningKo: "본 적 있다" },
        { word: "before", meaningKo: "전에" },
      ],
    },
  ],
};
