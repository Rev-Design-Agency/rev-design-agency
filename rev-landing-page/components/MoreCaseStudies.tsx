"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ─────────────────────────────────────────────────────────────────────
   MASTER LIST — add every new case study here once
──────────────────────────────────────────────────────────────────────*/
export const ALL_CASES = [
  {
    slug: "elve",
    title: "Elve · Egypt · E-Commerce",
    description:
      "A premium e-commerce concept designed to reduce decision friction and improve conversion by connecting user intent with clear, structured shopping experiences.",
    img: "/case-study-elve.jpg",
    bg: "#212121",
    href: "/case-studies/elve",
  },
  {
    slug: "oathnet",
    title: "Oathnet · Egypt · SaaS",
    description:
      "Transformed OathNet's user experience by turning complex search results into clear, actionable insights with a structured and user-friendly interface.",
    img: "/case-study-oathnet.jpg",
    bg: "#1a0533",
    href: "/case-studies/oathnet",
  },
  {
    slug: "clarity",
    title: "Clarity Creative Agency",
    description:
      "A top creative studio that now walks into every high-ticket meeting with a website that represents them properly.",
    img: "/case-study-clarity.jpg",
    bg: "#fae56c",
    href: "/case-studies/clarity",
  },
];

const INK  = "#101405";
const OLIVE = "#405212";
const SORA = "'Sora', sans-serif";
const IMG_H_DESKTOP = 316;
const IMG_H_MOBILE  = 220;
const SPRING = { type: "spring", stiffness: 85, damping: 22 } as const;

/* ─────────────────────────────────────────────────────────────────────
   PROPS
   current: slug of the page you're on — this card is excluded
──────────────────────────────────────────────────────────────────────*/
export default function MoreCaseStudies({ current }: { current: string }) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();

  const H = isMobile ? 20 : 107;
  const S = isMobile ? 64 : 96;

  const cases = ALL_CASES.filter((c) => c.slug !== current);

  return (
    <section
      ref={ref}
      style={{
        background: "#ffffff",
        padding: `${S}px ${H}px`,
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...SPRING }}
        style={{
          fontFamily: SORA,
          fontSize: isMobile ? 26 : 40,
          fontWeight: 600,
          color: INK,
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        More Case Studies
      </motion.h2>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 25,
        }}
      >
        {cases.map((cs, i) => (
          <div key={cs.slug} style={{ flex: "1 1 0", minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...SPRING, delay: 0.1 + i * 0.1 }}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  height: isMobile ? IMG_H_MOBILE : IMG_H_DESKTOP,
                  overflow: "hidden",
                  background: cs.bg,
                  flexShrink: 0,
                  cursor: cs.href ? "pointer" : "default",
                }}
                onClick={() => cs.href && (window.location.href = cs.href)}
              >
                <img
                  src={cs.img}
                  alt={cs.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Text */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p
                  style={{
                    fontFamily: SORA,
                    fontSize: 20,
                    fontWeight: 600,
                    color: INK,
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {cs.title}
                </p>
                <p
                  style={{
                    fontFamily: SORA,
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#6a6a6a",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {cs.description}
                </p>
                {cs.href ? (
                  <Link
                    href={cs.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: SORA,
                      fontSize: 14,
                      fontWeight: 600,
                      color: OLIVE,
                      textDecoration: "none",
                      marginTop: 4,
                    }}
                  >
                    View Case Study →
                  </Link>
                ) : (
                  <p style={{ fontFamily: SORA, fontSize: 13, color: "#9a9a9a", margin: "2px 0 0" }}>
                    Coming soon
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
