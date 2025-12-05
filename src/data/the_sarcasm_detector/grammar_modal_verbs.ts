import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const modalVerbsPractice: Script = {
  id: "grammar-modal-verbs",
  title: "Modal Verbs Practice",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Modal verbs like can, could, would, should, and might help you sound polite, flexible, and professional in English. Practice them with many examples.",
  sentences: [
    {
      id: "s1",
      en: "I can fix it.",
      ko: "제가 고칠 수 있어요.",
      keywords: [
        { word: "can", meaningKo: "할 수 있다" },
        { word: "fix", meaningKo: "고치다" },
      ],
    },
    {
      id: "s2",
      en: "She can speak Korean.",
      ko: "그녀는 한국어를 말할 수 있어요.",
      keywords: [
        { word: "speak", meaningKo: "말하다" },
        { word: "Korean", meaningKo: "한국어" },
      ],
    },
    {
      id: "s3",
      en: "We can meet tomorrow.",
      ko: "우리는 내일 만날 수 있어요.",
      keywords: [
        { word: "meet", meaningKo: "만나다" },
        { word: "tomorrow", meaningKo: "내일" },
      ],
    },
    {
      id: "s4",
      en: "Could you help me?",
      ko: "저 좀 도와주실 수 있나요?",
      keywords: [
        { word: "could", meaningKo: "할 수 있다(공손)" },
        { word: "help", meaningKo: "돕다" },
      ],
    },
    {
      id: "s5",
      en: "I could call him later.",
      ko: "나중에 그에게 전화할 수도 있어요.",
      keywords: [
        { word: "call", meaningKo: "전화하다" },
        { word: "later", meaningKo: "나중에" },
      ],
    },
    {
      id: "s6",
      en: "We could go for a walk.",
      ko: "산책을 갈 수도 있어요.",
      keywords: [
        { word: "go for a walk", meaningKo: "산책하다" },
        { word: "could", meaningKo: "할 수도 있다" },
      ],
    },
    {
      id: "s7",
      en: "I would like some coffee.",
      ko: "커피 좀 마시고 싶어요.",
      keywords: [
        { word: "would like", meaningKo: "~하고 싶다" },
        { word: "coffee", meaningKo: "커피" },
      ],
    },
    {
      id: "s8",
      en: "He would help if he were here.",
      ko: "그가 여기 있다면 도와줄 거예요.",
      keywords: [
        { word: "would", meaningKo: "~할 것이다" },
        { word: "if", meaningKo: "만약" },
      ],
    },
    {
      id: "s9",
      en: "I would travel more if I had time.",
      ko: "시간이 있으면 더 여행할 텐데요.",
      keywords: [
        { word: "travel", meaningKo: "여행하다" },
        { word: "if I had time", meaningKo: "시간이 있다면" },
      ],
    },
    {
      id: "s10",
      en: "You should practice more.",
      ko: "더 연습하는 게 좋아요.",
      keywords: [
        { word: "should", meaningKo: "~하는 게 좋다" },
        { word: "practice", meaningKo: "연습하다" },
      ],
    },
    {
      id: "s11",
      en: "He should study tonight.",
      ko: "그는 오늘 밤 공부해야 해요.",
      keywords: [
        { word: "study", meaningKo: "공부하다" },
        { word: "tonight", meaningKo: "오늘 밤" },
      ],
    },
    {
      id: "s12",
      en: "We should leave early.",
      ko: "우리는 일찍 떠나는 게 좋아요.",
      keywords: [
        { word: "leave early", meaningKo: "일찍 떠나다" },
        { word: "should", meaningKo: "하는 게 좋다" },
      ],
    },
    {
      id: "s13",
      en: "It might rain today.",
      ko: "오늘 비가 올 수도 있어요.",
      keywords: [
        { word: "might", meaningKo: "~일지도 모른다" },
        { word: "rain", meaningKo: "비 오다" },
      ],
    },
    {
      id: "s14",
      en: "She might be late.",
      ko: "그녀는 늦을 수도 있어요.",
      keywords: [
        { word: "late", meaningKo: "늦은" },
        { word: "might", meaningKo: "할 수도 있다" },
      ],
    },
    {
      id: "s15",
      en: "I might go to the party.",
      ko: "저는 파티에 갈 수도 있어요.",
      keywords: [
        { word: "party", meaningKo: "파티" },
        { word: "go", meaningKo: "가다" },
      ],
    },
  ],
};
