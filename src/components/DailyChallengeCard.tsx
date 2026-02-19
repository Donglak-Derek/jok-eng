"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

const QUIZ_DATA = {
    question: "In the 'Ordering Coffee' video, what is a more natural way to ask for a large size?",
    options: [
        "I would like a large coffee, please.",
        "Can I get a venti?",
        "Give me the biggest one you have.",
        "One large coffee for me."
    ],
    correctIndex: 1,
    explanation: "In many US coffee shops, especially chains like Starbucks, 'Venti' is the standard for large. Even in local shops, 'Can I get a...' is more natural than 'I would like...'"
};

export default function DailyChallengeCard() {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionSelect = (index: number) => {
        if (isSubmitted) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;
        setIsSubmitted(true);
    };

    return (
        <div className="w-full rounded-[2rem] bg-card border border-border/50 shadow-xl overflow-hidden relative group">
            {/* Glow Effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="p-6 md:p-10 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">Daily Quiz</span>
                        <h3 className="text-xl md:text-2xl font-bold">{QUIZ_DATA.question}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {QUIZ_DATA.options.map((option, index) => {
                        const isCorrect = index === QUIZ_DATA.correctIndex;
                        const isSelected = selectedOption === index;

                        let stateStyles = "border-border/50 hover:border-primary/50 hover:bg-primary/5";
                        if (isSubmitted) {
                            if (isCorrect) stateStyles = "border-green-500 bg-green-500/10 text-green-700";
                            else if (isSelected) stateStyles = "border-red-500 bg-red-500/10 text-red-700";
                            else stateStyles = "border-border/20 opacity-50";
                        } else if (isSelected) {
                            stateStyles = "border-primary bg-primary/5 ring-2 ring-primary/20";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                disabled={isSubmitted}
                                className={`
                                    p-5 rounded-2xl border text-left font-medium transition-all duration-200 flex items-center justify-between
                                    ${stateStyles}
                                `}
                            >
                                <span>{option}</span>
                                {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 ml-2" />}
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-border/50">
                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-muted-foreground italic flex-1"
                            >
                                <span className="font-bold text-foreground block mb-1">Why?</span>
                                {QUIZ_DATA.explanation}
                            </motion.div>
                        ) : (
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Select an answer and earn 50 XP
                            </div>
                        )}
                    </AnimatePresence>

                    {!isSubmitted ? (
                        <button
                            onClick={handleSubmit}
                            disabled={selectedOption === null}
                            className={`
                                w-full md:w-auto px-8 py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2
                                ${selectedOption !== null ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-secondary text-muted-foreground cursor-not-allowed"}
                            `}
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full md:w-auto px-8 py-3 rounded-full bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                        >
                            Next Quiz
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
