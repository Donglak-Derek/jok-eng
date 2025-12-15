import { Script } from "@/types";

export const jobExaggerator: Script = {
  id: "party_job_exaggerator",
  type: "story_flow",
  title: "The Job Exaggerator",
  categorySlug: "the_party_survival_kit",
  categoryName: "The Party Survival Kit",
  cleanedEnglish: "Make a boring job sound epic. Turn 'online shopping' into 'logistics management'.",
  cleanedKorean: "지루한 일을 거창하게 포장하기. '인터넷 쇼핑'을 '국제 물류 관리'로 둔갑시키는 법.",
  icon: "📦",
  context: "Use this when introducing yourself to make a boring topic fun.",
  segments: [
    {
      step: "The Setup",
      text: "I manage high-stakes international logistics...",
      ko: "저는 고위험 국제 물류 관리를 담당하고 있어요...",
      keywords: [{ word: "high-stakes", meaningKo: "위험 부담이 큰/중대한" }, { word: "logistics", meaningKo: "물류" }],
      note: "Sound very serious and professional.",
    },
    {
      step: "The Twist",
      text: "...which mostly means I track my own Amazon packages.",
      ko: "...주로 제 아마존 택배 배송 조회한다는 뜻이죠.",
      keywords: [
        { word: "mostly", meaningKo: "주로" },
        { word: "track", meaningKo: "추적하다" },
      ],
      note: "Smile and drop the serious tone.",
    },
    {
      step: "The Punchline",
      text: "It's a stressful life, but someone has to order the vitamins.",
      ko: "스트레스 받는 삶이지만, 누군가는 비타민을 주문해야 하잖아요.",
      keywords: [
        { word: "stressful", meaningKo: "스트레스 받는" },
        { word: "order", meaningKo: "주문하다" },
      ],
      note: "Shrug your shoulders.",
    },
  ],
  sentences: [],
};
