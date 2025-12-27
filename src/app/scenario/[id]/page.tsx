"use client";

import { useEffect, useState, use } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ScriptClient from "@/app/script/[id]/ScriptClient";
import { UserScript } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

type Props = { params: Promise<{ id: string }> };

export default function ScenarioPage({ params }: Props) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [script, setScript] = useState<UserScript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
        setLoading(false);
        return;
    }

    async function fetchScenario() {
        try {
            const docRef = doc(db, "users", user!.uid, "scenarios", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setScript({ id: docSnap.id, ...docSnap.data() } as UserScript);
            } else {
                setError("Scenario not found.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load scenario.");
        } finally {
            setLoading(false);
        }
    }

    fetchScenario();
  }, [user, authLoading, id]);

  if (authLoading || loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      );
  }

  if (!user) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-4">
              <h1 className="text-2xl font-bold">Please Log In</h1>
              <p>You need to be logged in to view your saved scenarios.</p>
              <Button onClick={() => router.push("/login")} variant="primary">Log In</Button>
          </div>
      );
  }

  if (error || !script) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-4">
              <h1 className="text-2xl font-bold">⚠️ Oops!</h1>
              <p className="text-muted">{error || "Something went wrong."}</p>
              <Button onClick={() => router.push("/")} variant="secondary">Go Home</Button>
          </div>
      );
  }

  return <ScriptClient script={script} />;
}
