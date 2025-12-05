import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const customerServiceBasics: Script = {
  id: "everyday-customer-service-basics",
  title: "Customer Service Basics",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Useful phrases for helping customers politely and clearly. These sentences focus on giving directions, explaining items, and offering help.",
  sentences: [
    {
      id: "s1",
      en: "Hello, can I help you find something?",
      ko: "안녕하세요, 찾으시는 것 도와드릴까요?",
      keywords: [
        { word: "help", meaningKo: "도와주다" },
        { word: "find", meaningKo: "찾다" },
      ],
    },
    {
      id: "s2",
      en: "That item is in aisle 5, bin 12.",
      ko: "그 물건은 5번 통로, 12번 칸에 있어요.",
      keywords: [
        { word: "aisle", meaningKo: "통로" },
        { word: "bin", meaningKo: "칸" },
      ],
    },
    {
      id: "s3",
      en: "This product is out of stock right now.",
      ko: "이 제품은 지금 재고가 없어요.",
      keywords: [
        { word: "product", meaningKo: "제품" },
        { word: "out of stock", meaningKo: "품절" },
      ],
    },
    {
      id: "s4",
      en: "You can order it online.",
      ko: "온라인으로 주문하실 수 있어요.",
      keywords: [
        { word: "order", meaningKo: "주문하다" },
        { word: "online", meaningKo: "온라인" },
      ],
    },
    {
      id: "s5",
      en: "Please wait here for a moment.",
      ko: "잠시만 여기에서 기다려 주세요.",
      keywords: [
        { word: "wait", meaningKo: "기다리다" },
        { word: "moment", meaningKo: "잠시" },
      ],
    },
    {
      id: "s6",
      en: "I will check the stock for you.",
      ko: "재고를 확인해 드릴게요.",
      keywords: [
        { word: "check", meaningKo: "확인하다" },
        { word: "stock", meaningKo: "재고" },
      ],
    },
    {
      id: "s7",
      en: "This item comes in different colors.",
      ko: "이 물건은 다른 색상도 있어요.",
      keywords: [
        { word: "different", meaningKo: "다른" },
        { word: "colors", meaningKo: "색상" },
      ],
    },
    {
      id: "s8",
      en: "Would you like me to show you?",
      ko: "제가 보여드릴까요?",
      keywords: [
        { word: "show", meaningKo: "보여주다" },
        { word: "would you like", meaningKo: "…하시겠어요?" },
      ],
    },
    {
      id: "s9",
      en: "The return desk is over there.",
      ko: "반품 데스크는 저쪽에 있어요.",
      keywords: [
        { word: "return", meaningKo: "반품" },
        { word: "desk", meaningKo: "데스크" },
      ],
    },
    {
      id: "s10",
      en: "You need the receipt to return this item.",
      ko: "이 물건을 반품하려면 영수증이 필요해요.",
      keywords: [
        { word: "receipt", meaningKo: "영수증" },
        { word: "return", meaningKo: "반품하다" },
      ],
    },
    {
      id: "s11",
      en: "I can call someone to help you.",
      ko: "도와드릴 사람을 불러드릴게요.",
      keywords: [
        { word: "call", meaningKo: "부르다" },
        { word: "someone", meaningKo: "누군가" },
      ],
    },
    {
      id: "s12",
      en: "Please follow me, I’ll show you the way.",
      ko: "저를 따라오세요, 길을 알려드릴게요.",
      keywords: [
        { word: "follow", meaningKo: "따라가다" },
        { word: "way", meaningKo: "길" },
      ],
    },
    {
      id: "s13",
      en: "The assembly instructions are inside the box.",
      ko: "조립 설명서는 박스 안에 있어요.",
      keywords: [
        { word: "assembly", meaningKo: "조립" },
        { word: "instructions", meaningKo: "설명서" },
      ],
    },
    {
      id: "s14",
      en: "This item is heavy, let me get a cart for you.",
      ko: "이 물건은 무거우니까 카트를 가져다드릴게요.",
      keywords: [
        { word: "heavy", meaningKo: "무거운" },
        { word: "cart", meaningKo: "카트" },
      ],
    },
    {
      id: "s15",
      en: "Thank you for waiting.",
      ko: "기다려 주셔서 감사합니다.",
      keywords: [
        { word: "thank you", meaningKo: "감사합니다" },
        { word: "waiting", meaningKo: "기다림" },
      ],
    },
  ],
};
