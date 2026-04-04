"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Edit, Plus, ExternalLink, Loader2, Save, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Blog {
    id: string;
    title: string;
    content: string;
    author: string;
    readTime: string;
    imageUrl: string;
    createdAt: number;
    updatedAt?: number;
}

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null); // null = creating new
    const [formData, setFormData] = useState({ title: "", content: "", author: "Jok-Eng Team", readTime: "5 min", imageUrl: "" });
    const [isSaving, setIsSaving] = useState(false);

    async function fetchBlogs() {
        setIsLoading(true);
        try {
            const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog));
            setBlogs(fetched);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleSave = async () => {
        if (!formData.title || !formData.content) return alert("Title and Content are required.");

        setIsSaving(true);
        try {
            if (editingBlog?.id) {
                // Update
                const docRef = doc(db, "blogs", editingBlog.id);
                await updateDoc(docRef, {
                    ...formData,
                    updatedAt: Date.now()
                });
            } else {
                // Create
                await addDoc(collection(db, "blogs"), {
                    ...formData,
                    createdAt: Date.now(),
                });
            }
            setIsEditing(false);
            setEditingBlog(null);
            fetchBlogs();
        } catch (error) {
            console.error("Error saving blog:", error);
            alert("Failed to save. Check permissions.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to permanently delete the blog post: "${title}"?`)) return;
        try {
            await deleteDoc(doc(db, "blogs", id));
            setBlogs(blogs.filter(b => b.id !== id));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const openEditor = (blog: Blog | null = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({ title: blog.title, content: blog.content, author: blog.author || "Jok-Eng Team", readTime: blog.readTime || "5 min", imageUrl: blog.imageUrl || "" });
        } else {
            setEditingBlog(null);
            setFormData({ title: "", content: "", author: "Jok-Eng Team", readTime: "5 min", imageUrl: "" });
        }
        setIsEditing(true);
    };

    if (isLoading) return <div className="p-8 text-neutral-500 font-bold uppercase tracking-widest animate-pulse">Loading Blogs...</div>;

    if (isEditing) {
        return (
            <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tighter">{editingBlog ? "EDIT ARTICLE" : "NEW ARTICLE"}</h1>
                    </div>
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Title</label>
                        <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-bold text-xl" placeholder="E.g., How to Survive Small Talk" />
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-1 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Author</label>
                            <input value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm" />
                        </div>
                        <div className="col-span-1 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Read Time</label>
                            <input value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm" />
                        </div>
                        <div className="col-span-1 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Image URL (Optional)</label>
                            <input value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Content (Markdown supported)</label>
                        <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={15} className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono text-sm leading-relaxed" placeholder="Write the article body here..." />
                    </div>

                    <button disabled={isSaving} onClick={handleSave} className="w-full bg-emerald-500 text-black font-black py-4 rounded-xl shadow-xl hover:bg-emerald-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {isSaving ? "SAVING..." : "PUBLISH ARTICLE"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">EDITORIAL <span className="text-emerald-500">CMS</span></h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Manage Long-form Content</p>
                </div>

                <button
                    onClick={() => openEditor()}
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-black uppercase text-sm tracking-wider hover:scale-105 transition-transform"
                >
                    <Plus className="w-5 h-5" />
                    Draft New Article
                </button>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-950/50 border-b border-neutral-800 text-neutral-500 font-bold uppercase tracking-widest text-[10px]">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {blogs.length === 0 && (
                            <tr><td colSpan={4} className="px-6 py-12 text-center text-neutral-500 italic">No blogs found.</td></tr>
                        )}
                        {blogs.map(blog => (
                            <tr key={blog.id} className="hover:bg-neutral-800/50 transition-colors group">
                                <td className="px-6 py-4 font-bold">{blog.title}</td>
                                <td className="px-6 py-4 text-neutral-400">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-neutral-400">{blog.author}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/blogs/${blog.id}`} target="_blank" className="p-2 inline-flex text-neutral-500 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"><ExternalLink className="w-4 h-4" /></Link>
                                    <button onClick={() => openEditor(blog)} className="p-2 inline-flex text-neutral-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(blog.id, blog.title)} className="p-2 inline-flex text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
