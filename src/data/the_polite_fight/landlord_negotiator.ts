import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const landlordNegotiator: Script = {
  id: "landlord-negotiator",
  title: "The Landlord Negotiator",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to get repairs done without getting evicted. Documentation vs Emotion.",
  imageUrl: "/images/scenarios/landlord_negotiator_clay.png",
  mode: "cloze",
  culturalNote: {
    title: "Protecting the Asset",
    content: "Landlords care about money, not your comfort. The best way to get a repair is not to complain about how sad you are (Emotion), but to warn them about damage to their building (Asset Protection). Frame every request as you helping them save money."
  },
  sentences: [
    {
      id: "landlord-1",
      scenario: "The heater is broken. It is freezing.",
      en: "The Asset Protection",
      keywords: [
        { word: "pipes", definition: "plumbing tubes" },
        { word: "frozen", definition: "ice cold" }
      ],
      badResponse: {
        text: "You: 'Fix it now! I'm so cold!'",
        why: "Desperation makes you look weak. They can ignore feelings."
      },
      goodResponse: {
        text: "You: 'I wanted to alert you to the heating issue before [frozen] [pipes] cause major water damage.'",
        why: "'Water damage' acts as a magic spell on landlords. They will run to fix it."
      }
    },
    {
      id: "landlord-2",
      scenario: "There is a leak under the sink. Landlord is ignoring your texts.",
      en: "The Paper Trail",
      keywords: [
        { word: "record", definition: "written proof" },
        { word: "concerned", definition: "worried" }
      ],
      badResponse: {
        text: "You: 'Why are you ignoring me???'",
        why: "Emotional outbursts are easy to mute."
      },
      goodResponse: {
        text: "You: 'Just sending this email for the [record]. I am [concerned] about mold growth affecting the property value.'",
        why: "'For the record' implies legal preparation. 'Mold' scares them."
      }
    },
    {
      id: "landlord-3",
      scenario: "They want to raise the rent by $500.",
      en: "The Value Proposition",
      keywords: [
        { word: "stable", definition: "reliable" },
        { word: "history", definition: "past actions" }
      ],
      badResponse: {
        text: "You: 'You greedy monster!'",
        why: "Insults won't lower the rent."
      },
      goodResponse: {
        text: "You: 'I was hoping to discuss a lower rate given my [history] of on-time payments. [Stable] tenants save you turnover costs.'",
        why: "Remind them that finding a new tenant is expensive and risky. You are the safe option."
      }
    }
  ],
  quizItems: [
    {
      question: "What is the best way to motivate a landlord?",
      options: [
        "Send them a Christmas card.",
        "Threaten damage to their investment (Mold, Water, Etc).",
        "Cry on the phone.",
        "Pay extra rent."
      ],
      correctIndex: 1,
      explanation: "Money talks. Damage costs money. Comfort does not."
    },
    {
      question: "Why should you use the phrase 'For the record'?",
      options: [
        "To sound like a DJ.",
        "To imply you are keeping evidence for legal reasons.",
        "To practice typing.",
        "It sounds cool."
      ],
      correctIndex: 1,
      explanation: "It signals that you are professional and might take legal action if ignored."
    },
    {
      question: "If a landlord raises rent, what is your best leverage?",
      options: [
        "Your reliability (On-time payments, no damage).",
        "Your good looks.",
        "Your ability to clean.",
        "Your large family."
      ],
      correctIndex: 0,
      explanation: "Landlords fear bad tenants who don't pay. Being a 'good tenant' has financial value."
    }
  ]
};
