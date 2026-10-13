import type { ReactNode } from "react";

/** Circular text ring that slowly spins around its centre content. */
export default function RotatingBadge({ text, children, className = "" }: { text: string; children: ReactNode; className?: string }) {
  const id = `ring-${text.replace(/[^a-z]/gi, "").slice(0, 24)}`;
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden="true" className="animate-spin-slow absolute inset-0 size-full">
        <defs>
          <path id={id} d="M100 100m-84 0a84 84 0 1 1 168 0a84 84 0 1 1-168 0" />
        </defs>
        <text className="fill-current font-display text-[15px] font-bold tracking-[0.18em] uppercase">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}
