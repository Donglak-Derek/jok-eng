import { Script, Category } from "@/types";
import { CATEGORY_NAMES } from "@/data/categories";
import { standupScripts } from "@/data/standup";
import { skitScripts } from "@/data/skit";
import { interviewScripts } from "@/data/interview";
import { everydayScripts } from "@/data/everyday";

export const scripts: Script[] = [
  ...standupScripts,
  ...skitScripts,
  ...interviewScripts,
  ...everydayScripts,
];

export const categories: Category[] = Array.from(
  new Set(scripts.map((s) => s.categorySlug))
).map((slug) => ({ slug, name: CATEGORY_NAMES[slug] } as Category));
