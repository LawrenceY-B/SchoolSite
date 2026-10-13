import Link from "next/link";
import { nav, school } from "@/lib/content";
import KidsCrowd from "./KidsCrowd";

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden rounded-t-[2.5rem] bg-sun text-ink md:rounded-t-[4rem]">
      <div className="grid gap-12 px-6 pt-20 md:grid-cols-12 md:px-10 md:pt-28">
        <div className="md:col-span-6">
          <p className="mb-4 font-semibold uppercase tracking-[0.2em] text-ink/60">Say hello</p>
          <a
            href={`mailto:${school.email}`}
            className="font-display text-[clamp(1.6rem,3.6vw,3.75rem)] leading-[1] font-bold tracking-tight [overflow-wrap:anywhere] underline decoration-4 underline-offset-8 transition-colors hover:text-cherry"
          >
            {school.email}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-ink/60">Visit</h3>
            <address className="not-italic leading-relaxed">
              {school.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-ink/60">Talk</h3>
            <a href={school.phoneHref} className="block hover:text-cherry">
              {school.phone}
            </a>
            <p className="mt-2 text-sm">{school.hours}</p>
          </div>
          <nav aria-label="Footer">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-ink/60">Explore</h3>
            <ul className="space-y-1">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cherry">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Giant wordmark with the crowd walking in front of it */}
      <div className="relative mt-4 h-[clamp(10rem,19vw,18rem)]">
        <p
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 translate-y-[18%] text-center font-display text-[17vw] leading-[0.8] whitespace-nowrap font-black tracking-[-0.06em] text-ink select-none"
        >
          Shepherd&apos;s
        </p>
        <KidsCrowd density={0.35} kidScale={0.85} spread={40} sink={40} seed={21} />
      </div>

      <div className="relative flex flex-col gap-2 border-t border-ink/15 bg-sun px-6 py-5 text-sm sm:flex-row sm:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {school.name} · {school.motto}
        </p>
        <p className="text-ink/70">
          Kids crowd adapted from{" "}
          <a href="https://gxuri.me" className="underline" target="_blank" rel="noreferrer">
            Skiper UI
          </a>
        </p>
      </div>
    </footer>
  );
}
