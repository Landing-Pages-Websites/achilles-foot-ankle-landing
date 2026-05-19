"use client";

import { Reveal } from "./Reveal";
import { PHONE, PHONE_HREF } from "./Brand";

interface Service {
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
  icon: React.ReactNode;
}

// Four service themes — directly mapped to the campaign's Google Ads ad groups.
// Copy is healthcare-compliant: educational descriptions, no outcome guarantees,
// no medical claims about specific drugs / devices / procedures.
const SERVICES: Service[] = [
  {
    title: "Nail & Skin Conditions",
    tagline: "Ingrown toenails, warts, fungus and persistent skin irritation",
    body:
      "Painful ingrown toenails, stubborn plantar warts and skin issues on the foot are some of the most common reasons our patients come in. Our podiatrists evaluate the condition in-office, walk you through treatment options, and put together a clear plan to address it &mdash; in a relaxed clinical setting designed for comfort.",
    bullets: [
      "Ingrown toenail evaluation & treatment",
      "Plantar wart care",
      "Fungal nail evaluation",
      "Skin lesion & callus care",
    ],
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M9 4c2-1 5-1 7 1 2 2 2 5 1 7-1 2-3 3-5 3-2 0-4-1-5-3-1-2-1-5 1-7l1-1z" strokeLinejoin="round" />
        <path d="M7 16c-1 1-2 3-1 4 1 1 3 0 4-1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Heel & Arch Pain",
    tagline: "Plantar fasciitis, heel pain, flat foot and high arches",
    body:
      "Heel pain that&rsquo;s worse with the first steps of the morning, an arch that feels strained after standing, or a foot shape that&rsquo;s changed over time &mdash; these are all things we evaluate every day. Treatment is personalized: we examine the foot mechanics, review your daily activity, and recommend a conservative care plan tailored to you.",
    bullets: [
      "Plantar fasciitis evaluation",
      "Chronic heel pain",
      "Flat foot & high arch assessment",
      "Custom orthotic consultation",
    ],
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M6 3c2 0 3 1 3 3v3c0 2 1 4 3 5l3 1c2 1 3 2 3 4v3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 14c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z" />
        <path d="M16 19h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Wound & Diabetic Foot Care",
    tagline: "Diabetic foot exams, ulcer care and at-risk foot screening",
    body:
      "If you have diabetes or peripheral neuropathy, regular podiatric care is one of the most important things you can do. We perform thorough diabetic foot exams, screen for circulation and sensation changes, and partner with your primary-care team. If you have an existing wound, we evaluate it carefully and discuss next steps in person.",
    bullets: [
      "Comprehensive diabetic foot exam",
      "Wound evaluation & care planning",
      "At-risk foot screening",
      "Coordination with your PCP",
    ],
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "General Podiatry",
    tagline: "Bunions, hammertoes, sports injuries and routine foot care",
    body:
      "From a sudden twisted ankle to a slow-developing bunion or hammertoe, we cover the full breadth of general podiatric care for adults and children. Most visits start with a same-day or next-day evaluation, digital imaging if needed, and a conversation about whether conservative care is the right first step.",
    bullets: [
      "Bunion & hammertoe evaluation",
      "Ankle sprain & sports injury",
      "Routine podiatry & nail care",
      "Pediatric podiatry",
    ],
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M9 22c-2 0-3-2-3-4 0-3 1-5 1-8 0-3 1-7 4-7s4 3 4 6c0 2 1 4 2 5 1 1 2 3 2 5 0 2-2 3-4 3h-6z" strokeLinejoin="round" />
        <circle cx="14" cy="6" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal variant="up">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              What We Treat
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold text-[var(--color-text)] leading-tight">
              Comprehensive foot &amp; ankle care &mdash;{" "}
              <span className="text-[var(--color-primary)]">for every age</span>.
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-muted)]">
              Our podiatrists see hundreds of patients every week across our two Richmond
              offices. Below are the conditions we evaluate and care for most often.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-5 lg:gap-7">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} variant="up" delay={i * 80}>
              <div className="group h-full p-7 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-[var(--color-soft-blue)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                    <span className="w-8 h-8 block">{svc.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
                      {svc.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-primary)] font-semibold">
                      {svc.tagline}
                    </p>
                  </div>
                </div>
                <p
                  className="mt-5 text-[15px] leading-relaxed text-[var(--color-text-muted)]"
                  dangerouslySetInnerHTML={{ __html: svc.body }}
                />
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {svc.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-[var(--color-text)]"
                    >
                      <svg
                        className="w-4 h-4 mt-0.5 text-[var(--color-primary)] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={300}>
          <p className="mt-10 text-center text-sm text-[var(--color-text-muted)] max-w-2xl mx-auto">
            The treatments listed above are evaluated on a case-by-case basis. Outcomes and
            recommendations depend on each patient&rsquo;s individual condition.
          </p>
        </Reveal>

        <Reveal variant="up" delay={350}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
