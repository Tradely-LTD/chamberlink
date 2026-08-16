"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Building2, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { PORTAL_SSO_URL } from "@/lib/content/homeCopy";
import "../naccima-auth.css";

type Form = { name: string; email: string; company: string; password: string };

// chamberlink_backend/src/modules/auth/types.ts registerSchema needs a real
// firstName + lastName, not one "full name" field, so the single visible
// "Full name" input is split on the first space before it's submitted.
function splitName(fullName: string): { firstName: string; lastName: string } | null {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return null;
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function validateRegistration(form: Form): string {
  if (!form.name.trim() || !splitName(form.name)) return "Enter your first and last name.";
  if (!form.email.includes("@")) return "Enter a valid work email to continue.";
  if (!form.company.trim()) return "Enter your company name to continue.";
  return "";
}

export default function RegisterPage() {
  const [form, setForm] = useState<Form>({ name: "", email: "", company: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof Form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async () => {
    const validationError = validateRegistration(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (form.password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }
    const name = splitName(form.name)!;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.firstName,
          lastName: name.lastName,
          email: form.email,
          password: form.password,
          businessName: form.company || undefined,
        }),
      });
      const body = await res.json();

      if (!res.ok || !body.success) {
        setError(body.message ?? "We couldn't create your account with those details.");
        return;
      }

      // chamberlink_backend/src/modules/auth/service.ts `register()` only
      // returns { userId, message } — no tokens (it gates on nothing, but
      // doesn't sign the new account in either; the real member portal's own
      // RegisterForm routes to an email-verification step for the same
      // reason). Chain an immediate login with the same credentials to get
      // real tokens for the handoff below — safe because, per that same
      // file's login(), signing in is never gated on isEmailVerified.
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const loginBody = await loginRes.json().catch(() => null);
      const { accessToken, refreshToken } = loginBody?.data ?? {};
      if (!loginRes.ok || !refreshToken || !accessToken) {
        setError("Account created — sign in from the member portal to continue.");
        return;
      }

      // Hand off into the member portal already signed in — see /login/page.tsx
      // for why the token travels in the URL fragment, not a query string, and
      // what `from` is for.
      const from = encodeURIComponent(window.location.origin);
      window.location.href = `${PORTAL_SSO_URL}#rt=${encodeURIComponent(refreshToken)}&from=${from}`;
    } catch {
      setError("Couldn't reach the registration service. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="naccima-shell">
      <div className="auth-page">
        <div className="auth-brand-row">
          <Link href="/" className="brand-mark" aria-label="NACCIMA Chamberlink home">
            <span className="brand-symbol"><img className="brand-logo" src="/naccima-seal.png" alt="NACCIMA" /></span>
            <span><strong>NACCIMA</strong><em>Chamberlink</em></span>
          </Link>
          <span className="auth-brand-note">Solid minerals export platform</span>
        </div>
        <main className="auth-layout">
          <section className="auth-intro">
            <div className="section-kicker">Create your platform account</div>
            <h1>Your export workspace<br /><em>starts here.</em></h1>
            <p>Register for Chamberlink to apply for Solid Minerals Certificates of Origin, track submissions, upload compliance documents and access NACCIMA export services.</p>
            <div className="auth-benefits">
              <div><CheckCircle2 size={17} /><span>Track applications and certificate status</span></div>
              <div><CheckCircle2 size={17} /><span>Submit company and compliance documents securely</span></div>
              <div><CheckCircle2 size={17} /><span>Access chamber and export-support services</span></div>
            </div>
          </section>
          <section className="auth-card">
            <div className="auth-card-icon"><ShieldCheck size={21} /></div>
            <h2>Create your Chamberlink account</h2>
            <p className="auth-card-lede">Create your free Chamberlink ID. This is not chamber membership—it gives you enough access to apply for your Solid Minerals Certificate of Origin and track it.</p>
            <div className="auth-form">
              <div>
                <label>Full name</label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter your full name" />
              </div>
              <div>
                <label>Work email</label>
                <Input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" placeholder="name@company.com" />
              </div>
              <div>
                <label>Company name</label>
                <Input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Registered company name" />
              </div>
              <div>
                <label>Password</label>
                <Input value={form.password} onChange={(e) => update("password", e.target.value)} type="password" placeholder="At least 8 characters" />
              </div>
              {error && <p className="submit-error">{error}</p>}
              <Button className="primary-button auth-submit" disabled={submitting} onClick={submit}>
                {submitting ? "Creating account…" : "Create account with email"} <ArrowRight size={16} />
              </Button>
            </div>
            <div className="auth-divider"><span>Already have an account?</span></div>
            <Link href="/login" className="auth-signin button-like">Sign in to Chamberlink</Link>
            <div className="account-path-note">
              <strong>After registration, you can:</strong>
              <span>Apply for a Certificate of Origin</span>
              <span>Become a Member of a Chamber</span>
              <span>Connect an Existing Membership ID</span>
            </div>
            <p className="auth-security"><LockKeyhole size={13} /> Secure account access powered by NACCIMA Chamberlink</p>
          </section>
        </main>
        <div className="auth-footnote">
          <Building2 size={15} />
          <span>Platform registration is separate from Chamber membership. After account creation, connect an existing membership ID or explore the Chamber directory.</span>
        </div>
      </div>
    </div>
  );
}
