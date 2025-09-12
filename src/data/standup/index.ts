import { Script } from "@/types";
import { busStop } from "./bus_stop";
import { autocorrect } from "./autocorrect";

export const standupScripts: Script[] = [busStop, autocorrect];

