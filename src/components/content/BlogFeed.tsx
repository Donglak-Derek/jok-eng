"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BLOG_POSTS = [
    {
        id: "1",
        title: "Ordering Coffee like a local",
        excerpt: "Forget 'I want a coffee'. Here is how to navigate the complex social cues of a busy morning rush.",
        tag: "Real World",
        textbook: "I would like a medium coffee with milk, please.",
        real: "Can I get a venti oat milk latte? To go, thanks!",
        color: "bg-orange-500/10 text-orange-600",
    },
    {
        id: "2",
        title: "The Ikea Return Desk struggle",
        excerpt: "Returning a 'FLURG' without losing your mind. The vocabulary you actually need for customer service.",
        tag: "Survival",
        textbook: "I wish to return this item as it is defective.",
        real: "Hey, this thing's missing a screw. Can I just swap it out or get a refund?",
        color: "bg-blue-500/10 text-blue-600",
    },
    {
        id: "3",
        title: "Texas Small Talk survival guide",
        excerpt: "If someone says 'Howdy', do you have to say it back? A guide to Southern hospitality for non-natives.",
        tag: "Culture",
        textbook: "I am fine, thank you. How are you doing today?",
        real: "Doin' good! How 'bout you? Stayin' cool in this heat?",
        color: "bg-red-500/10 text-red-600",
    }
];

export default function BlogFeed() {
    return (
        <section className="w-full">
            <div className="flex flex-col gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Top Scenarios of the Week</h2>
                <p className="text-muted-foreground text-sm md:text-base">Real stories and phrases from real life situations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex flex-col bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    >
                        <div className="p-6 flex flex-col flex-1">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 ${post.color}`}>
                                {post.tag}
                            </span>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                                {post.excerpt}
                            </p>

                            <div className="space-y-4 mb-6 p-4 bg-secondary/30 rounded-2xl border border-border/30">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Textbook</span>
                                    <p className="text-sm italic opacity-70 line-clamp-2">{post.textbook}</p>
                                </div>
                                <div className="pt-2 border-t border-border/30">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Real Life</span>
                                    <p className="text-sm font-medium line-clamp-2">{post.real}</p>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all mt-auto group/btn">
                                Read Full Guide
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
