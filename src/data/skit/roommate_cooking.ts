import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const roommateCooking: Script = {
  id: "skit-roommate-cooking",
  title: "Kitchen Disaster Date",
  categorySlug: "skit",
  categoryName: CATEGORY_NAMES["skit"],
  cleanedEnglish:
    "A date that turns into a cooking-show fail—great for telling friends because it’s self-aware and still sweet.",
  sentences: [
    { id: "s1", en: "We cooked together on a third date to save money.", ko: "세 번째 데이트에 돈 아끼려고 같이 요리했어요.", keywords: [ { word: "third date", meaningKo: "세 번째 데이트" }, { word: "save money", meaningKo: "돈을 아끼다" } ] },
    { id: "s2", en: "I said, 'Welcome to my cooking show: Burning Water with Me.'", ko: "제가 말했죠, '내 요리 쇼에 온 걸 환영합니다: 나와 함께 물 태우기.'", keywords: [ { word: "burning", meaningKo: "태우는" }, { word: "welcome", meaningKo: "환영하다" } ] },
    { id: "s3", en: "The pasta stuck together like we were at a team-building event.", ko: "파스타가 팀빌딩하듯 서로 붙었어요.", keywords: [ { word: "stuck", meaningKo: "달라붙은" }, { word: "team-building", meaningKo: "팀빌딩" } ] },
    { id: "s4", en: "The smoke alarm yelled louder than we did.", ko: "연기 감지기가 우리보다 크게 소리쳤어요.", keywords: [ { word: "smoke alarm", meaningKo: "연기 감지기" }, { word: "yell", meaningKo: "소리치다" } ] },
    { id: "s5", en: "I joked, 'That's our live studio audience.'", ko: "농담했어요, '저게 우리 라이브 관객이야.'", keywords: [ { word: "audience", meaningKo: "관객" }, { word: "live", meaningKo: "라이브" } ] },
    { id: "s6", en: "We opened windows for a 'commercial break.'", ko: "창문을 열고 '광고 시간'을 가졌어요.", keywords: [ { word: "commercial break", meaningKo: "광고 시간" }, { word: "window", meaningKo: "창문" } ] },
    { id: "s7", en: "She said, 'Next time we order pizza and just roast our days.'", ko: "그녀가 말했어요, '다음에는 피자를 시키고 서로 하루를 놀리자.'", keywords: [ { word: "order", meaningKo: "주문하다" }, { word: "roast", meaningKo: "놀리다" } ] },
    { id: "s8", en: "We laughed, ate crunchy pasta, and still had fun.", ko: "우리는 웃으며 바삭한 파스타를 먹고도 즐거웠어요.", keywords: [ { word: "crunchy", meaningKo: "바삭한" }, { word: "still", meaningKo: "여전히" } ] },
  ],
};
