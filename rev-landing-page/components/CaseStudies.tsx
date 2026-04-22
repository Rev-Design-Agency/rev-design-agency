"use client";

/**
 * CaseStudies — scroll-driven sticky card stack
 *
 * Desktop mechanism (pure CSS, no JS):
 *   • Outer wrapper: position relative — height auto (sum of children)
 *   • Each .block: position relative, height 220vh
 *       → gives ~120vh of "dwell time" per card before the next one takes over
 *   • Each .row inside .block: position sticky, top 0, height 100vh
 *       → stays pinned while its parent block is in the scroll window
 *   • z-index ascends (card 1 < card 2 < card 3) so later cards slide UP
 *       over earlier ones, creating the "push-off" effect.
 *
 * Mobile: plain vertical stack (no sticky — each card = colored panel + text).
 */

import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ─── Types ──────────────────────────────────────────────── */
type Card = {
  id: string;          // "01" | "02" | "03"
  label: string;       // pill text
  title: string;       // large heading
  subtitle: string;    // small category above title
  description: string;
  tags: readonly string[];
  color: string;       // right-panel background
  ink: string;         // text/illustration colour that reads on `color`
  href: string;        // "View Case Study" destination
};

/* ─── Card data ───────────────────────────────────────────── */
// ↓ Edit this array to change content, colours, or links.
const CARDS: Card[] = [
  {
    id: "01",
    label: "Case Study",
    title: "Oathnet",
    subtitle: "Social Platform",
    description:
      "Built a full social network from concept to launch — brand identity, design system, and full-stack development. Reached 50,000 users within 90 days of going live.",
    tags: ["Brand Identity", "UI / UX", "Full-Stack Dev"],
    color: "#7182cb",
    ink: "#ffffff",
    href: "/case-studies/oathnet",
  },
  {
    id: "02",
    label: "Case Study",
    title: "efxPro",
    subtitle: "Trading Platform",
    description:
      "Redesigned a high-frequency trading dashboard for precision and speed. Cut user error rate by 68 % and reduced average trade execution time by 40 %.",
    tags: ["Product Design", "Development", "UX Research"],
    color: "#b9ed00",
    ink: "#0d1a00",
    href: "/case-studies/efxpro",
  },
  {
    id: "03",
    label: "Case Study",
    title: "PowerHouse",
    subtitle: "eCommerce Store",
    description:
      "End-to-end eCommerce redesign with a conversion-first layout. Delivered a 2.4× lift in checkout completion and a 90-point Lighthouse performance score.",
    tags: ["eCommerce", "Dev", "CRO"],
    color: "#FF6716",
    ink: "#ffffff",
    href: "/case-studies/powerhouse",
  },
];

/* ─── SVG illustrations (one per card) ───────────────────── */
// Each renders into the bottom-right of the coloured right panel.
// Uses rgba(0,0,0,…) tones so they work on any background colour.

function IllustrationOathnet() {
  /* Mobile social-app screen */
  const d = (o: number) => `rgba(0,0,0,${o})`;
  return (
    <svg width="220" height="380" viewBox="0 0 220 380" fill="none">
      {/* shell */}
      <rect x="10" y="0" width="200" height="376" rx="26" fill={d(0.18)} stroke={d(0.22)} strokeWidth="1.5"/>
      {/* notch */}
      <rect x="80" y="12" width="60" height="9" rx="4.5" fill={d(0.22)}/>
      {/* screen bg */}
      <rect x="18" y="34" width="184" height="308" rx="6" fill={d(0.1)}/>
      {/* avatar row */}
      <circle cx="44" cy="66" r="15" fill={d(0.3)}/>
      <rect x="66" y="56" width="76" height="7" rx="3.5" fill={d(0.28)}/>
      <rect x="66" y="69" width="52" height="5.5" rx="2.75" fill={d(0.17)}/>
      {/* post image */}
      <rect x="26" y="92" width="168" height="104" rx="7" fill={d(0.2)}/>
      {/* reactions */}
      <rect x="26" y="205" width="46" height="7" rx="3.5" fill={d(0.26)}/>
      <rect x="82" y="205" width="34" height="7" rx="3.5" fill={d(0.16)}/>
      {/* 2nd post row */}
      <circle cx="42" cy="238" r="11" fill={d(0.25)}/>
      <rect x="61" y="231" width="64" height="6" rx="3" fill={d(0.26)}/>
      <rect x="61" y="243" width="42" height="5" rx="2.5" fill={d(0.14)}/>
      {/* 2nd post image */}
      <rect x="26" y="258" width="168" height="62" rx="7" fill={d(0.15)}/>
      {/* bottom nav divider + icons */}
      <rect x="18" y="320" width="184" height="1" fill={d(0.12)}/>
      <circle cx="74" cy="348" r="8" fill={d(0.2)}/>
      <circle cx="110" cy="348" r="8" fill={d(0.38)}/>
      <circle cx="146" cy="348" r="8" fill={d(0.2)}/>
    </svg>
  );
}

function IllustrationEfxPro() {
  /* Trading dashboard: chart + stats sidebar */
  const d = (o: number) => `rgba(0,0,0,${o})`;
  return (
    <svg width="380" height="256" viewBox="0 0 380 256" fill="none">
      {/* frame */}
      <rect x="8" y="8" width="364" height="240" rx="12" fill={d(0.22)} stroke={d(0.18)} strokeWidth="1"/>
      {/* header */}
      <rect x="8" y="8" width="364" height="34" rx="12" fill={d(0.14)}/>
      <rect x="22" y="19" width="58" height="9" rx="4.5" fill={d(0.28)}/>
      <circle cx="342" cy="25" r="7" fill={d(0.22)}/>
      <circle cx="322" cy="25" r="7" fill={d(0.16)}/>
      {/* chart panel */}
      <rect x="22" y="52" width="218" height="148" rx="8" fill={d(0.14)}/>
      {/* axis labels */}
      <rect x="26" y="60" width="26" height="4.5" rx="2.25" fill={d(0.18)}/>
      <rect x="26" y="97" width="26" height="4.5" rx="2.25" fill={d(0.18)}/>
      <rect x="26" y="134" width="26" height="4.5" rx="2.25" fill={d(0.18)}/>
      <rect x="26" y="171" width="26" height="4.5" rx="2.25" fill={d(0.18)}/>
      {/* price line */}
      <polyline
        points="60,168 80,155 100,150 120,138 140,128 160,116 180,108 200,100 220,94 232,96"
        stroke={d(0.65)} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* area fill */}
      <path
        d="M60,168 80,155 100,150 120,138 140,128 160,116 180,108 200,100 220,94 232,96 232,190 60,190Z"
        fill={d(0.1)}
      />
      {/* highlight dots */}
      <circle cx="160" cy="116" r="4" fill={d(0.55)}/>
      <circle cx="220" cy="94" r="4" fill={d(0.55)}/>
      {/* candle wicks */}
      <line x1="80" y1="148" x2="80" y2="162" stroke={d(0.35)} strokeWidth="1"/>
      <line x1="140" y1="120" x2="140" y2="136" stroke={d(0.35)} strokeWidth="1"/>
      <line x1="200" y1="93" x2="200" y2="107" stroke={d(0.35)} strokeWidth="1"/>
      {/* stats column — 3 cards */}
      {([0, 1, 2] as const).map((i) => (
        <g key={i}>
          <rect x="252" y={52 + i * 52} width="114" height="42" rx="6" fill={d(0.17)}/>
          <rect x="262" y={60 + i * 52} width="48" height="5.5" rx="2.75" fill={d(0.22)}/>
          <rect x="262" y={71 + i * 52} width="34" height="9" rx="4.5" fill={d(0.42)}/>
        </g>
      ))}
      {/* bottom bar */}
      <rect x="22" y="208" width="106" height="17" rx="5" fill={d(0.16)}/>
      <rect x="138" y="208" width="106" height="17" rx="5" fill={d(0.16)}/>
      <rect x="254" y="208" width="112" height="17" rx="5" fill={d(0.32)}/>
    </svg>
  );
}

function IllustrationPowerHouse() {
  /* eCommerce page: browser chrome + product grid */
  const d = (o: number) => `rgba(255,255,255,${o})`;
  return (
    <svg width="356" height="268" viewBox="0 0 356 268" fill="none">
      {/* browser frame */}
      <rect x="8" y="8" width="340" height="252" rx="12" fill={d(0.12)} stroke={d(0.14)} strokeWidth="1.5"/>
      {/* tab bar */}
      <rect x="8" y="8" width="340" height="30" rx="12" fill={d(0.07)}/>
      <circle cx="30" cy="23" r="5" fill={d(0.28)}/>
      <circle cx="46" cy="23" r="5" fill={d(0.28)}/>
      <circle cx="62" cy="23" r="5" fill={d(0.28)}/>
      <rect x="78" y="15" width="186" height="16" rx="8" fill={d(0.09)}/>
      <rect x="308" y="15" width="30" height="16" rx="8" fill={d(0.22)}/>
      {/* nav strip */}
      <rect x="20" y="50" width="42" height="7" rx="3.5" fill={d(0.48)}/>
      <rect x="72" y="50" width="32" height="7" rx="3.5" fill={d(0.2)}/>
      <rect x="114" y="50" width="32" height="7" rx="3.5" fill={d(0.2)}/>
      <rect x="156" y="50" width="32" height="7" rx="3.5" fill={d(0.2)}/>
      <rect x="294" y="44" width="46" height="20" rx="10" fill={d(0.32)}/>
      {/* product card top-left */}
      <rect x="20" y="72" width="148" height="86" rx="7" fill={d(0.11)}/>
      <rect x="20" y="162" width="56" height="7" rx="3.5" fill={d(0.32)}/>
      <rect x="20" y="173" width="38" height="9" rx="4.5" fill={d(0.55)}/>
      {/* product card top-right */}
      <rect x="180" y="72" width="148" height="86" rx="7" fill={d(0.11)}/>
      <rect x="180" y="162" width="56" height="7" rx="3.5" fill={d(0.32)}/>
      <rect x="180" y="173" width="38" height="9" rx="4.5" fill={d(0.55)}/>
      {/* product card bottom-left (partial) */}
      <rect x="20" y="194" width="148" height="58" rx="7" fill={d(0.07)}/>
      {/* product card bottom-right (partial) */}
      <rect x="180" y="194" width="148" height="58" rx="7" fill={d(0.07)}/>
    </svg>
  );
}

const ILLUSTRATIONS = [IllustrationOathnet, IllustrationEfxPro, IllustrationPowerHouse] as const;

/* ─── Shared header ───────────────────────────────────────── */
function SectionHeader({ padLeft }: { padLeft?: boolean }) {
  return (
    <div
      style={{
        padding: `clamp(72px,10vh,110px) clamp(24px,6vw,80px) clamp(48px,6vh,60px) ${
          padLeft ? "clamp(24px,6vw,80px)" : "clamp(24px,6vw,80px)"
        }`,
        maxWidth: "720px",
      }}
    >
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          color: "#9fcc2e",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: "14px",
        }}
      >
        Our Work
      </p>
      <h2
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(30px,4vw,52px)",
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "#f0f5e8",
          marginBottom: "16px",
        }}
      >
        Projects that speak{" "}
        <span style={{ color: "#9fcc2e" }}>louder than promises.</span>
      </h2>
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(14px,1.4vw,17px)",
          fontWeight: 400,
          color: "#4a5a6a",
          lineHeight: 1.7,
        }}
      >
        Not mockups. Not portfolio samples. Real products, shipped and scaling.
      </p>
    </div>
  );
}

/* ─── Desktop card block ──────────────────────────────────── */
function DesktopCard({
  card,
  index,
  total,
}: {
  card: Card;
  index: number;
  total: number;
}) {
  /**
   * z-index ascends so card 2 slides over card 1, card 3 over card 2.
   * The sticky row stays pinned for the full 220vh of its parent block.
   */
  const zIndex = index + 1;
  const Illustration = ILLUSTRATIONS[index];

  return (
    <div
      /* ── Scroll block: 220 vh ─────────────────────────────
         The extra 120 vh (beyond the 100 vh sticky row) is the
         "dwell time" — how long this card is visible before the
         next one starts sliding in from below.               */
      style={{ position: "relative", height: "220vh", zIndex }}
    >
      {/* ── Sticky row ──────────────────────────────────────
          Stays at top:0 for as long as the parent block is
          in the scroll window, then scrolls away naturally.  */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          overflow: "hidden",
          zIndex,
        }}
      >
        {/* ════ LEFT: text column ════════════════════════════ */}
        <div
          style={{
            width: "50%",
            height: "100%",
            background: "#000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(48px,6vw,90px)",
            position: "relative",
            overflow: "hidden",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Ghost number watermark */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-12px",
              right: "20px",
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(120px,18vw,220px)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.025)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {card.id}
          </span>

          {/* Pill badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(159,204,46,0.1)",
              border: "1px solid rgba(159,204,46,0.22)",
              borderRadius: "999px",
              padding: "5px 14px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "#9fcc2e",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              width: "fit-content",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#9fcc2e",
                boxShadow: "0 0 5px #9fcc2e",
              }}
            />
            {card.label} {card.id}
          </span>

          {/* Category */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#3a4a5a",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            {card.subtitle}
          </p>

          {/* Title */}
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(44px,5.5vw,82px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#f0f5e8",
              marginBottom: "20px",
            }}
          >
            {card.title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(14px,1.25vw,17px)",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#5a6a7a",
              maxWidth: "400px",
              marginBottom: "28px",
            }}
          >
            {card.description}
          </p>

          {/* Tags */}
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}
          >
            {card.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                  padding: "4px 12px",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "11.5px",
                  fontWeight: 500,
                  color: "#6a7a8a",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA link */}
          <a
            href={card.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#f0f5e8",
              textDecoration: "none",
              width: "fit-content",
              paddingBottom: "3px",
              borderBottom: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            View Case Study
            {/* arrow icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Counter bottom-right */}
          <span
            style={{
              position: "absolute",
              bottom: "36px",
              right: "36px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.12)",
              letterSpacing: "0.12em",
            }}
          >
            {card.id} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* ════ RIGHT: coloured visual panel ════════════════ */}
        <div
          style={{
            width: "50%",
            height: "100%",
            background: card.color,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "clamp(28px,4vw,48px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Giant watermark title */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-14px",
              left: "-8px",
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(80px,13vw,180px)",
              fontWeight: 700,
              color: "rgba(0,0,0,0.07)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {card.title}
          </span>

          {/* Illustration */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <Illustration />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile card ─────────────────────────────────────────── */
function MobileCard({ card }: { card: Card }) {
  return (
    <article style={{ background: "#000", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Coloured top panel */}
      <div
        style={{
          background: card.color,
          height: "52vw",
          minHeight: "220px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: "20px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* watermark */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-6px",
            left: "0",
            fontFamily: "'Sora', sans-serif",
            fontSize: "72px",
            fontWeight: 700,
            color: "rgba(0,0,0,0.07)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {card.title}
        </span>
        {/* index badge */}
        <span
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            color: card.ink,
            opacity: 0.5,
            letterSpacing: "0.08em",
          }}
        >
          {card.id}
        </span>
      </div>

      {/* Text panel */}
      <div style={{ padding: "28px 24px 36px" }}>
        {/* Badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(159,204,46,0.1)",
            border: "1px solid rgba(159,204,46,0.2)",
            borderRadius: "999px",
            padding: "4px 12px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            color: "#9fcc2e",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}
        >
          <span
            style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#9fcc2e" }}
          />
          {card.label} {card.id}
        </span>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            color: "#3a4a5a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          {card.subtitle}
        </p>

        <h3
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#f0f5e8",
            marginBottom: "12px",
          }}
        >
          {card.title}
        </h3>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "#5a6a7a",
            marginBottom: "18px",
          }}
        >
          {card.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "22px" }}>
          {card.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "5px",
                padding: "3px 10px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#6a7a8a",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={card.href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#f0f5e8",
            textDecoration: "none",
            paddingBottom: "2px",
            borderBottom: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          View Case Study
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  );
}

/* ─── Root export ─────────────────────────────────────────── */
export default function CaseStudies() {
  const isMobile = useIsMobile();

  return (
    <section
      id="case-studies"
      aria-label="Case Studies"
      style={{ background: "#000" }}
    >
      <SectionHeader />

      {isMobile ? (
        /* ── Mobile: plain vertical stack ── */
        <div>
          {CARDS.map((card) => (
            <MobileCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        /* ── Desktop: sticky scroll stack ── */
        <div style={{ position: "relative" }}>
          {CARDS.map((card, i) => (
            <DesktopCard key={card.id} card={card} index={i} total={CARDS.length} />
          ))}
        </div>
      )}

      {/* Breathing room before the next section */}
      <div style={{ height: isMobile ? "60px" : "100px", background: "#000" }} />
    </section>
  );
}
