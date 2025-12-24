import { Script } from "@/types";
import { basicsTenses } from "./basics_tenses";
import { grammarArticles } from "./grammar_articles";
import { comparativesSuperlatives } from "./grammar_comparatives_superlatives";
import { conditionalsPractice } from "./grammar_conditionals";
import { countableUncountable } from "./grammar_countable_uncountable";
import { modalVerbsPractice } from "./grammar_modal_verbs";
import { prepositionsPractice } from "./grammar_prepositions";
import { questionForms } from "./grammar_question_forms";
import { relativeClauses } from "./grammar_relative_clauses";
import { subjectVerbAgreement } from "./grammar_subject_verb_agreement";
import { verbTensesConsistency } from "./grammar_verb_tenses_consistency";

export const grammarScripts: Script[] = [
  basicsTenses,
  grammarArticles,
  comparativesSuperlatives,
  conditionalsPractice,
  countableUncountable,
  modalVerbsPractice,
  prepositionsPractice,
  questionForms,
  relativeClauses,
  subjectVerbAgreement,
  verbTensesConsistency,
];
