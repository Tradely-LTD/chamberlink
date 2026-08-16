import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import type { CertificateData } from "@/lib/api/verifyCertificate";

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

function formatStatus(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const fieldClass = "flex items-center justify-between gap-4 border-t border-border py-3 first:border-t-0";
const labelClass = "font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-wider text-muted-foreground";
const valueClass = "text-right font-[family-name:var(--font-public-sans)] text-sm font-medium text-foreground";

export function VerifyValidCard({ data }: { data: CertificateData }) {
  const valid = data.isValid;
  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-10">
      <div
        className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
          valid ? "bg-primary/10 text-primary" : "bg-gold/10 text-gold"
        }`}
      >
        {valid ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
        <span className="font-[family-name:var(--font-public-sans)] text-sm font-semibold">
          {valid ? "Valid certificate — issued by NACCIMA" : `Certificate found — status: ${formatStatus(data.status)}`}
        </span>
      </div>

      <div className="mt-6">
        <div className={fieldClass}>
          <span className={labelClass}>Certificate Number</span>
          <span className={`${valueClass} font-[family-name:var(--font-ibm-mono)]`}>{data.certificateNumber}</span>
        </div>
        <div className={fieldClass}>
          <span className={labelClass}>Exporter</span>
          <span className={valueClass}>{data.companyName}</span>
        </div>
        <div className={fieldClass}>
          <span className={labelClass}>Destination Country</span>
          <span className={valueClass}>{data.destinationCountry}</span>
        </div>
        <div className={fieldClass}>
          <span className={labelClass}>HS Code</span>
          <span className={`${valueClass} font-[family-name:var(--font-ibm-mono)]`}>{data.hsCode}</span>
        </div>
        <div className={fieldClass}>
          <span className={labelClass}>Issued</span>
          <span className={valueClass}>{formatDate(data.issuedAt)}</span>
        </div>
        <div className={fieldClass}>
          <span className={labelClass}>Status</span>
          <span className={valueClass}>{formatStatus(data.status)}</span>
        </div>
      </div>
    </div>
  );
}

export function VerifyNotFoundCard({ certNumber }: { certNumber: string }) {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-white p-6 text-center md:p-10">
      <XCircle className="mx-auto h-10 w-10 text-destructive" strokeWidth={1.5} />
      <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-2xl text-foreground">Certificate not found</h2>
      <p className="mt-3 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-muted-foreground">
        We couldn&apos;t find a certificate matching{" "}
        <span className="font-[family-name:var(--font-ibm-mono)] text-foreground">{certNumber}</span>. Double-check
        the certificate number and try again — it should match exactly what appears on the certificate.
      </p>
    </div>
  );
}

export function VerifyErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 text-center md:p-10">
      <AlertTriangle className="mx-auto h-10 w-10 text-gold" strokeWidth={1.5} />
      <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-2xl text-foreground">
        Verification unavailable
      </h2>
      <p className="mt-3 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
