"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import MoreCaseStudies from "@/components/MoreCaseStudies";
import CaseStudyNav from "@/components/CaseStudyNav";
import { useIsMobile } from "@/hooks/useIsMobile";

export type ElveCmsData = {
  heroVideoUrl?: string | null;
  showcaseImageUrl?: string | null;
  testimonialImageUrl?: string | null;
  productShowcaseImageUrl?: string | null;
  portfolio?: Array<{ title?: string; imageUrl?: string | null }> | null;
};

/* ─────────────────────────────────────────────────────────────────────
   TOKENS — exact from Figma
──────────────────────────────────────────────────────────────────────*/
const INK      = "#101405";   // #green/950
const GREEN    = "#9fcc2e";   // #green/500
const OLIVE    = "#405212";   // link accent
const CREAM    = "#fdf9f3";   // warm off-white panels
const SLATE_50 = "#fcfdfd";   // card bg
const SLATE_BD = "#e3e6e9";   // card border
const MUTED    = "#6b7280";   // body text
const SORA     = "'Sora', sans-serif";
const MONO     = "var(--font-mono), 'JetBrains Mono', monospace";
const SPRING   = { type: "spring", stiffness: 72, damping: 20 } as const;

/* ─────────────────────────────────────────────────────────────────────
   HELPERS
──────────────────────────────────────────────────────────────────────*/
function Reveal({
  children,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Overline label — JetBrains Mono, neon green, all-caps */
function Overline({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: GREEN,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PATH-TO-PURCHASE CARD
──────────────────────────────────────────────────────────────────────*/
function PathCard({
  num,
  title,
  body,
  delay,
}: {
  num: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        style={{
          background: SLATE_50,
          border: `1px solid ${SLATE_BD}`,
          borderRadius: 14,
          padding: "29px 33px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Figma: 32px Regular — rendered bold neon green for premium feel */}
        <span
          style={{
            fontFamily: SORA,
            fontSize: 32,
            fontWeight: 700,
            color: GREEN,
            lineHeight: 1,
          }}
        >
          {num}
        </span>
        <p
          style={{
            fontFamily: SORA,
            fontSize: 24,
            fontWeight: 600,
            color: INK,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: SORA,
            fontSize: 16,
            fontWeight: 400,
            color: MUTED,
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   BROWSER MOCK FRAME — wraps a screenshot in a minimal chrome header
──────────────────────────────────────────────────────────────────────*/
function BrowserFrame({
  children,
  height,
  radius = 14,
}: {
  children: React.ReactNode;
  height: number | string;
  radius?: number;
}) {
  return (
    <div
      style={{
        borderRadius: radius,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
        background: "#fff",
        border: "1px solid #e8e8e8",
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          height: 32,
          background: "#f4f4f4",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
          gap: 6,
          flexShrink: 0,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{ width: 10, height: 10, borderRadius: "50%", background: c }}
          />
        ))}
      </div>
      <div style={{ height, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   HERO VIDEO
──────────────────────────────────────────────────────────────────────*/
const FALLBACK_VIDEO =
  "https://res.cloudinary.com/dguys8br6/video/upload/q_auto,f_auto,vc_auto/v1775738817/e-commerce_Project_01_-_Kit_-_Figma_2026-04-08_16-40-43_jm6uy0.mp4";

function HeroVideo({ hPad, videoUrl }: { hPad: number; videoUrl?: string | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.playbackRate = 2.5;
      v.play().catch(() => {});
    }
  }, []);
  return (
    <div style={{ padding: `0 ${hPad}px` }}>
      <div
        style={{
          borderRadius: 22,
          overflow: "hidden",
          background: "#000",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          lineHeight: 0,
          aspectRatio: "16/9",
          position: "relative",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transform: "scale(1.22)",
          }}
        >
          <source src={videoUrl ?? FALLBACK_VIDEO} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────────────────────────────*/
interface ElvePageProps {
  cms?: ElveCmsData;
  nav?: { prevHref: string; nextHref: string };
}

export default function ElvePageClient({ cms, nav }: ElvePageProps) {
  const isMobile = useIsMobile();
  const H = isMobile ? 20 : 107;   // horizontal padding
  const S = isMobile ? 64 : 96;    // section vertical gap (Figma: 81px)

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#ffffff",
          paddingTop: isMobile ? 88 : 100,
        }}
      >
        <CaseStudyNav prevHref="/#portfolio" nextHref={nav?.nextHref ?? "/"} />

        {/* ══════════════════════════════════════════════════════════
            HERO  — Figma: 1085×718px rounded-[22px]
            VIDEO PLACEHOLDER — replace <div> with <video> when asset is ready
        ══════════════════════════════════════════════════════════ */}
        <HeroVideo hPad={H} videoUrl={cms?.heroVideoUrl} />

        {/* ══════════════════════════════════════════════════════════
            TITLE + META  — Figma: H3 48px, subtitle 24px, meta cards
        ══════════════════════════════════════════════════════════ */}
        <div
          style={{
            padding: `${S}px ${H}px`,
            display: "flex",
            flexDirection: "column",
            gap: 45,
          }}
        >
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 13, maxWidth: isMobile ? "100%" : "90%" }}>

              <h1
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 30 : 48,
                  fontWeight: 600,
                  color: INK,
                  lineHeight: 1.3,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Elve: A Concept in High-Conversion Skincare Design.
              </h1>
              <p
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 16 : 24,
                  fontWeight: 400,
                  color: MUTED,
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: 760,
                }}
              >
                An exploration into how luxury aesthetics and UX psychology can be
                combined to eliminate decision friction in e-commerce.
              </p>
            </div>
          </Reveal>

          {/* Meta cards — Figma: flex gap-24, px-33 py-29, rounded-14 */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 24,
            }}
          >
            {[
              { label: "Type",     value: "Concept Study" },
              { label: "Focus",    value: "UX/UI & Conversion" },
              { label: "Industry", value: "Beauty" },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div
                  style={{
                    background: SLATE_50,
                    border: `1px solid ${SLATE_BD}`,
                    borderRadius: 14,
                    padding: "29px 33px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    minWidth: isMobile ? "auto" : 240,
                  }}
                >
                  <p style={{ fontFamily: SORA, fontSize: 16, color: MUTED, margin: 0, lineHeight: 1.3 }}>{m.label}</p>
                  <p style={{ fontFamily: SORA, fontSize: 24, fontWeight: 600, color: INK, margin: 0, lineHeight: 1.3 }}>{m.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            IMAGE SHOWCASE ROW 1  — Figma: 940px cream | flex-1 brown #5e4724
        ══════════════════════════════════════════════════════════ */}
        <div style={{ padding: `0 ${H}px` }}>
          <img
            src={cms?.showcaseImageUrl ?? "/elve-showcase.png"}
            alt="Elve design showcase"
            style={{ width: "100%", display: "block" }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
            STORY SECTIONS  — Figma: gap-81, text max-widths vary
        ══════════════════════════════════════════════════════════ */}
        <div
          style={{
            padding: `${S}px ${H}px`,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 56 : 81,
          }}
        >

          {/* The Problem — Figma: max-width 1231px / ~85% */}
          <Reveal>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                maxWidth: isMobile ? "100%" : "85%",
              }}
            >

              <h2
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 26 : 48,
                  fontWeight: 600,
                  color: INK,
                  lineHeight: 1.3,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                The "Decision Friction" in Beauty E-commerce.
              </h2>
              <p
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 16 : 24,
                  fontWeight: 400,
                  color: MUTED,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Most skincare websites suffer from the same problem: they are either
                too clinical (boring) or too focused on aesthetics (confusing).
                Customers are overwhelmed by product options and a lack of clear
                guidance, leading to high cart abandonment rates.
              </p>
            </div>
          </Reveal>

          {/* The Goal — Figma: max-width 936px / ~64% */}
          <Reveal>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                maxWidth: isMobile ? "100%" : "64%",
              }}
            >

              <h2
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 26 : 48,
                  fontWeight: 600,
                  color: INK,
                  lineHeight: 1.3,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                The Goal of this Concept:
              </h2>
              <p
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 16 : 24,
                  fontWeight: 400,
                  color: MUTED,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                To create a digital experience where the luxury feel of the brand
                doesn't get in the way of the user's ability to find the right
                product and buy it instantly.
              </p>
            </div>
          </Reveal>

          {/* ── Testimonial placeholder ── */}
          <img
            src={cms?.testimonialImageUrl ?? "/elve-testimonial.png"}
            alt="Elve testimonial"
            style={{ width: "100%", display: "block" }}
          />
          {false && <div
              style={{
                background: CREAM,
                borderRadius: 24,
                minHeight: isMobile ? "auto" : 582,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: isMobile ? 28 : 48,
                textAlign: "center",
                padding: isMobile ? "48px 28px" : "64px 120px",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* Quote */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 620 }}>
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: isMobile ? 20 : 36,
                    fontWeight: 500,
                    color: "#4d3f32",
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  I noticed the difference within the first week. My skin feels
                  balanced, not overloaded
                </p>
                <div>
                  <p style={{ fontFamily: SORA, fontSize: 15, fontWeight: 500, color: "#4d3f32", margin: "0 0 2px" }}>Nour A.</p>
                  <p style={{ fontFamily: SORA, fontSize: 11, color: "#a6a19e", margin: 0 }}>Cairo</p>
                </div>
              </div>

              {/* Avatar carousel — Figma: 5 circles, center is largest + fully opaque */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: isMobile ? 14 : 20 }}>
                {/* Left arrow */}
                <span style={{ fontFamily: SORA, fontSize: 20, color: "#4d3f32", cursor: "pointer", marginRight: isMobile ? 4 : 20, lineHeight: 1 }}>←</span>
                {/* Avatar 1 — small, dim */}
                <div style={{ width: isMobile ? 32 : 52, height: isMobile ? 32 : 52, borderRadius: "50%", overflow: "hidden", opacity: 0.5, flexShrink: 0 }}>
                  <img src="/elve-avatar-1.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {/* Avatar 2 — medium, dim */}
                <div style={{ width: isMobile ? 44 : 72, height: isMobile ? 44 : 72, borderRadius: "50%", overflow: "hidden", opacity: 0.5, flexShrink: 0 }}>
                  <img src="/elve-avatar-2.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {/* Avatar 3 — large, full opacity, active */}
                <div style={{ width: isMobile ? 64 : 100, height: isMobile ? 64 : 100, borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                  <img src="/elve-avatar-3.jpg" alt="Nour A." style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {/* Avatar 4 — medium, dim */}
                <div style={{ width: isMobile ? 44 : 72, height: isMobile ? 44 : 72, borderRadius: "50%", overflow: "hidden", opacity: 0.5, flexShrink: 0 }}>
                  <img src="/elve-avatar-4.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {/* Avatar 5 — small, dim */}
                <div style={{ width: isMobile ? 32 : 52, height: isMobile ? 32 : 52, borderRadius: "50%", overflow: "hidden", opacity: 0.5, flexShrink: 0 }}>
                  <img src="/elve-avatar-5.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {/* Right arrow */}
                <span style={{ fontFamily: SORA, fontSize: 20, color: "#4d3f32", cursor: "pointer", marginLeft: isMobile ? 4 : 20, lineHeight: 1 }}>→</span>
              </div>
            </div>}

        </div>

        {/* ══════════════════════════════════════════════════════════
            PATH TO PURCHASE  — Figma: gap-53 header↔cards, cards gap-24
        ══════════════════════════════════════════════════════════ */}
        <div
          style={{
            padding: `0 ${H}px ${S}px`,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 36 : 53,
          }}
        >
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: isMobile ? "100%" : "74%" }}>

              <h2
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 26 : 48,
                  fontWeight: 600,
                  color: INK,
                  lineHeight: 1.3,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Engineering the "Perfect" Path to Purchase.
              </h2>
              <p
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 16 : 24,
                  fontWeight: 400,
                  color: MUTED,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                For the Elve concept, I focused on three specific UX improvements
                to solve the industry's most common pain points.
              </p>
            </div>
          </Reveal>

          {/* 3-column grid — Figma: flex gap-24, each flex-[1_0_0] */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 24,
              alignItems: "stretch",
            }}
          >
            <PathCard
              num="01"
              title="Intuitive Categorization"
              body="Moving away from generic menus to 'Skin-Goal' based navigation, allowing users to find products based on their specific needs rather than browsing overwhelming category trees."
              delay={0}
            />
            <PathCard
              num="02"
              title="The 'Trust' Layer"
              body="Implementing strategic placement of reviews and ingredient transparency cards to reduce buyer anxiety at every decision point before checkout."
              delay={0.1}
            />
            <PathCard
              num="03"
              title="Minimalist Checkout"
              body="Designing a stripped-back, one-page checkout flow to eliminate every possible reason for the user to abandon the purchase at the final stage."
              delay={0.2}
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            PRODUCT SHOWCASE  — Figma: bg #fdf9f3, h-666, two-column
        ══════════════════════════════════════════════════════════ */}
        <div style={{ padding: `0 ${H}px ${S}px` }}>
          {/* PRODUCT SHOWCASE PLACEHOLDER */}
          <img
            src={cms?.productShowcaseImageUrl ?? "/elve-product-showcase.png"}
            alt="Elve product showcase"
            style={{ width: "100%", display: "block" }}
          />
          {false && <div
              style={{
                background: CREAM,
                borderRadius: 24,
                overflow: "hidden",
                padding: isMobile ? "40px 24px" : "40px 32px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 32,
                alignItems: "flex-start",
                minHeight: isMobile ? "auto" : 560,
              }}
            >
              {/* Left: product image stack */}
              <div
                style={{
                  flex: isMobile ? "none" : "0 0 57%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* Main product image — RADIANCE lotion bottle */}
                <div
                  style={{
                    height: isMobile ? 280 : 420,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#f0ebe4",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  }}
                >
                  <img
                    src="/elve-product-radiance.jpg"
                    alt="RADIANCE — Elve product"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
                  />
                </div>

                {/* Thumbnail strip */}
                {!isMobile && (
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { src: "/elve-thumb-1.jpg",        active: true },
                      { src: "/elve-product-vivid.jpg",  active: false },
                      { src: "/elve-product-natura.jpg", active: false },
                      { src: "/elve-product-lumia.jpg",  active: false },
                    ].map(({ src, active }, i) => (
                      <div
                        key={i}
                        style={{
                          flex: "1 1 0",
                          height: 92,
                          borderRadius: 8,
                          background: "#e4dad0",
                          overflow: "hidden",
                          border: active ? "2px solid #652527" : "2px solid transparent",
                          boxSizing: "border-box",
                        }}
                      >
                        <img
                          src={src}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: active ? 1 : 0.75 }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: product detail UI */}
              <div
                style={{
                  flex: "1 1 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 20,
                  paddingTop: isMobile ? 0 : 16,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <p style={{ fontFamily: SORA, fontSize: 11, color: "#99918a", margin: 0, letterSpacing: "0.05em" }}>
                    Home &gt; Shop &gt; <strong>RADIANCE</strong>
                  </p>
                  <h3
                    style={{
                      fontFamily: SORA,
                      fontSize: isMobile ? 28 : 36,
                      fontWeight: 700,
                      color: "#4d3f32",
                      margin: 0,
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    RADIANCE
                  </h3>
                  <p style={{ fontFamily: SORA, fontSize: 14, color: "#a7a7a7", margin: 0 }}>
                    Evens out skin tone and reduces fine lines.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: SORA, fontSize: 12, color: "#9e9681", textDecoration: "line-through" }}>EGP 1,250</span>
                  <span style={{ fontFamily: SORA, fontSize: 18, fontWeight: 600, color: "#e96442" }}>EGP 1,100 · 30ml</span>
                  <span
                    style={{
                      background: "rgba(233,100,66,0.1)",
                      border: "1px solid #e96442",
                      borderRadius: 4,
                      padding: "2px 8px",
                      fontSize: 11,
                      fontFamily: SORA,
                      color: "#e96442",
                      fontWeight: 600,
                    }}
                  >
                    Save 20%
                  </span>
                </div>

                <div style={{ height: 1, background: SLATE_BD }} />

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    style={{
                      flex: "1 1 0",
                      background: "#652527",
                      border: "none",
                      borderRadius: 10,
                      padding: "13px 20px",
                      fontFamily: SORA,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#fdfdf4",
                      cursor: "pointer",
                    }}
                  >
                    Buy Now
                  </button>
                  <button
                    style={{
                      flex: "1 1 0",
                      background: "transparent",
                      border: "1px solid #652527",
                      borderRadius: 10,
                      padding: "13px 20px",
                      fontFamily: SORA,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#652527",
                      cursor: "pointer",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid #9d9d9d", borderRadius: 6, padding: "12px 16px" }}>
                  <img src="/elve-icon-group5.svg" alt="" style={{ width: 28, height: 28, objectFit: "contain" }} />
                  <div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: "#3b3b3b", margin: 0, lineHeight: 1.3 }}>Guaranteed</p>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600, color: "#000", margin: 0, lineHeight: 1.3 }}>Return &amp; Exchange Policy</p>
                  </div>
                </div>
              </div>
            </div>}
        </div>

        {/* ══════════════════════════════════════════════════════════
            DESIGNED FOR GROWTH  — Figma: centered, gap-81, metrics gap-78
        ══════════════════════════════════════════════════════════ */}
        <div
          style={{
            padding: `0 ${H}px ${S}px`,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 40 : 64,
            alignItems: "center",
          }}
        >
          <Reveal>
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 19, maxWidth: 760 }}>

              <h2
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 26 : 48,
                  fontWeight: 600,
                  color: INK,
                  margin: 0,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                Designed for Growth
              </h2>
              <p style={{ fontFamily: SORA, fontSize: isMobile ? 16 : 24, color: MUTED, margin: 0, lineHeight: 1.5 }}>
                By applying these strategic changes, a brand like Elve would expect to see:
              </p>
            </div>
          </Reveal>

          {/* Metrics — Figma: flex gap-78, dividers bg #d9d9d9 w-[2px] */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "stretch",
              width: "100%",
              gap: isMobile ? 28 : 0,
            }}
          >
            {[
              { title: "Higher Average Order Value",  desc: "Through smarter cross-sell placements aligned to the user's chosen skin goal." },
              { title: "Lower Bounce Rates",          desc: "By providing immediate value and clarity in the hero section." },
              { title: "Increased Trust",             desc: "Through a visual identity that matches the brand's luxury price point." },
            ].map((m, i) => (
              <div key={m.title} style={{ display: "flex", flexDirection: "row", flex: i < 2 ? "1 1 0" : "1 1 0", alignItems: "stretch" }}>
                {i > 0 && !isMobile && (
                  <div style={{ width: 2, background: "#d9d9d9", flexShrink: 0, margin: "0 56px", alignSelf: "stretch" }} />
                )}
                <Reveal delay={i * 0.1}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontFamily: SORA, fontSize: isMobile ? 18 : 22, fontWeight: 600, color: INK, margin: 0, lineHeight: 1.3 }}>
                      {m.title}
                    </p>
                    <p style={{ fontFamily: SORA, fontSize: 16, color: MUTED, lineHeight: 1.6, margin: 0 }}>
                      {m.desc}
                    </p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* ── Case Study CTA ── */}
        <CaseStudyCTA />

        <MoreCaseStudies current="elve" />

      </main>
      <FooterCTA />
    </>
  );
}
