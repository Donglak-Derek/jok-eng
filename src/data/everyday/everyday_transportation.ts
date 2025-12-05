import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const transportation: Script = {
  id: "everyday-transportation",
  title: "Uber & Taxi Banter",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Light lines for rideshares—fast small talk that makes you sound friendly without oversharing.",
  sentences: [
    {
      id: "s1",
      en: "Hey, thanks for picking me up—how's your day going?",
      ko: "태워주셔서 감사해요—오늘 하루 어떠세요?",
      keywords: [
        { word: "pick up", meaningKo: "태우다" },
        { word: "how's your day", meaningKo: "오늘 하루 어때요?" },
      ],
    },
    {
      id: "s2",
      en: "Traffic is wild today, right?",
      ko: "오늘 교통 장난 아니죠?",
      keywords: [
        { word: "traffic", meaningKo: "교통" },
        { word: "wild", meaningKo: "장난 아닌" },
      ],
    },
    {
      id: "s3",
      en: "If there's a faster route, I'm all for it.",
      ko: "더 빠른 길이 있으면 저는 언제나 환영이에요.",
      keywords: [
        { word: "route", meaningKo: "길, 경로" },
        { word: "all for it", meaningKo: "찬성이다" },
      ],
    },
    {
      id: "s4",
      en: "I’m headed to a friend's thing—trying not to be late.",
      ko: "친구 모임 가는 길이에요—늦지 않으려고요.",
      keywords: [
        { word: "headed to", meaningKo: "~로 가는 중" },
        { word: "late", meaningKo: "늦은" },
      ],
    },
    {
      id: "s5",
      en: "Mind if I crack a window just a bit?",
      ko: "창문 조금만 열어도 될까요?",
      keywords: [
        { word: "mind if", meaningKo: "~해도 될까요" },
        { word: "crack a window", meaningKo: "창문을 조금 열다" },
      ],
    },
    {
      id: "s6",
      en: "Thanks for the smooth driving—feels like a bonus nap zone.",
      ko: "부드럽게 운전해 주셔서 감사해요—보너스 낮잠 구역 같네요.",
      keywords: [
        { word: "smooth", meaningKo: "부드러운" },
        { word: "bonus", meaningKo: "보너스" },
      ],
    },
    {
      id: "s7",
      en: "By the way, do you have a favorite podcast or playlist for rides?",
      ko: "그나저나, 운전할 때 좋아하는 팟캐스트나 플레이리스트 있어요?",
      keywords: [
        { word: "podcast", meaningKo: "팟캐스트" },
        { word: "playlist", meaningKo: "재생 목록" },
      ],
    },
    {
      id: "s8",
      en: "This is my stop—thanks and have a chill shift!",
      ko: "여기가 제 목적지예요—감사하고 편한 근무 되세요!",
      keywords: [
        { word: "stop", meaningKo: "목적지" },
        { word: "shift", meaningKo: "근무" },
      ],
    },
  ],
};
