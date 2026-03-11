import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

function VideosContent() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground pb-20">
            <Header />
            <main className="flex-1 w-full pt-24 pb-20 px-4 max-w-2xl mx-auto flex flex-col items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase text-primary">
                        <span className="text-foreground">Video</span> Feed
                    </h1>
                    <p className="text-muted-foreground">
                        Short-form video training coming soon...
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function VideosPage() {
    return (
        <Suspense fallback={null}>
            <VideosContent />
        </Suspense>
    );
}
