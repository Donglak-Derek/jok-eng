import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const officePrinter: Script = {
  id: "skit-office-printer",
  title: "Office Printer Skit",
  categorySlug: "skit",
  categoryName: CATEGORY_NAMES["skit"],
  cleanedEnglish:
    "Our office printer acts like a diva—needs a warm-up, a pep talk, and a day off after printing one page.",
  sentences: [
    { id: "s1", en: "Our office printer is dramatic.", ko: "우리 사무실 프린터는 엄청 오버해요.", keywords: [ { word: "office", meaningKo: "사무실" }, { word: "dramatic", meaningKo: "과장된" } ] },
    { id: "s2", en: "It needs a warm-up before it moves.", ko: "움직이기 전에 예열이 필요해요.", keywords: [ { word: "warm-up", meaningKo: "예열" } ] },
    { id: "s3", en: "Then it demands a pep talk.", ko: "그리고 격려가 필요하대요.", keywords: [ { word: "pep talk", meaningKo: "격려" } ] },
    { id: "s4", en: "It prints one page and sighs.", ko: "한 장 출력하고 한숨 쉬어요.", keywords: [ { word: "print", meaningKo: "출력하다" }, { word: "sigh", meaningKo: "한숨 쉬다" } ] },
    { id: "s5", en: "After that, it requests a day off.", ko: "그 다음에는 하루 휴가를 요구해요.", keywords: [ { word: "request", meaningKo: "요구하다" } ] },
    { id: "s6", en: "We put a tiny couch next to it.", ko: "옆에 작은 소파까지 놨어요.", keywords: [ { word: "tiny", meaningKo: "아주 작은" }, { word: "couch", meaningKo: "소파" } ] },
    { id: "s7", en: "Now HR schedules therapy for the printer.", ko: "이제 인사팀이 프린터 상담 일정을 잡아요.", keywords: [ { word: "HR", meaningKo: "인사팀" }, { word: "therapy", meaningKo: "치료, 상담" } ] },
  ],
};

