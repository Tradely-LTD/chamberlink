"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { finalCta as defaultFinalCta } from "@/lib/content/homeCopy";

type CtaContent = {
  eyebrow: string;
  headline: string;
  body: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

type Props = { content?: CtaContent };

export default function FinalCtaSection({ content = defaultFinalCta }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-cta-reveal]", {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => gsap.set("[data-cta-reveal]", { clearProps: "transform,opacity" }),
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-background px-6 py-28 md:px-12">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-primary-deep px-6 py-20 text-center md:px-16 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #b5a473 0%, transparent 70%)" }}
        />
        <div className="relative">
          <span data-cta-reveal className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-gold-tint">
            {content.eyebrow}
          </span>
          <h2 data-cta-reveal className="font-[family-name:var(--font-fraunces)] text-3xl font-medium leading-tight text-white md:text-6xl">
            {content.headline}
          </h2>
          <p data-cta-reveal className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-white/75">
            {content.body}
          </p>
          <div data-cta-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={content.ctaPrimary.href}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-transparent bg-gold-tint px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold leading-none text-primary-deep transition-transform hover:-translate-y-0.5"
            >
              {content.ctaPrimary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={content.ctaSecondary.href}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold leading-none text-white transition-colors hover:border-white/50"
            >
              {content.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
