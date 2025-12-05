import { Script } from "@/types";
import { basicsTenses } from "./basics_tenses";
import { grammarArticles } from "./grammar_articles";
import { questionForms } from "./grammar_question_forms";

export const grammarScripts: Script[] = [
  basicsTenses,
  grammarArticles,
  questionForms,
];
