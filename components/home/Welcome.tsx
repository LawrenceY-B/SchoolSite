"use client";

import Image from "next/image";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import ScrollWords from "@/components/ScrollWords";
import { home } from "@/lib/content";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

export default function Welcome() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const st = { trigger: "[data-frame]", start: "top 90%", end: "center 45%", scrub: true };
      gsap.fromTo("[data-frame]", { clipPath: "inset(18% 22% 18% 22% round 999px)" }, { clipPath: "inset(0% 0% 0% 0% round 40px)", ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-frame] img", { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="grid gap-12 px-6 py-28 md:grid-cols-12 md:gap-10 md:px-10 md:py-40">
      <p className="font-semibold tracking-[0.2em] text-ink/60 uppercase md:col-span-12">(01) Welcome</p>
      <ScrollWords className="font-display text-[clamp(1.9rem,4vw,4rem)] leading-[1.06] font-semibold tracking-tight md:col-span-7">
        {home.welcome}
      </ScrollWords>
      <div className="md:col-span-5 md:pt-4">
        <div data-frame className="relative aspect-[4/5] overflow-hidden rounded-[40px]">
          <Image src="/images/building.png" alt="The Shepherd's Infant School building" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>
        <Reveal className="mt-8">
          <p className="text-lg leading-relaxed">{home.welcomeBody}</p>
        </Reveal>
      </div>
    </section>
  );
}
