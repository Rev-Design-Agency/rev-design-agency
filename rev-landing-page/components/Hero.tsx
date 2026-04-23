"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const E = [0.22, 1, 0.36, 1] as [number, number, number, number];

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

/* ── Film grain ────────────────────────────────────── */
function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
        opacity: 0.03,
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

/* ── Slow, refined animations ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: E, delay },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: E, delay: 1 },
  },
};

function LogoItem({ name, logo }: { name: string; logo: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, whiteSpace: "nowrap" }}>
      <img src={logo} alt={name} style={{ height: "18px", width: "auto", objectFit: "contain", opacity: 0.35, filter: "grayscale(100%) brightness(1.5)" }} />
      <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{name}</span>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────── */
export default function Hero({ data }: { data?: HeroData }) {
  const isMobile = useIsMobile();

  const buttonUrl  = data?.buttonUrl  || "https://calendly.com/youssefhishmat/meeting-with-youssef";
  const avatarUrl  = data?.trustAvatarUrl || "/youssef.png";

  return (
    <>
       {/* ── CSS Keyframes for scroll ── */}
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
        {/* Very subtle ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "30%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(159,204,46,0.025) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <FilmGrain />

        {/* ── Main layout ─────────────────────────────── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            display: isMobile ? "flex" : "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "80px",
            alignItems: "center",
            padding: isMobile
              ? "140px 28px 60px"
              : "clamp(140px, 18vh, 200px) 100px 100px",
            flexDirection: "column",
          }}
        >
          {/* ── LEFT COLUMN ─────────────────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: isMobile ? "100%" : "620px",
            }}
          >
            {/* Badge */}
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: 1.3,
                color: "rgba(255,255,255,0.25)",
                margin: 0,
                marginBottom: isMobile ? "16px" : "20px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Web Design &amp; Development · Egypt
            </motion.p>

            {/* H1 */}
            <motion.h1
              custom={0.15}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: isMobile ? "34px" : "clamp(44px, 4.5vw, 62px)",
                fontWeight: 500,
                lineHeight: 1.08,
                color: "#ffffff",
                margin: 0,
                marginBottom: isMobile ? "16px" : "20px",
                letterSpacing: "-0.035em",
              }}
            >
              Websites that sell
              <br />
              <span style={{ color: "rgba(255,255,255,0.35)" }}>
                on autopilot.
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              custom={0.35}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: isMobile ? "15px" : "16px",
                fontWeight: 200,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.4)",
                margin: 0,
                marginBottom: isMobile ? "28px" : "32px",
                maxWidth: "460px",
              }}
            >
              We design and build high-performance websites
              that turn visitors into revenue without looking
              like everything else in your industry.
            </motion.p>

            {/* Free Value Section */}
            <motion.div
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: isMobile ? "20px" : "24px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: isMobile ? "14px" : "15px",
                  fontWeight: 200,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                }}
              >
                Every engagement starts with a complimentary
                strategy session.
              </p>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: isMobile ? "13px" : "14px",
                  fontWeight: 200,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.22)",
                  margin: 0,
                  paddingLeft: isMobile ? "0" : "16px",
                  borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                30 minutes. Your site reviewed.
                <br />
                A clear roadmap. No pitch.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              custom={0.7}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <AnimButton
                href={buttonUrl}
                variant="green"
                target="_blank"
              >
                Book a Free Strategy Session
              </AnimButton>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ───────────────────────── */}
          {!isMobile && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <img
                  src={avatarUrl}
                  alt="Youssef Hishmat"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    filter: "grayscale(30%)",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "15px",
                    fontWeight: 200,
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                  }}
                >
                  Most agencies build pretty websites that don't convert.
                  We build platforms that make you money.
                  There's a difference — and it shows in the results.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.8)",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    Youssef Hishmat
                  </p>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "12px",
                      fontWeight: 200,
                      color: "rgba(255,255,255,0.25)",
                      margin: 0,
                      lineHeight: 1.3,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Founder, Rev
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Mobile card ── */}
          {isMobile && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                marginTop: "24px",
              }}
            >
              <img
                src={avatarUrl}
                alt="Youssef Hishmat"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  filter: "grayscale(30%)",
                }}
              />
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "14px",
                  fontWeight: 200,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                }}
              >
                Most agencies build pretty websites that don't convert.
                We build platforms that make you money.
                There's a difference — and it shows in the results.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                  }}
                >
                  Youssef Hishmat
                </p>
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "11px",
                    fontWeight: 200,
                    color: "rgba(255,255,255,0.25)",
                    margin: 0,
                    letterSpacing: "0.04em",
                  }}
                >
                  Founder, Rev
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}