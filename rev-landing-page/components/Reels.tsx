"use client";
import { useState } from "react";
import { T_OVERLINE } from "@/lib/type";

const mobileStyles = `
  @media (max-width: 768px) {
    .reels-section {
      padding-top: 40px !important;
    }
    .reels-grid {
      display: flex !important;
      flex-direction: row !important;
      overflow-x: scroll !important;
      scroll-snap-type: x mandatory !important;
      -webkit-overflow-scrolling: touch !important;
      gap: 12px !important;
      padding: 0 24px 16px !important;
      scrollbar-width: none !important;
    }
    .reels-grid::-webkit-scrollbar { display: none; }
    .reel-item {
      flex: 0 0 80vw !important;
      width: 80vw !important;
      scroll-snap-align: center !important;
      padding-bottom: 0 !important;
      height: 70vh !important;
    }
    .reel-item video {
      position: static !important;
      width: 100% !important;
      height: 100% !important;
    }
  }
`;

function getCloudinaryPoster(src: string) {
  // w_600,c_scale resizes the thumbnail — avoids serving 720×1258 for a 330×586 display slot
  return src.replace("/video/upload/", "/video/upload/so_0,q_60,w_600,c_scale/").replace(/\.mp4$/, ".jpg");
}

function ReelItem({ src, priority = false }: { src: string; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const poster = getCloudinaryPoster(src);

  return (
    <div
      className="reel-item"
      style={{ position: "relative", width: "100%", paddingBottom: "177.78%", borderRadius: "16px", overflow: "hidden", background: "#111", cursor: playing ? "default" : "pointer" }}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <video
          src={src}
          poster={poster}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "16px" }}
          autoPlay muted loop playsInline controls preload="none"
        />
      ) : (
        <>
          <img
            src={poster}
            alt="Video thumbnail"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "16px" }}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
          />
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
          }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
              border: "2px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const DEFAULT_REELS = [
  { src: "https://res.cloudinary.com/dguys8br6/video/upload/v1774626774/SnapInsta.to_AQNKoczp5jSdZZRI-SRxhvMmNvlV53taDhzB1nwXonNJ5rKV2demNik2LbprdKNmnVcuaOyq3NlS_qw6-QHEjc09_bprsaf.mp4" },
  { src: "https://res.cloudinary.com/dguys8br6/video/upload/v1774626726/SnapInsta.to_AQPvVU7nPndKHZoQDlM4FHTpQ95MS8xp1BNoDLMm5_4EJs5Zwr6hDXzKleVUjKGSRBQvUZkhOoTa3rwQ1gr2uSIp_nnpaud.mp4" },
  { src: "https://res.cloudinary.com/dguys8br6/video/upload/v1774626722/SnapInsta.to_AQP7rh3KSQACYiIh9vWr3zT5Y5jynPnNCwEMhbU9DkmqQ6MGYiPo7SLNTPD28OWEFLGexjdLyR6wAsfepZo65fne_g7pcib.mp4" },
];

const DEFAULT_INSTAGRAM = [
  { href: "https://www.instagram.com/rev.design.agency/", label: "@rev.design.agency" },
  { href: "https://www.instagram.com/youssef_hishmat_01/", label: "@youssef_hishmat_01" },
];

type ReelsData = {
  label?: string;
  headline?: string;
  videos?: { src: string }[];
  instagramAccounts?: { href: string; label: string }[];
};

export default function Reels({ data }: { data?: ReelsData }) {
  const label = data?.label || "Behind the work";
  const headline = data?.headline || "See how it's made.";
  const videos = data?.videos?.length ? data.videos : DEFAULT_REELS;
  const instagram = data?.instagramAccounts?.length ? data.instagramAccounts : DEFAULT_INSTAGRAM;

  return (
    <section className="reels-section" style={{ background: "#0a0a0a", padding: "100px 0", overflow: "hidden" }}>
      <style>{mobileStyles}</style>
      <div className="container-xl" style={{ marginBottom: "56px", textAlign: "center" }}>
        <p style={{ ...T_OVERLINE, margin: "0 0 10px" }}>
          {label}
        </p>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.01em", color: "#f0f5e8", margin: 0, lineHeight: 1.2 }}>
          {headline}
        </h2>
      </div>

      <div className="container-xl reels-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", alignItems: "start" }}>
        {videos.map((reel, i) => (
          <ReelItem key={i} src={reel.src} priority={i === 0} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "48px", flexWrap: "wrap" }}>
        {instagram.map(({ href, label: lbl }) => (
          <a
            key={lbl}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "#999", textDecoration: "none", border: "1px solid #333", borderRadius: "999px", padding: "10px 24px", transition: "color 0.2s, border-color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#f0f5e8"; e.currentTarget.style.borderColor = "#555"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#999"; e.currentTarget.style.borderColor = "#333"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            {lbl}
          </a>
        ))}
      </div>
    </section>
  );
}
