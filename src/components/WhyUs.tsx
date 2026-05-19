"use client";

import { Reveal } from "./Reveal";
import { PHONE, PHONE_HREF } from "./Brand";

const REASONS = [
  {
    title: "Board-certified specialists",
    body:
      "Our podiatrists are board-certified foot and ankle physicians with years of dedicated training. Foot and ankle care is what we do every single day &mdash; it&rsquo;s not a side service.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3l8 4v5c0 5-4 8-8 9-4-1-8-4-8-9V7l8-4z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Same-day appointments",
    body:
      "When you&rsquo;re in pain, three weeks out isn&rsquo;t an answer. We keep same-day and next-day slots open across both locations so new patients can be seen quickly.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Two convenient locations",
    body:
      "Mechanicsville and West End Richmond &mdash; pick whichever is closer to your home or work. Easy parking at both offices, on-site digital imaging, and a friendly front-desk team.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 21s-7-7-7-12a7 7 0 0114 0c0 5-7 12-7 12z" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Comprehensive in-office care",
    body:
      "From digital X-rays and ultrasound to in-office procedures &mdash; many issues can be evaluated and addressed in a single visit, so you&rsquo;re not bouncing between offices.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M9 10h6M9 14h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Most insurances accepted",
    body:
      "Medicare, BCBS, Cigna, United, Aetna, Humana and most commercial plans. Our team verifies benefits up-front so you understand what&rsquo;s covered before your visit.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Caring, unhurried visits",
    body:
      "We schedule realistic time for every visit so your provider can actually listen to what&rsquo;s going on, examine the foot properly, and answer your questions before you leave.",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 12c0 4-4 8-9 9-5-1-9-5-9-9 0-3 3-6 6-6 1.5 0 2.5.5 3 1.5C12.5 6.5 13.5 6 15 6c3 0 6 3 6 6z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal variant="up">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Why Richmond Chooses Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold text-[var(--color-text)] leading-tight">
              The kind of foot doctor you&rsquo;d{" "}
              <span className="text-[var(--color-primary)]">send your mom to</span>.
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-muted)]">
              Modern podiatric medicine, a calm in-office experience and care that fits how busy
              real life actually is.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} variant="up" delay={i * 60}>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center">
                  <span className="w-7 h-7 block">{r.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text)]">{r.title}</h3>
                  <p
                    className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-text-muted)]"
                    dangerouslySetInnerHTML={{ __html: r.body }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={200}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className="btn-primary text-base sm:text-lg">
              Request My Appointment
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg px-5 py-3 font-semibold hover:bg-[var(--color-primary)] hover:text-white transition"
            >
              Or call us: {PHONE}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
