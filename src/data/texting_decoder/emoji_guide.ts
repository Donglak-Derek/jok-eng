import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const emojiGuide: Script = {
  id: "emoji-guide",
  title: "The Emoji Guide",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish:
    "Decoding the hidden meanings of emojis. When is a smile actually a smile?",
  sentences: [
    {
      id: "e1",
      en: "🙂 The Slight Smile: Often used to be passive-aggressive or dismissive.",
      ko: "🙂 약간의 미소: 종종 수동적 공격적이거나 무시할 때 사용됨.",
      keywords: [
        { word: "passive-aggressive", meaningKo: "수동적 공격적인" },
      ],
    },
    {
      id: "e2",
      en: "😭 Loudly Crying: Usually means 'dying of laughter', not actual sadness.",
      ko: "😭 대성통곡: 보통 '웃겨 죽음'을 의미함, 진짜 슬픔 아님.",
      keywords: [
        { word: "laughter", meaningKo: "웃음" },
      ],
    },
    {
      id: "e3",
      en: "💀 Skull: 'I'm dead' (from laughing). A stronger version of lol.",
      ko: "💀 해골: '나 죽음' (웃겨서). lol의 더 강한 버전.",
      keywords: [
        { word: "dead", meaningKo: "죽은 (여기선 웃겨 죽음)" },
      ],
    },
    {
      id: "e4",
      en: "🙃 Upside-down Face: Sarcasm, irony, or 'my life is a mess but I'm smiling'.",
      ko: "🙃 거꾸로 된 얼굴: 비꼬기, 아이러니, 또는 '내 인생은 엉망이지만 웃고 있어'.",
      keywords: [
        { word: "sarcasm", meaningKo: "비꼬기" },
        { word: "irony", meaningKo: "반어법" },
      ],
    },
    {
      id: "e5",
      en: "👍 Thumbs Up: Can be seen as dismissive or 'conversation over' to younger generations.",
      ko: "👍 엄지 척: 젊은 세대에게는 무시하거나 '대화 종료'로 보일 수 있음.",
      keywords: [
        { word: "dismissive", meaningKo: "무시하는" },
      ],
    },
    {
      id: "e6",
      en: "🙏 Folded Hands: Thank you, please, or sometimes 'high five' (rarely).",
      ko: "🙏 합장: 감사합니다, 부탁해요, 또는 가끔 '하이파이브' (드뭄).",
      keywords: [
        { word: "rarely", meaningKo: "드물게" },
      ],
    },
    {
      id: "e7",
      en: "👀 Eyes: 'I see this', 'drama happening', or 'looking at something interesting'.",
      ko: "👀 눈: '보고 있다', '드라마(싸움/가십) 발생', 또는 '흥미로운 것 발견'.",
      keywords: [
        { word: "drama", meaningKo: "극적인 사건, 가십" },
      ],
    },
    {
      id: "e8",
      en: "🤡 Clown Face: You look foolish or you did something stupid.",
      ko: "🤡 광대: 너 바보 같아 보임 또는 멍청한 짓을 함.",
      keywords: [
        { word: "foolish", meaningKo: "어리석은" },
      ],
    },
    {
      id: "e9",
      en: "✨ Sparkles: Emphasis, sarcasm, or adding 'pizzazz' to a word.",
      ko: "✨ 반짝이: 강조, 비꼬기, 또는 단어에 '화려함' 더하기.",
      keywords: [
        { word: "emphasis", meaningKo: "강조" },
        { word: "pizzazz", meaningKo: "활기, 화려함" },
      ],
    },
    {
      id: "e10",
      en: "🫠 Melting Face: Embarrassment, dread, or sinking feeling.",
      ko: "🫠 녹는 얼굴: 당황, 두려움, 또는 가라앉는 기분.",
      keywords: [
        { word: "embarrassment", meaningKo: "당황, 창피" },
        { word: "dread", meaningKo: "두려움" },
      ],
    },
  ],
};
