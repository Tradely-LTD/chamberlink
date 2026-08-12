"use client";

import { useEffect, useRef } from "react";
import {
  Users,
  Globe2,
  ShieldCheck,
  GraduationCap,
  Tent,
  Route,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { colorways, type ColorwayName } from "@/lib/theme";

const icons: Record<string, LucideIcon> = {
  "01": Users,
  "02": Globe2,
  "03": ShieldCheck,
  "04": GraduationCap,
  "05": Tent,
  "06": Route,
  "07": FileText,
};

type ModuleActData = {
  index: string;
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
  colorway: ColorwayName;
};

type Props = {
  module: ModuleActData;
  position: number; // 0-based order among acts, drives left/right alternation + bg rhythm
};

// Reusable "scroll act" pattern — sticky icon panel + parallax layers,
// content driven entirely by props. Currently used on /for-chambers for the
// 7-item value-proposition list.
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
      className={`relative min-h-[110vh] border-t border-border px-6 py-24 md:min-h-[150vh] md:px-12 ${
        position % 2 === 1 ? "bg-muted" : "bg-background"
      }`}
    >
      <div className="sticky top-0 mx-auto flex min-h-screen w-full max-w-[1400px] items-center">
        <div
          className={`grid w-full items-center gap-16 md:grid-cols-2 ${
            isReversed ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div ref={textRef}>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-[family-name:var(--font-fraunces)] text-lg text-primary">{mod.index}</span>
              <span className="h-px flex-1 max-w-16 bg-border" />
              <span className="font-[family-name:var(--font-ibm-mono)] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {mod.eyebrow}
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-[1.1] text-foreground md:text-5xl">
              {mod.title}
            </h2>
            <p className="mt-3 font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-wider text-primary">
              {mod.tagline}
            </p>
            <p className="mt-6 max-w-lg font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-muted-foreground">
              {mod.body}
            </p>

            <ul className="mt-8 space-y-3">
              {mod.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 font-[family-name:var(--font-public-sans)] text-sm text-foreground/85">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: colorways[color].bright }}
                    aria-hidden="true"
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
              style={{ color: colorways[color].base, opacity: 0.1 }}
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
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke={colorways[color].base}
                  strokeOpacity="0.4"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Foreground layer — icon chip, fastest parallax (reads closest) */}
            <div
              ref={chipRef}
              className="relative flex h-28 w-28 items-center justify-center rounded-3xl shadow-2xl md:h-36 md:w-36"
              style={{ backgroundColor: `${colorways[color].base}e6` }}
            >
              <Icon className="h-12 w-12 md:h-14 md:w-14" style={{ color: colorways[color].bright }} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
