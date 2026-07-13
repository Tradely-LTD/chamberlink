"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { hero } from "@/lib/content/homeCopy";
import HeroVisual from "@/components/cinematic/HeroVisual";

export default function CinematicHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const revealTargets =
        "[data-hero-eyebrow],[data-hero-line],[data-hero-sub],[data-hero-cta],[data-hero-stat]";
      tl.from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.6 })
        .from("[data-hero-line]", { opacity: 0, y: 40, stagger: 0.12, duration: 0.9 }, "-=0.3")
        .from("[data-hero-sub]", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 16, stagger: 0.1, duration: 0.6 }, "-=0.4")
        .from("[data-hero-stat]", { opacity: 0, y: 12, stagger: 0.08, duration: 0.5 }, "-=0.3")
        // Belt-and-braces: strip GSAP's inline transform/opacity once the
        // entrance settles so a React Strict-Mode double-effect (dev only)
        // can never leave an element stuck mid-tween (e.g. a CTA button
        // frozen at translateY(16) instead of resting at 0).
        .set(revealTargets, { clearProps: "transform,opacity" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const headlineWords = hero.headline.split(" ");

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100dvh] flex-col justify-center px-6 pb-16 pt-28 md:px-12"
    >
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span
            data-hero-eyebrow
            className="mb-6 inline-block font-[family-name:var(--font-ibm-mono)] text-xs font-medium uppercase tracking-[0.2em] text-[#34c28d]"
          >
            {hero.eyebrow}
          </span>

          <h1 className="max-w-2xl font-[family-name:var(--font-fraunces)] text-5xl font-medium leading-[1.05] tracking-tight text-[#f2f6f0] md:text-6xl">
            {headlineWords.map((word, i) => (
              <span key={i} data-hero-line className="inline-block overflow-hidden pr-3 pb-1 align-top">
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mt-8 max-w-xl font-[family-name:var(--font-public-sans)] text-lg leading-relaxed text-[#f2f6f0]/70 md:text-xl"
          >
            {hero.subhead}
          </p>

          <div className="mt-10 flex flex-wrap items-stretch gap-4">
            <Link
              data-hero-cta
              href={hero.ctaPrimary.href}
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#34c28d] px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold leading-none text-[#0a1f16] transition-transform hover:-translate-y-0.5"
            >
              {hero.ctaPrimary.label}
              <ArrowRight className="h-4 w-4 transition-transform" />
            </Link>
            <a
              data-hero-cta
              href={hero.ctaSecondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold leading-none text-[#f2f6f0] transition-colors hover:border-white/40"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">
            {hero.stats.map((stat) => (
              <div key={stat.label} data-hero-stat>
                <div className="whitespace-nowrap font-[family-name:var(--font-ibm-mono)] text-2xl text-[#f2f6f0] md:text-3xl">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix && <span className="text-[#34c28d]">{stat.suffix}</span>}
                </div>
                <div className="mt-1 font-[family-name:var(--font-public-sans)] text-xs uppercase tracking-wider text-[#f2f6f0]/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#f2f6f0]/50">
        <span className="font-[family-name:var(--font-ibm-mono)] text-[10px] uppercase tracking-[0.2em]">
          {hero.scrollCue}
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
