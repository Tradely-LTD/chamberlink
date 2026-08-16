import { API_BASE_URL } from "@/lib/content/homeCopy";

/**
 * Shape confirmed against the real backend source, not guessed:
 * chamberlink_backend/src/modules/e-certificate/service.ts `publicVerify`
 * (select list) + controller.ts `publicVerify` (response envelope). The
 * select list uses `companyName`, not `exporterName` — a prior version of
 * this type got that wrong, which silently rendered a blank exporter field
 * (the `as CertificateData` cast below doesn't catch a wrong key at runtime).
 */
export type CertificateData = {
  certificateNumber: string;
  companyName: string;
  destinationCountry: string;
  solidMineralName: string;
  hsCode: string;
  issuedAt: string;
  status: string;
  isValid: boolean;
};

type VerifyResult =
  | { ok: true; data: CertificateData }
  | { ok: false; notFound: true }
  | { ok: false; notFound: false; message: string };

/**
 * Calls the real, public, unauthenticated backend endpoint:
 *   GET {API_BASE_URL}/api/eco/verify/:certNumber
 * Runs server-side (Server Component) so the browser never has to satisfy
 * the backend's CORS allowlist (which only lists the member portal / admin /
 * landing origins, not this corporate site) — see chamberlink_backend/src/index.ts.
 */
export async function verifyCertificate(certNumber: string): Promise<VerifyResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/eco/verify/${encodeURIComponent(certNumber)}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (res.status === 404) {
      return { ok: false, notFound: true };
    }

    if (!res.ok) {
      let message = `Verification service returned ${res.status}`;
      try {
        const body = await res.json();
        if (typeof body?.message === "string") message = body.message;
      } catch {
        // response wasn't JSON — keep the generic message
      }
      return { ok: false, notFound: false, message };
    }

    const body = await res.json();
    if (!body?.success || !body?.data) {
      return { ok: false, notFound: false, message: "Unexpected response from the verification service." };
    }
    return { ok: true, data: body.data as CertificateData };
  } catch {
    return {
      ok: false,
      notFound: false,
      message: "Couldn't reach the verification service. Please try again in a moment.",
    };
  }
}
