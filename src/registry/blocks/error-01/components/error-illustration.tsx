"use client";

import { cn } from "@/lib/utils";
import type { ErrorIllustrationProps } from "../types/error";

export function ErrorIllustration({ variant, className }: ErrorIllustrationProps) {
  const baseClass = cn("w-full max-w-md mx-auto", className);

  switch (variant) {
    case "not-found":
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background shapes */}
            <circle cx="200" cy="150" r="120" className="fill-muted/50" />
            <circle cx="320" cy="80" r="30" className="fill-muted/30" />
            <circle cx="80" cy="220" r="20" className="fill-muted/30" />

            {/* 404 Text */}
            <text
              x="200"
              y="170"
              textAnchor="middle"
              className="fill-primary text-[120px] font-bold"
              style={{ fontFamily: "system-ui" }}
            >
              404
            </text>

            {/* Magnifying glass */}
            <g transform="translate(280, 180)">
              <circle cx="25" cy="25" r="20" className="stroke-muted-foreground" strokeWidth="4" fill="none" />
              <line x1="40" y1="40" x2="55" y2="55" className="stroke-muted-foreground" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Question marks */}
            <text x="100" y="100" className="fill-muted-foreground/50 text-2xl">?</text>
            <text x="300" y="120" className="fill-muted-foreground/50 text-xl">?</text>
            <text x="330" y="200" className="fill-muted-foreground/50 text-lg">?</text>
          </svg>
        </div>
      );

    case "server-error":
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <circle cx="200" cy="150" r="120" className="fill-muted/50" />

            {/* Server stack */}
            <g transform="translate(130, 80)">
              {/* Server 1 */}
              <rect x="0" y="0" width="140" height="40" rx="4" className="fill-muted stroke-border" strokeWidth="2" />
              <circle cx="20" cy="20" r="6" className="fill-destructive" />
              <rect x="35" y="15" width="40" height="4" rx="2" className="fill-muted-foreground/30" />
              <rect x="35" y="22" width="60" height="4" rx="2" className="fill-muted-foreground/30" />

              {/* Server 2 */}
              <rect x="0" y="50" width="140" height="40" rx="4" className="fill-muted stroke-border" strokeWidth="2" />
              <circle cx="20" cy="70" r="6" className="fill-destructive" />
              <rect x="35" y="65" width="40" height="4" rx="2" className="fill-muted-foreground/30" />
              <rect x="35" y="72" width="60" height="4" rx="2" className="fill-muted-foreground/30" />

              {/* Server 3 */}
              <rect x="0" y="100" width="140" height="40" rx="4" className="fill-muted stroke-border" strokeWidth="2" />
              <circle cx="20" cy="120" r="6" className="fill-yellow-500" />
              <rect x="35" y="115" width="40" height="4" rx="2" className="fill-muted-foreground/30" />
              <rect x="35" y="122" width="60" height="4" rx="2" className="fill-muted-foreground/30" />
            </g>

            {/* Warning icon */}
            <g transform="translate(280, 100)">
              <path
                d="M20 5L35 35H5L20 5Z"
                className="fill-destructive/20 stroke-destructive"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <line x1="20" y1="15" x2="20" y2="23" className="stroke-destructive" strokeWidth="2" strokeLinecap="round" />
              <circle cx="20" cy="28" r="1.5" className="fill-destructive" />
            </g>

            {/* Sparks */}
            <g className="stroke-yellow-500" strokeWidth="2" strokeLinecap="round">
              <line x1="310" y1="160" x2="320" y2="150" />
              <line x1="325" y1="165" x2="335" y2="160" />
              <line x1="315" y1="175" x2="325" y2="180" />
            </g>
          </svg>
        </div>
      );

    case "forbidden":
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <circle cx="200" cy="150" r="120" className="fill-muted/50" />

            {/* Lock */}
            <g transform="translate(150, 70)">
              {/* Lock body */}
              <rect x="20" y="80" width="60" height="50" rx="6" className="fill-muted-foreground/80" />

              {/* Lock shackle */}
              <path
                d="M30 80V60C30 40 70 40 70 60V80"
                className="stroke-muted-foreground/80"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />

              {/* Keyhole */}
              <circle cx="50" cy="100" r="8" className="fill-background" />
              <rect x="46" y="100" width="8" height="15" rx="2" className="fill-background" />
            </g>

            {/* Shield with X */}
            <g transform="translate(270, 160)">
              <path
                d="M25 5L45 15V35C45 50 25 60 25 60C25 60 5 50 5 35V15L25 5Z"
                className="fill-destructive/20 stroke-destructive"
                strokeWidth="2"
              />
              <line x1="15" y1="25" x2="35" y2="45" className="stroke-destructive" strokeWidth="3" strokeLinecap="round" />
              <line x1="35" y1="25" x2="15" y2="45" className="stroke-destructive" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* 403 subtle */}
            <text x="80" y="250" className="fill-muted-foreground/20 text-4xl font-bold" style={{ fontFamily: "system-ui" }}>403</text>
          </svg>
        </div>
      );

    case "maintenance":
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <circle cx="200" cy="150" r="120" className="fill-muted/50" />

            {/* Gears */}
            <g transform="translate(120, 80)">
              {/* Large gear */}
              <circle cx="60" cy="60" r="45" className="stroke-primary" strokeWidth="8" fill="none" />
              <circle cx="60" cy="60" r="15" className="fill-primary/20" />
              {/* Teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                  key={angle}
                  x="55"
                  y="10"
                  width="10"
                  height="15"
                  rx="2"
                  className="fill-primary"
                  transform={`rotate(${angle} 60 60)`}
                />
              ))}
            </g>

            <g transform="translate(210, 140)">
              {/* Small gear */}
              <circle cx="40" cy="40" r="30" className="stroke-muted-foreground" strokeWidth="6" fill="none" />
              <circle cx="40" cy="40" r="10" className="fill-muted-foreground/20" />
              {/* Teeth */}
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <rect
                  key={angle}
                  x="36"
                  y="5"
                  width="8"
                  height="12"
                  rx="2"
                  className="fill-muted-foreground"
                  transform={`rotate(${angle} 40 40)`}
                />
              ))}
            </g>

            {/* Wrench */}
            <g transform="translate(280, 60) rotate(45)">
              <rect x="0" y="15" width="60" height="10" rx="2" className="fill-muted-foreground/60" />
              <path d="M-5 10C-5 0 5 0 5 10V30C5 40 -5 40 -5 30V10Z" className="fill-muted-foreground/60" />
              <path d="M55 10L70 0V40L55 30V10Z" className="fill-muted-foreground/60" />
            </g>

            {/* Progress dots */}
            <g transform="translate(160, 240)">
              <circle cx="0" cy="0" r="4" className="fill-primary animate-pulse" />
              <circle cx="20" cy="0" r="4" className="fill-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
              <circle cx="40" cy="0" r="4" className="fill-primary/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
            </g>
          </svg>
        </div>
      );

    case "offline":
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <circle cx="200" cy="150" r="120" className="fill-muted/50" />

            {/* Cloud */}
            <g transform="translate(100, 80)">
              <path
                d="M50 120C25 120 10 100 10 80C10 55 35 40 60 45C70 25 95 20 115 35C145 30 170 55 160 85C180 90 185 115 165 125C165 125 50 125 50 120Z"
                className="fill-muted stroke-border"
                strokeWidth="2"
              />

              {/* X over cloud */}
              <g transform="translate(60, 50)">
                <circle cx="30" cy="30" r="25" className="fill-background stroke-destructive" strokeWidth="2" />
                <line x1="18" y1="18" x2="42" y2="42" className="stroke-destructive" strokeWidth="3" strokeLinecap="round" />
                <line x1="42" y1="18" x2="18" y2="42" className="stroke-destructive" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>

            {/* WiFi symbol with slash */}
            <g transform="translate(280, 150)">
              <path d="M0 20C10 10 30 10 40 20" className="stroke-muted-foreground" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M8 28C14 22 26 22 32 28" className="stroke-muted-foreground" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="20" cy="38" r="4" className="fill-muted-foreground" />

              {/* Slash */}
              <line x1="-5" y1="45" x2="45" y2="5" className="stroke-destructive" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Disconnected cable */}
            <g transform="translate(80, 200)">
              <path d="M0 10Q20 20 30 10" className="stroke-muted-foreground" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="35" cy="10" r="5" className="fill-muted-foreground" />

              <path d="M70 10Q50 0 60 10" className="stroke-muted-foreground" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="65" cy="10" r="5" className="fill-muted-foreground" />
            </g>
          </svg>
        </div>
      );

    default:
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="150" r="120" className="fill-muted/50" />
            <g transform="translate(160, 100)">
              <circle cx="40" cy="50" r="45" className="stroke-muted-foreground" strokeWidth="4" fill="none" />
              <circle cx="25" cy="40" r="5" className="fill-muted-foreground" />
              <circle cx="55" cy="40" r="5" className="fill-muted-foreground" />
              <path d="M25 70Q40 60 55 70" className="stroke-muted-foreground" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      );
  }
}
