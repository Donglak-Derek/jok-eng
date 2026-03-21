import { Mission, Season, Achievement } from "@/types";
import { season1Missions } from "./season1";
import { season2Missions } from "./season2";
import { season3Missions } from "./season3";
import { season4Missions } from "./season4";
import { season5Missions } from "./season5";
import { season6Missions } from "./season6";
import { season7Missions } from "./season7";
import { season8Missions } from "./season8";
import { season9Missions } from "./season9";

export const seasons: Season[] = [
  { id: 1, title: "Arrival Survival", days: [1, 10], description: "Master the essentials of navigating a new country." },
  { id: 2, title: "The Service Economy", days: [11, 20], description: "Navigate cafes, restaurants, and retail with confidence." },
  { id: 3, title: "Neighborhood Navigation", days: [21, 30], description: "Build rapport with neighbors and handle local life." },
  { id: 4, title: "Office OS", days: [31, 40], description: "Master the unwritten rules of the American workplace." },
  { id: 5, title: "Subtext Decoder", days: [41, 50], description: "Understand what people really mean when they speak." },
  { id: 6, title: "American Humor", days: [51, 60], description: "Crack the code of irony, deadpan, and office jokes." },
  { id: 7, title: "Productive Conflict", days: [61, 70], description: "Disagree without being disagreeable." },
  { id: 8, title: "Personal Brand", days: [71, 80], description: "Build your professional identity and influence." },
  { id: 9, title: "Leadership Upgrade", days: [81, 90], description: "Step up as a confident and respected leader." },
];

export const achievements: Achievement[] = [
  { id: "arrival-pro", title: "Arrival Pro", description: "Completed Season 1: Arrival Survival", icon: "✈️" },
  { id: "service-master", title: "Service Master", description: "Completed Season 2: The Service Economy", icon: "☕" },
  { id: "neighborhood-hero", title: "Neighborhood Hero", description: "Completed Season 3: Neighborhood Navigation", icon: "🏘️" },
  { id: "office-pro", title: "Office Pro", description: "Completed Season 4: Office OS", icon: "💻" },
  { id: "subtext-expert", title: "Subtext Expert", description: "Completed Season 5: Subtext Decoder", icon: "🕵️" },
  { id: "humor-buff", title: "Humor Buff", description: "Completed Season 6: American Humor", icon: "🎭" },
  { id: "conflict-resolver", title: "Conflict Resolver", description: "Completed Season 7: Productive Conflict", icon: "⚖️" },
  { id: "branding-expert", title: "Branding Expert", description: "Completed Season 8: Personal Brand", icon: "🌟" },
  { id: "leadership-legend", title: "Leadership Legend", description: "Completed Season 9: Leadership Upgrade", icon: "👑" },
];

export const missions: Mission[] = [
  ...season1Missions,
  ...season2Missions,
  ...season3Missions,
  ...season4Missions,
  ...season5Missions,
  ...season6Missions,
  ...season7Missions,
  ...season8Missions,
  ...season9Missions,
];
