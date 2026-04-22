"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import MoreCaseStudies from "@/components/MoreCaseStudies";
import CaseStudyNav from "@/components/CaseStudyNav";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ─────────────────────────────────────────────────────────────────────
   TOKENS
──────────────────────────────────────────────────────────────────────*/
const OLIVE = "#405212";
const CREAM = "#f6faeb";
const SORA  = "'Sora', sans-serif";
const SPRING = { type: "spring", stiffness: 72, damping: 20 } as const;

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

function CornerDownRight() {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      stroke={CREAM}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <polyline points="15 10 20 15 15 20" />
      <path d="M4 4v7a4 4 0 0 0 4 4h12" />
    </svg>
  );
}

const HERO_VIDEO_URL =
  "https://res.cloudinary.com/dguys8br6/video/upload/q_auto,f_auto,vc_auto/v1775844949/Video_Project_3_ggvcxg.mp4";

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.playbackRate = 2.5;
    v.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      src={HERO_VIDEO_URL}
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────────────────────────────*/
interface CmData {
  showcaseImageUrl?: string;
}

interface Props {
  cms?: CmData;
  nav: { prevHref: string; nextHref: string };
}

export default function OathnetPageClient({ cms, nav }: Props) {
  const isMobile = useIsMobile();
  const H = isMobile ? 20 : 107;  // horizontal padding
  const S = isMobile ? 64 : 96;   // section vertical padding

  return (
    <>
      <Navbar />

      <main style={{ background: "#ffffff", paddingTop: isMobile ? 88 : 100 }}>
        <CaseStudyNav prevHref="/#portfolio" nextHref={nav.nextHref} />

        {/* ══════════════════════════════════════════════════════════
            HERO + SEAMLESS GREEN SECTION WRAPPER
        ══════════════════════════════════════════════════════════ */}

        {/* Video — z-index 2 so it floats above the green */}
        <div style={{ position: "relative", zIndex: 2, padding: `0 ${H}px` }}>
          <Reveal y={24}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
                aspectRatio: "16/9",
              }}
            >
              <HeroVideo />
            </div>
          </Reveal>
        </div>

        {/* Green content block */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: OLIVE,
            marginTop: isMobile ? -56 : -140,
            paddingTop: isMobile ? 80 : 200,
            paddingBottom: isMobile ? S : S + 16,
            paddingLeft: H,
            paddingRight: H,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 56 : 90,
          }}
        >
          {/* ── Project description ── */}
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 28 }}>
              <h1
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 40 : 64,
                  fontWeight: 600,
                  color: CREAM,
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Oathnet
              </h1>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 22, maxWidth: 860 }}>
                {[
                  "OathNet is an OSINT and digital intelligence platform designed to help users investigate digital footprints across multiple data sources from a single interface. The goal of this project was to redesign the experience to make complex, high-volume data easier to understand, navigate, and act on.",
                  "The main challenge was reducing confusion after search results. Users were overwhelmed by raw data and lacked clear direction on what to focus on. To solve this, I restructured the information architecture, introduced a clear results hierarchy, and designed a step-by-step flow that guides users from summary to detailed insights.",
                  "The final design balances a dark, intelligence-driven visual style with strong usability principles. It simplifies decision-making, improves clarity, and creates a scalable foundation for handling large amounts of OSINT data across different user types.",
                ].map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: SORA,
                      fontSize: isMobile ? 16 : 20,
                      fontWeight: 400,
                      color: "rgba(246,250,235,0.78)",
                      margin: 0,
                      lineHeight: 1.75,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── What we did ── */}
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 32 }}>
              <h2
                style={{
                  fontFamily: SORA,
                  fontSize: isMobile ? 30 : 56,
                  fontWeight: 600,
                  color: CREAM,
                  margin: 0,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                What we did
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 14 : 18 }}>
                {["Strategy", "Content Structure", "Website Design"].map((item, i) => (
                  <Reveal key={item} delay={0.15 + i * 0.08}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <CornerDownRight />
                      <p
                        style={{
                          fontFamily: SORA,
                          fontSize: isMobile ? 22 : 40,
                          fontWeight: 400,
                          color: CREAM,
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════════════════════════
            IMAGE SHOWCASE — controlled from Sanity CMS
        ══════════════════════════════════════════════════════════ */}
        <div style={{ padding: `${S}px ${H}px` }}>
          <Reveal y={24}>
            {cms?.showcaseImageUrl ? (
              <img
                src={cms.showcaseImageUrl}
                alt="Oathnet showcase"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  background: "#d4d4d4",
                  aspectRatio: "16/10",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: SORA,
                    fontSize: isMobile ? 18 : 36,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.25)",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Image Coming Soon
                </p>
              </div>
            )}
          </Reveal>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MACBOOK MOCKUP — full bleed
        ══════════════════════════════════════════════════════════ */}
        <Reveal y={24}>
          <img
            src="https://www.figma.com/api/mcp/asset/b04de7ee-5c69-44cf-9f84-ebc7a0d4be59"
            alt="Oathnet project on MacBook"
            style={{ width: "100%", display: "block" }}
          />
        </Reveal>

        {/* ── Case Study CTA ── */}
        <CaseStudyCTA />

        {/* ── More Case Studies (auto-excludes current page) ── */}
        <MoreCaseStudies current="oathnet" />

      </main>

      <FooterCTA />
    </>
  );
}
