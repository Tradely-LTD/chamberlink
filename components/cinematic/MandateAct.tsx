"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { mandate } from "@/lib/content/homeCopy";

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
    <section id="mandate" ref={rootRef} className="relative flex min-h-[90vh] items-center px-6 py-32 md:px-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <div data-mandate-reveal className="mb-14 flex max-w-2xl items-start gap-4">
          <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-[#34c28d]" strokeWidth={1.5} />
          <div>
            <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-[#34c28d]">
              {mandate.eyebrow}
            </span>
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-tight text-[#f2f6f0] md:text-5xl">
              {mandate.headline}
            </h2>
            <p className="mt-6 font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-[#f2f6f0]/65">
              {mandate.body}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {mandate.pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              data-mandate-reveal
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <span className="font-[family-name:var(--font-ibm-mono)] text-xs text-[#34c28d]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-xl text-[#f2f6f0]">
                {pillar.label}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-[#f2f6f0]/60">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
