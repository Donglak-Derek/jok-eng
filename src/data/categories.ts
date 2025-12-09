export const CATEGORY_DETAILS: Record<
  string,
  { name: string; description: string; image: string }
> = {
  the_party_survival_kit: {
    name: "The Party Survival Kit",
    description: "Master the art of mingling with wit and charm.",
    image: "/images/categories/party_survival_kit.svg",
  },
  dating_and_disasters: {
    name: "Dating & Disasters",
    description: "Turn awkward moments into hilarious stories.",
    image: "/images/categories/dating_and_disasters.svg",
  },
  office_banter: {
    name: "Office Banter (Tech Edition)",
    description: "navigate the tech world with humor and code.",
    image: "/images/categories/office_banter.svg",
  },
  small_talk: {
    name: 'The "Small Talk" Shield',
    description: "Survive any elevator ride or waiting room silence.",
    image: "/images/categories/small_talk.svg",
  },
  the_sarcasm_detector: {
    name: "The Sarcasm Detector",
    description: "Sharpen your senses to spot the subtlest irony.",
    image: "/images/categories/sarcasm_detector.svg",
  },
};
// Add new categories by extending CATEGORY_DETAILS.

export const CATEGORY_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_DETAILS).map(([slug, details]) => [
    slug,
    details.name,
  ])
);
