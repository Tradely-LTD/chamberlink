import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, ArrowUpRight, ArrowRight } from "lucide-react";
import CorporateNavbar from "@/components/cinematic/CorporateNavbar";
import CorporateFooter from "@/components/cinematic/CorporateFooter";
import { howItWorks, nav } from "@/lib/content/homeCopy";

export const metadata: Metadata = {
  title: "Apply for a Certificate",
  description:
    "Solid Minerals Certificate of Origin applications are opening soon. Register your free ChamberLink ID now so you're ready the moment applications open.",
};

export default function ApplyPage() {
  return (
    <>
      <CorporateNavbar />
      <main className="min-h-dvh bg-background px-6 pb-24 pt-40 md:px-12 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Clock3 className="h-6 w-6 text-primary" strokeWidth={1.75} />
          </div>
          <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-gold">
            APPLICATIONS
          </span>
          <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Certificate applications are opening soon.
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-muted-foreground">
            We&apos;re finishing the guided application flow for the Solid Minerals Certificate of Origin. In the
            meantime, register your free ChamberLink ID — it takes a couple of minutes, and it&apos;s the account
            you&apos;ll use to apply the moment applications open.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={nav.register.href}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold leading-none text-white transition-colors hover:bg-gold-hover"
            >
              Register your ChamberLink ID
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/verify"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold leading-none text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Verify a Certificate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <p className="text-center font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-muted-foreground">
            What to expect when applications open
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {howItWorks.steps.map((step) => (
              <div key={step.index} className="rounded-2xl border border-border bg-white p-6">
                <span className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-primary/20">
                  {step.index}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-lg text-foreground">{step.title}</h3>
                <p className="mt-2 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <CorporateFooter />
    </>
  );
}
