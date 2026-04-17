export const CATEGORY_DETAILS: Record<
  string,
  { name: string; description: string; image: string; color: string }
> = {
  the_party_survival_kit: {
    name: "Party Survival Kit",
    description: "What to say at parties so you are never awkward or left out.",
    image: "/images/categories/party_survival_kit_v2.png",
    color: "orange",
  },
  dating_and_disasters: {
    name: "Dating & Disasters",
    description: "What to do when things get awkward on dates or in emergency situations.",
    image: "/images/categories/dating_and_disasters_v2.png",
    color: "pink",
  },
  office_banter: {
    name: "Office Survival",
    description: "Learn how to joke with your coworkers and be popular at work.",
    image: "/images/categories/office_banter_v2.png",
    color: "blue",
  },
  small_talk: {
    name: "Everyday Small Talk",
    description: "How to talk to strangers and start a friendly conversation.",
    image: "/images/categories/small_talk_v2.png",
    color: "emerald",
  },
  the_sarcasm_detector: {
    name: "Sarcasm & Jokes",
    description: "Learn how to understand when Americans are joking or using sarcasm.",
    image: "/images/categories/sarcasm_detector_v2.png",
    color: "purple",
  },
  the_polite_fight: {
    name: "How to Disagree",
    description: "How to say no and fight back without making people hate you.",
    image: "/images/categories/polite_fight_v2.png",
    color: "indigo",
  },
  texting_decoder: {
    name: "Texting & Emails",
    description: "Learn the unwritten rules of texting so you don't sound like a robot.",
    image: "/images/categories/texting_decoder_v2.png",
    color: "cyan",
  },
};
// Add new categories by extending CATEGORY_DETAILS.

export const CATEGORY_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_DETAILS).map(([slug, details]) => [
    slug,
    details.name,
  ])
);
