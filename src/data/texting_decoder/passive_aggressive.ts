import { Script } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";

export const passiveAggressive: Script = {
  id: "texting-passive-aggressive",
  title: "Passive Aggressive Decoder",
  categorySlug: "texting_decoder",
  categoryName: CATEGORY_NAMES["texting_decoder"],
  cleanedEnglish: "Are they mad or just typing fast?",
  sentences: [
    {
      id: "pass-1",
      en: "K.",
      keywords: [
        { word: "Dismissive", definition: "Feeling or showing that something is unworthy of consideration" },
        { word: "Short", definition: "Rudely brief" }
      ],
      scenario: "You sent a long explanation. They reply 'K.'",
      badResponse: {
        text: "(Ignore it)",
        why: "You might miss that they are angry."
      },
      goodResponse: {
        text: "Translation: They are annoyed. 'K.' is the middle finger of texting. Time to apologize or call them.",
        why: "Recongize the danger signal."
      }
    },
    {
      id: "pass-2",
      en: "Fine.",
      keywords: [
        { word: "Compliance", definition: "The action or fact of complying with a wish or command" },
        { word: "Resentment", definition: "Bitter indignation at having been treated unfairly" }
      ],
      scenario: "Asking if they are okay with a plan.",
      badResponse: {
        text: "Great! Glad you agree.",
        why: "They don't agree. They are giving up."
      },
      goodResponse: {
        text: "Translation: 'I don't like it, but I'm done arguing.' Proceed with caution.",
        why: "It means the opposite of 'fine'."
      }
    },
    {
      id: "pass-3",
      en: "Funny...",
      keywords: [
        { word: "Amusing", definition: "Causing laughter and providing entertainment" },
        { word: "Strange", definition: "Unusual or surprising" }
      ],
      scenario: "They say 'Funny...' (with dots).",
      badResponse: {
        text: "Glad I made you laugh!",
        why: "You didn't."
      },
      goodResponse: {
        text: "Translation: 'I find that suspicious' or 'That implies I'm a liar'. It's accusatory.",
        why: "Context is key. The dots change the meaning."
      }
    },
    {
      id: "pass-4",
      en: "?? versus ?",
      keywords: [
        { word: "Confusion", definition: "Uncertainty about what is happening" },
        { word: "Impatience", definition: "Tendency to be quickly irritated or provoked" }
      ],
      scenario: "Comparing question marks.",
      badResponse: {
        text: "They are just extra curious.",
        why: "No."
      },
      goodResponse: {
        text: "'?' is a question. '??' is confusion. '???' is 'What the hell are you talking about?'.",
        why: "More marks = more emotion (usually confusion or anger)."
      }
    }
  ]
};
