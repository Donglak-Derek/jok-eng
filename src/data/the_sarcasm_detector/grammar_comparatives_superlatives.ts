import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const comparativesSuperlatives: Script = {
  id: "grammar-comparatives-superlatives",
  title: "Comparatives and Superlatives",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Comparatives compare two things, and superlatives show the highest level. They are useful in interviews, presentations, and daily conversations.",
  sentences: [
    {
      id: "s1",
      en: "This chair is more comfortable than that one.",
      ko: "이 의자가 저 의자보다 더 편해요.",
      keywords: [
        { word: "comfortable", meaningKo: "편한" },
        { word: "than", meaningKo: "보다" },
      ],
    },
    {
      id: "s2",
      en: "Today is hotter than yesterday.",
      ko: "오늘은 어제보다 더 더워요.",
      keywords: [
        { word: "hotter", meaningKo: "더 더운" },
        { word: "yesterday", meaningKo: "어제" },
      ],
    },
    {
      id: "s3",
      en: "This is better than I expected.",
      ko: "이건 제가 기대했던 것보다 더 좋아요.",
      keywords: [
        { word: "better", meaningKo: "더 좋은" },
        { word: "expected", meaningKo: "기대한" },
      ],
    },
    {
      id: "s4",
      en: "She is more confident than before.",
      ko: "그녀는 예전보다 더 자신감 있어요.",
      keywords: [
        { word: "confident", meaningKo: "자신감 있는" },
        { word: "before", meaningKo: "이전" },
      ],
    },
    {
      id: "s5",
      en: "This tool is easier to use than that one.",
      ko: "이 도구가 저 도구보다 더 쓰기 쉬워요.",
      keywords: [
        { word: "easier", meaningKo: "더 쉬운" },
        { word: "tool", meaningKo: "도구" },
      ],
    },
    {
      id: "s6",
      en: "This is the best idea we’ve had.",
      ko: "이건 우리가 가진 최고의 아이디어예요.",
      keywords: [
        { word: "best", meaningKo: "최고의" },
        { word: "idea", meaningKo: "아이디어" },
      ],
    },
    {
      id: "s7",
      en: "She is the most talented person on the team.",
      ko: "그녀는 팀에서 가장 재능 있는 사람이에요.",
      keywords: [
        { word: "talented", meaningKo: "재능 있는" },
        { word: "team", meaningKo: "팀" },
      ],
    },
    {
      id: "s8",
      en: "This is the worst mistake I ever made.",
      ko: "이건 제가 한 최악의 실수예요.",
      keywords: [
        { word: "worst", meaningKo: "최악의" },
        { word: "mistake", meaningKo: "실수" },
      ],
    },
    {
      id: "s9",
      en: "He is the fastest worker in our group.",
      ko: "그는 우리 그룹에서 가장 빠른 일꾼이에요.",
      keywords: [
        { word: "fastest", meaningKo: "가장 빠른" },
        { word: "worker", meaningKo: "일꾼" },
      ],
    },
    {
      id: "s10",
      en: "That was the most exciting game I’ve ever seen.",
      ko: "그건 제가 본 가장 신나는 경기였어요.",
      keywords: [
        { word: "exciting", meaningKo: "신나는" },
        { word: "game", meaningKo: "경기" },
      ],
    },
    {
      id: "s11",
      en: "My bag is heavier than yours.",
      ko: "내 가방이 네 것보다 더 무거워요.",
      keywords: [
        { word: "heavier", meaningKo: "더 무거운" },
        { word: "bag", meaningKo: "가방" },
      ],
    },
    {
      id: "s12",
      en: "This project is more important than the others.",
      ko: "이 프로젝트는 다른 것들보다 더 중요해요.",
      keywords: [
        { word: "important", meaningKo: "중요한" },
        { word: "others", meaningKo: "다른 것들" },
      ],
    },
    {
      id: "s13",
      en: "That movie was funnier than I thought.",
      ko: "그 영화는 제가 생각한 것보다 더 웃겼어요.",
      keywords: [
        { word: "funnier", meaningKo: "더 웃긴" },
        { word: "thought", meaningKo: "생각했다" },
      ],
    },
    {
      id: "s14",
      en: "This is the cheapest option we can choose.",
      ko: "이건 우리가 고를 수 있는 가장 저렴한 선택이에요.",
      keywords: [
        { word: "cheapest", meaningKo: "가장 싼" },
        { word: "option", meaningKo: "선택" },
      ],
    },
    {
      id: "s15",
      en: "She is the kindest teacher I’ve ever met.",
      ko: "그녀는 제가 만난 가장 친절한 선생님이에요.",
      keywords: [
        { word: "kindest", meaningKo: "가장 친절한" },
        { word: "teacher", meaningKo: "선생님" },
      ],
    },
  ],
};
