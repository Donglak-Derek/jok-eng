"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, CheckCircle, AlertCircle, Loader2, Youtube } from "lucide-react";
import { saveVideoLesson } from "@/lib/videoLessons";
import { useRouter } from "next/navigation";

export default function AdminVideoUpload() {
    const [youtubeId, setYoutubeId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSave = async () => {
        if (!youtubeId || !title) {
            setError("YouTube ID and Title are required");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess(false);

        try {
            await saveVideoLesson(youtubeId, title, description);
            setSuccess(true);
            setYoutubeId("");
            setTitle("");
            setDescription("");
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (e: any) {
            setError(e.message || "Failed to save video");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 md:p-20">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                            <PlusCircle className="text-primary-foreground w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black italic tracking-tighter">ADD VIDEO</h1>
                            <p className="text-neutral-500 font-bold text-sm tracking-widest uppercase">Short-form feed content</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => router.push('/admin/videos')} 
                        className="text-sm font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest"
                    >
                        Back to Vault
                    </button>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 shadow-xl">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">YouTube ID</label>
                            <div className="relative">
                                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                                <input
                                    value={youtubeId}
                                    onChange={(e) => setYoutubeId(e.target.value)}
                                    placeholder="e.g., isYaXmdgu88"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 pl-12 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Video Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., The Diagnostic Greeting"
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Video Description (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add context or notes about this video..."
                                rows={5}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium resize-none text-sm leading-relaxed"
                            />
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="text-red-500 text-sm font-bold flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="text-green-500 text-sm font-bold flex items-center gap-2 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                    <CheckCircle className="w-4 h-4" /> Video successfully added to the vault!
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    SAVING...
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="w-5 h-5" />
                                    PUBLISH VIDEO
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
