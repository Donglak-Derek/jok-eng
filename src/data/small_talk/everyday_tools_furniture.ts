import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const toolsAndFurniture: Script = {
  id: "everyday-tools-furniture",
  title: "Tools and Furniture Vocabulary",
  categorySlug: "small_talk",
  categoryName: CATEGORY_NAMES["small_talk"],
  cleanedEnglish:
    "Practice useful sentences with tools, furniture parts, and common actions. These will help at work and in daily life.",
  sentences: [
    {
      id: "s1",
      en: "Can you pass me the screwdriver?",
      ko: "드라이버 좀 건네주실래요?",
      keywords: [
        { word: "screwdriver", meaningKo: "드라이버" },
        { word: "pass", meaningKo: "건네다" },
      ],
    },
    {
      id: "s2",
      en: "I need a hammer to fix this.",
      ko: "이거 고치려면 망치가 필요해요.",
      keywords: [
        { word: "hammer", meaningKo: "망치" },
        { word: "fix", meaningKo: "고치다" },
      ],
    },
    {
      id: "s3",
      en: "The table leg is loose.",
      ko: "테이블 다리가 흔들려요.",
      keywords: [
        { word: "table leg", meaningKo: "테이블 다리" },
        { word: "loose", meaningKo: "헐거운" },
      ],
    },
    {
      id: "s4",
      en: "Please hold the shelf while I screw it in.",
      ko: "제가 나사 조이는 동안 선반 좀 잡아주세요.",
      keywords: [
        { word: "shelf", meaningKo: "선반" },
        { word: "screw in", meaningKo: "나사로 조이다" },
      ],
    },
    {
      id: "s5",
      en: "We need more nails for this build.",
      ko: "이 조립에는 못이 더 필요해요.",
      keywords: [
        { word: "nails", meaningKo: "못" },
        { word: "build", meaningKo: "조립하다" },
      ],
    },
    {
      id: "s6",
      en: "The chair is missing a screw.",
      ko: "의자에 나사가 하나 없어요.",
      keywords: [
        { word: "chair", meaningKo: "의자" },
        { word: "screw", meaningKo: "나사" },
      ],
    },
    {
      id: "s7",
      en: "Use the drill to make a hole.",
      ko: "구멍 뚫으려면 드릴을 쓰세요.",
      keywords: [
        { word: "drill", meaningKo: "드릴" },
        { word: "hole", meaningKo: "구멍" },
      ],
    },
    {
      id: "s8",
      en: "The sofa cushion is very soft.",
      ko: "소파 쿠션이 정말 부드러워요.",
      keywords: [
        { word: "sofa", meaningKo: "소파" },
        { word: "cushion", meaningKo: "쿠션" },
      ],
    },
    {
      id: "s9",
      en: "Can you tighten this bolt with a wrench?",
      ko: "이 볼트를 렌치로 조여 주실래요?",
      keywords: [
        { word: "bolt", meaningKo: "볼트" },
        { word: "wrench", meaningKo: "렌치" },
      ],
    },
    {
      id: "s10",
      en: "The bookshelf is too heavy to move alone.",
      ko: "책장이 혼자 옮기기엔 너무 무거워요.",
      keywords: [
        { word: "bookshelf", meaningKo: "책장" },
        { word: "heavy", meaningKo: "무거운" },
      ],
    },
    {
      id: "s11",
      en: "This drawer is stuck.",
      ko: "이 서랍이 안 열려요.",
      keywords: [
        { word: "drawer", meaningKo: "서랍" },
        { word: "stuck", meaningKo: "끼인" },
      ],
    },
    {
      id: "s12",
      en: "Be careful, the glass top can break easily.",
      ko: "조심하세요, 유리 상판은 쉽게 깨져요.",
      keywords: [
        { word: "glass top", meaningKo: "유리 상판" },
        { word: "break", meaningKo: "깨지다" },
      ],
    },
    {
      id: "s13",
      en: "IKEA has a simple design style.",
      ko: "이케아는 단순한 디자인 스타일이에요.",
      keywords: [
        { word: "design", meaningKo: "디자인" },
        { word: "style", meaningKo: "스타일" },
      ],
    },
    {
      id: "s14",
      en: "We should measure the space before building the bed.",
      ko: "침대 조립하기 전에 공간을 재야 해요.",
      keywords: [
        { word: "measure", meaningKo: "재다" },
        { word: "space", meaningKo: "공간" },
      ],
    },
    {
      id: "s15",
      en: "This lamp gives warm light.",
      ko: "이 램프는 따뜻한 빛을 줘요.",
      keywords: [
        { word: "lamp", meaningKo: "램프" },
        { word: "light", meaningKo: "빛" },
      ],
    },
  ],
};
