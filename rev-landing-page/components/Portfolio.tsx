"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import { T_OVERLINE_LIGHT, T_H2_LIGHT, T_H3_LIGHT, T_BODY_LIGHT } from "@/lib/type";

/* ─────────────────────────────────────────────────────────────────────
   DATA  — exact text & layout values from Figma node 636:20548
   imageLeftPct / imageWidthPct are % of card width → scales fluidly
──────────────────────────────────────────────────────────────────────*/
const CASES = [
  {
    cmsKey: "Elve",
    bg: "#212121",
    imageSrc: "/case-study-elve.jpg",
    imageLeftPct: -18.4,   // -86  / 467
    imageWidthPct: 136.6,  //  638 / 467
    imageTopPx: -22,
    imageHeightPx: 478,
    title: "Elve · Egypt · E-Commerce",
    description:
      "A premium e-commerce concept designed to reduce decision friction and improve conversion by connecting user intent with clear, structured shopping experiences.",
    href: "/case-studies/elve",
  },
  {
    cmsKey: "Clarity",
    bg: "#fae56c",
    imageSrc: "/case-study-clarity.jpg",
    imageLeftPct: -36.8,   // -172 / 467
    imageWidthPct: 201.7,  //  942 / 467
    imageTopPx: -160,
    imageHeightPx: 706,
    title: "Clarity Creative Agency",
    description:
      "A top creative studio that now walks into every high-ticket meeting with a website that represents them properly.",
    href: "/case-studies/clarity",
  },
  {
    cmsKey: "Oathnet",
    bg: "#629ecc",
    imageSrc: "/case-study-oathnet.jpg",
    imageLeftPct: -42.2,   // -197 / 467
    imageWidthPct: 216.3,  // 1010 / 467
    imageTopPx: -63,
    imageHeightPx: 757,
    title: "Oathnet · Egypt · SaaS",
    description:
      "Transformed OathNet's user experience by turning complex search results into clear, actionable insights with a structured and user-friendly interface.",
    href: "/case-studies/oathnet",
  },
];

const IMG_H_DESKTOP = 316; // px — Figma spec
const IMG_H_MOBILE  = 220; // px — proportional to 82vw card width

/* ─────────────────────────────────────────────────────────────────────
   CARD
──────────────────────────────────────────────────────────────────────*/
function CaseCard({
  cs,
  index,
  inView,
  isMobile,
}: {
  cs: typeof CASES[number];
  index: number;
  inView: boolean;
  isMobile: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 85,
        damping: 22,
        delay: 0.15 + index * 0.1,
      }}
      style={{
        flex: isMobile ? "0 0 82vw" : "1 1 0",
        width: isMobile ? "82vw" : undefined,
        minWidth: 0,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        ...(isMobile ? { scrollSnapAlign: "start" } : {}),
      }}
    >
      {/* Image container — clicking navigates to case study if href exists */}
      <Link
        href={cs.href ?? "#"}
        style={{
          display: "block",
          position: "relative",
          height: isMobile ? IMG_H_MOBILE : IMG_H_DESKTOP,
          borderRadius: 9,
          overflow: "hidden",
          background: cs.bg,
          flexShrink: 0,
          cursor: cs.href ? "pointer" : "default",
          pointerEvents: cs.href ? "auto" : "none",
          textDecoration: "none",
        }}
      >
        <img
          src={cs.imageSrc}
          alt={cs.title}
          style={
            cs.imageSrc.startsWith("https://")
              ? {
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }
              : {
                  position: "absolute",
                  left:   `${cs.imageLeftPct}%`,
                  top:    cs.imageTopPx,
                  width:  `${cs.imageWidthPct}%`,
                  height: cs.imageHeightPx,
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                }
          }
        />
      </Link>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#101405",
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {cs.title}
        </p>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 16,
            fontWeight: 400,
            color: "#6a6a6a",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {cs.description}
        </p>
        {cs.href && (
          <Link
            href={cs.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'Sora', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#405212",
              textDecoration: "none",
              marginTop: 4,
            }}
          >
            View Case Study →
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION
──────────────────────────────────────────────────────────────────────*/
type PortfolioItem = { title?: string; imageUrl?: string | null };

export default function Portfolio({ data }: { data?: PortfolioItem[] }) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  // Merge CMS images into CASES — match by cmsKey === Sanity document title
  const cases = CASES.map((cs) => {
    const cmsDoc = data?.find((d) => d.title === cs.cmsKey);
    return { ...cs, imageSrc: cmsDoc?.imageUrl ?? cs.imageSrc };
  });

  // Desktop: symmetric padding. Mobile: no horizontal padding — the scroll container and
  // header each handle their own 20px gutters so cards can bleed full-width.
  const paddingTop    = isMobile ? 112 : 147;
  const paddingBottom = isMobile ? 72  : 147;
  const hPad          = isMobile ? 0   : 128;

  return (
    <section
      id="portfolio"
      ref={ref}
      style={{
        background: "#ffffff",
        paddingTop,
        paddingBottom,
        paddingLeft: hPad,
        paddingRight: hPad,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? 40 : 79,
        boxSizing: "border-box",
        position: "relative",
        zIndex: 0,
        // Anchor-link scrolling stops below the fixed navbar
        scrollMarginTop: 80,
      }}
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 17,
          alignItems: "center",
          textAlign: "center",
          // Restore horizontal gutter for the header block on mobile
          paddingLeft: isMobile ? 20 : 0,
          paddingRight: isMobile ? 20 : 0,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <p style={{ ...T_OVERLINE_LIGHT }}>
          Case Studies
        </p>

        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            // Mobile: smaller so the long headline fits in 2–3 balanced lines
            fontSize: isMobile ? "clamp(22px, 6.5vw, 30px)" : "clamp(32px, 4vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "#101405",
            lineHeight: 1.25,
            margin: 0,
            maxWidth: isMobile ? "100%" : 1000,
            textAlign: "center",
          }}
        >
          Behind every project is a business that needed{" "}
          <span style={{ color: "#405212" }}>more than a pretty website</span>
        </h2>
      </motion.div>

      {/* ── Cards — desktop: flex row; mobile: horizontal scroll ── */}
      <div
        className={isMobile ? "scroll-no-bar" : undefined}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: isMobile ? 16 : 25,
          alignItems: "flex-start",
          width: "100%",
          ...(isMobile ? {
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            // paddingLeft works here because there is NO negative marginLeft —
            // the section already has zero horizontal padding on mobile.
            paddingLeft: 20,
            paddingRight: 20,
            // Tell the snap engine to align cards 20px from the container edge
            scrollPaddingLeft: 20,
            boxSizing: "border-box",
          } : {}),
        }}
      >
        {cases.map((cs, i) => (
          <CaseCard
            key={cs.title}
            cs={cs}
            index={i}
            inView={inView}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}
