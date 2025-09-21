import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const questionForms: Script = {
  id: "grammar-question-forms",
  title: "Grammar: Question Forms",
  categorySlug: "grammar",
  categoryName: CATEGORY_NAMES["grammar"],
  cleanedEnglish:
    "Practice making correct question forms in English. Focus on word order, like 'What do you want?' instead of 'What you want?'.",
  sentences: [
    {
      id: "s1",
      en: "What do you want?",
      ko: "뭐 원해요?",
      keywords: [
        { word: "what", meaningKo: "무엇" },
        { word: "want", meaningKo: "원하다" },
      ],
    },
    {
      id: "s2",
      en: "Where do you live?",
      ko: "어디에 살아요?",
      keywords: [
        { word: "where", meaningKo: "어디" },
        { word: "live", meaningKo: "살다" },
      ],
    },
    {
      id: "s3",
      en: "When does the store open?",
      ko: "가게는 언제 열려요?",
      keywords: [
        { word: "when", meaningKo: "언제" },
        { word: "open", meaningKo: "열다" },
      ],
    },
    {
      id: "s4",
      en: "Why are you late?",
      ko: "왜 늦었어요?",
      keywords: [
        { word: "why", meaningKo: "왜" },
        { word: "late", meaningKo: "늦은" },
      ],
    },
    {
      id: "s5",
      en: "Who is calling me?",
      ko: "누가 저한테 전화해요?",
      keywords: [
        { word: "who", meaningKo: "누구" },
        { word: "calling", meaningKo: "전화하다" },
      ],
    },
    {
      id: "s6",
      en: "How are you today?",
      ko: "오늘 어때요?",
      keywords: [
        { word: "how", meaningKo: "어떻게" },
        { word: "today", meaningKo: "오늘" },
      ],
    },
    {
      id: "s7",
      en: "What time is it?",
      ko: "몇 시예요?",
      keywords: [
        { word: "time", meaningKo: "시간" },
        { word: "it", meaningKo: "그것/현재" },
      ],
    },
    {
      id: "s8",
      en: "Do you like coffee?",
      ko: "커피 좋아해요?",
      keywords: [
        { word: "like", meaningKo: "좋아하다" },
        { word: "coffee", meaningKo: "커피" },
      ],
    },
    {
      id: "s9",
      en: "Does she work here?",
      ko: "그녀는 여기서 일해요?",
      keywords: [
        { word: "work", meaningKo: "일하다" },
        { word: "here", meaningKo: "여기" },
      ],
    },
    {
      id: "s10",
      en: "Can you help me?",
      ko: "저 좀 도와줄 수 있어요?",
      keywords: [
        { word: "help", meaningKo: "도와주다" },
        { word: "can", meaningKo: "할 수 있다" },
      ],
    },
    {
      id: "s11",
      en: "Should I bring my resume?",
      ko: "제 이력서를 가져가야 할까요?",
      keywords: [
        { word: "should", meaningKo: "해야 한다" },
        { word: "resume", meaningKo: "이력서" },
      ],
    },
    {
      id: "s12",
      en: "Would you like some water?",
      ko: "물 좀 드실래요?",
      keywords: [
        { word: "would", meaningKo: "~할래요" },
        { word: "water", meaningKo: "물" },
      ],
    },
    {
      id: "s13",
      en: "Have you been to New York?",
      ko: "뉴욕에 가본 적 있어요?",
      keywords: [
        { word: "have been", meaningKo: "가본 적 있다" },
        { word: "New York", meaningKo: "뉴욕" },
      ],
    },
    {
      id: "s14",
      en: "What are you doing?",
      ko: "뭐 하고 있어요?",
      keywords: [
        { word: "doing", meaningKo: "하고 있다" },
        { word: "what", meaningKo: "무엇" },
      ],
    },
    {
      id: "s15",
      en: "Where are they going?",
      ko: "그들은 어디 가고 있어요?",
      keywords: [
        { word: "they", meaningKo: "그들" },
        { word: "going", meaningKo: "가고 있다" },
      ],
    },
    {
      id: "s16",
      en: "How long have you lived here?",
      ko: "여기서 얼마나 오래 살았어요?",
      keywords: [
        { word: "how long", meaningKo: "얼마나 오래" },
        { word: "lived", meaningKo: "살았다" },
      ],
    },
    {
      id: "s17",
      en: "When will you finish the project?",
      ko: "언제 프로젝트를 끝낼 거예요?",
      keywords: [
        { word: "finish", meaningKo: "끝내다" },
        { word: "project", meaningKo: "프로젝트" },
      ],
    },
    {
      id: "s18",
      en: "Why didn’t you call me?",
      ko: "왜 저한테 전화 안 했어요?",
      keywords: [
        { word: "didn’t", meaningKo: "하지 않았다" },
        { word: "call", meaningKo: "전화하다" },
      ],
    },
    {
      id: "s19",
      en: "Who will join the meeting?",
      ko: "누가 회의에 참여할 거예요?",
      keywords: [
        { word: "join", meaningKo: "참여하다" },
        { word: "meeting", meaningKo: "회의" },
      ],
    },
    {
      id: "s20",
      en: "What kind of music do you like?",
      ko: "어떤 음악 좋아해요?",
      keywords: [
        { word: "kind", meaningKo: "종류" },
        { word: "music", meaningKo: "음악" },
      ],
    },
  ],
};
