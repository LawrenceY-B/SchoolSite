"use client";

import { useRef } from "react";
import { home } from "@/lib/content";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-value]").forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-6 py-28 md:px-10 md:py-40">
      <p className="mb-12 font-semibold tracking-[0.2em] text-ink/60 uppercase">(03) In numbers</p>
      <dl className="grid gap-12 md:grid-cols-3 md:gap-6">
        {home.stats.map((stat) => (
          <div key={stat.label} className="border-t-2 border-ink pt-6">
            <dd className="font-display text-[clamp(5rem,12vw,11rem)] leading-[0.85] font-black tracking-[-0.06em]">
              {stat.prefix && <span className="text-cherry">{stat.prefix}</span>}
              <span data-value={stat.value}>{stat.value}</span>
              {stat.suffix && <span className="text-sun-deep">{stat.suffix}</span>}
            </dd>
            <dt className="mt-4 text-lg font-semibold">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
