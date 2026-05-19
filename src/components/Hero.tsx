"use client";

import Image from "next/image";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";
import { PHONE, PHONE_HREF } from "./Brand";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 overflow-hidden bg-[var(--color-soft-blue-2)]"
    >
      {/* Soft layered backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(23,68,158,0.12), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(224,122,31,0.07), transparent 60%)",
        }}
      />
      {/* Dot pattern accent */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(23,68,158,0.10) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0) 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0) 80%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: copy column */}
        <div className="lg:col-span-7">
          <Reveal variant="up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-white/80 backdrop-blur px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              Richmond, VA · Same-Day Appointments Available
            </span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.06] text-[var(--color-text)]">
              Foot pain?{" "}
              <span className="text-[var(--color-primary)]">See a Richmond podiatrist</span>
              {" "}today
              <span className="text-[var(--color-accent)]">.</span>
            </h1>
          </Reveal>
          <Reveal variant="up" delay={160}>
            <p className="mt-5 text-lg sm:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
              Board-certified foot and ankle specialists at two convenient
              Richmond-area offices &mdash; Mechanicsville and West End. From heel pain
              and ingrown toenails to diabetic foot care, we get you in fast and back
              on your feet faster.
            </p>
          </Reveal>
          <Reveal variant="up" delay={220}>
            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl">
              {[
                "Same-day appointments",
                "Board-certified podiatrists",
                "Two Richmond-area locations",
                "Most major insurances accepted",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-[var(--color-text)] text-[15px] sm:text-base font-medium"
                >
                  <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="up" delay={300}>
            <div className="mt-9 flex flex-wrap items-center justify-start gap-3">
              <a href="#contact" className="btn-primary text-base sm:text-lg">
                Request My Appointment
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg px-5 py-3 font-semibold hover:bg-[var(--color-primary)] hover:text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
                </svg>
                Call us: {PHONE}
              </a>
            </div>
          </Reveal>
          <Reveal variant="up" delay={380}>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <Stars />
                <span className="font-semibold text-[var(--color-text)]">5-star reviews</span>
                <span>across Google</span>
              </div>
              <span aria-hidden className="hidden sm:block w-px h-4 bg-[var(--color-border)]" />
              <span className="font-medium">Mechanicsville &amp; West End</span>
              <span aria-hidden className="hidden sm:block w-px h-4 bg-[var(--color-border)]" />
              <span className="font-medium">Most insurances accepted</span>
            </div>
          </Reveal>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-5">
          <Reveal variant="right" delay={140}>
            <div className="relative">
              <div className="hidden lg:flex absolute -top-5 -right-5 z-20 items-center gap-3 bg-[var(--color-primary)] text-white rounded-2xl shadow-2xl px-4 py-3">
                <svg
                  className="w-7 h-7 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z"
                  />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-white/85 leading-none">
                    Need Relief Now?
                  </div>
                  <div className="text-base font-extrabold leading-tight">
                    Same-Day Visits
                  </div>
                </div>
              </div>
              <div className="relative z-10">
                <LeadForm
                  variant="hero"
                  headline="Request a same-day appointment"
                  subhead="Share a few details and our team will reach out to confirm a time that works — typically within one business hour."
                />
              </div>
              {/* Tiny team photo accent below form on desktop */}
              <div className="hidden lg:block mt-5 rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md">
                <Image
                  src="/team.png"
                  alt="The Achilles Foot and Ankle Center care team"
                  width={938}
                  height={567}
                  className="w-full h-32 object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <span className="flex items-center text-[var(--color-accent)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L10 14.9l-5.27 2.77 1-5.86L1.5 7.66l5.9-.86L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
