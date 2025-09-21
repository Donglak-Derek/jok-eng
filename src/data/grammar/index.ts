import { Script } from "@/types";
import { basicsTenses } from "./basics_tenses";
import { grammarArticles } from "./grammar_articles";
import { verbTensesConsistency } from "./grammar_verb_tenses_consistency";
import { subjectVerbAgreement } from "./grammar_subject_verb_agreement";
import { prepositionsPractice } from "./grammar_prepositions";
import { questionForms } from "./grammar_question_forms";
import { conditionalsPractice } from "./grammar_conditionals";
import { modalVerbsPractice } from "./grammar_modal_verbs";
import { countableUncountable } from "./grammar_countable_uncountable";
import { comparativesSuperlatives } from "./grammar_comparatives_superlatives";
import { relativeClauses } from "./grammar_relative_clauses";

export const grammarScripts: Script[] = [
  basicsTenses,
  grammarArticles,
  verbTensesConsistency,
  subjectVerbAgreement,
  prepositionsPractice,
  questionForms,
  conditionalsPractice,
  modalVerbsPractice,
  countableUncountable,
  comparativesSuperlatives,
  relativeClauses,
];
