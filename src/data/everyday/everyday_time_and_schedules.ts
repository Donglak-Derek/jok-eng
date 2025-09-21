import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const timeAndSchedules: Script = {
  id: "everyday-time-and-schedules",
  title: "Time and Schedules",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Practice talking about time and schedules. These sentences help you explain when things happen and make plans clearly.",
  sentences: [
    {
      id: "s1",
      en: "The meeting starts at 9 a.m.",
      ko: "회의는 오전 9시에 시작해요.",
      keywords: [
        { word: "meeting", meaningKo: "회의" },
        { word: "starts", meaningKo: "시작하다" },
      ],
    },
    {
      id: "s2",
      en: "I wake up at 5:30 every morning.",
      ko: "저는 매일 아침 5시 30분에 일어나요.",
      keywords: [
        { word: "wake up", meaningKo: "일어나다" },
        { word: "every morning", meaningKo: "매일 아침" },
      ],
    },
    {
      id: "s3",
      en: "Lunch is at 12 o’clock.",
      ko: "점심은 12시에 있어요.",
      keywords: [
        { word: "lunch", meaningKo: "점심" },
        { word: "o’clock", meaningKo: "…시" },
      ],
    },
    {
      id: "s4",
      en: "I usually go to bed at 11 p.m.",
      ko: "저는 보통 밤 11시에 잠자리에 들어요.",
      keywords: [
        { word: "go to bed", meaningKo: "잠자리에 들다" },
        { word: "usually", meaningKo: "보통" },
      ],
    },
    {
      id: "s5",
      en: "What time does your shift end?",
      ko: "당신의 근무는 몇 시에 끝나요?",
      keywords: [
        { word: "shift", meaningKo: "근무" },
        { word: "end", meaningKo: "끝나다" },
      ],
    },
    {
      id: "s6",
      en: "The store opens at 10 in the morning.",
      ko: "가게는 아침 10시에 열어요.",
      keywords: [
        { word: "opens", meaningKo: "열다" },
        { word: "morning", meaningKo: "아침" },
      ],
    },
    {
      id: "s7",
      en: "We have a project deadline next Friday.",
      ko: "우리는 다음 주 금요일에 프로젝트 마감일이 있어요.",
      keywords: [
        { word: "deadline", meaningKo: "마감일" },
        { word: "Friday", meaningKo: "금요일" },
      ],
    },
    {
      id: "s8",
      en: "I will call you at 3 p.m.",
      ko: "제가 오후 3시에 전화할게요.",
      keywords: [
        { word: "call", meaningKo: "전화하다" },
        { word: "p.m.", meaningKo: "오후" },
      ],
    },
    {
      id: "s9",
      en: "The bus comes every 15 minutes.",
      ko: "버스는 15분마다 와요.",
      keywords: [
        { word: "bus", meaningKo: "버스" },
        { word: "every", meaningKo: "마다" },
      ],
    },
    {
      id: "s10",
      en: "I’m free after 6 p.m.",
      ko: "저는 오후 6시 이후에 자유로워요.",
      keywords: [
        { word: "free", meaningKo: "한가한" },
        { word: "after", meaningKo: "…이후" },
      ],
    },
    {
      id: "s11",
      en: "The class lasts for two hours.",
      ko: "수업은 두 시간 동안 계속돼요.",
      keywords: [
        { word: "lasts", meaningKo: "계속되다" },
        { word: "hours", meaningKo: "시간" },
      ],
    },
    {
      id: "s12",
      en: "Can we meet tomorrow morning?",
      ko: "우리 내일 아침에 만날 수 있을까요?",
      keywords: [
        { word: "meet", meaningKo: "만나다" },
        { word: "tomorrow", meaningKo: "내일" },
      ],
    },
    {
      id: "s13",
      en: "I worked late last night.",
      ko: "저는 어젯밤 늦게까지 일했어요.",
      keywords: [
        { word: "worked", meaningKo: "일했다" },
        { word: "late", meaningKo: "늦게" },
      ],
    },
    {
      id: "s14",
      en: "Let’s take a break in 10 minutes.",
      ko: "10분 후에 쉬어요.",
      keywords: [
        { word: "break", meaningKo: "휴식" },
        { word: "minutes", meaningKo: "분" },
      ],
    },
    {
      id: "s15",
      en: "The store closes at 9 p.m. every day.",
      ko: "가게는 매일 오후 9시에 문을 닫아요.",
      keywords: [
        { word: "closes", meaningKo: "닫다" },
        { word: "every day", meaningKo: "매일" },
      ],
    },
  ],
};
