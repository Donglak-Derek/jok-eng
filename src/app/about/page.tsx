"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />

            <main className="flex-1 flex flex-col pt-32 pb-20 px-6 max-w-3xl mx-auto w-full">
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-8 uppercase">About JokEng</h1>
                
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                    <p>
                        JokEng is designed for professionals and immigrants who already know English, but need to master the nuance, tone, and cultural subtext of American communication.
                    </p>
                    <p>
                        Our mission is to help you "Live Better in America" by giving you the reps and tactical awareness to handle high-stakes scenarios—whether it's salary negotiations, dating, or casual office banter.
                    </p>
                    <p>
                        We use interactive, hyper-realistic scenarios so you can stop translating and start connecting.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
