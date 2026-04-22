"use client";
import { motion, useInView } from "framer-motion";
import { JSX, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { T_OVERLINE } from "@/lib/type";

/* ─── Card data ───────────────────────────────────────────────────── */
const CARDS = [
  {
    icon: "bag",
    metric: "+40%",
    label: "REVENUE GROWTH",
    text: "Redesigned the checkout flow for a Cairo-based fashion store, cutting cart abandonment and lifting monthly revenue in 45 days.",
    footer: "Fashion Brand — Egypt",
  },
  {
    icon: "chart",
    metric: "2×",
    label: "LEAD GENERATION",
    text: "Rebuilt the website and messaging for a B2B tech firm, doubling inbound inquiries within the first 60 days of launch.",
    footer: "Tech Startup — MENA",
  },
  {
    icon: "users",
    metric: "−65%",
    label: "BOUNCE RATE",
    text: "Full UX overhaul for a regional services company — clearer hierarchy and faster load times kept visitors engaged and converting.",
    footer: "Professional Services — Egypt",
  },
  {
    icon: "rocket",
    metric: "3×",
    label: "FASTER TO MARKET",
    text: "Took a SaaS product from wireframes to live in under 3 weeks, giving founders a head start before their funding round.",
    footer: "SaaS Product — MENA",
  },
  {
    icon: "star",
    metric: "98%",
    label: "CLIENT SATISFACTION",
    text: "Every project delivered on time, within scope, and with zero revision rounds after final handoff — across 10+ engagements.",
    footer: "Across All Clients",
  },
  {
    icon: "grid",
    metric: "+10",
    label: "PROJECTS DELIVERED",
    text: "From e-commerce to corporate sites and product design, every client shipped with a site built to perform and convert.",
    footer: "Egypt & MENA Region",
  },
];

/* ─── Icons ───────────────────────────────────────────────────────── */
function Icon({ name }: { name: string }): JSX.Element {
  const base = {
    width: 22, height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#9fcc2e",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "bag":
      return (
        <svg {...base}>
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      );
    case "chart":
      return (
        <svg {...base}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "users":
      return (
        <svg {...base}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...base}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11A22.35 22.35 0 0112 15z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "star":
      return (
        <svg {...base}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default: // grid
      return (
        <svg {...base}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
  }
}

/* ─── Single card ─────────────────────────────────────────────────── */
function ImpactCard({
  card,
  index,
  inView,
}: {
  card: (typeof CARDS)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="impact-card-wrap"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 85,
        damping: 22,
        delay: 0.15 + index * 0.1,
      }}
    >
      <div className="impact-card-inner">

        {/* Icon badge */}
        <div style={{
          width: 44, height: 44,
          borderRadius: 10,
          background: "rgba(159,204,46,0.1)",
          border: "1px solid rgba(159,204,46,0.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon name={card.icon} />
        </div>

        {/* Metric */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(40px, 5vw, 54px)",
            fontWeight: 700,
            color: "#9fcc2e",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-1.5px",
            textShadow: "0 0 28px rgba(159,204,46,0.35)",
          }}>
            {card.metric}
          </p>
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(240,245,232,0.4)",
            margin: 0,
            letterSpacing: "0.1em",
          }}>
            {card.label}
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          color: "rgba(240,245,232,0.65)",
          lineHeight: 1.7,
          margin: 0,
          flexGrow: 1,
        }}>
          {card.text}
        </p>

        {/* Footer */}
        <div style={{
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: "50%",
            background: "#9fcc2e",
            boxShadow: "0 0 6px rgba(159,204,46,0.7)",
            flexShrink: 0,
          }} />
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: "rgba(240,245,232,0.38)",
            margin: 0,
            letterSpacing: "0.03em",
          }}>
            {card.footer}
          </p>
        </div>

      </div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────── */
export default function Testimonials({ data }: { data?: object }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{ background: "#0f0f0f", padding: isMobile ? "60px 0" : "100px 0" }}
    >
      <div className="container-xl" style={{ display: "flex", flexDirection: "column", gap: isMobile ? "40px" : "52px" }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ ...T_OVERLINE, margin: 0 }}
          >
            Client Impact
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#f0f5e8",
              lineHeight: 1.2,
              margin: 0,
              maxWidth: 600,
            }}
          >
            Real results. Not just nice-looking websites.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.18 }}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(16px, 1.5vw, 18px)",
              fontWeight: 400,
              color: "rgba(240, 245, 232, 0.55)",
              margin: 0,
              maxWidth: 500,
              lineHeight: 1.65,
            }}
          >
            Every project is built around a single goal: measurable growth. Here&apos;s what that looks like in practice.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="impact-grid">
          {CARDS.map((card, i) => (
            <ImpactCard key={i} card={card} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}
