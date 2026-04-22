"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* ─── Card data ─────────────────────────────────── */
const CARDS = [
  {
    bg: "#E8F1E1",
    tag: "Strategy",
    title: "eCommerce Design & Development",
    body: "Your store is your sales floor. We design it so the right products find the right people and buying feels obvious — no bloated templates, no generic layouts.",
    italic: "Every pixel earns its place on the page.",
    footer: "Conversion-first · Built from scratch",
  },
  {
    bg: "#F1F1E1",
    tag: "Presence",
    title: "Corporate Website Design",
    body: "Your website is your pitch before you say a word. We build corporate sites that make visitors stay, understand what you do, and reach out — without you chasing them.",
    italic: "First impressions close deals before you open your mouth.",
    footer: "Strategy-first · Always results-driven",
  },
  {
    bg: "#EDE8F1",
    tag: "Experience",
    title: "Product & UI/UX Design",
    body: "A product that's hard to use loses to one that isn't — even if yours is better. We design flows, screens, and interactions that feel obvious to every user.",
    italic: "Clarity is the feature nobody talks about.",
    footer: "UX Research · Figma-ready handoff",
  },
];

const DISMISS_THRESHOLD = 100; // px

/* ─── Single draggable card ─────────────────────── */
function DraggableCard({
  card,
  index,
  total,
  onDismiss,
}: {
  card: (typeof CARDS)[0];
  index: number;
  total: number;
  onDismiss: (dir: "left" | "right") => void;
}) {
  const isTop = index === 0;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const opacity = useTransform(x, [-200, -80, 0, 80, 200], [0, 1, 1, 1, 0]);

  // Stack offset for non-top cards
  const scale = 1 - index * 0.05;
  const yOffset = index * 14;

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > DISMISS_THRESHOLD) {
      onDismiss(info.offset.x < 0 ? "left" : "right");
    }
  }

  return (
    <motion.div
      layout
      key={card.title}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        scale,
        y: yOffset,
        zIndex: total - index,
        backgroundColor: card.bg,
        position: "absolute",
        width: "100%",
        cursor: "none",
      }}
      animate={{ scale, y: yOffset }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="rounded-2xl p-8 md:p-10 select-none touch-none"
    >
      {/* Title */}
      <h3
        className="text-2xl md:text-3xl font-bold leading-snug mb-4"
        style={{ color: "#0f1a00", fontFamily: "'Sora', sans-serif" }}
      >
        {card.title}
      </h3>

      {/* Body */}
      <p
        className="text-base leading-relaxed mb-6"
        style={{ color: "#2a2a2a", fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
      >
        {card.body}
      </p>

      {/* Italic strategy line */}
      <p
        className="italic text-sm"
        style={{ color: "#5f7a1c", fontFamily: "'Poppins', sans-serif" }}
      >
        "{card.italic}"
      </p>

    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────── */
export default function StackedCards() {
  const [cards, setCards] = useState(CARDS);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  /* Custom cursor */
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const cursorX = useSpring(rawX, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(rawY, { stiffness: 500, damping: 40 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  }, [rawX, rawY]);

  function dismiss(dir: "left" | "right") {
    setCards((prev) => {
      const [top, ...rest] = prev;
      setDismissed(top.title + dir);
      return [...rest, top]; // move top card to bottom
    });
  }

  function prev() {
    setCards((prev) => {
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, -1)];
    });
  }

  // How many cards to visually show in stack (max 3)
  const visible = cards.slice(0, Math.min(3, cards.length));

  return (
    <section
      id="service"
      style={{ background: "#000000" }}
      className="py-20 md:py-28"
    >
      <div className="mx-auto px-6 md:px-12 max-w-6xl flex flex-col items-center text-center">
        {/* ── Header ── */}
        <div className="mb-14 md:mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#9fcc2e", fontFamily: "'Poppins', sans-serif" }}
          >
            What We Build
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl"
            style={{ color: "#f0f5e8", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.01em" }}
          >
            Not just websites.{" "}
            <span style={{ color: "#9fcc2e" }}>We build a better first impression.</span>
          </h2>
        </div>

        {/* ── Nav buttons ── */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={prev}
            aria-label="Previous card"
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            style={{
              borderColor: "rgba(255,255,255,0.25)",
              color: "#f0f5e8",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <button
            onClick={() => dismiss("right")}
            aria-label="Next card"
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            style={{
              borderColor: "rgba(255,255,255,0.25)",
              color: "#f0f5e8",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Next
            <ArrowRight size={15} />
          </button>
        </div>

        {/* ── Card stack ── */}
        <div
          className="relative mx-auto"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            width: "100%",
            maxWidth: "680px",
            height: "clamp(240px, 28vw, 290px)",
            cursor: "none",
          }}
        >
          <AnimatePresence>
            {[...visible].reverse().map((card, revIdx) => {
              const index = visible.length - 1 - revIdx;
              return (
                <DraggableCard
                  key={card.title}
                  card={card}
                  index={index}
                  total={visible.length}
                  onDismiss={dismiss}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Dots indicator ── */}
        <div className="flex justify-center gap-2 mt-10">
          {CARDS.map((c, i) => (
            <span
              key={c.title}
              className="rounded-full transition-all duration-300"
              style={{
                width: cards[0].title === c.title ? "24px" : "8px",
                height: "8px",
                background: cards[0].title === c.title ? "#9fcc2e" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Custom cursor ── */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{ scale: isHovering ? 1 : 0, opacity: isHovering ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div style={{
          width: "96px",
          height: "96px",
          borderRadius: "50%",
          background: "#9fcc2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#0f1a00",
            letterSpacing: "0.02em",
            textAlign: "center",
            lineHeight: 1.2,
          }}>
            Drag me
          </span>
        </div>
      </motion.div>
    </section>
  );
}
