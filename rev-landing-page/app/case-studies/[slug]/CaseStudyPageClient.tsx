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
   TYPES
──────────────────────────────────────────────────────────────────────*/
export interface CaseStudyCms {
  projectName: string;
  slug: string;
  heroVideoUrl?: string;
  accentColor?: string;
  accentTextColor?: string;
  descriptionParagraphs?: string[];
  services?: string[];
  showcaseImages?: { url: string; alt: string }[];
}

/* ─────────────────────────────────────────────────────────────────────
   DESIGN TOKENS (can be overridden per project via CMS)
──────────────────────────────────────────────────────────────────────*/
const SORA   = "'Sora', sans-serif";
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

function CornerDownRight({ color }: { color: string }) {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
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

function HeroVideo({ url }: { url: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.playbackRate = 1;
    v.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      src={url}
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────────────────────────────*/
interface Props {
  cms: CaseStudyCms;
  nav: { prevHref: string; nextHref: string };
}

export default function CaseStudyPageClient({ cms, nav }: Props) {
  const isMobile  = useIsMobile();
  const H         = isMobile ? 20 : 107;   // horizontal padding
  const S         = isMobile ? 64 : 96;    // section vertical gap

  const ACCENT    = cms.accentColor     ?? "#405212";
  const ON_ACCENT = cms.accentTextColor ?? "#f6faeb";
  const ON_ACCENT_MUTED = ON_ACCENT + "C7"; // ~78% opacity

  const images      = cms.showcaseImages ?? [];
  const paragraphs  = cms.descriptionParagraphs ?? [];
  const services    = cms.services ?? [];

  return (
    <>
      <Navbar />

      <main style={{ background: "#ffffff", paddingTop: isMobile ? 88 : 100 }}>

        {/* ══════════════════════════════════════════════════════════
            NAV — Back / Next
        ══════════════════════════════════════════════════════════ */}
        <CaseStudyNav prevHref="/#portfolio" nextHref={nav.nextHref} />

        {/* ══════════════════════════════════════════════════════════
            1. HERO VIDEO
        ══════════════════════════════════════════════════════════ */}
        {cms.heroVideoUrl && (
          <div style={{ position: "relative", zIndex: 2, padding: `${S}px ${H}px 0` }}>
            <Reveal y={24}>
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
                  aspectRatio: "16/9",
                }}
              >
                <HeroVideo url={cms.heroVideoUrl} />
              </div>
            </Reveal>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            2 + 3. PROJECT IDENTITY & "WHAT WE DID"
            Seamless overlap: negative marginTop pulls accent block
            up behind video bottom.
        ══════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: ACCENT,
            marginTop: cms.heroVideoUrl ? (isMobile ? -56 : -140) : 0,
            paddingTop: cms.heroVideoUrl ? (isMobile ? 80 : 200) : (isMobile ? S : S + 32),
            paddingBottom: isMobile ? S : S + 16,
            paddingLeft: H,
            paddingRight: H,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 56 : 90,
          }}
        >

          {/* ── 2. Project Identity & Context ── */}
          {(paragraphs.length > 0 || cms.projectName) && (
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 28 }}>

                {/* H1 — Project name */}
                <h1
                  style={{
                    fontFamily: SORA,
                    fontSize: isMobile ? 40 : 64,
                    fontWeight: 600,
                    color: ON_ACCENT,
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cms.projectName}
                </h1>

                {/* Description paragraphs */}
                {paragraphs.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 22, maxWidth: 860 }}>
                    {paragraphs.map((para, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: SORA,
                          fontSize: isMobile ? 16 : 20,
                          fontWeight: 400,
                          color: ON_ACCENT_MUTED,
                          margin: 0,
                          lineHeight: 1.75,
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          )}

          {/* ── 3. What We Did ── */}
          {services.length > 0 && (
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 32 }}>
                <h2
                  style={{
                    fontFamily: SORA,
                    fontSize: isMobile ? 30 : 56,
                    fontWeight: 600,
                    color: ON_ACCENT,
                    margin: 0,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  What we did
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 14 : 18 }}>
                  {services.map((item, i) => (
                    <Reveal key={item} delay={0.15 + i * 0.08}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <CornerDownRight color={ON_ACCENT} />
                        <p
                          style={{
                            fontFamily: SORA,
                            fontSize: isMobile ? 22 : 40,
                            fontWeight: 400,
                            color: ON_ACCENT,
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
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════
            4. VISUAL PROOF — Showcase Images
            1 image  → full width
            2 images → side by side
            3+ images → 2-col grid
        ══════════════════════════════════════════════════════════ */}
        {images.length > 0 ? (
          <div style={{ padding: `${S}px ${H}px` }}>
            <Reveal y={24}>
              {images.length === 1 ? (
                <img
                  src={images[0].url}
                  alt={images[0].alt || cms.projectName}
                  style={{ width: "100%", display: "block", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? 16 : 24,
                  }}
                >
                  {images.map((img, i) => (
                    <Reveal key={i} delay={i * 0.08} y={20}>
                      <img
                        src={img.url}
                        alt={img.alt || `${cms.projectName} screenshot ${i + 1}`}
                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                      />
                    </Reveal>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
        ) : (
          /* Placeholder when no images uploaded yet */
          <div style={{ padding: `${S}px ${H}px` }}>
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
                  fontSize: isMobile ? 18 : 32,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.25)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Images Coming Soon
              </p>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            5. CLOSING CTA
        ══════════════════════════════════════════════════════════ */}
        <CaseStudyCTA />

        {/* More Case Studies — auto-excludes current */}
        <MoreCaseStudies current={cms.slug} />

      </main>

      <FooterCTA />
    </>
  );
}
