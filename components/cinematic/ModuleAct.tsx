"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, FileText, BarChart3, Globe2, GraduationCap, type LucideIcon } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { colorways, type ColorwayName } from "@/lib/theme";
import type { ModuleAct as ModuleActData } from "@/lib/content/homeCopy";

const icons: Record<string, LucideIcon> = {
  "01": ShieldCheck,
  "02": FileText,
  "03": BarChart3,
  "04": Globe2,
  "05": GraduationCap,
};

type Props = {
  module: ModuleActData;
  position: number; // 0-based order among acts, drives left/right alternation
};

export default function ModuleAct({ module: mod, position }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  const Icon = icons[mod.index] ?? ShieldCheck;
  const color: ColorwayName = mod.colorway;
  const isReversed = position % 2 === 1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.6,
        },
      });
      content.fromTo(textRef.current, { opacity: 0, y: 56 }, { opacity: 1, y: 0, ease: "power2.out" });

      gsap.fromTo(
        ghostRef.current,
        { yPercent: -18 },
        {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
      gsap.to(ringRef.current, {
        rotate: 90,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.fromTo(
        chipRef.current,
        { yPercent: 10 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.3 },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={`module-${mod.index}`}
      className="relative min-h-[110vh] px-6 py-24 md:min-h-[150vh] md:px-12"
    >
      <div className="sticky top-0 mx-auto flex min-h-screen w-full max-w-[1400px] items-center">
        <div
          className={`grid w-full items-center gap-16 md:grid-cols-2 ${
            isReversed ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div ref={textRef}>
            <div className="mb-6 flex items-center gap-4">
              <span
                className="font-[family-name:var(--font-fraunces)] text-lg"
                style={{ color: colorways[color].bright }}
              >
                {mod.index}
              </span>
              <span className="h-px flex-1 max-w-16 bg-white/15" />
              <span className="font-[family-name:var(--font-ibm-mono)] text-[11px] uppercase tracking-[0.18em] text-[#f2f6f0]/50">
                {mod.eyebrow}
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-[1.1] text-[#f2f6f0] md:text-5xl">
              {mod.title}
            </h2>
            <p
              className="mt-3 font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-wider"
              style={{ color: colorways[color].bright }}
            >
              {mod.tagline}
            </p>
            <p className="mt-6 max-w-lg font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-[#f2f6f0]/65">
              {mod.body}
            </p>

            <ul className="mt-8 space-y-3">
              {mod.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 font-[family-name:var(--font-public-sans)] text-sm text-[#f2f6f0]/75">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: colorways[color].bright }}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex h-[380px] items-center justify-center md:h-[480px]" aria-hidden="true">
            {/* Background layer — oversized ghost index number, slowest parallax */}
            <div
              ref={ghostRef}
              className="pointer-events-none absolute select-none font-[family-name:var(--font-fraunces)] text-[220px] font-medium leading-none md:text-[320px]"
              style={{ color: colorways[color].base, opacity: 0.18 }}
            >
              {mod.index}
            </div>

            {/* Midground layer — rotating dashed orbit ring */}
            <div ref={ringRef} className="absolute h-56 w-56 md:h-72 md:w-72">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke={colorways[color].bright}
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke={colorways[color].bright}
                  strokeOpacity="0.5"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Foreground layer — icon chip, fastest parallax (reads closest) */}
            <div
              ref={chipRef}
              className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md md:h-36 md:w-36"
              style={{ backgroundColor: `${colorways[color].base}cc` }}
            >
              <Icon className="h-12 w-12 md:h-14 md:w-14" style={{ color: colorways[color].bright }} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
