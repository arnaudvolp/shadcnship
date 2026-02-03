// ============================================================================
// Types for Pricing Component with Stripe Integration
// ============================================================================

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: "EUR" | "USD";
  features: PricingFeature[];
  highlighted?: boolean;
  badge?: string;
  cta: {
    text: string;
    href?: string;
  };
  // Stripe Price IDs (optional - for Stripe integration)
  stripePriceId?: {
    monthly: string;
    yearly: string;
  };
}

export interface Pricing04Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
  currency?: "EUR" | "USD";
  className?: string;
  // Stripe checkout handler - injected by Stripe integration
  onCheckout?: (priceId: string, mode: "payment" | "subscription") => Promise<void>;
}

export type BillingInterval = "monthly" | "yearly";
