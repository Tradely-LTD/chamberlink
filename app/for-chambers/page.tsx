import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CorporateNavbar from "@/components/cinematic/CorporateNavbar";
import CorporateFooter from "@/components/cinematic/CorporateFooter";
import IntroSplitSection from "@/components/cinematic/IntroSplitSection";
import MandateAct from "@/components/cinematic/MandateAct";
import ModuleAct from "@/components/cinematic/ModuleAct";
import ProofSection from "@/components/cinematic/ProofSection";
import FinalCtaSection from "@/components/cinematic/FinalCtaSection";
import { seo, forChambersHero, valueProps, forChambersFinalCta } from "@/lib/content/forChambersCopy";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
};

export default function ForChambersPage() {
  return (
    <>
      <CorporateNavbar />
      <main>
        {/* Light hero — this page is NOT the dramatic dark Solid Minerals
            homepage hero; it's a different, calmer audience (prospective
            chamber partners), so it opens light and saves the dark moment
            for the mandate explanation below. */}
        <section className="bg-background px-6 pb-20 pt-40 md:px-12 md:pb-28 md:pt-48">
          <div className="mx-auto max-w-[1400px]">
            <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-gold">
              {forChambersHero.eyebrow}
            </span>
            <h1 className="max-w-3xl font-[family-name:var(--font-fraunces)] text-4xl font-medium leading-[1.08] text-foreground md:text-6xl">
              {forChambersHero.headline}
            </h1>
            <p className="mt-6 max-w-2xl font-[family-name:var(--font-public-sans)] text-lg leading-relaxed text-muted-foreground">
              {forChambersHero.body}
            </p>
            <Link
              href={forChambersHero.ctaPrimary.href}
              className="group mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold leading-none text-white transition-colors hover:bg-gold-hover"
            >
              {forChambersHero.ctaPrimary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <IntroSplitSection />
        <MandateAct />

        <div id="value-proposition">
          {valueProps.map((item, i) => (
            <ModuleAct key={item.index} module={item} position={i} />
          ))}
        </div>

        <ProofSection />
        <FinalCtaSection content={forChambersFinalCta} />
      </main>
      <CorporateFooter />
    </>
  );
}
