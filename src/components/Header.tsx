"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { PHONE, PHONE_HREF } from "./Brand";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm border-b border-[var(--color-border)]"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <a href="#hero" className="shrink-0" aria-label="Achilles Foot and Ankle Center — home">
          <Logo className="h-10 sm:h-12" />
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_HREF}
            className="hidden sm:inline-flex items-center gap-2 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg px-3 py-2 font-semibold text-sm hover:bg-[var(--color-primary)] hover:text-white transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
            </svg>
            {PHONE}
          </a>
          <a href="#contact" className="btn-primary text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3">
            Book Same-Day Visit
          </a>
        </div>
      </div>
    </header>
  );
}
