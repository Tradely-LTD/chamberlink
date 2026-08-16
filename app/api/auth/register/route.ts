import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/content/homeCopy";

/**
 * Server-side proxy for POST {API_BASE_URL}/api/auth/register
 * (chamberlink_backend/src/modules/auth/route.ts + controller.ts, schema in
 * ./types.ts: email, password, firstName, lastName, phone?, businessName?).
 *
 * Same CORS reason as /api/auth/login — see that route's comment. Never logs
 * the request body (password) or response (tokens).
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  try {
    const backendRes = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await backendRes.json().catch(() => ({ success: false, message: "Unexpected response from the auth service." }));
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Couldn't reach the registration service. Please try again in a moment." },
      { status: 502 }
    );
  }
}
