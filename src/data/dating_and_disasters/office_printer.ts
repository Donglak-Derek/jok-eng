import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const officePrinter: Script = {
  id: "skit-office-printer",
  title: "Dating App Crash",
  categorySlug: "dating_and_disasters",
  categoryName: CATEGORY_NAMES["dating_and_disasters"],
  cleanedEnglish:
    "A short scene about a first date planned by an app that keeps crashing—relatable, awkward, and easy to tell at parties.",
  sentences: [
    {
      id: "s1",
      en: "My dating app crashed while booking our first date.",
      ko: "첫 데이트를 잡는 중에 데이팅 앱이 멈췄어요.",
      keywords: [
        { word: "crash", meaningKo: "먹통 되다" },
        { word: "first date", meaningKo: "첫 데이트" },
      ],
    },
    {
      id: "s2",
      en: "The app said, 'Error: feelings not found.'",
      ko: "앱에 이렇게 떴어요, '에러: 감정 없음.'",
      keywords: [
        { word: "error", meaningKo: "에러" },
        { word: "feelings", meaningKo: "감정" },
      ],
    },
    {
      id: "s3",
      en: "I joked, 'Okay, we’ll improvise like real people.'",
      ko: "농담했죠, '좋아요, 우리 진짜 사람처럼 즉흥적으로 해요.'",
      keywords: [
        { word: "improvise", meaningKo: "즉흥적으로 하다" },
        { word: "joked", meaningKo: "농담했다" },
      ],
    },
    {
      id: "s4",
      en: "She laughed and suggested a walk instead of a fancy restaurant.",
      ko: "그녀는 웃으며 근사한 레스토랑 대신 산책하자고 했어요.",
      keywords: [
        { word: "suggest", meaningKo: "제안하다" },
        { word: "fancy", meaningKo: "근사한" },
      ],
    },
    {
      id: "s5",
      en: "We grabbed street tacos and called it 'beta testing.'",
      ko: "길거리 타코를 사 먹으며 '베타 테스트'라고 불렀어요.",
      keywords: [
        { word: "street tacos", meaningKo: "길거리 타코" },
        { word: "beta testing", meaningKo: "베타 테스트" },
      ],
    },
    {
      id: "s6",
      en: "When it rained, I said, 'Patch notes: new weather feature.'",
      ko: "비가 오자 이렇게 말했어요, '패치 노트: 새로운 날씨 기능 추가.'",
      keywords: [
        { word: "patch notes", meaningKo: "패치 노트" },
        { word: "feature", meaningKo: "기능" },
      ],
    },
    {
      id: "s7",
      en: "She replied, 'Fine, but I'm charging for QA.'",
      ko: "그녀가 답했어요, '좋아요, 근데 QA 비용 청구할게요.'",
      keywords: [
        { word: "charging", meaningKo: "청구하다" },
        { word: "QA", meaningKo: "품질 테스트" },
      ],
    },
    {
      id: "s8",
      en: "We both agreed the bug made the date better.",
      ko: "우리는 둘 다 버그 때문에 데이트가 더 좋아졌다고 했어요.",
      keywords: [
        { word: "agree", meaningKo: "동의하다" },
        { word: "bug", meaningKo: "버그" },
      ],
    },
  ],
};
