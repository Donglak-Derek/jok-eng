import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const basicsTenses: Script = {
  id: "grammar-basics-tenses",
  title: "Sarcasm Detector 101",
  categorySlug: "grammar",
  categoryName: CATEGORY_NAMES["grammar"],
  cleanedEnglish:
    "Spot when someone is being sarcastic and reply without sounding offended or confused.",
  sentences: [
    { id: "s1", en: "Friend: 'Oh great, another Monday.' Tone: sarcastic complaint.", ko: "친구: '아, 또 월요일이네.' 톤: 비꼬는 불평.", keywords: [ { word: "sarcastic", meaningKo: "비꼬는" }, { word: "tone", meaningKo: "톤" } ] },
    { id: "s2", en: "You: 'Same here. Did we accidentally order extra Monday?' playful agreement.", ko: "나: '나도요. 월요일을 추가 주문한 건가요?' 장난스러운 동의.", keywords: [ { word: "accidentally", meaningKo: "실수로" }, { word: "order", meaningKo: "주문하다" } ] },
    { id: "s3", en: "If someone says 'Love waiting in line,' they mean they hate it.", ko: "'줄 서기 정말 좋아해'라고 하면 사실 싫다는 뜻이에요.", keywords: [ { word: "mean", meaningKo: "의미하다" }, { word: "hate", meaningKo: "싫어하다" } ] },
    { id: "s4", en: "You can reply, 'Right? We should get loyalty points for patience.'", ko: "이렇게 답해요, '그쵸? 인내심 포인트라도 줘야죠.'", keywords: [ { word: "loyalty points", meaningKo: "포인트" }, { word: "patience", meaningKo: "인내" } ] },
    { id: "s5", en: "Sarcasm often uses flat tone and exaggeration.", ko: "비꼼은 보통 평평한 톤과 과장을 써요.", keywords: [ { word: "flat tone", meaningKo: "평평한 톤" }, { word: "exaggeration", meaningKo: "과장" } ] },
    { id: "s6", en: "If you’re unsure, ask lightly: 'Is that a joke or mission statement?'", ko: "헷갈리면 가볍게 물어보세요: '그거 농담이에요, 아니면 진짜 목표에요?'", keywords: [ { word: "unsure", meaningKo: "확신이 없는" }, { word: "mission statement", meaningKo: "사명 선언" } ] },
    { id: "s7", en: "If they laugh, you matched their style. If not, shift to sincere.", ko: "상대가 웃으면 스타일을 맞춘 거고, 아니면 진지하게 전환하세요.", keywords: [ { word: "sincere", meaningKo: "진지한" }, { word: "shift", meaningKo: "전환하다" } ] },
    { id: "s8", en: "You can say, 'Got it. So for real—what do you prefer?'", ko: "이렇게 말할 수 있어요, '알겠어요. 진짜로는 뭘 선호하세요?'", keywords: [ { word: "for real", meaningKo: "진짜로" }, { word: "prefer", meaningKo: "선호하다" } ] },
  ],
};
