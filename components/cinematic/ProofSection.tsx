"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { proof } from "@/lib/content/homeCopy";

export default function ProofSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-proof-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => gsap.set("[data-proof-reveal]", { clearProps: "transform,opacity" }),
        scrollTrigger: { trigger: rootRef.current, start: "top 70%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="proof" className="bg-[#e7f0e3] px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div data-proof-reveal className="rounded-3xl border border-[#d9e5d3] bg-[#f2f6f0] p-10 md:p-16">
          <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-[#12503f]">
            {proof.eyebrow}
          </span>
          <h2 className="max-w-3xl font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-tight text-[#0f2318] md:text-5xl">
            {proof.headline}
          </h2>
          <p className="mt-6 max-w-2xl font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-[#4c5c4e]">
            {proof.body}
          </p>

          <div className="mt-8 flex flex-col gap-6 border-t border-[#d9e5d3] pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl font-[family-name:var(--font-public-sans)] text-sm italic leading-relaxed text-[#4c5c4e]">
              {proof.partnerNote}
            </p>
            <a
              href={proof.cta.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#12503f] px-6 py-3 font-[family-name:var(--font-public-sans)] text-sm font-semibold text-[#f2f6f0] transition-transform hover:-translate-y-0.5"
            >
              {proof.cta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
