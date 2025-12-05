import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const questionForms: Script = {
  id: "grammar-question-forms",
  title: "Is This a Joke?",
  categorySlug: "the_sarcasm_detector",
  categoryName: CATEGORY_NAMES["the_sarcasm_detector"],
  cleanedEnglish:
    "Questions that politely check tone—useful when you’re not sure if someone is serious or sarcastic.",
  sentences: [
    {
      id: "s1",
      en: "Sorry, is that a joke or for real?",
      ko: "미안한데, 그거 농담이에요 아니면 진짜예요?",
      keywords: [
        { word: "for real", meaningKo: "진짜" },
        { word: "joke", meaningKo: "농담" },
      ],
    },
    {
      id: "s2",
      en: "Are we being sarcastic or should I be worried?",
      ko: "지금 비꼬는 거예요, 아니면 걱정해야 하나요?",
      keywords: [
        { word: "sarcastic", meaningKo: "비꼬는" },
        { word: "worried", meaningKo: "걱정하는" },
      ],
    },
    {
      id: "s3",
      en: "Did you mean that literally or are we venting?",
      ko: "그거 문자 그대로 말한 거예요, 아니면 그냥 푸념이에요?",
      keywords: [
        { word: "literally", meaningKo: "문자 그대로" },
        { word: "venting", meaningKo: "푸념, 하소연" },
      ],
    },
    {
      id: "s4",
      en: "Do you want me to fix it or just laugh with you?",
      ko: "제가 해결해주길 바라요, 아니면 그냥 같이 웃길 바라요?",
      keywords: [
        { word: "fix", meaningKo: "고치다" },
        { word: "laugh", meaningKo: "웃다" },
      ],
    },
    {
      id: "s5",
      en: "Was that sarcasm or am I missing context?",
      ko: "그거 비꼼인가요, 아니면 제가 맥락을 놓쳤나요?",
      keywords: [
        { word: "context", meaningKo: "맥락" },
        { word: "missing", meaningKo: "놓치다" },
      ],
    },
    {
      id: "s6",
      en: "Are you serious, or is this your comedy set?",
      ko: "진심인가요, 아니면 지금 코미디 중인가요?",
      keywords: [
        { word: "serious", meaningKo: "진지한" },
        { word: "set", meaningKo: "세트, 공연" },
      ],
    },
    {
      id: "s7",
      en: "Should I laugh or grab a notepad?",
      ko: "웃어야 하나요, 아니면 메모해야 하나요?",
      keywords: [
        { word: "grab", meaningKo: "잡다/가져오다" },
        { word: "notepad", meaningKo: "메모장" },
      ],
    },
    {
      id: "s8",
      en: "Want me to take that seriously or keep it light?",
      ko: "그걸 진지하게 받아들일까요, 아니면 가볍게 둘까요?",
      keywords: [
        { word: "seriously", meaningKo: "진지하게" },
        { word: "keep it light", meaningKo: "가볍게 두다" },
      ],
    },
  ],
};
