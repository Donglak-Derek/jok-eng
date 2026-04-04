"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DebugDashboard from "@/components/admin/DebugDashboard";

const ADMIN_UIDS = ["Hx4sxBjGaLST6c3MRWtrKn60c702", "pbz1yjIxjRhnAA9N5Fyi4YyNy9R2"];

export default function AdminMissionsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || !ADMIN_UIDS.includes(user.uid))) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="min-h-screen p-8 animate-pulse text-muted-foreground">Verifying secure access...</div>;
    }

    if (!ADMIN_UIDS.includes(user.uid)) {
        return null;
    }

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-background text-foreground">
            <DebugDashboard />
        </div>
    );
}
