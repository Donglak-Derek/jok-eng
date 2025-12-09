import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const karenDiffuser: Script = {
  id: "karen-diffuser",
  title: "The 'Karen' Diffuser",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish:
    "How to complain to customer service without being a 'Karen'. Alternates between what NOT to say (Rude) and what TO say (Polite).",
  sentences: [
    {
      id: "s1_rude",
      en: "Rude: 'This milk is expired. It's disgusting.'",
      ko: "무례함: '이 우유 상했잖아. 역겨워.'",
      keywords: [
        { word: "disgusting", meaningKo: "역겨운" },
        { word: "expired", meaningKo: "만료된" },
      ],
    },
    {
      id: "s1_polite",
      en: "Polite: 'Hey, so sorry to be that guy, but I think this milk is expired.'",
      ko: "정중함: '저기, 까다로운 사람처럼 보이기 싫은데, 우유가 상한 것 같아요.'",
      keywords: [
        { word: "that guy", meaningKo: "진상, 까다로운 사람" },
      ],
    },
    {
      id: "s2_rude",
      en: "Rude: 'You messed up my order. Fix it.'",
      ko: "무례함: '주문 엉망으로 받았잖아. 다시 해줘.'",
      keywords: [
        { word: "messed up", meaningKo: "망치다" },
        { word: "fix it", meaningKo: "고쳐라" },
      ],
    },
    {
      id: "s2_polite",
      en: "Polite: 'I think this might be different from what I ordered. Could we double check?'",
      ko: "정중함: '제가 주문한 것과 다른 것 같은데, 다시 확인해 주실 수 있나요?'",
      keywords: [
        { word: "double check", meaningKo: "재확인하다" },
      ],
    },
    {
      id: "s3_rude",
      en: "Rude: 'Why is this taking so long? Hurry up.'",
      ko: "무례함: '왜 이렇게 오래 걸려? 빨리 좀 해.'",
      keywords: [
        { word: "hurry up", meaningKo: "서둘러" },
      ],
    },
    {
      id: "s3_polite",
      en: "Polite: 'Just checking on the status of my order, I have to run soon.'",
      ko: "정중함: '제 주문 상태 좀 확인할 수 있을까요? 제가 곧 가봐야 해서요.'",
      keywords: [
        { word: "status", meaningKo: "상태" },
        { word: "run", meaningKo: "가다, 뛰다" },
      ],
    },
    {
      id: "s4_rude",
      en: "Rude: 'The price on the shelf was different. You're ripping me off.'",
      ko: "무례함: '진열대 가격이랑 다르잖아. 사기 치는 거야?'",
      keywords: [
        { word: "rip off", meaningKo: "바가지 씌우다, 사기치다" },
      ],
    },
    {
      id: "s4_polite",
      en: "Polite: 'I vividly remember seeing a different price on the shelf. Can we verify?'",
      ko: "정중함: '진열대에서 다른 가격을 본 기억이 생생해요. 확인해 볼 수 있을까요?'",
      keywords: [
        { word: "vividly", meaningKo: "생생하게" },
        { word: "verify", meaningKo: "확인하다" },
      ],
    },
    {
      id: "s5_rude",
      en: "Rude: 'This food is cold. I'm not paying for this.'",
      ko: "무례함: '음식이 식었잖아. 돈 못 내.'",
      keywords: [
        { word: "paying", meaningKo: "지불하는" },
      ],
    },
    {
      id: "s5_polite",
      en: "Polite: 'The dish seems a bit under temperature. Could it be warmed up?'",
      ko: "정중함: '음식이 좀 식은 것 같아요. 데워주실 수 있나요?'",
      keywords: [
        { word: "under temperature", meaningKo: "온도가 낮은" },
        { word: "warm up", meaningKo: "데우다" },
      ],
    },
  ],
};
