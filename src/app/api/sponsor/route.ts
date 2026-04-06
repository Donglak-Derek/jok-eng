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
        if (type !== "sentence" && type !== "decoderItem" && type !== "segments") {
            return new NextResponse("Invalid item type", { status: 400 });
        }

        // Must be authenticated
        const decodedToken = await getAdminAuth().verifyIdToken(token);
        const uid = decodedToken.uid;

        const db = getAdminDb();
        
        // 🔒 ADMIN CHECK: Only admins can sponsor official content
        const userDoc = await db.doc(`users/${uid}`).get();
        const userData = userDoc.data();
        const isAdmin = userData?.subscription?.tier === 'admin';

        if (!isAdmin) {
            console.error(`Sponsorship denied: User ${uid} is not an admin.`);
            return new NextResponse("Unauthorized: Admin privileges required", { status: 403 });
        }

        let scriptRef = db.doc(`users/jok-eng-official/scenarios/${scenarioId}`);
        
        // Execute Transaction
        await db.runTransaction(async (transaction: any) => {
            let docSnap = await transaction.get(scriptRef);
            
            // 🔎 FALLBACK: If direct path fails, search globally for the official version
            if (!docSnap.exists) {
                console.log(`Direct path failed for ${scenarioId}, searching via query...`);
                const q = await db.collectionGroup("scenarios")
                    .where("id", "==", scenarioId)
                    .where("userId", "==", "jok-eng-official")
                    .limit(1)
                    .get();
                
                if (q.empty) {
                    throw new Error("Official script not found");
                }
                scriptRef = q.docs[0].ref;
                docSnap = q.docs[0];
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
            } else if (type === 'segments') {
                const segments = data.segments || [];
                // Segments usually use seg_0, seg_1... or the step number
                const idx = segments.findIndex((s: any, i: number) => 
                    s.id === sentenceId || `seg_${i}` === sentenceId || s.step === sentenceId
                );
                if (idx !== -1 && segments[idx].audioUrl !== audioUrl) {
                    segments[idx].audioUrl = audioUrl;
                    transaction.update(scriptRef, { segments });
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
