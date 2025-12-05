import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const gymSmallTalk: Script = {
  id: "everyday-gym-small-talk",
  title: "Gym Small Talk",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "We talk about reps, rest, and reality: pretending the treadmill isn't judging us.",
  sentences: [
    {
      id: "s1",
      en: "Hey, are you using this bench?",
      ko: "안녕하세요, 이 벤치 쓰고 계세요?",
      keywords: [
        { word: "bench", meaningKo: "벤치" },
        { word: "use", meaningKo: "사용하다" },
      ],
    },
    {
      id: "s2",
      en: "Go ahead, I was just resting.",
      ko: "쓰세요, 저는 그냥 쉬고 있었어요.",
      keywords: [
        { word: "go ahead", meaningKo: "먼저 하세요" },
        { word: "resting", meaningKo: "쉬는 중" },
      ],
    },
    {
      id: "s3",
      en: "How many sets do you have left?",
      ko: "세트 몇 개 남았나요?",
      keywords: [
        { word: "set", meaningKo: "세트" },
        { word: "left", meaningKo: "남은" },
      ],
    },
    {
      id: "s4",
      en: "Just one, then I'll wipe it down.",
      ko: "한 세트만 더 하고 닦아 놓을게요.",
      keywords: [{ word: "wipe down", meaningKo: "닦다" }],
    },
    {
      id: "s5",
      en: "The treadmill looks too honest today.",
      ko: "오늘 러닝머신이 너무 솔직해 보여요.",
      keywords: [
        { word: "treadmill", meaningKo: "러닝머신" },
        { word: "honest", meaningKo: "솔직한" },
      ],
    },
    {
      id: "s6",
      en: "We laugh and raise the speed anyway.",
      ko: "우리는 웃고 속도를 올려요.",
      keywords: [
        { word: "raise", meaningKo: "올리다" },
        { word: "speed", meaningKo: "속도" },
      ],
    },
    {
      id: "s7",
      en: "Let's pretend it's cardio and not survival.",
      ko: "유산소 운동이지 생존이 아니라고 생각해요.",
      keywords: [
        { word: "pretend", meaningKo: "~인 척하다" },
        { word: "cardio", meaningKo: "유산소 운동" },
      ],
    },
    {
      id: "s8",
      en: "See you next week, maybe.",
      ko: "다음 주에 봬요, 아마도요.",
      keywords: [{ word: "maybe", meaningKo: "아마도" }],
    },
  ],
};
