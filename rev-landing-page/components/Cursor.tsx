"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "project" | "cta";

export default function Cursor() {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // start true to avoid SSR flash
  const cursorRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, { stiffness: 800, damping: 60, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 800, damping: 60, mass: 0.5 });

  useEffect(() => {
    // Detect touch/mobile — skip cursor entirely on those devices
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) return;

    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const detectState = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("[data-cursor='project']")) { setState("project"); return; }
      if (target.closest("[data-cursor='cta']"))     { setState("cta");     return; }
      if (
        target.closest("a, button, [role='button'], input, select, textarea, label") ||
        (target as HTMLElement).style?.cursor === "pointer"
      ) { setState("hover"); return; }
      setState("default");
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", detectState);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", detectState);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, []);

  // Don't render anything on touch devices
  if (isTouch) return null;

  const sizes: Record<CursorState, number> = { default: 14, hover: 36, project: 100, cta: 48 };
  const colors: Record<CursorState, string> = { default: "#f0f5e8", hover: "#9fcc2e", project: "#9fcc2e", cta: "#0f0f0f" };

  const size  = sizes[state];
  const color = colors[state];

  return (
    <motion.div
      ref={cursorRef}
      style={{
        position: "fixed", top: 0, left: 0,
        x, y, translateX: "-50%", translateY: "-50%",
        zIndex: 99999, pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        mixBlendMode: state === "cta" ? "normal" : "difference",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        animate={{ width: size, height: size, backgroundColor: color, borderRadius: "50%" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      >
        <motion.span
          animate={{ opacity: state === "project" ? 1 : 0, scale: state === "project" ? 1 : 0.5 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Sora', sans-serif", fontSize: "11px", fontWeight: 600,
            color: "#0f0f0f", whiteSpace: "nowrap", userSelect: "none",
            letterSpacing: "0.02em", textAlign: "center", lineHeight: 1.2,
          }}
        >
          View<br />Project
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
