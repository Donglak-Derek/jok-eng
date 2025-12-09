import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const landlordNegotiator: Script = {
  id: "landlord-negotiator",
  title: "The Landlord Negotiator",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish:
    "How to ask for repairs firmly. Alternates between aggressive demands (Rude) and cooperative requests (Polite).",
  sentences: [
    {
      id: "s1_rude",
      en: "Rude: 'The heater is broken. Fix it now or I'm withholding rent.'",
      ko: "무례함: '히터 고장 났어. 당장 안 고치면 월세 안 낼 거야.'",
      keywords: [
        { word: "withholding", meaningKo: "보류하는, 안 주는" },
      ],
    },
    {
      id: "s1_polite",
      en: "Polite: 'I'd love to get the heater fixed before it becomes a bigger issue for the units.'",
      ko: "정중함: '다른 세대에도 더 큰 문제가 되기 전에 히터를 고치고 싶어요.'",
      keywords: [
        { word: "issue", meaningKo: "문제" },
        { word: "units", meaningKo: "세대, 호수" },
      ],
    },
    {
      id: "s2_rude",
      en: "Rude: 'There are bugs everywhere. This place is a dump.'",
      ko: "무례함: '벌레가 어디에나 있어. 여기 완전 쓰레기장이야.'",
      keywords: [
        { word: "dump", meaningKo: "쓰레기장" },
      ],
    },
    {
      id: "s2_polite",
      en: "Polite: 'We've noticed some pests and want to address it early to protect the property.'",
      ko: "정중함: '해충을 좀 발견해서, 건물을 보호하기 위해 빨리 해결하고 싶어요.'",
      keywords: [
        { word: "pests", meaningKo: "해충" },
        { word: "address", meaningKo: "다루다, 해결하다" },
      ],
    },
    {
      id: "s3_rude",
      en: "Rude: 'The faucet has been leaking for weeks. You're useless.'",
      ko: "무례함: '수도꼭지가 몇 주째 새고 있어. 당신 정말 쓸모없네.'",
      keywords: [
        { word: "leaking", meaningKo: "새는" },
        { word: "useless", meaningKo: "쓸모없는" },
      ],
    },
    {
      id: "s3_polite",
      en: "Polite: 'Just concerned about potential water damage from this persistent leak.'",
      ko: "정중함: '계속되는 누수 때문에 물 피해가 생길까 봐 걱정돼요.'",
      keywords: [
        { word: "potential", meaningKo: "잠재적인" },
        { word: "persistent", meaningKo: "지속적인" },
      ],
    },
    {
      id: "s4_rude",
      en: "Rude: 'Tell the neighbors to shut up. I can't sleep.'",
      ko: "무례함: '이웃들한테 입 좀 닥치라고 해. 잠을 못 자겠어.'",
      keywords: [
        { word: "shut up", meaningKo: "입 다물다" },
      ],
    },
    {
      id: "s4_polite",
      en: "Polite: 'Could we send a general reminder to the building regarding quiet hours?'",
      ko: "정중함: '건물 전체에 정숙 시간에 대한 공지를 한번 보내주실 수 있을까요?'",
      keywords: [
        { word: "reminder", meaningKo: "상기시키는 것, 공지" },
        { word: "quiet hours", meaningKo: "정숙 시간" },
      ],
    },
    {
      id: "s5_rude",
      en: "Rude: 'You're raising the rent? Are you crazy?'",
      ko: "무례함: '월세를 올린다고? 미쳤어?'",
      keywords: [
        { word: "crazy", meaningKo: "미친" },
      ],
    },
    {
      id: "s5_polite",
      en: "Polite: 'I was hoping to discuss the renewal rate given my history of on-time payments.'",
      ko: "정중함: '제 정시 납부 기록을 고려해서 갱신율에 대해 상의하고 싶었어요.'",
      keywords: [
        { word: "renewal rate", meaningKo: "갱신율, 재계약 금액" },
        { word: "on-time", meaningKo: "제시간에" },
      ],
    },
  ],
};
