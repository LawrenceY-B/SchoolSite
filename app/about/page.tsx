import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import RotatingBadge from "@/components/RotatingBadge";
import ScrollWords from "@/components/ScrollWords";
import Sticky from "@/components/about/Sticky";
import Values from "@/components/about/Values";
import Cta from "@/components/home/Cta";
import { about, school } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Guide & care."
        intro={about.intro}
        bg="bg-sun"
        art={
          <div className="absolute bottom-12 left-10 hidden md:block">
            <RotatingBadge text="The Shepherd's Infant School · Guide and Care · " className="size-44 lg:size-56">
              <span className="grid size-24 place-items-center rounded-full bg-cream lg:size-32">
                <Image src="/images/logo.png" alt="" width={84} height={87} className="w-14 lg:w-20" />
              </span>
            </RotatingBadge>
          </div>
        }
      />

      <section className="px-6 py-24 md:px-10 md:py-36">
        <p className="mb-8 font-semibold tracking-[0.2em] text-ink/60 uppercase">(00) Our story</p>
        <ScrollWords className="max-w-6xl font-display text-[clamp(1.9rem,4vw,4rem)] leading-[1.06] font-semibold tracking-tight">
          {about.story}
        </ScrollWords>
      </section>

      <Sticky index="(01)" title="Our mission" lead={about.mission} more={about.missionMore} />
      <Sticky index="(02)" title="Our vision" lead={about.vision} />
      <Values />

      <section className="mx-3 grid gap-12 rounded-[2.5rem] bg-ink px-6 py-20 text-cream md:mx-6 md:grid-cols-12 md:rounded-[4rem] md:px-14 md:py-28">
        <div className="flex justify-center md:col-span-5">
          <RotatingBadge text="Proprietress · Founder · Guide and Care · " className="size-72 text-sun md:size-[26rem]">
            <span className="relative size-52 overflow-hidden rounded-full md:size-[19rem]">
              <Image src="/images/mee.jpg" alt={`${school.proprietress}, proprietress`} fill sizes="(min-width: 768px) 19rem, 13rem" className="object-cover" />
            </span>
          </RotatingBadge>
        </div>
        <Reveal className="space-y-6 md:col-span-7 md:self-center">
          <p className="font-semibold tracking-[0.2em] text-cream/60 uppercase">(04) A note from our proprietress</p>
          {about.letter.map((line, i) => (
            <p key={i} className={i === 0 ? "font-display text-3xl font-bold" : "text-lg leading-relaxed md:text-xl"}>
              {line}
            </p>
          ))}
          <p className="pt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none font-black text-sun italic">Hetty Yirenkyi-Boafo</p>
        </Reveal>
      </section>

      <Cta title="We'd love to meet you." />
    </>
  );
}
