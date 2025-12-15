import { Script } from "@/types";
import { busStop } from "./bus_stop";
import { autocorrect } from "./autocorrect";
import { storyConstructionScript } from "./story_construction";

import { silenceBreaker } from "./silence_breaker";
import { pizzaCrasher } from "./pizza_crasher";
import { jobExaggerator } from "./job_exaggerator";

export const standupScripts: Script[] = [
  pizzaCrasher,       // 1. Arrival
  jobExaggerator,     // 2. Intros (Job)
  storyConstructionScript, // 3. Intros (Origin)
  autocorrect,        // 4. Mingling (Names)
  silenceBreaker,     // 5. Lull
  busStop             // 6. Deep Story
];

