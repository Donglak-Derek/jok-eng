import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const shoppingAndMoney: Script = {
  id: "everyday-shopping-money",
  title: "Shopping and Money",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Practice shopping conversations in English. Learn how to ask about prices, buy items, and pay politely.",
  sentences: [
    {
      id: "s1",
      en: "How much is this chair?",
      ko: "이 의자는 얼마예요?",
      keywords: [
        { word: "how much", meaningKo: "얼마" },
        { word: "chair", meaningKo: "의자" },
      ],
    },
    {
      id: "s2",
      en: "Can I pay with a card?",
      ko: "카드로 계산할 수 있어요?",
      keywords: [
        { word: "pay", meaningKo: "지불하다" },
        { word: "card", meaningKo: "카드" },
      ],
    },
    {
      id: "s3",
      en: "Do you take cash?",
      ko: "현금 받으세요?",
      keywords: [
        { word: "cash", meaningKo: "현금" },
        { word: "take", meaningKo: "받다" },
      ],
    },
    {
      id: "s4",
      en: "This table is too expensive.",
      ko: "이 테이블은 너무 비싸요.",
      keywords: [
        { word: "expensive", meaningKo: "비싼" },
        { word: "table", meaningKo: "테이블" },
      ],
    },
    {
      id: "s5",
      en: "Do you have a cheaper one?",
      ko: "더 싼 거 있어요?",
      keywords: [
        { word: "cheaper", meaningKo: "더 싼" },
        { word: "have", meaningKo: "가지다" },
      ],
    },
    {
      id: "s6",
      en: "I’ll take this one, please.",
      ko: "이거로 할게요.",
      keywords: [
        { word: "take", meaningKo: "사다" },
        { word: "please", meaningKo: "부탁합니다" },
      ],
    },
    {
      id: "s7",
      en: "Can I get a receipt?",
      ko: "영수증 받을 수 있을까요?",
      keywords: [
        { word: "receipt", meaningKo: "영수증" },
        { word: "get", meaningKo: "받다" },
      ],
    },
    {
      id: "s8",
      en: "Do you have this in another color?",
      ko: "이거 다른 색도 있나요?",
      keywords: [
        { word: "color", meaningKo: "색" },
        { word: "another", meaningKo: "다른" },
      ],
    },
    {
      id: "s9",
      en: "Can I try it on?",
      ko: "이거 입어 봐도 돼요?",
      keywords: [
        { word: "try on", meaningKo: "입어보다" },
        { word: "it", meaningKo: "그것" },
      ],
    },
    {
      id: "s10",
      en: "Do you have this in size large?",
      ko: "이거 큰 사이즈 있나요?",
      keywords: [
        { word: "size", meaningKo: "사이즈" },
        { word: "large", meaningKo: "큰" },
      ],
    },
    {
      id: "s11",
      en: "That’s too small for me.",
      ko: "그건 저한테 너무 작아요.",
      keywords: [
        { word: "small", meaningKo: "작은" },
        { word: "too", meaningKo: "너무" },
      ],
    },
    {
      id: "s12",
      en: "Do you have a discount on this?",
      ko: "이거 할인 있나요?",
      keywords: [
        { word: "discount", meaningKo: "할인" },
        { word: "this", meaningKo: "이것" },
      ],
    },
    {
      id: "s13",
      en: "Can I return this if it doesn’t fit?",
      ko: "안 맞으면 이거 반품할 수 있나요?",
      keywords: [
        { word: "return", meaningKo: "반품하다" },
        { word: "fit", meaningKo: "맞다" },
      ],
    },
    {
      id: "s14",
      en: "Where is the checkout counter?",
      ko: "계산대는 어디예요?",
      keywords: [
        { word: "checkout", meaningKo: "계산" },
        { word: "counter", meaningKo: "카운터" },
      ],
    },
    {
      id: "s15",
      en: "Can I pay separately?",
      ko: "따로따로 계산할 수 있을까요?",
      keywords: [
        { word: "separately", meaningKo: "따로따로" },
        { word: "pay", meaningKo: "지불하다" },
      ],
    },
  ],
};
