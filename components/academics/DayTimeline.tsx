"use client";

import { useRef } from "react";
import { academics } from "@/lib/content";
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

const dots = ["group-[.is-on]:bg-sun", "group-[.is-on]:bg-sky", "group-[.is-on]:bg-cherry", "group-[.is-on]:bg-leaf"];

/** A day at school: the line fills as you scroll and each stop lights up. */
export default function DayTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const stops = gsap.utils.toArray<HTMLElement>("[data-stop]");
      if (reducedMotion()) {
        stops.forEach((s) => s.classList.add("is-on"));
        return;
      }
      gsap.fromTo("[data-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-line]", start: "top 60%", end: "bottom 60%", scrub: true } });
      stops.forEach((stop) => {
        gsap.from(stop.querySelector("[data-body]"), { x: 40, autoAlpha: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: stop, start: "top 75%", once: true } });
        ScrollTrigger.create({ trigger: stop, start: "top 60%", toggleClass: "is-on" });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-6 py-24 md:px-10 md:py-36">
      <div className="mb-16 grid gap-6 md:grid-cols-12">
        <p className="font-semibold tracking-[0.2em] text-ink/60 uppercase md:col-span-4">(03) A day at Shepherd&apos;s</p>
        <h2 className="font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.9] font-black tracking-[-0.04em] md:col-span-8">From hello hugs to goodbye songs.</h2>
      </div>
      <ol data-line className="relative md:ml-[33.33%]">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-ink/10" />
        <span aria-hidden="true" data-fill className="absolute top-2 bottom-2 left-[11px] w-0.5 origin-top bg-ink" />
        {academics.day.map((item, i) => (
          <li key={item.time} data-stop className="group relative grid grid-cols-[24px_1fr] gap-6 pb-12 last:pb-0 md:gap-10">
            <span
              aria-hidden="true"
              className={`relative mt-2 size-6 rounded-full border-2 border-ink bg-cream transition-[transform,background-color] duration-500 group-[.is-on]:scale-125 ${dots[i % dots.length]}`}
            />
            <div data-body className="grid gap-1 md:grid-cols-[10rem_1fr] md:gap-8">
              <time className="font-display text-4xl font-black tracking-tight md:text-5xl">{item.time}</time>
              <div>
                <h3 className="font-display text-2xl font-bold md:text-3xl">{item.title}</h3>
                <p className="mt-1 text-lg">{item.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
