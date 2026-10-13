"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, school } from "@/lib/content";
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { whenReady } from "@/lib/ready";

export default function Nav() {
  const pathname = usePathname();
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Slide in on load, hide on scroll down, show on scroll up.
  useGSAP(
    () => {
      const el = bar.current!;
      if (!reducedMotion()) {
        gsap.set(el, { yPercent: -160 });
        whenReady(() => gsap.to(el, { yPercent: 0, duration: 1, delay: 0.4, ease: "expo.out" }));
      }
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 240;
          gsap.to(el, { yPercent: hide ? -160 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        },
      });
    },
    { scope: bar },
  );

  // Full-screen mobile menu
  useGSAP(
    () => {
      menuTl.current = gsap
        .timeline({ paused: true })
        .set(menu.current, { display: "flex" })
        .fromTo(menu.current, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.8, ease: "expo.inOut" })
        .from("[data-menu-link]", { yPercent: 110, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 0.35)
        .from("[data-menu-foot]", { autoAlpha: 0, y: 20, duration: 0.5 }, 0.6);
    },
    { scope: menu },
  );

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    if (open) {
      getLenis()?.stop();
      tl.timeScale(1).play();
    } else {
      getLenis()?.start();
      tl.timeScale(1.6).reverse();
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3 rounded-full bg-cream/85 py-1.5 pr-5 pl-1.5 backdrop-blur-md" aria-label={`${school.name}, home`}>
            <span className="grid size-11 place-items-center rounded-full bg-white shadow-[0_3px_0_var(--color-ink)] transition-transform duration-500 group-hover:rotate-[-12deg]">
              <Image src="/images/logo.png" alt="" width={34} height={35} />
            </span>
            <span className="font-display text-[0.95rem] leading-[1.05] font-bold text-cherry">
              Shepherd&apos;s
              <br />
              <span className="font-medium text-ink">Infant School</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden rounded-full border border-ink/10 bg-cream/85 p-1.5 backdrop-blur-md lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block rounded-full px-5 py-2.5 font-display text-[0.95rem] font-medium transition-colors duration-300 ${
                      isActive(link.href) ? "bg-sun" : "hover:bg-ink/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/admissions"
              className="hidden rounded-full bg-ink px-6 py-3.5 font-display text-[0.95rem] font-medium text-cream transition-colors duration-300 hover:bg-cherry sm:block"
            >
              Book a visit
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[60] grid size-13 place-items-center rounded-full bg-sun lg:hidden"
            >
              <span className={`absolute h-0.5 w-5 bg-ink transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-0.5 w-5 bg-ink transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        id="mobile-menu"
        className="fixed inset-0 z-[45] hidden flex-col justify-between bg-sun px-6 pt-28 pb-8 lg:hidden"
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="flex flex-col gap-1">
          {nav.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                data-menu-link
                className="flex items-baseline gap-4 font-display text-[clamp(3rem,14vw,6rem)] leading-[1] font-black tracking-tight"
              >
                <span className="font-body text-sm font-bold opacity-50">0{i + 1}</span>
                <span className={isActive(link.href) ? "text-cherry" : ""}>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div data-menu-foot className="space-y-1 font-semibold">
          <a href={school.phoneHref} className="block">{school.phone}</a>
          <a href={`mailto:${school.email}`} className="block">{school.email}</a>
        </div>
      </div>
    </>
  );
}
