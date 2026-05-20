"use client";

import { Reveal } from "./Reveal";

type StatTile = {
  value?: string;
  icon?: "calendar" | "shield" | "pin" | "credit-card";
  title: string;
  sub: string;
};

const STATS: StatTile[] = [
  {
    icon: "calendar",
    title: "Same-day appointments",
    sub: "New-patient slots open every business day",
  },
  {
    icon: "shield",
    title: "Board-certified podiatrists",
    sub: "Foot & ankle specialists on staff",
  },
  {
    value: "2",
    title: "Richmond-area locations",
    sub: "Mechanicsville & West End",
  },
  {
    icon: "credit-card",
    title: "Most insurances accepted",
    sub: "Including Medicare & major commercial plans",
  },
];

function Icon({ name }: { name: NonNullable<StatTile["icon"]> }) {
  const common =
    "w-10 h-10 sm:w-11 sm:h-11 text-[var(--color-accent-light)]";
  switch (name) {
    case "calendar":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" strokeLinejoin="round" />
          <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m9 14 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3Z" strokeLinejoin="round" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pin":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "credit-card":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <rect x="3" y="6" width="18" height="13" rx="2" strokeLinejoin="round" />
          <path d="M3 10h18M7 15h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function Stats() {
  return (
    <section
      id="stats"
      aria-label="Practice highlights"
      className="relative bg-[var(--color-primary)] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Reveal variant="up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 text-center">
            {STATS.map((s) => (
              <div key={s.title} className="px-2 flex flex-col items-center">
                <div className="mb-3 flex items-center justify-center h-12">
                  {s.value ? (
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--color-accent-light)] leading-none tracking-tight">
                      {s.value}
                    </span>
                  ) : s.icon ? (
                    <Icon name={s.icon} />
                  ) : null}
                </div>
                <div className="text-sm sm:text-base font-semibold text-white leading-snug">
                  {s.title}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-white/75 leading-snug">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
