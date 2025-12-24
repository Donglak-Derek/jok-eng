import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const emojiGuide: Script = {
  id: "emoji-guide",
  title: "The Emoji Guide",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish:
    "Decoding the hidden meanings of emojis. Mistake -> Fix format.",
  sentences: [
    {
      id: "e1",
      en: "Got it, thanks! 👍", // Fallback for audio/search
      keywords: [
        { word: "dismissive", definition: "showing indifference" },
      ],
      scenario: "Your boss sends a long update about the project timeline.",
      badResponse: {
        text: "👍",
        why: "To older bosses, this is fine. To Gen Z or Millennials, a single thumb can feel dismissive or sarcastic, like 'k, whatever'.",
      },
      goodResponse: {
        text: "Got it, thanks! 👍",
        why: "Adding text before the emoji makes it sound engaged and polite.",
      },
    },
    {
      id: "e2",
      en: "This is hilarious 😭",
      keywords: [
        { word: "laughter", definition: "act of laughing" },
      ],
      scenario: "Your friend sends a funny meme.",
      badResponse: {
        text: "That is funny 😂",
        why: "Using the 'tears of joy' emoji (😂) can make you seem older. It's not 'cool' anymore.",
      },
      goodResponse: {
        text: "This is hilarious 😭",
        why: "The 'loudly crying' emoji (😭) is the modern way to say 'dying of laughter'.",
      },
    },
    {
      id: "e3",
      en: "I'm dead 💀",
      keywords: [
        { word: "dead", definition: "figuratively: laughing hard" },
      ],
      scenario: "Someone tells an incredibly embarrassing story.",
      badResponse: {
        text: "LOL",
        why: "'LOL' can sometimes feel a bit dry or dated if used alone.",
      },
      goodResponse: {
        text: "I'm dead 💀",
        why: "The skull acts as a superlative. It means the story killed you (with laughter).",
      },
    },
    {
      id: "e4",
      en: "Great job... 🙃",
      keywords: [
        { word: "sarcasm", definition: "using irony to mock" },
      ],
      scenario: "The printer breaks right before a deadline.",
      badResponse: {
        text: "Great job.",
        why: "Without an emoji, this just sounds angry or confusing.",
      },
      goodResponse: {
        text: "Great job... 🙃",
        why: "The upside-down face signals 'my life is a mess but I'm smiling through the pain' (sarcasm).",
      },
    },
    {
      id: "e5",
      en: "Thanks for the feedback!",
      keywords: [
        { word: "passive-aggressive", definition: "indirectly hostile" },
      ],
      scenario: "A colleague critiques your work.",
      badResponse: {
        text: "Thanks for the feedback. 🙂",
        why: "The slight smile (🙂) often reads as 'I hate you but I'm being professional'. It's very passive-aggressive.",
      },
      goodResponse: {
        text: "Thanks for the feedback!",
        why: "No emoji is better here. Or use a genuine smile (😄) if you really mean it.",
      },
    },
    {
      id: "e6",
      en: "Can you help me? 🙏",
      keywords: [
        { word: "pleading", definition: "asking emotionally" },
      ],
      scenario: "Asking a favor from a busy coworker.",
      badResponse: {
        text: "Can you help me?",
        why: "A naked request can feel demanding.",
      },
      goodResponse: {
        text: "Can you help me? 🙏",
        why: "The folded hands (🙏) softens the request, meaning 'please' or 'thank you'.",
      },
    },
    {
      id: "e7",
      en: "I see what's happening 👀",
      keywords: [
        { word: "drama", definition: "exciting or emotional events" },
      ],
      scenario: "Two coworkers are arguing in the group chat.",
      badResponse: {
        text: "Wow.",
        why: "Too direct. You might get dragged into the fight.",
      },
      goodResponse: {
        text: "👀",
        why: "The eyes emoji means 'I am watching this drama unfold and eating popcorn'. It's playful voyeurism.",
      },
    },
    {
      id: "e8",
      en: "I messed up 🤡",
      keywords: [
        { word: "clown", definition: "foolish or funny person" },
      ],
      scenario: "You believed a fake news headline.",
      badResponse: {
        text: "I was stupid.",
        why: "A bit too self-deprecating and sad.",
      },
      goodResponse: {
        text: "I messed up 🤡",
        why: "Calling yourself a clown implies 'I acted foolishly' in a funny, self-aware way.",
      },
    },
    {
      id: "e9",
      en: "It's a 'surprise' ✨",
      keywords: [
        { word: "emphasis", definition: "special importance" },
      ],
      scenario: "Describing a mandatory fun work event.",
      badResponse: {
        text: "It is a surprise.",
        why: "Sounds like a factual statement.",
      },
      goodResponse: {
        text: "It's a ✨surprise✨",
        why: "Surrounding a word with sparkles adds sarcasm or ironic excitement.",
      },
    },
    {
      id: "e10",
      en: "Sorry about that 🫠",
      keywords: [
        { word: "cringe", definition: "embarrassment" },
      ],
      scenario: "You accidentally reply-all to the whole company.",
      badResponse: {
        text: "Sorry.",
        why: "Too serious. Makes people worry you're actually in trouble.",
      },
      goodResponse: {
        text: "Sorry about that 🫠",
        why: "The melting face says 'I am dissolving from embarrassment'. Resonates well with everyone.",
      },
    },
  ],
};
