## Installation

```bash
npx shadcn@latest add https://shadcnship.com/r/waitlist-01.json
```

## Usage

```tsx
import { Waitlist01 } from "@/components/waitlist-01/waitlist";

export default function Page() {
  return <Waitlist01 />;
}
```

## Providers

The component supports multiple providers for storing emails.

### Simple callback

```tsx
<Waitlist01
  onSubmit={async (email) => {
    // Your custom logic
    await saveEmail(email);
  }}
/>
```

### Webhook (Zapier, Make, n8n...)

```tsx
<Waitlist01
  provider={{
    type: "webhook",
    url: "https://hooks.zapier.com/hooks/catch/...",
    method: "POST", // optional, defaults to POST
    headers: { "X-Custom": "value" }, // optional
  }}
/>
```

### Supabase

First, create the table in Supabase:

```sql
create table waitlist (
  id bigint primary key generated always as identity,
  email text unique not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table waitlist enable row level security;

-- Allow anonymous inserts
create policy "Allow anonymous inserts" on waitlist
  for insert with check (true);
```

Then use the component:

```tsx
<Waitlist01
  provider={{
    type: "supabase",
    url: "https://xxx.supabase.co",
    anonKey: "eyJ...", // from Project Settings > API
    table: "waitlist", // optional, defaults to "waitlist"
  }}
/>
```

### Custom handler

```tsx
<Waitlist01
  provider={{
    type: "custom",
    handler: async (email) => {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
    },
  }}
/>
```

## Props

| Prop | Type | Default |
|------|------|---------|
| `badge` | `string` | "Available in early 2026" |
| `heading` | `string` | "Join the Waiting List" |
| `description` | `string` | "Be amongst the first to experience..." |
| `inputPlaceholder` | `string` | "Enter your email" |
| `buttonText` | `string` | "Join waitlist" |
| `successMessage` | `string` | "You're on the list!" |
| `errorMessage` | `string` | "Something went wrong." |
| `provider` | `WaitlistProvider` | - |
| `onSubmit` | `(email: string) => Promise<void>` | - |
| `socialProof` | `{ avatars: string[], text: string }` | 4 avatars |
| `countdown` | `{ targetDate: Date \| number, label?: string }` | 30 days |
| `className` | `string` | - |

## Customization

### Custom countdown

```tsx
<Waitlist01
  countdown={{
    targetDate: new Date("2026-06-01"),
    label: "Until launch",
  }}
/>
```

### Custom social proof

```tsx
<Waitlist01
  socialProof={{
    avatars: [
      "/avatar1.png",
      "/avatar2.png",
      "/avatar3.png",
    ],
    text: "Join 5,000+ early adopters",
  }}
/>
```

### Disable countdown

```tsx
<Waitlist01 countdown={undefined} />
```
