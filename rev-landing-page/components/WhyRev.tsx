"use client";
import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { T_OVERLINE } from "@/lib/type";

const DEFAULT_STATS = [
  { target: 15, suffix: "+", label: "Websites designed & launched" },
  { target: 3,  suffix: "",  label: "Countries we've worked across" },
  { target: 35, suffix: "%", label: "Average conversion increase" },
];

type StatItem = { target: number; suffix: string; label: string };
type WhyRevData = { label?: string; headline?: string; stats?: StatItem[] };

function CountUp({ target, suffix, inView, delay }: { target: number; suffix: string; inView: boolean; delay: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2.8, delay, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, delay]);
  return <span>{display}{suffix}</span>;
}

export default function WhyRev({ data }: { data?: WhyRevData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  const label = data?.label || "Why REV";
  const headline = data?.headline || "Founder-led web design focused on speed, growth and real results.";
  const stats: StatItem[] = data?.stats?.length ? data.stats : DEFAULT_STATS;

  return (
    <section id="why-rev" ref={ref} style={{ background: "#121212", padding: isMobile ? "60px 0" : "100px 0" }}>
      <div className="container-xl" style={{ display: "flex", flexDirection: "column", gap: isMobile ? "48px" : "78px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ ...T_OVERLINE, margin: 0 }}
          >
            {label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.01em", color: "#f6faeb", margin: 0, lineHeight: 1.2, maxWidth: "1124px" }}
          >
            {headline}
          </motion.h2>
        </div>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "stretch", gap: 0, width: "100%" }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "stretch", flex: i === stats.length - 1 ? 1 : "none" }}>
              {i > 0 && (
                isMobile ? (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.1 }}
                    style={{ height: "1px", width: "100%", background: "#939393", margin: "24px 0", transformOrigin: "left" }}
                  />
                ) : (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.1 }}
                    style={{ width: "1px", background: "#939393", margin: "0 48px", alignSelf: "stretch", transformOrigin: "top" }}
                  />
                )
              )}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 + i * 0.12 }}
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: isMobile ? "clamp(72px, 22vw, 100px)" : "clamp(80px, 11.5vw, 180px)", color: "#9fcc2e", lineHeight: 1, margin: 0 }}>
                  <CountUp target={stat.target} suffix={stat.suffix} inView={inView} delay={0.3 + i * 0.12} />
                </p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "16px", color: "rgba(240, 245, 232, 0.45)", lineHeight: 1.3, margin: 0, maxWidth: "346px" }}>
                  {stat.label}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
