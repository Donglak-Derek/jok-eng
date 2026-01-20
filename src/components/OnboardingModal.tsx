"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types";

const HUMOR_STYLES = [
  "Witty & Clever 🧠",
  "Dad Jokes 🧔",
  "Sarcastic & Dry 😒",
  "Cheesy & Punny 🧀",
  "Dark & Edgy 🌑",
  "Wholesome & Cute 🧸"
];

const LANGUAGES = [
  "Spanish", "French", "German", "Italian", "Portuguese", 
  "Chinese (Mandarin)", "Japanese", "Korean", "Russian", "Arabic", "Hindi", "Other"
];

const HOBBIES = [
  "Tech & Coding 💻", "Movies & TV 🎬", "Sports ⚽", "Music 🎵", 
  "Gaming 🎮", "Travel ✈️", "Cooking 🍳", "Reading 📚", "Art & Design 🎨"
];

const SUPERPOWERS = [
  "Empathy / Listener 👂", "Quick Wit ⚡", "Storytelling 📖", 
  "Logical / Facts 🧠", "Peacemaker 🕊️", "Energy / Hype 🔋"
];

const KRYPTONITES = [
  "Small Talk 🐜", "Confrontation 🥊", "Public Speaking 🎤", 
  "Flirting 💘", "Saying 'No' 🙅", "Networking 🤝"
];

export default function OnboardingModal() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [occupation, setOccupation] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [humorStyle, setHumorStyle] = useState("");
  const [motherLanguage, setMotherLanguage] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [kryptonite, setKryptonite] = useState("");

  // Check if user needs onboarding
  useEffect(() => {
    const checkOnboarding = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        // If doc exists but no onboarding data, OR doc doesn't exist (new user)
        // PHASE 3: Also force open if "superpower" is missing (The Vibe Update rollout)
        if (!userDoc.exists() || !userDoc.data().onboardingCompleted || !userDoc.data().superpower) {
            
            // Only show if we haven't already dismissed it this session? 
            // For now, let's force it until they complete it.
            setIsOpen(true);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkOnboarding();
  }, [user]);

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else {
      if (selectedHobbies.length < 3) {
        setSelectedHobbies([...selectedHobbies, hobby]);
      }
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (!occupation || !humorStyle || !motherLanguage || !superpower || !kryptonite) return; // Basic validation

    setLoading(true);
    try {
      const profileData: UserProfile = {
        uid: user.uid,
        occupation,
        hobbies: selectedHobbies,
        humorStyle,
        motherLanguage,
        superpower,
        kryptonite,
        onboardingCompleted: true
      };

      // Merge true to avoid overwriting other potential fields if the doc existed
      await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
      
      setIsOpen(false);
      // Optional: Trigger a refresh or context update if needed
      window.location.reload(); // Hard reload to ensure apps picks up new state if needed immediately
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Something went wrong saving your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-secondary/30 border-b border-border">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Welcome to Jok-eng! 👋
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Help us personalize your daily scenarios.
            </p>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
            
            {/* 1. Occupation */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">
                What do you do? 💼
              </label>
              <input 
                type="text" 
                placeholder="e.g. Software Engineer, Student, Doctor..."
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-transparent focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            {/* 2. Mother Language */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">
                Mother Language 🗣️
              </label>
              <select 
                value={motherLanguage}
                onChange={(e) => setMotherLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-transparent focus:border-primary focus:bg-background outline-none appearance-none"
              >
                <option value="" disabled>Select your language</option>
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* 3. Humor Style */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">
                Your Flavor of Humor 🎭
              </label>
              <div className="grid grid-cols-2 gap-2">
                {HUMOR_STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setHumorStyle(style)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all text-left ${
                      humorStyle === style 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "bg-secondary/30 border-transparent hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Superpower */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">
                Your Conversational Superpower 🦸
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SUPERPOWERS.map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setSuperpower(sp)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all text-left ${
                      superpower === sp 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "bg-secondary/30 border-transparent hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Kryptonite */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">
                Your Kryptonite (Weak Point) 💎
              </label>
              <div className="grid grid-cols-2 gap-2">
                {KRYPTONITES.map((kp) => (
                  <button
                    key={kp}
                    onClick={() => setKryptonite(kp)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all text-left ${
                      kryptonite === kp 
                        ? "bg-red-500/10 border-red-500/50 text-red-600" 
                        : "bg-secondary/30 border-transparent hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {kp}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Hobbies */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">
                Interests & Hobbies (Pick up to 3) 🎯
              </label>
              <div className="flex flex-wrap gap-2">
                {HOBBIES.map((hobby) => (
                  <button
                    key={hobby}
                    onClick={() => toggleHobby(hobby)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      selectedHobbies.includes(hobby)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80"
                    }`}
                  >
                    {hobby}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border bg-secondary/10 text-right">
            <button
              onClick={handleSubmit}
              disabled={!occupation || !humorStyle || !motherLanguage || !superpower || !kryptonite || loading}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {loading ? "Saving..." : "Start Learning 🚀"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
