"use client";

import { useRef, type ReactNode } from "react";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

/** Children fade and rise into place when scrolled into view. */
export default function Reveal({
  children,
  className = "",
  stagger = 0.1,
  y = 48,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion() || !ref.current) return;
      gsap.from(ref.current.children, {
        y,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
