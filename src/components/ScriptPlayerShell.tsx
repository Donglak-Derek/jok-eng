"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw, FileText, Eye, EyeOff, ArrowLeft, Volume2, VolumeX, Share2 } from "lucide-react";
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

  // Gamification Props
  audioStatus?: 'premium' | 'robot';

  // Control Props
  isAutoPlayEnabled?: boolean;
  onToggleAutoPlay?: () => void;
  // Global Reveal Logic merged into Study Mode Toggle
  
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
  mode,
  onToggleMode,
  onNext,
  onPrev,
  onRestart,
  onViewFull,
  children,
  ...props // Capture audioStatus etc
}: Props) {

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="flex-none w-full bg-white/80 backdrop-blur-md border-b border-border z-10">
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
                 <div className="flex items-center gap-1.5 md:gap-2">
                     
                     {/* 0. Audio Status Badge (Gamification) */}
                     {(props.audioStatus === 'premium' || props.audioStatus === 'robot') && (
                         <div 
                            className={`
                                flex items-center gap-1.5 px-2 py-1.5 rounded-full text-xs font-bold border select-none
                                ${props.audioStatus === 'premium' 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                }
                            `}
                            title={props.audioStatus === 'premium' ? "Community Sponsored Audio" : "Robot Voice (Needs Sponsor)"}
                         >
                             <span>{props.audioStatus === 'premium' ? "💎" : "🤖"}</span>
                             <span className="hidden sm:inline">
                                 {props.audioStatus === 'premium' ? "Premium" : "Robot"}
                             </span>
                         </div>
                     )}

                     {/* 1. Auto-Play (Sound) Toggle */}
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
                           title="Toggle Auto-Play Sound"
                         >
                            {isAutoPlayEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            <span className="hidden sm:inline">Sound</span>
                         </button>
                     )}

                     {/* 2. Study Mode / Visibility Toggle (Eye) */}
                     {onToggleMode && mode && (
                         <button
                             onClick={onToggleMode}
                             className={`
                                 p-2 rounded-full transition-colors
                                 ${mode === 'standard' 
                                     ? 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                     : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' 
                                 }
                             `}
                             title={mode === 'standard' ? "Switch to Study Mode (Hidden)" : "Switch to Review Mode (Visible)"}
                         >
                             {mode === 'standard' ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                         </button>
                     )}

                     {/* 3. Full View Toggle */}
                      {onViewFull && (
                         <button 
                           onClick={onViewFull}
                           className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                           title="View Full Content"
                         >
                             <FileText className="w-5 h-5" />
                         </button>
                      )}

                      {/* 4. Share Button (Viral Loop) */}
                      <button
                          onClick={() => {
                              const shareData = {
                                  title: `Jok-Eng: ${title}`,
                                  text: "Can a Pro member verify this script for me? 🥺",
                                  url: window.location.href
                              };
                              if (navigator.share) {
                                  navigator.share(shareData).catch(console.error);
                              } else {
                                  navigator.clipboard.writeText(window.location.href);
                                  alert("Link copied! Share it with a Pro member.");
                              }
                          }}
                          className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors"
                          title="Share to get Sponsored!"
                      >
                          <Share2 className="w-5 h-5" />
                      </button>
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
      <main className="flex-1 w-full overflow-y-auto overscroll-contain pb-8">
        <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col justify-center min-h-full">
             {children}
        </div>
      </main>

      {/* --- FOOTER (Navigation) --- */}
      {!hasFinished && (
        <div className="flex-none bg-white border-t border-border z-10 pb-safe">
            <div className="max-w-3xl mx-auto px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-4">
                
                {/* Restart (Subtle, Left) */}
                <Button 
                    variant="ghost"
                    onClick={onRestart}
                    size="md"
                    className="text-muted-foreground hover:text-foreground shrink-0 w-12 h-12 rounded-full p-0"
                    title="Restart from beginning"
                >
                    <RotateCcw className="w-5 h-5" />
                </Button>
                
                {/* Navigation Group (Right) */}
                <div className="flex items-center gap-3 flex-1 justify-end max-w-sm ml-auto">
                    
                    {/* Prev (Secondary) */}
                    <Button
                        variant="ghost"
                        onClick={onPrev}
                        disabled={!onPrev || currentStep === 0}
                        className={`shrink-0 px-4 transition-opacity ${(!onPrev || currentStep === 0) ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                    >
                        Prev
                    </Button>

                    {/* Next (Primary, Dominant) */}
                    <Button
                        variant="primary"
                        onClick={onNext}
                        size="lg"
                        className="flex-1 shadow-lg shadow-indigo-200 hover:shadow-xl transition-all active:scale-[0.98] text-base font-bold min-w-[120px]"
                        rightIcon={<ChevronRight className="w-5 h-5 ml-1" />}
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
