import { Script } from "@/types";
import { officePrinter } from "./office_printer";
import { roommateCooking } from "./roommate_cooking";
import { netflixTrap } from "./netflix_trap";
import { theFineTrap } from "./the_fine_trap";
import { theBusyTrap } from "./the_busy_trap";
import { theExTrap } from "./the_ex_trap";

export const skitScripts: Script[] = [
  officePrinter,
  roommateCooking,
  netflixTrap,
  theFineTrap,
  theBusyTrap,
  theExTrap
];
