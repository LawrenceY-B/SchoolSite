"use client";

import { useRef } from "react";
import { admissions } from "@/lib/content";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

const fills: Record<string, string> = { sun: "text-sun", sky: "text-sky", cherry: "text-cherry" };

/** Giant outlined step numbers that fill with colour as you scroll past them. */
export default function Steps() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
        gsap.fromTo(
          step.querySelector("[data-fill]"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: step, start: "top 75%", end: "center 45%", scrub: true } },
        );
        gsap.from(step.querySelector("[data-copy]"), { y: 60, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: step, start: "top 65%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-6 py-24 md:px-10 md:py-36">
      <p className="mb-6 font-semibold tracking-[0.2em] text-ink/60 uppercase">(01) Three easy steps</p>
      <ol>
        {admissions.steps.map((step, i) => (
          <li key={step.title} data-step className="grid items-center gap-4 border-b-2 border-ink/10 py-10 last:border-0 md:grid-cols-12 md:gap-10 md:py-16">
            <div aria-hidden="true" className="relative font-display text-[clamp(8rem,24vw,22rem)] leading-[0.8] font-black tracking-[-0.06em] md:col-span-5">
              <span className="text-outline">0{i + 1}</span>
              <span data-fill className={`absolute inset-0 ${fills[step.color]}`} style={{ WebkitTextStroke: "2px var(--color-ink)" }}>
                0{i + 1}
              </span>
            </div>
            <div data-copy className="md:col-span-7">
              <h3 className="font-display text-[clamp(2rem,4vw,4rem)] leading-[1] font-bold tracking-tight">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed md:text-xl">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
