"use client";

import { Reveal } from "./Reveal";

const STATS = [
  {
    value: "Same-Day",
    label: "Appointments available for new patients",
  },
  {
    value: "Board-",
    label: "Certified podiatrists, foot & ankle specialists",
  },
  {
    value: "2",
    label: "Convenient Richmond-area locations",
  },
  {
    value: "Most",
    label: "Major insurances accepted, including Medicare",
  },
] as const;

export function Stats() {
  return (
    <section
      id="stats"
      aria-label="Practice highlights"
      className="relative bg-[var(--color-primary)] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <Reveal variant="up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="px-2">
                <div className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[var(--color-accent-light)] leading-none tracking-tight">
                  {s.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-white/85 font-medium leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
