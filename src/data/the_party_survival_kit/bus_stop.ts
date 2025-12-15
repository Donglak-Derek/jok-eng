import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const busStop: Script = {
  id: "standup-bus-stop",
  title: "The Party Survival Story",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish:
    "A go-to story for bars, parties, and group dinners so you don’t freeze—self-aware, short, and ends with a playful twist instead of an awkward silence.",
  cleanedKorean: "파티나 모임에서 얼어붙지 않기 위한 필살기 스토리. 짧고 재치 있으며, 어색한 침묵 대신 유쾌한 반전으로 끝납니다.",
  icon: "🚌",
  sentences: [
    {
      id: "s1",
      en: "I keep one short story ready for parties so I don't freeze.",
      ko: "파티에서 얼지 않으려고 짧은 이야기를 하나 준비해요.",
      keywords: [
        { word: "freeze", meaningKo: "얼다, 굳다" },
        { word: "ready", meaningKo: "준비된" },
      ],
    },
    {
      id: "s2",
      en: "It starts simple: 'I got on the wrong bus once.'",
      ko: "단순하게 시작해요: '예전에 잘못된 버스를 탄 적 있어.'",
      keywords: [
        { word: "wrong", meaningKo: "잘못된" },
        { word: "once", meaningKo: "한 번" },
      ],
    },
    {
      id: "s3",
      en: "People lean in because everyone has a travel mistake.",
      ko: "여러분도 여행 실수는 있으니까 사람들이 몸을 기울여요.",
      keywords: [
        { word: "lean in", meaningKo: "관심을 보이다" },
        { word: "mistake", meaningKo: "실수" },
      ],
    },
    {
      id: "s4",
      en: "I add a quick joke: 'The sign said Dogs Only. I barked to be polite.'",
      ko: "짧은 농담을 더해요: '표지판에 개만 탑승이라고 써 있어서, 예의상 한 번 짖었어.'",
      keywords: [
        { word: "sign", meaningKo: "표지판" },
        { word: "polite", meaningKo: "예의 바른" },
      ],
    },
    {
      id: "s5",
      en: "They laugh because it's self-deprecating and short.",
      ko: "자기비하이고 짧아서 사람들이 웃어요.",
      keywords: [
        { word: "self-deprecating", meaningKo: "자기비하의" },
        { word: "short", meaningKo: "짧은" },
      ],
    },
    {
      id: "s6",
      en: "Then I pivot: 'Anyway, what’s your best wrong-turn story?'",
      ko: "그리고 이렇게 전환해요: '아무튼, 너희가 길 잘못 든 얘기 중 최고는 뭐야?'",
      keywords: [
        { word: "pivot", meaningKo: "전환하다" },
        { word: "wrong-turn", meaningKo: "길을 잘못 듦" },
      ],
    },
    {
      id: "s7",
      en: "Now they talk, and I sip my drink like a pro emcee.",
      ko: "이제 그들이 이야기하고, 저는 프로 MC처럼 음료를 마셔요.",
      keywords: [
        { word: "emcee", meaningKo: "사회자" },
        { word: "sip", meaningKo: "조금씩 마시다" },
      ],
    },
    {
      id: "s8",
      en: "If it flops, I just point at the DJ and cheer.",
      ko: "만약 망하면 DJ를 가리키며 환호해요.",
      keywords: [
        { word: "flop", meaningKo: "망하다" },
        { word: "cheer", meaningKo: "환호하다" },
      ],
    },
  ],
};
