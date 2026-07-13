"use client";

import { useRef } from "react";
import TradeNetworkCanvas from "@/components/canvas/TradeNetworkCanvas";
import CinematicHero from "@/components/cinematic/CinematicHero";
import ProblemAct from "@/components/cinematic/ProblemAct";
import MandateAct from "@/components/cinematic/MandateAct";
import ModuleAct from "@/components/cinematic/ModuleAct";
import { modules } from "@/lib/content/homeCopy";
import type { ColorwayName } from "@/lib/theme";

// One colorway per act (hero, problem, mandate, then each of the 5 modules) —
// the canvas lerps between these as the visitor scrolls through the journey.
const colorStops: ColorwayName[] = ["emerald", "emerald", "emerald", ...modules.map((m) => m.colorway)];

export default function DarkJourney() {
  const journeyRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={journeyRef} className="relative bg-[#0a1f16]">
      <TradeNetworkCanvas journeyRef={journeyRef} colorStops={colorStops} />
      <div className="relative z-10">
        <CinematicHero />
        <ProblemAct />
        <MandateAct />
        {modules.map((mod, i) => (
          <ModuleAct key={mod.index} module={mod} position={i} />
        ))}
      </div>
    </div>
  );
}
