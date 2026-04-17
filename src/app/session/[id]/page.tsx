import SessionPlayer from "@/components/roadmap/SessionPlayer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const day = parseInt(resolvedParams.id);
    
    return {
        title: `Day ${day} Session | JokEng`,
        description: `Join Day ${day} of your 90-day American Culture & Leadership roadmap. Practice real-world scenarios and master the subtext.`,
    };
}

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const day = parseInt(resolvedParams.id);

    return <SessionPlayer dayId={day} />;
}
