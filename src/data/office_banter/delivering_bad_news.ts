import { Script } from "@/types";

export const deliveringBadNews: Script = {
  id: "delivering-bad-news",
  title: "Delivering Bad News (Without Panic)",
  categorySlug: "office_banter",
  categoryName: "Career & Office Talk",
  cleanedEnglish: "How to tell your boss things are going wrong.",
  sentences: [
    {
      id: "news-1",
      en: "The 'Early Warning'",
      keywords: [
        { word: "Heads up", definition: "An advance warning" },
        { word: "Mitigate", definition: "Make less severe, serious, or painful" }
      ],
      scenario: "You realize you might miss a deadline.",
      badResponse: {
        text: "(Hide it until the deadline passes)",
        why: "The worst thing you can do. Surprises are bad."
      },
      goodResponse: {
        text: "Just a heads up, we're hitting some snags with the API. Ideally we catch up, but there's a risk of a 2-day delay. I'm working to mitigate it.",
        why: "Proactive communication builds trust even when things go wrong."
      }
    },
    {
      id: "news-2",
      en: "The 'Solution' Sandwich",
      keywords: [
        { word: "Roadblock", definition: "A barrier to progress" },
        { word: "Proposal", definition: "A plan or suggestion" }
      ],
      scenario: " reporting a failure.",
      badResponse: {
        text: "It broke. I don't know what to do.",
        why: "You are dumping a problem on their lap."
      },
      goodResponse: {
        text: "We hit a roadblock with the server. Here are three options to fix it: A, B, or C. I recommend B because it's fastest.",
        why: "Come with solutions, not just problems."
      }
    },
    {
      id: "news-3",
      en: "Owning the Mistake",
      keywords: [
        { word: "Accountability", definition: "The fact or condition of being accountable; responsibility" },
        { word: "Rectify", definition: "Put something right; correct" }
      ],
      scenario: "You messed up.",
      badResponse: {
        text: "It wasn't my fault, the software glitched.",
        why: "Excuses look weak."
      },
      goodResponse: {
        text: "That was my oversight. I take full responsibility. Here is how I'm rectifying it immediately and ensuring it doesn't happen again.",
        why: "Extreme ownership is respected."
      }
    },
    {
      id: "news-4",
      en: "Saying 'I Don't Know'",
      keywords: [
        { word: "Verify", definition: "Make sure that something is true/accurate" },
        { word: "Circle back", definition: "Return to a previous subject later" }
      ],
      scenario: "Asked a question you don't know the answer to.",
      badResponse: {
        text: "Uhh... I think maybe...",
        why: "Guessing is dangerous."
      },
      goodResponse: {
        text: "I don't have that number off the top of my head. Let me verify it and circle back to you in 10 minutes.",
        why: "Confident competence."
      }
    }
  ]
};
