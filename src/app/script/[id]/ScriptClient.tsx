"use client";

import { useEffect, useState } from "react";
import type { Script } from "@/types";
import StoryFlow from "@/components/StoryFlow";
import StandardScriptFlow from "@/components/StandardScriptFlow";
import SignalDecoder from "@/components/SignalDecoder";
import { collectionGroup, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Props = { 
  script?: Script; // Optional now
  scriptId?: string; // ID to fetch if script is missing
};

// Main Component
export default function ScriptClient({ script: initialScript, scriptId }: Props) {
    return <ScriptClientInner initialScript={initialScript} scriptId={scriptId} />;
}

// Inner component to safely use hooks
function ScriptClientInner({ initialScript, scriptId }: { initialScript?: Script, scriptId?: string }) {
    const { user, loading: authLoading } = useAuth();
    const [script, setScript] = useState<Script | undefined>(initialScript);
    const [loading, setLoading] = useState(!initialScript);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialScript || !scriptId) {
            setLoading(false);
            return;
        }
        if (authLoading) return; // Wait for auth to settle

        const fetchScript = async () => {
            try {
                let foundScript: Script | null = null;

                // 1. If User Logged In -> Check THEIR private collection directly
                if (user) {
                   try {
                       const docRef = doc(db, "users", user.uid, "scenarios", scriptId);
                       const docSnap = await getDoc(docRef);
                       if (docSnap.exists()) {
                           foundScript = docSnap.data() as Script;
                       }
                   } catch (e) { console.log("Own fetch failed", e); }
                }

                // 2. If not found yet -> Check PUBLIC via Collection Group
                if (!foundScript) {
                    const q = query(
                        collectionGroup(db, "scenarios"), 
                        where("id", "==", scriptId),
                        where("isPublic", "==", true) // Filter required by Rules
                    );
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        foundScript = querySnapshot.docs[0].data() as Script;
                    }
                }

                if (foundScript) {
                    setScript(foundScript);
                } else {
                    setError("Scenario not found.");
                }
            } catch (err) {
                console.error("Error fetching scenario:", err);
                setError("Failed to load scenario.");
            } finally {
                setLoading(false);
            }
        };

        fetchScript();
    }, [initialScript, scriptId, user, authLoading]);

    if (loading || authLoading) {
         return (
          <div className="h-screen flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
      );
    }
    
    if (error || !script) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
                <h1 className="text-2xl font-bold">Scenario Not Found</h1>
                <p className="text-muted-foreground">{error || "This scenario does not exist or has been deleted."}</p>
            </div>
        );
    }
  
    if (script.type === "story_flow") return <StoryFlow script={script} />;
    if (script.type === "decoder") return <SignalDecoder script={script} />;
    return <StandardScriptFlow script={script} />;
}
