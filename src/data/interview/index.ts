import { Script } from "@/types";
import { interviewSmartQuestion } from "./interview_smart_question";
import { techInterview } from "./tech_interview";

export const interviewScripts: Script[] = [
  interviewSmartQuestion,
  techInterview,
];
