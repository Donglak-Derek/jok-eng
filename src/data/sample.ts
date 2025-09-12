import { Script } from "@/types";

// Sample dataset to bootstrap UI. Replace with generated content later.
export const scripts: Script[] = [
  {
    id: "funny-bus-01",
    title: "The Bus Stop Joke",
    categorySlug: "standup",
    categoryName: "Stand-up",
    cleanedEnglish:
      "I was waiting at the bus stop. A bus drove past with a sign: 'Only for dogs'. I thought, finally, public transport that explains the barking.",
    sentences: [
      {
        id: "s1",
        en: "I was waiting at the bus stop.",
        ko: "나는 버스 정류장에서 기다리고 있었어요.",
        keywords: [
          { word: "bus stop", meaningKo: "버스 정류장" },
          { word: "waiting", meaningKo: "기다리는 중" },
        ],
      },
      {
        id: "s2",
        en: "A bus drove past with a sign: 'Only for dogs'.",
        ko: "개들만 탑승 가능하다는 표지판이 붙은 버스가 지나갔어요.",
        keywords: [
          { word: "drove past", meaningKo: "지나가다" },
          { word: "sign", meaningKo: "표지판" },
        ],
      },
      {
        id: "s3",
        en: "I thought, finally, public transport that explains the barking.",
        ko: "드디어 왜 짖는지 설명해 주는 대중교통이구나 하고 생각했죠.",
        keywords: [
          { word: "public transport", meaningKo: "대중교통" },
          { word: "barking", meaningKo: "짖는 소리" },
        ],
      },
    ],
  },
  {
    id: "skit-office-01",
    title: "Office Printer Skit",
    categorySlug: "skit",
    categoryName: "Comedy Skit",
    cleanedEnglish:
      "Our office printer is so dramatic, it needs a warm-up, a pep talk, and a day off after printing one page.",
    sentences: [
      {
        id: "s1",
        en: "Our office printer is so dramatic.",
        ko: "우리 사무실 프린터는 엄청 오버해요.",
        keywords: [
          { word: "office", meaningKo: "사무실" },
          { word: "dramatic", meaningKo: "과장된" },
        ],
      },
      {
        id: "s2",
        en: "It needs a warm-up and a pep talk.",
        ko: "워밍업과 격려가 필요해요.",
        keywords: [
          { word: "warm-up", meaningKo: "준비운동, 예열" },
          { word: "pep talk", meaningKo: "격려 연설" },
        ],
      },
      {
        id: "s3",
        en: "Then it takes a day off after printing one page.",
        ko: "한 장 출력하고 하루 쉬어요.",
        keywords: [
          { word: "take a day off", meaningKo: "하루 쉬다" },
          { word: "printing", meaningKo: "인쇄" },
        ],
      },
    ],
  },
];

export const categories = Array.from(
  new Map(scripts.map((s) => [s.categorySlug, s.categoryName])).entries()
).map(([slug, name]) => ({ slug, name }));

