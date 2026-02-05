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
import { Mail, Loader2, CheckCircle } from "lucide-react";
import type { AuthFormProps } from "../types/auth";

// =============================================================================
// Validation Schema
// =============================================================================

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// =============================================================================
// Forgot Password Form Component
// =============================================================================

interface ForgotPasswordFormProps extends AuthFormProps {
  onSubmit?: (email: string) => Promise<void>;
}

export function ForgotPasswordForm({
  onSubmit,
  onSuccess,
  onError,
  className,
}: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await onSubmit?.(data.email);
      setSubmittedEmail(data.email);
      setIsSuccess(true);
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send reset email";
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
          <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <CheckCircle className="size-6 text-emerald-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent a password reset link to{" "}
            <span className="font-medium text-foreground">{submittedEmail}</span>
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
              Sending...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
    </Form>
  );
}
