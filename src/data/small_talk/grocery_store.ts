import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const groceryStore: Script = {
  id: "everyday-grocery-store",
  title: "At the Grocery Store",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "A quick trip becomes a language workout: finding items, asking staff, and resisting the snack aisle.",
  sentences: [
    {
      id: "s1",
      en: "I grabbed a basket at the entrance.",
      ko: "입구에서 바구니를 집었어요.",
      keywords: [
        { word: "basket", meaningKo: "바구니" },
        { word: "entrance", meaningKo: "입구" },
      ],
    },
    {
      id: "s2",
      en: "Excuse me, where is the bread?",
      ko: "실례합니다, 빵은 어디에 있어요?",
      keywords: [
        { word: "excuse me", meaningKo: "실례합니다" },
        { word: "bread", meaningKo: "빵" },
      ],
    },
    {
      id: "s3",
      en: "It's on aisle seven, next to milk.",
      ko: "7번 통로에 있어요, 우유 옆이에요.",
      keywords: [
        { word: "aisle", meaningKo: "통로" },
        { word: "next to", meaningKo: "옆에" },
      ],
    },
    {
      id: "s4",
      en: "I compared prices and picked a loaf.",
      ko: "가격을 비교하고 식빵을 골랐어요.",
      keywords: [
        { word: "compare", meaningKo: "비교하다" },
        { word: "loaf", meaningKo: "식빵 한 덩이" },
      ],
    },
    {
      id: "s5",
      en: "The snack aisle tried to tempt me.",
      ko: "간식 코너가 저를 유혹했어요.",
      keywords: [
        { word: "snack", meaningKo: "간식" },
        { word: "tempt", meaningKo: "유혹하다" },
      ],
    },
    {
      id: "s6",
      en: "I waved at the free samples.",
      ko: "무료 시식 코너에 손을 흔들었어요.",
      keywords: [{ word: "free sample", meaningKo: "무료 시식" }],
    },
    {
      id: "s7",
      en: "At checkout, I said, 'Card, please.'",
      ko: "계산대에서 '카드로 할게요'라고 말했어요.",
      keywords: [
        { word: "checkout", meaningKo: "계산대" },
        { word: "card", meaningKo: "카드" },
      ],
    },
    {
      id: "s8",
      en: "The receipt was longer than my list.",
      ko: "영수증이 제 목록보다 길었어요.",
      keywords: [
        { word: "receipt", meaningKo: "영수증" },
        { word: "list", meaningKo: "목록" },
      ],
    },
  ],
};
