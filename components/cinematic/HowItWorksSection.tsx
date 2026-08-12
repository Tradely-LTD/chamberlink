"use client";

import { useEffect, useRef } from "react";
import { FolderCheck, CreditCard, BadgeCheck } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { howItWorks } from "@/lib/content/homeCopy";

const icons = [FolderCheck, CreditCard, BadgeCheck];

export default function HowItWorksSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-step-reveal]", {
        opacity: 0,
        y: 32,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => gsap.set("[data-step-reveal]", { clearProps: "transform,opacity" }),
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="how-it-works" className="bg-background px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-gold">
            {howItWorks.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-tight text-foreground md:text-5xl">
            {howItWorks.headline}
          </h2>
          <p className="mt-6 font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-muted-foreground">
            {howItWorks.body}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {howItWorks.steps.map((step, i) => {
            const Icon = icons[i] ?? FolderCheck;
            return (
              <div
                key={step.index}
                data-step-reveal
                className="relative flex flex-col rounded-2xl border border-border bg-white p-8 shadow-[0_1px_2px_rgba(10,22,40,0.04)]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-fraunces)] text-4xl font-medium text-primary/15">
                    {step.index}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className="font-[family-name:var(--font-fraunces)] text-xl text-foreground">{step.title}</h3>
                <p className="mt-3 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                {step.items && (
                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 font-[family-name:var(--font-public-sans)] text-xs text-foreground/80"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
