"use client";

import { useEffect, useState } from "react";
import { collectionGroup, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserScript } from "@/types";
import ScenarioCard from "./ScenarioCard";
import { motion } from "framer-motion";

export default function CommunityScenariosSection() {
  const [scenarios, setScenarios] = useState<UserScript[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityScenarios = async () => {
      try {
        // Query across all 'scenarios' subcollections where isPublic is true
        // Note: This requires a composite index on Firestore: isPublic ASC, createdAt DESC
        // If not created, console will show a link to create it.
        const q = query(
            collectionGroup(db, "scenarios"),
            where("isPublic", "==", true),
            // We want latest first. 
            // orderBy("createdAt", "desc"), // Keeping it simple to avoid index requirement for now if possible? 
            // actually, 'where' + 'orderBy' different fields usually requires index.
            // Let's try just getting them and sorting client side if list is small, 
            // OR risking the index error (which provides a helpful link).
            // User asked to "create the section", so I'll try to do it right.
             orderBy("createdAt", "desc"),
             limit(10)
        );

        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as UserScript[];

        setScenarios(docs);
      } catch (err: any) {
        console.error("Error fetching community scenarios:", err);
        // Check for permission error specifically
        if (err?.code === 'permission-denied') {
             console.warn("Permission denied. Check Firestore Security Rules.");
        }
        
        // Fallback: simple query if index is missing (often just one field works without index)
        try {
            const fallbackQ = query(
                collectionGroup(db, "scenarios"),
                where("isPublic", "==", true),
                limit(10)
            );
            const fallbackSnap = await getDocs(fallbackQ);
            const fallbackDocs = fallbackSnap.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })) as UserScript[];
            // Sort client side
            fallbackDocs.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0));
            setScenarios(fallbackDocs);
        } catch (e2) {
            console.error("Fallback failed too", e2);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityScenarios();
  }, []);

  if (loading) return null; // Or a skeleton
  if (scenarios.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 border-t border-white/5">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <h2 className="headline text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-green-300 to-emerald-500 text-transparent bg-clip-text">
            Community Scenarios
        </h2>
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            New
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {scenarios.map((script, index) => (
            <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                {/* Minimal Card Render */}
                <ScenarioCard script={script} index={index} />
            </motion.div>
        ))}
      </div>
    </section>
  );
}
