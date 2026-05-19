"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate from below (default), or from the side */
  variant?: "up" | "left" | "right" | "fade";
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const fromMap: Record<NonNullable<RevealProps["variant"]>, string> = {
    up: "translate-y-8",
    left: "-translate-x-6",
    right: "translate-x-6",
    fade: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${fromMap[variant]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
