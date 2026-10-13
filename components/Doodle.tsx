/** Hand-drawn style line doodles. Paths use pathLength=1 so they can be "drawn" with stroke-dashoffset. */
const paths: Record<string, string[]> = {
  heads: [
    "M28 120a26 26 0 1 0 52 0a26 26 0 1 0-52 0",
    "M74 92a30 30 0 1 0 60 0a30 30 0 1 0-60 0",
    "M124 126a24 24 0 1 0 48 0a24 24 0 1 0-48 0",
    "M44 128q10 9 20 0M92 100q12 10 24 0M140 134q8 7 16 0",
    "M20 182q80-34 160 0",
  ],
  squiggle: [
    "M14 120c26-70 52 52 80-12s54-64 78 2",
    "M128 160a22 22 0 1 0 44 0a22 22 0 1 0-44 0",
    "M128 160h44M150 138v44",
    "M30 40l10 18 18 4-14 12 4 20-18-10-18 10 4-20-14-12 18-4z",
  ],
  heart: [
    "M100 172C40 124 18 84 48 56c24-22 46-6 52 16 6-22 28-38 52-16 30 28 8 68-52 116z",
    "M62 52q-14 6-16 24",
    "M24 24l14 14M176 24l-14 14M100 8v18",
  ],
  crook: [
    "M74 190V80c0-52 74-54 74-6 0 30-34 34-38 12",
    "M120 150c0-16 12-24 26-20 6-14 30-14 34 2 16 2 18 26 2 30-4 14-30 14-34 2-16 4-28-2-28-14z",
    "M148 168v20M170 168v20",
  ],
};

export default function Doodle({ name, className = "" }: { name: keyof typeof paths | string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      {(paths[name] ?? []).map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          data-draw
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
        />
      ))}
    </svg>
  );
}
