/**
 * Nexafix brochure config - ConnexFM / contact details
 */

export const CONFIG = {
  // ConnexFM expo details
  eventName: "ConnexFM Expo",
  eventYear: "2025",
  boothNumber: "TBD", // e.g. "A42"
  boothMessage: "Visit us at our booth",

  brandName: "Nexafix",
  legalName: "Nexa-Fix LLC",

  // Contact
  website: "https://www.nexa-fix.com",
  email: "info@nexa-fix.com",
  phone: "(508) 444-5080",
  /** Path for the QR on the last brochure slide; opens in the visitor’s browser, not as another slide. */
  contactCardPath: "/contact-card",

  // Social proof
  testimonial: "Nexafix transformed how we handle maintenance across 12 sites.",
  testimonialAttribution: "Facility Director, Retail",
  facilitiesServed: "50+",
} as const;

/** Absolute URL for the contact-card page (QR on CTA). Uses current origin when run in the browser. */
export function getContactCardUrl(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${CONFIG.contactCardPath}`;
  }
  const base =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    CONFIG.website.replace(/\/$/, "");
  return `${base}${CONFIG.contactCardPath}`;
}

/** US-style display numbers → tel: link for tap-to-call */
export function getTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  return digits ? `tel:+${digits}` : "";
}
