"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Script, UserScript, UserProfile } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription"; // Phase 2 Hook
import UpgradeModal from "@/components/subscription/UpgradeModal"; // Phase 4 Modal

import { db } from "@/lib/firebase";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
// For preview, we want to see sentences.
import ClozeCard from "./ClozeCard";
import { Button } from "@/components/Button";
// import { GenerativeCover } from "./GenerativeCover";
import CulturalNoteCard from "./CulturalNoteCard";
import QuizCard from "./QuizCard";
import { Eye, EyeOff } from "lucide-react";

interface CreateScenarioFormProps {
  initialValues?: {
    context: string;
    myRole: string;
    otherRole: string;
    plot: string;
  }
}

// --- Surprise Me Logic ---
const TONES = ["Polite", "Direct", "Funny", "Flirty", "Spicy", "Professional"];
const FORMATS = ["Social Dojo", "Classic Script", "Rapid Fire"];

const FORMAT_DESCRIPTIONS: Record<string, string> = {
  "Social Dojo": "🥋 Focus: Nuance. Compare awkward vs. natural responses.",
  "Classic Script": "📜 Focus: Flow. Longer, realistic dialogue practice.",
  "Rapid Fire": "⚡ Focus: Speed. Short, fast-paced drills for reflexes."
};

// --- Combinatorial Surprise Me Logic ---
const CONTEXTS = [
  "Asking my boss for a raise...",
  "Breaking up with a clingy partner...",
  "Ordering a complicated coffee...",
  "Explaining a mistake to a client...",
  "Returning a meal at a restaurant...",
  "Negotiating rent with a landlord...",
  "Small talk with a stranger in an elevator...",
  "Confessing a secret crush...",
  "Apologizing for forgetting a birthday...",
  "Confronting a roommate about dirty dishes...",
  "Asking a stranger to take a photo...",
  "Declining a wedding invitation...",
  "Asking for a refund on a used item...",
  "Meeting a partner's parents for the first time...",
  "Critiquing a colleague's work..."
];

const ROLES = [
  { my: "Employee", other: "Boss" },
  { my: "Partner", other: "Clingy Boyfriend/Girlfriend" },
  { my: "Coffee Snob", other: "Barista" },
  { my: "Account Manager", other: "Angry Client" },
  { my: "Diner", other: "Waiter" },
  { my: "Tenant", other: "Landlord" },
  { my: "Person", other: "Stranger" },
  { my: "Friend", other: "Crush" },
  { my: "Forgetful Friend", other: "Birthday Person" },
  { my: "Clean Freak", other: "Messy Roommate" },
  { my: "Tourist", other: "Local" },
  { my: "Guest", other: "Bride/Groom" },
  { my: "Customer", other: "Store Manager" },
  { my: "Nervous Partner", other: "Strict Dad" },
  { my: "Team Lead", other: "Junior Dev" }
];

const PLOTS = [
  "I need to be firm but polite.",
  "I'm terrified of confrontation but need to speak up.",
  "I want to be charming and witty.",
  "I made a huge mistake and need to fix it.",
  "I need to negotiate a better deal.",
  "The situation is extremely awkward.",
  "I want to flirt without being creepy.",
  "I need to set a boundary without being mean.",
  "I'm trying to impress them.",
  "They are being unreasonable and I need to de-escalate."
];

const SCENARIO_PROMPTS = [
    {
       context: "Asking my boss for a raise...",
       myRole: "Employee",
       otherRole: "Boss",
       plot: "I need to argue why I deserve more money..."
    },
    {
       context: "Breaking up with a clingy partner...",
       myRole: "Partner",
       otherRole: "Clingy Boyfriend/Girlfriend",
       plot: "I need to be gentle but firm because they are very sensitive..."
    },
    {
       context: "Ordering a complicated coffee...",
       myRole: "Coffee Snob",
       otherRole: "Barista",
       plot: "I have very specific dietary requirements and I'm in a rush..."
    },
    {
       context: "Explaining a mistake to a client...",
       myRole: "Account Manager",
       otherRole: "Angry Client",
       plot: "I need to apologize without admitting liability for the server outage..."
    },
    {
       context: "Returning a meal at a restaurant...",
       myRole: "Diner",
       otherRole: "Waiter",
       plot: "The food is cold and I want a refund, but I hate confrontation..."
    },
    {
       context: "Negotiating rent with a landlord...",
       myRole: "Tenant",
       otherRole: "Landlord",
       plot: "I can't afford the increase and need to negotiate a smaller hike..."
    },
    {
       context: "Small talk with a stranger in an elevator...",
       myRole: "Person",
       otherRole: "Stranger",
       plot: "The silence is awkward and I want to break the ice..."
    },
    {
        context: "Confessing a secret crush...",
        myRole: "Friend",
        otherRole: "Crush",
        plot: "I've been hiding my feelings for years and can't take it anymore..."
    },
    {
        context: "Apologizing for forgetting a birthday...",
        myRole: "Forgetful Friend",
        otherRole: "Birthday Person",
        plot: "I completely missed their big 30th bash and need to make it right..."
    },
    {
        context: "Confronting a roommate about dirty dishes...",
        myRole: "Clean Freak",
        otherRole: "Messy Roommate",
        plot: "The sink is full again and we have guests coming over in an hour..."
    }
];

export default function CreateScenarioForm({ initialValues }: CreateScenarioFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"input" | "loading" | "preview">("input");
  
  // Input State
  const [inputs, setInputs] = useState(initialValues || {
    context: "", // Where
    myRole: "",  // Who am I
    otherRole: "", // Who is other
    plot: "",    // What happens
  });
  const [tone, setTone] = useState("Polite");
  const [format, setFormat] = useState("Social Dojo"); // New Format State
  const [isStudyMode, setIsStudyMode] = useState(false); // New Study Mode State
  
  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Phase 4: Subscription Logic
  const { credits, canCreateScenario, incrementUsage } = useSubscription();
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
        if (!user?.uid) return;
        try {
            const docSnap = await getDoc(doc(db, "users", user.uid));
            if (docSnap.exists()) {
                setUserProfile(docSnap.data() as UserProfile);
            }
        } catch (e) {
            console.error("Error fetching profile", e);
        }
    };
    fetchProfile();
  }, [user?.uid]);

  // Remix Tracking
  const [remixSourceId, setRemixSourceId] = useState<string | null>(null);
  const [remixAuthorId, setRemixAuthorId] = useState<string | null>(null);

  // REMIX & ADAPT LOGIC
  // REMIX & ADAPT LOGIC
  useEffect(() => {
      const mode = searchParams.get('mode');
      const adaptTo = searchParams.get('adaptTo'); 
      const adaptType = searchParams.get('adaptType');
      
      if (mode === 'remix') {
          const storedScript = localStorage.getItem('remixSource');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let script: any = null;

          // 1. Try LocalStorage
          if (storedScript) {
             try {
                script = JSON.parse(storedScript);
             } catch (e) { console.error("Parse error", e); }
          }
          
          // 2. Fallback: Query Params (for legacy or direct links)
          if (!script) {
             const rTitle = searchParams.get('remixTitle');
             const rContext = searchParams.get('remixContext');
             if (rTitle) {
                 script = { title: rTitle, context: rContext || "" };
             }
          }

          if (script) {
              // Capture source lineage
              if (script.id) setRemixSourceId(script.id);
              if (script.userId) setRemixAuthorId(script.userId);

              let newInputs = {
                  context: "",
                  myRole: "",
                  otherRole: "",
                  plot: ""
              };

              if (script.originalPrompt) {
                  // Perfect Case: We have the original recipe
                  newInputs = { ...script.originalPrompt };
              } else {
                  // Fallback Case: Reverse engineer from metadata
                  newInputs = {
                      context: script.context || script.cleanedEnglish || script.title,
                      myRole: "Me",
                      otherRole: "Them",
                      plot: `Re-enact the scenario "${script.title}". Capture the same vibe but make it fresh.`
                  };
              }

              // --- CONTEXT-AWARE ADAPTATION ---
              if (adaptTo) {
                   newInputs.context = `(Adapting: ${script.title})`;
                   
                   if (adaptType === 'job') {
                       newInputs.myRole = adaptTo; 
                       newInputs.otherRole = "Colleague / Client"; 
                       newInputs.plot = `[ORIGINAL PLOT]: ${newInputs.plot}\n\n[INSTRUCTION]: REWRITE this exact scenario to take place in a ${adaptTo} workplace context. Keep the same conflict/lesson, but change the jargon and setting to match this profession.`;
                   } 
                   else if (adaptType === 'vibe') {
                       newInputs.plot = `[ORIGINAL PLOT]: ${newInputs.plot}\n\n[INSTRUCTION]: REWRITE this scenario for a person who is ${adaptTo}. Keep the exact same situation and meaning, but change the SLANG, IDIOMS, and CULTURAL REFERENCES to match this specific age group.`;
                   }
              }
              // ---------------------------------

              setInputs(newInputs);
          }
      }
  }, [searchParams]);

  // Helper to auto-save without blocking UI logic too much
  const autoSaveScript = useCallback(async (
    script: Script, 
    originalInputs: { context: string; myRole: string; otherRole: string; plot: string }, 
    currentUser: { uid: string; displayName?: string | null; photoURL?: string | null } | null,
    profile: UserProfile | null,
    sourceId?: string | null,
    sourceAuthorId?: string | null
  ): Promise<string | null> => {
      if (!currentUser) return null;
      try {
         const { collection, doc, setDoc, increment, updateDoc } = await import("firebase/firestore"); // Dynamic import for perf
         
         const scenariosCollectionRef = collection(db, "users", currentUser.uid, "scenarios");
         const newScriptRef = doc(scenariosCollectionRef);
         
         const userScript: Omit<UserScript, "id"> = {
             ...script,
             userId: currentUser.uid,
             createdAt: Date.now(),
             authorName: currentUser.displayName || "Anonymous",
             authorPhotoURL: currentUser.photoURL || undefined,
             authorOccupation: profile?.occupation, // Save occupation
             authorAgeGroup: profile?.ageGroup, // Save age group
             authorCountry: profile?.motherLanguage, // Save Origin
             originalPrompt: originalInputs,
             isPublic: true, // Default to public as per "Community" goal
             remixCount: 0,
             // Lineage
             originalScenarioId: sourceId || undefined,
             isRemix: !!sourceId
         };
         
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const sanitize = (obj: any): any => {
           return JSON.parse(JSON.stringify(obj, (key, value) => {
             return value === undefined ? null : value;
           }));
         };

         await setDoc(newScriptRef, { ...sanitize(userScript), id: newScriptRef.id });
         
         // Update user stats
         const userRef = doc(db, "users", currentUser.uid);
         setDoc(userRef, { totalScenariosCreated: increment(1) }, { merge: true }).catch(console.error);

         // --- REMIX ATTRIBUTION ---
         if (sourceId && sourceAuthorId) {
             // 1. Increment 'remixCount' on the original scenario
             const originalRef = doc(db, "users", sourceAuthorId, "scenarios", sourceId);
             updateDoc(originalRef, { remixCount: increment(1) }).catch(e => console.error("Failed to count remix", e));

             // 2. Increment 'totalRemixesInspired' on the original author
             const authorRef = doc(db, "users", sourceAuthorId);
             setDoc(authorRef, { totalRemixesInspired: increment(1) }, { merge: true }).catch(console.error);
         }

         return newScriptRef.id;
      } catch (e) {
          console.error("Auto-save failed", e);
          return null;
      }
  }, []);

  // Wrap in useCallback to satisfy linter
  const handleGenerate = useCallback(async () => {
    if (!inputs.context || !inputs.plot) return;

    // Check Limits
    if (!canCreateScenario()) {
        setShowUpgrade(true);
        return;
    }
    
    setStep("loading");
    try {
        const res = await fetch("/api/generate-scenario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...inputs,
                tone,
                format, // Pass format
                userName: user?.displayName || user?.email?.split('@')[0] || "User",
                userProfile // Inject profile data
            }),
        });
        
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.details || errData.error || "Failed to generate");
        }
        
        const data = await res.json();
        
        // --- DIRECT TO TRAINING (Skip Preview) ---
        // 1. Auto-save immediately
        const scriptId = await autoSaveScript(
            data.script, 
            inputs, 
            user, 
            userProfile,
            remixSourceId,
            remixAuthorId
        );
        
        if (scriptId) {
            // Deduct Credit on successful save
            await incrementUsage();
            router.push(`/script/${scriptId}`);
        } else {
            // Fallback if save fails (shouldn't happen often)
            setGeneratedScript(data.script);
            setStep("preview");
        }
    } catch (error) {
        console.error(error);
        const err = error as Error;
        alert(`Error: ${err.message || "Unknown error"}`);
        setStep("input");
    }
  }, [inputs, tone, format, user, userProfile, router, autoSaveScript, remixSourceId, remixAuthorId]);



  // Trigger remix generation when inputs and profile are ready
  useEffect(() => {
      const mode = searchParams.get('mode');
      if (mode === 'remix' && inputs.context && userProfile && step === 'loading') { // wait for profile
         // Logic to trigger generate is duplicated?
         // Let's refactor handleGenerate or just call it?
         // handleGenerate reads from scope 'inputs'. 
         // If inputs updated in previous effect, they should be fresh here?
         handleGenerate();
      }
  }, [inputs, userProfile, searchParams, step, handleGenerate]); 
  
  // Correction: The first effect checks mode='remix' and sets 'inputs'.
  // It ALSO sets step='loading' to trigger the visual.
  // Then the second effect sees step='loading', mode='remix', and calls handleGenerate.
  // BUT handleGenerate sets step='loading' again. Infinite loop risk?
  // handleGenerate checks !inputs.context.
  
  // BETTER: Just Pre-fill. User clicks "Create Scene" (maybe rename button to "Remix Scene").
  // This is safer. The user sees "Ah, it copied the context!" and clicks "Go".
  // Less "Magic" but less buggy.
  // Compromise: Pre-fill + Auto-focus?
  
  // Let's stick to Pre-fill for now to avoid race conditions with profile fetching.
  // "Remix" means "Start with this base".
  
  // Update: If I remove setStep('loading') from the effect, it just pre-fills.
  
  const isRemix = searchParams.get('mode') === 'remix';

  const [generatedScript, setGeneratedScript] = useState<Script | null>(null);
  const [isSaving, setIsSaving] = useState(false);



  // ... (handleSave remains same) ...
  const handleSave = async () => {
     if (!user || !generatedScript) return;
     
     setIsSaving(true);
     try {
         // Sanitize function to remove undefined values
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const sanitize = (obj: any): any => {
           return JSON.parse(JSON.stringify(obj, (key, value) => {
             return value === undefined ? null : value;
           }));
         };

         const scenariosCollectionRef = collection(db, "users", user.uid, "scenarios");
         const newScriptRef = doc(scenariosCollectionRef);
         
         const userScript: Omit<UserScript, "id"> = {
             ...generatedScript,
             userId: user.uid,
             createdAt: Date.now(),
             authorName: user.displayName || user.email?.split('@')[0] || "Anonymous",
             authorPhotoURL: user.photoURL || undefined,
             authorOccupation: userProfile?.occupation,
             authorAgeGroup: userProfile?.ageGroup,
             authorCountry: userProfile?.motherLanguage, // Save Origin
             originalPrompt: inputs,
             isPublic: true,
             remixCount: 0,
             originalScenarioId: remixSourceId || undefined,
             isRemix: !!remixSourceId
         };
         
         const finalScript = {
             ...sanitize(userScript),
             id: newScriptRef.id 
         };
         
         // 1. Save the Scenario
         await setDoc(newScriptRef, finalScript);
         
         // 2. Increment User Stats (Optimistic)
         try {
            const { increment, updateDoc } = await import("firebase/firestore"); 
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                totalScenariosCreated: increment(1)
            }, { merge: true });

            // --- REMIX ATTRIBUTION (Manual Save) ---
            if (remixSourceId && remixAuthorId) {
                const originalRef = doc(db, "users", remixAuthorId, "scenarios", remixSourceId);
                updateDoc(originalRef, { remixCount: increment(1) }).catch(e => console.error(e));

                const authorRef = doc(db, "users", remixAuthorId);
                setDoc(authorRef, { totalRemixesInspired: increment(1) }, { merge: true }).catch(console.error);
            }

         } catch (statErr) {
            console.error("Failed to update user stats:", statErr);
         }

         router.push("/?tab=my_scenarios");
         
     } catch (error) {
         console.error("Error saving scenario:", error);
         alert(`Failed to save scenario.`);
         setIsSaving(false);
     }
  };

  const handleBack = () => {
    if (step === "preview") setStep("input");
  };



    const [placeholder, setPlaceholder] = useState(SCENARIO_PROMPTS[0]);

    useEffect(() => {
        // Init placeholder
        setPlaceholder({
            context: CONTEXTS[0],
            myRole: ROLES[0].my,
            otherRole: ROLES[0].other,
            plot: PLOTS[0]
        });
    }, []);

    const handleSurpriseMe = () => {
        // Combinatorial randomness
        const randomContext = CONTEXTS[Math.floor(Math.random() * CONTEXTS.length)];
        const randomRolePair = ROLES[Math.floor(Math.random() * ROLES.length)];
        const randomPlot = PLOTS[Math.floor(Math.random() * PLOTS.length)];

        setInputs({
            ...inputs, 
            context: randomContext,
            myRole: randomRolePair.my,
            otherRole: randomRolePair.other,
            plot: randomPlot
        });
        
        // Optional: Add a small tone shift for fun
        const randomTone = TONES[Math.floor(Math.random() * TONES.length)];
        setTone(randomTone);
    };

  return (
    <div className="w-full max-w-xl mx-auto py-6 px-4 md:py-10">
        <AnimatePresence mode="wait">
            {step === "input" && (
                <motion.div 
                    key="input"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col gap-6"
                >
                    {/* Vibrant Header Container */}
                    <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-2xl">
                         <div className="bg-background rounded-[23px] p-6 md:p-8 relative overflow-hidden">
                            {/* Decorative Background Blobs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full blur-[60px] -ml-12 -mb-12 pointer-events-none" />

                            <div className="relative z-10 flex flex-col gap-6">
                                
                                {/* Header & Surprise Button */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                                            Director&apos;s Chair
                                        </h1>
                                        <p className="text-muted-foreground text-sm font-medium mt-1">
                                            Craft your perfect practice scenario.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleSurpriseMe}
                                        className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto justify-center overflow-hidden"
                                    >
                                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2">
                                            ✨ Surprise Me
                                        </span>
                                    </button>
                                </div>

                                <div className="h-px w-full bg-border/50" />

                                {/* Inputs */}
                                <div className="space-y-6">
                                    {/* 1. Details Grid (Who) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                         <div className="space-y-2 group">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 group-focus-within:text-purple-500 transition-colors">
                                                Who are you?
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder={placeholder.myRole}
                                                className="w-full bg-secondary/30 hover:bg-secondary/50 focus:bg-background border border-transparent focus:border-purple-500/50 rounded-xl px-4 py-3 text-base font-semibold placeholder:text-muted-foreground/40 outline-none transition-all shadow-sm focus:shadow-purple-500/20"
                                                value={inputs.myRole}
                                                onChange={(e) => setInputs({...inputs, myRole: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 group-focus-within:text-purple-500 transition-colors">
                                                Who are they?
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder={placeholder.otherRole}
                                                className="w-full bg-secondary/30 hover:bg-secondary/50 focus:bg-background border border-transparent focus:border-purple-500/50 rounded-xl px-4 py-3 text-base font-semibold placeholder:text-muted-foreground/40 outline-none transition-all shadow-sm focus:shadow-purple-500/20"
                                                value={inputs.otherRole}
                                                onChange={(e) => setInputs({...inputs, otherRole: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    {/* 2. Context (Where) */}
                                    <div className="space-y-2 group">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-focus-within:text-pink-600 transition-colors">
                                                What&rsquo;s happening?
                                            </label>
                                        </div>
                                        <textarea 
                                            placeholder={placeholder.context}
                                            className="w-full bg-secondary/30 hover:bg-secondary/50 focus:bg-background border border-transparent focus:border-pink-500/50 rounded-xl px-4 py-3 text-base md:text-lg font-medium placeholder:text-muted-foreground/40 outline-none transition-all resize-none leading-relaxed min-h-[5rem] shadow-sm focus:shadow-pink-500/20"
                                            value={inputs.context}
                                            onChange={(e) => setInputs({...inputs, context: e.target.value})}
                                            autoFocus
                                            rows={2}
                                        />
                                    </div>

                                    {/* 3. Plot Twist (What) */}
                                    <div className="space-y-2 group">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 group-focus-within:text-indigo-500 transition-colors">
                                            The Plot Twist
                                        </label>
                                        <textarea 
                                            placeholder={placeholder.plot}
                                            className="w-full bg-secondary/30 hover:bg-secondary/50 focus:bg-background border border-transparent focus:border-indigo-500/50 rounded-xl px-4 py-3 text-base font-medium placeholder:text-muted-foreground/40 outline-none transition-all h-24 resize-none leading-relaxed shadow-sm focus:shadow-indigo-500/20"
                                            value={inputs.plot}
                                            onChange={(e) => setInputs({...inputs, plot: e.target.value})}
                                        />
                                    </div>

                                    {/* 4. Tone (How) */}
                                    <div className="space-y-2">
                                         <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                                            Vibe Check
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {TONES.map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => setTone(t)}
                                                    className={`
                                                        px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border
                                                        ${tone === t 
                                                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent shadow-lg shadow-purple-500/30 scale-105" 
                                                            : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground hover:scale-105"
                                                        }
                                                    `}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 5. Format (Meta) */}
                                    <div className="space-y-3">
                                         <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                                                Training Style
                                            </label>
                                            <p className="text-xs text-muted-foreground font-medium min-h-[1.5rem] h-auto transition-all opacity-80 leading-relaxed pr-2">
                                                {FORMAT_DESCRIPTIONS[format]}
                                            </p>
                                         </div>
                                        <div className="flex flex-wrap gap-2">
                                            {FORMATS.map(f => (
                                                <button
                                                    key={f}
                                                    onClick={() => setFormat(f)}
                                                    className={`
                                                        px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border
                                                        ${format === f 
                                                            ? "bg-foreground text-background border-foreground shadow-md scale-105" 
                                                            : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground hover:scale-105"
                                                        }
                                                    `}
                                                >
                                                    {f}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>

                    <div className="pt-6">
                        <Button 
                            onClick={handleGenerate}
                            disabled={!inputs.context || !inputs.plot}
                            variant="primary"
                            size="lg"
                            className="w-full h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:opacity-90 active:scale-[0.98] transition-all"
                        >
                            {isRemix ? "✨ Remix Scene" : "Create Scene"}
                        </Button>
                        
                        {/* Phase 4: Credit Counter */}
                        <div className="mt-3 text-center">
                            <button 
                                onClick={() => !canCreateScenario() && setShowUpgrade(true)}
                                className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                                    canCreateScenario() 
                                    ? "border-emerald-500/30 text-emerald-600 bg-emerald-50"
                                    : "border-red-500/30 text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer"
                                }`}
                            >
                                {canCreateScenario() 
                                    ? `⚡ Credits: ${credits.remaining} / ${credits.limit}`
                                    : "🚫 Daily Limit Reached (Tap to Upgrade)"
                                }
                            </button>
                        </div>
                    </div>
                    
                    <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} reason="gen_limit" />
                </motion.div>
            )}

            {step === "loading" && (
                <LoadingDirector params={inputs} userProfile={userProfile} />
            )}

            {step === "preview" && generatedScript && (
                <motion.div 
                    key="preview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Minimal Nav */}
                    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md py-4 border-b border-border/40 -mx-4 px-4 flex items-center justify-between mb-6">
                        <Button 
                            onClick={handleBack} 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary font-medium hover:bg-transparent p-0"
                        >
                            Back
                        </Button>
                        <div className="flex items-center gap-2">
                             {/* Study Mode Toggle */}
                             <button
                                onClick={() => setIsStudyMode(!isStudyMode)}
                                className={`
                                    p-2 rounded-full transition-colors
                                    ${!isStudyMode 
                                        ? 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                        : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' 
                                    }
                                `}
                                title={!isStudyMode ? "Switch to Study Mode (Hidden)" : "Switch to Review Mode (Visible)"}
                            >
                                {!isStudyMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            <Button 
                                onClick={handleSave} 
                                disabled={isSaving}
                                variant="ghost"
                                size="sm"
                                className="text-primary font-bold hover:bg-transparent p-0 ml-2"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6 pb-20">
                         {/* Title Card */}
                         <div className="text-center space-y-2 mb-8">
                             <h2 className="text-3xl font-bold tracking-tight">{generatedScript.title}</h2>
                             <p className="text-muted-foreground">{generatedScript.cleanedEnglish}</p>
                         </div>

                        {(generatedScript.sentences || []).map((sentence, idx) => (
                            <ClozeCard 
                                key={sentence.id} 
                                sentence={sentence} 
                                index={idx} 
                                heard={false} 
                                onHeard={() => {}} 
                                isGlobalRevealed={!isStudyMode} 
                                mode={isStudyMode ? "cloze" : "standard"}
                            />
                        ))}

                        {generatedScript.culturalInsights && (
                            <CulturalNoteCard 
                                title={generatedScript.culturalInsights.title}
                                content={generatedScript.culturalInsights.content}
                                onNext={() => {}}
                            />
                        )}

                        {generatedScript.quizItems && generatedScript.quizItems.length > 0 && (
                            <QuizCard 
                                items={generatedScript.quizItems}
                                onFinish={() => {}}
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}

function LoadingDirector({ params, userProfile }: { params: { context: string, myRole: string, otherRole: string }, userProfile: UserProfile | null }) {
    const [msgIndex, setMsgIndex] = useState(0);
    
    const messages = [
        "🎬 Hiring actors for " + (params.otherRole || "the scene") + "...",
        "🧠 Brainstorming " + (params.myRole ? `what a ${params.myRole} would say...` : "dialogue..."),
        "✍️ Drafting the perfect comeback...",
        "🌶️ Adding a pinch of drama...",
        "🎭 Rehearsing the final lines...",
        "✨ Polishing the script..."
    ];

    // Inject personal flavor if available
    if (userProfile?.humorStyle) {
        messages.splice(2, 0, `🎭 Applying your ${userProfile.humorStyle} humor style...`);
    }
    if (userProfile?.occupation) {
        // e.g. "Checking with other Software Engineers..."
        messages.splice(1, 0, `👷 Consulting with other ${userProfile.occupation}s...`);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex(prev => (prev + 1) % messages.length);
        }, 800);
        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8 py-10"
        >
            {/* Animated Icon Container */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse" />
                <div className="w-24 h-24 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg relative z-10 animate-[bounce_2s_infinite]">
                     <span className="text-4xl animate-[spin_3s_linear_infinite]">🎬</span>
                </div>
            </div>

            <div className="space-y-4 max-w-sm">
                <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                    Directing Scene...
                </h3>
                
                <div className="h-24 flex items-center justify-center overflow-hidden relative px-4">
                    <AnimatePresence mode="wait">
                        <motion.p 
                            key={msgIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-lg md:text-xl font-medium text-foreground/80 absolute w-full text-balance leading-relaxed"
                        >
                            {messages[msgIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Progress Bar Visual */}
            <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}
