import MissionPlayer from "@/components/roadmap/MissionPlayer";

export default async function MissionPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    // Basic lookup, using day from id (mission-1 -> 1)
    const day = parseInt(resolvedParams.id.replace("mission-", ""));

    return <MissionPlayer dayId={day} />;
}
