"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionItem = {
  title: string;
  meta?: string;
  content: ReactNode;
  /** Tailwind bg class shown when open/hovered. */
  color?: string;
};

export default function Accordion({ items, numbered = false, initial = -1 }: { items: AccordionItem[]; numbered?: boolean; initial?: number }) {
  const [open, setOpen] = useState(initial);
  const id = useId();

  return (
    <div className="border-t-2 border-ink">
      {items.map((item, i) => {
        const isOpen = open === i;
        const bg = item.color ?? "bg-sun";
        return (
          <div key={item.title} className="group relative border-b-2 border-ink">
            <div
              aria-hidden="true"
              className={`absolute inset-0 origin-bottom transition-transform duration-500 ease-out-expo ${bg} ${
                isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
              }`}
            />
            <h3 className="relative">
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 px-2 py-6 text-left md:gap-8 md:px-6 md:py-8"
              >
                {numbered && <span className="w-8 shrink-0 text-sm font-bold opacity-60">0{i + 1}</span>}
                <span className="flex-1 font-display text-[clamp(1.5rem,3.6vw,3.25rem)] leading-[1.05] font-bold tracking-tight">{item.title}</span>
                {item.meta && <span className="hidden shrink-0 font-semibold sm:block">{item.meta}</span>}
                <span className="relative grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink md:size-12">
                  <span className="absolute h-0.5 w-4 bg-ink" />
                  <span className={`absolute h-4 w-0.5 bg-ink transition-transform duration-500 ${isOpen ? "rotate-90 scale-y-0" : ""}`} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-p${i}`}
              role="region"
              aria-labelledby={`${id}-b${i}`}
              className={`relative grid transition-[grid-template-rows] duration-500 ease-out-expo ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="px-2 pb-8 md:px-6 md:pl-[4.5rem]">
                  {item.meta && <p className="mb-3 font-bold sm:hidden">{item.meta}</p>}
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
