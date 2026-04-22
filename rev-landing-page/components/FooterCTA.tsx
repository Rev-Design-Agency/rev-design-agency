"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Script from "next/script";
import { useIsMobile } from "@/hooks/useIsMobile";

type SiteSettings = { phone?: string; calendlyUrl?: string };
type FooterCtaData = {
  headline?: string;
  subtext?: string;
  responseTime?: string;
  location?: string;
  calendlyUrl?: string;
  copyrightNote?: string;
};

export default function FooterCTA({ data, siteSettings }: { data?: FooterCtaData; siteSettings?: SiteSettings }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  // Only load Calendly's 1.7 MB bundle when the footer actually enters the viewport
  const [calReady, setCalReady] = useState(false);
  useEffect(() => {
    if (inView && !calReady) setCalReady(true);
  }, [inView, calReady]);

  // Fire GA4 + Meta Pixel when Calendly confirms a booking
  useEffect(() => {
    function onCalendlyEvent(e: MessageEvent) {
      if (e.data?.event === "calendly.event_scheduled") {
        try {
          if ((window as any).gtag) {
            (window as any).gtag("event", "book_call_click", {
              event_category: "Calendly",
              event_label: "Meeting Scheduled",
            });
          }
          if ((window as any).fbq) {
            (window as any).fbq("track", "Schedule");
          }
        } catch (_) {}
      }
    }
    window.addEventListener("message", onCalendlyEvent);
    return () => window.removeEventListener("message", onCalendlyEvent);
  }, []);

  const headline = data?.headline || "Ready to build a website that actually works for your business?";
  const subtext = data?.subtext || "First call is free. No commitment, no pressure. We'll talk through your project and give you an honest view of what we'd do, in about 30 minutes.";
  const responseTime = data?.responseTime || "Usually responds within 24 hours";
  const location = data?.location || "Based in Cairo · Working with businesses across Egypt and the MENA region";
  const calendlyUrl = data?.calendlyUrl || siteSettings?.calendlyUrl || "https://calendly.com/youssefhishmat";
  const copyrightNote = data?.copyrightNote || `Last updated: March 2026 · By Youssef, Web Designer, Cairo`;

  const calendlyEmbedUrl = `${calendlyUrl}?background_color=121212&text_color=f6faeb&primary_color=9fcc2e&hide_gdpr_banner=1`;

  return (
    <section id="contact" ref={ref} style={{ background: "#121212", display: "flex", flexDirection: "column", alignItems: "stretch", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(159,204,46,0.07) 0%, transparent 70%)" }} />

      <div style={{ width: "100%", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0", position: "relative", zIndex: 1 }}>
        <div style={{ padding: isMobile ? "40px 20px" : "80px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "36px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.01em", color: "#9fcc2e", lineHeight: 1.2, margin: 0 }}
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(16px, 1.5vw, 18px)", fontWeight: 400, color: "rgba(240, 245, 232, 0.45)", lineHeight: 1.65, margin: 0 }}
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 }}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", color: "#e5e5e5", margin: 0 }}>{responseTime}</p>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", color: "#555", margin: 0 }}>{location}</p>
          </motion.div>
        </div>

        <motion.div
          id="calendly"
          initial={{ opacity: 0, x: isMobile ? 0 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          style={{ borderLeft: isMobile ? "none" : "1px solid #2a2a2a", minHeight: isMobile ? "700px" : "900px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {calReady ? (
            <div
              className="calendly-inline-widget"
              data-url={calendlyEmbedUrl}
              style={{ width: "100%", height: isMobile ? "700px" : "900px" }}
            />
          ) : (
            <div style={{ color: "#444", fontFamily: "'Sora', sans-serif", fontSize: "14px" }}>
              Loading calendar…
            </div>
          )}
        </motion.div>
      </div>
      {calReady && <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />}

      <div className="container-xl" style={{ position: "relative", zIndex: 1, width: "100%", paddingTop: "60px", paddingBottom: "60px" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{ width: "100%", borderTop: "1px solid #2a2a2a", paddingTop: "40px", paddingBottom: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}
        >
          <img src="/rev-logo.svg" alt="REV Design Agency" width={160} height={32} style={{ height: "32px", objectFit: "contain" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "20px" : "40px", justifyContent: "center" }}>
            {["Service", "Testimonials", "Story", "Process", "FAQ"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "#6e6e6e", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#9fcc2e"}
                onMouseLeave={e => e.currentTarget.style.color = "#6e6e6e"}
              >{link}</a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "12px", color: "#444", margin: 0 }}>
              © {new Date().getFullYear()} REV Design Agency. All rights reserved.
            </p>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "11px", color: "#333", margin: 0 }}>{copyrightNote}</p>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "11px", color: "#2e2e2e", margin: "8px 0 0", maxWidth: "560px", textAlign: "center", lineHeight: 1.6 }}>
              Rev Design Agency is a premium UI/UX and Web Design studio based in Cairo, Egypt, helping ambitious brands across the MENA region turn visitors into customers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
