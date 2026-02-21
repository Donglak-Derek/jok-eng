"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, ExternalLink, MessageSquareQuote, PlayCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminScenariosPage() {
    const [scenarios, setScenarios] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function fetchScenarios() {
        setIsLoading(true);
        try {
            // Fetch ONLY from the official Jok-Eng account
            const q = query(
                collection(db, "users", "jok-eng-official", "scenarios"),
                orderBy("createdAt", "desc")
            );
            const snapshot = await getDocs(q);
            const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setScenarios(fetched);
        } catch (error) {
            console.error("Error fetching scenarios:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchScenarios();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to permanently delete the official scenario: "${title}"?`)) return;

        setDeletingId(id);
        try {
            await deleteDoc(doc(db, "users", "jok-eng-official", "scenarios", id));
            setScenarios(scenarios.filter(s => s.id !== id));
        } catch (error) {
            console.error("Error deleting scenario:", error);
            alert("Failed to delete. Check permissions.");
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) return <div className="p-8 text-neutral-500 font-bold uppercase tracking-widest animate-pulse">Loading Official Scenarios...</div>;

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">SCENARIO <span className="text-purple-500">CMS</span></h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Manage Official Interactive Content</p>
                </div>

                {/* Note: In v1, generating scenarios is done via the CLI script. 
                    Adding a direct button to run that script later or a dedicated UI form. */}
                <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                    <MessageSquareQuote className="w-4 h-4" />
                    Viewing: jok-eng-official
                </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-950/50 border-b border-neutral-800 text-neutral-500 font-bold uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-6 py-4">Title & Context</th>
                                <th className="px-6 py-4">Created</th>
                                <th className="px-6 py-4">Difficulty</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {scenarios.length === 0 && (
                                <tr><td colSpan={4} className="px-6 py-12 text-center text-neutral-500 italic">No official scenarios found. Run the seed script.</td></tr>
                            )}
                            <AnimatePresence>
                                {scenarios.map(scenario => (
                                    <motion.tr
                                        key={scenario.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="hover:bg-neutral-800/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-base mb-1">{scenario.title}</div>
                                            <div className="text-neutral-500 line-clamp-1 italic text-xs">{scenario.cleanedEnglish}</div>
                                            <div className="text-neutral-600 text-[10px] mt-1 uppercase tracking-widest">
                                                {scenario.categoryName} • {scenario.sentences?.length || 0} Lines
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-400 font-mono text-xs">
                                            {new Date(scenario.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-neutral-800 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-neutral-300">
                                                {scenario.difficulty || "Normal"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link
                                                href={`/script/${scenario.id}`}
                                                target="_blank"
                                                className="p-2 inline-flex text-neutral-500 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                                                title="Preview Scenario"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(scenario.id, scenario.title)}
                                                disabled={deletingId === scenario.id}
                                                className="p-2 inline-flex text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                                title="Delete Scenario"
                                            >
                                                {deletingId === scenario.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
