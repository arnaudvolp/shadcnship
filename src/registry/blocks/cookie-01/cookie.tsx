"use client";

import { useState } from "react";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Cookie01Props {
  description?: string;
  learnMore?: {
    text?: string;
    url?: string;
  };
  acceptButton?: {
    text?: string;
  };
  className?: string;
}

const Cookie01 = ({
  description = "We use third-party cookies to personalize content, ads, and analyze site traffic.",
  learnMore = {
    text: "Learn more",
    url: "#",
  },
  acceptButton = {
    text: "Okay",
  },
  className,
}: Cookie01Props) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 z-50 w-full p-4 sm:right-4 sm:w-80",
        className,
      )}
    >
      <Card className="rounded-none shadow-none sm:rounded-xl">
        <CardContent className="flex flex-col items-center gap-5 p-6 text-center">
          <Cookie className="size-10 text-primary" strokeWidth={1.5} />
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">{description}</p>
            {learnMore && (
              <a
                href={learnMore.url}
                className="text-sm font-medium underline underline-offset-4 transition-colors hover:text-muted-foreground"
              >
                {learnMore.text}
              </a>
            )}
          </div>
          <Button className="w-full" onClick={() => setVisible(false)}>
            {acceptButton.text}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cookie01;
