"use client";
import { useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import AnimButton from "@/components/AnimButton";
import Link from "next/link";

/* ─── Types ───────────────────────────────────────────────────────── */
type Bullet = { bold?: string; text?: string };
type Section = {
  intro?: string;
  heading?: string;
  body?: object[];
  callout?: string;
  bulletHeading?: string;
  bullets?: Bullet[];
};
type BlogPost = {
  title?: string;
  category?: string;
  readTime?: string;
  metaDescription?: string;
  heroImage?: { asset?: object };
  sections?: Section[];
  ctaDisplayText?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
};

/* ─── Portable text components ────────────────────────────────────── */
const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: "clamp(16px, 1.8vw, 20px)",
        fontWeight: 400,
        color: "#cccccc",
        lineHeight: 1.75,
        margin: "0 0 20px",
      }}>
        {children}
      </p>
    ),
  },
  list: {
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ paddingLeft: 28, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </ol>
    ),
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ listStyle: "disc", paddingLeft: 28, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </ul>
    ),
  },
  listItem: {
    number: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(15px, 1.6vw, 19px)", color: "#cccccc", lineHeight: 1.7 }}>
        {children}
      </li>
    ),
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(15px, 1.6vw, 19px)", color: "#cccccc", lineHeight: 1.7 }}>
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ color: "#f8fafc", fontWeight: 700 }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em style={{ color: "#9fcc2e", fontStyle: "normal", fontWeight: 700 }}>{children}</em>
    ),
  },
};

/* ─── Section block ───────────────────────────────────────────────── */
function SectionBlock({ section, isMobile }: { section: Section; isMobile: boolean }) {
  return (
    <div style={{
      display: "flex",
      gap: isMobile ? 20 : 40,
      alignItems: "flex-start",
    }}>
      {/* Left vertical bar */}
      <div style={{
        width: 4,
        borderRadius: 4,
        background: "#4a4a4a",
        flexShrink: 0,
        alignSelf: "stretch",
        minHeight: 80,
      }} />

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
        {section.intro && (
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(15px, 1.5vw, 18px)",
            fontWeight: 400,
            color: "#cccccc",
            margin: 0,
          }}>
            {section.intro}
          </p>
        )}

        {section.heading && (
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: isMobile ? "clamp(24px,6vw,36px)" : "clamp(32px,3.5vw,48px)",
            fontWeight: 600,
            color: "#f6faeb",
            lineHeight: 1.3,
            margin: 0,
          }}>
            {section.heading}
          </h2>
        )}

        {section.body && section.body.length > 0 && (
          <div>
            <PortableText value={section.body as Parameters<typeof PortableText>[0]["value"]} components={ptComponents} />
          </div>
        )}

        {section.callout && (
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: isMobile ? "clamp(18px,5vw,26px)" : "clamp(22px,2.5vw,32px)",
            fontWeight: 600,
            color: "#9fcc2e",
            lineHeight: 1.4,
            margin: 0,
          }}>
            {section.callout}
          </p>
        )}

        {section.bulletHeading && (
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: isMobile ? "clamp(18px,5vw,26px)" : "clamp(22px,2.5vw,32px)",
            fontWeight: 600,
            color: "#f6faeb",
            lineHeight: 1.3,
            margin: 0,
          }}>
            {section.bulletHeading}
          </p>
        )}

        {section.bullets && section.bullets.length > 0 && (
          <ul style={{ listStyle: "disc", paddingLeft: 28, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {section.bullets.map((b, i) => (
              <li key={i} style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(15px, 1.6vw, 19px)",
                color: "#cccccc",
                lineHeight: 1.7,
              }}>
                {b.bold && (
                  <strong style={{ color: "#f8fafc", fontWeight: 700 }}>{b.bold} </strong>
                )}
                {b.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─── Default content per slug ────────────────────────────────────── */
const DEFAULTS: Record<string, BlogPost> = {
  "stop-wasting-budget-on-a-pretty-website": {
    title: 'Stop Wasting Budget on a "Pretty" Website.',
    category: "STRATEGY",
    readTime: "5 MIN READ",
    metaDescription:
      "Is your website a digital brochure or a sales machine? Learn why aesthetic design without strategy fails and how to build a high-converting site in Egypt & MENA.",
    sections: [
      {
        intro: "In the world of high-end design, there is a dangerous trap:",
        heading: "The Aesthetic Illusion.",
        body: [
          {
            _type: "block",
            _key: "b1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "s1",
                text: "Many business owners in the MENA region believe that if a website looks expensive, it will attract expensive clients. But here is the hard truth: A beautiful website that doesn't convert is just a very expensive digital brochure. It looks great, but it's silent. It doesn't sell.",
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
      {
        heading: 'The "Pretty Page" Trap',
        body: [
          {
            _type: "block",
            _key: "b2",
            style: "normal",
            children: [
              { _type: "span", _key: "s1", text: "A ", marks: [] },
              { _type: "span", _key: "s2", text: "pretty", marks: ["em"] },
              { _type: "span", _key: "s3", text: " website focuses on the ", marks: [] },
              { _type: "span", _key: "s4", text: "designer's ego", marks: ["strong"] },
              { _type: "span", _key: "s5", text: ". It uses trendy animations, oversized images, and complex layouts that look stunning in a portfolio but ", marks: [] },
              { _type: "span", _key: "s6", text: "confuse the actual user.", marks: ["strong"] },
              { _type: "span", _key: "s7", text: " When a visitor lands on your page and can't figure out exactly what you do or how to buy from you ", marks: [] },
              { _type: "span", _key: "s8", text: "within 5 seconds, they leave.", marks: ["strong"] },
            ],
            markDefs: [],
          },
        ],
        callout: 'That is a "leak" in your revenue.',
      },
      {
        heading: "Strategy Over Aesthetics: The ROI of UX",
        body: [
          {
            _type: "block",
            _key: "b3",
            style: "normal",
            children: [
              { _type: "span", _key: "s1", text: "High-performance design isn't about how it looks; it's about how it works. ", marks: [] },
              { _type: "span", _key: "s2", text: "At Rev Design Agency,", marks: ["strong"] },
              { _type: "span", _key: "s3", text: " we shift the focus from decoration to conversion.", marks: [] },
            ],
            markDefs: [],
          },
        ],
        bulletHeading: "A strategic website focuses on three things:",
        bullets: [
          { bold: "Reducing Friction:", text: 'Removing the hurdles that stop a user from clicking "Contact."' },
          { bold: "Building Immediate Trust:", text: "Using visual hierarchy to prove your authority instantly." },
          { bold: "Guided Journeys:", text: "Leading the user from a problem they have to the solution you provide." },
        ],
      },
      {
        heading: "The Bottom Line: Design is a Math Problem",
        body: [
          {
            _type: "block",
            _key: "b4",
            style: "normal",
            children: [
              { _type: "span", _key: "s1", text: "When you improve your conversion rate from 1% to 2%, you haven't just \"changed the design\" — you have doubled your revenue without spending an extra penny on marketing. ", marks: [] },
              { _type: "span", _key: "s2", text: "That is the power of strategic UI/UX.", marks: ["strong"] },
            ],
            markDefs: [],
          },
        ],
      },
    ],
    ctaDisplayText: "Stop settling for a website that just looks good. Start building one that works.",
    ctaButtonText: "Book a Free Strategy Call",
    ctaButtonUrl: "https://calendly.com/youssefhishmat/meeting-with-youssef",
  },

  /* ── Post 2 ── */
  "ui-vs-ux-the-invisible-line-between-success-and-failure": {
    title: "UI vs. UX: The Invisible Line Between Success and Failure",
    category: "UI/UX",
    readTime: "7 MIN READ",
    metaDescription:
      'If you are a founder or a CEO, you\'ve likely heard the terms "UI" and "UX" used interchangeably. While they are two sides of the same coin, confusing them is a mistake that can cost your business thousands in lost leads.',
    sections: [
      /* ── Section 1: User Experience (UX) ── */
      {
        heading: "User Experience (UX)",
        body: [
          {
            _type: "block", _key: "ux1", style: "normal", markDefs: [],
            children: [{ _type: "span", _key: "s1", marks: [], text: 'is the invisible architecture of your website. It is the "how it works" part. UX is about psychology, research, and logic.' }],
          },
        ],
        bulletHeading: "When we design the UX for a brand, we are asking:",
        bullets: [
          { text: "Who is the user?" },
          { text: "What is their primary goal?" },
          { text: "What is the shortest path to get them to that goal?" },
        ],
      },
      /* ── Section 1b: UX closing line ── */
      {
        body: [
          {
            _type: "block", _key: "ux2", style: "normal", markDefs: [],
            children: [{ _type: "span", _key: "s1", marks: [], text: 'If your website is easy to navigate and the user feels "at home," that is great UX.' }],
          },
        ],
      },
      /* ── Section 2: User Interface (UI) ── */
      {
        heading: "User Interface (UI)",
        body: [
          {
            _type: "block", _key: "ui1", style: "normal", markDefs: [],
            children: [{ _type: "span", _key: "s1", marks: [], text: 'is the visual skin of the experience. It is the "how it looks" part. UI is about trust, emotion, and brand perception.' }],
          },
          {
            _type: "block", _key: "ui2", style: "normal", markDefs: [],
            children: [{ _type: "span", _key: "s1", marks: [], text: 'UI handles the typography, the neon accents, the spacing, and the micro-interactions. When a user lands on your site and thinks, "This company looks professional and high-end," that is the result of great UI.' }],
          },
        ],
      },
      /* ── Section 3: The Danger of the Gap ── */
      {
        heading: "The Danger of the Gap",
        bullets: [
          { bold: "Great UI + Bad UX =", text: "A beautiful car with no engine. It looks amazing in the driveway, but it takes the user nowhere." },
          { bold: "Great UX + Bad UI =", text: "A powerful engine in a rusty body. The car works perfectly, but no one wants to get inside." },
        ],
        callout: "To dominate the MENA market, you need both. You need a site that feels like a luxury experience (UI) but operates with surgical precision (UX).",
      },
    ],
    ctaDisplayText: "Don't choose between beauty and logic. Get both.",
    ctaButtonText: "See Our Design Process",
    ctaButtonUrl: "/#process",
  },

  /* ── Post 3 ── */
  "the-anatomy-of-a-high-converting-landing-page": {
    title: "The Anatomy of a High-Converting Landing Page",
    category: "GROWTH",
    readTime: "6 MIN READ",
    metaDescription: "Your landing page has exactly 3 seconds to answer three critical questions.",
    sections: [
      /* ── Intro: 3 questions + opening paragraph ── */
      {
        body: [
          { _type: "block", _key: "q1", style: "normal", listItem: "number", level: 1, markDefs: [], children: [{ _type: "span", _key: "s1", marks: [], text: "What is this?" }] },
          { _type: "block", _key: "q2", style: "normal", listItem: "number", level: 1, markDefs: [], children: [{ _type: "span", _key: "s1", marks: [], text: "Why should I care?" }] },
          { _type: "block", _key: "q3", style: "normal", listItem: "number", level: 1, markDefs: [], children: [{ _type: "span", _key: "s1", marks: [], text: "How do I get it?" }] },
          { _type: "block", _key: "p1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", marks: [], text: "If your page fails to answer these instantly, your visitor is gone. Here is the blueprint we use at Rev Design Agency to build pages that actually convert." }] },
        ],
      },
      /* ── Section 1: The Hero Section ── */
      {
        heading: "1. The Hero Section (The Hook)",
        intro: "The top of your page is your most valuable real estate. A winning hero section needs:",
        bullets: [
          { bold: "A Bold Headline:", text: 'Focus on the result, not the service. (e.g., Instead of "We do Web Design," use "We grow your revenue through design".)' },
          { bold: "A Clear Sub-headline:", text: "Explain exactly who you help and how." },
          { bold: "A High-Contrast CTA:", text: "A button that stands out visually and tells the user exactly what to do." },
        ],
      },
      /* ── Section 2: The Trust Layer ── */
      {
        heading: "The Trust Layer (Social Proof)",
        intro: "People don't buy services; they buy certainty. To remove the fear of hiring you, we implement a Trust Layer:",
        bullets: [
          { bold: "Client Logos:", text: "Instant recognition of who has trusted you." },
          { bold: "Result-Driven Testimonials:", text: 'Not just "They were great," but "They increased our leads by 20%."' },
          { bold: "Certifications/Awards:", text: "Proof of professional excellence." },
        ],
      },
      /* ── Section 3: The Benefit Section ── */
      {
        heading: "The Benefit Section (The Value)",
        intro: 'Stop listing your features. Your clients don\'t care that you use "Next.js" or "Figma" — they care about their own business.',
        bullets: [
          { bold: 'Feature: "We provide 24/7 support." →', text: 'Benefit: "You never have to worry about your site going down during a big sale."' },
          { bold: 'Feature: "fast load times." →', text: 'Benefit: "Your customers won\'t leave your site out of frustration."' },
        ],
      },
      /* ── Section 4: The Friction Remover ── */
      {
        heading: "The Friction Remover (The FAQ)",
        body: [
          { _type: "block", _key: "faq1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", marks: [], text: "Every user has a reason not to buy. Use a clean FAQ section to answer the objections before they even ask them. This clears the path to the final CTA." }] },
        ],
      },
    ],
    ctaDisplayText: "Stop guessing and start converting. Let us build your high-performance page.",
    ctaButtonText: "Book a Free Strategy Call",
    ctaButtonUrl: "https://calendly.com/youssefhishmat/meeting-with-youssef",
  },
};

/* ─── Main component ──────────────────────────────────────────────── */
export default function BlogPostContent({ post, slug }: { post: BlogPost; slug?: string }) {
  const defaults = (slug && DEFAULTS[slug]) ? DEFAULTS[slug] : {};

  // Strip null / undefined / empty-string values from Sanity so they don't
  // overwrite hardcoded defaults (only real CMS values should win)
  const cleanPost = Object.fromEntries(
    Object.entries(post ?? {}).filter(([, v]) => v != null && v !== "")
  ) as BlogPost;

  const merged: BlogPost = {
    ...defaults,
    ...cleanPost,
    sections: (cleanPost.sections?.length ? cleanPost.sections : (defaults as BlogPost).sections),
  };
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const heroSrc = merged.heroImage?.asset
    ? urlFor(merged.heroImage).width(1400).height(600).fit("crop").crop("focalpoint").auto("format").url()
    : null;

  const ctaText   = merged.ctaDisplayText || "Stop settling for a website that just looks good. Start building one that works.";
  const ctaBtnTxt = merged.ctaButtonText  || "Book Your 30-Minute Strategy Call";
  const ctaBtnUrl = merged.ctaButtonUrl   || "https://calendly.com/youssefhishmat/meeting-with-youssef";

  return (
    <main style={{ background: "#0f0f0f", minHeight: "100vh", paddingTop: isMobile ? 90 : 120 }}>

      {/* Breadcrumb */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginBottom: isMobile ? 24 : 32,
        padding: "0 24px",
      }}>
        <Link href="/#blog" style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 15,
          color: "#b8b8b8",
          textDecoration: "none",
        }}>
          Home
        </Link>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, color: "#6e6e6e" }}>Blog</span>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", padding: `0 ${isMobile ? "24px" : "120px"}`, marginBottom: isMobile ? 16 : 24 }}>
        <h1 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: isMobile ? "clamp(28px,7vw,42px)" : "clamp(40px,4.5vw,64px)",
          fontWeight: 600,
          color: "#f6faeb",
          lineHeight: 1.3,
          margin: "0 auto",
          maxWidth: 860,
        }}>
          {merged.title}
        </h1>
      </div>

      {/* Meta description */}
      {merged.metaDescription && (
        <div style={{ textAlign: "center", padding: `0 ${isMobile ? "24px" : "120px"}`, marginBottom: isMobile ? 32 : 48 }}>
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: isMobile ? 14 : 16,
            fontWeight: 400,
            color: "#6e6e6e",
            lineHeight: 1.6,
            margin: "0 auto",
            maxWidth: 760,
          }}>
            {merged.metaDescription}
          </p>
        </div>
      )}

      {/* Hero image */}
      <div style={{
        margin: `0 ${isMobile ? "20px" : "60px"}`,
        height: isMobile ? 220 : 480,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: isMobile ? 48 : 80,
        background: "#1a1a1a",
      }}>
        {heroSrc && (
          <img
            src={heroSrc}
            alt={merged.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      {/* Content sections */}
      {merged.sections && merged.sections.length > 0 && (
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: `0 ${isMobile ? "24px" : "60px"}`,
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 48 : 72,
          marginBottom: isMobile ? 72 : 120,
        }}>
          {merged.sections!.map((section, i) => (
            <SectionBlock key={i} section={section} isMobile={isMobile} />
          ))}
        </div>
      )}

      {/* Closing CTA */}
      <div style={{
        background: "#0a0a0a",
        padding: isMobile ? "60px 24px" : "100px 60px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}>
        <p style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: isMobile ? "clamp(28px,7vw,40px)" : "clamp(40px,5vw,72px)",
          fontWeight: 600,
          color: "#d9d9d9",
          lineHeight: 1.3,
          maxWidth: 900,
          margin: 0,
        }}>
          {ctaText}
        </p>
        <AnimButton href={ctaBtnUrl} variant="green" target="_blank">
          {ctaBtnTxt}
        </AnimButton>
      </div>

    </main>
  );
}
