import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const billSplitter: Script = {
  id: "polite-bill-splitter",
  title: "The Bill Splitter",
  categorySlug: "the_polite_fight",
  categoryName: CATEGORY_NAMES["the_polite_fight"],
  cleanedEnglish: "How to pay only for what you ate without looking like a cheapskate.",
  imageUrl: "/images/scenarios/bill_splitter_clay.png",
  mode: "cloze",
  culturalInsights: {
    title: "Itemized vs. Even Split",
    content: "In many Western cultures, asking to 'split the check evenly' is the default for groups. Objecting to this can make you look stingy. However, it is fair to object if there is a huge price difference. The polite trick is to blame 'budgeting' or 'not drinking', rather than accusing others of ordering too much."
  },
  sentences: [
    {
      id: "bill-1",
      scenario: "Everyone ordered cocktails and steak. You had a water and salad. Someone says 'Let's just split it even.'",
      en: "The Budget Excuse",
      keywords: [
        { word: "budget", definition: "spending plan" },
        { word: "mind", definition: "object" }
      ],
      badResponse: {
        text: "You: 'No way! You guys ate way more than me!'",
        why: "True, but aggressive. It kills the party vibe."
      },
      goodResponse: {
        text: "You: 'Would you guys [mind] if I just paid for my own? I'm on a strict [budget] this week.'",
        why: "Blaming a 'budget' makes it about your personal discipline, not their gluttony. No one argues with a budget."
      }
    },
    {
      id: "bill-2",
      scenario: "They say 'Come on, it's just $10 more.'",
      en: "The Math Logic",
      keywords: [
        { word: "separate", definition: "apart/individual" },
        { word: "drink", definition: "consume alcohol" }
      ],
      badResponse: {
        text: "You: 'It's the principle! I'm not paying for your fun.'",
        why: "You sound like a parent scolding children."
      },
      goodResponse: {
        text: "You: 'I didn't [drink] tonight, so I think it's easier if I grab a [separate] check so the math isn't messy.'",
        why: "Alcohol is the universal accepted reason for separate checks. 'Math is messy' is a valid logical shield."
      }
    },
    {
      id: "bill-3",
      scenario: "You are calculating your share.",
      en: "The Generous Tip",
      keywords: [
        { word: "cover", definition: "pay for" },
        { word: "extra", definition: "additional" }
      ],
      badResponse: {
        text: "You: 'Here is exactly $12.45.'",
        why: "Being too exact (to the penny) looks petty."
      },
      goodResponse: {
        text: "You: 'I'll throw in a little [extra] to [cover] the tip and tax.'",
        why: "Always round up generously when paying separately. It proves you aren't cheap, just fair."
      }
    }
  ],
  quizItems: [
    {
      question: "When is it socially acceptable to ask for a separate check?",
      options: [
        "Always.",
        "When there is a large discrepancy (e.g., Alcohol vs No Alcohol).",
        "Never.",
        "When you hate your friends."
      ],
      correctIndex: 1,
      explanation: "If the difference is small (<$5), polite culture suggests you just split it. If it's large, speak up."
    },
    {
      question: "Why should you blame a 'budget'?",
      options: [
        "It protects other people's feelings.",
        "It makes you look poor.",
        "It is a lie.",
        "It gets you free food."
      ],
      correctIndex: 0,
      explanation: "It frames the request as 'my problem', not 'your problem'."
    },
    {
      question: "What is the rule about tipping when paying separately?",
      options: [
        "Don't tip.",
        "Tip exactly 10%.",
        "Tip generously/Round up.",
        "Ask for change."
      ],
      correctIndex: 2,
      explanation: "To counter the stigma of being 'the separate check person', over-tipping shows good will."
    }
  ]
};
