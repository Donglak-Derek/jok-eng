import { Script } from "@/types";
import { busStop } from "./bus_stop";
import { autocorrect } from "./autocorrect";
import { storyConstructionScript } from "./story_construction";

export const standupScripts: Script[] = [busStop, autocorrect, storyConstructionScript];

