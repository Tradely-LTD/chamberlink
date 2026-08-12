"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { partners } from "@/lib/content/homeCopy";

/**
 * Text-wordmark placeholders (no fabricated logo images). Swap each chip for
 * a real <img src="/partners/xyz.svg"> once official logo files are supplied
 * — see the `partners.logos` scaffold note in lib/content/homeCopy.ts. The
 * "status" label is intentional: these are collaboration/discussion
 * relationships, not signed partnerships — never remove it without a signed
 * agreement to point to.
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
        onComplete: () => gsap.set("[data-partner-logo]", { clearProps: "transform,opacity" }),
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="border-y border-border bg-muted px-6 py-16 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-center font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {partners.eyebrow}
        </p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-fraunces)] text-2xl text-foreground md:text-3xl">
          {partners.headline}
        </h2>
        <div className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
          {partners.logos.map((logo) => (
            <div
              key={logo.name}
              data-partner-logo
              className="flex w-52 flex-col items-center justify-center rounded-xl border border-border bg-background px-6 py-5 text-center"
            >
              <span className="font-[family-name:var(--font-fraunces)] text-xl text-primary">{logo.abbr}</span>
              {logo.abbr !== logo.name && (
                <span className="mt-1 font-[family-name:var(--font-public-sans)] text-[11px] leading-tight text-muted-foreground">
                  {logo.name}
                </span>
              )}
              <span className="mt-2 font-[family-name:var(--font-ibm-mono)] text-[9px] uppercase tracking-widest text-gold">
                {logo.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
