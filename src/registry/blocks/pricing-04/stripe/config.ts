// ============================================================================
// Stripe Configuration
// ============================================================================

/**
 * Stripe Price IDs Configuration
 *
 * Replace these with your actual Stripe Price IDs from the Stripe Dashboard.
 * You can find these in: Stripe Dashboard > Products > Select Product > Pricing
 *
 * @example
 * // Development
 * STARTER_MONTHLY: "price_1234567890abcdef"
 *
 * // Production
 * STARTER_MONTHLY: "price_live_1234567890"
 */
export const STRIPE_PRICE_IDS = {
  STARTER: {
    MONTHLY: process.env.STRIPE_PRICE_STARTER_MONTHLY || "price_starter_monthly",
    YEARLY: process.env.STRIPE_PRICE_STARTER_YEARLY || "price_starter_yearly",
  },
  PRO: {
    MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY || "price_pro_monthly",
    YEARLY: process.env.STRIPE_PRICE_PRO_YEARLY || "price_pro_yearly",
  },
  ENTERPRISE: {
    MONTHLY: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || "price_enterprise_monthly",
    YEARLY: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY || "price_enterprise_yearly",
  },
} as const;

/**
 * Stripe Checkout Success/Cancel URLs
 */
export const STRIPE_URLS = {
  SUCCESS_URL: process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
    : "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
  CANCEL_URL: process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`
    : "http://localhost:3000/pricing",
} as const;

/**
 * Stripe Webhook Events to handle
 */
export const STRIPE_WEBHOOK_EVENTS = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.payment_succeeded",
  "invoice.payment_failed",
] as const;

export type StripeWebhookEvent = (typeof STRIPE_WEBHOOK_EVENTS)[number];
