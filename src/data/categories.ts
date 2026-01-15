export const CATEGORY_DETAILS: Record<
  string,
  { name: string; description: string; image: string; color: string }
> = {
  the_party_survival_kit: {
    name: "The Storyteller's Toolkit",
    description: "Master the art of the anecdote. Learn funny stories and stand-up bits to charm any crowd.",
    image: "/images/categories/party_survival_kit.png",
    color: "orange",
  },
  dating_and_disasters: {
    name: "Turning Awkward into Gold",
    description: "Transform daily embarrassments into hilarious stories. Never fear an awkward silence again.",
    image: "/images/categories/dating_and_disasters.png",
    color: "pink",
  },
  office_banter: {
    name: "Career & Office Talk",
    description: "From acing the interview to winning the water cooler. Essential scripts for professional success.",
    image: "/images/categories/office_banter.png",
    color: "blue",
  },
  small_talk: {
    name: 'The "Small Talk" Shield',
    description: "Survive any elevator ride or waiting room silence.",
    image: "/images/categories/small_talk.png",
    color: "emerald",
  },
  the_sarcasm_detector: {
    name: "The Sarcasm Detector",
    description: "Sharpen your senses to spot the subtlest irony.",
    image: "/images/categories/sarcasm_detector.png",
    color: "purple",
  },
  the_polite_fight: {
    name: "The 'Polite' Fight",
    description: "Conflict resolution for late starters who hate being rude.",
    image: "/images/categories/polite_fight.png",
    color: "indigo",
  },
  texting_decoder: {
    name: "Texting & Slang Decoder",
    description: "The unwritten rules of digital English. Don't text like a robot.",
    image: "/images/categories/texting_decoder.png",
    color: "cyan",
  },
  custom: {
    name: "My Studio",
    description: "Your personalized training ground. Scenarios you created with AI.",
    image: "", // No default image, uses GenerativeCover usually? Or we need a placeholder.
    color: "indigo",
  },
};
// Add new categories by extending CATEGORY_DETAILS.

export const CATEGORY_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_DETAILS).map(([slug, details]) => [
    slug,
    details.name,
  ])
);
