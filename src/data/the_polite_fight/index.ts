import { Script } from "@/types";
import { karenDiffuser } from "./karen_diffuser";
import { landlordNegotiator } from "./landlord_negotiator";
import { lineCutter } from "./line_cutter";
import { gymHog } from "./gym_hog";
import { wrongOrder } from "./wrong_order";
import { loudNeighbor } from "./loud_neighbor";
import { unsolicitedAdvice } from "./unsolicited_advice";
import { billSplitter } from "./bill_splitter";
import { borrowingBlackHole } from "./borrowing_black_hole";
import { seatStealer } from "./seat_stealer";
import { chattyStranger } from "./chatty_stranger";
import { lateFriend } from "./late_friend";
import { backseatDriver } from "./backseat_driver";
import { partyDecline } from "./party_decline";
import { furnitureRefusal } from "./furniture_refusal";

export const politeScripts: Script[] = [
  // Public Zone (Strangers)
  { ...karenDiffuser, section: "Public Zone (Strangers)" },
  { ...lineCutter, section: "Public Zone (Strangers)" },
  { ...gymHog, section: "Public Zone (Strangers)" },
  { ...wrongOrder, section: "Public Zone (Strangers)" },
  { ...seatStealer, section: "Public Zone (Strangers)" },
  { ...chattyStranger, section: "Public Zone (Strangers)" },

  // Home & Finance (High Stakes)
  { ...landlordNegotiator, section: "Home & Finance" },
  { ...loudNeighbor, section: "Home & Finance" },
  { ...billSplitter, section: "Home & Finance" },
  { ...borrowingBlackHole, section: "Home & Finance" },

  // Friends & Family (Relationships)
  { ...unsolicitedAdvice, section: "Friends & Family" },
  { ...lateFriend, section: "Friends & Family" },
  { ...backseatDriver, section: "Friends & Family" },
  { ...partyDecline, section: "Friends & Family" },
  { ...furnitureRefusal, section: "Friends & Family" },
];
