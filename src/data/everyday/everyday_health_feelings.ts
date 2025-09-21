import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const healthAndFeelings: Script = {
  id: "everyday-health-feelings",
  title: "Health and Feelings",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Practice talking about how you feel—tired, sick, happy, or stressed. These phrases help you share your condition and emotions in daily life.",
  sentences: [
    {
      id: "s1",
      en: "I’m tired today because I worked late.",
      ko: "어제 늦게 일해서 오늘 피곤해요.",
      keywords: [
        { word: "tired", meaningKo: "피곤한" },
        { word: "worked late", meaningKo: "늦게 일하다" },
      ],
    },
    {
      id: "s2",
      en: "I didn’t sleep well last night.",
      ko: "어젯밤에 잠을 잘 못 잤어요.",
      keywords: [
        { word: "sleep", meaningKo: "잠자다" },
        { word: "last night", meaningKo: "어젯밤" },
      ],
    },
    {
      id: "s3",
      en: "I feel sick and need to rest.",
      ko: "몸이 아파서 쉬어야 해요.",
      keywords: [
        { word: "sick", meaningKo: "아픈" },
        { word: "rest", meaningKo: "쉬다" },
      ],
    },
    {
      id: "s4",
      en: "My back hurts from lifting furniture.",
      ko: "가구를 들어서 허리가 아파요.",
      keywords: [
        { word: "back", meaningKo: "허리" },
        { word: "hurts", meaningKo: "아프다" },
      ],
    },
    {
      id: "s5",
      en: "I have a headache right now.",
      ko: "지금 머리가 아파요.",
      keywords: [
        { word: "headache", meaningKo: "두통" },
        { word: "right now", meaningKo: "지금" },
      ],
    },
    {
      id: "s6",
      en: "I’m stressed because of too much work.",
      ko: "일이 너무 많아서 스트레스 받아요.",
      keywords: [
        { word: "stressed", meaningKo: "스트레스 받는" },
        { word: "too much", meaningKo: "너무 많은" },
      ],
    },
    {
      id: "s7",
      en: "I feel nervous before an interview.",
      ko: "면접 전에 긴장돼요.",
      keywords: [
        { word: "nervous", meaningKo: "긴장한" },
        { word: "interview", meaningKo: "면접" },
      ],
    },
    {
      id: "s8",
      en: "I’m happy because I finished my project.",
      ko: "프로젝트를 끝내서 기뻐요.",
      keywords: [
        { word: "happy", meaningKo: "기쁜" },
        { word: "project", meaningKo: "프로젝트" },
      ],
    },
    {
      id: "s9",
      en: "I feel relaxed after drinking coffee.",
      ko: "커피 마신 후에 편안해요.",
      keywords: [
        { word: "relaxed", meaningKo: "편안한" },
        { word: "after", meaningKo: "…후에" },
      ],
    },
    {
      id: "s10",
      en: "I was excited to see my friends yesterday.",
      ko: "어제 친구들을 만나서 신났어요.",
      keywords: [
        { word: "excited", meaningKo: "신난" },
        { word: "friends", meaningKo: "친구들" },
      ],
    },
    {
      id: "s11",
      en: "I’m worried about making mistakes at work.",
      ko: "직장에서 실수할까 봐 걱정돼요.",
      keywords: [
        { word: "worried", meaningKo: "걱정하는" },
        { word: "mistakes", meaningKo: "실수들" },
      ],
    },
    {
      id: "s12",
      en: "I feel strong after exercising.",
      ko: "운동하고 나서 힘이 나요.",
      keywords: [
        { word: "strong", meaningKo: "강한" },
        { word: "exercising", meaningKo: "운동하다" },
      ],
    },
    {
      id: "s13",
      en: "I feel weak when I don’t eat breakfast.",
      ko: "아침을 안 먹으면 힘이 없어요.",
      keywords: [
        { word: "weak", meaningKo: "약한" },
        { word: "breakfast", meaningKo: "아침" },
      ],
    },
    {
      id: "s14",
      en: "I’m grateful for my coworkers’ help.",
      ko: "동료들이 도와줘서 감사해요.",
      keywords: [
        { word: "grateful", meaningKo: "감사한" },
        { word: "help", meaningKo: "도움" },
      ],
    },
    {
      id: "s15",
      en: "Sometimes I feel lonely in a new place.",
      ko: "새로운 곳에서는 가끔 외로워요.",
      keywords: [
        { word: "lonely", meaningKo: "외로운" },
        { word: "new place", meaningKo: "새로운 곳" },
      ],
    },
  ],
};
