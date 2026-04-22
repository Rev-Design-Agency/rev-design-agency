"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { T_OVERLINE } from "@/lib/type";

const DEFAULT_SERVICES = [
  {
    prefix: "eCommerce",
    suffix: " Design & Development",
    description:
      "Your store is your sales floor. We design it so the right products find the right people and buying feels obvious. No bloated templates, no generic layouts. Built from scratch around your catalogue, your brand, and one goal: more checkouts.",
  },
  {
    prefix: "Corporate Website",
    suffix: " Design & Development",
    description:
      "Your website is your pitch before you say a word. We design corporate sites that make the right visitors stay, understand what you do, and reach out without you having to follow up twice. Strategy first, design second, results always.",
  },
  {
    prefix: "Product",
    suffix: " Design",
    description:
      "A product that's hard to use loses to one that isn't — even if yours is better. We design the flows, screens, and interactions that make your app feel obvious to the people using it. UX strategy, wireframes, and pixel-perfect UI. All in Figma, ready for your dev team.",
  },
];

type ServiceItem = { prefix: string; suffix: string; description: string };
type WhatWeBuildData = {
  label?: string;
  headline?: string;
  buttonText?: string;
  buttonUrl?: string;
  services?: ServiceItem[];
};

export default function WhatWeBuild({ data }: { data?: WhatWeBuildData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState<number | null>(null);

  const label = data?.label || "What We Build";
  const headline = data?.headline || "Not just websites. We build a better first impression.";
  const buttonText = data?.buttonText || "Book a Free Call Now";
  const buttonUrl = data?.buttonUrl || "https://calendly.com/youssefhishmat/meeting-with-youssef";
  const services: ServiceItem[] = data?.services?.length ? data.services : DEFAULT_SERVICES;

  return (
    <section id="service" ref={ref} style={{ background: "#0f0f0f", padding: isMobile ? "60px 0" : "100px 0" }}>
      <div className="container-xl" style={{ display: "flex", flexDirection: "column", gap: isMobile ? "40px" : "56px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ ...T_OVERLINE, margin: 0 }}
          >
            {label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.01em", color: "#f0f5e8", lineHeight: 1.2, margin: 0, maxWidth: "760px" }}
          >
            {headline}
          </motion.h2>
        </div>

        <div
          style={{
            display: "flex", flexDirection: "row", gap: "4px",
            ...(isMobile && { overflowX: "scroll", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", marginLeft: "-24px", marginRight: "-24px", paddingLeft: "24px", paddingRight: "24px" }),
          }}
        >
          {services.map((service, i) => {
            const isHovered = hovered === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 + i * 0.15 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ flex: isMobile ? "0 0 80vw" : 1, scrollSnapAlign: isMobile ? "center" : undefined, padding: isMobile ? "28px 24px" : "32px", borderRadius: "10px", overflow: "hidden", display: "flex", flexDirection: "column", gap: "16px", cursor: "default", background: isHovered ? "#9fcc2e" : "linear-gradient(163.76deg, #ffffff 17.567%, #9fcc2e 604.73%)", transition: "background 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 600, lineHeight: 1.3, margin: 0, color: "#101405" }}>
                  <span style={{ color: isHovered ? "#101405" : "#5f7a1c", transition: "color 0.25s" }}>{service.prefix}</span>
                  {service.suffix}
                </p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: 500, color: "#252525", lineHeight: 1.6, margin: 0 }}>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.65 }}
          style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <AnimButton href={buttonUrl} variant="green" target="_blank" style={isMobile ? { width: "100%", justifyContent: "center" } : undefined}>
            {buttonText}
          </AnimButton>
        </motion.div>
      </div>
    </section>
  );
}
