"use client";

import Image from "next/image";
import { useRef } from "react";
import { home, type GalleryItem } from "@/lib/content";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

const tileColors: Record<string, string> = {
  sun: "bg-sun text-ink",
  sky: "bg-sky text-ink",
  cherry: "bg-cherry text-cream",
  leaf: "bg-leaf text-ink",
  cream: "bg-cream text-ink border-2 border-ink",
};

const Tile = ({ item }: { item: GalleryItem }) => {
  const height = item.tall ? "aspect-[3/4]" : "aspect-square";
  if (item.kind === "image") {
    return (
      <div className={`relative overflow-hidden rounded-[2rem] ${height}`}>
        <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
      </div>
    );
  }
  return (
    <div className={`group flex flex-col justify-between rounded-[2rem] p-6 md:p-8 ${height} ${tileColors[item.color]}`}>
      <span aria-hidden="true" className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-none font-black tracking-tighter transition-transform duration-700 group-hover:-rotate-6">
        {item.glyph}
      </span>
      <span className="font-display text-xl font-bold md:text-2xl">{item.label}</span>
    </div>
  );
};

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const columns = [home.gallery.slice(0, 2), home.gallery.slice(2, 5), home.gallery.slice(5)];

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-col]").forEach((col, i) => {
          gsap.fromTo(col, { yPercent: [12, -4, 20][i] }, { yPercent: [-10, 4, -14][i], ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden px-6 py-20 md:px-10 md:py-32">
      <div className="mb-14 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
        <h2 className="font-display text-[clamp(2.75rem,7vw,7rem)] leading-[0.88] font-black tracking-[-0.04em]">
          Life at
          <br />
          Shepherd&apos;s
        </h2>
        <p className="max-w-sm text-lg font-semibold">Stories, songs, paint on little fingers and a lot of laughter. Every single day.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {columns.map((col, i) => (
          <div key={i} data-col className={`flex flex-col gap-4 md:gap-6 ${i === 2 ? "col-span-2 grid grid-cols-2 md:col-span-1 md:flex" : ""}`}>
            {col.map((item, j) => (
              <Tile key={j} item={item} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
