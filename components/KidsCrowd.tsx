"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { generateKidSheet, type KidSheet } from "@/lib/kidSprites";

/**
 * Crowd of procedurally drawn kids walking and skipping across a canvas.
 * Based on Skiper 39 Canvas_Landing_004 by Skiper UI (@gurvinder-singh02, https://gxuri.me),
 * animation inspired by and adapted from https://codepen.io/zadvorsky/pen/xxwbBQV.
 * Attribution to Skiper UI is required when using the free version.
 */

interface KidsCrowdProps {
  className?: string;
  /** How many different kids to generate (across × down). */
  across?: number;
  down?: number;
  /** Change this to get a different mix of kids. */
  seed?: number;
  /** Share of the sheet on stage at 1280px wide; scaled down on narrower screens. */
  density?: number;
  /** Fixed number of kids, overriding density. */
  count?: number;
  /** Kid size multiplier. */
  kidScale?: number;
  /** How far up (px) kids can be placed from the baseline. */
  spread?: number;
  /** How far (px) kids can sink below the bottom edge. */
  sink?: number;
  paused?: boolean;
}

type Peep = {
  rect: [number, number, number, number];
  width: number;
  height: number;
  x: number;
  y: number;
  hop: number;
  hopping: boolean;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
};

// One sheet per seed/size, shared by every crowd on the page.
const sheetCache = new Map<string, KidSheet>();
const getSheet = (across: number, down: number, seed: number) => {
  const key = `${across}x${down}:${seed}`;
  let sheet = sheetCache.get(key);
  if (!sheet) {
    sheet = generateKidSheet({ across, down, seed });
    sheetCache.set(key, sheet);
  }
  return sheet;
};

const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
const pickRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const takeRandom = <T,>(arr: T[]) => arr.splice(Math.floor(Math.random() * arr.length), 1)[0];

export default function KidsCrowd({
  className = "absolute inset-0 h-full w-full",
  across = 10,
  down = 8,
  seed = 7,
  density = 1,
  count,
  kidScale = 1,
  spread = 250,
  sink = 100,
  paused = false,
}: KidsCrowdProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const controlsRef = useRef<{ setRunning: (on: boolean) => void } | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    controlsRef.current?.setRunning(!paused);
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = reducedMotion();
    const sheet = getSheet(across, down, seed);
    const res = sheet.resolution;
    const cellW = sheet.canvas.width / sheet.across;
    const cellH = sheet.canvas.height / sheet.down;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = Array.from({ length: sheet.across * sheet.down }, (_, i) => ({
      rect: [(i % sheet.across) * cellW, Math.floor(i / sheet.across) * cellH, cellW, cellH],
      width: (cellW / res) * kidScale,
      height: (cellH / res) * kidScale,
      x: 0,
      y: 0,
      hop: 0,
      hopping: false,
      anchorY: 0,
      scaleX: 1,
      walk: null,
    }));
    let available: Peep[] = [];
    const crowd: Peep[] = [];
    let visible = false;
    let running = false;

    /* Walk factories */
    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = sink - spread * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      const startX = direction === 1 ? -peep.width : stage.width + peep.width;
      const endX = direction === 1 ? stage.width : 0;
      peep.scaleX = direction;
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startY, endX };
    };

    const normalWalk = (peep: Peep, { startY, endX }: { startY: number; endX: number }) => {
      const xDuration = 10;
      const yDuration = 0.25;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.6, 1.4));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 8 }, 0);
      return tl;
    };

    // Kids skip and hop: bigger, bouncier steps
    const skipWalk = (peep: Peep, { startY, endX }: { startY: number; endX: number }) => {
      const xDuration = 9;
      const yDuration = 0.3;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.8, 1.4));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 22, ease: "power1.out" }, 0);
      return tl;
    };

    const walks = [normalWalk, normalWalk, skipWalk];

    const addPeepToCrowd = (): Peep | undefined => {
      if (!available.length) return;
      const peep = takeRandom(available);
      const walk = pickRandom(walks)(peep, resetPeep(peep));
      walk.eventCallback("onComplete", () => {
        crowd.splice(crowd.indexOf(peep), 1);
        available.push(peep);
        addPeepToCrowd();
      });
      if (!running) walk.pause();
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const render = () => {
      const ratio = dpr();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(ratio, ratio);
      for (const peep of crowd) {
        ctx.save();
        ctx.translate(peep.x, peep.y + peep.hop);
        ctx.scale(peep.scaleX, 1);
        const [sx, sy, sw, sh] = peep.rect;
        ctx.drawImage(sheet.canvas, sx, sy, sw, sh, 0, 0, peep.width, peep.height);
        ctx.restore();
      }
      ctx.restore();
    };

    const setRunning = (on: boolean) => {
      const next = on && visible && !pausedRef.current && !still;
      if (next === running) return;
      running = next;
      crowd.forEach((peep) => (running ? peep.walk?.resume() : peep.walk?.pause()));
      if (running) gsap.ticker.add(render);
      else gsap.ticker.remove(render);
    };
    controlsRef.current = { setRunning };

    const build = () => {
      const ratio = dpr();
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * ratio;
      canvas.height = stage.height * ratio;
      // Smaller kids on phones so the crowd still reads as a crowd.
      const size = kidScale * (stage.width < 640 ? 0.68 : 1);
      allPeeps.forEach((peep) => {
        peep.width = (cellW / res) * size;
        peep.height = (cellH / res) * size;
      });
      crowd.forEach((peep) => peep.walk?.kill());
      crowd.length = 0;
      const target =
        count ?? Math.max(10, Math.round(allPeeps.length * density * Math.min(1, stage.width / 1280)));
      available = [...allPeeps].sort(() => Math.random() - 0.5).slice(0, Math.min(target, allPeeps.length));
      const total = available.length;
      for (let i = 0; i < total; i++) addPeepToCrowd()?.walk?.progress(Math.random());
      render();
    };

    /* A kid near the pointer does a happy little hop */
    const onPointer = (e: PointerEvent) => {
      if (!running) return;
      const box = canvas.getBoundingClientRect();
      const px = e.clientX - box.left;
      const py = e.clientY - box.top;
      if (px < 0 || py < 0 || px > box.width || py > box.height) return;
      for (let i = crowd.length - 1; i >= 0; i--) {
        const p = crowd[i];
        const left = p.scaleX === 1 ? p.x : p.x - p.width;
        const top = p.y + p.height * 0.25;
        if (px > left + p.width * 0.2 && px < left + p.width * 0.8 && py > top && py < p.y + p.height) {
          if (p.hopping) return;
          p.hopping = true;
          gsap.to(p, {
            hop: -34 * kidScale,
            duration: 0.22,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              p.hopping = false;
            },
          });
          return;
        }
      }
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastWidth = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Ignore mobile toolbar height jitter; only rebuild on real size changes.
        if (Math.abs(canvas.clientWidth - lastWidth) < 2 && Math.abs(canvas.clientHeight - stage.height) < 80) return;
        lastWidth = canvas.clientWidth;
        build();
      }, 150);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setRunning(true);
    });

    lastWidth = canvas.clientWidth;
    build();
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      io.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk?.kill());
      allPeeps.forEach((peep) => gsap.killTweensOf(peep));
      controlsRef.current = null;
    };
  }, [across, down, seed, density, count, kidScale, spread, sink]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
