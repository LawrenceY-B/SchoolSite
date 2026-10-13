"use client";

import { useState } from "react";

/** A contact detail you can open or copy with one click. */
export default function CopyLine({ label, value, href }: { label: string; value: string; href: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable; the link still works */
    }
  };
  return (
    <div className="border-t-2 border-ink py-5">
      <p className="mb-1 text-sm font-bold tracking-[0.2em] text-ink/60 uppercase">{label}</p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href={href} className="font-display text-[clamp(1.4rem,2.6vw,2.25rem)] font-bold tracking-tight break-all hover:text-cherry">
          {value}
        </a>
        <button type="button" onClick={copy} className="rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold transition-colors hover:bg-ink hover:text-cream">
          <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
