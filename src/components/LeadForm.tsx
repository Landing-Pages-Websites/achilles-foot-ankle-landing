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

type FieldKey = keyof FormData;

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

// Per-field validators. Return null when valid, an error string otherwise.
// These are pure and reused for both on-blur and on-submit validation, so the
// user sees the SAME message inline as they type/blur that would have blocked
// a submit attempt.
const validators: Record<FieldKey, (v: string) => string | null> = {
  firstName: (v) => (v.trim() ? null : "Please enter your first name."),
  lastName: (v) => (v.trim() ? null : "Please enter your last name."),
  email: (v) => {
    const t = v.trim();
    if (!t) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(t)) return "Please enter a valid email address.";
    return null;
  },
  phone: (v) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) return "Please enter your phone number.";
    if (digits.length !== 10) return "Phone must be a 10-digit number.";
    return null;
  },
  insurance: (v) => (v ? null : "Please select your insurance type."),
};

const FIELD_ORDER: FieldKey[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "insurance",
];

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
  const errId = (k: string) => `${k}-err-${fid}`;

  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    insurance: false,
  });
  const inFlightRef = useRef(false);

  const update = <K extends FieldKey>(k: K, v: FormData[K]) =>
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

  // Per-field error. Once a field is touched (blurred) or after a submit
  // attempt, the error stays visible and updates live as the user edits.
  const fieldError = (k: FieldKey): string | null => {
    if (!touched[k]) return null;
    return validators[k](data[k]);
  };

  const firstInvalidField = (): FieldKey | null => {
    for (const k of FIELD_ORDER) {
      if (validators[k](data[k])) return k;
    }
    return null;
  };

  // Validate FIRST, then submit. Prevents Mega's optimizer (capture-phase
  // submit listener) from firing a phantom event on empty submit attempts.
  // See memory/lp-mistakes.md (SHLY Optimizer Empty-Submit).
  const handleClick = async () => {
    if (submitting || success || inFlightRef.current) return;
    const invalid = firstInvalidField();
    if (invalid) {
      // Mark every field as touched so all inline errors appear at once,
      // then focus the first invalid one so the user knows what to fix.
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        insurance: true,
      });
      const el = document.getElementById(id(invalid));
      if (el && typeof (el as HTMLElement).focus === "function") {
        (el as HTMLElement).focus({ preventScroll: false });
      }
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

  // Small inline error renderer used under every field.
  const ErrorText = ({ field }: { field: FieldKey }) => {
    const err = fieldError(field);
    if (!err) return null;
    return (
      <p
        id={errId(field)}
        role="alert"
        aria-live="polite"
        className="mt-1.5 text-xs font-medium text-red-600 flex items-start gap-1"
      >
        <svg
          className="w-3.5 h-3.5 mt-[1px] flex-none"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-11.25a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0v-4Zm.75 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
        <span>{err}</span>
      </p>
    );
  };

  const inputClass = (k: FieldKey, extra = "") =>
    `lp-input ${fieldError(k) ? "lp-input-error" : ""} ${extra}`.trim();

  return (
    <form
      ref={formRef}
      onSubmit={handleNativeSubmit}
      noValidate
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
            aria-invalid={fieldError("firstName") ? true : undefined}
            aria-describedby={fieldError("firstName") ? errId("firstName") : undefined}
            className={inputClass("firstName")}
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
            disabled={submitting}
          />
          <ErrorText field="firstName" />
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
            aria-invalid={fieldError("lastName") ? true : undefined}
            aria-describedby={fieldError("lastName") ? errId("lastName") : undefined}
            className={inputClass("lastName")}
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
            disabled={submitting}
          />
          <ErrorText field="lastName" />
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
          aria-invalid={fieldError("email") ? true : undefined}
          aria-describedby={fieldError("email") ? errId("email") : undefined}
          className={inputClass("email")}
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          disabled={submitting}
        />
        <ErrorText field="email" />
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
          aria-invalid={fieldError("phone") ? true : undefined}
          aria-describedby={fieldError("phone") ? errId("phone") : undefined}
          className={inputClass("phone")}
          value={data.phone}
          onChange={(e) => update("phone", formatPhone(e.target.value))}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          disabled={submitting}
        />
        <ErrorText field="phone" />
      </div>

      <div className="mt-3 relative">
        <label htmlFor={id("insurance")} className="sr-only">
          Insurance type
        </label>
        <select
          id={id("insurance")}
          name="insurance"
          required
          aria-invalid={fieldError("insurance") ? true : undefined}
          aria-describedby={fieldError("insurance") ? errId("insurance") : undefined}
          className={inputClass(
            "insurance",
            `appearance-none pr-10 ${!data.insurance ? "text-[#6b7280]" : ""}`
          )}
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
        <ErrorText field="insurance" />
      </div>

      {errorMessage && status === "error" && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {errorMessage}
        </div>
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
