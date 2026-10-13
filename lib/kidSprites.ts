/**
 * Procedurally drawn kids sprite sheet. Every kid is drawn in code, no image file needed.
 * Adapted from KidsCrowd.tsx (Skiper 39 Canvas_Landing_004 by Skiper UI, @gurvinder-singh02, https://gxuri.me;
 * animation inspired by https://codepen.io/zadvorsky/pen/xxwbBQV). Attribution to Skiper UI is required.
 */
const CELL_W = 120;
const CELL_H = 210;
const INK = "#1b1b1f";

const SKINS = ["#4a2c1a", "#5c3a21", "#7a4a2a", "#8d5524", "#a0673c", "#c68642", "#e0ac69", "#f1c27d", "#ffdbac"];
const HAIRS = ["#16100c", "#1c1410", "#2b1d14", "#3d2817", "#6b4423", "#a0522d", "#d9a441"];
// School palette first (sun, cherry, sky, leaf, blue), then a few playful extras.
const CLOTHES = ["#fdc922", "#d01e13", "#7abfff", "#2dbe4a", "#0062e1", "#ffffff", "#fdc922", "#7abfff", "#ff9f1c", "#c77dff", "#f15bb5", "#2ec4b6"];
/** Backpacks, balloons and caps lean hard on the school colours. */
const EXTRAS = ["#fdc922", "#fdc922", "#d01e13", "#d01e13", "#7abfff", "#0062e1", "#2dbe4a"];
const SHOES = ["#1b1b1f", "#ffffff", "#d01e13", "#0062e1", "#fdc922", "#2dbe4a"];
const HAIR_STYLES = ["short", "buzz", "afro", "puffs", "pigtails", "ponytail", "bob", "cap"] as const;

type Ctx = CanvasRenderingContext2D;

const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const rrect = (ctx: Ctx, x: number, y: number, w: number, h: number, r: number) => {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const fillStroke = (ctx: Ctx, fill: string) => {
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.stroke();
};

/** Outlined capsule — used for arms and legs. */
const limb = (ctx: Ctx, x1: number, y1: number, x2: number, y2: number, color: string, w: number) => {
  ctx.save();
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = INK;
  ctx.lineWidth = w + 5;
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.lineWidth = w;
  ctx.stroke();
  ctx.restore();
};

const circle = (ctx: Ctx, x: number, y: number, r: number) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
};

const drawKid = (ctx: Ctx, ox: number, oy: number, rand: () => number) => {
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)];
  const PI = Math.PI;

  const s = 0.82 + rand() * 0.25; // kids come in different sizes
  const cx = ox + CELL_W / 2 - 4;
  const footY = oy + CELL_H - 8;
  const hipY = footY - 36 * s;
  const shY = hipY - 40 * s;
  const R = 23 * s;
  const hx = cx + 3 * s;
  const hy = shY - R + 5 * s;

  const skin = pick(SKINS);
  const hair = pick(HAIRS);
  const shirt = pick(CLOTHES);
  let bottomC = pick(CLOTHES);
  while (bottomC === shirt) bottomC = pick(CLOTHES);
  const shoe = pick(SHOES);
  const bottom = pick(["shorts", "shorts", "skirt", "pants", "pants"] as const);
  const hairStyle = pick(HAIR_STYLES);
  const accRoll = rand();
  const acc = accRoll < 0.16 ? "balloon" : accRoll < 0.42 ? "backpack" : "none";
  const stripes = rand() < 0.35;
  const stride = (9 + rand() * 7) * s;
  const extra = pick(EXTRAS); // balloon / backpack / hat colour

  ctx.save();
  ctx.lineWidth = 2.6;
  ctx.strokeStyle = INK;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // Front-arm hand position (raised when holding a balloon)
  const handX = acc === "balloon" ? cx + 22 * s : cx - 15 * s;
  const handY = acc === "balloon" ? shY - 4 * s : hipY - 4 * s;

  /* Balloon */
  if (acc === "balloon") {
    const bx = cx + 30 * s;
    const by = oy + 34;
    ctx.beginPath();
    ctx.moveTo(handX, handY);
    ctx.quadraticCurveTo(bx + 6, (handY + by) / 2, bx, by + 18);
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.ellipse(bx, by, 14, 17, 0, 0, PI * 2);
    fillStroke(ctx, extra);
    ctx.beginPath();
    ctx.moveTo(bx - 3, by + 20);
    ctx.lineTo(bx + 3, by + 20);
    ctx.lineTo(bx, by + 16);
    ctx.closePath();
    fillStroke(ctx, extra);
    ctx.beginPath();
    ctx.ellipse(bx - 5, by - 7, 3, 5, -0.5, 0, PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fill();
  }

  /* Hair that sits behind the head */
  if (hairStyle === "afro") {
    const ax = hx - 2 * s;
    const ay = hy - 4 * s;
    const blobs: [number, number, number][] = [[ax, ay, R * 1.05]];
    for (let k = 0; k <= 10; k++) {
      const a = PI * 0.75 + (k * PI * 1.3) / 10;
      blobs.push([ax + Math.cos(a) * R * 0.98, ay + Math.sin(a) * R * 0.98, 10 * s]);
    }
    blobs.forEach(([x, y, r]) => {
      circle(ctx, x, y, r);
      ctx.stroke();
    });
    ctx.fillStyle = hair;
    blobs.forEach(([x, y, r]) => {
      circle(ctx, x, y, r);
      ctx.fill();
    });
  } else if (hairStyle === "puffs") {
    circle(ctx, hx - 13 * s, hy - R + 1 * s, 11 * s);
    fillStroke(ctx, hair);
    circle(ctx, hx + 8 * s, hy - R - 3 * s, 11 * s);
    fillStroke(ctx, hair);
  } else if (hairStyle === "pigtails") {
    ctx.beginPath();
    ctx.ellipse(hx - R - 3 * s, hy + 6 * s, 7 * s, 12 * s, 0.35, 0, PI * 2);
    fillStroke(ctx, hair);
  } else if (hairStyle === "ponytail") {
    ctx.beginPath();
    ctx.ellipse(hx - R - 6 * s, hy + 2 * s, 13 * s, 7 * s, -0.6, 0, PI * 2);
    fillStroke(ctx, hair);
  } else if (hairStyle === "bob") {
    ctx.beginPath();
    ctx.ellipse(hx - 6 * s, hy + 2 * s, R + 2 * s, R + 2 * s, 0, 0, PI * 2);
    fillStroke(ctx, hair);
  }

  /* Backpack (behind the body) */
  if (acc === "backpack") {
    rrect(ctx, cx - 30 * s, shY + 3 * s, 17 * s, 32 * s, 6 * s);
    fillStroke(ctx, extra);
    rrect(ctx, cx - 31 * s, shY + 18 * s, 10 * s, 12 * s, 3 * s);
    fillStroke(ctx, extra);
  }

  /* Back arm (swings forward, behind the body) */
  limb(ctx, cx + 4 * s, shY + 8 * s, cx + 14 * s, hipY - 3 * s, shirt, 7 * s);
  circle(ctx, cx + 14 * s, hipY - 2 * s, 4.2 * s);
  fillStroke(ctx, skin);

  /* Legs */
  const legColor = bottom === "pants" ? bottomC : skin;
  const legs: [number, number][] = [
    [cx - 4 * s, cx - stride],
    [cx + 4 * s, cx + stride],
  ];
  legs.forEach(([hipX, footX]) => {
    limb(ctx, hipX, hipY, footX, footY - 4 * s, legColor, 8 * s);
    if (bottom === "shorts") {
      const kx = hipX + (footX - hipX) * 0.38;
      const ky = hipY + (footY - hipY) * 0.38;
      limb(ctx, hipX, hipY, kx, ky, bottomC, 10 * s);
    }
    ctx.beginPath();
    ctx.ellipse(footX + 4 * s, footY - 2 * s, 8 * s, 5 * s, 0, 0, PI * 2);
    fillStroke(ctx, shoe);
  });

  /* Bottoms */
  if (bottom === "skirt") {
    ctx.beginPath();
    ctx.moveTo(cx - 16 * s, hipY - 4 * s);
    ctx.lineTo(cx + 16 * s, hipY - 4 * s);
    ctx.lineTo(cx + 23 * s, hipY + 16 * s);
    ctx.lineTo(cx - 23 * s, hipY + 16 * s);
    ctx.closePath();
    fillStroke(ctx, bottomC);
  } else if (bottom === "shorts") {
    rrect(ctx, cx - 17 * s, hipY - 4 * s, 34 * s, 13 * s, 4 * s);
    fillStroke(ctx, bottomC);
  } else {
    rrect(ctx, cx - 16 * s, hipY - 4 * s, 32 * s, 10 * s, 4 * s);
    fillStroke(ctx, bottomC);
  }

  /* Torso */
  rrect(ctx, cx - 16 * s, shY, 32 * s, 42 * s, 10 * s);
  ctx.fillStyle = shirt;
  ctx.fill();
  if (stripes) {
    ctx.save();
    ctx.clip();
    ctx.fillStyle = shirt === "#ffffff" ? "#0062e1" : "rgba(255,255,255,0.75)";
    for (let i = 0; i < 3; i++) ctx.fillRect(cx - 20 * s, shY + (10 + i * 11) * s, 40 * s, 4.5 * s);
    ctx.restore();
  }
  rrect(ctx, cx - 16 * s, shY, 32 * s, 42 * s, 10 * s);
  ctx.stroke();

  if (acc === "backpack") limb(ctx, cx - 9 * s, shY + 2 * s, cx - 11 * s, hipY - 9 * s, extra, 3 * s);

  /* Head */
  circle(ctx, hx, hy, R);
  fillStroke(ctx, skin);
  circle(ctx, hx - 11 * s, hy + 5 * s, 4.5 * s);
  fillStroke(ctx, skin);

  /* Hair on top of the head */
  const cap = (e: number, bangDepth: number, stroke = true) => {
    ctx.beginPath();
    ctx.arc(hx, hy, R + e, PI * 0.88, PI * 1.92);
    ctx.quadraticCurveTo(hx + R * 0.55, hy - R * 0.2, hx + R * 0.2, hy - R * bangDepth);
    ctx.quadraticCurveTo(hx - R * 0.25, hy - R * 0.05, hx - R * 0.5, hy + R * 0.18);
    ctx.closePath();
    ctx.fillStyle = hair;
    ctx.fill();
    if (stroke) ctx.stroke();
  };

  switch (hairStyle) {
    case "short":
    case "puffs":
    case "pigtails":
    case "ponytail":
    case "bob":
      cap(2 * s, 0.4);
      break;
    case "buzz":
      cap(0.5 * s, 0.62);
      break;
    case "afro":
      cap(0, 0.5, false);
      break;
    case "cap":
      cap(1 * s, 0.55);
      ctx.beginPath();
      ctx.arc(hx, hy - 3 * s, R + 1.5 * s, PI, PI * 2);
      ctx.closePath();
      fillStroke(ctx, extra);
      rrect(ctx, hx + R * 0.3, hy - 6 * s, R * 0.7 + 12 * s, 6 * s, 3 * s);
      fillStroke(ctx, extra);
      circle(ctx, hx, hy - R - 4 * s, 2.5 * s);
      fillStroke(ctx, extra);
      break;
  }
  if (hairStyle === "pigtails") {
    circle(ctx, hx - R + 1 * s, hy - 1 * s, 3.5 * s);
    fillStroke(ctx, extra);
  }

  /* Face */
  ctx.fillStyle = INK;
  circle(ctx, hx + 7 * s, hy + 3 * s, 2.4 * s);
  ctx.fill();
  circle(ctx, hx + 16 * s, hy + 2 * s, 2.4 * s);
  ctx.fill();
  ctx.fillStyle = "rgba(255,110,120,0.35)";
  circle(ctx, hx + 4 * s, hy + 10 * s, 4 * s);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(hx + 12 * s, hy + 9 * s, 5 * s, PI * 0.15, PI * 0.85);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.lineWidth = 2.6;

  /* Front arm */
  limb(ctx, cx - 1 * s, shY + 8 * s, handX, handY, shirt, 7 * s);
  circle(ctx, handX, handY, 4.2 * s);
  fillStroke(ctx, skin);

  ctx.restore();
};

export type KidSheet = {
  canvas: HTMLCanvasElement;
  across: number;
  down: number;
  resolution: number;
};

/** Draws `across × down` unique kids onto one canvas. */
export const generateKidSheet = ({
  across = 10,
  down = 8,
  resolution = 2,
  seed = 7,
  createCanvas = () => document.createElement("canvas"),
}: {
  across?: number;
  down?: number;
  resolution?: number;
  seed?: number;
  createCanvas?: () => HTMLCanvasElement;
} = {}): KidSheet => {
  const canvas = createCanvas();
  canvas.width = across * CELL_W * resolution;
  canvas.height = down * CELL_H * resolution;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(resolution, resolution);
  const rand = mulberry32(seed);
  for (let i = 0; i < across * down; i++) {
    drawKid(ctx, (i % across) * CELL_W, Math.floor(i / across) * CELL_H, rand);
  }
  return { canvas, across, down, resolution };
};
