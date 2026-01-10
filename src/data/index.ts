import { Script, Category } from "@/types";
import { CATEGORY_DETAILS } from "@/data/categories";
import { partyScripts } from "@/data/the_party_survival_kit";
import { skitScripts } from "@/data/dating_and_disasters";
import { interviewScripts } from "@/data/office_banter";
import { everydayScripts } from "@/data/small_talk";
import { grammarScripts } from "@/data/the_sarcasm_detector";
import { politeScripts } from "@/data/the_polite_fight";
import { textingScripts } from "@/data/texting_decoder";

export const scripts: Script[] = [
  ...partyScripts,
  ...skitScripts,
  ...interviewScripts,
  ...everydayScripts,
  ...grammarScripts,
  ...politeScripts,
  ...textingScripts,
];

export const categories: Category[] = Array.from(
  new Set(scripts.map((s) => s.categorySlug))
).map((slug) => {
  const details = CATEGORY_DETAILS[slug];
  // Fallback if details are missing to avoid empty src error
  if (!details) {
    return {
       slug,
       name: "Unknown Category",
       description: "Description not found",
       image: "/images/categories/small_talk.svg" // Fallback image
    } as Category;
  }
  return {
    slug,
    ...details,
  } as Category;
});
