"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { mandate } from "@/lib/content/homeCopy";

// Dramatic dark section #2 of 2 — a solid (not canvas-driven) navy moment that
// gives the NACCIMA mandate explanation institutional weight without the GPU
// cost of a second three.js scene.
export default function MandateAct() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-mandate-reveal]", {
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => gsap.set("[data-mandate-reveal]", { clearProps: "transform,opacity" }),
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mandate"
      ref={rootRef}
      className="relative overflow-hidden bg-primary-deep px-6 py-32 md:px-12"
    >
      {/* Faint radial glow for depth, matching the hero's dramatic register */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 right-0 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #C9932E 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div data-mandate-reveal className="mb-14 flex max-w-2xl items-start gap-4">
          <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-accent" strokeWidth={1.5} />
          <div>
            <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-accent">
              {mandate.eyebrow}
            </span>
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-tight text-white md:text-5xl">
              {mandate.headline}
            </h2>
            <p className="mt-6 font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-white/75">
              {mandate.body}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {mandate.pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              data-mandate-reveal
              className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm"
            >
              <span className="font-[family-name:var(--font-ibm-mono)] text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-xl text-white">{pillar.label}</h3>
              <p className="mt-2 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-white/70">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
