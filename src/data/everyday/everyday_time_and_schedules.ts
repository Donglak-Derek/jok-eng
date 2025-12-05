import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const timeAndSchedules: Script = {
  id: "everyday-time-and-schedules",
  title: "Zoom Buffer Talk",
  categorySlug: "everyday",
  categoryName: CATEGORY_NAMES["everyday"],
  cleanedEnglish:
    "Light lines for the awkward two minutes before a call starts—keep it breezy, then land on the agenda.",
  sentences: [
    {
      id: "s1",
      en: "Hey! Thanks for hopping on—how's your week going?",
      ko: "안녕하세요! 들어와 주셔서 감사해요—이번 주 어떻게 지내세요?",
      keywords: [
        { word: "hopping on", meaningKo: "참여하다" },
        { word: "week", meaningKo: "주" },
      ],
    },
    {
      id: "s2",
      en: "I promise this will be quick—no surprise marathons.",
      ko: "오늘은 빨리 끝낼게요—갑자기 길어지는 거 없어요.",
      keywords: [
        { word: "promise", meaningKo: "약속하다" },
        { word: "marathon", meaningKo: "마라톤" },
      ],
    },
    {
      id: "s3",
      en: "Do you need a minute to close out the last meeting?",
      ko: "이전 회의 마무리할 시간 조금 필요하세요?",
      keywords: [
        { word: "close out", meaningKo: "마무리하다" },
        { word: "meeting", meaningKo: "회의" },
      ],
    },
    {
      id: "s4",
      en: "We’ll wrap by the half-hour so you can escape on time.",
      ko: "30분 안에 마무리해서 제때 나가게 할게요.",
      keywords: [
        { word: "wrap", meaningKo: "마무리하다" },
        { word: "escape", meaningKo: "벗어나다" },
      ],
    },
    {
      id: "s5",
      en: "Where are you calling from today—home base or office?",
      ko: "오늘은 어디서 접속하세요—집이에요, 사무실이에요?",
      keywords: [
        { word: "calling from", meaningKo: "접속 장소" },
        { word: "home base", meaningKo: "집(기지)" },
      ],
    },
    {
      id: "s6",
      en: "If my Wi‑Fi acts up, I'll switch to audio.",
      ko: "제 와이파이가 말썽이면 오디오로 전환할게요.",
      keywords: [
        { word: "acts up", meaningKo: "말썽이다" },
        { word: "switch to", meaningKo: "전환하다" },
      ],
    },
    {
      id: "s7",
      en: "Shall we start with a quick recap and then decisions?",
      ko: "빠른 요약부터 하고 결정사항으로 갈까요?",
      keywords: [
        { word: "recap", meaningKo: "요약" },
        { word: "decision", meaningKo: "결정" },
      ],
    },
    {
      id: "s8",
      en: "Great, let's dive in before the calendar monster grabs us.",
      ko: "좋아요, 캘린더 괴물에게 잡히기 전에 바로 시작하죠.",
      keywords: [
        { word: "dive in", meaningKo: "시작하다" },
        { word: "calendar", meaningKo: "캘린더" },
      ],
    },
  ],
};
