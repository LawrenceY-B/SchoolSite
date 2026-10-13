import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import PageHero from "@/components/PageHero";
import Steps from "@/components/admissions/Steps";
import Cta from "@/components/home/Cta";
import { admissions } from "@/lib/content";

export const metadata: Metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <>
      <PageHero eyebrow="Admissions" title="Join the flock." intro={admissions.intro} bg="bg-sky" />
      <Steps />
      <section className="grid gap-10 px-6 pb-24 md:grid-cols-12 md:px-10 md:pb-36">
        <div className="md:col-span-4">
          <p className="mb-3 font-semibold tracking-[0.2em] text-ink/60 uppercase">(02) Good questions</p>
          <h2 className="font-display text-[clamp(2.75rem,5vw,5rem)] leading-[0.9] font-black tracking-[-0.04em]">Parents often ask.</h2>
        </div>
        <div className="md:col-span-8">
          <Accordion
            items={admissions.faq.map((q) => ({
              title: q.title,
              color: "bg-sky",
              content: <p key={q.title} className="max-w-2xl text-lg leading-relaxed md:text-xl">{q.content}</p>,
            }))}
          />
        </div>
      </section>
      <Cta title="Ready when you are." href="/contact" label="Get in touch" />
    </>
  );
}
