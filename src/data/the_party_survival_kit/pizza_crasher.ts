import { Script } from "@/types";

export const pizzaCrasher: Script = {
  id: "party_pizza_crasher",
  type: "story_flow",
  title: "The Pizza Crasher",
  categorySlug: "the_party_survival_kit",
  categoryName: "The Party Survival Kit",
  cleanedEnglish: "How do you know the host? A funny way to admit you don't really know anyone.",
  cleanedKorean: "호스트랑 어떻게 아냐고요? 모르는 사람이라고 유머러스하게 고백하는 법.",
  icon: "🍕",
  context: "Use this when someone asks 'How do you know the host?' and you want to be funny.",
  segments: [
    {
      step: "The Setup",
      text: "I told everyone I'm the host's distant cousin...",
      ko: "사람들한텐 제가 호스트의 먼 사촌이라고 했는데요...",
      keywords: [{ word: "distant cousin", meaningKo: "먼 사촌" }],
      note: "Whisper this like a secret.",
    },
    {
      step: "The Twist",
      text: "...but actually, I just followed the smell of free pizza.",
      ko: "...사실은 그냥 공짜 피자 냄새 맡고 따라왔어요.",
      keywords: [
        { word: "actually", meaningKo: "사실은" },
        { word: "smell", meaningKo: "냄새" },
      ],
      note: "Point to your nose or the food table.",
    },
    {
      step: "The Punchline",
      text: "Don't tell anyone, or I'll have to share my slice.",
      ko: "아무한테도 말하지 마요, 안 그럼 내 피자 나눠줘야 되니까.",
      keywords: [
        { word: "share", meaningKo: "나누다" },
        { word: "slice", meaningKo: "조각" },
      ],
      note: "Wink or make a 'shh' gesture.",
    },
  ],
  sentences: [],
};
