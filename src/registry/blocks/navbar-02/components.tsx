"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronRight, Play } from "lucide-react";
import type { NavItemDropdown, NavItemMega, NavSubItem } from "./types";

// ---- Desktop sub-item (mega panel) ----

export const MegaSubItem = ({ item }: { item: NavSubItem }) => (
  <a
    href={item.url}
    className="flex items-start gap-1 rounded-md p-3 transition-colors hover:bg-muted"
  >
    {item.icon && (
      <div className="mt-0.5 flex size-9 shrink-0 items-start justify-center text-muted-foreground">
        {item.icon}
      </div>
    )}
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-2">
        <p className="text-sm leading-snug font-semibold">{item.text}</p>
        {item.badge && (
          <Badge variant="outline" className="rounded-sm text-xs font-semibold">
            {item.badge}
          </Badge>
        )}
      </div>
      {item.description && (
        <p className="text-[13px] leading-snug text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  </a>
);

// ---- Desktop dropdown item ----

export const DropdownSubItem = ({ item }: { item: NavSubItem }) => (
  <a
    href={item.url}
    className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-muted"
  >
    {item.icon && (
      <div className="relative flex size-8 shrink-0 items-center justify-center border border-border text-muted-foreground">
        <div className="absolute -inset-x-1.5 top-1/2 h-px bg-border" />
        <div className="absolute -inset-y-1.5 left-1/2 w-px bg-border" />
        <span className="relative z-10">{item.icon}</span>
      </div>
    )}
    <div className="flex flex-col gap-0.5">
      <p className="text-sm leading-snug font-semibold">{item.text}</p>
      {item.description && (
        <p className="text-[13px] leading-snug text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  </a>
);

// ---- Desktop mega panel ----

export const MegaPanel = ({ item }: { item: NavItemMega }) => (
  <div className="flex w-full">
    <div className="flex flex-1 gap-2 pt-6">
      {item.groups.map((group) => (
        <div key={group.title} className="flex-1">
          <p className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((sub) => (
              <li key={sub.text}>
                <MegaSubItem item={sub} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {item.featured && (
      <div className="flex gap-4">
        <Separator orientation="vertical" className="ml-4" />
        <div className="flex aspect-square w-80 shrink-0 flex-col gap-4 rounded-lg bg-muted/80 p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              {item.featured.title}
            </p>
            {item.featured.allUrl && (
              <a
                href={item.featured.allUrl}
                className="flex items-center gap-1 text-xs font-semibold text-foreground hover:underline"
              >
                {item.featured.allText}
                <ChevronRight className="size-3" />
              </a>
            )}
          </div>

          {item.featured.testimonial && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-start">
                {item.featured.testimonial.logo && (
                  <div className="flex size-6 items-center justify-start">
                    {item.featured.testimonial.logo}
                  </div>
                )}
                <p className="text-sm font-semibold">
                  {item.featured.testimonial.name}
                </p>
              </div>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {item.featured.testimonial.text}
              </p>
            </div>
          )}

          {item.featured.image && (
            <div className="group relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={item.featured.image}
                alt=""
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm">
                  <Play className="size-4 fill-current" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

// ---- Mobile accordion group (mega + dropdown) ----

export const MobileMenuGroup = ({
  item,
}: {
  item: NavItemMega | NavItemDropdown;
}) => {
  const [open, setOpen] = useState(false);

  const flatItems =
    item.type === "mega" ? item.groups.flatMap((g) => g.items) : item.items;

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
        className="w-full justify-between px-0 text-base font-semibold hover:bg-transparent"
      >
        {item.title}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </Button>
      {open && (
        <div className="flex flex-col gap-1 pb-2 pl-2">
          {flatItems.map((sub) => (
            <a
              key={sub.text}
              href={sub.url}
              className="flex items-center gap-2 rounded-md py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {sub.icon && (
                <span className="flex size-7 items-center justify-center rounded border bg-muted text-muted-foreground">
                  {sub.icon}
                </span>
              )}
              {sub.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
