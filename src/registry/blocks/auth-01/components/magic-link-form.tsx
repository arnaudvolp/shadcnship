"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Mail, Loader2, CheckCircle, Sparkles } from "lucide-react";
import type { AuthFormProps } from "../types/auth";

// =============================================================================
// Validation Schema
// =============================================================================

const magicLinkSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type MagicLinkFormData = z.infer<typeof magicLinkSchema>;

// =============================================================================
// Magic Link Form Component
// =============================================================================

interface MagicLinkFormProps extends AuthFormProps {
  onSubmit?: (email: string) => Promise<void>;
}

export function MagicLinkForm({
  onSubmit,
  onSuccess,
  onError,
  className,
}: MagicLinkFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<MagicLinkFormData>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: MagicLinkFormData) => {
    setIsLoading(true);
    try {
      await onSubmit?.(data.email);
      setSubmittedEmail(data.email);
      setIsSuccess(true);
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send magic link";
      onError?.(message);
      form.setError("root", { message });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={cn("text-center space-y-4", className)}>
        <div className="flex justify-center">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="size-6 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent a magic link to{" "}
            <span className="font-medium text-foreground">{submittedEmail}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Click the link in the email to sign in. No password needed!
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setIsSuccess(false);
            form.reset();
          }}
        >
          Send another link
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-4", className)}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Sparkles className="size-4 text-primary" />
          <span>Sign in without a password</span>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Sending magic link...
            </>
          ) : (
            <>
              <Sparkles className="size-4 mr-2" />
              Send magic link
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
