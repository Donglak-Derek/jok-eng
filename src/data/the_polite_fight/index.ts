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

export const politeScripts: Script[] = [
  karenDiffuser,
  landlordNegotiator,
  lineCutter,
  gymHog,
  wrongOrder,
  loudNeighbor,
  unsolicitedAdvice,
  billSplitter,
  borrowingBlackHole,
  seatStealer,
  chattyStranger,
  lateFriend,
  backseatDriver,
];
