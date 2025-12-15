import { Script } from "@/types";

export const storyConstructionScript: Script = {
  id: "party_01",
  type: "story_flow",
  title: "The 'Where are you from?' Deflector",
  categorySlug: "the_party_survival_kit",
  categoryName: "The Party Survival Kit",
  cleanedEnglish: "The Story Construction: Break a story into Hook -> Context -> Punchline.",
  cleanedKorean: "스토리 구성법: 이야기를 '훅 -> 맥락 -> 펀치라인'으로 나누어 구성하는 방법을 배웁니다.",
  icon: "🌏",
  context: "Use this when someone asks where you are from, but you want to be funny, not boring.",
  segments: [
    {
      step: "The Setup",
      text: "I'm from Korea...",
      ko: "저는 한국에서 왔어요...",
      keywords: [{ word: "Korea", meaningKo: "한국" }],
      note: "Say this normally.",
    },
    {
      step: "The Twist",
      text: "...which means I'm legally required to be good at StarCraft.",
      ko: "...그 말은 제가 스타크래프트를 잘해야 할 법적 의미가 있다는 뜻이죠.",
      keywords: [
        { word: "legally", meaningKo: "법적으로" },
        { word: "required", meaningKo: "요구되는" },
        { word: "StarCraft", meaningKo: "스타크래프트 (게임)" },
      ],
      note: "Pause for 1 second before saying 'StarCraft'.",
    },
    {
      step: "The Punchline",
      text: "But honestly? I lose to easy bots.",
      ko: "근데 솔직히요? 쉬운 봇한테도 져요.",
      keywords: [
        { word: "honestly", meaningKo: "솔직히" },
        { word: "lose", meaningKo: "지다" },
        { word: "bots", meaningKo: "로봇 (AI)" },
      ],
      note: "Say this with a sigh/disappointed face.",
    },
  ],
  sentences: [], // Empty for story_flow type
};
