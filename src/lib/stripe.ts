import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: '2024-06-20',
  // Actually, the error suggested "2025-12-15.clover" isn't a standard public version usually? 
  // Let's try to match what the error said: "2025-12-15.clover" seems odd, maybe it's a beta? 
  // Standard latest is usually YYYY-MM-DD. 
  // The error said: Type '"2024-12-18.acacia"' is not assignable to type '"2025-12-15.clover"'. 
  // Wait, "2025-12-15.clover" sounds like an internal Google/Stripe version? 
  // I will just remove the apiVersion property to let it use the default from the package.
  typescript: true,
});
