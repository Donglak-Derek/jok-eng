import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const countableUncountable: Script = {
  id: "grammar-countable-uncountable",
  title: "Countable vs Uncountable Nouns",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Practice using countable and uncountable nouns. Learn when to use many, much, a few, and a little with natural sentences.",
  sentences: [
    {
      id: "s1",
      en: "I have many books at home.",
      ko: "저는 집에 책이 많이 있어요.",
      keywords: [
        { word: "many", meaningKo: "많은 (셀 수 있는)" },
        { word: "books", meaningKo: "책들" },
      ],
    },
    {
      id: "s2",
      en: "She doesn’t drink much coffee.",
      ko: "그녀는 커피를 많이 안 마셔요.",
      keywords: [
        { word: "much", meaningKo: "많은 (셀 수 없는)" },
        { word: "coffee", meaningKo: "커피" },
      ],
    },
    {
      id: "s3",
      en: "There are a few chairs in the room.",
      ko: "방 안에 의자가 몇 개 있어요.",
      keywords: [
        { word: "a few", meaningKo: "몇 개 (셀 수 있는)" },
        { word: "chairs", meaningKo: "의자들" },
      ],
    },
    {
      id: "s4",
      en: "There is a little water in the bottle.",
      ko: "병에 물이 조금 있어요.",
      keywords: [
        { word: "a little", meaningKo: "조금 (셀 수 없는)" },
        { word: "water", meaningKo: "물" },
      ],
    },
    {
      id: "s5",
      en: "We need many tools for this project.",
      ko: "이 프로젝트에는 도구가 많이 필요해요.",
      keywords: [
        { word: "tools", meaningKo: "도구들" },
        { word: "project", meaningKo: "프로젝트" },
      ],
    },
    {
      id: "s6",
      en: "He doesn’t have much money.",
      ko: "그는 돈이 많지 않아요.",
      keywords: [
        { word: "money", meaningKo: "돈" },
        { word: "much", meaningKo: "많은 (셀 수 없는)" },
      ],
    },
    {
      id: "s7",
      en: "I saw many people at the park.",
      ko: "공원에서 많은 사람들을 봤어요.",
      keywords: [
        { word: "many", meaningKo: "많은 (셀 수 있는)" },
        { word: "people", meaningKo: "사람들" },
      ],
    },
    {
      id: "s8",
      en: "There isn’t much time left.",
      ko: "남은 시간이 많지 않아요.",
      keywords: [
        { word: "time", meaningKo: "시간" },
        { word: "left", meaningKo: "남은" },
      ],
    },
    {
      id: "s9",
      en: "Can I get a few apples?",
      ko: "사과 몇 개 줄 수 있어요?",
      keywords: [
        { word: "a few", meaningKo: "몇 개 (셀 수 있는)" },
        { word: "apples", meaningKo: "사과들" },
      ],
    },
    {
      id: "s10",
      en: "Please give me a little sugar.",
      ko: "설탕을 조금 주세요.",
      keywords: [
        { word: "a little", meaningKo: "조금 (셀 수 없는)" },
        { word: "sugar", meaningKo: "설탕" },
      ],
    },
    {
      id: "s11",
      en: "How many chairs are there?",
      ko: "의자가 몇 개 있어요?",
      keywords: [
        { word: "how many", meaningKo: "몇 개 (셀 수 있는)" },
        { word: "chairs", meaningKo: "의자들" },
      ],
    },
    {
      id: "s12",
      en: "How much rice do you need?",
      ko: "쌀이 얼마나 필요해요?",
      keywords: [
        { word: "how much", meaningKo: "얼마나 많은 (셀 수 없는)" },
        { word: "rice", meaningKo: "쌀" },
      ],
    },
    {
      id: "s13",
      en: "We only have a few minutes before the meeting.",
      ko: "회의 전까지 몇 분밖에 없어요.",
      keywords: [
        { word: "a few", meaningKo: "몇 개 (셀 수 있는)" },
        { word: "minutes", meaningKo: "분" },
      ],
    },
    {
      id: "s14",
      en: "There is a little milk in the fridge.",
      ko: "냉장고에 우유가 조금 있어요.",
      keywords: [
        { word: "a little", meaningKo: "조금 (셀 수 없는)" },
        { word: "milk", meaningKo: "우유" },
      ],
    },
    {
      id: "s15",
      en: "I don’t have many friends in this city.",
      ko: "이 도시에는 친구가 많지 않아요.",
      keywords: [
        { word: "friends", meaningKo: "친구들" },
        { word: "city", meaningKo: "도시" },
      ],
    },
    {
      id: "s16",
      en: "He doesn’t eat much bread.",
      ko: "그는 빵을 많이 안 먹어요.",
      keywords: [
        { word: "bread", meaningKo: "빵" },
        { word: "much", meaningKo: "많은 (셀 수 없는)" },
      ],
    },
  ],
};
