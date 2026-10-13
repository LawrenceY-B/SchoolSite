"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, reducedMotion, SplitText, useGSAP } from "@/lib/gsap";

/** A statement whose words ink in as you scroll through it. */
export default function ScrollWords({
  as: Tag = "p",
  children,
  className = "",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion() || !ref.current) return;
      const split = SplitText.create(ref.current, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 50%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
