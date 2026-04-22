"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";

type SiteSettings = { phone?: string; calendlyUrl?: string };
type BudgetCtaData = { badge?: string; headline?: string; body?: string; buttonText?: string; buttonUrl?: string };

export default function BudgetCTA({ data, siteSettings }: { data?: BudgetCtaData; siteSettings?: SiteSettings }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  const badge = data?.badge || "Not ready for custom yet?";
  const headline = data?.headline || "We've got you covered.";
  const body = data?.body || "Starting with a tight budget? We build professional Shopify stores: premium templates, fully customized and set up properly. Same attention to detail as our custom builds. A fraction of the cost.";
  const buttonText = data?.buttonText || "Book a Free Call Now";
  const buttonUrl = data?.buttonUrl || siteSettings?.calendlyUrl || "https://calendly.com/youssefhishmat/meeting-with-youssef";

  return (
    <section id="budget" ref={ref} style={{ background: "#0f0f0f", padding: "60px 0 100px" }}>
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ position: "relative", background: "#0f1f00", borderRadius: "32px", padding: isMobile ? "40px 24px" : "80px 120px", overflow: "visible" }}
        >
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, rotate: -5, y: -20 }}
              animate={inView ? { opacity: 1, rotate: 3, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              style={{ position: "absolute", top: "-24px", right: "120px", background: "#1a1a1a", border: "2px solid #2a2a2a", borderRadius: "12px", padding: "14px 28px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", transform: "rotate(3deg)" }}
            >
              <img src="/shopify-logo.svg" alt="Shopify" style={{ height: "35px", width: "112px", objectFit: "contain", display: "block" }} />
            </motion.div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "1000px" }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="badge-pill"
              style={{ alignSelf: "flex-start" }}
            >
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(16px, 4vw, 28px)", fontWeight: 600, color: "#b0b0b0" }}>{badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              style={{ fontFamily: "'Sora', sans-serif", fontSize: isMobile ? "32px" : "clamp(32px, 7vw, 64px)", fontWeight: 600, color: "#f0f5e8", lineHeight: 1.1, margin: 0 }}
            >
              {headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              style={{ fontFamily: "'Sora', sans-serif", fontSize: isMobile ? "15px" : "clamp(15px, 3vw, 22px)", fontWeight: 600, color: "#f0f5e8", lineHeight: 1.5, margin: 0, maxWidth: "800px" }}
            >
              {body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
              style={{ alignSelf: isMobile ? "stretch" : "flex-start" }}
            >
              <AnimButton href={buttonUrl} variant="green" target="_blank" style={isMobile ? { width: "100%", justifyContent: "center" } : undefined}>
                {buttonText}
              </AnimButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
