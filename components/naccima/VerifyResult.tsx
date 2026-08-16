import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { CertificateData } from "@/lib/api/verifyCertificate";

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

function formatStatus(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function VerifyValidCard({ data }: { data: CertificateData }) {
  const valid = data.isValid;
  return (
    <>
      <div className="verification-result">
        {valid ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
        <div>
          <strong>{valid ? "Valid certificate — issued by NACCIMA" : `Certificate found — status: ${formatStatus(data.status)}`}</strong>
          {valid && <span className="verified-text">VERIFIED</span>}
        </div>
      </div>
      <div className="certificate-lines" style={{ marginTop: 24 }}>
        <div><small>Certificate number</small><strong>{data.certificateNumber}</strong></div>
        <div><small>Exporter</small><strong>{data.companyName}</strong></div>
        <div><small>Mineral</small><strong>{data.solidMineralName}</strong></div>
        <div className="two-col">
          <div><small>Destination</small><strong>{data.destinationCountry}</strong></div>
          <div><small>HS Code</small><strong>{data.hsCode}</strong></div>
        </div>
        <div className="two-col">
          <div><small>Issued</small><strong>{formatDate(data.issuedAt)}</strong></div>
          <div><small>Status</small><strong>{formatStatus(data.status)}</strong></div>
        </div>
      </div>
    </>
  );
}

export function VerifyNotFoundCard({ certNumber }: { certNumber: string }) {
  return (
    <div className="verification-result not-found">
      <XCircle size={20} />
      <div>
        <strong>Certificate not found</strong>
        <span>
          We couldn&apos;t find a certificate matching <strong>{certNumber}</strong>. Double-check the certificate
          number and try again — it should match exactly what appears on the certificate.
        </span>
      </div>
    </div>
  );
}

export function VerifyErrorCard({ message }: { message: string }) {
  return (
    <div className="verification-result is-error">
      <AlertTriangle size={20} />
      <div>
        <strong>Verification unavailable</strong>
        <span>{message}</span>
      </div>
    </div>
  );
}
