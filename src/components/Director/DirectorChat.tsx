"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot } from "lucide-react";
import { Button } from "@/components/Button";

export type Message = {
    role: 'user' | 'assistant';
    content: string;
    id: string;
};

interface DirectorChatProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isTyping: boolean;
    smartChips?: string[];
}

export default function DirectorChat({ messages, onSendMessage, isTyping, smartChips = [] }: DirectorChatProps) {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        // Auto focus input on mount and after AI response
        if (!isTyping) {
            inputRef.current?.focus();
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSendMessage(input);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-secondary/10 rounded-2xl border border-border shadow-2xl overflow-hidden relative">
            {/* Header */}
            <div className="p-4 border-b border-border bg-background/50 backdrop-blur-md flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-foreground">The Director</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Online
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm ${
                                msg.role === 'user' 
                                    ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                                    : 'bg-card border border-border text-card-foreground rounded-tl-sm'
                            }`}>
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {isTyping && (
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="bg-card border border-border text-card-foreground p-4 rounded-2xl rounded-tl-sm flex items-center gap-2 h-14">
                            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Controls Area */}
            <div className="p-4 bg-background/50 backdrop-blur-md border-t border-border space-y-4">
                
                {/* Smart Chips */}
                <AnimatePresence>
                    {!isTyping && smartChips.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex flex-wrap gap-2 mb-2"
                        >
                            {smartChips.map((chip, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => onSendMessage(chip)}
                                    className="px-4 py-2 bg-secondary/50 hover:bg-primary/10 hover:text-primary hover:border-primary/50
                                               border border-border rounded-full text-sm font-medium transition-all duration-200
                                               active:scale-95"
                                >
                                    {chip}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Input Bar */}
                <div className="relative flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isTyping ? "Director is thinking..." : "Type your answer..."}
                        disabled={isTyping}
                        className="flex-1 bg-secondary/20 border border-border rounded-full px-6 py-4 text-foreground 
                                   placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="rounded-full w-14 h-14 p-0 shrink-0 flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <Send className="w-5 h-5 ml-0.5" />
                    </Button>
                </div>
            </div>
            
            {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        </div>
    );
}
