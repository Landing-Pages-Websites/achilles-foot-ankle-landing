"use client";

import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";
import { LOCATIONS, HOURS, PHONE, PHONE_HREF } from "./Brand";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-gradient-to-br from-[var(--color-primary)] via-[#1a3a78] to-[var(--color-primary-dark)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-6 text-white">
          <Reveal>
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-accent-light)]">
              Book Your Visit
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1]">
              Ready when you are &mdash; same-day appointments available.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-lg text-white/85 leading-relaxed">
              Share a few details and our front-desk team will call you back to confirm
              a time that works at the location you choose. Most patients hear from us
              within one business hour.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.name}
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5"
                >
                  <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent-light)]">
                    {loc.name}
                  </div>
                  <div className="mt-2 text-base sm:text-lg font-bold leading-tight">
                    {loc.line1}
                  </div>
                  <div className="text-white/85 text-sm">{loc.line2}</div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-white hover:underline"
                  >
                    Get directions
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5">
                <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent-light)]">
                  Call either office
                </div>
                <a
                  href={PHONE_HREF}
                  className="mt-2 block text-2xl sm:text-[1.6rem] font-extrabold leading-tight hover:underline"
                >
                  {PHONE}
                </a>
                <div className="text-white/80 text-sm mt-1">
                  One number reaches both locations.
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5">
                <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent-light)]">
                  Office hours
                </div>
                <ul className="mt-2 space-y-1 text-sm">
                  {HOURS.map(([day, hours]) => (
                    <li key={day} className="flex justify-between gap-3">
                      <span className="font-semibold">{day}</span>
                      <span className="text-white/85">{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="right" delay={140} className="lg:col-span-6">
          <LeadForm
            variant="contact"
            headline="Request your appointment"
            subhead="It only takes 30 seconds. We'll call you back to confirm a time at the location you prefer."
          />
        </Reveal>
      </div>
    </section>
  );
}
