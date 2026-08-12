import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CorporateNavbar from "@/components/cinematic/CorporateNavbar";
import CorporateFooter from "@/components/cinematic/CorporateFooter";
import VerifySearchForm from "@/components/cinematic/VerifySearchForm";
import { VerifyValidCard, VerifyNotFoundCard, VerifyErrorCard } from "@/components/cinematic/VerifyResultCard";
import { verifyCertificate } from "@/lib/api/verifyCertificate";

type Props = { params: Promise<{ certNumber: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certNumber } = await params;
  return {
    title: `Verify ${decodeURIComponent(certNumber)}`,
    description: "Verify a NACCIMA Solid Minerals Certificate of Origin.",
    robots: { index: false, follow: true },
  };
}

export default async function VerifyCertificatePage({ params }: Props) {
  const { certNumber: rawCertNumber } = await params;
  const certNumber = decodeURIComponent(rawCertNumber);
  const result = await verifyCertificate(certNumber);

  return (
    <>
      <CorporateNavbar />
      <main className="min-h-dvh bg-background px-6 pb-24 pt-40 md:px-12 md:pt-48">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/verify"
            className="inline-flex cursor-pointer items-center gap-1.5 font-[family-name:var(--font-public-sans)] text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Verify another certificate
          </Link>

          <div className="mt-6">
            {result.ok ? (
              <VerifyValidCard data={result.data} />
            ) : result.notFound ? (
              <VerifyNotFoundCard certNumber={certNumber} />
            ) : (
              <VerifyErrorCard message={result.message} />
            )}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-white p-6">
            <p className="mb-4 font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-wider text-muted-foreground">
              Search a different certificate
            </p>
            <VerifySearchForm />
          </div>
        </div>
      </main>
      <CorporateFooter />
    </>
  );
}
