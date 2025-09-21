import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const interviewSmartQuestion: Script = {
  id: "interview-smart-question",
  title: "Smart Question at the End",
  categorySlug: "interview",
  categoryName: CATEGORY_NAMES["interview"],
  cleanedEnglish:
    "At the end of an interview, you can ask a powerful question that shows interest, helps you learn what success looks like, and leaves a strong impression.",
  sentences: [
    {
      id: "s1",
      en: "At the end of an interview, they usually ask, 'Do you have any questions?'",
      ko: "면접 끝에 보통 이렇게 물어요, '질문 있으세요?'",
      keywords: [
        { word: "interview", meaningKo: "면접" },
        { word: "questions", meaningKo: "질문" },
      ],
    },
    {
      id: "s2",
      en: "Many people ask something they don’t care about, or just say, 'No.'",
      ko: "많은 사람들이 별로 궁금하지 않은 걸 묻거나, 그냥 '없습니다'라고 말해요.",
      keywords: [
        { word: "care about", meaningKo: "신경 쓰다" },
        { word: "say no", meaningKo: "없다고 말하다" },
      ],
    },
    {
      id: "s3",
      en: "But this is a missed chance.",
      ko: "하지만 이건 놓친 기회예요.",
      keywords: [
        { word: "missed", meaningKo: "놓친" },
        { word: "chance", meaningKo: "기회" },
      ],
    },
    {
      id: "s4",
      en: "Instead, you can ask a strong question.",
      ko: "대신에 좋은 질문을 할 수 있어요.",
      keywords: [
        { word: "instead", meaningKo: "대신에" },
        { word: "strong question", meaningKo: "좋은 질문" },
      ],
    },
    {
      id: "s5",
      en: "Here’s the question: 'If this interview went really well, and a year later I had the job, what would I have done to make you feel hiring me was the right choice?'",
      ko: "이 질문을 해보세요: '이 면접이 잘 되고, 1년 뒤 제가 이 일을 한다면, 제가 어떤 일을 해야 저를 뽑은 게 잘한 선택이라고 느끼실까요?'",
      keywords: [
        { word: "went well", meaningKo: "잘 되다" },
        { word: "right choice", meaningKo: "옳은 선택" },
      ],
    },
    {
      id: "s6",
      en: "Usually, they say, 'That’s a really good question.'",
      ko: "보통 이렇게 말해요, '정말 좋은 질문이네요.'",
      keywords: [
        { word: "usually", meaningKo: "보통" },
        { word: "good question", meaningKo: "좋은 질문" },
      ],
    },
    {
      id: "s7",
      en: "This question does two things.",
      ko: "이 질문은 두 가지 효과가 있어요.",
      keywords: [
        { word: "two things", meaningKo: "두 가지" },
        { word: "effect", meaningKo: "효과" },
      ],
    },
    {
      id: "s8",
      en: "First, it makes them imagine giving you the job.",
      ko: "첫째, 그들이 당신을 뽑는 장면을 상상하게 해요.",
      keywords: [
        { word: "imagine", meaningKo: "상상하다" },
        { word: "giving the job", meaningKo: "일을 주다" },
      ],
    },
    {
      id: "s9",
      en: "Second, they tell you exactly what you need to do to succeed.",
      ko: "둘째, 성공하기 위해 필요한 일을 정확히 알려줘요.",
      keywords: [
        { word: "exactly", meaningKo: "정확히" },
        { word: "succeed", meaningKo: "성공하다" },
      ],
    },
    {
      id: "s10",
      en: "Bosses love when you want to know how to do a good job.",
      ko: "상사들은 당신이 어떻게 잘할 수 있는지 궁금해할 때 좋아해요.",
      keywords: [
        { word: "boss", meaningKo: "상사" },
        { word: "good job", meaningKo: "잘하는 일" },
      ],
    },
    {
      id: "s11",
      en: "You can also use this idea when asking for a raise.",
      ko: "이 아이디어는 월급 인상 요청할 때도 쓸 수 있어요.",
      keywords: [
        { word: "raise", meaningKo: "월급 인상" },
        { word: "use", meaningKo: "사용하다" },
      ],
    },
  ],
};
