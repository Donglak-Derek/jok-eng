"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPrompt() {
    const [isInstallable, setIsInstallable] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(true); // Default true to prevent flash
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // 1. Check if already installed (standalone mode)
        const isStandaloneMatch = window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        setIsStandalone(isStandaloneMatch);

        if (isStandaloneMatch) return; // Don't show if already installed

        // 2. Detect iOS Safari (Apple requires manual "Add to Home Screen")
        const ua = window.navigator.userAgent;
        const webkit = !!ua.match(/WebKit/i);
        const ios = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        const safari = ios && webkit && !ua.match(/CriOS/i);

        if (safari) {
            setIsIOS(true);
            setIsInstallable(true);
            // Show prompt after a short delay so it's not jarring
            setTimeout(() => setShowPrompt(true), 3000);
        }

        // 3. Detect Android/Chrome (Native prompt support)
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault(); // Prevent standard mini-infobar
            setDeferredPrompt(e);
            setIsInstallable(true);
            setTimeout(() => setShowPrompt(true), 3000);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) {
            alert(`To install the Jok-Eng App:\n\n1. Tap the Share icon at the bottom of Safari (Square with up arrow)\n2. Scroll down and tap "Add to Home Screen"`);
            return;
        }

        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setShowPrompt(false);
            }
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
    };

    if (isStandalone || !isInstallable) return null;

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="fixed bottom-6 left-4 right-4 z-50 max-w-sm mx-auto bg-neutral-900 border border-neutral-700 shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shrink-0">
                            <img src="/icons/icon-192x192.png" alt="App Icon" className="w-8 h-8 rounded-lg" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-white leading-none mb-1">Install Jok-Eng</h4>
                            <p className="text-xs text-neutral-400 line-clamp-1">Get the native app experience!</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={handleInstallClick}
                            className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors active:scale-95"
                        >
                            {isIOS ? "How to Install" : "Install"}
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="p-2 text-neutral-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
