"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyForm({ initialValue = "" }: { initialValue?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="verify-field">
      <label htmlFor="certNumber" className="sr-only">Certificate number</label>
      <input
        id="certNumber"
        name="certNumber"
        type="text"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. NAC-2026-004821"
        autoComplete="off"
        autoCapitalize="characters"
      />
      <Button type="submit" className="primary-button">Search <SearchCheck size={16} /></Button>
    </form>
  );
}
