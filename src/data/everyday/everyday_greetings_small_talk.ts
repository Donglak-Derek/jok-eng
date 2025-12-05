import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const greetingsSmallTalk: Script = {
  id: "everyday-greetings-small-talk",
  title: "Elevator Armor",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Small talk that buys you 60 seconds in an elevator, hallway, or lobby—friendly, light, and easy to exit.",
  sentences: [
    {
      id: "s1",
      en: "Hey! Made it before the coffee disappears.",
      ko: "안녕하세요! 커피 사라지기 전에 도착했네요.",
      keywords: [
        { word: "made it", meaningKo: "도착했다" },
        { word: "disappears", meaningKo: "사라지다" },
      ],
    },
    {
      id: "s2",
      en: "How's your day treating you so far?",
      ko: "오늘 하루 지금까지 어때요?",
      keywords: [
        { word: "treating you", meaningKo: "대하다, 어떠니" },
        { word: "so far", meaningKo: "지금까지" },
      ],
    },
    {
      id: "s3",
      en: "Nice to see you—surviving the week?",
      ko: "반가워요—이번 주 버티고 있나요?",
      keywords: [
        { word: "surviving", meaningKo: "버티는 중" },
        { word: "week", meaningKo: "한 주" },
      ],
    },
    {
      id: "s4",
      en: "That weather is doing stand-up comedy today—sunny then dramatic.",
      ko: "오늘 날씨가 스탠드업하네요—맑다가 드라마틱해요.",
      keywords: [
        { word: "stand-up", meaningKo: "스탠드업 코미디" },
        { word: "dramatic", meaningKo: "극적인" },
      ],
    },
    {
      id: "s5",
      en: "Any fun plans after work or just couch-hero mode?",
      ko: "퇴근 후 재밌는 계획 있어요, 아니면 소파 히어로 모드인가요?",
      keywords: [
        { word: "plans", meaningKo: "계획" },
        { word: "couch", meaningKo: "소파" },
      ],
    },
    {
      id: "s6",
      en: "I’m on my third coffee—wish me luck.",
      ko: "커피 세 잔째예요—행운을 빌어주세요.",
      keywords: [
        { word: "third", meaningKo: "세 번째" },
        { word: "wish me luck", meaningKo: "행운을 빌어줘" },
      ],
    },
    {
      id: "s7",
      en: "If you need the good snacks, they’re hiding in the second drawer.",
      ko: "좋은 간식 필요하면, 두 번째 서랍에 숨어 있어요.",
      keywords: [
        { word: "snack", meaningKo: "간식" },
        { word: "drawer", meaningKo: "서랍" },
      ],
    },
    {
      id: "s8",
      en: "Okay, this is your floor—have a good one!",
      ko: "자, 여기 당신 층이에요—좋은 하루요!",
      keywords: [
        { word: "floor", meaningKo: "층" },
        { word: "have a good one", meaningKo: "좋은 하루 보내" },
      ],
    },
  ],
};
