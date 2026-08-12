"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function VerifySearchForm({ initialValue = "" }: { initialValue?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="certNumber" className="sr-only">
        Certificate number
      </label>
      <input
        id="certNumber"
        name="certNumber"
        type="text"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. SM-COO-2026-00412"
        autoComplete="off"
        autoCapitalize="characters"
        className="w-full flex-1 rounded-full border border-border bg-white px-6 py-4 font-[family-name:var(--font-ibm-mono)] text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-[family-name:var(--font-public-sans)] text-sm font-semibold text-on-primary transition-transform hover:-translate-y-0.5"
      >
        <Search className="h-4 w-4" />
        Verify
      </button>
    </form>
  );
}
