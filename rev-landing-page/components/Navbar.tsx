"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";

const navLinks = [
  { label: "Service",      href: "#service" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Story",        href: "#story" },
  { label: "Process",      href: "#process" },
  { label: "Case Studies", href: "/#portfolio" },
  { label: "FAQs",         href: "#faq" },
  { label: "Blog",         href: "#blog" },
];

function scrollTo(href: string) {
  if (href.startsWith("/#")) {
    // e.g. "/#portfolio" — scroll if element exists on page, else navigate
    const id = href.slice(2);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = href;
    }
  } else if (href.startsWith("#")) {
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/" + href;
    }
  }
}

type SiteSettings = { phone?: string; calendlyUrl?: string };

export default function Navbar({ siteSettings }: { siteSettings?: SiteSettings }) {
  const phone = siteSettings?.phone || "+20 01225416204";
  const calendlyUrl = siteSettings?.calendlyUrl || "https://calendly.com/youssefhishmat/meeting-with-youssef";
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: isMobile ? "10px 14px" : "12px 32px",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(18,18,18,0.97)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: isMobile ? "60px" : "9999px",
            padding: isMobile ? "14px 20px" : "16px 28px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Logo */}
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src="/rev-logo.svg"
              alt="REV Design Agency"
              width={120}
              height={24}
              style={{ height: "24px", objectFit: "contain", cursor: "pointer" }}
            />
          </Link>

          {/* Desktop nav links */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center" }}>
              {navLinks.map((link, i) => (
                <div key={link.label} style={{ display: "flex", alignItems: "center" }}>
                  {i > 0 && (
                    <span style={{ width: "1px", height: "20px", background: "#9da9b8", opacity: 0.25, margin: "0 16px" }} />
                  )}
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "white",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#9fcc2e")}
                    onMouseLeave={e => (e.currentTarget.style.color = "white")}
                    onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "14px",
                  color: "#a0a0a0",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f0f5e8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#a0a0a0")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
                </svg>
                {phone}
              </a>
              <AnimButton href={calendlyUrl} variant="outline" target="_blank">
                Book a Free Call Now
              </AnimButton>
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
              aria-label="Toggle menu"
            >
              <span style={{ display: "block", width: "22px", height: "2px", background: "#f0f5e8", borderRadius: "2px", transition: "all 0.3s ease-in-out", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "#f0f5e8", borderRadius: "2px", transition: "all 0.3s ease-in-out", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "22px", height: "2px", background: "#f0f5e8", borderRadius: "2px", transition: "all 0.3s ease-in-out", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          )}
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#0f0f0f",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              padding: "100px 36px 48px",
              overflowY: "auto",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {navLinks.map((link, i) => (
                <div key={link.label} style={{ display: "flex", flexDirection: "column" }}>
                  {i > 0 && <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.07)" }} />}
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "22px",
                      fontWeight: 600,
                      color: "#f0f5e8",
                      textDecoration: "none",
                      padding: "18px 0",
                      display: "block",
                    }}
                    onClick={e => { e.preventDefault(); scrollTo(link.href); setMenuOpen(false); }}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.07)" }} />
            </nav>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: "40px" }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: 500, color: "#555", margin: 0, letterSpacing: "0.02em" }}>
                Not ready for custom yet?
              </p>
              <AnimButton href={calendlyUrl} variant="green" target="_blank" style={{ width: "100%", justifyContent: "center" }}>
                Book a Free Call Now
              </AnimButton>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                style={{ fontFamily: "'Sora', sans-serif", fontSize: "13px", color: "#444", textDecoration: "none", textAlign: "center", paddingTop: "4px" }}
              >
                {phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
