import { Script } from "@/types";

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function getScriptAudioStatus(script: Script): 'premium' | 'robot' | undefined {
    // 1. Official Scripts (No userId) -> Default to Premium (Assumption: Official content has audio)
    if (!('userId' in script)) {
        return 'premium';
    }

    // 2. User/Community Scripts -> Check for actual audioUrl presence
    // Check sentences (Standard)
    if (script.sentences && script.sentences.length > 0) {
        if (script.sentences.some(s => !!s.audioUrl)) return 'premium';
        return 'robot';
    }

    // Check decoderItems (Signal Decoder)
    if (script.decoderItems && script.decoderItems.length > 0) {
        if (script.decoderItems.some(item => !!item.audioUrl)) return 'premium';
        return 'robot';
    }

    // Check segments (Story)
    if (script.segments && script.segments.length > 0) {
        if (script.segments.some(s => !!s.audioUrl)) return 'premium';
        return 'robot';
    }

    // If no content arrays are present (e.g. incomplete data), don't show a badge
    return undefined;
}
