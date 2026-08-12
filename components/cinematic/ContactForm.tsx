"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { NIGERIA_STATES, ONBOARDING_EMAIL } from "@/lib/content/homeCopy";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 font-[family-name:var(--font-public-sans)] text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30";
const labelClass =
  "mb-1.5 block font-[family-name:var(--font-ibm-mono)] text-[11px] uppercase tracking-wider text-muted-foreground";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const chamberName = String(form.get("chamberName") ?? "").trim();
    const state = String(form.get("state") ?? "").trim();
    const contactName = String(form.get("contactName") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const subject = `Chamber Onboarding Request: ${chamberName}`;
    const bodyLines = [
      `Chamber name: ${chamberName}`,
      `State: ${state}`,
      `Contact person: ${contactName}${role ? ` (${role})` : ""}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      message || "(No additional message)",
    ];
    const mailto = `mailto:${ONBOARDING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;

    setSubmitted(true);
    window.location.href = mailto;
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" strokeWidth={1.5} />
        <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-2xl text-foreground">
          Your email client should have opened
        </h2>
        <p className="mt-3 font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-muted-foreground">
          If it didn&apos;t, email us directly at{" "}
          <a href={`mailto:${ONBOARDING_EMAIL}`} className="cursor-pointer font-semibold text-primary underline">
            {ONBOARDING_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-6 md:p-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="chamberName">Chamber name *</label>
          <input id="chamberName" name="chamberName" required className={inputClass} placeholder="e.g. Kwara Chamber of Commerce" />
        </div>
        <div>
          <label className={labelClass} htmlFor="state">State *</label>
          <select id="state" name="state" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select a state</option>
            {NIGERIA_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="contactName">Contact person *</label>
          <input id="contactName" name="contactName" required className={inputClass} placeholder="Full name" />
        </div>
        <div>
          <label className={labelClass} htmlFor="role">Role / title</label>
          <input id="role" name="role" className={inputClass} placeholder="e.g. Chamber Secretary" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required className={inputClass} placeholder="+234..." />
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClass} htmlFor="message">Anything else we should know?</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClass}
          placeholder="Membership size, current systems, timeline — whatever's useful."
        />
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold text-on-primary transition-transform hover:-translate-y-0.5"
      >
        Send Request
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </form>
  );
}
