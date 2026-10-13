import Marquee from "@/components/Marquee";
import Cta from "@/components/home/Cta";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Welcome from "@/components/home/Welcome";
import Why from "@/components/home/Why";
import { home } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative z-10 -mt-[calc(2.5rem+4vw)] -mb-4 overflow-x-clip py-10">
        <Marquee
          items={home.marquee}
          className="-ml-[3vw] w-[106vw] -rotate-2 bg-sun py-5 font-display text-[clamp(2rem,5vw,4.5rem)] font-black tracking-tight"
        />
        <Marquee
          items={home.marquee}
          reverse
          duration={36}
          className="-mt-4 -ml-[3vw] w-[106vw] rotate-[1.5deg] bg-ink py-4 font-display text-[clamp(1.5rem,3vw,2.75rem)] font-bold text-cream"
        />
      </div>
      <Welcome />
      <Why />
      <Stats />
      <Gallery />
      <Cta />
    </>
  );
}
