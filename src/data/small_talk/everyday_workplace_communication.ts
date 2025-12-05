import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const workplaceCommunication: Script = {
  id: "everyday-workplace-communication",
  title: "Workplace Communication",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Simple sentences for asking help, giving updates, and saying you finished something at work.",
  sentences: [
    {
      id: "s1",
      en: "Can you help me with this?",
      ko: "이거 도와주실 수 있어요?",
      keywords: [
        { word: "help", meaningKo: "도와주다" },
        { word: "with", meaningKo: "~와 함께" },
      ],
    },
    {
      id: "s2",
      en: "I finished the build.",
      ko: "조립을 끝냈어요.",
      keywords: [
        { word: "finished", meaningKo: "끝냈다" },
        { word: "build", meaningKo: "조립" },
      ],
    },
    {
      id: "s3",
      en: "Do you need me for the next task?",
      ko: "다음 일에 제가 필요해요?",
      keywords: [
        { word: "next", meaningKo: "다음" },
        { word: "task", meaningKo: "일, 업무" },
      ],
    },
    {
      id: "s4",
      en: "Can I take this to the shopkeeper?",
      ko: "이걸 매니저한테 가져가도 될까요?",
      keywords: [
        { word: "take", meaningKo: "가져가다" },
        { word: "shopkeeper", meaningKo: "매니저, 책임자" },
      ],
    },
    {
      id: "s5",
      en: "The part is missing.",
      ko: "부품이 없어졌어요.",
      keywords: [
        { word: "part", meaningKo: "부품" },
        { word: "missing", meaningKo: "없어진" },
      ],
    },
    {
      id: "s6",
      en: "I already checked the instructions.",
      ko: "설명서는 이미 확인했어요.",
      keywords: [
        { word: "checked", meaningKo: "확인했다" },
        { word: "instructions", meaningKo: "설명서" },
      ],
    },
    {
      id: "s7",
      en: "Should I move this to the display?",
      ko: "이걸 진열대로 옮길까요?",
      keywords: [
        { word: "move", meaningKo: "옮기다" },
        { word: "display", meaningKo: "진열대" },
      ],
    },
    {
      id: "s8",
      en: "I will start the next project now.",
      ko: "지금 다음 프로젝트를 시작할게요.",
      keywords: [
        { word: "start", meaningKo: "시작하다" },
        { word: "project", meaningKo: "프로젝트" },
      ],
    },
    {
      id: "s9",
      en: "Do you want me to fix this?",
      ko: "이거 제가 고칠까요?",
      keywords: [
        { word: "fix", meaningKo: "고치다" },
        { word: "want", meaningKo: "원하다" },
      ],
    },
    {
      id: "s10",
      en: "Everything is ready now.",
      ko: "이제 모든 게 준비됐어요.",
      keywords: [
        { word: "everything", meaningKo: "모든 것" },
        { word: "ready", meaningKo: "준비된" },
      ],
    },
    {
      id: "s11",
      en: "Can I take a short break?",
      ko: "잠깐 쉬어도 될까요?",
      keywords: [
        { word: "short", meaningKo: "짧은" },
        { word: "break", meaningKo: "휴식" },
      ],
    },
    {
      id: "s12",
      en: "Let me know if you need me.",
      ko: "필요하면 알려주세요.",
      keywords: [
        { word: "let me know", meaningKo: "알려주다" },
        { word: "need", meaningKo: "필요하다" },
      ],
    },
  ],
};
