"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category } from "@/types";
import { Plus, Edit2, Trash2, Check, X, ShieldAlert, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [editingSlug, setEditingSlug] = useState("");
    const [formData, setFormData] = useState<Partial<Category>>({
        slug: "", name: "", description: "", image: "", color: "indigo", isPremium: false, price: 0
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const snap = await getDocs(collection(db, "categories"));
            const cats: Category[] = [];
            snap.forEach(doc => cats.push({ slug: doc.id, ...doc.data() } as Category));

            cats.sort((a, b) => {
                if (a.slug === "american_culture") return 1;
                if (b.slug === "american_culture") return -1;
                return 0;
            });

            setCategories(cats);
        } catch (e) {
            console.error("Error fetching categories:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.slug || !formData.name) return toast.error("Slug and Name are required");

        const slug = isEditing ? editingSlug : formData.slug;
        try {
            await setDoc(doc(db, "categories", slug), {
                ...formData,
                updatedAt: Date.now()
            }, { merge: true });

            toast.success(isEditing ? "Category updated!" : "Category created!");
            resetForm();
            fetchCategories();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await deleteDoc(doc(db, "categories", slug));
            toast.success("Category deleted");
            fetchCategories();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const startEdit = (cat: Category) => {
        setIsEditing(true);
        setEditingSlug(cat.slug);
        setFormData(cat);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingSlug("");
        setFormData({ slug: "", name: "", description: "", image: "", color: "indigo", isPremium: false, price: 0 });
    };

    if (isLoading) {
        return <div className="p-8 text-neutral-500 font-bold uppercase tracking-widest animate-pulse">Loading Matrix...</div>;
    }

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 pb-32">
            <div>
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">CATEGORY <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">MANAGER</span></h1>
                <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Control content access and monetization</p>
            </div>

            {/* Form */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                    {isEditing ? <><Edit2 className="w-5 h-5 text-primary" /> Edit Category</> : <><Plus className="w-5 h-5 text-primary" /> Create New Category</>}
                </h2>

                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-neutral-500 mb-2">Category Slug (ID)</label>
                            <input
                                disabled={isEditing}
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                                placeholder="e.g. american_culture"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-neutral-500 mb-2">Display Name</label>
                            <input
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="e.g. American Culture"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-neutral-500 mb-2">Theme Color</label>
                            <input
                                value={formData.color || ""}
                                onChange={e => setFormData({ ...formData, color: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="e.g. indigo, emerald, pink"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-neutral-500 mb-2">Cover Image URL</label>
                            <input
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="/images/categories/..."
                            />
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col">
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-neutral-500 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                placeholder="Describe the category..."
                            />
                        </div>

                        <div className="bg-neutral-950 border border-primary/20 rounded-2xl p-6 mt-2 flex flex-col gap-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Access & Monetization</h3>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" className="sr-only peer" checked={formData.isPremium || false} onChange={e => setFormData({ ...formData, isPremium: e.target.checked })} />
                                    <div className="w-11 h-6 bg-neutral-800 rounded-full peer peer-checked:bg-primary transition-all"></div>
                                    <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
                                </div>
                                <span className="font-bold text-sm">Require PRO or One-time Purchase</span>
                            </label>

                            {formData.isPremium && (
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-neutral-500 mb-2">One-Time Buy Price (in Cents)</label>
                                    <input
                                        type="number"
                                        value={formData.price || 0}
                                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="499 = $4.99"
                                    />
                                    <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider">Example: 499 = $4.99. Leave 0 if it's PRO only.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-2 flex items-center gap-4 mt-4">
                        <button type="submit" className="px-8 py-3 bg-primary text-primary-foreground font-black uppercase text-sm tracking-wider rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                            {isEditing ? <><Check className="w-4 h-4" /> Save Changes</> : <><Plus className="w-4 h-4" /> Create Category</>}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={resetForm} className="px-8 py-3 bg-neutral-800 text-white font-bold uppercase text-sm tracking-wider rounded-xl hover:bg-neutral-700 transition-colors flex items-center gap-2">
                                <X className="w-4 h-4" /> Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden mt-12">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-950 border-b border-neutral-800 text-xs uppercase tracking-widest text-neutral-500">
                                <th className="p-4 font-bold">Category</th>
                                <th className="p-4 font-bold">Slug</th>
                                <th className="p-4 font-bold">Access</th>
                                <th className="p-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/50">
                            {categories.map((cat) => (
                                <tr key={cat.slug} className="hover:bg-neutral-800/20 transition-colors">
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white">{cat.name}</span>
                                            <span className="text-xs text-neutral-500 line-clamp-1">{cat.description}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-neutral-400 font-mono">{cat.slug}</td>
                                    <td className="p-4">
                                        {cat.isPremium ? (
                                            <span className="px-2 py-1 bg-amber-500/10 text-amber-500 rounded-md text-xs font-bold uppercase tracking-wider border border-amber-500/20 inline-flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                Premium {cat.price ? `($${(cat.price / 100).toFixed(2)})` : ''}
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                                                Free
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => startEdit(cat)} className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors" title="Edit">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(cat.slug)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
