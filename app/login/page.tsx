"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { PORTAL_URL, PORTAL_SSO_URL } from "@/lib/content/homeCopy";
import "../naccima-auth.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();

      if (!res.ok || !body.success) {
        setError(body.message ?? "We couldn't sign you in with those details.");
        return;
      }

      const { accessToken, refreshToken } = body.data ?? {};
      if (!refreshToken || !accessToken) {
        // e.g. this account has MFA enabled — this ported form has no OTP step,
        // so hand off to the portal's own login instead of getting stuck.
        window.location.href = `${PORTAL_URL}/login`;
        return;
      }

      // Hand off into the member portal already signed in. The refresh token
      // travels in the URL fragment, which browsers never send to a server —
      // chamberlink_frontend's /sso route picks it up client-side only.
      window.location.href = `${PORTAL_SSO_URL}#rt=${encodeURIComponent(refreshToken)}`;
    } catch {
      setError("Couldn't reach the sign-in service. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="naccima-shell">
      <div className="auth-page">
        <div className="auth-brand-row">
          <Link href="/" className="workspace-brand">
            <span className="brand-symbol"><img className="brand-logo" src="/naccima-seal.png" alt="NACCIMA" /></span>
            <span><strong>NACCIMA</strong><em>Chamberlink</em></span>
          </Link>
          <span className="auth-brand-note">Solid minerals export platform</span>
        </div>
        <main className="auth-layout">
          <section className="auth-intro">
            <div className="section-kicker">Welcome back</div>
            <h1>Return to your<br /><em>export desk.</em></h1>
            <p>Access your Chamberlink application workspace, compliance records and certificate status.</p>
            <div className="auth-benefits">
              <div><CheckCircle2 size={17} /><span>Continue applications for Tradely LTD</span></div>
              <div><CheckCircle2 size={17} /><span>Track review and certificate status</span></div>
              <div><CheckCircle2 size={17} /><span>Keep your export documents organised</span></div>
            </div>
          </section>
          <section className="auth-card">
            <div className="auth-card-icon"><ShieldCheck size={21} /></div>
            <h2>Sign in to Chamberlink</h2>
            <p className="auth-card-lede">Use your Chamberlink email account to access your workspace.</p>
            <div className="auth-form">
              <div>
                <label>Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
              </div>
              <div>
                <label>Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
              </div>
              {error && <p className="submit-error">{error}</p>}
              <Button className="primary-button auth-submit" disabled={submitting} onClick={submit}>
                {submitting ? "Signing in…" : "Sign in with email"} <ArrowRight size={16} />
              </Button>
              <a href={`${PORTAL_URL}/auth/forgot-password`} className="text-link auth-forgot-link">Forgot your password?</a>
            </div>
            <div className="auth-divider"><span>New to Chamberlink?</span></div>
            <Link href="/register" className="auth-signin button-like">Create a platform account</Link>
            <p className="auth-security"><LockKeyhole size={13} /> Secure account access powered by NACCIMA Chamberlink</p>
          </section>
        </main>
      </div>
    </div>
  );
}
