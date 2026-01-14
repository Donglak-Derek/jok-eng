"use client";

import { useState } from "react";
import DirectorChat, { Message } from "./DirectorChat";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";

interface ScenarioDirectorProps {
    onBack: () => void;
    onBlueprintReady: (blueprint: { context: string; myRole: string; otherRole: string; plot: string }) => void;
}

export default function ScenarioDirector({ onBack, onBlueprintReady }: ScenarioDirectorProps) {
    const [messages, setMessages] = useState<Message[]>([
        { 
            role: 'assistant', 
            content: "Hi! I'm your Director. \n\nBriefly tell me what situation you want to practice? (e.g., 'Job interview', 'Ordering coffee', 'Argue with neighbor')", 
            id: 'init' 
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [smartChips, setSmartChips] = useState<string[]>(["Job Interview", "Ordering food", "Small talk", "Date"]);

    const handleSendMessage = async (text: string) => {
        // Add user message
        const userMsg: Message = { role: 'user', content: text, id: Date.now().toString() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setIsLoading(true);
        setSmartChips([]); // Clear chips while thinking

        try {
            const res = await fetch("/api/director/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!res.ok) throw new Error("Director is on break");

            const data = await res.json();
            
            // Add AI response
            const aiMsg: Message = { 
                role: 'assistant', 
                content: data.message, 
                id: (Date.now() + 1).toString() 
            };
            setMessages(prev => [...prev, aiMsg]);
            
            // Update chips
            setSmartChips(data.suggestions || []);

            // Check if finished
            if (data.blueprint) {
                // Determine if we should auto-proceed or show a "Generate" button.
                // The API might send a special "ready" signal.
                // For now, let's assume if blueprint is present, we show a "Action!" chip or similar.
                // Or better, the API says "Ready to roll?" and we provide "Action!" chip.
                // If the user clicks "Action!", the *next* turn triggers onBlueprintReady.
                
                // Correction: The backend should probably decide when to emit the blueprint.
                // If data.blueprint is present, it means the Director has finalized the details.
                // We can pass it up immediately or wait for user confirmation.
                // Let's pass it up if the message indicates completion.
                
                // Wait, if data.blueprint is returned, it means the previous turn confirmed it.
                onBlueprintReady(data.blueprint);
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "Cut! Something went wrong. Let's try that again.", 
                id: Date.now().toString() 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
            </div>
            
            <DirectorChat 
                messages={messages} 
                onSendMessage={handleSendMessage}
                isTyping={isLoading}
                smartChips={smartChips}
            />
        </div>
    );
}
