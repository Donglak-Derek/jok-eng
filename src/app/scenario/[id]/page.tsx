import { scripts } from "@/data";

// ... existing imports

export default function ScenarioPage({ params }: Props) {
  // ... existing code

    async function fetchScenario() {
        try {
            let foundScript: UserScript | null = null;

            // 0. Check Static Scripts first (Fastest)
            const staticScript = scripts.find((s) => s.id === id);
            if (staticScript) {
                // Adapt static script to UserScript type (add dummy userId/likes if needed)
                foundScript = { 
                    ...staticScript, 
                    userId: "system", 
                    isPublic: true, 
                    likes: 0, 
                    createdAt: Date.now() 
                } as unknown as UserScript;
            }

            // 1. If logged in, try finding in own collection (User Custom)
            if (!foundScript && user) {
                const docRef = doc(db, "users", user.uid, "scenarios", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    foundScript = { id: docSnap.id, ...docSnap.data() } as UserScript;
                }
            }

            // 2. If not found yet (or guest), try searching globally (Community/Public)
            if (!foundScript) {
                // Search all 'scenarios' collections for this ID
                // Note: Firestore Rules will ensure we only get it if it's Public (or ours)
                // We MUST filter by isPublic to satisfy the security rule condition for list queries
                const q = query(
                    collectionGroup(db, "scenarios"), 
                    where("id", "==", id),
                    where("isPublic", "==", true)
                );
                const querySnapshot = await getDocs(q);
                
                if (!querySnapshot.empty) {
                    const docSnap = querySnapshot.docs[0];
                    foundScript = { id: docSnap.id, ...docSnap.data() } as UserScript;
                }
            }

            if (foundScript) {
                setScript(foundScript);
            } else {
                setError("Scenario not found or you don't have permission.");
            }
        } catch (err) {
            console.error("Error fetching scenario:", err);
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

  // Removed the "Please Log In" block here to allow guests to view public scenarios

  if (error || !script) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-4">
              <h1 className="text-2xl font-bold">⚠️ Oops!</h1>
              <p className="text-muted">{error || "Something went wrong."}</p>
              <Button onClick={() => router.push("/")} variant="secondary">Go Home</Button>
          </div>
      );
  }

  return (
    <div className="min-h-dvh bg-background">
      <ScriptClient script={script} />
    </div>
  );
}
