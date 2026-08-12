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

  // The hero (the only section behind a transparent navbar) is dark, so the
  // unscrolled state reads light-on-dark. Every section below it is
  // light-mode, so scrolling flips the bar to a solid light surface.
  const dark = !scrolled;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className={`font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-tight transition-colors ${
            dark ? "text-white" : "text-foreground"
          }`}
        >
          {nav.wordmark}
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {nav.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-[family-name:var(--font-public-sans)] text-sm transition-colors ${
                dark ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={nav.ctaSecondary.href}
            className={`hidden cursor-pointer font-[family-name:var(--font-public-sans)] text-sm transition-colors md:block ${
              dark ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {nav.ctaSecondary.label}
          </a>
          <Link
            href={nav.ctaPrimary.href}
            className="group hidden cursor-pointer items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 font-[family-name:var(--font-public-sans)] text-sm font-semibold text-primary-deep transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            {nav.ctaPrimary.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className={`cursor-pointer rounded-lg p-2 transition-colors lg:hidden ${dark ? "text-white" : "text-foreground"}`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-border bg-background px-6 py-6 lg:hidden">
          {nav.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-[family-name:var(--font-public-sans)] text-base text-foreground/85"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={nav.ctaSecondary.href}
            onClick={() => setOpen(false)}
            className="py-3 font-[family-name:var(--font-public-sans)] text-base text-foreground/85"
          >
            {nav.ctaSecondary.label}
          </a>
          <Link
            href={nav.ctaPrimary.href}
            onClick={() => setOpen(false)}
            className="mt-3 cursor-pointer rounded-full bg-accent px-5 py-3 text-center font-[family-name:var(--font-public-sans)] text-sm font-semibold text-primary-deep"
          >
            {nav.ctaPrimary.label}
          </Link>
        </div>
      )}
    </nav>
  );
}
