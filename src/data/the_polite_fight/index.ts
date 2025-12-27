import { Script } from "@/types";
import { karenDiffuser } from "./karen_diffuser";
import { landlordNegotiator } from "./landlord_negotiator";
import { lineCutter } from "./line_cutter";
import { gymHog } from "./gym_hog";
import { wrongOrder } from "./wrong_order";
import { loudNeighbor } from "./loud_neighbor";
import { unsolicitedAdvice } from "./unsolicited_advice";

export const politeScripts: Script[] = [
  karenDiffuser,
  landlordNegotiator,
  lineCutter,
  gymHog,
  wrongOrder,
  loudNeighbor,
  unsolicitedAdvice,
];
