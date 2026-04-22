"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const SORA = "'Sora', sans-serif";
const CALENDLY_URL = "https://calendly.com/youssefhishmat/meeting-with-youssef";

function fireGA4() {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "book_call_click", {
        event_category: "CTA",
        event_label: "Sticky Bar",
      });
    }
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", { content_name: "Sticky Bar" });
    }
  } catch (_) {}
}

export default function StickyCallBar({ calendlyUrl }: { calendlyUrl?: string }) {
  const isMobile   = useIsMobile();
  const [visible,  setVisible]  = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const href = calendlyUrl || CALENDLY_URL;

  useEffect(() => {
    // Show after scrolling 500px (past the hero)
    const threshold = 500;
    const onScroll = () => {
      if (window.scrollY > threshold && !dismissed) {
        setVisible(true);
      } else if (window.scrollY <= threshold) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-bar"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9990,
            background: "#0f0f0f",
            borderTop: "1px solid #1e1e1e",
            padding: isMobile ? "12px 16px" : "14px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* Left text — desktop only */}
          {!isMobile && (
            <p
              style={{
                fontFamily: SORA,
                fontSize: 14,
                color: "rgba(240,245,232,0.55)",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              🔥 Only <strong style={{ color: "#f0f5e8" }}>3 spots</strong> available this month
            </p>
          )}

          {/* CTA button — full width on mobile */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={fireGA4}
            style={{
              flex: isMobile ? 1 : "0 0 auto",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#9fcc2e",
              color: "#101405",
              fontFamily: SORA,
              fontSize: isMobile ? 15 : 15,
              fontWeight: 600,
              padding: "13px 28px",
              minHeight: "48px",
              borderRadius: 999,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "filter 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "none"; }}
          >
            Book Your Free Strategy Call →
          </a>

          {/* Mobile urgency text */}
          {isMobile && (
            <p
              style={{
                fontFamily: SORA,
                fontSize: 11,
                color: "rgba(240,245,232,0.4)",
                margin: 0,
                flexShrink: 0,
              }}
            >
              3 spots left
            </p>
          )}

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            style={{
              background: "none",
              border: "none",
              color: "rgba(240,245,232,0.3)",
              cursor: "pointer",
              padding: "4px 6px",
              fontSize: 18,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
