import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/content/homeCopy";

/**
 * Server-side proxy for POST {API_BASE_URL}/api/auth/login
 * (chamberlink_backend/src/modules/auth/route.ts + controller.ts).
 *
 * Runs on the server for the same reason lib/api/verifyCertificate.ts does:
 * the backend's CORS allowlist only lists the member portal / admin / landing
 * origins, not this corporate site, so the browser can't call it directly.
 *
 * Never logs the request body (email/password) or the response (tokens) —
 * see chamberlink CLAUDE.md "Do not log tokens or payment payloads."
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  try {
    const backendRes = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await backendRes.json().catch(() => ({ success: false, message: "Unexpected response from the auth service." }));
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Couldn't reach the sign-in service. Please try again in a moment." },
      { status: 502 }
    );
  }
}
