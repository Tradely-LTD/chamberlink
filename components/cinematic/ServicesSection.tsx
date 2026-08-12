"use client";

import { useEffect, useRef } from "react";
import {
  Users2,
  Plane,
  Landmark,
  Megaphone,
  GraduationCap,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { services } from "@/lib/content/homeCopy";

const icons: LucideIcon[] = [Users2, Plane, Landmark, Megaphone, GraduationCap, LineChart];

export default function ServicesSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-service-reveal]", {
        opacity: 0,
        y: 20,
        stagger: 0.06,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => gsap.set("[data-service-reveal]", { clearProps: "transform,opacity" }),
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-muted px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-gold">
            {services.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-tight text-foreground md:text-5xl">
            {services.headline}
          </h2>
          <p className="mt-6 font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-muted-foreground">
            {services.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => {
            const Icon = icons[i] ?? Users2;
            return (
              <div key={item.title} data-service-reveal className="bg-background p-8">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-lg text-foreground">{item.title}</h3>
                <p className="mt-2 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
