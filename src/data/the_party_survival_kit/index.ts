import { Script } from "@/types";
import { busStop } from "./bus_stop";
import { autocorrect } from "./autocorrect";
import { storyConstructionScript } from "./story_construction";

import { silenceBreaker } from "./silence_breaker";
import { pizzaCrasher } from "./pizza_crasher";
import { jobExaggerator } from "./job_exaggerator";

export const standupScripts: Script[] = [busStop, autocorrect, storyConstructionScript, silenceBreaker, pizzaCrasher, jobExaggerator];

