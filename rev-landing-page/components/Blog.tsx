"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import { urlFor } from "@/sanity/lib/image";
import { T_OVERLINE } from "@/lib/type";

/* ─────────────────────────────────────────────────────────────────────
   TYPES  — matches the new blogQuery shape
──────────────────────────────────────────────────────────────────────*/
type BlogPost = {
  title?: string;
  slug?: string;
  category?: string;
  readTime?: string;
  publishedAt?: string;
  excerpt?: string;
  heroImage?: { asset?: object };
};

/* ─────────────────────────────────────────────────────────────────────
   FALLBACK  — shown only when Sanity returns 0 published posts
──────────────────────────────────────────────────────────────────────*/
const DEFAULT_POSTS: BlogPost[] = [
  {
    slug: "stop-wasting-budget-on-a-pretty-website",
    category: "STRATEGY",
    readTime: "5 MIN READ",
    publishedAt: "2025-01-10T00:00:00Z",
    title: 'Stop Wasting Budget on a "Pretty" Website.',
    excerpt: "Why aesthetic design without a conversion strategy is a business liability—and how to fix it.",
  },
  {
    slug: "ui-vs-ux-the-invisible-line-between-success-and-failure",
    category: "UI/UX",
    readTime: "7 MIN READ",
    publishedAt: "2025-02-14T00:00:00Z",
    title: "UI vs. UX: The Invisible Line Between Success and Failure",
    excerpt: "Learn the difference between how your site looks and how it actually works to retain customers.",
  },
  {
    slug: "the-anatomy-of-a-high-converting-landing-page",
    category: "GROWTH",
    readTime: "6 MIN READ",
    publishedAt: "2025-03-20T00:00:00Z",
    title: "The Anatomy of a High-Converting Landing Page",
    excerpt: "A deep dive into the psychology and elements that turn casual visitors into loyal buyers.",
  },
];

/* ─────────────────────────────────────────────────────────────────────
   HELPERS
──────────────────────────────────────────────────────────────────────*/
function ArrowIcon() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <polyline points="15 10 20 15 15 20" />
      <path d="M4 4v7a4 4 0 004 4h12" />
    </svg>
  );
}

function resolveImage(post: BlogPost): string | undefined {
  if (post.heroImage?.asset) {
    return urlFor(post.heroImage)
      .width(800).height(500)
      .fit("crop").crop("focalpoint")
      .auto("format")
      .url();
  }
  return undefined;
}

/* ─────────────────────────────────────────────────────────────────────
   CARD
──────────────────────────────────────────────────────────────────────*/
function BlogCard({
  post,
  index,
  inView,
  isMobile,
}: {
  post: BlogPost;
  index: number;
  inView: boolean;
  isMobile: boolean;
}) {
  const imgSrc = resolveImage(post);
  const href   = post.slug ? `/blog/${post.slug}` : "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 85,
        damping: 22,
        delay: 0.2 + index * 0.12,
      }}
      style={{
        flex: "0 0 auto",
        width: isMobile ? "80vw" : "clamp(300px, 28vw, 400px)",
        scrollSnapAlign: "start",
        display: "flex",
        height: isMobile ? 618 : undefined,
      }}
    >
      <Link href={href} style={{ textDecoration: "none", display: "flex", flex: 1 }}>
        <div
          style={{
            background: "#0c0c0c",
            border: "1px solid #252525",
            borderRadius: 24,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 20,
            flex: 1,
            overflow: "hidden",
            cursor: "pointer",
            transition: "border-color 0.25s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#3a3a3a")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "#252525")}
        >
          {/* Cover image */}
          <div style={{
            position: "relative",
            height: isMobile ? 220 : 300,
            borderRadius: 12,
            overflow: "hidden",
            flexShrink: 0,
            background: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
          }}>
            {imgSrc && (
              <img
                src={imgSrc}
                alt={post.title || "Blog post"}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}

            {/* Tags */}
            <div style={{ position: "absolute", bottom: 12, left: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {post.category && (
                <span style={{
                  background: "#1b1e21", color: "#9da9b8",
                  fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 400,
                  lineHeight: 1.3, padding: "8px 10px", borderRadius: 8, whiteSpace: "nowrap",
                }}>
                  {post.category}
                </span>
              )}
              {post.readTime && (
                <span style={{
                  background: "#1b1e21", color: "#9da9b8",
                  fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 400,
                  lineHeight: 1.3, padding: "8px 10px", borderRadius: 8, whiteSpace: "nowrap",
                }}>
                  {post.readTime}
                </span>
              )}
              {post.publishedAt && (
                <span style={{
                  background: "#1b1e21", color: "#9da9b8",
                  fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 400,
                  lineHeight: 1.3, padding: "8px 10px", borderRadius: 8, whiteSpace: "nowrap",
                }}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              )}
            </div>
          </div>

          {/* Text body */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
            {post.title && (
              <h3 style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: "#f6faeb",
                lineHeight: 1.3,
                margin: 0,
              }}>
                {post.title}
              </h3>
            )}
            {post.excerpt && (
              <p style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: "rgba(240, 245, 232, 0.45)",
                lineHeight: 1.6,
                margin: 0,
              }}>
                {post.excerpt}
              </p>
            )}
          </div>

          {/* CTA */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "'Poppins', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            color: "#ffffff",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            flexShrink: 0,
          }}>
            <ArrowIcon />
            Read More
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ARROW BUTTON
──────────────────────────────────────────────────────────────────────*/
function ArrowButton({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Scroll left" : "Scroll right"}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid #2a2a2a",
        background: disabled ? "#111" : "#1a1a1a",
        color: disabled ? "#3a3a3a" : "#f0f5e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        flexShrink: 0,
        transition: "background 0.2s, border-color 0.2s, color 0.2s",
      }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = "#252525"; }}
      onMouseLeave={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a"; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION
──────────────────────────────────────────────────────────────────────*/
export default function Blog({ data, showArrows = true }: { data?: BlogPost[]; showArrows?: boolean }) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const CARD_W = isMobile ? window?.innerWidth * 0.8 : 420;

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -CARD_W : CARD_W, behavior: "smooth" });
  };

  // If Sanity returns posts, use exactly that list (GROQ already filtered
  // out any isHidden=true posts). For each returned post, merge with the
  // matching default so unfilled fields (excerpt, category, etc.) still show.
  // If Sanity returns nothing at all, fall back to showing all 3 defaults.
  let posts: BlogPost[];
  if (data && data.length > 0) {
    posts = data.map(sanityPost => {
      const def = DEFAULT_POSTS.find(d => d.slug === sanityPost.slug) ?? {};
      const clean = Object.fromEntries(
        Object.entries(sanityPost).filter(([, v]) => v != null && v !== "")
      ) as BlogPost;
      return { ...def, ...clean };
    });
  } else {
    posts = DEFAULT_POSTS;
  }

  /* Container padding mirrors container-xl */
  const pad = isMobile ? "20px" : "60px";

  /* On desktop, if ≤ 3 posts just centre them — no scroll needed */
  const useScroll = isMobile || posts.length > 3;
  /* Show arrows only when scrolling AND CMS toggle is on */
  const showArrowBtns = useScroll && showArrows && !isMobile;

  return (
    <section
      id="blog"
      ref={ref}
      style={{ background: "#0f0f0f", padding: isMobile ? "60px 0" : "100px 0" }}
    >
      <style>{`.blog-scroll::-webkit-scrollbar { display: none; }`}</style>

      {/* ── Header ── */}
      <div className="container-xl" style={{ marginBottom: isMobile ? 40 : showArrowBtns ? 20 : 60 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ ...T_OVERLINE, margin: 0 }}
          >
            Blogs
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.08 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.01em", color: "#f6faeb", lineHeight: 1.2, margin: 0 }}
          >
            Digital Intelligence.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(16px, 1.5vw, 18px)", fontWeight: 400, color: "rgba(240, 245, 232, 0.55)", lineHeight: 1.65, margin: 0, maxWidth: 780 }}
          >
            We don&apos;t just design pages; we build growth engines. Explore our thoughts on the intersection of high-end aesthetics and conversion psychology.
          </motion.p>
        </div>
      </div>

      {/* ── Arrow controls — only when scroll is active and CMS toggled on ── */}
      {showArrowBtns && (
        <div className="container-xl" style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 20 }}>
          <ArrowButton dir="left"  onClick={() => scroll("left")}  disabled={!canLeft}  />
          <ArrowButton dir="right" onClick={() => scroll("right")} disabled={!canRight} />
        </div>
      )}

      {/* ── Cards ── */}
      {useScroll ? (
        /* SCROLL layout — 4+ posts or mobile */
        <div
          ref={scrollRef}
          className="blog-scroll"
          onScroll={updateArrows}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            alignItems: "stretch",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            boxSizing: "border-box",
            paddingLeft: pad,
            paddingBottom: 4,
            scrollPaddingLeft: pad,
          }}
        >
          {posts.map((post, i) => (
            <BlogCard key={post.slug || i} post={post} index={i} inView={inView} isMobile={isMobile} />
          ))}
          {/* Trailing spacer — right-padding fix for all browsers */}
          <div aria-hidden="true" style={{ flexShrink: 0, width: pad }} />
        </div>
      ) : (
        /* CENTRED layout — exactly 1-3 posts on desktop */
        <div
          className="container-xl"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {posts.map((post, i) => (
            <BlogCard key={post.slug || i} post={post} index={i} inView={inView} isMobile={isMobile} />
          ))}
        </div>
      )}
    </section>
  );
}
