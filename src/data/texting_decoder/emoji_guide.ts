import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const emojiGuide: Script = {
  id: "emoji-guide",
  title: "The Emoji Guide",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Decoding the hidden meanings of emojis.",
  type: "decoder",
  section: "signal_decoders",
  imageUrl: "/images/scenarios/emoji_guide.png",
  summaryPoints: [
    "Emojis rarely mean what they look like literal.",
    "The skull (💀) means laughter, not death.",
    "The slight smile (🙂) is almost always a threat."
  ],
  decoderItems: [
    {
      id: "emoji-1",
      phrase: "🙂 (Slight Smile)",
      literalMeaning: "I am happy / smiling.",
      actualMeaning: "I am pretending to be fine but I secretly hate this situation.",
      dangerLevel: "High - Passive Aggressive",
      survivalTip: "If you see this during an argument, stop. You are in danger."
    },
    {
      id: "emoji-2",
      phrase: "💀 (Skull)",
      literalMeaning: "Death / Danger.",
      actualMeaning: "I am dying of laughter. This is very funny.",
      dangerLevel: "Safe - Good Sign",
      survivalTip: "This is a compliment. You were funny."
    },
    {
      id: "emoji-3",
      phrase: "🙃 (Upside Down)",
      literalMeaning: "Silly / Goofy.",
      actualMeaning: "My life is falling apart but I'm smiling through the pain.",
      dangerLevel: "Medium - Sarcastic",
      survivalTip: "They are complaining or being sarcastic. Don't take it literally."
    },
    {
      id: "emoji-4",
      phrase: "👍 (Thumbs Up)",
      literalMeaning: "Good job / Yes.",
      actualMeaning: "I acknowledge you but I don't want to talk anymore.",
      dangerLevel: "Medium - Dismissive",
      survivalTip: "If sent by a Boomer/Gen X, it's fine. If sent by Gen Z, they are dismissing you."
    },
    {
      id: "emoji-5",
      phrase: "😭 (Loudly Crying)",
      literalMeaning: "I am sad.",
      actualMeaning: "I am overwhelmed with emotion (either very funny or very cute).",
      dangerLevel: "Safe - Positive",
      survivalTip: "Context matters. If they say 'I can't' with this, it's usually good."
    },
    {
      id: "emoji-6",
      phrase: "🤡 (Clown)",
      literalMeaning: "Circus performer.",
      actualMeaning: "I am a fool / You are a fool.",
      dangerLevel: "Medium - Self Deprecating",
      survivalTip: "Usually used on oneself: 'I texted him again 🤡'."
    },
    {
      id: "emoji-7",
      phrase: "✨ (Sparkles)",
      literalMeaning: "Magic / Clean.",
      actualMeaning: "Adds emphasis, often ironically. 'It's a ✨disaster✨'.",
      dangerLevel: "Low - Sarcastic",
      survivalTip: "Read the text between sparkles with a sarcastic tone."
    },
    {
      id: "emoji-8",
      phrase: "🙏 (Folded Hands)",
      literalMeaning: "Prayer.",
      actualMeaning: "Please / Thank you / High five (rarely).",
      dangerLevel: "Safe",
      survivalTip: "Used to soften a request: 'Can you help? 🙏'"
    }
  ]
};
