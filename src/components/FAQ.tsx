"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { PHONE, PHONE_HREF } from "./Brand";

const FAQS = [
  {
    q: "Are you accepting new patients?",
    a: "Yes — we welcome new patients of all ages at both our Mechanicsville and West End locations. Fill out the form on this page (or call us) and our front-desk team will reach out within one business hour to find a time that works for you.",
  },
  {
    q: "How quickly can I be seen?",
    a: "We keep same-day and next-day appointments open for new patients at both offices. When you request a visit, let our team know how urgent things feel and we'll do our best to get you in quickly — often the same day you call.",
  },
  {
    q: "What insurances do you accept?",
    a: "We accept Medicare, Medicaid, Humana, and most major commercial plans including Blue Cross Blue Shield (Anthem), Cigna, United Healthcare, Aetna and more. We also see cash-pay patients. Our team verifies your benefits up-front and explains what's covered before your visit.",
  },
  {
    q: "What happens at my first visit?",
    a: "Most first visits take 30 to 45 minutes. We review your health history, examine the area in question, and (when needed) take a digital X-ray right in the office. Your podiatrist then walks you through what they found, your options, and any next steps — in plain English.",
  },
  {
    q: "I have diabetes. Should I see a podiatrist?",
    a: "If you have diabetes, regular podiatric foot exams are an important part of staying ahead of complications. We perform thorough diabetic foot exams, screen for sensation and circulation changes, and coordinate with your primary care doctor. Many patients with Medicare have this covered yearly.",
  },
  {
    q: "Which location is the best fit for me?",
    a: "Pick whichever is closer. Our Mechanicsville office is at 7493 Right Flank Road, Suite 420 (just off Cold Harbor Rd). Our West End office is at 7301 Forest Avenue, Suite 310 in Richmond. The same providers see patients at both — we'll match you with the next available slot at your preferred location.",
  },
  {
    q: "Do I need a referral?",
    a: "For most insurance plans you do not need a referral to see a podiatrist. A few HMO plans do require one — when our team verifies your benefits, we'll tell you up-front whether a referral is needed for your specific plan.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-28 bg-[var(--color-surface-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]">
              Frequently asked
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] leading-[1.1]">
              Answers before you book.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-lg text-[var(--color-text-muted)]">
              Don&rsquo;t see your question? Call us &mdash; we&rsquo;ll talk it through on the
              phone with zero pressure to book.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
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

        <div className="lg:col-span-8 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={60 * i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left rounded-2xl bg-white border border-[var(--color-border)] px-5 sm:px-6 py-5 sm:py-6 shadow-sm hover:shadow-md transition cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)] leading-tight">
                      {f.q}
                    </h3>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full bg-[var(--color-soft-blue)] text-[var(--color-primary)] flex items-center justify-center transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </div>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[15px] sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
