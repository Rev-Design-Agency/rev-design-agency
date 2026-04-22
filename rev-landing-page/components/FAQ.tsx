"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { T_OVERLINE } from "@/lib/type";

const DEFAULT_FAQS = [
  { q: "How much does a website cost?", a: "Custom websites at Rev start from 15,000 EGP. The final price depends on scope, number of pages, and whether development is included. We always discuss budget in the first call. No surprises, no hidden fees. We also offer Shopify builds at a lower price point for businesses that are just starting out." },
  { q: "How long does it take?", a: "A standard custom website takes 3 to 6 weeks from kickoff to delivery. The timeline depends on scope and how quickly feedback rounds move. We agree on a schedule upfront and keep to it." },
  { q: "Do you use templates?", a: "Never. Every website at Rev is designed from scratch in Figma, specific to your brand and your audience. Off-the-shelf templates are built for everyone, which means they fit no one particularly well." },
  { q: "Who will I be working with?", a: "You work directly with Youssef, Rev's founder and lead designer. No handoffs to junior designers, no account managers in between. You get the same person from the first call to the final delivery." },
  { q: "What happens after launch?", a: "We deliver the final Figma design file and the live website. We're available after launch for questions and minor adjustments. Need ongoing support? Ask us about retainer options." },
];

type FAQData = { questions?: { question: string; answer: string }[] };

export default function FAQ({ data }: { data?: FAQData }) {
  const faqs = data?.questions?.map(q => ({ q: q.question, a: q.answer })) || DEFAULT_FAQS;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section id="faq" ref={ref} style={{ background: "#0f0f0f", padding: isMobile ? "60px 0" : "100px 0" }}>
      <div className="container-xl" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "64px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <p style={{ ...T_OVERLINE }}>Got Questions?</p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.01em", color: "#f0f5e8", lineHeight: 1.2, margin: 0, maxWidth: "780px" }}
          >
            Everything you want to know before we talk.
          </motion.h2>
        </div>

        {/* FAQ Items — answers always in DOM for crawlers */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.08 + i * 0.08 }}
                style={{ borderTop: "1px solid #2a2a2a" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "28px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "24px",
                    fontWeight: 300,
                    color: isOpen ? "#f0f5e8" : "#6a6a6a",
                    lineHeight: 1,
                    flexShrink: 0,
                    width: "24px",
                    display: "inline-block",
                  }}>
                    {isOpen ? "×" : "+"}
                  </span>
                  <span style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "24px",
                    fontWeight: 500,
                    color: isOpen ? "#f0f5e8" : "#6a6a6a",
                    lineHeight: 1.3,
                    transition: "color 0.2s",
                  }}>
                    {faq.q}
                  </span>
                </button>

                {/* Always in DOM for SEO — CSS grid height animation */}
                <div style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "18px",
                      color: "rgba(240, 245, 232, 0.45)",
                      lineHeight: 1.75,
                      margin: 0,
                      paddingLeft: "44px",
                      paddingBottom: "28px",
                      opacity: isOpen ? 1 : 0,
                      transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <div style={{ borderTop: "1px solid #2a2a2a" }} />
        </div>

        {/* Still have a question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            paddingTop: "16px",
            borderTop: "1px solid #2a2a2a",
            gap: isMobile ? "24px" : "0",
          }}
        >
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f0f5e8", margin: 0 }}>
            Still have a Question ?
          </h3>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", gap: "24px", width: isMobile ? "100%" : "auto" }}>
            {!isMobile && <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", color: "#f0f5e8" }}>Talk to Us</span>}
            <AnimButton href="https://calendly.com/youssefhishmat/meeting-with-youssef" variant="green" target="_blank" style={isMobile ? { width: "100%", justifyContent: "center" } : undefined}>
              Book a Free Call Now
            </AnimButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
