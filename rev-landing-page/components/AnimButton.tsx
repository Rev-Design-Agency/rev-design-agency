"use client";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

type Props = {
  href?: string;
  children: string;
  variant?: "dark" | "green" | "outline" | "outline-dark";
  style?: CSSProperties;
  noDot?: boolean;
  target?: string;
  /** Override the GA4 event name. Pass false to disable tracking. */
  trackEvent?: string | false;
};

/* Fire GA4 + Meta Pixel events for every booking CTA click */
function fireBookingEvent(label: string, eventName: string) {
  try {
    // GA4 — mark this as a Key Event in GA4 dashboard after adding
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, {
        event_category: "CTA",
        event_label: label,
      });
    }
    // Meta Pixel Lead event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", { content_name: label });
    }
  } catch (_) {
    // never block navigation on analytics failure
  }
}

const BOOKING_PATTERNS = ["calendly", "book", "call", "meeting", "contact", "audit"];

function isBookingHref(href?: string) {
  if (!href) return false;
  const lower = href.toLowerCase();
  return BOOKING_PATTERNS.some((p) => lower.includes(p));
}

export default function AnimButton({
  href = "#contact",
  children,
  variant = "dark",
  style,
  noDot,
  target,
  trackEvent,
}: Props) {
  const base =
    variant === "dark"
      ? "btn-dark"
      : variant === "outline"
      ? "btn-outline"
      : variant === "outline-dark"
      ? "btn-outline-dark"
      : "btn-green";

  // Determine if we should fire a tracking event on click
  const shouldTrack = trackEvent !== false && (trackEvent || isBookingHref(href));
  const eventName   = typeof trackEvent === "string" ? trackEvent : "book_call_click";

  const handleClick = () => {
    if (shouldTrack) {
      fireBookingEvent(children, eventName);
    }
  };

  return (
    <motion.a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={noDot ? `${base} btn-no-dot` : base}
      style={style}
      data-cursor="cta"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
    >
      {/* clip wrapper — shows exactly one line of text */}
      <div style={{ overflow: "hidden", height: "1.3em", lineHeight: "1.3em" }}>
        <div className="btn-label">
          <span style={{ display: "block" }}>{children}</span>
          <span style={{ display: "block" }}>{children}</span>
        </div>
      </div>
    </motion.a>
  );
}
