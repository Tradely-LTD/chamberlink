import Link from "next/link";
import { footer, nav } from "@/lib/content/homeCopy";

export default function CorporateFooter() {
  return (
    <footer className="border-t border-border bg-muted px-6 py-16 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold text-foreground">
              {nav.wordmark}
            </span>
            <p className="mt-4 max-w-sm font-[family-name:var(--font-public-sans)] text-sm leading-relaxed text-muted-foreground">
              {footer.description}
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h6 className="font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-widest text-muted-foreground/70">
                {col.title}
              </h6>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="cursor-pointer font-[family-name:var(--font-public-sans)] text-sm text-foreground/75 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="font-[family-name:var(--font-public-sans)] text-xs text-muted-foreground">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
