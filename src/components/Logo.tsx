"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  /** Render light text/inverted treatment for dark backgrounds. */
  inverse?: boolean;
}

/**
 * Achilles Foot and Ankle Center logo lock-up.
 * The customer's brand asset is a raster PNG (sourced from
 * achillesfootandankle.com/wp-content/uploads/2022/10/Logo.png).
 * On dark backgrounds we render the wordmark only (no inverse PNG
 * is published by the customer), with crisp uppercase typography
 * styled to match the original.
 */
export function Logo({ className = "h-12", inverse = false }: LogoProps) {
  if (inverse) {
    return (
      <div className={`flex flex-col leading-tight ${className}`}>
        <span className="font-[var(--font-manrope)] font-extrabold tracking-tight text-[17px] sm:text-[19px] uppercase text-white">
          Achilles
        </span>
        <span className="font-[var(--font-inter)] font-semibold tracking-[0.18em] text-[10px] sm:text-[11px] uppercase text-white/80">
          Foot &amp; Ankle Center
        </span>
      </div>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="Achilles Foot and Ankle Center"
      width={1366}
      height={377}
      className={`${className} w-auto`}
      priority
    />
  );
}
