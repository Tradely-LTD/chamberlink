"use client";

import { useRef } from "react";
import TradeNetworkCanvas from "@/components/canvas/TradeNetworkCanvas";
import CinematicHero from "@/components/cinematic/CinematicHero";
import type { ColorwayName } from "@/lib/theme";

// Dramatic dark section #1 of 2 on the page — the hero only. A short, subtle
// two-stop lerp gives the camera dolly some color movement without the
// rainbow-across-the-whole-page effect the old five-colorway journey had.
const colorStops: ColorwayName[] = ["mandate", "corridor"];

export default function DarkJourney() {
  const journeyRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={journeyRef} className="relative bg-primary-deep">
      <TradeNetworkCanvas journeyRef={journeyRef} colorStops={colorStops} />
      <div className="relative z-10">
        <CinematicHero />
      </div>
    </div>
  );
}
