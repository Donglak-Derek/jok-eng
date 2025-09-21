import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const conditionalsPractice: Script = {
  id: "grammar-conditionals",
  title: "Conditionals (If Sentences)",
  categorySlug: "grammar",
  categoryName: CATEGORY_NAMES["grammar"],
  cleanedEnglish:
    "Conditionals are 'if sentences.' They help you talk about facts, plans, and imagination. Practice zero, first, and second conditionals for daily and work situations.",
  sentences: [
    {
      id: "s1",
      en: "If you heat water, it boils.",
      ko: "물을 데우면 끓어요.",
      keywords: [
        { word: "heat", meaningKo: "데우다" },
        { word: "boil", meaningKo: "끓다" },
      ],
    },
    {
      id: "s2",
      en: "If people don’t eat, they get hungry.",
      ko: "사람들이 안 먹으면 배고파져요.",
      keywords: [
        { word: "hungry", meaningKo: "배고픈" },
        { word: "eat", meaningKo: "먹다" },
      ],
    },
    {
      id: "s3",
      en: "If you drop a glass, it breaks.",
      ko: "유리를 떨어뜨리면 깨져요.",
      keywords: [
        { word: "drop", meaningKo: "떨어뜨리다" },
        { word: "break", meaningKo: "깨지다" },
      ],
    },
    {
      id: "s4",
      en: "If I study, I will improve.",
      ko: "제가 공부하면, 실력이 좋아질 거예요.",
      keywords: [
        { word: "study", meaningKo: "공부하다" },
        { word: "improve", meaningKo: "향상되다" },
      ],
    },
    {
      id: "s5",
      en: "If it rains tomorrow, I will stay home.",
      ko: "내일 비가 오면, 집에 있을 거예요.",
      keywords: [
        { word: "rain", meaningKo: "비 오다" },
        { word: "stay home", meaningKo: "집에 있다" },
      ],
    },
    {
      id: "s6",
      en: "If I work hard, I will get better results.",
      ko: "열심히 일하면, 더 좋은 결과를 얻을 거예요.",
      keywords: [
        { word: "work hard", meaningKo: "열심히 일하다" },
        { word: "results", meaningKo: "결과" },
      ],
    },
    {
      id: "s7",
      en: "If I had more time, I would make videos.",
      ko: "시간이 더 있다면, 영상을 만들 텐데요.",
      keywords: [
        { word: "had time", meaningKo: "시간이 있다" },
        { word: "make videos", meaningKo: "영상 만들다" },
      ],
    },
    {
      id: "s8",
      en: "If I were rich, I would travel the world.",
      ko: "제가 부자라면, 세계 여행을 할 거예요.",
      keywords: [
        { word: "rich", meaningKo: "부자" },
        { word: "travel", meaningKo: "여행하다" },
      ],
    },
    {
      id: "s9",
      en: "If I spoke English perfectly, I would feel more confident.",
      ko: "영어를 완벽하게 말한다면, 더 자신감을 느낄 거예요.",
      keywords: [
        { word: "perfectly", meaningKo: "완벽하게" },
        { word: "confident", meaningKo: "자신감 있는" },
      ],
    },
    {
      id: "s10",
      en: "If I had a bigger kitchen, I would cook every day.",
      ko: "더 큰 부엌이 있다면, 매일 요리할 거예요.",
      keywords: [
        { word: "kitchen", meaningKo: "부엌" },
        { word: "cook", meaningKo: "요리하다" },
      ],
    },
  ],
};
