"use client";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";
import CaseStudyNav from "@/components/CaseStudyNav";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const SORA = "'Sora', sans-serif";

interface Props {
  slug: string;
  nav: { prevHref: string; nextHref: string };
}

export default function CaseStudyComingSoon({ slug, nav }: Props) {
  const isMobile = useIsMobile();

  // Capitalise slug for display, e.g. "clarity" → "Clarity"
  const label = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: isMobile ? 88 : 100 }}>
        <CaseStudyNav prevHref="/#portfolio" nextHref={nav.nextHref} />

        {/* ── Coming soon hero ── */}
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 20 : 28,
            padding: isMobile ? "60px 24px" : "100px 60px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <span
            style={{
              display: "inline-block",
              background: "#f0f4e8",
              color: "#405212",
              fontFamily: SORA,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 18px",
              borderRadius: 999,
            }}
          >
            Case Study
          </span>

          <h1
            style={{
              fontFamily: SORA,
              fontSize: isMobile ? 40 : 72,
              fontWeight: 700,
              color: "#101405",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {label}
          </h1>

          <p
            style={{
              fontFamily: SORA,
              fontSize: isMobile ? 16 : 20,
              fontWeight: 400,
              color: "rgba(16,20,5,0.55)",
              margin: 0,
              maxWidth: 480,
              lineHeight: 1.7,
            }}
          >
            This case study is currently being prepared.
            <br />
            Check back soon — it&apos;s on its way.
          </p>

          <AnimButton href="/#portfolio" variant="dark">
            ← Back to Case Studies
          </AnimButton>
        </div>
      </main>
      <FooterCTA />
    </>
  );
}
