"use client";

import Link from "next/link";
import type { Script } from "@/types";
import StoryFlow from "@/components/StoryFlow";
import StandardScriptFlow from "@/components/StandardScriptFlow";

type Props = { script: Script };

export default function ScriptClient({ script }: Props) {
  if (script.type === "story_flow") {
    return <StoryFlow script={script} />;
  }

  return <StandardScriptFlow script={script} />;
}
