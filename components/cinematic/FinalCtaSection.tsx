"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { finalCta } from "@/lib/content/homeCopy";

export default function FinalCtaSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-cta-reveal]", {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-[#0a1f16] px-6 py-32 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <span data-cta-reveal className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-[#34c28d]">
          {finalCta.eyebrow}
        </span>
        <h2 data-cta-reveal className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-tight text-[#f2f6f0] md:text-6xl">
          {finalCta.headline}
        </h2>
        <p data-cta-reveal className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-[#f2f6f0]/65">
          {finalCta.body}
        </p>
        <div data-cta-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={finalCta.ctaPrimary.href}
            className="group inline-flex items-center gap-2 rounded-full border border-transparent bg-[#34c28d] px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold leading-none text-[#0a1f16] transition-transform hover:-translate-y-0.5"
          >
            {finalCta.ctaPrimary.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={finalCta.ctaSecondary.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold leading-none text-[#f2f6f0] transition-colors hover:border-white/40"
          >
            {finalCta.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
