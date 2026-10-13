import type { Metadata } from "next";
import Image from "next/image";
import Accordion from "@/components/Accordion";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DayTimeline from "@/components/academics/DayTimeline";
import Cta from "@/components/home/Cta";
import { academics } from "@/lib/content";

export const metadata: Metadata = { title: "Academics" };

const levelColors: Record<string, string> = { sun: "bg-sun", sky: "bg-sky", leaf: "bg-leaf" };

export default function AcademicsPage() {
  return (
    <>
      <PageHero eyebrow="Academics" title="Learn by play." intro={academics.intro} bg="bg-sun-soft" />

      <section className="grid gap-10 px-6 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <p className="font-semibold tracking-[0.2em] text-ink/60 uppercase md:col-span-12">(01) Our approach</p>
        <Reveal className="md:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]">
            <Image src="/images/sample.png" alt="A teacher leading a lesson" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal className="md:col-span-5 md:self-end">
          <p className="font-display text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.1] font-semibold tracking-tight">{academics.approach}</p>
        </Reveal>
      </section>

      <section className="px-6 pb-24 md:px-10 md:pb-36">
        <div className="mb-12 grid gap-6 md:grid-cols-12">
          <p className="font-semibold tracking-[0.2em] text-ink/60 uppercase md:col-span-4">(02) Learning stages</p>
          <h2 className="font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.9] font-black tracking-[-0.04em] md:col-span-8">Every age, its own adventure.</h2>
        </div>
        <Accordion
          numbered
          initial={0}
          items={academics.levels.map((level) => ({
            title: level.title,
            meta: level.meta,
            color: levelColors[level.color],
            content: (
              <div key={level.title} className="grid gap-6 md:grid-cols-2">
                <p className="text-lg leading-relaxed md:text-xl">{level.body}</p>
                <ul className="flex flex-wrap content-start gap-2">
                  {level.tags.map((tag) => (
                    <li key={tag} className="rounded-full border-2 border-ink px-4 py-1.5 font-semibold">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ),
          }))}
        />
      </section>

      <Marquee items={academics.subjects} duration={40} className="bg-ink py-6 font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-sun" />

      <DayTimeline />
      <Cta title="See it for yourself." label="Plan a visit" />
    </>
  );
}
