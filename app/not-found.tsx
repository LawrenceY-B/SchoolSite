import Link from "next/link";
import KidsCrowd from "@/components/KidsCrowd";

export default function NotFound() {
  return (
    <section className="relative flex h-[100svh] min-h-[600px] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <p className="font-display text-[clamp(8rem,30vw,24rem)] leading-[0.8] font-black tracking-[-0.06em] text-sun">404</p>
      <h1 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[1] font-black tracking-tight">This little one wandered off.</h1>
      <p className="mt-4 max-w-md text-lg">The page you&apos;re looking for isn&apos;t here, but there&apos;s plenty more to explore.</p>
      <Link href="/" className="relative z-10 mt-8 rounded-full bg-ink px-8 py-4 font-display font-medium text-cream transition-colors hover:bg-cherry">
        Take me home
      </Link>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]">
        <KidsCrowd count={1} seed={3} spread={0} sink={10} />
      </div>
    </section>
  );
}
