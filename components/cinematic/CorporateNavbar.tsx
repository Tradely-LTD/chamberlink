"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav } from "@/lib/content/homeCopy";

export default function CorporateNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
        scrolled ? "bg-[#0a1f16]/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-tight text-[#f2f6f0]"
        >
          {nav.wordmark}
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {nav.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-[family-name:var(--font-public-sans)] text-sm text-[#f2f6f0]/70 transition-colors hover:text-[#34c28d]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={nav.ctaSecondary.href}
            className="hidden font-[family-name:var(--font-public-sans)] text-sm text-[#f2f6f0]/70 transition-colors hover:text-[#f2f6f0] md:block"
          >
            {nav.ctaSecondary.label}
          </a>
          <Link
            href={nav.ctaPrimary.href}
            className="group hidden items-center gap-1.5 rounded-full bg-[#34c28d] px-5 py-2.5 font-[family-name:var(--font-public-sans)] text-sm font-semibold text-[#0a1f16] transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            {nav.ctaPrimary.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-[#f2f6f0] lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-[#0a1f16] px-6 py-6 lg:hidden">
          {nav.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-[family-name:var(--font-public-sans)] text-base text-[#f2f6f0]/80"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.ctaPrimary.href}
            onClick={() => setOpen(false)}
            className="mt-3 rounded-full bg-[#34c28d] px-5 py-3 text-center font-[family-name:var(--font-public-sans)] text-sm font-semibold text-[#0a1f16]"
          >
            {nav.ctaPrimary.label}
          </Link>
        </div>
      )}
    </nav>
  );
}
