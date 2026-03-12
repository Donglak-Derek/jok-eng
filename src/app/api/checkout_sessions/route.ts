import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await getAdminAuth().verifyIdToken(token);
    } catch (e) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // We get userId securely from the token, ignore client's userId
    const userId = decodedToken.uid;
    const { email, priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email, // Optional: Prefills email for better UX
      metadata: {
        userId, // Critical: We use this in the webhook to know WHO paid
      },
      success_url: `${req.headers.get("origin")}/?success=true`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
