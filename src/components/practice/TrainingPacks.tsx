"use client";

import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TrainingPacks() {
    const { categories, loading } = useCategories();

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Grouping logic for Training Packs
    const packs = [
        {
            title: "Networking Reps",
            description: "Master the art of effortless small talk and kill social anxiety.",
            keywords: ["small_talk", "dating", "networking", "socializing"],
            categories: [] as Category[]
        },
        {
            title: "High-Stakes Office",
            description: "Nail every interview and command every office negotiation.",
            keywords: ["business", "interview", "office", "professional"],
            categories: [] as Category[]
        },
        {
            title: "American Vibe",
            description: "Unlock cultural nuances and slang to sound like a local insider.",
            keywords: ["slang", "american_culture", "culture", "street"],
            categories: [] as Category[]
        },
        {
            title: "All-Access Grind",
            description: "Complete training sets for high-volume social conditioning.",
            keywords: [], // Catch-all
            categories: [] as Category[]
        }
    ];

    categories.forEach(c => {
        let placed = false;
        for (const pack of packs) {
            if (pack.keywords.some(k => c.slug.toLowerCase().includes(k))) {
                pack.categories.push(c);
                placed = true;
                break;
            }
        }
        if (!placed) {
            packs[3].categories.push(c);
        }
    });

    return (
        <div className="space-y-16">
            {packs.filter(p => p.categories.length > 0).map((pack, packIndex) => (
                <div key={pack.title} className="w-full">
                    <div className="mb-6 pl-2 border-l-4 border-primary">
                        <h2 className="text-3xl font-black italic tracking-tighter uppercase">{pack.title}</h2>
                        <p className="text-muted-foreground font-medium">{pack.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {pack.categories.map((c, i) => (
                            <motion.div
                                key={c.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link href={`/category/${c.slug}`} className="block w-full h-full group outline-none">
                                    <div className="flex flex-col w-full h-full bg-card rounded-3xl shadow-sm border border-border overflow-hidden group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                                        <div className="relative w-full aspect-video bg-muted">
                                            <Image
                                                src={c.image || "/images/categories/small_talk.png"}
                                                alt={c.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 300px"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <h3 className="font-black text-xl tracking-tight leading-tight drop-shadow-md">
                                                    {c.name}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between bg-card text-card-foreground">
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                {c.description}
                                            </p>
                                            <div className="text-xs font-bold uppercase tracking-widest text-primary">
                                                Start Set &rarr;
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
