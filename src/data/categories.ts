export const CATEGORY_DETAILS: Record<
  string,
  { name: string; description: string; descriptionKo?: string; image: string }
> = {
  the_party_survival_kit: {
    name: "The Party Survival Kit",
    description: "Master the art of mingling with wit and charm.",
    descriptionKo: "재치와 매력으로 사교 모임을 장악하는 기술.",
    image: "/images/categories/party_survival_kit.svg",
  },
  dating_and_disasters: {
    name: "Dating & Disasters",
    description: "Turn awkward moments into hilarious stories.",
    descriptionKo: "어색한 순간을 웃긴 에피소드로 뒤집는 법.",
    image: "/images/categories/dating_and_disasters.svg",
  },
  office_banter: {
    name: "Office Banter (Tech Edition)",
    description: "navigate the tech world with humor and code.",
    descriptionKo: "유머와 코드로 테크 업계를 항해하세요.",
    image: "/images/categories/office_banter.svg",
  },
  small_talk: {
    name: 'The "Small Talk" Shield',
    description: "Survive any elevator ride or waiting room silence.",
    descriptionKo: "엘리베이터나 대기실의 정적에서 살아남기.",
    image: "/images/categories/small_talk.svg",
  },
  the_sarcasm_detector: {
    name: "The Sarcasm Detector",
    description: "Sharpen your senses to spot the subtlest irony.",
    descriptionKo: "가장 미묘한 반어법도 감지하는 감각을 기르세요.",
    image: "/images/categories/sarcasm_detector.svg",
  },
  the_polite_fight: {
    name: "The 'Polite' Fight",
    description: "Conflict resolution for late starters who hate being rude.",
    descriptionKo: "무례한 건 싫지만 할 말은 하고 싶은 당신을 위해.",
    image: "/images/categories/polite_fight.svg",
  },
  texting_decoder: {
    name: "Texting & Slang Decoder",
    description: "The unwritten rules of digital English. Don't text like a robot.",
    descriptionKo: "디지털 영어의 불문율. 로봇처럼 문자 하지 마세요.",
    image: "/images/categories/texting_decoder.svg",
  },
};
// Add new categories by extending CATEGORY_DETAILS.

export const CATEGORY_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_DETAILS).map(([slug, details]) => [
    slug,
    details.name,
  ])
);
