"use client";

import { useId, useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  CUSTOMER_ID,
  SITE_ID,
  SOURCE_PROVIDER,
  INSURANCE_OPTIONS,
  PHONE,
  PHONE_HREF,
} from "./Brand";

interface LeadFormProps {
  variant?: "hero" | "contact";
  headline?: string;
  subhead?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  insurance: string;
}

const initial: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  insurance: "",
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    MegaTag?: {
      trackEvent?: (
        eventName: string,
        eventData?: Record<string, unknown>
      ) => void;
      [k: string]: unknown;
    };
  }
}

export function LeadForm({
  variant = "hero",
  headline,
  subhead,
}: LeadFormProps) {
  const { status, errorMessage, submitLead } = useMegaLeadForm({
    customerId: CUSTOMER_ID,
    siteId: SITE_ID,
    sourceProvider: SOURCE_PROVIDER,
  });

  const fid = useId();
  const id = (k: string) => `${k}-${fid}`;

  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const inFlightRef = useRef(false);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const submitting = status === "submitting";
  const success = status === "success" || submitted;

  const formatPhone = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    const p = [];
    if (d.length > 0) p.push(d.slice(0, 3));
    if (d.length >= 4) p.push(d.slice(3, 6));
    if (d.length >= 7) p.push(d.slice(6, 10));
    return p.join("-");
  };

  const validate = (): string | null => {
    if (!data.firstName.trim()) return "Please enter your first name.";
    if (!data.lastName.trim()) return "Please enter your last name.";
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email))
      return "Please enter a valid email.";
    const digits = data.phone.replace(/\D/g, "");
    if (digits.length !== 10) return "Phone must be a 10-digit number.";
    if (!data.insurance) return "Please select your insurance type.";
    return null;
  };

  // Validate FIRST, then submit. Prevents Mega's optimizer (capture-phase
  // submit listener) from firing a phantom event on empty submit attempts.
  // See memory/lp-mistakes.md (SHLY Optimizer Empty-Submit).
  const handleClick = async () => {
    if (submitting || success || inFlightRef.current) return;
    const err = validate();
    if (err) {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        insurance: true,
      });
      return;
    }
    inFlightRef.current = true;

    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    const email = data.email.trim();
    const phone = data.phone.replace(/\D/g, "");
    const insurance = data.insurance;

    try {
      await submitLead({
        firstName,
        lastName,
        email,
        phone,
        insurance,
      });

      // Manually fire form_submit through MegaTag with SEPARATED field keys
      // (Peter mandate 2026-05-14). The validate-first + handleClick pattern
      // bypasses the optimizer's native-submit auto-detect, so we notify it
      // ourselves. Best-effort — never block the user.
      if (typeof window !== "undefined" && window.MegaTag?.trackEvent) {
        try {
          window.MegaTag.trackEvent("form_submit", {
            element: `form-${variant}`,
            firstName,
            lastName,
            email,
            phone,
            insurance,
            // Per task: ALL submissions are leads. No LP-side disqualification.
            qualified: "yes",
            disqualification_reason: "",
          });
        } catch {
          /* silent */
        }
      }

      // Push to GTM dataLayer for GA4/customer GTM tags that listen.
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submission",
          form_id: `achilles-${variant}`,
          value: 0,
        });
      }

      setSubmitted(true);
    } finally {
      inFlightRef.current = false;
    }
  };

  const handleNativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // ─── Success ───
  if (success) {
    return (
      <div
        className={`rounded-2xl p-8 sm:p-10 ${
          variant === "hero"
            ? "bg-white shadow-xl border border-[var(--color-border)]"
            : "bg-[var(--color-soft-blue)] border border-[var(--color-border)]"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-[var(--color-primary)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
            Thanks{data.firstName ? `, ${data.firstName}` : ""}!
          </h3>
          <p className="text-[var(--color-text-muted)] max-w-sm">
            We received your request. A member of our team will call you shortly to confirm
            your appointment. If you&rsquo;d like to talk now, call us at{" "}
            <a className="font-semibold text-[var(--color-primary)]" href={PHONE_HREF}>
              {PHONE}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const showError = (k: keyof FormData) => touched[k] && !data[k];

  return (
    <form
      ref={formRef}
      onSubmit={handleNativeSubmit}
      className={`relative rounded-2xl p-6 sm:p-8 ${
        variant === "hero"
          ? "bg-white shadow-2xl border border-[var(--color-border)]"
          : "bg-white shadow-lg border border-[var(--color-border)]"
      }`}
    >
      {(headline || subhead) && (
        <div className="mb-5 sm:mb-6">
          {headline && (
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] leading-tight">
              {headline}
            </h3>
          )}
          {subhead && (
            <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{subhead}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={id("firstName")} className="sr-only">
            First name
          </label>
          <input
            id={id("firstName")}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            placeholder="First name"
            className={`lp-input ${showError("firstName") ? "border-red-400" : ""}`}
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor={id("lastName")} className="sr-only">
            Last name
          </label>
          <input
            id={id("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            placeholder="Last name"
            className={`lp-input ${showError("lastName") ? "border-red-400" : ""}`}
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor={id("email")} className="sr-only">
          Email
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          className={`lp-input ${showError("email") ? "border-red-400" : ""}`}
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          disabled={submitting}
        />
      </div>

      <div className="mt-3">
        <label htmlFor={id("phone")} className="sr-only">
          Phone
        </label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9\-\s\(\)]*"
          autoComplete="tel"
          required
          placeholder="Phone number"
          className={`lp-input ${showError("phone") ? "border-red-400" : ""}`}
          value={data.phone}
          onChange={(e) => update("phone", formatPhone(e.target.value))}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          disabled={submitting}
        />
      </div>

      <div className="mt-3 relative">
        <label htmlFor={id("insurance")} className="sr-only">
          Insurance type
        </label>
        <select
          id={id("insurance")}
          name="insurance"
          required
          className={`lp-input appearance-none pr-10 ${
            !data.insurance ? "text-[#6b7280]" : ""
          } ${showError("insurance") ? "border-red-400" : ""}`}
          value={data.insurance}
          onChange={(e) => update("insurance", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, insurance: true }))}
          disabled={submitting}
        >
          <option value="" disabled>
            Select your insurance
          </option>
          {INSURANCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="w-5 h-5 text-[#9CA3AF]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      {errorMessage && status === "error" && (
        <div className="mt-3 text-sm text-red-600">{errorMessage}</div>
      )}

      <button
        // type="button" — NOT "submit". Prevents the optimizer's capture-phase
        // submit listener from firing on empty/invalid forms. We validate first.
        type="button"
        onClick={handleClick}
        disabled={submitting || success}
        className="btn-primary w-full mt-5 text-base sm:text-lg py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting…" : "Request My Appointment"}
      </button>

      <p className="mt-3 text-[11px] sm:text-xs leading-relaxed text-[var(--color-text-muted)] text-center">
        By submitting, you agree to be contacted about your appointment. We respect
        your privacy. No spam, no pressure &mdash; just a friendly call from our team.
      </p>
    </form>
  );
}
