import { Script } from "@/types";
import { interviewSmartQuestion } from "./interview_smart_question";
import { techInterview } from "./tech_interview";
import { interviewIntro } from "./interview_intro";
import { ikeaLeadership } from "./ikea_leadership";
import { askingFavors } from "./asking_favors";

import { salaryNegotiation } from "./salary_negotiation";
import { settingBoundaries } from "./setting_boundaries";
import { deliveringBadNews } from "./delivering_bad_news";
import { networkingCoffee } from "./networking_coffee";
import { resignationGraceful } from "./resignation_graceful";

export const interviewScripts: Script[] = [
  interviewIntro, // Put intro first as it's foundational
  salaryNegotiation,
  settingBoundaries,
  deliveringBadNews,
  networkingCoffee,
  ikeaLeadership,
  askingFavors,
  resignationGraceful,
  interviewSmartQuestion,
  techInterview,
];
