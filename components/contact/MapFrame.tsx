"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { school } from "@/lib/content";

/** Map embed in a rounded frame that tilts towards the pointer. */
export default function MapFrame() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !window.matchMedia("(hover: hover)").matches) return;
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      rx(((e.clientY - b.top) / b.height - 0.5) * -6);
      ry(((e.clientX - b.left) / b.width - 0.5) * 8);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="px-3 pb-24 [perspective:1400px] md:px-6 md:pb-36">
      <div ref={ref} className="overflow-hidden rounded-[2.5rem] border-2 border-ink bg-sky shadow-[0_14px_0_var(--color-ink)] md:rounded-[4rem]">
        <iframe
          title="Map showing The Shepherd's Infant School in Madina, Accra"
          src={school.mapEmbed}
          className="block h-[60vh] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
