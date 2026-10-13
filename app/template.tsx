"use client";

import { useRef, type ReactNode } from "react";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";
import { isReady } from "@/lib/ready";

/** Three brand-coloured curtains peel away each time you navigate to a page. */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wipe = ref.current!.querySelector("[data-wipe]");
      // On a fresh load the preloader is the curtain; the wipe is for navigating between pages.
      if (reducedMotion() || !isReady()) {
        gsap.set(wipe, { display: "none" });
        return;
      }
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]").reverse();
      const tl = gsap
        .timeline({ paused: true })
        .to(panels, { yPercent: -100, duration: 0.85, ease: "expo.inOut", stagger: 0.09 })
        .set(wipe, { display: "none" });
      tl.play();
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <div data-wipe aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
        <div data-panel className="absolute inset-0 rounded-b-[3rem] bg-leaf" />
        <div data-panel className="absolute inset-0 rounded-b-[3rem] bg-sky" />
        <div data-panel className="absolute inset-0 rounded-b-[3rem] bg-sun" />
      </div>
      {children}
    </div>
  );
}
