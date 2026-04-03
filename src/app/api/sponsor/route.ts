import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { scenarioId, sentenceId, type, audioUrl, token } = body;

        // Validation
        if (!scenarioId || !sentenceId || !audioUrl || !token) {
            return new NextResponse("Invalid request", { status: 400 });
        }
        if (type !== "sentence" && type !== "decoderItem") {
            return new NextResponse("Invalid item type", { status: 400 });
        }

        // Must be authenticated
        await getAdminAuth().verifyIdToken(token);

        const db = getAdminDb();
        const scriptRef = db.doc(`users/jok-eng-official/scenarios/${scenarioId}`);
        
        // Execute Transaction to ensure we don't accidentally overwrite concurrent sponsorships
        await db.runTransaction(async (transaction: any) => {
            const docSnap = await transaction.get(scriptRef);
            if (!docSnap.exists) {
                throw new Error("Official script not found");
            }

            const data = docSnap.data()!;

            if (type === 'sentence') {
                const sentences = data.sentences || [];
                const idx = sentences.findIndex((s: any) => s.id === sentenceId);
                if (idx !== -1 && sentences[idx].audioUrl !== audioUrl) {
                    sentences[idx].audioUrl = audioUrl;
                    transaction.update(scriptRef, { sentences });
                }
            } else if (type === 'decoderItem') {
                const decoderItems = data.decoderItems || [];
                const idx = decoderItems.findIndex((s: any) => s.id === sentenceId);
                if (idx !== -1 && decoderItems[idx].audioUrl !== audioUrl) {
                    decoderItems[idx].audioUrl = audioUrl;
                    transaction.update(scriptRef, { decoderItems });
                }
            }
        });

        return NextResponse.json({ success: true });

    } catch (e: any) {
        console.error("Sponsor API error:", e);
        if (e.message === "Official script not found") {
             return new NextResponse("Official script not found", { status: 404 });
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
