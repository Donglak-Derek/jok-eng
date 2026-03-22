import MissionPlayer from "@/components/roadmap/MissionPlayer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const day = parseInt(resolvedParams.id.replace("mission-", ""));
    
    return {
        title: `Day ${day} Mission | Amly`,
        description: `Join Day ${day} of your 90-day American Culture & Leadership roadmap. Practice real-world scenarios and master the subtext.`,
    };
}

export default async function MissionPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const day = parseInt(resolvedParams.id.replace("mission-", ""));

    return <MissionPlayer dayId={day} />;
}
