import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const shoppingAndMoney: Script = {
  id: "everyday-shopping-money",
  title: "Coffee Line Chit-Chat",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Friendly lines for ordering coffee and joking about prices without sounding rude.",
  sentences: [
    {
      id: "s1",
      en: "Hi! Can I get an iced latte, medium?",
      ko: "안녕하세요! 아이스 라떼 미디엄 하나 주세요.",
      keywords: [
        { word: "iced latte", meaningKo: "아이스 라떼" },
        { word: "medium", meaningKo: "중간 사이즈" },
      ],
    },
    {
      id: "s2",
      en: "Could you make it a little less sweet?",
      ko: "조금 덜 달게 해주실 수 있나요?",
      keywords: [
        { word: "less sweet", meaningKo: "덜 달게" },
        { word: "make it", meaningKo: "~하게 해주다" },
      ],
    },
    {
      id: "s3",
      en: "Is it okay to tap here, or do I need to sign?",
      ko: "여기서 터치 결제하면 될까요, 아니면 사인해야 하나요?",
      keywords: [
        { word: "tap", meaningKo: "터치 결제하다" },
        { word: "sign", meaningKo: "사인하다" },
      ],
    },
    {
      id: "s4",
      en: "Wow, coffee got fancy—does this come with a free life coach?",
      ko: "와, 커피가 고급졌네요—이거 사면 무료 인생 코치도 따라오나요?",
      keywords: [
        { word: "fancy", meaningKo: "고급진" },
        { word: "life coach", meaningKo: "인생 코치" },
      ],
    },
    {
      id: "s5",
      en: "Is there a loyalty card or should I start a punch card of tears?",
      ko: "멤버십 카드 있나요, 아니면 눈물 펀치카드 시작할까요?",
      keywords: [
        { word: "loyalty card", meaningKo: "멤버십 카드" },
        { word: "punch card", meaningKo: "도장 카드" },
      ],
    },
    {
      id: "s6",
      en: "I’ll grab a croissant too—why not live boldly.",
      ko: "크루아상도 하나 주세요—대담하게 살아야죠.",
      keywords: [
        { word: "grab", meaningKo: "집다/사다" },
        { word: "boldly", meaningKo: "대담하게" },
      ],
    },
    {
      id: "s7",
      en: "Could I get a receipt? My budget likes to see evidence.",
      ko: "영수증 받을 수 있을까요? 제 예산이 증거를 좋아해요.",
      keywords: [
        { word: "receipt", meaningKo: "영수증" },
        { word: "get", meaningKo: "받다" },
      ],
    },
    {
      id: "s8",
      en: "Name's Derek—thanks! Hope the line stays calm for you.",
      ko: "저는 데렉이에요—감사합니다! 줄이 평화롭길 바랄게요.",
      keywords: [
        { word: "line", meaningKo: "줄" },
        { word: "stay calm", meaningKo: "평화롭다" },
      ],
    },
  ],
};
