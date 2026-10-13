"use client";

import { useRef } from "react";
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Endless ticker that speeds up with scroll velocity. */
export default function Marquee({
  items,
  className = "",
  reverse = false,
  duration = 30,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const tween = gsap.fromTo(
        "[data-track]",
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
      );
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
          gsap.to(tween, { timeScale: boost, duration: 0.2, overwrite: true });
          gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
        },
      });
    },
    { scope: root },
  );

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 md:px-10">{item}</span>
          <svg viewBox="0 0 24 24" className="size-[0.55em] shrink-0" aria-hidden="true">
            <path d="M12 0 14.5 9.5 24 12 14.5 14.5 12 24 9.5 14.5 0 12 9.5 9.5Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`}>
      <div data-track className="flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
