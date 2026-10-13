import type { Metadata } from "next";
import localFont from "next/font/local";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { school } from "@/lib/content";
import "./globals.css";

const rubik = localFont({
  variable: "--font-rubik",
  src: [
    { path: "./fonts/Rubik-Regular.ttf", weight: "400" },
    { path: "./fonts/Rubik-Medium.ttf", weight: "500" },
    { path: "./fonts/Rubik-SemiBold.ttf", weight: "600" },
    { path: "./fonts/Rubik-Bold.ttf", weight: "700" },
    { path: "./fonts/Rubik-ExtraBold.ttf", weight: "800" },
    { path: "./fonts/Rubik-Black.ttf", weight: "900" },
    { path: "./fonts/Rubik-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
});

const quicksand = localFont({
  variable: "--font-quicksand",
  src: [
    { path: "./fonts/Quicksand-Regular.ttf", weight: "400" },
    { path: "./fonts/Quicksand-Medium.ttf", weight: "500" },
    { path: "./fonts/Quicksand-SemiBold.ttf", weight: "600" },
    { path: "./fonts/Quicksand-Bold.ttf", weight: "700" },
  ],
});

export const metadata: Metadata = {
  title: { default: `${school.name} · ${school.motto}`, template: `%s · ${school.name}` },
  description:
    "A nursery and infant school in Madina, Accra, where curious little ones learn through play, faith and a whole lot of care.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${rubik.variable} ${quicksand.variable}`}>
      <head>
        <noscript>
          <style>{`[data-preloader],[data-wipe]{display:none!important}.split-pending{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[300] -translate-y-24 rounded-full bg-ink px-5 py-3 text-cream focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
        <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[150] opacity-[0.07] mix-blend-multiply" />
      </body>
    </html>
  );
}
