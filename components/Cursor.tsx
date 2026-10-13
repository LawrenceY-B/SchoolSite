"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** A soft sun-coloured blob that trails the pointer and swells over anything clickable. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest("a, button, [data-cursor], input, textarea, label");
      gsap.to(el, { scale: hit ? 3.2 : 1, duration: 0.35, ease: "power3.out" });
    };
    const leave = () => {
      shown = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[200] size-5 rounded-full border border-ink/40 bg-sun opacity-0 mix-blend-multiply"
    />
  );
}
