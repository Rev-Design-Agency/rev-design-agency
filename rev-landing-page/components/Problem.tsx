"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { T_OVERLINE } from "@/lib/type";

const DEFAULT_PROBLEMS = [
  "Traffic but no clients",
  "Embarrassed to share your own link",
  "Invisible next to competitors",
  "Paid for a website that never paid back",
];

const LOGOS = [
  "/logos/logo1.svg",
  "/logos/logo2.svg",
  "/logos/logo3.svg",
  "/logos/logo4.svg",
  "/logos/logo5.svg",
];

type ProblemData = {
  label?: string;
  badge?: string;
  subheadline?: string;
  headline?: string;
  problems?: string[];
};

/* ── Logos strip ──────────────────────────────────────── */
function LogosStrip() {
  return (
    <div
      style={{
        padding: "48px 0 56px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "28px",
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Trusted by growing brands
      </p>

      {/* Logo row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(28px, 5vw, 64px)",
        }}
      >
        {LOGOS.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              height: "clamp(22px, 2.5vw, 36px)",
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              opacity: 0.45,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Problem({ data }: { data?: ProblemData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  const label      = data?.label      || "That's exactly why Rev exists.";
  const badge      = data?.badge      || "Sound familiar?";
  const subheadline = data?.subheadline || "Your website is supposed to bring you clients.";
  const headline   = data?.headline   || "Why isn't it?";
  const problems   = data?.problems?.length ? data.problems : DEFAULT_PROBLEMS;

  return (
    <section
      id="problem"
      ref={ref}
      style={{
        background: "#000",
        padding: isMobile ? "0 0 60px" : "0 0 80px",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* ── Client logos strip ──────────────────────────── */}
      <div className="container-xl">
        <LogosStrip />
      </div>

      {/* ── Divider ─────────────────────────────────────── */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: isMobile ? "40px" : "56px" }} />

      {/* ── Problem card ────────────────────────────────── */}
      <div className="container-xl">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ ...T_OVERLINE, marginBottom: "8px", marginLeft: "8px" }}
        >
          {label}
        </motion.p>

        <div
          style={{
            position: "relative",
            background: "#111",
            borderRadius: "32px",
            padding: isMobile ? "48px 24px" : "80px 100px",
            overflow: "visible",
            marginTop: "40px",
          }}
        >
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="badge-pill"
            style={{ position: "absolute", top: "-24px", left: isMobile ? "24px" : "100px" }}
          >
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: isMobile ? "14px" : "clamp(18px, 4vw, 28px)",
                fontWeight: 600,
                color: "#b0b0b0",
              }}
            >
              {badge}
            </span>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "32px" : "60px",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: isMobile ? "18px" : "clamp(18px, 4vw, 32px)",
                  fontWeight: 600,
                  color: "#6a6a6a",
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {subheadline}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 }}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#f0f5e8",
                  lineHeight: 1.2,
                  margin: "16px 0 0",
                }}
              >
                {headline}
              </motion.h2>
            </div>

            {/* Right: problems list */}
            <ol
              style={{
                listStyle: "decimal",
                paddingLeft: isMobile ? "24px" : "40px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {problems.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 + i * 0.12 }}
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "16px",
                    color: "#f0f5e8",
                    lineHeight: 1.6,
                  }}
                >
                  {p}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
