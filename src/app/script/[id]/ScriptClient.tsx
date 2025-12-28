"use client";


import type { Script } from "@/types";
import StoryFlow from "@/components/StoryFlow";
import StandardScriptFlow from "@/components/StandardScriptFlow";
import SignalDecoder from "@/components/SignalDecoder";

type Props = { 
  script: Script;
};

export default function ScriptClient({ script }: Props) {
  if (script.type === "story_flow") {
    return <StoryFlow script={script} />;
  }

  if (script.type === "decoder") {
    return <SignalDecoder script={script} />;
  }

  return <StandardScriptFlow script={script} />;
}
