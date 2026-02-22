"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { VideoLesson } from "@/lib/videoLessons";
import { Trash2, ExternalLink, PlayCircle, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminVideosPage() {
    const [videos, setVideos] = useState<VideoLesson[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function fetchVideos() {
        try {
            const q = query(collection(db, "video_lessons"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const fetchedVideos: VideoLesson[] = [];
            snapshot.forEach((doc) => {
                fetchedVideos.push({ id: doc.id, ...doc.data() } as VideoLesson);
            });
            setVideos(fetchedVideos);
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to permanently delete the video lesson: "${title}"?`)) {
            return;
        }

        setDeletingId(id);
        try {
            await deleteDoc(doc(db, "video_lessons", id));
            // Also optionally delete the associated scenario script from the original author
            // But for safety, we'll just delete the video link for now.
            setVideos(videos.filter(v => v.id !== id));
        } catch (error) {
            console.error("Error deleting video:", error);
            alert("Failed to delete video. Check permissions.");
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-neutral-500 font-bold uppercase tracking-widest animate-pulse">Loading Vault...</div>;
    }

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">VIDEO <span className="text-blue-500">VAULT</span></h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Manage front-page video content</p>
                </div>

                <Link
                    href="/admin/generator"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-black uppercase text-sm tracking-wider hover:scale-105 transition-transform"
                >
                    <Sparkles className="w-4 h-4" />
                    AI Generate New
                </Link>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-950/50 border-b border-neutral-800 text-neutral-500 font-bold uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-6 py-4">Thumbnail</th>
                                <th className="px-6 py-4">Title & Context</th>
                                <th className="px-6 py-4">YouTube ID</th>
                                <th className="px-6 py-4">Linked Script</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            <AnimatePresence>
                                {videos.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-neutral-500 italic">No videos found. Use the generator to create one.</td>
                                    </tr>
                                )}
                                {videos.map(video => (
                                    <motion.tr
                                        key={video.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                                        className="hover:bg-neutral-800/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 w-32">
                                            <div className="w-24 h-16 bg-neutral-800 rounded-lg overflow-hidden relative">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                                                    alt="thumb"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-base mb-1">{video.title}</div>
                                            <div className="text-neutral-500 line-clamp-1">{video.script?.title || "No description"}</div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-neutral-400">
                                            {video.youtubeId}
                                        </td>
                                        <td className="px-6 py-4">
                                            {video.script?.id ? (
                                                <Link
                                                    href={`/script/${video.script.id}`}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-mono text-xs bg-primary/10 px-2 py-1 rounded"
                                                >
                                                    {video.script.id.slice(0, 8)}... <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            ) : (
                                                <span className="text-neutral-600 text-xs italic">Unlinked</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2 h-full min-h-[5rem]">
                                            <button
                                                onClick={() => handleDelete(video.id || "", video.title)}
                                                disabled={deletingId === video.id}
                                                className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                                title="Delete Video"
                                            >
                                                {deletingId === video.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
