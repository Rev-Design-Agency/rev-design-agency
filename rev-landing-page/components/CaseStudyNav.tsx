"use client";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  /** href for the ← Back button */
  prevHref?: string;
  /** href for the Next Case Study → button */
  nextHref?: string;
}

export default function CaseStudyNav({ prevHref = "/", nextHref = "/" }: Props) {
  const isMobile = useIsMobile();
  const SORA = "'Sora', sans-serif";

  // Use non-null fallbacks so buttons ALWAYS render
  const safeBack = prevHref || "/";
  const safeNext = nextHref || "/";

  const circleStyle: React.CSSProperties = {
    width: isMobile ? 36 : 44,
    height: isMobile ? 36 : 44,
    minWidth: isMobile ? 36 : 44,   // prevent shrink on small screens
    minHeight: isMobile ? 36 : 44,
    borderRadius: "50%",
    border: "1.5px solid rgba(0,0,0,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: SORA,
    fontSize: isMobile ? 13 : 15,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: "#111",
    whiteSpace: "nowrap",
  };

  const linkStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? 10 : 14,
    textDecoration: "none",
    color: "#111",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "16px 20px" : "28px 60px",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "#fff",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* ← Back */}
      <a href={safeBack} style={linkStyle}>
        <span style={circleStyle}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8L10 13"
              stroke="#111"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span style={labelStyle}>Back</span>
      </a>

      {/* Next Case Study → */}
      <a href={safeNext} style={linkStyle}>
        <span style={labelStyle}>Next Case Study</span>
        <span style={circleStyle}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 3L11 8L6 13"
              stroke="#111"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}
