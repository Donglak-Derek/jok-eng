import { Script } from "@/types";
import { officePrinter } from "./office_printer";
import { roommateCooking } from "./roommate_cooking";
import { netflixTrap } from "./netflix_trap";
import { datingAppCrash } from "./dating_app_crash";
import { theFineTrap } from "./the_fine_trap";
import { theBusyTrap } from "./the_busy_trap";
import { theExTrap } from "./the_ex_trap";
import { theForgottenName } from "./the_forgotten_name";
import { theBillStandoff } from "./the_bill_standoff";
import { theThirdWheel } from "./the_third_wheel";
import { theMenuDecoder } from "./the_menu_decoder";
import { theApologyDecoder } from "./the_apology_decoder";
import { theFriendZone } from "./the_friend_zone";
import { theMixedSignals } from "./the_mixed_signals";

export const skitScripts: Script[] = [
  datingAppCrash,
  officePrinter,
  roommateCooking,
  netflixTrap,
  theFineTrap,
  theBusyTrap,
  theExTrap,
  theForgottenName,
  theBillStandoff,
  theThirdWheel,
  theMenuDecoder,
  theApologyDecoder,
  theFriendZone,
  theMixedSignals
];
