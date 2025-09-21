import { Script } from "@/types";
import { groceryStore } from "./grocery_store";
import { gymSmallTalk } from "./gym_small_talk";
import { greetingsSmallTalk } from "./everyday_greetings_small_talk";
import { workplaceCommunication } from "./everyday_workplace_communication";
import { toolsAndFurniture } from "./everyday_tools_furniture";
import { teamworkCollaboration } from "./everyday_teamwork_collaboration";
import { customerServiceBasics } from "./everyday_customer_service_basics";
import { dailyRoutines } from "./everyday_daily_routines";
import { shoppingAndMoney } from "./everyday_shopping_money";
import { healthAndFeelings } from "./everyday_health_feelings";
import { directionsAndLocations } from "./everyday_directions_locations";
import { timeAndSchedules } from "./everyday_time_and_schedules";
import { foodAndEating } from "./everyday_food_and_eating";
import { familyAndFriends } from "./everyday_family_and_friends";
import { transportation } from "./everyday_transportation";
import { hobbiesFreeTime } from "./everyday_hobbies_free_time";

export const everydayScripts: Script[] = [
  groceryStore,
  gymSmallTalk,
  greetingsSmallTalk,
  workplaceCommunication,
  toolsAndFurniture,
  teamworkCollaboration,
  customerServiceBasics,
  dailyRoutines,
  shoppingAndMoney,
  healthAndFeelings,
  directionsAndLocations,
  timeAndSchedules,
  foodAndEating,
  familyAndFriends,
  transportation,
  hobbiesFreeTime,
];
