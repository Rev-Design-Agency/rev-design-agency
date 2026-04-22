"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ── Luxury easing ──────────────────────────────────── */
const E = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── CMS types (kept for Sanity compatibility) ──────── */
type HeroData = {
  headline?: string;
  headlineGreen?: string;
  headlineEnd?: string;
  subheadline?: string;
  buttonText?: string;
  buttonUrl?: string;
  trustName?: string;
  trustRole?: string;
  trustAvatarUrl?: string;
  heroImageUrl?: string;
};

/* ─────────────────────────────────────────────────────
   Geometric background art — recreated from Figma 750-24483
   Pure inline SVG: no expiring asset URLs.

   Composition (in a 1440 × 700 conceptual space):
   • Two gentle diagonal "ray" lines spanning full width,
     converging toward the right — creates perspective depth
   • Three identically-sized rectangles (280 × 245) stacked
     with a +15px right / −15px up offset per layer, giving a
     3-D "fanned cards" illusion
   • A circle inscribed around the middle rectangle
   • An X crossing through the middle rectangle's corners
───────────────────────────────────────────────────── */
function GeometricArt({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity,
      }}
      aria-hidden="true"
    >
      {/* ── Ray lines ─────────────────────────────────────
          Each line originates from a left corner of the back
          rectangle and extends across the full width. They form
          a subtle vanishing-point "cone" shape.
      ─────────────────────────────────────────────────── */}
      {/* Upper ray: from (0, 70) through back-rect top-left (935, 240) → right edge */}
      <line x1="0"    y1="70"  x2="1440" y2="332" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* Lower ray: from (0, 640) through back-rect bottom-left (935, 485) → right edge */}
      <line x1="0"    y1="640" x2="1440" y2="400" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

      {/* ── Stacked rectangles (all 280 × 245) ──────────── */}
      {/* Back  — offset −15 right, +15 down from front */}
      <rect x="935" y="240" width="280" height="245"
        fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5"/>
      {/* Middle — base position */}
      <rect x="950" y="225" width="280" height="245"
        fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5"/>
      {/* Front — offset +15 right, −15 up */}
      <rect x="965" y="210" width="280" height="245"
        fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1.5"/>

      {/* ── Circle (centered on the middle rectangle) ────── */}
      {/* Middle rect center: x=1090, y=347 — r≈142 (matches rect half-width) */}
      <circle cx="1090" cy="347" r="142"
        fill="none" stroke="rgba(255,255,255,0.17)" strokeWidth="1.5"/>

      {/* ── X crossing (corner-to-corner of middle rect) ─── */}
      <line x1="950"  y1="225" x2="1230" y2="470"
        stroke="rgba(255,255,255,0.11)" strokeWidth="1"/>
      <line x1="1230" y1="225" x2="950"  y2="470"
        stroke="rgba(255,255,255,0.11)" strokeWidth="1"/>
    </svg>
  );
}

/* ── Film grain (site-wide texture) ───────────────── */
function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
        opacity: 0.055,
        mixBlendMode: "screen",
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)"/>
      </svg>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────── */
export default function Hero({ data }: { data?: HeroData }) {
  const isMobile = useIsMobile();

  const buttonText = data?.buttonText || "Book a Free Call Now";
  const buttonUrl  = data?.buttonUrl  || "https://calendly.com/youssefhishmat/meeting-with-youssef";
  const heroImage  = data?.heroImageUrl || "/Hero%20Section%20IMG.png";

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* ── Hero image — desktop only, hidden on mobile ── */}
      {!isMobile && (
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "128px",
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "calc(100% - 128px)",
            objectFit: "cover",
            objectPosition: "center center",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Film grain */}
      <FilmGrain />

      {/* ── Text content — sits on top of the image ─────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isMobile
            ? "140px 24px 60px"
            : "clamp(120px, 16vh, 180px) 128px 80px",
        }}
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: E, delay: 0.1 }}
          style={{
            display: "inline-block",
            background: "#e3e6e9",
            borderRadius: 0,
            padding: isMobile ? "6px 12px" : "10px 16px",
            fontFamily: "'Sora', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#101405",
            width: "fit-content",
            marginBottom: isMobile ? "20px" : "28px",
            alignSelf: isMobile ? "center" : "flex-start",
          }}
        >
          Web Design &amp; Development · Cairo
        </motion.span>

        {/* Headline + tagline + CTA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            gap: isMobile ? "24px" : "32px",
            maxWidth: isMobile ? "100%" : "942px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {/* Headline + tagline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "16px" : "8px",
            }}
          >
            {/* Headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: E, delay: 0.22 }}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: isMobile ? "24px" : "clamp(38px, 4.4vw, 64px)",
                lineHeight: 1.3,
                color: "#ffffff",
                margin: 0,
                letterSpacing: 0,
                maxWidth: isMobile ? "345px" : "none",
              }}
            >
              <span style={{ fontWeight: 400 }}>Crafting strategic </span>
              <span style={{ fontWeight: 700, color: "#9fcc2e" }}>website</span>
              <br />
              <span style={{ fontWeight: 400 }}>designs that elevate your</span>
              <br />
              <span style={{ fontWeight: 700, color: "#9fcc2e" }}>brand &amp; fuel growth.</span>
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: E, delay: 0.4 }}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#fbfbfb",
                margin: 0,
                maxWidth: isMobile ? "100%" : "643px",
              }}
            >
              {data?.subheadline ? (
                data.subheadline
              ) : (
                <>
                  Focused on the metrics that matter,<br />
                  we design high-performance websites built for scale.<br />
                  Every pixel serves a purpose — to convert &amp; grow.
                </>
              )}
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: E, delay: 0.55 }}
            style={isMobile ? { width: "100%" } : {}}
          >
            <AnimButton
              href={buttonUrl}
              variant="green"
              target="_blank"
              style={isMobile ? { width: "100%", justifyContent: "center" } : {}}
            >
              {buttonText}
            </AnimButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
