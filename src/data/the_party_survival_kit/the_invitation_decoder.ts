
import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const theInvitationDecoder: Script = {
  id: "party-invitation-decoder",
  title: "The Invitation Decoder",
  categorySlug: "the_party_survival_kit",
  categoryName: CATEGORY_NAMES["the_party_survival_kit"],
  section: "boss_battles",
  cleanedEnglish: "Understanding dress codes and aggressive politeness.",
  imageUrl: "/images/scenarios/invitation_decoder_3d.png",
  difficulty: "Spicy 🌶️🌶️🌶️",
  type: "decoder",
  
  decoderItems: [
    {
      id: "d1",
      phrase: "[Casual] dress.",
      literalMeaning: "Wear whatever you want.",
      actualMeaning: "Look nice, but don't wear a tuxedo. Jeans are fine, sweatpants are a crime.",
      dangerLevel: "Caution ⚠️", // 50
      survivalTip: "When in doubt, wear 'Smart Casual' (clean jeans + nice shirt). Never look messy.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "What should I wear to the BBQ?",
        textB: "Oh, it's casual dress.",
        contextNote: "Casual at a party is very different from casual at home."
      },
      keywords: [
          { word: "Casual", definition: "Relaxed dress code, but still neat/presentable." }
      ]
    },
    {
      id: "d2",
      phrase: "[No gifts], please.",
      literalMeaning: "Do not bring a present.",
      actualMeaning: "I am obligated to say this, but if you show up empty-handed you might look cheap.",
      dangerLevel: "Danger 🛑", // 90
      survivalTip: "Bring something consumable (wine, flowers, chocolate). It doesn't count as a 'gift' but shows respect.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "Can I bring anything for your birthday?",
        textB: "No no, no gifts please! Just your presence.",
        contextNote: "Bringing a bottle of wine never hurts. Showing up with nothing is risky."
      },
      keywords: [
          { word: "No gifts", definition: "A polite request, often ignored for small items like wine." }
      ]
    },
    {
      id: "d3",
      phrase: "Bring [whoever]!",
      literalMeaning: "You can bring as many people as you want.",
      actualMeaning: "You can bring one (1) person, usually a partner or close friend. Do NOT bring a crowd.",
      dangerLevel: "Danger 🛑", // 90
      survivalTip: "Always ask 'Is it cool if I bring X?' before assuming.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "I have my cousin staying with me.",
        textB: "Oh, bring whoever! The more the merrier.",
        contextNote: "If you bring 5 people, you will never be invited again."
      },
      keywords: [
          { word: "whoever", definition: "Anyone you want (usually implies +1, not a group)." }
      ]
    },
    {
      id: "d4",
      phrase: "Come around [7-ish].",
      literalMeaning: "Arrive at approximately 7:00 PM.",
      actualMeaning: "Do not arrive before 7:15. If you knock at 7:00, I will still be in the shower.",
      dangerLevel: "Caution ⚠️", // 50
      survivalTip: "For house parties, 'ish' means 'late'. Arrive 15-30 minutes after the start time.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "What time does it start?",
        textB: "Come around 7-ish.",
        contextNote: "Arriving exactly on time is often stressful for the host."
      },
      keywords: [
          { word: "7-ish", definition: "Around 7:00, usually meaning 15-30 minutes late." }
      ]
    },
    {
      id: "d5",
      phrase: "Make yourself [at home].",
      literalMeaning: "Act as if this is your house.",
      actualMeaning: "Relax on the couch, but do not open my fridge or go into my bedroom.",
      dangerLevel: "Safe ✅", // 15
      survivalTip: "Sit down and relax, but ask permission before taking food or drinks.",
      conversation: {
        speakerA: "them",
        speakerB: "me",
        textA: "Wow, nice place!",
        textB: "Thanks! Make yourself at home.",
        contextNote: "It's an invitation to comfort, not ownership."
      },
      keywords: [
          { word: "at home", definition: "Comfortable, but respecting boundaries." }
      ]
    },
  ],

  summaryPoints: [
    "'Casual' means nice jeans, not pajamas.",
    "'No gifts' often means 'bring wine/chocolate'.",
    "'Ish' always implies being slightly late.",
    "'Bring whoever' has a limit of +1.",
    "Respect the host's privacy even when 'at home'."
  ],

  quizItems: [
    {
      question: "What does '7-ish' typically mean for arrival time?",
      options: ["6:30 PM", "7:00 PM Sharp", "7:15 PM - 7:30 PM", "Midnight"],
      correctIndex: 2,
      explanation: "Arriving slightly late gives the host a buffer to finish setting up."
    },
    {
      question: "If an invitation says 'No gifts', what is the safest move?",
      options: ["Bring nothing", "Bring a Consumable (Wine/Food)", "Bring money", "Bring a puppy"],
      correctIndex: 1,
      explanation: "A small consumable item is a gesture of thanks without being a formal 'gift'."
    },
    {
      question: "What does 'Casual dress' allow?",
      options: ["Swimsuits", "Clean jeans and a nice shirt", "Tuxedo", "Dirty sweatpants"],
      correctIndex: 1,
      explanation: "'Casual' in a social setting implies 'Presentable but comfortable'."
    }
  ]
};
