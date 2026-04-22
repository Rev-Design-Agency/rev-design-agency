import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      /* ── Security headers on every route ── */
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Strong HSTS (2 years + subdomains + preload)
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Prevent the page from leaking via opener reference
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          // Referrer: send origin only on cross-origin requests
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      /* ── Long-term cache for immutable Next.js static assets ── */
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      /* ── Explicit content-type for OG image so crawlers accept it ── */
      {
        source: "/og-image.png",
        headers: [
          { key: "Content-Type", value: "image/png" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
