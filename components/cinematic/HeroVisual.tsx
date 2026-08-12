"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, QrCode } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";

/**
 * Product-accurate visual for the hero's right panel — a floating digital
 * Certificate of Origin + membership ID card, built entirely in code (no
 * stock photography). Swap this out for real chamber photography once real
 * assets are supplied; see HeroVisual usage notes.
 */
export default function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const idCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        y: -14,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(idCardRef.current, {
        y: 10,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.4,
      });
      gsap.from(rootRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/12"
      style={{
        background: "linear-gradient(155deg, #0a3d82 0%, #051937 55%, #02143a 100%)",
      }}
    >
      {/* Texture: faint dotted grid */}
      <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
        <pattern id="hero-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#fdf8f3" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Glow blob */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-tint opacity-25 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#4d7fd6] opacity-20 blur-3xl" />

      {/* Membership ID card — background layer */}
      <div
        ref={idCardRef}
        className="absolute bottom-16 left-6 w-48 rounded-xl border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-ibm-mono)] text-[9px] uppercase tracking-widest text-white/60">
            Member ID
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-gold-tint" />
        </div>
        <div className="mt-3 h-2 w-3/4 rounded bg-white/25" />
        <div className="mt-2 h-2 w-1/2 rounded bg-white/15" />
        <div className="mt-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-ibm-mono)] text-[9px] text-gold-tint">ACTIVE</span>
          <QrCode className="h-6 w-6 text-white/50" strokeWidth={1.25} />
        </div>
      </div>

      {/* Certificate of Origin card — foreground layer */}
      <div
        ref={cardRef}
        className="absolute right-6 top-10 w-56 rounded-2xl border border-border bg-background p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="font-[family-name:var(--font-ibm-mono)] text-[9px] uppercase tracking-widest text-muted-foreground">
              Certificate of Origin
            </span>
            <p className="mt-1 font-[family-name:var(--font-fraunces)] text-sm text-foreground">SAMPLE-SM-COO-04821</p>
          </div>
          <ShieldCheck className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-1.5 w-full rounded bg-muted" />
          <div className="h-1.5 w-4/5 rounded bg-muted" />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 font-[family-name:var(--font-ibm-mono)] text-[9px] uppercase tracking-wider text-primary">
            Verified
          </span>
          <div className="grid grid-cols-4 gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-[1px]"
                style={{ backgroundColor: (i * 7) % 3 === 0 ? "#0A1628" : "transparent" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
