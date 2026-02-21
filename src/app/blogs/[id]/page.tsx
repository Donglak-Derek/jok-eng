"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Share2, Sparkles, Youtube, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DailyChallengeCard from "@/components/DailyChallengeCard";
import { Button } from "@/components/Button";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    tag: string;
    textbook: string;
    real: string;
    color: string;
    content: string;
    relatedScenarioId?: string;
    author?: string;
}

export default function BlogDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            if (!id || typeof id !== 'string') return;
            try {
                const docRef = doc(db, "blogs", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
                <Button onClick={() => router.push("/blogs")}>Back to Blogs</Button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            <Header />

            <article className="pt-32 px-6 max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Feed
                </Link>

                {/* Hero */}
                <header className="space-y-6 mb-12">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${post.color}`}>
                        {post.tag}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic">
                        {post.title.toUpperCase()}
                    </h1>
                    <div className="flex items-center gap-6 text-muted-foreground text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">
                                {post.author ? post.author[0].toUpperCase() : 'A'}
                            </div>
                            By {post.author || 'Author'}
                        </div>
                        <div>5 min read</div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="p-6 bg-secondary/30 rounded-3xl border border-border/50">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">The Textbook Way 🤖</span>
                            <p className="text-muted-foreground italic">&quot;{post.textbook}&quot;</p>
                        </div>
                        <div className="p-6 bg-primary/5 rounded-3xl border border-primary/20">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">The Derek Way ✨</span>
                            <p className="text-foreground font-bold">&quot;{post.real}&quot;</p>
                        </div>
                    </div>

                    <div
                        className="space-y-6 text-foreground/80 leading-relaxed text-xl"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>

                {/* Content Loop: Practice Link */}
                <div className="mb-20 p-8 rounded-[3rem] bg-black text-white flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-2xl font-bold">Ready to rehearse?</h3>
                        <p className="text-neutral-400">Put this theory into practice in our interactive dōjō.</p>
                    </div>
                    <Button
                        size="lg"
                        onClick={() => {
                            if (post.relatedScenarioId) {
                                router.push(`/scenario/${post.relatedScenarioId}`);
                            } else {
                                router.push('/scenarios');
                            }
                        }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-14 rounded-full min-w-[200px]"
                        leftIcon={<Sparkles className="w-5 h-5" />}
                    >
                        Try Scenario
                    </Button>
                </div>

                <hr className="border-border/50 mb-20" />

                {/* Content Loop: Daily Quiz */}
                <section className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase">
                            Quiz <span className="text-primary">Time</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">Did you catch the nuance? Test your skills below.</p>
                    </div>
                    <DailyChallengeCard />
                </section>
            </article>

            <Footer />
        </main>
    );
}
