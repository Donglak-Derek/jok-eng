import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const roommateCooking: Script = {
  id: "skit-roommate-cooking",
  title: "Roommate Cooking Show",
  categorySlug: "skit",
  categoryName: CATEGORY_NAMES["skit"],
  cleanedEnglish:
    "My roommate cooks like a TV host—lots of catchphrases, dramatic pauses, and smoke alarms as audience applause.",
  sentences: [
    { id: "s1", en: "My roommate cooks like a TV host.", ko: "내 룸메이트는 TV 진행자처럼 요리해요.", keywords: [ { word: "roommate", meaningKo: "룸메이트" }, { word: "host", meaningKo: "진행자" } ] },
    { id: "s2", en: "There are catchphrases and dramatic pauses.", ko: "유행어와 극적인 멈춤이 있어요.", keywords: [ { word: "catchphrase", meaningKo: "유행어" }, { word: "dramatic", meaningKo: "극적인" } ] },
    { id: "s3", en: "The smoke alarm is our audience.", ko: "연기 감지기가 우리의 관객이에요.", keywords: [ { word: "smoke alarm", meaningKo: "연기 감지기" }, { word: "audience", meaningKo: "관객" } ] },
    { id: "s4", en: "It applauds at the worst time.", ko: "최악의 타이밍에 박수를 쳐요.", keywords: [ { word: "applaud", meaningKo: "박수치다" }, { word: "timing", meaningKo: "타이밍" } ] },
    { id: "s5", en: "He yells 'Bon appétit!' at toast.", ko: "그는 토스트에 '맛있게 드세요!'라고 외쳐요.", keywords: [ { word: "yell", meaningKo: "소리치다" }, { word: "toast", meaningKo: "토스트" } ] },
    { id: "s6", en: "We have a commercial break to open windows.", ko: "창문을 열기 위한 광고 시간이 있어요.", keywords: [ { word: "commercial break", meaningKo: "광고 시간" } ] },
    { id: "s7", en: "Season finale is cleaning the pan.", ko: "시즌 피날레는 팬 닦기예요.", keywords: [ { word: "finale", meaningKo: "피날레" }, { word: "pan", meaningKo: "프라이팬" } ] },
    { id: "s8", en: "Critics say: needs more salt and less drama.", ko: "평론가 평: 소금은 더, 드라마는 덜.", keywords: [ { word: "critic", meaningKo: "평론가" }, { word: "drama", meaningKo: "드라마" } ] },
  ],
};

