"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { PHONE, PHONE_HREF } from "./Brand";

const STEPS = [
  {
    n: "01",
    title: "Request a visit",
    body:
      "Fill out the short form on this page (or call us). Tell us what&rsquo;s going on and which location is most convenient for you.",
  },
  {
    n: "02",
    title: "Quick callback",
    body:
      "Our front-desk team calls you back &mdash; usually within one business hour &mdash; to confirm a same-day or next-day slot.",
  },
  {
    n: "03",
    title: "Thorough in-office exam",
    body:
      "At your visit, a board-certified podiatrist evaluates the foot or ankle in question, takes any imaging needed, and listens to your history.",
  },
  {
    n: "04",
    title: "A clear plan, in plain English",
    body:
      "You leave with a personalized care plan you understand. We discuss insurance, expected costs and next steps before you check out.",
  },
];

export function Welcome() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 sm:py-24 bg-[var(--color-soft-blue)] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(23,68,158,0.25), transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-5">
          <Reveal variant="up">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Your First Visit
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[var(--color-text)] leading-tight">
              Same-day relief, from the{" "}
              <span className="text-[var(--color-primary)]">very first call</span>.
            </h2>
            <p className="mt-5 text-lg text-[var(--color-text-muted)] leading-relaxed">
              We know foot pain doesn&rsquo;t wait for an opening three weeks out.
              Here&rsquo;s exactly what happens after you fill out the form &mdash; step by step.
              No long hold times, no surprise bills, no rushed appointments.
            </p>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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

        <div className="lg:col-span-7">
          <div className="relative">
            <Reveal variant="up" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
                <Image
                  src="/team.png"
                  alt="The Achilles Foot and Ankle Center care team in our Richmond office"
                  width={1200}
                  height={800}
                  className="w-full h-[260px] sm:h-[340px] object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <div className="mt-6 grid sm:grid-cols-2 gap-4 sm:gap-5">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} variant="up" delay={140 + i * 80}>
                  <div className="h-full rounded-2xl bg-white border border-[var(--color-border)] p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-2xl text-[var(--color-accent)] leading-none">
                        {s.n}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)]">
                        {s.title}
                      </h3>
                    </div>
                    <p
                      className="mt-2.5 text-sm text-[var(--color-text-muted)] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: s.body }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
