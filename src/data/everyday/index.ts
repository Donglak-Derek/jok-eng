import { Script } from "@/types";
import { greetingsSmallTalk } from "./everyday_greetings_small_talk";
import { shoppingAndMoney } from "./everyday_shopping_money";
import { timeAndSchedules } from "./everyday_time_and_schedules";
import { transportation } from "./everyday_transportation";

export const everydayScripts: Script[] = [
  greetingsSmallTalk,
  shoppingAndMoney,
  timeAndSchedules,
  transportation,
];
