"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { trust } from "@/lib/content/homeCopy";

export default function TrustSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-trust-badge]", {
        opacity: 0,
        y: 20,
        stagger: 0.06,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => gsap.set("[data-trust-badge]", { clearProps: "transform,opacity" }),
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-background px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-gold">
            {trust.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-tight text-foreground md:text-5xl">
            {trust.headline}
          </h2>
          <p className="mt-6 font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-muted-foreground">
            {trust.body}
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {trust.badges.map((badge) => (
            <div key={badge.label} data-trust-badge className="bg-background p-8">
              <h3 className="font-[family-name:var(--font-fraunces)] text-lg text-foreground">{badge.label}</h3>
              <p className="mt-2 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-muted-foreground">
                {badge.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
