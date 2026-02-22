"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, CheckCircle, AlertCircle, Loader2, Youtube, ExternalLink } from "lucide-react";
import { auth } from "@/lib/firebase";

export default function AdminGenerator() {
    const [youtubeId, setYoutubeId] = useState("");
    const [title, setTitle] = useState("");
    const [transcript, setTranscript] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!youtubeId || !title || !transcript) {
            setError("All fields are required");
            return;
        }

        setIsLoading(true);
        setError("");
        setResult(null);

        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch("/api/generate-lesson", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ youtubeId, title, transcript })
            });

            const data = await response.json();
            if (data.success) {
                setResult(data);
            } else {
                setError(data.error || "Failed to generate");
            }
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 md:p-20">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                        <Sparkles className="text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tighter">CONTENT ENGINE</h1>
                        <p className="text-neutral-500 font-bold text-sm tracking-widest uppercase">Video to Interactive Lesson</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">YouTube ID</label>
                            <div className="relative">
                                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                                <input
                                    value={youtubeId}
                                    onChange={(e) => setYoutubeId(e.target.value)}
                                    placeholder="e.g., isYaXmdgu88"
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Video Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., The Diagnostic Greeting"
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Transcript</label>
                            <textarea
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                                placeholder="Paste the subtitles/transcript here..."
                                rows={8}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none text-sm leading-relaxed"
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="w-full bg-white text-black font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    GENERATING...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    MAGIC GENERATE
                                </>
                            )}
                        </button>
                    </div>

                    {/* Preview / Results */}
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-[2.5rem] p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6 relative z-10"
                                >
                                    <div className="flex items-center gap-3 text-green-500 font-bold uppercase tracking-widest text-xs">
                                        <CheckCircle className="w-4 h-4" />
                                        Success! Lesson Live.
                                    </div>
                                    <h2 className="text-2xl font-black">{result.exactScript.title}</h2>
                                    <p className="text-neutral-400 text-sm leading-relaxed italic border-l-2 border-primary/30 pl-4">
                                        {result.exactScript.cleanedEnglish}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="bg-neutral-800/50 p-4 rounded-2xl">
                                            <div className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Quizzes</div>
                                            <div className="text-xl font-black">3</div>
                                        </div>
                                        <div className="bg-neutral-800/50 p-4 rounded-2xl">
                                            <div className="text-[10px] font-bold text-neutral-500 uppercase mb-1">Total Lines</div>
                                            <div className="text-xl font-black">10</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => window.open(`/script/${result.exactScript.id}`, '_blank')}
                                            className="w-full bg-primary hover:opacity-90 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm text-primary-foreground"
                                        >
                                            PREVIEW: EXACT SCRIPT
                                            <Send className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => window.open(`/script/${result.generalScenario.id}`, '_blank')}
                                            className="w-full bg-neutral-800 hover:bg-neutral-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
                                        >
                                            PREVIEW: GENERAL SCENARIO
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : error ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center space-y-4"
                                >
                                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto opacity-50" />
                                    <div className="text-red-500 font-bold text-sm">{error}</div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center space-y-4 opacity-30"
                                >
                                    <Loader2 className="w-12 h-12 text-white mx-auto animate-[spin_4s_linear_infinite]" />
                                    <p className="font-bold text-xs uppercase tracking-[0.2em]">Awaiting Content</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
