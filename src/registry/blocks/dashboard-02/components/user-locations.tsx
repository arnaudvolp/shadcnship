"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

const regions = ["World", "Europe", "Asia", "Oceania", "USA"] as const;
type Region = (typeof regions)[number];

export function UserLocationsCard() {
  const [activeRegion, setActiveRegion] = useState<Region>("World");

  return (
    <Card className="p-4 shadow-none ">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="font-semibold text-sm">User Locations</h3>
          <p className="text-xs text-muted-foreground">
            User locations around the world
          </p>
        </div>
        <div className="flex gap-1">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                activeRegion === region
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Dot Map */}
      <div className="relative w-full border rounded-md overflow-hidden ">
        <WorldMap
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </div>
    </Card>
  );
}
