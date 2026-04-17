"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Script } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript, Sentence } from "@/types";
import QuizCard from "@/components/QuizCard";
import VideoCard from "@/components/player/VideoCard";
import ClozeCard from "@/components/ClozeCard";
import ScriptPlayerShell from "@/components/ScriptPlayerShell";

import { ArrowRight, Volume2, Lightbulb, ChevronRight } from "lucide-react";
import StoryFullView from "./StoryFullView";
import { playScenarioAudio } from "@/lib/tts";

import { toast } from "react-hot-toast";
import { onSnapshot } from "firebase/firestore";
import { getScriptAudioStatus } from "@/lib/utils";

type Props = {
  script: Script;
  nextScenarioId?: string;
};

export default function StoryFlow({ script, nextScenarioId }: Props) {
  const router = useRouter();

  // Real-time Script Sync (Community Cache)
  const [localScript, setLocalScript] = useState<Script>(script);

  const segments = useMemo(() => localScript.segments || [], [localScript.segments]);
  const hasQuiz = !!localScript.quizItems && localScript.quizItems.length > 0;

  // Sync Logic
  useEffect(() => {
    let scriptRef;
    if ('userId' in script) {
      scriptRef = doc(db, `users/${(script as UserScript).userId}/scenarios`, script.id);
    } else {
      scriptRef = doc(db, `users/jok-eng-official/scenarios`, script.id);
    }

    const unsubscribe = onSnapshot(scriptRef, (docSnap: any) => {
      if (docSnap.exists()) {
        setLocalScript(prev => ({ ...prev, ...docSnap.data() }));
      }
    });
    return () => unsubscribe();
  }, [script.id, script]);


  const segmentsCount = segments.length;
  const hasVideo = !!localScript.videoUrl;

  // Calculate indices based on presence of Video
  // Video is always index 0 if it exists
  const videoIndex = hasVideo ? 0 : -1;
  const quizIndex = hasQuiz ? (hasVideo ? segmentsCount + 1 : segmentsCount) : -1;
  const totalSteps = segmentsCount + (hasVideo ? 1 : 0) + (hasQuiz ? 1 : 0);

  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<"flow" | "full">("flow"); // New State
  const [canProceedFromVideo, setCanProceedFromVideo] = useState(!hasVideo); // Lock next button until video finishes
  const repeatsKey = `jokeng:repeats:${script.id}`;

  const [repeats, setRepeats] = useState<number>(0);

  // Load repeats
  useEffect(() => {
    const v = localStorage.getItem(repeatsKey);
    setRepeats(v ? Number(v) || 0 : 0);
  }, [repeatsKey]);

  // TTS State
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  // Completion State
  const isCompletion = currentStep >= totalSteps;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Auth context
  const { user, userProfile } = useAuth();
  const { recordPractice } = useUserProgress(user?.uid);
  const isOwner = user && 'userId' in script && (script as UserScript).userId === user.uid;

  const handleFinishTraining = async () => {
    // Centralized Practice Recording (Streak/XP)
    recordPractice(10, 80); // Default XP and vibe score for story completion

    // Save repeats
    const nextRepeats = repeats + 1;
    setRepeats(nextRepeats);
    localStorage.setItem(repeatsKey, String(nextRepeats));

    // Save for user script (Firestore persistence)
    if (isOwner && user) {
      try {
        await updateDoc(doc(db, "users", user.uid, "scenarios", script.id), {
          repeats: nextRepeats
        });
      } catch (e) {
        console.error("Failed to sync repeats", e);
      }
    }

    // Exit
    router.push(`/category/${script.categorySlug}`);
  };

  const handleRepeat = () => {
    setCurrentStep(0);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(0);
  };

  // TTS Logic (Centralized)
  const speak = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (speaking || loading) return;

    // Safety check
    // If video exists, step 0 is the video. The text segments start at step 1.
    const segmentIndex = hasVideo ? currentStep - 1 : currentStep;
    if (segmentIndex < 0 || !segments[segmentIndex]) return;

    // Speak the main text of the current segment
    const textToSpeak = segments[segmentIndex].text;

    // Use the convention seg_{index} for caching
    const segmentId = `seg_${segmentIndex}`;

    playScenarioAudio(userProfile, localScript, {
      text: textToSpeak,
      sentenceId: segmentId,
      onStart: () => {
        setLoading(false);
        setSpeaking(true);
      },
      onEnd: () => {
        setSpeaking(false);
        setLoading(false);
      },
      onError: (err) => {
        console.error(err);
        setSpeaking(false);
        setLoading(false);
      },
      onAudioGenerated: (url) => {
        // Update local state instantly
        setLocalScript(prev => {
          if (!prev.segments) return prev;
          const idx = parseInt(segmentId.split("_")[1]);
          const newSegments = [...prev.segments];
          if (newSegments[idx]) {
            newSegments[idx] = { ...newSegments[idx], audioUrl: url };
          }

          // Background persistence
          const isAdmin = userProfile?.subscription?.tier === 'admin';

          if ('userId' in script && user?.uid && (script as UserScript).userId === user.uid) {
            // Own Scenario Update
            const scriptRef = doc(db, `users/${user.uid}/scenarios`, script.id);
            updateDoc(scriptRef, { segments: newSegments }).catch(e => console.error("Failed to persist audio", e));
          } else if (!('userId' in script) && isAdmin) {
            // Official script sponsorship (ADMIN ONLY)
            user?.getIdToken().then(token => {
              fetch('/api/sponsor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  scenarioId: script.id,
                  sentenceId: segmentId,
                  type: 'segments',
                  audioUrl: url,
                  token
                })
              }).then(res => {
                  if (res.ok) console.log("💎 Admin sponsorship successful");
              }).catch(e => console.error("Sponsor API error:", e));
            });
          }

          return { ...prev, segments: newSegments };
        });

        // Gamification Toast
        toast.success("💎 You just sponsored this audio for the community!", {
          duration: 4000,
          position: "bottom-center"
        });
      }
    });

  }, [segments, currentStep, speaking, loading, user, localScript, userProfile]);

  // Logic to get current segment safely
  const currentSegmentIndex = hasVideo ? currentStep - 1 : currentStep;
  const currentSegment = currentSegmentIndex >= 0 && currentSegmentIndex < segmentsCount
    ? segments[currentSegmentIndex]
    : segments[segmentsCount - 1]; // Fallback if out of bounds

  // Full View Mode
  if (viewMode === "full") {
    return <StoryFullView script={script} onBack={() => setViewMode("flow")} />;
  }

  // Render content
  let content = null;
  let showControls = true;

  if (isCompletion) {
    showControls = false;
    content = (
      <motion.div
        key="completion"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="bg-zinc-900/80 rounded-[32px] border border-white/5 shadow-2xl p-8 md:p-12 flex flex-col items-center text-center gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <Confetti />
          <div className="text-6xl mb-2 grayscale">🏆</div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
              Story Complete
            </h2>
            <p className="text-lg text-zinc-500 font-medium">Flow mastery achieved.</p>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-3 mt-4">
            {nextScenarioId ? (
              <>
                <Button 
                  onClick={() => router.push(`/scenario/${nextScenarioId}`)} 
                  className="w-full h-20 text-sm font-black uppercase tracking-[0.2em] rounded-3xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all border border-white/10" 
                  variant="primary"
                >
                  Next Session <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={handleRepeat} 
                  className="w-full h-16 text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-zinc-400 hover:text-white" 
                  variant="ghost"
                >
                  Practice Again (Rep {repeats + 1})
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleRepeat}
                className="w-full h-16 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20"
              >
                Initiate Rep {repeats + 1}
              </Button>
            )}

            <Button
              variant="ghost"
              size="md"
              onClick={handleFinishTraining}
              className="w-full text-zinc-500 font-black uppercase tracking-widest text-[10px] mt-4"
            >
              &larr; Return to Menu
            </Button>

            {/* Content Loop: Blog Link */}
            {script.relatedBlogUrl && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.open(script.relatedBlogUrl, '_blank')}
                className="w-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              >
                Read Full Guide
              </Button>
            )}
            {script.relatedBlogId && !script.relatedBlogUrl && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push(`/blogs/${script.relatedBlogId}`)}
                className="w-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              >
                Read Full Guide
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  } else if (currentStep === quizIndex && script.quizItems) {
    showControls = false;
    content = (
      <QuizCard
        items={script.quizItems}
        onFinish={handleNext}
      />
    );
  } else if (currentStep === videoIndex && localScript.videoUrl) {
    // --- VIDEO PLAYER CARD ---
    // User must finish video before proceeding
    showControls = canProceedFromVideo; // Only show standard footer (and "Next") if video finished

    content = (
      <motion.div
        key="video"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="bg-zinc-900/50 rounded-2xl border border-white/5 shadow-2xl p-4 md:p-6 min-h-[400px]">
          <VideoCard
            videoUrl={localScript.videoUrl}
            onEnd={() => setCanProceedFromVideo(true)}
          />
        </div>
      </motion.div>
    );
  } else {
    // Story Segment Card (Wrapping the existing card content)
    // Map segment to artificial Sentence for ClozeCard compatibility
    const mappedSentence: Sentence = {
      id: `seg_${currentSegmentIndex}`,
      en: currentSegment.text,
      scenario: `Step ${currentSegment.step}: Coaching Note - ${currentSegment.note}`,
      keywords: currentSegment.keywords || [],
    };

    content = (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {localScript.mode === "cloze" ? (
          <div className="w-full h-full min-h-[400px]">
            <ClozeCard
              sentence={mappedSentence}
              index={currentSegmentIndex}
              heard={true} // Audio is handled manually via the TTS button or prior video
              onHeard={() => { }}
              mode="cloze"
              script={localScript}
            />
          </div>
        ) : (
          <div className="bg-zinc-900/50 rounded-2xl border border-white/5 shadow-2xl p-6 md:p-12 flex flex-col gap-6 md:gap-8 min-h-[400px]">
            <div className="flex flex-col gap-6 text-center items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 border border-white/5 px-4 py-1.5 rounded-sm bg-zinc-950 shadow-inner">
                Step {currentSegment.step}
              </span>

              {/* Main English Text */}
              <div className="text-2xl md:text-3xl font-bold leading-relaxed text-foreground">
                &quot;{currentSegment.text}&quot;
              </div>

              {/* Coaching Note */}
              <div className="w-full text-zinc-300 italic text-lg bg-primary/5 px-6 py-5 rounded-xl border border-primary/10 flex gap-4 items-start justify-center shadow-lg">
                <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="font-semibold tracking-tight">{currentSegment.note}</span>
              </div>
            </div>

            {/* Keywords (Heads Up) */}
            {currentSegment.keywords && currentSegment.keywords.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 pt-6 border-t border-border border-dashed">
                {currentSegment.keywords.map((k) => (
                  <span
                    key={k.word}
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm"
                  >
                    <span className="font-black">{k.word}</span>
                    <span className="opacity-60 ml-1.5 font-medium">: {k.definition}</span>
                  </span>
                ))}
              </div>
            )}

            <div className="flex-1" />

            {/* TTS Play Button */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                speak();
              }}
              variant="outline"
              size="lg"
              isLoading={loading}
              className="mt-2 w-full md:w-auto self-center"
              leftIcon={<Volume2 className="w-5 h-5" />}
            >
              Play Audio
            </Button>
          </div>
        )}
      </motion.div>
    );
  }

  // --- RENDER SHELL ---
  return (
    <ScriptPlayerShell
      title={script.title}
      categorySlug={script.categorySlug}
      imageUrl={script.imageUrl}
      currentStep={currentStep}
      totalSteps={totalSteps}
      hasFinished={isCompletion || !showControls}
      audioStatus={getScriptAudioStatus(localScript)}

      // Gamification

      // Navigation
      onNext={handleNext}
      onPrev={handlePrev}
      onRestart={handleStartOver}
      onViewFull={() => setViewMode("full")}
      onBackToMenu={() => router.push(`/category/${script.categorySlug}`)}
    >
      <AnimatePresence mode="wait">
        {content}
      </AnimatePresence>
    </ScriptPlayerShell>
  );
}
