import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, SearchCheck } from "lucide-react";
import VerifyForm from "@/components/naccima/VerifyForm";
import "../naccima-auth.css";

export const metadata: Metadata = {
  title: "Verify a Certificate",
  description:
    "Verify a NACCIMA Solid Minerals Certificate of Origin. Enter a certificate number to check its validity — free, instant, no login required.",
};

export default function VerifyPage() {
  return (
    <div className="naccima-shell">
      <div className="public-tool-page">
        <div className="tool-top">
          <Link href="/" className="brand-mark" aria-label="NACCIMA Chamberlink home">
            <span className="brand-symbol"><img className="brand-logo" src="/naccima-seal.png" alt="NACCIMA" /></span>
            <span><strong>NACCIMA</strong><em>Chamberlink</em></span>
          </Link>
          <Link href="/" className="text-link"><ArrowLeft size={16} /> Back to Chamberlink</Link>
        </div>
        <div className="tool-card">
          <div className="dialog-icon"><SearchCheck size={22} /></div>
          <div className="section-kicker">Verify a certificate</div>
          <h1>Check a Certificate of Origin.</h1>
          <p>
            Enter the certificate number exactly as it appears on the document. Verification is free, instant, and
            doesn&apos;t require an account.
          </p>
          <VerifyForm />
        </div>
      </div>
    </div>
  );
}
