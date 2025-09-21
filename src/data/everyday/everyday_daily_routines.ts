import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const dailyRoutines: Script = {
  id: "everyday-daily-routines",
  title: "Daily Routines",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Daily routines are about talking simply and clearly about your schedule, meals, and habits. These sentences help you explain your everyday life.",
  sentences: [
    {
      id: "s1",
      en: "I wake up at 5 a.m. every day.",
      ko: "저는 매일 아침 5시에 일어나요.",
      keywords: [
        { word: "wake up", meaningKo: "일어나다" },
        { word: "every day", meaningKo: "매일" },
      ],
    },
    {
      id: "s2",
      en: "I brush my teeth and wash my face.",
      ko: "저는 이를 닦고 세수해요.",
      keywords: [
        { word: "brush teeth", meaningKo: "양치하다" },
        { word: "wash face", meaningKo: "세수하다" },
      ],
    },
    {
      id: "s3",
      en: "I eat breakfast at 6 a.m.",
      ko: "저는 아침을 6시에 먹어요.",
      keywords: [
        { word: "breakfast", meaningKo: "아침" },
        { word: "eat", meaningKo: "먹다" },
      ],
    },
    {
      id: "s4",
      en: "I leave home and drive to work.",
      ko: "저는 집을 나서서 운전해서 출근해요.",
      keywords: [
        { word: "leave home", meaningKo: "집을 나서다" },
        { word: "drive", meaningKo: "운전하다" },
      ],
    },
    {
      id: "s5",
      en: "I start work at 6:30 in the morning.",
      ko: "저는 아침 6시 30분에 일을 시작해요.",
      keywords: [
        { word: "start work", meaningKo: "일 시작하다" },
        { word: "morning", meaningKo: "아침" },
      ],
    },
    {
      id: "s6",
      en: "I take a short break around 10 a.m.",
      ko: "저는 오전 10시쯤에 잠깐 쉬어요.",
      keywords: [
        { word: "break", meaningKo: "휴식" },
        { word: "around", meaningKo: "쯤" },
      ],
    },
    {
      id: "s7",
      en: "I eat lunch at 12 noon.",
      ko: "저는 정오 12시에 점심을 먹어요.",
      keywords: [
        { word: "lunch", meaningKo: "점심" },
        { word: "noon", meaningKo: "정오" },
      ],
    },
    {
      id: "s8",
      en: "I finish work at 2:30 p.m.",
      ko: "저는 오후 2시 30분에 일을 끝내요.",
      keywords: [
        { word: "finish work", meaningKo: "일 끝내다" },
        { word: "afternoon", meaningKo: "오후" },
      ],
    },
    {
      id: "s9",
      en: "I drive back home and rest.",
      ko: "저는 집으로 운전해서 와서 쉬어요.",
      keywords: [
        { word: "drive back", meaningKo: "돌아오다" },
        { word: "rest", meaningKo: "쉬다" },
      ],
    },
    {
      id: "s10",
      en: "Sometimes I take a short nap.",
      ko: "가끔 낮잠을 자요.",
      keywords: [
        { word: "nap", meaningKo: "낮잠" },
        { word: "sometimes", meaningKo: "가끔" },
      ],
    },
    {
      id: "s11",
      en: "I eat dinner with my family at 6 p.m.",
      ko: "저는 저녁 6시에 가족과 함께 저녁을 먹어요.",
      keywords: [
        { word: "dinner", meaningKo: "저녁" },
        { word: "family", meaningKo: "가족" },
      ],
    },
    {
      id: "s12",
      en: "After dinner, I study or work on my projects.",
      ko: "저녁 먹고 나서 공부하거나 프로젝트를 해요.",
      keywords: [
        { word: "study", meaningKo: "공부하다" },
        { word: "project", meaningKo: "프로젝트" },
      ],
    },
    {
      id: "s13",
      en: "I watch TV or listen to music to relax.",
      ko: "저는 쉬기 위해 TV를 보거나 음악을 들어요.",
      keywords: [
        { word: "watch TV", meaningKo: "TV 보다" },
        { word: "relax", meaningKo: "쉬다" },
      ],
    },
    {
      id: "s14",
      en: "I prepare things for the next day.",
      ko: "저는 다음 날을 위해 준비해요.",
      keywords: [
        { word: "prepare", meaningKo: "준비하다" },
        { word: "next day", meaningKo: "다음 날" },
      ],
    },
    {
      id: "s15",
      en: "I go to bed at 10 p.m.",
      ko: "저는 밤 10시에 잠자리에 들어요.",
      keywords: [
        { word: "go to bed", meaningKo: "잠자리에 들다" },
        { word: "night", meaningKo: "밤" },
      ],
    },
  ],
};
