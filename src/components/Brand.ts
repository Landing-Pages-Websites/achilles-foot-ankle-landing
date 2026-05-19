// ─── Single source of truth for all spec-driven values on this LP ───
// Atlas task: cca3802e-1f9b-49ca-8a7b-abbd91db353e (Achilles Foot and Ankle — podiatry new-patient)
// Per LP rules: form fields, phone, GTM, etc. come from the Atlas task — not the live site.

export const BUSINESS_NAME = "Achilles Foot and Ankle Center";
export const SHORT_NAME = "Achilles Foot & Ankle";

export const PHONE = "(804) 273-1717";
export const PHONE_HREF = "tel:+18042731717";

// Two Richmond-area locations (per task brief + live site verification 2026-05-19)
export const LOCATIONS = [
  {
    name: "Mechanicsville",
    line1: "7493 Right Flank Road, Suite 420",
    line2: "Mechanicsville, VA 23116",
    mapQuery: "Achilles Foot and Ankle, 7493 Right Flank Road, Mechanicsville, VA 23116",
  },
  {
    name: "West End (Richmond)",
    line1: "7301 Forest Avenue, Suite 310",
    line2: "Richmond, VA 23226",
    mapQuery: "Achilles Foot and Ankle, 7301 Forest Avenue, Richmond, VA 23226",
  },
] as const;

export const HOURS = [
  ["Monday", "9:00 AM – 5:00 PM"],
  ["Tuesday", "9:00 AM – 5:00 PM"],
  ["Wednesday", "9:00 AM – 5:00 PM"],
  ["Thursday", "9:00 AM – 5:00 PM"],
  ["Friday", "9:00 AM – 5:00 PM"],
  ["Saturday", "By appointment"],
  ["Sunday", "Closed"],
] as const;

// Mega tracking — registered 2026-05-19 via `mega site-tracking enable`.
// site_url: https://book.achillesfootandankle.com
export const SITE_ID = "2e19f854-ef19-49fe-b220-4a55e63fe384";
export const SITE_KEY = "q0jvilg761pce0db";
export const CUSTOMER_ID = "013751f9-4939-4a5f-b5f9-51d2c99e5de0";
export const SOURCE_PROVIDER = "achilles-foot-ankle-landing";

// Customer-specific GTM (from Atlas task comment 2026-05-19)
export const CUSTOMER_GTM_ID = "GTM-K22KLGK";

// Form schema — matches Atlas task input_data.form_fields exactly.
// All options submit a lead (no LP-side disqualification — Peter mandate 2026-05-14).
export const INSURANCE_OPTIONS = [
  "Cash Pay",
  "Medicare",
  "Commercial (BCBS / Cigna / United / Aetna / etc.)",
  "Medicaid",
  "Humana",
  "Not Sure",
] as const;

export type InsuranceOption = (typeof INSURANCE_OPTIONS)[number];
