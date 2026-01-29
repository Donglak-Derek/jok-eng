export const CATEGORY_DETAILS: Record<
  string,
  { name: string; description: string; image: string; color: string }
> = {
  the_party_survival_kit: {
    name: "Social Strategy",
    description: "Master the art of the anecdote. Command attention in any room, from boardrooms to dinner parties.",
    image: "/images/categories/party_survival_kit.png",
    color: "orange",
  },
  dating_and_disasters: {
    name: "High-Stakes Resilience",
    description: "Transform potential social disasters into moments of connection. Never fear an awkward silence again.",
    image: "/images/categories/dating_and_disasters.png",
    color: "pink",
  },
  office_banter: {
    name: 'The Office "Secret Code"',
    description: "Navigate the unwritten rules of corporate culture. Small talk is the 'social glue' of your career.",
    image: "/images/categories/office_banter.png",
    color: "blue",
  },
  small_talk: {
    name: "Strategic Networking",
    description: "Turn 'boring' elevator talk into relationship building. Survive and thrive in professional gaps.",
    image: "/images/categories/small_talk.png",
    color: "emerald",
  },
  the_sarcasm_detector: {
    name: "Cultural Decoding",
    description: "Sharpen your senses to spot irony and subtext. Understand what isn't being said.",
    image: "/images/categories/sarcasm_detector.png",
    color: "purple",
  },
  the_polite_fight: {
    name: "Assertiveness & Conflict",
    description: "Disagreement without disrespect. How to push back while maintaining executive composure.",
    image: "/images/categories/polite_fight.png",
    color: "indigo",
  },
  texting_decoder: {
    name: "Digital Influence",
    description: "The unwritten rules of modern communication. Don't sound like a robot in your emails or chats.",
    image: "/images/categories/texting_decoder.png",
    color: "cyan",
  },
  custom: {
    name: "Executive Studio",
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
