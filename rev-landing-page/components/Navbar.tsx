"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AnimButton from "@/components/AnimButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";

const navLinks = [
  { label: "Services",  href: "#service" },
  { label: "Work",      href: "/#portfolio" },
  { label: "About",     href: "#story" },
  { label: "Blog",      href: "#blog" },
];

function scrollTo(href: string) {
  if (href.startsWith("/#")) {
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
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: isMobile ? "12px 16px" : "16px 40px",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(10,10,10,0.85)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "9999px",
            padding: isMobile ? "12px 18px" : "14px 28px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Logo */}
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src="/rev-logo.svg"
              alt="Rev"
              width={100}
              height={24}
              style={{ height: "22px", objectFit: "contain", cursor: "pointer" }}
            />
          </Link>

          {/* Desktop nav links — minimal */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    transition: "color 0.4s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTA — minimal */}
          {!isMobile && (
            <AnimButton href={calendlyUrl} variant="outline" target="_blank">
              Let's Talk
            </AnimButton>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
              aria-label="Toggle menu"
            >
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1.5px",
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "2px",
                  transition: "all 0.4s ease",
                  transform: menuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1.5px",
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "2px",
                  transition: "all 0.4s ease",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1.5px",
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "2px",
                  transition: "all 0.4s ease",
                  transform: menuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none",
                }}
              />
            </button>
          )}
        </nav>
      </motion.header>

      {/* Mobile overlay menu — premium */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.97)",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 36px",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i }}
              >
                <a
                  href={link.href}
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "36px",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    display: "block",
                    padding: "20px 0",
                    letterSpacing: "-0.02em",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  onClick={e => {
                    e.preventDefault();
                    scrollTo(link.href);
                    setMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              </motion.div>
            ))}

            {/* Mobile CTA at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                position: "absolute",
                bottom: "60px",
                left: "36px",
                right: "36px",
              }}
            >
              <AnimButton
                href={calendlyUrl}
                variant="green"
                target="_blank"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Book a Free Strategy Session
              </AnimButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}