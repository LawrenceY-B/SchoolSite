"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, reducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import { whenReady } from "@/lib/ready";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** What slides up out of its line mask. */
  by?: "lines" | "words" | "chars";
  delay?: number;
  /** Play as the page appears instead of on scroll. */
  onLoad?: boolean;
};

export default function SplitHeading({ as: Tag = "h2", children, className = "", by = "lines", delay = 0, onLoad }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      let off = () => {};
      SplitText.create(el, {
        type: by === "lines" ? "lines" : `lines,${by}`,
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: "visible" });
          const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
          const tween = gsap.from(targets, {
            yPercent: 115,
            rotate: by === "chars" ? 6 : 2,
            duration: 1.1,
            ease: "expo.out",
            stagger: by === "chars" ? 0.025 : 0.08,
            delay,
            paused: onLoad,
            scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%", once: true },
          });
          if (onLoad) {
            off();
            off = whenReady(() => tween.play());
          }
          return tween;
        },
      });
      return () => off();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`split-pending ${className}`}>
      {children}
    </Tag>
  );
}
