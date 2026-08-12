"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { problem } from "@/lib/content/homeCopy";

export default function ProblemAct() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-problem-reveal]", {
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => gsap.set("[data-problem-reveal]", { clearProps: "transform,opacity" }),
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
    <section ref={rootRef} className="relative bg-background px-6 py-28 md:px-12">
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div data-problem-reveal>
          <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-accent-ink">
            {problem.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-tight text-foreground md:text-5xl">
            {problem.headline}
          </h2>
          <p className="mt-6 max-w-md font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-muted-foreground">
            {problem.body}
          </p>
        </div>

        <div className="grid gap-4">
          {problem.points.map((point) => (
            <div
              key={point.label}
              data-problem-reveal
              className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(10,22,40,0.04)]"
            >
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl text-foreground">
                {point.label}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-muted-foreground">
                {point.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
