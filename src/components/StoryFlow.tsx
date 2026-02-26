"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Script } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript } from "@/types";
import QuizCard from "@/components/QuizCard";
import ScriptPlayerShell from "@/components/ScriptPlayerShell";

import { ArrowRight, Volume2, Lightbulb } from "lucide-react";
import StoryFullView from "./StoryFullView";
import { playScenarioAudio } from "@/lib/tts";

import { toast } from "react-hot-toast";
import { onSnapshot } from "firebase/firestore";
import { getScriptAudioStatus } from "@/lib/utils";

type Props = {
  script: Script;
};

export default function StoryFlow({ script }: Props) {
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
  const quizIndex = hasQuiz ? segmentsCount : -1;
  const totalSteps = segmentsCount + (hasQuiz ? 1 : 0);

  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<"flow" | "full">("flow"); // New State
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
  const isOwner = user && 'userId' in script && (script as UserScript).userId === user.uid;

  const handleFinishTraining = async () => {
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
    if (!segments[currentStep]) return;

    // Speak the main text of the current segment
    const textToSpeak = segments[currentStep].text;

    // Use the convention seg_{index} for caching
    const segmentId = `seg_${currentStep}`;

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
          let scriptRef;
          if ('userId' in script) {
            scriptRef = doc(db, `users/${(script as UserScript).userId}/scenarios`, script.id);
          } else {
            scriptRef = doc(db, `users/jok-eng-official/scenarios`, script.id);
          }
          updateDoc(scriptRef, { segments: newSegments }).catch(e => console.error("Failed to persist audio", e));

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
  const currentSegment = currentStep < segmentsCount ? segments[currentStep] : segments[segmentsCount - 1];

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
        <div className="bg-white rounded-lg border border-border shadow-sm p-8 md:p-12 flex flex-col items-center text-center gap-6">
          <Confetti />
          <div className="text-6xl mb-2">🎉</div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Story Complete!
            </h2>
            <p className="text-lg text-muted-foreground">You&apos;ve mastered this flow.</p>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-3 mt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleRepeat}
              className="w-full"
            >
              Repeat
            </Button>

            <Button
              variant="ghost"
              size="md"
              onClick={handleFinishTraining}
              className="w-full text-muted-foreground"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Finish & Return
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
  } else {
    // Story Segment Card (Wrapping the existing card content)
    content = (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="bg-white rounded-lg border border-border shadow-sm p-6 md:p-12 flex flex-col gap-6 md:gap-8 min-h-[400px]">
          <div className="flex flex-col gap-6 text-center items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border px-3 py-1 rounded-full bg-secondary/50">
              Step {currentSegment.step}
            </span>

            {/* Main English Text */}
            <div className="text-2xl md:text-3xl font-bold leading-relaxed text-foreground">
              &quot;{currentSegment.text}&quot;
            </div>

            {/* Coaching Note */}
            <div className="w-full text-foreground/80 italic text-lg bg-secondary/20 px-6 py-4 rounded-lg border border-secondary flex gap-3 items-start justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
              <span className="font-medium">{currentSegment.note}</span>
            </div>
          </div>

          {/* Keywords (Heads Up) */}
          {currentSegment.keywords && currentSegment.keywords.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 pt-6 border-t border-border border-dashed">
              {currentSegment.keywords.map((k) => (
                <span
                  key={k.word}
                  className="text-sm px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                >
                  <span className="font-semibold">{k.word}</span>
                  <span className="opacity-75">: {k.definition}</span>
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
