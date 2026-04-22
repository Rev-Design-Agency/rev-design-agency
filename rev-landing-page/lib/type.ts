/**
 * REV Design Agency — Global Typographic Scale
 *
 * Import these constants into every component.
 * Never hard-code a font-size, font-weight, or heading color inline.
 *
 * HIERARCHY
 *  Overline  →  H2  →  Lead  →  Body  (H1 is hero-only, H3 is card/step level)
 */

import type { CSSProperties } from "react";

/* ─── Shared base ─────────────────────────────────────────────────── */
const SORA = "'Sora', sans-serif";

/* ─────────────────────────────────────────────────────────────────────
   OVERLINE
   Small uppercase label that sits above every section H2.
   Replaces the old Handlee cursive labels.
──────────────────────────────────────────────────────────────────────*/
export const T_OVERLINE: CSSProperties = {
  fontFamily: "var(--font-mono), 'JetBrains Mono', 'Roboto Mono', monospace",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  lineHeight: 1.4,
  margin: 0,
  color: "#9fcc2e",          // neon green — works on all dark sections
};

/** White-background variant (Portfolio section) */
export const T_OVERLINE_LIGHT: CSSProperties = {
  ...T_OVERLINE,
  color: "#101405",
};

/* ─────────────────────────────────────────────────────────────────────
   H1  —  Hero headline only. Never used again on the page.
──────────────────────────────────────────────────────────────────────*/
export const T_H1_DESKTOP: CSSProperties = {
  fontFamily: SORA,
  fontSize: "clamp(44px, 5.5vw, 72px)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  margin: 0,
  color: "#f0f5e8",
};

export const T_H1_MOBILE: CSSProperties = {
  ...T_H1_DESKTOP,
  fontSize: "clamp(36px, 9vw, 54px)",
};

/* ─────────────────────────────────────────────────────────────────────
   H2  —  Every main section title. Identical size & weight site-wide.
──────────────────────────────────────────────────────────────────────*/
export const T_H2: CSSProperties = {
  fontFamily: SORA,
  fontSize: "clamp(32px, 4vw, 52px)",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
  margin: 0,
  color: "#f0f5e8",
};

/** White-background variant (Portfolio section) */
export const T_H2_LIGHT: CSSProperties = {
  ...T_H2,
  color: "#101405",
};

/* ─────────────────────────────────────────────────────────────────────
   H3  —  Card titles, step titles, sub-headers inside content.
──────────────────────────────────────────────────────────────────────*/
export const T_H3: CSSProperties = {
  fontFamily: SORA,
  fontSize: "20px",
  fontWeight: 600,
  lineHeight: 1.3,
  margin: 0,
  color: "#f0f5e8",
};

export const T_H3_LIGHT: CSSProperties = {
  ...T_H3,
  color: "#101405",
};

/* ─────────────────────────────────────────────────────────────────────
   LEAD  —  Tagline / subheadline that sits directly under an H2.
──────────────────────────────────────────────────────────────────────*/
export const T_LEAD: CSSProperties = {
  fontFamily: SORA,
  fontSize: "clamp(16px, 1.5vw, 18px)",
  fontWeight: 400,
  lineHeight: 1.65,
  margin: 0,
  color: "rgba(240, 245, 232, 0.55)",
};

export const T_LEAD_LIGHT: CSSProperties = {
  ...T_LEAD,
  color: "#6a6a6a",
};

/* ─────────────────────────────────────────────────────────────────────
   BODY  —  Long-form paragraphs.
──────────────────────────────────────────────────────────────────────*/
export const T_BODY: CSSProperties = {
  fontFamily: SORA,
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: 1.6,
  margin: 0,
  color: "rgba(240, 245, 232, 0.45)",
};

export const T_BODY_LIGHT: CSSProperties = {
  ...T_BODY,
  color: "#4a4a4a",
};

/* ─────────────────────────────────────────────────────────────────────
   CAPTION  —  Small metadata: tags, dates, footer notes.
──────────────────────────────────────────────────────────────────────*/
export const T_CAPTION: CSSProperties = {
  fontFamily: SORA,
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: 1.4,
  margin: 0,
  color: "rgba(240, 245, 232, 0.38)",
};

/* ─────────────────────────────────────────────────────────────────────
   SECTION SPACING  —  Consistent gaps between header block elements.
──────────────────────────────────────────────────────────────────────*/
export const SECTION_GAP = {
  overlineToH2: 12,    // px gap between overline label and H2
  h2ToLead: 16,        // px gap between H2 and lead/subheadline
  headerToContent: 56, // px gap between the header block and the main content
} as const;
