import type { WaitlistProvider } from "./types";

export const submitToProvider = async (
  email: string,
  provider?: WaitlistProvider,
  onSubmit?: (email: string) => Promise<void>,
): Promise<void> => {
  // If onSubmit is provided directly, use it (shorthand)
  if (onSubmit) {
    return onSubmit(email);
  }

  if (!provider) {
    console.warn("[Waitlist] No provider configured. Email:", email);
    return;
  }

  switch (provider.type) {
    case "webhook": {
      const response = await fetch(provider.url, {
        method: provider.method ?? "POST",
        headers: {
          "Content-Type": "application/json",
          ...provider.headers,
        },
        body: JSON.stringify({ email, timestamp: new Date().toISOString() }),
      });
      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status}`);
      }
      break;
    }

    case "supabase": {
      const table = provider.table ?? "waitlist";
      const response = await fetch(`${provider.url}/rest/v1/${table}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: provider.anonKey,
          Authorization: `Bearer ${provider.anonKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email, created_at: new Date().toISOString() }),
      });
      if (!response.ok) {
        const error = await response.text();
        console.error("Supabase error details:", error); // <-- ajoute ça
        // Handle duplicate email (Supabase returns 409 or 23505 error)
        if (response.status === 409 || error.includes("23505")) {
          throw new Error("This email is already on the waitlist");
        }
        throw new Error(`Supabase error: ${response.status}`);
      }
      break;
    }

    case "custom": {
      return provider.handler(email);
    }
  }
};

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
