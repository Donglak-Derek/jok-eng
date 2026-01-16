"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw, FileText, PlayCircle, PauseCircle, Eye, EyeOff, ArrowLeft, BookOpen, Brain } from "lucide-react";
import { Button } from "@/components/Button";

type Props = {
  // Content Props
  title: string;
  categorySlug: string;
  imageUrl?: string;
  
  // Progress Props
  currentStep: number;
  totalSteps: number;
  hasFinished: boolean;

  // Control Props
  isAutoPlayEnabled?: boolean;
  onToggleAutoPlay?: () => void;
  isGlobalRevealed?: boolean;
  onToggleGlobalReveal?: () => void;
  
  // Study Mode Props
  mode?: "standard" | "cloze";
  onToggleMode?: () => void;
  
  // Navigation Handlers
  onNext?: () => void;
  onPrev?: () => void;
  onRestart?: () => void;
  onBackToMenu?: () => void;
  onViewFull?: () => void;
  
  // Slots
  children: React.ReactNode;
};

export default function ScriptPlayerShell({
  title,
  categorySlug,
  imageUrl,
  currentStep,
  totalSteps,
  hasFinished,
  isAutoPlayEnabled,
  onToggleAutoPlay,
  isGlobalRevealed,
  onToggleGlobalReveal,
  mode,
  onToggleMode,
  onNext,
  onPrev,
  onRestart,
  onViewFull,
  children
}: Props) {

  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
         <div className="max-w-3xl mx-auto px-4 py-3 md:px-6 md:py-4 flex flex-col gap-4">
             <div className="flex items-center gap-4">
                 {/* Back Button */}
                 <Link href={`/category/${categorySlug}`} className="text-muted-foreground hover:text-foreground transition-colors">
                     <ChevronLeft className="w-6 h-6" />
                 </Link>

                 {/* Title */}
                 <div className="flex-1 min-w-0">
                     <h1 className="text-xl md:text-2xl font-bold tracking-tight truncate">
                       {title}
                     </h1>
                 </div>

                 {/* GLOBAL CONTROLS (Hoisted from Cards) */}
                 <div className="flex items-center gap-2">
                    
                    {/* 1. Auto-Play Toggle */}
                    {onToggleAutoPlay && (
                        <button
                          onClick={onToggleAutoPlay}
                          className={`
                              p-2 rounded-full transition-colors flex items-center gap-2 text-xs font-bold px-3 py-1.5
                              ${isAutoPlayEnabled 
                                  ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-200' 
                                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                              }
                          `}
                          title="Toggle Auto-Play"
                        >
                           {isAutoPlayEnabled ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                           <span className="hidden sm:inline">Auto-Play</span>
                        </button>
                    )}

                    {/* 2. Global Reveal Toggle (Eye) */}
                    {onToggleGlobalReveal && (
                        <button
                            onClick={onToggleGlobalReveal}
                            className={`
                                p-2 rounded-full transition-colors
                                ${isGlobalRevealed 
                                    ? 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300' 
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                }
                            `}
                            title={isGlobalRevealed ? "Hide Answers" : "Reveal All"}
                        >
                            {isGlobalRevealed ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                    )}

                    {/* 3. Study Mode Toggle (Book/Brain) */}
                    {onToggleMode && mode && (
                        <button
                            onClick={onToggleMode}
                            className={`
                                p-2 rounded-full transition-colors flex items-center gap-2
                                ${mode === 'cloze'
                                    ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                }
                            `}
                            title={mode === 'cloze' ? "Study Mode Active" : "Review Mode"}
                        >
                            {mode === 'cloze' ? <Brain className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                        </button>
                    )}

                    {/* 3. Full View Toggle */}
                     {onViewFull && (
                        <button 
                          onClick={onViewFull}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                          title="View Full Content"
                        >
                            <FileText className="w-6 h-6" />
                        </button>
                     )}
                 </div>
            </div>

            {/* Optional Scenario Image (Desktop only) */}
            {imageUrl && (
                <div className="hidden md:block w-12 h-12 absolute left-1/2 -translate-x-1/2 -z-10 opacity-0 pointer-events-none">
                    {/* Placeholder if we want fancy image effects in header later */}
                </div>
            )}
          </div>
          
       {/* Progress Line */}
       <div className="w-full h-1 bg-secondary">
           <div 
               className="h-full bg-primary transition-all duration-300 ease-out" 
               style={{ width: `${Math.min((currentStep / totalSteps) * 100, 100)}%` }} 
           />
       </div>
    </header>

      {/* --- CONTENT BODY --- */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col w-full h-full">
        <div className="flex-1 flex flex-col justify-center min-h-[400px]">
             {children}
        </div>
      </main>

      {/* --- FOOTER (Navigation) --- */}
      {!hasFinished && (
        <div className="sticky bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm border-t border-border z-40">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
                
                {/* Restart */}
                <Button 
                    variant="ghost"
                    onClick={onRestart}
                    className="text-muted-foreground hover:text-foreground text-sm"
                    leftIcon={<RotateCcw className="w-4 h-4" />}
                >
                    Restart
                </Button>
                
                {/* Prev / Next */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        onClick={onPrev}
                        disabled={!onPrev || currentStep === 0}
                        className={!onPrev || currentStep === 0 ? "invisible" : "text-base font-medium"}
                        leftIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                        Prev
                    </Button>

                    <Button
                        variant="primary"
                        onClick={onNext}
                        className="px-6 shadow-md hover:shadow-lg transition-all"
                        rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
