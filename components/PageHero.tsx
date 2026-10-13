import type { ReactNode } from "react";
import SplitHeading from "./SplitHeading";

/** Coloured, rounded page header with a huge character-by-character title. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  bg,
  art,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  bg: string;
  art?: ReactNode;
}) {
  return (
    <section className={`relative overflow-hidden rounded-b-[2.5rem] px-6 pt-36 pb-16 md:rounded-b-[4rem] md:px-10 md:pt-48 md:pb-24 ${bg}`}>
      {art}
      <p className="relative mb-6 font-semibold uppercase tracking-[0.2em] opacity-70">{eyebrow}</p>
      <SplitHeading
        as="h1"
        by="chars"
        onLoad
        delay={0.15}
        className="relative font-display text-[clamp(3.5rem,13vw,13rem)] leading-[0.85] font-black tracking-[-0.045em]"
      >
        {title}
      </SplitHeading>
      <div className="relative mt-10 grid md:mt-16 md:grid-cols-12">
        <SplitHeading as="p" onLoad delay={0.5} className="text-xl leading-snug font-semibold md:col-span-6 md:col-start-7 md:text-2xl">
          {intro}
        </SplitHeading>
      </div>
    </section>
  );
}
