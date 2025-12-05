import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const interviewSmartQuestion: Script = {
  id: "interview-smart-question",
  title: "Banter With the PM",
  categorySlug: "office_banter",
  categoryName: CATEGORY_NAMES["office_banter"],
  cleanedEnglish:
    "How to joke with a PM about bugs, show you’re not defensive, and still look like the teammate they want to work with.",
  sentences: [
    {
      id: "s1",
      en: "PMs always ask about bugs like they're ordering coffee.",
      ko: "PM들은 버그를 커피 주문하듯 물어봐요.",
      keywords: [
        { word: "PM", meaningKo: "프로덕트 매니저" },
        { word: "bug", meaningKo: "버그" },
      ],
    },
    {
      id: "s2",
      en: "I smile and say, 'Great, which bug is your favorite child?'",
      ko: "저는 웃으며 말해요, '좋아요, 버그 중에 최애가 뭐예요?'",
      keywords: [
        { word: "favorite", meaningKo: "최애" },
        { word: "smile", meaningKo: "미소짓다" },
      ],
    },
    {
      id: "s3",
      en: "They laugh because I’m not defensive.",
      ko: "제가 방어적이지 않아서 웃어요.",
      keywords: [
        { word: "defensive", meaningKo: "방어적인" },
        { word: "laugh", meaningKo: "웃다" },
      ],
    },
    {
      id: "s4",
      en: "Then I ask, 'What’s one bug we can leave unfixed to tell stories about later?'",
      ko: "그리고 묻죠, '나중에 얘깃거리로 남길 버그 하나 고르라면 뭘 남길까요?'",
      keywords: [
        { word: "unfixed", meaningKo: "안 고친" },
        { word: "later", meaningKo: "나중에" },
      ],
    },
    {
      id: "s5",
      en: "That question shows I'm okay with real life, not just perfect slides.",
      ko: "그 질문은 제가 완벽한 슬라이드보다 현실을 받아들인다는 걸 보여줘요.",
      keywords: [
        { word: "real life", meaningKo: "현실" },
        { word: "perfect", meaningKo: "완벽한" },
      ],
    },
    {
      id: "s6",
      en: "They usually say, 'We’ll ship with fewer surprises.'",
      ko: "그들은 보통 이렇게 말해요, '놀랄 일 없이 출시하겠네요.'",
      keywords: [
        { word: "ship", meaningKo: "출시하다" },
        { word: "surprise", meaningKo: "깜짝 놀랄 일" },
      ],
    },
    {
      id: "s7",
      en: "Now we’re joking together, not fighting about blame.",
      ko: "이제 우리는 탓을 두고 싸우는 게 아니라 함께 농담해요.",
      keywords: [
        { word: "blame", meaningKo: "비난" },
        { word: "together", meaningKo: "함께" },
      ],
    },
    {
      id: "s8",
      en: "We finish with, 'Cool, let's kill the worst bug and roast the rest later.'",
      ko: "마무리로 이렇게 말해요, '좋아요, 최악의 버그부터 잡고 나머지는 나중에 같이 놀려요.'",
      keywords: [
        { word: "finish", meaningKo: "마무리하다" },
        { word: "roast", meaningKo: "놀리다" },
      ],
    },
  ],
};
