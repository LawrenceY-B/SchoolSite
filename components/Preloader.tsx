"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";
import { markReady } from "@/lib/ready";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const finish = () => {
        markReady();
        setDone(true);
      };
      if (reducedMotion()) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.3, delay: 0.2, onComplete: finish });
        return;
      }
      const counter = { v: 0 };
      const num = root.current!.querySelector<HTMLElement>("[data-count]")!;
      gsap
        .timeline({ onComplete: finish })
        .from("[data-logo]", { scale: 0.4, rotate: -20, autoAlpha: 0, duration: 0.8, ease: "back.out(2)" })
        .from("[data-motto] > span", { yPercent: 110, duration: 0.7, stagger: 0.06, ease: "expo.out" }, 0.15)
        .to(
          counter,
          {
            v: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              num.textContent = String(Math.round(counter.v));
            },
          },
          0.1,
        )
        .to("[data-bar]", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.1)
        .to("[data-inner]", { y: -40, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "+=0.1")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.15")
        .add(markReady, "-=0.55");
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      data-preloader
      className="fixed inset-0 z-[100] flex items-center justify-center rounded-b-[2.5rem] bg-sun text-ink"
      role="status"
      aria-label="Loading"
    >
      <div data-inner className="flex flex-col items-center gap-6">
        <div data-logo className="rounded-full bg-cream p-3 shadow-[0_8px_0_var(--color-ink)]">
          <Image src="/images/logo.png" alt="" width={96} height={99} priority />
        </div>
        <p data-motto className="flex overflow-hidden font-display text-2xl font-bold tracking-tight">
          {"Guide & Care".split("").map((c, i) => (
            <span key={i} className="inline-block whitespace-pre">
              {c}
            </span>
          ))}
        </p>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-ink/15">
          <div data-bar className="h-full origin-left scale-x-0 rounded-full bg-ink" />
        </div>
      </div>
      <span
        data-count
        className="absolute right-6 bottom-4 font-display text-[clamp(4rem,14vw,11rem)] leading-none font-black tracking-tighter md:right-10"
      >
        0
      </span>
    </div>
  );
}
