"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import { urlFor } from "@/sanity/lib/image";

/* ─── Type — matches moreBlogPostsQuery shape ─────────────────────── */
type BlogPost = {
  title?: string;
  slug?: string;
  category?: string;
  readTime?: string;
  publishedAt?: string;
  excerpt?: string;
  heroImage?: { asset?: object };
};

/* ─── Fallback posts (shown when Sanity returns < 2 results) ─────── */
const ALL_DEFAULTS: BlogPost[] = [
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

/* ─── Helpers ─────────────────────────────────────────────────────── */
function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="15 10 20 15 15 20" />
      <path d="M4 4v7a4 4 0 004 4h12" />
    </svg>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      background: "#1b1e21", color: "#9da9b8",
      fontFamily: "'Sora', sans-serif", fontSize: 13,
      padding: "8px 10px", borderRadius: 8, whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

/* ─── Card ────────────────────────────────────────────────────────── */
function BlogCard({ post, index, inView, isMobile }: {
  post: BlogPost; index: number; inView: boolean; isMobile: boolean;
}) {
  const imgSrc = post.heroImage?.asset
    ? urlFor(post.heroImage).width(800).height(500).fit("crop").crop("focalpoint").auto("format").url()
    : undefined;

  const dateLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 85, damping: 22, delay: 0.1 + index * 0.12 }}
      style={{
        flex: isMobile ? "0 0 80vw" : 1,
        minWidth: 0,
        scrollSnapAlign: isMobile ? "start" : undefined,
        display: "flex",
        height: isMobile ? 618 : undefined,
      }}
    >
      <Link href={post.slug ? `/blog/${post.slug}` : "#"} style={{ textDecoration: "none", display: "flex", flex: 1 }}>
        <div
          style={{
            background: "#0c0c0c",
            border: "1px solid #252525",
            borderRadius: 24,
            padding: 24,
            display: "flex",
            flexDirection: "column",
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
            height: isMobile ? 200 : 260,
            borderRadius: 12,
            overflow: "hidden",
            flexShrink: 0,
            background: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
          }}>
            {imgSrc && (
              <img src={imgSrc} alt={post.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            )}
            <div style={{ position: "absolute", bottom: 12, left: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {post.category  && <Tag>{post.category}</Tag>}
              {post.readTime  && <Tag>{post.readTime}</Tag>}
              {dateLabel      && <Tag>{dateLabel}</Tag>}
            </div>
          </div>

          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
            {post.title && (
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: isMobile ? 18 : 20, fontWeight: 600, color: "#f6faeb", lineHeight: 1.3, margin: 0 }}>
                {post.title}
              </h3>
            )}
            {post.excerpt && (
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, color: "#b8b8b8", lineHeight: 1.6, margin: 0 }}>
                {post.excerpt}
              </p>
            )}
          </div>

          {/* CTA */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 500, color: "#ffffff", textDecoration: "underline", textUnderlineOffset: 3, flexShrink: 0 }}>
            <ArrowIcon />
            Read More
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────── */
export default function MoreBlogPosts({
  currentSlug,
  posts,
}: {
  currentSlug: string;
  posts: BlogPost[];
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();

  // If Sanity returned posts use them; otherwise fall back to defaults
  // (excluding the current page's post from the defaults too)
  const displayPosts = posts.length > 0
    ? posts
    : ALL_DEFAULTS.filter(p => p.slug !== currentSlug).slice(0, 2);

  if (displayPosts.length === 0) return null;

  return (
    <section ref={ref} style={{ background: "#0a0a0a", padding: isMobile ? "60px 20px" : "80px 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ marginBottom: isMobile ? 32 : 48 }}
        >
          <p style={{ fontFamily: "'Handlee', cursive", fontSize: 16, color: "#9fcc2e", margin: "0 0 8px" }}>
            Keep Reading
          </p>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: isMobile ? "clamp(24px,6vw,32px)" : "clamp(28px,3vw,40px)", fontWeight: 600, color: "#f6faeb", lineHeight: 1.3, margin: 0 }}>
            More from the blog
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: 16,
          alignItems: "stretch",
          ...(isMobile && {
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            marginLeft: "-20px",
            marginRight: "-20px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }),
        }}>
          {displayPosts.map((post, i) => (
            <BlogCard key={post.slug || i} post={post} index={i} inView={inView} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
