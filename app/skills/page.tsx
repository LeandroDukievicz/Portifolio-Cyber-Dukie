"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  SiJavascript, SiTypescript, SiHtml5, SiCss, SiReact, SiNextdotjs,
  SiNodedotjs, SiExpress, SiPhp, SiLaravel, SiTailwindcss,
  SiPostgresql, SiMysql, SiDocker, SiGit,
} from "react-icons/si";
import { TbApi, TbSeo } from "react-icons/tb";
import CyberpunkBackground from "../components/CyberpunkBackground";
import { useLanguage } from "../context/LanguageContext";
import { buildPageSchema } from "@/lib/schema";

const SPECIALTY_ACCENTS = ["#4ecdc4", "#f06292", "#ffb347", "#b39ddb"];
const SPECIALTY_TAG_COLORS = [
  ["cyan", "cyan", "cyan", "cyan", "gray"],
  ["pink", "pink", "pink", "pink", "gray"],
  ["amber", "amber", "gray", "gray"],
  ["purple", "purple", "gray", "gray"],
];

const TAG_STYLES: Record<string, React.CSSProperties> = {
  cyan:   { background: "#0d2a2a", color: "#4ecdc4", border: "1px solid #1a4a4a" },
  pink:   { background: "#2a0d1a", color: "#f06292", border: "1px solid #4a1a2a" },
  amber:  { background: "#2a1a0a", color: "#ffb347", border: "1px solid #4a3a1a" },
  purple: { background: "#1a1a2a", color: "#b39ddb", border: "1px solid #3a2a4a" },
  gray:   { background: "#0f1a22", color: "#6a8a9a", border: "1px solid #1a2a3a" },
};

const STACK = [
  "JavaScript","TypeScript","HTML5","CSS3","React","Next.js",
  "Node.js","Express","PHP","Laravel","Tailwind",
  "PostgreSQL","MySQL","Docker","Git","REST APIs","SEO Web",
];

const STACK_ICONS: Record<string, React.ElementType> = {
  "JavaScript": SiJavascript,
  "TypeScript": SiTypescript,
  "HTML5":      SiHtml5,
  "CSS3":       SiCss,
  "React":      SiReact,
  "Next.js":    SiNextdotjs,
  "Node.js":    SiNodedotjs,
  "Express":    SiExpress,
  "PHP":        SiPhp,
  "Laravel":    SiLaravel,
  "Tailwind":   SiTailwindcss,
  "PostgreSQL": SiPostgresql,
  "MySQL":      SiMysql,
  "Docker":     SiDocker,
  "Git":        SiGit,
  "REST APIs":  TbApi,
  "SEO Web":    TbSeo,
};

const RING_CONFIG = [
  { startIdx: 0,  count: 6, rxF: 0.32, ryF: 0.28, speed: 0.22 },
  { startIdx: 6,  count: 6, rxF: 0.52, ryF: 0.40, speed: 0.15 },
  { startIdx: 12, count: 5, rxF: 0.72, ryF: 0.50, speed: 0.10 },
];

const BADGE_CFG = STACK.map((_, i) => {
  const ring = i < 6 ? 0 : i < 12 ? 1 : 2;
  const cfg = RING_CONFIG[ring];
  const idxInRing = i - cfg.startIdx;
  return { ring, startAngle: (idxInRing / cfg.count) * 2 * Math.PI, speed: cfg.speed };
});

export default function Skills() {
  const { t } = useLanguage();
  const s = t.skills;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const stackCardRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgLineRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const angles = BADGE_CFG.map(b => b.startAngle);
    const RING_SCALE = [0.38, 0.66, 1.0];
    let rafId: number;
    const update = () => {
      const card = stackCardRef.current;
      if (!card) { rafId = requestAnimationFrame(update); return; }
      const { width, height } = card.getBoundingClientRect();
      const cx = width / 2;
      const cy = height / 2;
      // Safe max radius: leave room for badge circle (30px diameter → 18px margin)
      const maxRx = Math.max(20, cx - 18);
      const maxRy = Math.max(10, cy - 18);
      BADGE_CFG.forEach((cfg, i) => {
        angles[i] += (cfg.speed * Math.PI) / 180;
        const scale = RING_SCALE[cfg.ring];
        const x = cx + maxRx * scale * Math.cos(angles[i]);
        const y = cy + maxRy * scale * Math.sin(angles[i]);
        const badge = badgeRefs.current[i];
        if (badge) { badge.style.left = `${x}px`; badge.style.top = `${y}px`; }
        const line = svgLineRefs.current[i];
        if (line) {
          line.setAttribute("x1", String(cx)); line.setAttribute("y1", String(cy));
          line.setAttribute("x2", String(x));  line.setAttribute("y2", String(y));
        }
      });
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="main-content" className="w-full h-screen overflow-hidden relative">
      <CyberpunkBackground />

      <style>{`
        .sp-card-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .sp-principle-item::before {
          content: '→';
          color: #4ecdc4;
          flex-shrink: 0;
        }
        .sp-section-line::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #1a2a3a;
        }
        .sp-principles-title::before {
          content: '//';
          color: #2a5a4a;
          font-weight: 400;
          margin-right: 6px;
        }

        @keyframes sp-badge-pulse-0 {
          0%, 100% { box-shadow: 0 0 4px rgba(78,205,196,0.4);  opacity: 0.85; }
          50%       { box-shadow: 0 0 10px rgba(78,205,196,0.4); opacity: 1; }
        }
        @keyframes sp-badge-pulse-1 {
          0%, 100% { box-shadow: 0 0 4px rgba(240,98,146,0.35);  opacity: 0.85; }
          50%       { box-shadow: 0 0 10px rgba(240,98,146,0.35); opacity: 1; }
        }
        @keyframes sp-badge-pulse-2 {
          0%, 100% { box-shadow: 0 0 4px rgba(255,179,71,0.3);  opacity: 0.85; }
          50%       { box-shadow: 0 0 10px rgba(255,179,71,0.3); opacity: 1; }
        }
        .sp-orbit-badge-0 { animation: sp-badge-pulse-0 2.8s ease-in-out infinite; }
        .sp-orbit-badge-1 { animation: sp-badge-pulse-1 2.8s ease-in-out infinite; }
        .sp-orbit-badge-2 { animation: sp-badge-pulse-2 2.8s ease-in-out infinite; }
        .sp-orbit-badge-0:nth-child(odd),
        .sp-orbit-badge-1:nth-child(odd),
        .sp-orbit-badge-2:nth-child(odd) { animation-delay: -1.4s; }
        @keyframes sp-center-pulse {
          0%, 100% { text-shadow: 0 0 6px rgba(78,205,196,0.25), 0 0 14px rgba(78,205,196,0.1); }
          50%       { text-shadow: 0 0 10px rgba(78,205,196,0.4), 0 0 22px rgba(78,205,196,0.18); }
        }
        .sp-orbit-center { animation: sp-center-pulse 3s ease-in-out infinite; }
      `}</style>

      <div
        className="window-rise"
        style={{
          position: "fixed",
          top: isMobile ? 36 : 48,
          bottom: isMobile ? 8 : 151,
          left: isMobile ? 62 : "7.5vw",
          width: isMobile ? "calc(100vw - 70px)" : "85vw",
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(3,17,31,0.65)",
          backdropFilter: "blur(12px) saturate(120%)",
          WebkitBackdropFilter: "blur(12px) saturate(120%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,0,255,0.2)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          zIndex: 100,
        }}
      >
        {/* Title bar */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 8,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0, userSelect: "none",
        }}>
          <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", flexShrink: 0 }} />
          <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", flexShrink: 0 }} />
          <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            {s.windowTitle}
          </span>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: isMobile ? "10px 10px" : "12px 16px",
          color: "#c8d8e8",
          overflow: "hidden",
        }}>

          {/* Section label — especializações */}
          <div className="sp-section-line" style={{
            fontSize: 9, letterSpacing: "0.25em", color: "#3a5a6a",
            textTransform: "uppercase", flexShrink: 0,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            {s.sectionSpecialties}
          </div>

          {/* Row 1 — 4 specialty cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 8,
            flexShrink: 0,
          }}>
            {s.specialties.map(({ badge, title, desc, tags }, si) => {
              const accent = SPECIALTY_ACCENTS[si];
              const tagColors = SPECIALTY_TAG_COLORS[si];
              const rgbMap: Record<string, string> = {
                "#4ecdc4": "78,205,196",
                "#f06292": "240,98,146",
                "#ffb347": "255,179,71",
                "#b39ddb": "179,157,219",
              };
              return (
              <div
                key={title}
                className="sp-card-bar"
                style={{
                  background: `linear-gradient(135deg, rgba(13,21,32,0.55) 0%, rgba(${rgbMap[accent]},0.08) 100%)`,
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8,
                  padding: "1.05rem 1.3rem",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  backdropFilter: "blur(12px) saturate(150%)",
                  WebkitBackdropFilter: "blur(12px) saturate(150%)",
                  boxShadow: `0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px ${accent}11`,
                }}
              >
                <div style={{
                  fontFamily: "'Syne', 'JetBrains Mono', sans-serif",
                  fontSize: 18, fontWeight: 700, color: "#e0f0f8", marginBottom: 8,
                  flexShrink: 0,
                }}>
                  {title}
                </div>
                <div style={{ fontSize: 14, color: "#4a7a8a", lineHeight: 1.55, marginBottom: 13, flex: 1 }}>
                  {desc}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, flexShrink: 0 }}>
                  {tags.map((label, ti) => (
                    <span key={label} style={{
                      fontSize: 13, padding: "3px 9px", borderRadius: 3,
                      letterSpacing: "0.04em",
                      background: "#0d1e2a", color: "#4ecdc4", border: "1px solid rgba(78,205,196,0.2)",
                    }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              );
            })}
          </div>

          {/* Row 2 — Principles + Stack */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 8,
            flex: 1,
            minHeight: 0,
          }}>
            {/* Principles */}
            <div style={{
              background: "linear-gradient(135deg, rgba(10,21,32,0.55) 0%, rgba(78,205,196,0.06) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 8,
              padding: "0.8rem 1rem",
              backdropFilter: "blur(12px) saturate(150%)",
              WebkitBackdropFilter: "blur(12px) saturate(150%)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px rgba(78,205,196,0.07)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}>
              <div className="sp-principles-title" style={{
                fontFamily: "'Syne', 'JetBrains Mono', sans-serif",
                fontSize: 14, fontWeight: 800, color: "#4ecdc4",
                marginBottom: "0.6rem", display: "flex", alignItems: "center", flexShrink: 0,
              }}>
                {s.sectionPrinciples}
              </div>
              <ul style={{
                listStyle: "none", padding: 0, margin: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}>
                {s.principles.map((p, i) => (
                  <li key={i} className="sp-principle-item" style={{
                    fontSize: 11, color: "#4ecdc4",
                    display: "flex", alignItems: "flex-start", gap: 5, lineHeight: 1.45,
                  }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack — orbital */}
            <div
              ref={stackCardRef}
              style={{
                background: "linear-gradient(135deg, rgba(13,21,32,0.55) 0%, rgba(78,205,196,0.04) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
                backdropFilter: "blur(12px) saturate(150%)",
                WebkitBackdropFilter: "blur(12px) saturate(150%)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* SVG connecting lines */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}>
                <defs>
                  <radialGradient id="lineGrad0" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4ecdc4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#4ecdc4" stopOpacity="0.05" />
                  </radialGradient>
                  <radialGradient id="lineGrad1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f06292" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f06292" stopOpacity="0.04" />
                  </radialGradient>
                  <radialGradient id="lineGrad2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffb347" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ffb347" stopOpacity="0.04" />
                  </radialGradient>
                </defs>
                {STACK.map((_, i) => {
                  const ring = i < 6 ? 0 : i < 12 ? 1 : 2;
                  const strokeColors = ["rgba(78,205,196,0.3)", "rgba(240,98,146,0.22)", "rgba(255,179,71,0.18)"];
                  return (
                    <line
                      key={i}
                      ref={el => { svgLineRefs.current[i] = el; }}
                      x1="50%" y1="50%" x2="50%" y2="50%"
                      stroke={strokeColors[ring]}
                      strokeWidth="0.7"
                      strokeDasharray="2 3"
                    />
                  );
                })}
              </svg>

              {/* Center label */}
              <div className="sp-orbit-center" style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3,
                textAlign: "center",
                fontFamily: "'Syne', 'JetBrains Mono', sans-serif",
                fontSize: 7, fontWeight: 800, color: "#4ecdc4",
                letterSpacing: "0.08em", textTransform: "uppercase",
                background: "rgba(3,12,22,0.9)",
                width: 43, height: 43,
                padding: 2,
                borderRadius: "50%",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(78,205,196,0.2)",
                pointerEvents: "none",
                lineHeight: 1.35,
              }}>
                <div>stack</div>
                <div>completa</div>
              </div>

              {/* Orbital badges */}
              {STACK.map((item, i) => {
                const ring = i < 6 ? 0 : i < 12 ? 1 : 2;
                const ringStyles = [
                  { bg: "rgba(8,28,28,0.92)",  color: "#4ecdc4", border: "1px solid rgba(78,205,196,0.45)" },
                  { bg: "rgba(28,8,18,0.92)",  color: "#f06292", border: "1px solid rgba(240,98,146,0.4)"  },
                  { bg: "rgba(28,18,6,0.92)",  color: "#ffb347", border: "1px solid rgba(255,179,71,0.38)" },
                ];
                const rs = ringStyles[ring];
                const Icon = STACK_ICONS[item];
                return (
                  <div
                    key={item}
                    ref={el => { badgeRefs.current[i] = el; }}
                    className={`sp-orbit-badge-${ring}`}
                    title={item}
                    style={{
                      position: "absolute",
                      left: "50%", top: "50%",
                      transform: "translate(-50%, -50%)",
                      background: rs.bg,
                      border: rs.border,
                      borderRadius: "50%",
                      width: 30, height: 30,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: rs.color,
                      zIndex: 2,
                      pointerEvents: "none",
                    }}
                  >
                    {Icon && <Icon size={18} />}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPageSchema({
            type: "WebPage",
            name: "Skills — Leandro Dukiévicz",
            description: "Habilidades técnicas e comportamentais de Leandro Dukiévicz: JavaScript, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, MySQL, Tailwind CSS, Git, Docker e REST APIs.",
            url: "https://devleandro.com.br/skills",
          }))
        }}
      />
    </main>
  );
}
