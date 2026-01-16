"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navigation: Array<{ name: string; href: string }>;
}

export function MobileNav({ open, onOpenChange, navigation }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] ">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => onOpenChange(false)}
              >
                <Image
                  src="/logo.svg"
                  alt="Shadcn UI Blocks"
                  width={32}
                  height={32}
                />

                <span className="font-semibold">Shadcn UI Blocks</span>
              </Link>
            </SheetTitle>
          </div>
        </SheetHeader>
        <SheetDescription className="px-4">
          <div className="flex flex-col gap-4 mt-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </SheetDescription>
        <div className="mt-8 pt-8 border-t">
          <Button
            asChild
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            <Link href="/get-started">Get Started →</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
