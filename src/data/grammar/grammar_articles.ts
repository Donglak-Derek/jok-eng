import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const grammarArticles: Script = {
  id: "grammar-articles",
  title: "Tone Softeners",
  categorySlug: "grammar",
  categoryName: CATEGORY_NAMES["grammar"],
  cleanedEnglish:
    "Short add-ons that make sarcasm and banter feel safe—useful for emails and chats.",
  sentences: [
    {
      id: "s1",
      en: "Add 'just kidding' when you're unsure they caught the joke.",
      ko: "상대가 농담을 알아챘는지 애매하면 'just kidding'을 붙이세요.",
      keywords: [
        { word: "just kidding", meaningKo: "농담이야" },
        { word: "caught", meaningKo: "알아차리다" },
      ],
    },
    {
      id: "s2",
      en: "Use 'no offense' before a teasing remark to show it's friendly.",
      ko: "'no offense'를 장난 앞에 붙여서 친근한 말임을 보여주세요.",
      keywords: [
        { word: "no offense", meaningKo: "기분 나쁘게 하지 마세요" },
        { word: "teasing", meaningKo: "장난스러운" },
      ],
    },
    {
      id: "s3",
      en: "Say 'to be fair' to balance criticism with context.",
      ko: "비판에 맥락을 더하려면 'to be fair'라고 말하세요.",
      keywords: [
        { word: "to be fair", meaningKo: "공정하게 말하면" },
        { word: "context", meaningKo: "맥락" },
      ],
    },
    {
      id: "s4",
      en: "'Just a heads up' softens a warning.",
      ko: "'just a heads up'은 경고를 부드럽게 해요.",
      keywords: [
        { word: "heads up", meaningKo: "미리 알림" },
        { word: "warning", meaningKo: "경고" },
      ],
    },
    {
      id: "s5",
      en: "'Friendly reminder' keeps a nudge polite.",
      ko: "'friendly reminder'는 부탁을 정중하게 유지해요.",
      keywords: [
        { word: "friendly reminder", meaningKo: "친절한 알림" },
        { word: "nudge", meaningKo: "가벼운 요청" },
      ],
    },
    {
      id: "s6",
      en: "Add 'if that's cool' when asking for a small favor.",
      ko: "작은 부탁을 할 때 'if that's cool'을 덧붙이세요.",
      keywords: [
        { word: "favor", meaningKo: "부탁" },
        { word: "cool", meaningKo: "괜찮은" },
      ],
    },
    {
      id: "s7",
      en: "'No pressure' lowers tension after a request.",
      ko: "'no pressure'는 부탁 후 긴장을 낮춰요.",
      keywords: [
        { word: "pressure", meaningKo: "압박" },
        { word: "tension", meaningKo: "긴장" },
      ],
    },
    {
      id: "s8",
      en: "'Kidding/not kidding' signals playful truth.",
      ko: "'kidding/not kidding'은 장난스러운 진심을 알려줘요.",
      keywords: [
        { word: "kidding", meaningKo: "농담" },
        { word: "truth", meaningKo: "진심" },
      ],
    },
    {
      id: "s9",
      en: "Finish with 'what do you think?' to invite their take.",
      ko: "마무리에 '너는 어떻게 생각해?'를 붙여 의견을 초대하세요.",
      keywords: [
        { word: "invite", meaningKo: "초대하다" },
        { word: "take", meaningKo: "생각, 의견" },
      ],
    },
    {
      id: "s10",
      en: "If it lands badly, add 'Sorry, meant that as a joke.'",
      ko: "반응이 안 좋으면 '미안, 농담으로 한 말이었어요.'라고 덧붙이세요.",
      keywords: [
        { word: "land badly", meaningKo: "반응이 안 좋다" },
        { word: "meant", meaningKo: "의도했다" },
      ],
    },
  ],
};
