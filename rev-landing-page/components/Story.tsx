"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { urlFor } from "@/sanity/lib/image";
import { T_OVERLINE } from "@/lib/type";

type StoryData = {
  preHeadline?: string;
  headline?: string;
  body?: string;
  desktopPhoto?: object;
  mobilePhoto?: object;
  buttonText?: string;
  buttonUrl?: string;
};

export default function Story({ data }: { data?: StoryData }) {
  const preHeadline = data?.preHeadline || "The face behind Rev";
  const headline = data?.headline || "I'm Youssef, a designer based in Cairo and the founder of Rev.";
  const body = data?.body || "I started Rev because too many businesses pay for websites that look good but do nothing. No strategy, no results. Every pixel should have a purpose. I'm personally involved in every project, from strategy to launch, to make sure it actually grows your business.";
  const buttonText = data?.buttonText || "Let's Talk";
  const buttonUrl = data?.buttonUrl || "https://calendly.com/youssefhishmat/meeting-with-youssef";
  const desktopPhotoUrl = data?.desktopPhoto ? urlFor(data.desktopPhoto).width(800).format("webp").quality(100).url() : "/youssef.png";
  const mobilePhotoUrl = data?.mobilePhoto ? urlFor(data.mobilePhoto).width(600).format("webp").quality(100).url() : "/youssef-mobile.jpg";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  return (
    <section
      id="story"
      ref={ref}
      style={{
        background: "#121212",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Mobile: photo frame above text */}
      {isMobile && (
        <div style={{ width: "100%", height: "210px", background: "#1f1f1f", position: "relative", overflow: "hidden" }}>
          <img
            src={mobilePhotoUrl}
            alt="Youssef — Founder of Rev"
            style={{
              position: "absolute",
              top: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "290px",
              height: "240px",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
          {/* Bottom fade */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, #121212 0%, transparent 100%)", pointerEvents: "none" }} />
        </div>
      )}

      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          minHeight: isMobile ? "auto" : "760px",
          overflow: "hidden",
        }}
      >
        {/* ── Left: Text ── */}
        <div
          style={{
            flex: isMobile ? "1 1 0" : "0 0 52%",
            padding: isMobile ? "32px 24px 40px 24px" : "120px 0 120px 60px",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "24px" : "48px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Header block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            {/* Pre-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{ ...T_OVERLINE }}
            >
              {preHeadline}
            </motion.p>

            {/* Heading + body */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#f6faeb",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {headline}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "rgba(240, 245, 232, 0.45)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {body}
              </motion.p>
            </div>
          </div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 }}
            style={isMobile ? { width: "100%" } : {}}
          >
            <AnimButton
              href={buttonUrl}
              target="_blank"
              variant="green"
              style={isMobile ? { width: "100%", justifyContent: "center" } : undefined}
            >
              {buttonText}
            </AnimButton>
          </motion.div>
        </div>

        {/* ── Right: Photo — desktop only ── */}
        {!isMobile && <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            flex: "0 0 38%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={desktopPhotoUrl}
            alt="Youssef — Founder of Rev"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to top, #121212 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />
          {/* Left fade — only on desktop */}
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "35%",
                background: "linear-gradient(to right, #121212 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
          )}
        </motion.div>}

      </div>
    </section>
  );
}
