# Stripe Integration Guide

This guide explains how to set up Stripe payments for the pricing-04 component.

## Prerequisites

1. A [Stripe account](https://stripe.com)
2. Products and Prices created in Stripe Dashboard

## Installation

```bash
pnpm add stripe @stripe/stripe-js
```

## Environment Variables

Add these to your `.env.local`:

```env
# Stripe API Keys (from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Webhook Secret (from Stripe Dashboard > Webhooks)
STRIPE_WEBHOOK_SECRET=whsec_...

# Your site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Price IDs (from Stripe Dashboard > Products)
STRIPE_PRICE_STARTER_MONTHLY=price_...
STRIPE_PRICE_STARTER_YEARLY=price_...
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_PRO_YEARLY=price_...
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_...
STRIPE_PRICE_ENTERPRISE_YEARLY=price_...
```

## Setting Up Stripe Dashboard

### 1. Create Products

Go to **Stripe Dashboard > Products** and create your products:

- **Starter** - Free tier (optional)
- **Pro** - $29/month or $290/year
- **Enterprise** - $99/month or $990/year

### 2. Create Prices

For each product, create both monthly and yearly prices:

1. Click on the product
2. Click "Add another price"
3. Set the price and billing interval
4. Copy the Price ID (starts with `price_`)

### 3. Configure Webhooks

1. Go to **Stripe Dashboard > Webhooks**
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret

## Usage

### Basic Usage (with Server Action)

```tsx
// app/pricing/page.tsx
"use client";

import { Pricing04 } from "@/components/pricing-04/pricing";
import { createCheckoutSession } from "@/components/pricing-04/stripe/checkout-action";

export default function PricingPage() {
  const handleCheckout = async (priceId: string, mode: "payment" | "subscription") => {
    const { url, error } = await createCheckoutSession(priceId, mode);

    if (error) {
      console.error(error);
      return;
    }

    if (url) {
      window.location.href = url;
    }
  };

  return <Pricing04 onCheckout={handleCheckout} />;
}
```

### Webhook Route Handler

```tsx
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  handleStripeWebhook,
  constructWebhookEvent,
} from "@/components/pricing-04/stripe/webhook-handler";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  try {
    const event = await constructWebhookEvent(body, signature);
    const result = await handleStripeWebhook(event);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
```

### Success Page

```tsx
// app/checkout/success/page.tsx
import { Suspense } from "react";

function SuccessContent() {
  // You can use searchParams to get session_id
  // and fetch session details from Stripe
  return (
    <div className="container mx-auto py-24 text-center">
      <h1 className="text-4xl font-bold">Thank you!</h1>
      <p className="mt-4 text-muted-foreground">
        Your subscription has been activated.
      </p>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
```

## Database Schema (Optional)

If you want to store subscription data, here's an example schema:

### Drizzle ORM

```typescript
// db/schema.ts
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  subscriptionId: varchar("subscription_id", { length: 255 }),
  subscriptionStatus: varchar("subscription_status", { length: 50 }),
  planId: varchar("plan_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

### SQL

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255),
  subscription_id VARCHAR(255),
  subscription_status VARCHAR(50),
  plan_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
```

## Testing

### Test Mode

Use Stripe test mode for development:

- Test card: `4242 4242 4242 4242`
- Any future expiry date
- Any CVC

### Webhook Testing with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Security Considerations

1. **Always verify webhook signatures** in production
2. **Never expose your secret key** on the client side
3. **Use environment variables** for all sensitive data
4. **Implement proper error handling** for payment failures
5. **Consider implementing idempotency** for webhook handlers
