"use client";

import { Reveal } from "./Reveal";
import { LOCATIONS, PHONE, PHONE_HREF } from "./Brand";

export function Locations() {
  return (
    <section
      id="locations"
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-gradient-to-br from-[var(--color-soft-blue-2)] via-white to-[var(--color-soft-blue)]"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              Two Richmond Locations
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold text-[var(--color-text)] leading-tight">
              Pick whichever office is{" "}
              <span className="text-[var(--color-primary)]">closest to you</span>.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-lg text-[var(--color-text-muted)]">
              Same providers. Same standard of care. Two convenient Richmond-area offices &mdash;
              easy parking and short wait times at both.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6 lg:gap-8">
          {LOCATIONS.map((loc, i) => (
            <Reveal key={loc.name} delay={120 + i * 80}>
              <div className="h-full rounded-3xl bg-white border border-[var(--color-border)] shadow-md hover:shadow-xl transition-shadow p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-[0.18em] uppercase text-[var(--color-accent)]">
                      Location {i + 1}
                    </div>
                    <h3 className="mt-2 text-2xl sm:text-[1.7rem] font-extrabold text-[var(--color-text)]">
                      {loc.name}
                    </h3>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                    <svg
                      className="w-7 h-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M12 21s-7-7-7-12a7 7 0 0114 0c0 5-7 12-7 12z" strokeLinejoin="round" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                </div>

                <div className="mt-5 text-lg font-semibold text-[var(--color-text)] leading-tight">
                  {loc.line1}
                </div>
                <div className="text-base text-[var(--color-text-muted)]">{loc.line2}</div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={PHONE_HREF}
                    className="btn-primary text-base"
                  >
                    Call {PHONE}
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg px-5 py-3 font-semibold hover:bg-[var(--color-primary)] hover:text-white transition"
                  >
                    Get directions
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

                <ul className="mt-6 pt-6 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                  {[
                    "On-site digital X-ray",
                    "Easy free parking",
                    "Same-day visits available",
                    "Wheelchair accessible",
                  ].map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[var(--color-text)]">
                      <svg
                        className="w-4 h-4 text-[var(--color-primary)] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
