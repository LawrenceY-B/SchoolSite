import { about } from "@/lib/content";

const fills: Record<string, string> = {
  cherry: "bg-cherry text-cream",
  sky: "bg-sky",
  leaf: "bg-leaf",
  sun: "bg-sun",
  blue: "bg-blue text-cream",
};

/** A list of values; each row floods with colour on hover. */
export default function Values() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-36">
      <p className="mb-10 font-semibold tracking-[0.2em] text-ink/60 uppercase">(03) What we value</p>
      <ul className="border-t-2 border-ink">
        {about.values.map((v) => (
          <li key={v.name} className="group relative overflow-hidden border-b-2 border-ink">
            <div
              aria-hidden="true"
              className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0 ${fills[v.color]}`}
            />
            <div className={`relative flex flex-col gap-2 px-2 py-6 transition-colors duration-500 md:flex-row md:items-center md:justify-between md:px-6 md:py-8 ${fills[v.color].includes("text-cream") ? "group-hover:text-cream" : ""}`}>
              <span className="font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.9] font-black tracking-[-0.04em] transition-transform duration-500 ease-out-expo group-hover:translate-x-4">
                {v.name}
              </span>
              <span className="max-w-sm text-lg font-semibold md:text-right">{v.body}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
