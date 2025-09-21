import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const foodAndEating: Script = {
  id: "everyday-food-and-eating",
  title: "Food and Eating",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Practice sentences for ordering food, talking about meals, and sharing food preferences in daily life.",
  sentences: [
    {
      id: "s1",
      en: "I’ll have coffee and a sandwich.",
      ko: "저는 커피랑 샌드위치 할게요.",
      keywords: [
        { word: "coffee", meaningKo: "커피" },
        { word: "sandwich", meaningKo: "샌드위치" },
      ],
    },
    {
      id: "s2",
      en: "Can I see the menu, please?",
      ko: "메뉴 좀 볼 수 있을까요?",
      keywords: [
        { word: "menu", meaningKo: "메뉴" },
        { word: "please", meaningKo: "제발/부탁합니다" },
      ],
    },
    {
      id: "s3",
      en: "What do you recommend?",
      ko: "뭐 추천하시나요?",
      keywords: [
        { word: "recommend", meaningKo: "추천하다" },
        { word: "what", meaningKo: "무엇" },
      ],
    },
    {
      id: "s4",
      en: "I’d like a bowl of soup and some bread.",
      ko: "수프 한 그릇이랑 빵 좀 주세요.",
      keywords: [
        { word: "bowl", meaningKo: "그릇" },
        { word: "soup", meaningKo: "수프" },
      ],
    },
    {
      id: "s5",
      en: "Is this dish spicy?",
      ko: "이 음식 매워요?",
      keywords: [
        { word: "dish", meaningKo: "요리" },
        { word: "spicy", meaningKo: "매운" },
      ],
    },
    {
      id: "s6",
      en: "Can I get this without cheese?",
      ko: "치즈 빼고 해주실 수 있나요?",
      keywords: [
        { word: "without", meaningKo: "없이" },
        { word: "cheese", meaningKo: "치즈" },
      ],
    },
    {
      id: "s7",
      en: "I’ll take it to go.",
      ko: "테이크아웃으로 할게요.",
      keywords: [
        { word: "to go", meaningKo: "포장" },
        { word: "take", meaningKo: "가져가다" },
      ],
    },
    {
      id: "s8",
      en: "Can we have the bill, please?",
      ko: "계산서 주시겠어요?",
      keywords: [
        { word: "bill", meaningKo: "계산서" },
        { word: "please", meaningKo: "부탁합니다" },
      ],
    },
    {
      id: "s9",
      en: "What’s your favorite food?",
      ko: "당신이 제일 좋아하는 음식은 뭐예요?",
      keywords: [
        { word: "favorite", meaningKo: "제일 좋아하는" },
        { word: "food", meaningKo: "음식" },
      ],
    },
    {
      id: "s10",
      en: "My favorite meal is fried chicken and rice.",
      ko: "제가 제일 좋아하는 식사는 치킨이랑 밥이에요.",
      keywords: [
        { word: "meal", meaningKo: "식사" },
        { word: "fried chicken", meaningKo: "치킨" },
      ],
    },
    {
      id: "s11",
      en: "I usually eat cereal for breakfast.",
      ko: "저는 보통 아침으로 시리얼을 먹어요.",
      keywords: [
        { word: "usually", meaningKo: "보통" },
        { word: "breakfast", meaningKo: "아침 식사" },
      ],
    },
    {
      id: "s12",
      en: "For lunch, I had a salad and some fruit.",
      ko: "점심으로 샐러드랑 과일을 먹었어요.",
      keywords: [
        { word: "lunch", meaningKo: "점심" },
        { word: "salad", meaningKo: "샐러드" },
      ],
    },
    {
      id: "s13",
      en: "Let’s eat dinner together tonight.",
      ko: "오늘 저녁 같이 먹어요.",
      keywords: [
        { word: "dinner", meaningKo: "저녁" },
        { word: "together", meaningKo: "같이" },
      ],
    },
    {
      id: "s14",
      en: "I’m hungry. Let’s order something.",
      ko: "배고파요. 뭐 시켜 먹어요.",
      keywords: [
        { word: "hungry", meaningKo: "배고픈" },
        { word: "order", meaningKo: "주문하다" },
      ],
    },
    {
      id: "s15",
      en: "This tastes really good!",
      ko: "이거 정말 맛있어요!",
      keywords: [
        { word: "taste", meaningKo: "맛" },
        { word: "good", meaningKo: "좋은/맛있는" },
      ],
    },
  ],
};
