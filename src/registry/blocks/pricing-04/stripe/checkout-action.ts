"use server";

// ============================================================================
// Stripe Checkout Server Actions
//
// Prerequisites:
// 1. Install Stripe: pnpm add stripe
// 2. Set environment variables (see README.md)
// 3. Create products and prices in Stripe Dashboard
// ============================================================================

import { STRIPE_URLS } from "./config";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Uncomment and use with real Stripe SDK:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// import Stripe from "stripe";
//
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-11-20.acacia",
// });

interface CreateCheckoutSessionResult {
  url: string | null;
  error?: string;
}

/**
 * Creates a Stripe Checkout session for subscription or one-time payment
 *
 * @example
 * // In your client component:
 * import { createCheckoutSession } from "@/components/pricing-04/stripe/checkout-action"
 *
 * const handleCheckout = async (priceId: string) => {
 *   const { url, error } = await createCheckoutSession(priceId, "subscription")
 *   if (url) {
 *     window.location.href = url
 *   }
 * }
 */
export async function createCheckoutSession(
  priceId: string,
  mode: "payment" | "subscription",
  customerId?: string
): Promise<CreateCheckoutSessionResult> {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Real Stripe Implementation (uncomment when ready):
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // try {
  //   const session = await stripe.checkout.sessions.create({
  //     mode,
  //     payment_method_types: ["card"],
  //     line_items: [
  //       {
  //         price: priceId,
  //         quantity: 1,
  //       },
  //     ],
  //     success_url: STRIPE_URLS.SUCCESS_URL,
  //     cancel_url: STRIPE_URLS.CANCEL_URL,
  //     ...(customerId && { customer: customerId }),
  //     // For subscriptions, allow promotion codes
  //     ...(mode === "subscription" && { allow_promotion_codes: true }),
  //   });
  //
  //   return { url: session.url };
  // } catch (error) {
  //   console.error("Stripe checkout error:", error);
  //   return {
  //     url: null,
  //     error: error instanceof Error ? error.message : "Failed to create checkout session",
  //   };
  // }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Demo mode (remove this and uncomment above when ready):
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log(`[Demo] Creating ${mode} checkout session for price: ${priceId}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In demo mode, return a fake success URL
  return {
    url: `${STRIPE_URLS.SUCCESS_URL.replace("{CHECKOUT_SESSION_ID}", "demo_session_123")}`,
  };
}

/**
 * Creates a Stripe Customer Portal session for managing subscriptions
 *
 * @example
 * // In your client component:
 * import { createPortalSession } from "@/components/pricing-04/stripe/checkout-action"
 *
 * const handleManageSubscription = async () => {
 *   const { url, error } = await createPortalSession(customerId)
 *   if (url) {
 *     window.location.href = url
 *   }
 * }
 */
export async function createPortalSession(
  customerId: string
): Promise<CreateCheckoutSessionResult> {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Real Stripe Implementation (uncomment when ready):
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // try {
  //   const session = await stripe.billingPortal.sessions.create({
  //     customer: customerId,
  //     return_url: STRIPE_URLS.CANCEL_URL,
  //   });
  //
  //   return { url: session.url };
  // } catch (error) {
  //   console.error("Stripe portal error:", error);
  //   return {
  //     url: null,
  //     error: error instanceof Error ? error.message : "Failed to create portal session",
  //   };
  // }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Demo mode:
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log(`[Demo] Creating portal session for customer: ${customerId}`);
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    url: "https://billing.stripe.com/demo-portal",
  };
}
