"use client";

import Link from "next/link";
import { useRef } from "react";
import KidsCrowd from "@/components/KidsCrowd";
import Magnetic from "@/components/Magnetic";
import { home } from "@/lib/content";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";
import { whenReady } from "@/lib/ready";

const Word = ({ children, className = "" }: { children: string; className?: string }) => (
  <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
    <span data-word className={`inline-block ${className}`}>
      {children}
    </span>
  </span>
);

const Star = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 0 14.5 9.5 24 12 14.5 14.5 12 24 9.5 14.5 0 12 9.5 9.5Z" fill="currentColor" />
  </svg>
);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const intro = gsap
        .timeline({ paused: true, delay: 0.15 })
        .from("[data-sun]", { scale: 0, duration: 1.6, ease: "elastic.out(1, 0.55)" })
        .from("[data-word]", { yPercent: 115, rotate: 8, duration: 1.2, ease: "expo.out", stagger: 0.08 }, 0.05)
        .from("[data-fade]", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.5)
        .from("[data-crowd]", { yPercent: 25, autoAlpha: 0, duration: 1.4, ease: "power3.out" }, 0.3)
        .from("[data-doodle]", { scale: 0, rotate: -120, duration: 0.9, stagger: 0.08, ease: "back.out(2.5)" }, 0.7);
      const off = whenReady(() => intro.play());

      // Explicit start values: the intro's .from() has already set sun/crowd to their
      // hidden state, which plain .to() tweens would otherwise record as the scroll start.
      const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      const parallax = { ease: "none", immediateRender: false, scrollTrigger: scrub };
      gsap.fromTo("[data-sun]", { yPercent: 0, scale: 1 }, { yPercent: 35, scale: 1.25, ...parallax });
      gsap.fromTo("[data-copy]", { yPercent: 0 }, { yPercent: -25, ...parallax });
      gsap.fromTo("[data-crowd]", { yPercent: 0 }, { yPercent: 12, ...parallax });
      return off;
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-cream">
      {/* Sun */}
      <div
        data-sun
        aria-hidden="true"
        className="absolute top-[8vh] right-[-22vw] size-[min(95vw,52rem)] rounded-full bg-sun md:right-[-8vw] md:size-[min(62vw,52rem)]"
      />
      <div aria-hidden="true" className="absolute top-[22vh] left-[46%] hidden md:block">
        <div data-doodle><Star className="animate-float size-10 text-cherry" /></div>
      </div>
      <div aria-hidden="true" className="absolute top-[14vh] right-[30%] hidden md:block">
        <div data-doodle><div className="animate-float size-6 rounded-full bg-sky [animation-delay:-2s]" /></div>
      </div>
      <div aria-hidden="true" className="absolute top-[46vh] right-[8%]">
        <div data-doodle><Star className="animate-float size-7 text-blue [animation-delay:-4s]" /></div>
      </div>

      {/* Copy */}
      <div data-copy className="relative z-10 px-5 pt-32 md:px-10 md:pt-40">
        <h1 className="font-display text-[clamp(3.6rem,12.5vw,12.5rem)] leading-[0.84] font-black tracking-[-0.05em]">
          <span className="sr-only">Little feet. Big futures.</span>
          <span aria-hidden="true" className="block">
            <Word>Little</Word> <Word>feet.</Word>
          </span>
          <span aria-hidden="true" className="block md:pl-[9vw]">
            <Word className="text-cherry">Big</Word> <Word>futures.</Word>
          </span>
        </h1>
        <div className="mt-6 flex max-w-xl flex-col gap-5 md:absolute md:top-[calc(8rem+2vw)] md:right-10 md:mt-0 md:max-w-[min(24rem,28vw)] lg:top-[calc(9rem+1vw)]">
          <p data-fade className="text-lg leading-snug font-semibold lg:text-xl">
            {home.heroIntro}
          </p>
          <div data-fade className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-display font-medium text-cream transition-colors hover:bg-cherry"
              >
                Book a visit
                <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>
            <Link href="/about" className="rounded-full px-5 py-4 font-display font-medium underline decoration-2 underline-offset-4 hover:text-cherry">
              Meet our school
            </Link>
          </div>
        </div>
      </div>

      {/* The crowd */}
      <div data-crowd className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] md:h-[44%]">
        <KidsCrowd spread={200} sink={90} />
      </div>

    </section>
  );
}
