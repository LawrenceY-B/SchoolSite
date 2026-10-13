"use client";

import { useRef } from "react";
import Doodle from "@/components/Doodle";
import { home } from "@/lib/content";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

const cardColors = ["bg-sun text-ink", "bg-sky text-ink", "bg-cherry text-cream", "bg-leaf text-ink"];

export default function Why() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const mm = gsap.matchMedia();
      const draw = (card: Element, scrollTrigger: ScrollTrigger.Vars) =>
        gsap.fromTo(card.querySelectorAll("[data-draw]"), { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 1.6, ease: "power2.inOut", stagger: 0.15, scrollTrigger });

      mm.add("(min-width: 768px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const scroller = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: root.current, pin: true, scrub: 1, end: () => `+=${distance()}`, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
          draw(card, { trigger: card, containerAnimation: scroller, start: "left 75%" });
          gsap.from(card, { rotate: 6, yPercent: 8, ease: "none", scrollTrigger: { trigger: card, containerAnimation: scroller, start: "left right", end: "left 40%", scrub: true } });
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => draw(card, { trigger: card, start: "top 75%" }));
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden bg-ink text-cream md:h-[100svh]">
      <div ref={track} className="flex h-full flex-col gap-6 px-6 py-24 md:w-max md:flex-row md:items-center md:gap-8 md:px-10 md:py-0">
        <div className="shrink-0 md:w-[38vw] md:pr-10">
          <p className="mb-6 font-semibold tracking-[0.2em] text-cream/60 uppercase">(02) Why Shepherd&apos;s</p>
          <h2 className="font-display text-[clamp(2.75rem,6vw,6.5rem)] leading-[0.9] font-black tracking-[-0.04em]">
            Why families <span className="text-sun">choose</span> us.
          </h2>
          <p className="mt-8 hidden max-w-sm text-lg text-cream/70 md:block">Keep scrolling. Four little reasons, each with a big heart.</p>
        </div>
        {home.why.map((item, i) => (
          <article
            key={item.title}
            data-card
            className={`relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 md:h-[72vh] md:w-[min(42vw,36rem)] md:p-12 ${cardColors[i]}`}
          >
            <span className="font-display text-7xl font-black tracking-tighter opacity-90 md:text-8xl">0{i + 1}</span>
            <Doodle name={item.doodle} className="my-6 size-36 self-end md:absolute md:top-10 md:right-10 md:my-0 md:size-48" />
            <div>
              <h3 className="font-display text-[clamp(1.9rem,3vw,3rem)] leading-[1] font-bold tracking-tight">{item.title}</h3>
              <p className="mt-4 max-w-md text-lg leading-snug font-semibold opacity-85">{item.body}</p>
            </div>
          </article>
        ))}
        <div aria-hidden="true" className="hidden w-[10vw] shrink-0 md:block" />
      </div>
    </section>
  );
}
