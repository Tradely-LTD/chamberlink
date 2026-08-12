"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { nav } from "@/lib/content/homeCopy";

export default function CorporateNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loginOpen) return;
    const onClick = (e: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) setLoginOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLoginOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [loginOpen]);

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
          <Link
            href={nav.register.href}
            className={`hidden cursor-pointer font-[family-name:var(--font-public-sans)] text-sm transition-colors md:block ${
              dark ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {nav.register.label}
          </Link>

          <div ref={loginRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setLoginOpen((v) => !v)}
              aria-expanded={loginOpen}
              aria-haspopup="true"
              className={`inline-flex cursor-pointer items-center gap-1 font-[family-name:var(--font-public-sans)] text-sm transition-colors ${
                dark ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {nav.login.label}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${loginOpen ? "rotate-180" : ""}`} />
            </button>

            {loginOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 overflow-hidden rounded-2xl border border-border bg-background p-2 shadow-xl">
                {nav.login.options.map((option) => (
                  <a
                    key={option.label}
                    href={option.href}
                    className="block cursor-pointer rounded-xl px-4 py-3 transition-colors hover:bg-muted"
                    onClick={() => setLoginOpen(false)}
                  >
                    <span className="block font-[family-name:var(--font-public-sans)] text-sm font-semibold text-foreground">
                      {option.label}
                    </span>
                    <span className="mt-0.5 block font-[family-name:var(--font-public-sans)] text-xs leading-snug text-muted-foreground">
                      {option.detail}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link
            href={nav.ctaPrimary.href}
            className="group hidden cursor-pointer items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 font-[family-name:var(--font-public-sans)] text-sm font-semibold text-white transition-colors hover:bg-gold-hover md:inline-flex"
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

          <div className="mt-2 border-t border-border pt-4">
            <Link
              href={nav.register.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-[family-name:var(--font-public-sans)] text-base font-semibold text-foreground"
            >
              {nav.register.label}
            </Link>
            <p className="mb-3 font-[family-name:var(--font-public-sans)] text-xs leading-relaxed text-muted-foreground">
              {nav.register.detail}
            </p>

            <p className="mb-1 font-[family-name:var(--font-ibm-mono)] text-[11px] uppercase tracking-wider text-muted-foreground">
              {nav.login.label}
            </p>
            {nav.login.options.map((option) => (
              <a
                key={option.label}
                href={option.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-[family-name:var(--font-public-sans)] text-sm text-foreground/85"
              >
                {option.label}
              </a>
            ))}
          </div>

          <Link
            href={nav.ctaPrimary.href}
            onClick={() => setOpen(false)}
            className="mt-4 cursor-pointer rounded-full bg-gold px-5 py-3 text-center font-[family-name:var(--font-public-sans)] text-sm font-semibold text-white"
          >
            {nav.ctaPrimary.label}
          </Link>
        </div>
      )}
    </nav>
  );
}
