"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { partners } from "@/lib/content/homeCopy";

/**
 * Text-wordmark placeholders (no fabricated logo images). Swap each chip for
 * a real <img src="/partners/xyz.svg"> once official logo files are supplied
 * — see the `partners.logos` scaffold note in lib/content/homeCopy.ts.
 */
export default function PartnersSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-partner-logo]", {
        opacity: 0,
        y: 12,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="border-y border-[#d9e5d3] bg-[#e7f0e3] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-center font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-[#4c5c4e]">
          {partners.eyebrow}
        </p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-fraunces)] text-2xl text-[#0f2318] md:text-3xl">
          {partners.headline}
        </h2>
        <div className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
          {partners.logos.map((logo) => (
            <div
              key={logo.name}
              data-partner-logo
              className="flex w-48 flex-col items-center justify-center rounded-xl border border-[#d9e5d3] bg-[#f2f6f0] px-6 py-5 text-center"
            >
              <span className="font-[family-name:var(--font-fraunces)] text-xl text-[#12503f]">{logo.abbr}</span>
              {logo.abbr !== logo.name && (
                <span className="mt-1 font-[family-name:var(--font-public-sans)] text-[11px] leading-tight text-[#4c5c4e]">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
