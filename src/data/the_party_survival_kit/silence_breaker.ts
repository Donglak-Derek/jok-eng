import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const silenceBreaker: Script = {
  id: "standup-silence-breaker",
  title: "The Silence Breaker",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  cleanedEnglish:
    "When conversation dies, don't talk about the weather. Use this line to bond over shared awkwardness.",
  cleanedKorean: "대화가 끊길 때 날씨 이야기는 하지 마세요. 이 대사로 어색함을 유머로 승화시키세요.",
  icon: "🦗",
  sentences: [
    {
      id: "sb1",
      en: "The silence is getting loud, so I just smile.",
      ko: "침묵이 너무 커져서 그냥 미소 짓습니다.",
      keywords: [
        { word: "silence", meaningKo: "침묵" },
        { word: "loud", meaningKo: "시끄러운 (여기서는 압박감이 큰)" },
      ],
    },
    {
      id: "sb2",
      en: "I don't say 'Nice weather,' because that's boring.",
      ko: "'날씨 좋네요'라고 안 해요. 그건 지루하니까요.",
      keywords: [
        { word: "boring", meaningKo: "지루한" },
      ],
    },
    {
      id: "sb3",
      en: "Instead, I ask: 'On a scale of 1 to 10, how much do we regret not staying home?'",
      ko: "대신 물어보죠: '1부터 10까지 중, 집에 안 있고 나온 거 얼마나 후회해요?'",
      keywords: [
        { word: "scale", meaningKo: "규모/등급" },
        { word: "regret", meaningKo: "후회하다" },
      ],
    },
    {
      id: "sb4",
      en: "It works because it's honest and relatable.",
      ko: "솔직하고 공감되니까 먹혀요.",
      keywords: [
        { word: "relatable", meaningKo: "공감가는" },
      ],
    },
    {
      id: "sb5",
      en: "If they say '10', I say 'Let's order pizza here.'",
      ko: "만약 '10'이라 하면 '여기서 피자나 시키죠'라고 해요.",
      keywords: [
        { word: "order", meaningKo: "주문하다" },
      ],
    },
  ],
};
