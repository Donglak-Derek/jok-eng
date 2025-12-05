import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const explainingProblems: Script = {
  id: "everyday-explaining-problems",
  title: "Explaining Problems",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Learn how to report issues clearly in work or daily life. These sentences help you explain what’s wrong and what needs to be done.",
  sentences: [
    {
      id: "s1",
      en: "This part is missing. We need to order it.",
      ko: "이 부품이 없어요. 주문해야 해요.",
      keywords: [
        { word: "missing", meaningKo: "없는" },
        { word: "order", meaningKo: "주문하다" },
      ],
    },
    {
      id: "s2",
      en: "The table is broken. We can’t use it.",
      ko: "이 테이블이 부서졌어요. 사용할 수 없어요.",
      keywords: [
        { word: "broken", meaningKo: "부서진" },
        { word: "use", meaningKo: "사용하다" },
      ],
    },
    {
      id: "s3",
      en: "The instructions are not clear.",
      ko: "설명서가 명확하지 않아요.",
      keywords: [
        { word: "instructions", meaningKo: "설명서" },
        { word: "clear", meaningKo: "명확한" },
      ],
    },
    {
      id: "s4",
      en: "This screw is too short.",
      ko: "이 나사가 너무 짧아요.",
      keywords: [
        { word: "screw", meaningKo: "나사" },
        { word: "short", meaningKo: "짧은" },
      ],
    },
    {
      id: "s5",
      en: "The shelf is not stable. It shakes when I touch it.",
      ko: "이 선반이 안정적이지 않아요. 만지면 흔들려요.",
      keywords: [
        { word: "shelf", meaningKo: "선반" },
        { word: "stable", meaningKo: "안정적인" },
      ],
    },
    {
      id: "s6",
      en: "We are missing two pieces from the box.",
      ko: "상자에서 두 개의 부품이 없어요.",
      keywords: [
        { word: "pieces", meaningKo: "부품" },
        { word: "box", meaningKo: "상자" },
      ],
    },
    {
      id: "s7",
      en: "The paint is scratched on the surface.",
      ko: "표면에 페인트가 긁혔어요.",
      keywords: [
        { word: "paint", meaningKo: "페인트" },
        { word: "surface", meaningKo: "표면" },
      ],
    },
    {
      id: "s8",
      en: "The package arrived damaged.",
      ko: "포장이 손상된 채로 도착했어요.",
      keywords: [
        { word: "package", meaningKo: "포장" },
        { word: "damaged", meaningKo: "손상된" },
      ],
    },
    {
      id: "s9",
      en: "The drawer doesn’t open smoothly.",
      ko: "서랍이 부드럽게 열리지 않아요.",
      keywords: [
        { word: "drawer", meaningKo: "서랍" },
        { word: "smoothly", meaningKo: "부드럽게" },
      ],
    },
    {
      id: "s10",
      en: "The light is flickering. It needs to be fixed.",
      ko: "불이 깜빡여요. 고쳐야 해요.",
      keywords: [
        { word: "flickering", meaningKo: "깜빡이는" },
        { word: "fixed", meaningKo: "고치다" },
      ],
    },
    {
      id: "s11",
      en: "The part does not match the instructions.",
      ko: "부품이 설명서와 맞지 않아요.",
      keywords: [
        { word: "match", meaningKo: "맞다" },
        { word: "instructions", meaningKo: "설명서" },
      ],
    },
    {
      id: "s12",
      en: "There is a crack in the glass.",
      ko: "유리에 금이 갔어요.",
      keywords: [
        { word: "crack", meaningKo: "금" },
        { word: "glass", meaningKo: "유리" },
      ],
    },
    {
      id: "s13",
      en: "The box is heavy. I need help to move it.",
      ko: "상자가 무거워요. 옮기려면 도움이 필요해요.",
      keywords: [
        { word: "heavy", meaningKo: "무거운" },
        { word: "move", meaningKo: "옮기다" },
      ],
    },
    {
      id: "s14",
      en: "The handle is loose. It might fall off.",
      ko: "손잡이가 헐거워요. 떨어질 수도 있어요.",
      keywords: [
        { word: "handle", meaningKo: "손잡이" },
        { word: "loose", meaningKo: "헐거운" },
      ],
    },
    {
      id: "s15",
      en: "Something is missing, but I don’t know what it is.",
      ko: "뭔가 빠졌는데, 뭔지 모르겠어요.",
      keywords: [
        { word: "missing", meaningKo: "빠진" },
        { word: "something", meaningKo: "무언가" },
      ],
    },
  ],
};
