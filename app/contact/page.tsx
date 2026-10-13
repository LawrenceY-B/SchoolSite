import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import CopyLine from "@/components/contact/CopyLine";
import MapFrame from "@/components/contact/MapFrame";
import { contact, school } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Say hello." intro={contact.intro} bg="bg-leaf" />
      <section className="grid gap-16 px-6 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-36">
        <Reveal className="md:col-span-5">
          <CopyLine label="Email" value={school.email} href={`mailto:${school.email}`} />
          <CopyLine label="Phone" value={school.phone} href={school.phoneHref} />
          <div className="border-t-2 border-b-2 border-ink py-5">
            <p className="mb-1 text-sm font-bold tracking-[0.2em] text-ink/60 uppercase">Visit</p>
            <address className="text-xl leading-relaxed font-semibold not-italic">
              {school.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3">{school.hours}</p>
          </div>
        </Reveal>
        <div className="md:col-span-6 md:col-start-7">
          <h2 className="mb-8 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[0.95] font-black tracking-[-0.03em]">Send us a note</h2>
          <ContactForm />
        </div>
      </section>
      <MapFrame />
    </>
  );
}
