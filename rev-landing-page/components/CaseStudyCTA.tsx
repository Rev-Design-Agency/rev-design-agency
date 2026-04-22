"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import AnimButton from "@/components/AnimButton";

const INK  = "#101405";
const SORA = "'Sora', sans-serif";
const SPRING = { type: "spring", stiffness: 72, damping: 20 } as const;

export default function CaseStudyCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();

  return (
    <section
      ref={ref}
      style={{
        background: "#ffffff",
        padding: isMobile ? "72px 24px" : "120px 107px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? 28 : 37,
        textAlign: "center",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...SPRING }}
        style={{
          fontFamily: SORA,
          fontSize: isMobile ? "clamp(28px, 7vw, 44px)" : 64,
          fontWeight: 600,
          color: INK,
          margin: 0,
          lineHeight: 1.3,
          maxWidth: isMobile ? "100%" : 1075,
          letterSpacing: "-0.01em",
        }}
      >
        Ready to transform your digital presence into a growth engine?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...SPRING, delay: 0.12 }}
      >
        <AnimButton
          href="https://calendly.com/youssefhishmat"
          variant="dark"
          target="_blank"
        >
          Book a Strategy Call
        </AnimButton>
      </motion.div>
    </section>
  );
}
