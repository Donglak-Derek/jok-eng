import { Script } from "@/types";
import { interviewSmartQuestion } from "./interview_smart_question";
import { techInterview } from "./tech_interview";
import { interviewIntro } from "./interview_intro";
import { ikeaLeadership } from "./ikea_leadership";
import { askingFavors } from "./asking_favors";

export const interviewScripts: Script[] = [
  interviewIntro, // Put intro first as it's foundational
  ikeaLeadership,
  askingFavors,
  interviewSmartQuestion,
  techInterview,
];
