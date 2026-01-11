import { Script } from "@/types";
import { basicsTenses } from "./basics_tenses";
import { grammarArticles } from "./grammar_articles";
import { comparativesSuperlatives } from "./grammar_comparatives_superlatives";
import { conditionalsPractice } from "./grammar_conditionals";
import { modalVerbsPractice } from "./grammar_modal_verbs";
import { questionForms } from "./grammar_question_forms";
import { relativeClauses } from "./grammar_relative_clauses";

export const grammarScripts: Script[] = [
  basicsTenses,
  grammarArticles,
  comparativesSuperlatives,
  conditionalsPractice,
  modalVerbsPractice,
  questionForms,
  relativeClauses,
];
