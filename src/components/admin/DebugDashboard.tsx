"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Session } from "@/types";
import { fixImagePath } from "@/lib/utils/image";

export default function DebugDashboard() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSessions() {
            try {
                const q = query(collection(db, "missions"), orderBy("day", "asc"));
                const snap = await getDocs(q);
                const loadedSessions = snap.docs.map(doc => {
                    const data = doc.data() as Session;
                    return {
                        ...data,
                        imageUrl: fixImagePath(data.imageUrl)
                    };
                });
                setSessions(loadedSessions);
            } catch (error) {
                console.error("Error fetching sessions for debug:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSessions();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading Roadmap Data...</div>;
    }

    return (
        <div className="space-y-8 pb-20">
            <h1 className="text-3xl font-black italic tracking-tighter">Roadmap Integrity Check</h1>
            <p className="text-muted-foreground">Found {sessions.length} sessions in database.</p>

            <div className="space-y-6">
                {sessions.map((session) => (
                    <div key={`session-${session.day}`} className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-4">
                        <div className="flex items-center gap-4 border-b border-border pb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-xl">
                                {session.day}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{session.title}</h2>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                                    Phase {session.phase} • {session.module}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
                                <h3 className="font-bold text-primary">Image/Visuals</h3>
                                <p><strong>Description:</strong> {session.image_description || <span className="text-destructive uppercase">Missing</span>}</p>
                                <p><strong>Image URL:</strong> {session.imageUrl ? <a href={session.imageUrl} target="_blank" className="text-blue-500 underline">View Asset</a> : <span className="text-muted-foreground">Fallback Configured</span>}</p>
                            </div>

                            <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
                                <h3 className="font-bold text-primary">Cloze Logic</h3>
                                <p><strong>Setup Text:</strong> {session.cloze_setup || <span className="text-destructive uppercase">Missing</span>}</p>
                                <p><strong>Keywords:</strong> {session.cloze_keywords?.length || 0} Found</p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <h3 className="font-bold text-primary">Response Logic</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {session.options?.map((opt, i) => {
                                    const isLow = opt.vibe_score < 70;
                                    const isHigh = opt.vibe_score >= 80;
                                    return (
                                        <div key={i} className={`p-4 rounded-xl border-2 ${isHigh ? 'bg-green-500/10 border-green-500/30' : isLow ? 'bg-red-500/10 border-red-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-bold text-lg">{opt.vibe_score} XP</span>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${isLow ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}`}>
                                                    {isLow ? 'RETRY' : 'NEXT DAY'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">"{opt.text}"</p>
                                            <p className="text-xs font-medium italic">Feedback: {opt.feedback?.substring(0, 30)}...</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
