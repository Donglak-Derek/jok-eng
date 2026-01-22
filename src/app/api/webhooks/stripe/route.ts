import { stripe } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebase-admin";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
        throw new Error("Missing stripe signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.error(`Webhook Signature Error: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const userId = session.metadata?.userId;

    if (!userId) {
        console.error("Webhook Error: No userId in metadata");
        return NextResponse.json({ error: "No userId in metadata" }, { status: 400 });
    }

    console.log(`💰 Payment successful for user: ${userId}`);

    try {
        const adminDb = getAdminDb();
        await adminDb.collection("users").doc(userId).update({
            "subscription.tier": "pro",
            "subscription.credits.dailyLimit": 15,
            "subscription.credits.lastRefill": Date.now(), // Reset cycle on upgrade
            "subscription.status": "active",
            "subscription.stripeCustomerId": session.customer,
            "subscription.updatedAt": Date.now(),
        });
        console.log("✅ User upgraded to Pro in Firestore");
    } catch (dbError) {
        console.error("Error updating user in Firestore:", dbError);
        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
