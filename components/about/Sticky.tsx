import Reveal from "@/components/Reveal";

/** Title sticks on the left while the text scrolls past on the right. */
export default function Sticky({ index, title, lead, more }: { index: string; title: string; lead: string; more?: string }) {
  return (
    <section className="grid gap-8 border-t-2 border-ink/10 px-6 py-20 md:grid-cols-12 md:px-10 md:py-32">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-32">
          <p className="mb-3 font-semibold tracking-[0.2em] text-ink/60 uppercase">{index}</p>
          <h2 className="font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.9] font-black tracking-[-0.04em]">{title}</h2>
        </div>
      </div>
      <Reveal className="space-y-8 md:col-span-8 md:pt-24">
        <p className="font-display text-[clamp(1.6rem,3vw,3rem)] leading-[1.1] font-semibold tracking-tight">{lead}</p>
        {more && <p className="max-w-2xl text-lg leading-relaxed md:text-xl">{more}</p>}
      </Reveal>
    </section>
  );
}
