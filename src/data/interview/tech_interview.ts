import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const techInterview: Script = {
  id: "interview-tech",
  title: "Tech Interview Small Talk",
  categorySlug: "interview",
  categoryName: CATEGORY_NAMES["interview"],
  cleanedEnglish:
    "Before coding questions, we talk about hobbies and coffee like it's the most crucial system design.",
  sentences: [
    { id: "s1", en: "Thanks for taking the time today.", ko: "오늘 시간 내주셔서 감사합니다.", keywords: [ { word: "take the time", meaningKo: "시간을 내다" } ] },
    { id: "s2", en: "Tell me about your favorite project.", ko: "가장 좋아하는 프로젝트에 대해 말해 주세요.", keywords: [ { word: "favorite", meaningKo: "가장 좋아하는" }, { word: "project", meaningKo: "프로젝트" } ] },
    { id: "s3", en: "We discuss hobbies before algorithms.", ko: "알고리즘보다 취미를 먼저 이야기해요.", keywords: [ { word: "hobby", meaningKo: "취미" }, { word: "algorithm", meaningKo: "알고리즘" } ] },
    { id: "s4", en: "Coffee is our system design.", ko: "커피가 우리의 시스템 설계예요.", keywords: [ { word: "system design", meaningKo: "시스템 설계" } ] },
    { id: "s5", en: "Then we draw boxes and arrows.", ko: "그리고 우리는 상자와 화살표를 그려요.", keywords: [ { word: "draw", meaningKo: "그리다" }, { word: "arrow", meaningKo: "화살표" } ] },
    { id: "s6", en: "The whiteboard squeaks like a violin.", ko: "화이트보드가 바이올린처럼 끼익거려요.", keywords: [ { word: "whiteboard", meaningKo: "화이트보드" }, { word: "squeak", meaningKo: "끼익거리다" } ] },
    { id: "s7", en: "We both nod like we understand everything.", ko: "우리는 모든 걸 이해한 듯 고개를 끄덕여요.", keywords: [ { word: "nod", meaningKo: "끄덕이다" }, { word: "understand", meaningKo: "이해하다" } ] },
    { id: "s8", en: "Finally, we schedule the real challenge.", ko: "마지막으로 진짜 도전을 일정에 잡아요.", keywords: [ { word: "schedule", meaningKo: "일정 잡다" }, { word: "challenge", meaningKo: "도전" } ] },
    { id: "s9", en: "I ask if coffee is allowed.", ko: "커피 가져와도 되는지 물어봐요.", keywords: [ { word: "allow", meaningKo: "허락하다" } ] },
  ],
};

