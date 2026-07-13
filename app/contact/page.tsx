import type { Metadata } from "next";
import CorporateNavbar from "@/components/cinematic/CorporateNavbar";
import CorporateFooter from "@/components/cinematic/CorporateFooter";
import ContactForm from "@/components/cinematic/ContactForm";
import { contactPage } from "@/lib/content/homeCopy";

export const metadata: Metadata = {
  title: "Request Onboarding",
  description: contactPage.body,
};

export default function ContactPage() {
  return (
    <>
      <CorporateNavbar />
      <main className="min-h-dvh bg-[#e7f0e3] px-6 pb-24 pt-32 md:px-12">
        <div className="mx-auto max-w-2xl">
          <span className="mb-4 block font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.2em] text-[#12503f]">
            {contactPage.eyebrow}
          </span>
          <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-medium leading-tight text-[#0f2318] md:text-5xl">
            {contactPage.headline}
          </h1>
          <p className="mt-4 font-[family-name:var(--font-public-sans)] text-base leading-relaxed text-[#4c5c4e]">
            {contactPage.body}
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>

          <p className="mt-6 text-center font-[family-name:var(--font-public-sans)] text-xs text-[#4c5c4e]">
            {contactPage.fallbackNote}
          </p>
        </div>
      </main>
      <CorporateFooter />
    </>
  );
}
