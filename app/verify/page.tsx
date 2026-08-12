import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import CorporateNavbar from "@/components/cinematic/CorporateNavbar";
import CorporateFooter from "@/components/cinematic/CorporateFooter";
import VerifySearchForm from "@/components/cinematic/VerifySearchForm";

export const metadata: Metadata = {
  title: "Verify a Certificate",
  description:
    "Verify a NACCIMA Solid Minerals Certificate of Origin. Enter a certificate number to check its validity — free, instant, no login required.",
};

export default function VerifyPage() {
  return (
    <>
      <CorporateNavbar />
      <main className="min-h-dvh bg-background px-6 pb-24 pt-40 md:px-12 md:pt-48">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" strokeWidth={1.75} />
          </div>
          <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-gold">
            VERIFY A CERTIFICATE
          </span>
          <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Check a Certificate of Origin.
          </h1>
          <p className="mx-auto mt-5 max-w-lg font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-muted-foreground">
            Enter the certificate number exactly as it appears on the document. Verification is free, instant, and
            doesn&apos;t require an account.
          </p>

          <div className="mt-10 text-left">
            <VerifySearchForm />
          </div>
        </div>
      </main>
      <CorporateFooter />
    </>
  );
}
