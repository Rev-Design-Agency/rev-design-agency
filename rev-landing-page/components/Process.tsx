"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { T_OVERLINE } from "@/lib/type";

const DEFAULT_STEPS = [
  { step: "01", title: "Free Intro Call", desc: "We discuss your vision, goals, and challenges. You leave with a clear picture of what we'd do for your project. No commitment required.", side: "left", cta: true },
  { step: "02", title: "Research & Strategy", desc: "We define your target users, study competitors, and set the foundation for design decisions that align with growth goals.", side: "right", cta: false },
  { step: "03", title: "Wireframing & Concept Design (UX)", desc: "We map user flows and key screens to create a clear, intuitive experience that makes it easy for visitors to take the next step.", side: "left", cta: false },
  { step: "04", title: "Visual Design (UI)", desc: "We craft the visual identity: layout, colors, typography. Designed to express your brand and keep it usable across devices.", side: "right", cta: false },
  { step: "05", title: "Fine-Tuning & Delivery", desc: "Final revisions, quality check, and handover. You receive the complete Figma file, ready for development and deployment.", side: "left", cta: false },
];

type StepItem = { step: string; title: string; desc: string; side: string; cta: boolean };
type ProcessData = {
  label?: string;
  headline?: string;
  subheadline?: string;
  steps?: StepItem[];
  ctaText?: string;
  ctaUrl?: string;
};

export default function Process({ data }: { data?: ProcessData }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 80%", "end 60%"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const label = data?.label || "The Rev Process";
  const headline = data?.headline || "What happens after you reach out?";
  const subheadline = data?.subheadline || "A clear process. No surprises. No disappearing after launch.";
  const steps: StepItem[] = data?.steps?.length ? data.steps : DEFAULT_STEPS;
  const ctaText = data?.ctaText || "Book a Free Call Now";
  const ctaUrl = data?.ctaUrl || "https://calendly.com/youssefhishmat/meeting-with-youssef";

  return (
    <section id="process" style={{ background: "#0f0f0f", padding: isMobile ? "60px 0" : "100px 0" }}>
      <div className="container-xl" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "80px" }}>

        <div ref={headerRef} style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ ...T_OVERLINE, margin: 0 }}
          >
            {label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.01em", color: "#f0f5e8", lineHeight: 1.2, margin: 0, textAlign: "center", maxWidth: "1100px" }}
          >
            {headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(16px, 1.5vw, 18px)", color: "rgba(240, 245, 232, 0.55)", textAlign: "center", maxWidth: "500px", lineHeight: 1.65, margin: 0 }}
          >
            {subheadline}
          </motion.p>
        </div>

        <div ref={timelineRef} style={{ position: "relative", width: "100%", maxWidth: "900px" }}>
          <div style={{ position: "absolute", left: isMobile ? "19px" : "50%", top: 0, bottom: 0, width: "2px", background: "#2a2a2a", transform: isMobile ? "none" : "translateX(-50%)" }} />
          <motion.div style={{ position: "absolute", left: isMobile ? "19px" : "50%", top: 0, bottom: 0, width: "2px", background: "#f0f5e8", transform: isMobile ? "none" : "translateX(-50%)", transformOrigin: "top", scaleY: lineScaleY }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, i) => (
              <StepItem key={i} step={step} index={i} isMobile={isMobile} ctaText={ctaText} ctaUrl={ctaUrl} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function StepItem({ step, index, isMobile, ctaText, ctaUrl }: { step: StepItem; index: number; isMobile: boolean; ctaText: string; ctaUrl: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (isMobile) {
    return (
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "40px 1fr", alignItems: "flex-start", marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "4px" }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.05 }}
            style={{ width: "36px", height: "36px", borderRadius: "50%", border: "3px solid #f0f5e8", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, position: "relative", flexShrink: 0 }}
          >
            <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }} style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f0f5e8" }} />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          style={{ paddingLeft: "16px", paddingBottom: "8px" }}
        >
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 600, color: "#f0f5e8", margin: "0 0 8px", lineHeight: 1.3 }}>{step.title}</h3>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "16px", color: "rgba(240, 245, 232, 0.45)", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
          {step.cta && (
            <AnimButton href={ctaUrl} variant="green" target="_blank" style={{ display: "inline-flex", marginTop: "20px", fontSize: "14px", padding: "14px 28px" }}>
              {ctaText}
            </AnimButton>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 72px 1fr", alignItems: "center", marginBottom: "64px" }}>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        style={{ textAlign: "left", paddingRight: "32px" }}
      >
        {step.side === "left" && (
          <>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 600, color: "#f0f5e8", margin: "0 0 8px", lineHeight: 1.3 }}>{step.title}</h3>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "16px", color: "rgba(240, 245, 232, 0.45)", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            {step.cta && (
              <AnimButton href={ctaUrl} variant="green" target="_blank" style={{ display: "inline-flex", marginTop: "20px", fontSize: "14px", padding: "14px 28px" }}>
                {ctaText}
              </AnimButton>
            )}
          </>
        )}
      </motion.div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.05 }}
          style={{ width: "36px", height: "36px", borderRadius: "50%", border: "3px solid #f0f5e8", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, position: "relative" }}
        >
          <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }} style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f0f5e8" }} />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        style={{ textAlign: "left", paddingLeft: "32px" }}
      >
        {step.side === "right" && (
          <>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 600, color: "#f0f5e8", margin: "0 0 8px", lineHeight: 1.3 }}>{step.title}</h3>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "16px", color: "rgba(240, 245, 232, 0.45)", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
          </>
        )}
      </motion.div>
    </div>
  );
}
