import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerifyForm from "@/components/naccima/VerifyForm";
import { VerifyValidCard, VerifyNotFoundCard, VerifyErrorCard } from "@/components/naccima/VerifyResult";
import { verifyCertificate } from "@/lib/api/verifyCertificate";
import "../../naccima-auth.css";

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
    <div className="naccima-shell">
      <div className="public-tool-page">
        <div className="tool-top">
          <Link href="/" className="brand-mark" aria-label="NACCIMA Chamberlink home">
            <span className="brand-symbol"><img className="brand-logo" src="/naccima-seal.png" alt="NACCIMA" /></span>
            <span><strong>NACCIMA</strong><em>Chamberlink</em></span>
          </Link>
          <Link href="/verify" className="text-link"><ArrowLeft size={16} /> Verify another certificate</Link>
        </div>
        <div className="tool-card">
          {result.ok ? (
            <VerifyValidCard data={result.data} />
          ) : result.notFound ? (
            <VerifyNotFoundCard certNumber={certNumber} />
          ) : (
            <VerifyErrorCard message={result.message} />
          )}

          <div style={{ marginTop: 30, paddingTop: 22, borderTop: "1px solid #e7edf1" }}>
            <div className="section-kicker">Search a different certificate</div>
            <VerifyForm />
          </div>
        </div>
      </div>
    </div>
  );
}
