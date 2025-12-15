import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const autocorrect: Script = {
  id: "standup-autocorrect",
  title: "Name Game at the Bar",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish:
    "When you forget names at a party, you need a joke that saves you. This bit teaches how to admit it with humor and keep the vibe light.",
  cleanedKorean: "파티에서 이름을 잊었을 때 당신을 구해줄 농담입니다. 유머러스하게 실수를 인정하고 분위기를 띄우는 법을 배웁니다.",
  icon: "🏷️",
  sentences: [
    {
      id: "s1",
      en: "At crowded bars, I forget names every five minutes.",
      ko: "북적이는 바에서는 5분마다 이름을 잊어요.",
      keywords: [
        { word: "crowded", meaningKo: "붐비는" },
        { word: "forget", meaningKo: "잊다" },
      ],
    },
    {
      id: "s2",
      en: "So I joke, 'Sorry, my brain's autocorrect keeps renaming you.'",
      ko: "그래서 이렇게 농담해요: '미안, 내 뇌 자동 수정이 자꾸 너를 다른 이름으로 불러.'",
      keywords: [
        { word: "autocorrect", meaningKo: "자동 수정" },
        { word: "rename", meaningKo: "다시 이름 붙이다" },
      ],
    },
    {
      id: "s3",
      en: "They laugh because I own the mistake.",
      ko: "실수를 인정하니 사람들이 웃어요.",
      keywords: [
        { word: "own", meaningKo: "인정하다" },
        { word: "mistake", meaningKo: "실수" },
      ],
    },
    {
      id: "s4",
      en: "Then I ask, 'Remind me before I call you Captain again?'",
      ko: "그리고 이렇게 묻죠: '또 캡틴이라고 부르기 전에 알려줄래?'",
      keywords: [
        { word: "remind", meaningKo: "상기시키다" },
        { word: "again", meaningKo: "다시" },
      ],
    },
    {
      id: "s5",
      en: "Now it's an inside joke, not a weird pause.",
      ko: "이제 어색한 정적이 아니라 내부 농담이 돼요.",
      keywords: [
        { word: "inside joke", meaningKo: "내부 농담" },
        { word: "pause", meaningKo: "멈춤" },
      ],
    },
    {
      id: "s6",
      en: "If they forget my name too, I high-five and say, 'Great, we’re even.'",
      ko: "그들도 내 이름을 잊으면 하이파이브하며 말해요, '좋아, 우리 비겼네.'",
      keywords: [
        { word: "high-five", meaningKo: "하이파이브하다" },
        { word: "even", meaningKo: "비긴" },
      ],
    },
    {
      id: "s7",
      en: "This keeps the vibe playful instead of tense.",
      ko: "이렇게 하면 분위기가 긴장 대신 장난스러워져요.",
      keywords: [
        { word: "playful", meaningKo: "장난기 있는" },
        { word: "tense", meaningKo: "긴장한" },
      ],
    },
    {
      id: "s8",
      en: "Plus, I actually remember after joking about it.",
      ko: "게다가 농담을 하고 나면 실제로 기억이 나요.",
      keywords: [
        { word: "remember", meaningKo: "기억하다" },
        { word: "after", meaningKo: "후에" },
      ],
    },
  ],
};
