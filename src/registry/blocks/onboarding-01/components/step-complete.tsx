"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface StepCompleteProps {
  workspaceName: string;
  showConfetti?: boolean;
  onFinish: () => void;
  className?: string;
}

export function StepComplete({
  workspaceName,
  showConfetti = true,
  onFinish,
  className,
}: StepCompleteProps) {
  useEffect(() => {
    if (showConfetti) {
      // Fire confetti
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ["#3b82f6", "#22c55e", "#f97316"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ["#3b82f6", "#22c55e", "#f97316"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [showConfetti]);

  return (
    <div className={cn("flex flex-col items-center text-center space-y-6", className)}>
      {/* Success icon */}
      <div className="size-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <CheckCircle className="size-10 text-green-600 dark:text-green-400" />
      </div>

      {/* Content */}
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold tracking-tight">
          You're all set!
        </h2>
        <p className="text-muted-foreground">
          Your workspace <span className="font-medium text-foreground">"{workspaceName}"</span> is ready.
          Start exploring and invite your team to collaborate.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 w-full max-w-sm">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm">👥</span>
            </div>
            <span className="text-sm font-medium">Invite your team</span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm">📚</span>
            </div>
            <span className="text-sm font-medium">Explore documentation</span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm">🎯</span>
            </div>
            <span className="text-sm font-medium">Create your first project</span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
        </div>
      </div>

      {/* Action */}
      <Button size="lg" onClick={onFinish} className="w-full max-w-sm">
        Go to dashboard
      </Button>
    </div>
  );
}
