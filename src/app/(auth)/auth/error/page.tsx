/**
 * Auth Error Page
 *
 * This page displays authentication errors to users.
 * It handles various error types from OAuth, email confirmation, and other auth flows.
 */

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { LogoIcon } from "@/registry/blocks/social-icons/icons";

const errorMessages: Record<string, { title: string; description: string }> = {
  no_code: {
    title: "Missing Authorization Code",
    description: "The authentication request was missing required parameters.",
  },
  exchange_failed: {
    title: "Authentication Failed",
    description: "We couldn't complete your sign-in. Please try again.",
  },
  access_denied: {
    title: "Access Denied",
    description: "You denied access to your account or the request was cancelled.",
  },
  invalid_request: {
    title: "Invalid Request",
    description: "The authentication request was malformed or invalid.",
  },
  server_error: {
    title: "Server Error",
    description: "An unexpected error occurred. Please try again later.",
  },
  temporarily_unavailable: {
    title: "Service Unavailable",
    description: "The authentication service is temporarily unavailable.",
  },
  default: {
    title: "Authentication Error",
    description: "Something went wrong during authentication.",
  },
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error") ?? "default";
  const customMessage = searchParams.get("message");

  const errorInfo = errorMessages[errorCode] ?? errorMessages.default;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="size-8 text-destructive" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {errorInfo.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {customMessage ?? errorInfo.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {errorCode !== "default" && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">
                Error code: <code className="font-mono">{errorCode}</code>
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <a href="/">
              <ArrowLeft className="size-4 mr-2" />
              Back to Home
            </a>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <a href="/auth/login">
              <RefreshCw className="size-4 mr-2" />
              Try Again
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
