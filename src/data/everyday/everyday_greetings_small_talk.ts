import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const greetingsSmallTalk: Script = {
  id: "everyday-greetings-small-talk",
  title: "Greetings & Small Talk",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Quick phrases for saying hello, asking about the weekend, and talking about the weather. Great for work, neighbors, and customers.",
  sentences: [
    {
      id: "s1",
      en: "Hey! Good morning.",
      ko: "안녕하세요! 좋은 아침이에요.",
      keywords: [
        { word: "good morning", meaningKo: "좋은 아침" },
        { word: "hey", meaningKo: "안녕/헤이(가벼운 인사)" },
      ],
    },
    {
      id: "s2",
      en: "How’s it going?",
      ko: "요즘 어떻게 지내요?",
      keywords: [
        { word: "How’s it going?", meaningKo: "어떻게 지내?" },
        { word: "going", meaningKo: "진행/상태" },
      ],
    },
    {
      id: "s3",
      en: "Nice to see you.",
      ko: "만나서 반가워요.",
      keywords: [
        { word: "nice", meaningKo: "반가운/좋은" },
        { word: "see you", meaningKo: "만나다" },
      ],
    },
    {
      id: "s4",
      en: "Long time no see! How have you been?",
      ko: "오랜만이에요! 잘 지냈어요?",
      keywords: [
        { word: "long time", meaningKo: "오랜만" },
        { word: "have you been", meaningKo: "그동안 어땠어?" },
      ],
    },
    {
      id: "s5",
      en: "How was your weekend?",
      ko: "주말 어땠어요?",
      keywords: [
        { word: "weekend", meaningKo: "주말" },
        { word: "how was", meaningKo: "어땠니/어땠어요" },
      ],
    },
    {
      id: "s6",
      en: "I worked a little and rested a lot.",
      ko: "조금 일하고 많이 쉬었어요.",
      keywords: [
        { word: "rested", meaningKo: "쉬었다" },
        { word: "a lot", meaningKo: "많이" },
      ],
    },
    {
      id: "s7",
      en: "Did you do anything fun?",
      ko: "재미있는 일 했어요?",
      keywords: [
        { word: "anything", meaningKo: "무엇이든" },
        { word: "fun", meaningKo: "재미있는" },
      ],
    },
    {
      id: "s8",
      en: "The weather was perfect—sunny but not too hot.",
      ko: "날씨가 딱 좋았어요—맑고 덥지 않았어요.",
      keywords: [
        { word: "weather", meaningKo: "날씨" },
        { word: "sunny", meaningKo: "맑은" },
      ],
    },
    {
      id: "s9",
      en: "It’s pretty humid today.",
      ko: "오늘은 꽤 습해요.",
      keywords: [
        { word: "humid", meaningKo: "습한" },
        { word: "pretty", meaningKo: "꽤" },
      ],
    },
    {
      id: "s10",
      en: "Stay cool and drink water.",
      ko: "더위 조심하고 물 많이 마셔요.",
      keywords: [
        { word: "stay cool", meaningKo: "더위 조심" },
        { word: "drink water", meaningKo: "물 마시다" },
      ],
    },
    {
      id: "s11",
      en: "Looks like rain later, according to the forecast.",
      ko: "일기예보 보니까 이따가 비 올 듯해요.",
      keywords: [
        { word: "forecast", meaningKo: "일기예보" },
        { word: "rain", meaningKo: "비" },
      ],
    },
    {
      id: "s12",
      en: "Let’s take a rain check on coffee.",
      ko: "커피는 다음으로 미룰게요.",
      keywords: [
        { word: "rain check", meaningKo: "다음으로 미루기" },
        { word: "coffee", meaningKo: "커피" },
      ],
    },
    {
      id: "s13",
      en: "Hope your day goes smoothly.",
      ko: "오늘 하루 순조롭게 지나가길 바래요.",
      keywords: [
        { word: "smoothly", meaningKo: "순조롭게" },
        { word: "hope", meaningKo: "바라다" },
      ],
    },
    {
      id: "s14",
      en: "By the way, how’s your family?",
      ko: "그나저나 가족분들은 잘 지내세요?",
      keywords: [
        { word: "by the way", meaningKo: "그나저나" },
        { word: "family", meaningKo: "가족" },
      ],
    },
    {
      id: "s15",
      en: "Take care. See you tomorrow!",
      ko: "조심히 가세요. 내일 봬요!",
      keywords: [
        { word: "take care", meaningKo: "조심히 가" },
        { word: "see you", meaningKo: "또 보자" },
      ],
    },
  ],
};
