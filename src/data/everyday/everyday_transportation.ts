import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const transportation: Script = {
  id: "everyday-transportation",
  title: "Transportation",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Practice talking about driving, traffic, and commuting in daily life. These sentences help with conversations about how you get around.",
  sentences: [
    {
      id: "s1",
      en: "It took me 40 minutes to get here today.",
      ko: "오늘 여기 오는데 40분 걸렸어요.",
      keywords: [
        { word: "minutes", meaningKo: "분" },
        { word: "took", meaningKo: "걸렸다" },
      ],
    },
    {
      id: "s2",
      en: "The traffic was really heavy this morning.",
      ko: "오늘 아침에 교통이 정말 막혔어요.",
      keywords: [
        { word: "traffic", meaningKo: "교통" },
        { word: "heavy", meaningKo: "심한" },
      ],
    },
    {
      id: "s3",
      en: "I drive to work every day.",
      ko: "저는 매일 차로 출근해요.",
      keywords: [
        { word: "drive", meaningKo: "운전하다" },
        { word: "work", meaningKo: "직장" },
      ],
    },
    {
      id: "s4",
      en: "Sometimes I take the bus instead of driving.",
      ko: "가끔은 운전 대신 버스를 타요.",
      keywords: [
        { word: "bus", meaningKo: "버스" },
        { word: "instead", meaningKo: "대신에" },
      ],
    },
    {
      id: "s5",
      en: "The highway was clear and fast today.",
      ko: "오늘은 고속도로가 막히지 않고 빨랐어요.",
      keywords: [
        { word: "highway", meaningKo: "고속도로" },
        { word: "clear", meaningKo: "막히지 않은" },
      ],
    },
    {
      id: "s6",
      en: "I was late because of an accident on the road.",
      ko: "도로에 사고가 나서 늦었어요.",
      keywords: [
        { word: "accident", meaningKo: "사고" },
        { word: "road", meaningKo: "도로" },
      ],
    },
    {
      id: "s7",
      en: "How long does it take you to get to work?",
      ko: "출근하는 데 얼마나 걸려요?",
      keywords: [
        { word: "how long", meaningKo: "얼마나 오래" },
        { word: "take", meaningKo: "걸리다" },
      ],
    },
    {
      id: "s8",
      en: "There was a traffic jam near the city center.",
      ko: "도심 근처에 교통 체증이 있었어요.",
      keywords: [
        { word: "traffic jam", meaningKo: "교통 체증" },
        { word: "city center", meaningKo: "도심" },
      ],
    },
    {
      id: "s9",
      en: "I usually leave home early to avoid traffic.",
      ko: "저는 보통 교통을 피하려고 집을 일찍 나가요.",
      keywords: [
        { word: "leave", meaningKo: "떠나다" },
        { word: "avoid", meaningKo: "피하다" },
      ],
    },
    {
      id: "s10",
      en: "Gas prices are getting higher these days.",
      ko: "요즘은 기름값이 점점 오르고 있어요.",
      keywords: [
        { word: "gas", meaningKo: "기름, 휘발유" },
        { word: "prices", meaningKo: "가격" },
      ],
    },
    {
      id: "s11",
      en: "I parked my car in front of the store.",
      ko: "가게 앞에 차를 주차했어요.",
      keywords: [
        { word: "park", meaningKo: "주차하다" },
        { word: "store", meaningKo: "가게" },
      ],
    },
    {
      id: "s12",
      en: "Sometimes I listen to podcasts while driving.",
      ko: "가끔 운전하면서 팟캐스트를 들어요.",
      keywords: [
        { word: "listen", meaningKo: "듣다" },
        { word: "podcasts", meaningKo: "팟캐스트" },
      ],
    },
    {
      id: "s13",
      en: "My commute is about thirty minutes each way.",
      ko: "제 출퇴근은 편도 약 30분이에요.",
      keywords: [
        { word: "commute", meaningKo: "출퇴근" },
        { word: "each way", meaningKo: "편도" },
      ],
    },
    {
      id: "s14",
      en: "The train is faster than driving during rush hour.",
      ko: "출근 시간에는 기차가 운전보다 빨라요.",
      keywords: [
        { word: "train", meaningKo: "기차" },
        { word: "rush hour", meaningKo: "출퇴근 시간" },
      ],
    },
    {
      id: "s15",
      en: "I need to renew my driver’s license soon.",
      ko: "곧 운전면허를 갱신해야 해요.",
      keywords: [
        { word: "renew", meaningKo: "갱신하다" },
        { word: "license", meaningKo: "면허" },
      ],
    },
  ],
};
