import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import SplitHeading from "@/components/SplitHeading";

export default function Cta({
  title = "Come spend a day with us.",
  href = "/admissions",
  label = "Book a visit",
}: {
  title?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="relative flex flex-col items-start gap-10 px-6 py-28 md:flex-row md:items-end md:justify-between md:px-10 md:py-40">
      <SplitHeading by="words" className="max-w-5xl font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.86] font-black tracking-[-0.05em]">
        {title}
      </SplitHeading>
      <Magnetic strength={0.45} className="shrink-0">
        <Link
          href={href}
          className="grid size-40 place-items-center rounded-full bg-cherry p-6 text-center font-display text-xl font-bold text-cream transition-[background-color,transform] duration-500 hover:scale-105 hover:bg-ink md:size-52 md:text-2xl"
        >
          {label} →
        </Link>
      </Magnetic>
    </section>
  );
}
