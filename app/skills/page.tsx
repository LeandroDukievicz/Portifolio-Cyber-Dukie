"use client";

import React, { useEffect, useState } from "react";
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
          overflowY: "auto",
          padding: isMobile ? "16px 12px" : "20px 24px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.08) transparent",
          color: "#c8d8e8",
        }}>

          {/* Section label — especializações */}
          <div className="sp-section-line" style={{
            fontSize: 9, letterSpacing: "0.25em", color: "#3a5a6a",
            textTransform: "uppercase", marginBottom: "0.75rem",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            {s.sectionSpecialties}
          </div>

          {/* Row 1 — 4 specialty cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 10,
            marginBottom: "1.75rem",
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
                  border: `1px solid ${accent}22`,
                  borderTop: `2px solid ${accent}`,
                  borderRadius: 8,
                  padding: "1rem",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(12px) saturate(150%)",
                  WebkitBackdropFilter: "blur(12px) saturate(150%)",
                  boxShadow: `0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px ${accent}11`,
                }}
              >
                <div style={{
                  fontFamily: "'Syne', 'JetBrains Mono', sans-serif",
                  fontSize: 12, fontWeight: 700, color: "#e0f0f8", marginBottom: 5,
                }}>
                  {title}
                </div>
                <div style={{ fontSize: 9, color: "#4a7a8a", lineHeight: 1.6, marginBottom: 10 }}>
                  {desc}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {tags.map((label, ti) => (
                    <span key={label} style={{
                      fontSize: 8, padding: "2px 6px", borderRadius: 3,
                      letterSpacing: "0.04em", ...TAG_STYLES[tagColors[ti] ?? "gray"],
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
            gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr",
            gap: 10,
            marginBottom: "1.75rem",
          }}>
            {/* Principles */}
            <div style={{
              background: "linear-gradient(135deg, rgba(10,21,32,0.55) 0%, rgba(78,205,196,0.06) 100%)",
              border: "1px solid rgba(78,205,196,0.15)",
              borderLeft: "3px solid #4ecdc4",
              borderRadius: 8,
              padding: "1rem 1.1rem",
              backdropFilter: "blur(12px) saturate(150%)",
              WebkitBackdropFilter: "blur(12px) saturate(150%)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px rgba(78,205,196,0.07)",
            }}>
              <div className="sp-principles-title" style={{
                fontFamily: "'Syne', 'JetBrains Mono', sans-serif",
                fontSize: 12, fontWeight: 800, color: "#4ecdc4",
                marginBottom: "0.8rem", display: "flex", alignItems: "center",
              }}>
                {s.sectionPrinciples}
              </div>
              <ul style={{
                listStyle: "none", padding: 0, margin: 0,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 7,
              }}>
                {s.principles.map((p, i) => (
                  <li key={i} className="sp-principle-item" style={{
                    fontSize: 9, color: "#6a9a8a",
                    display: "flex", alignItems: "flex-start", gap: 5, lineHeight: 1.5,
                  }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div style={{
              background: "linear-gradient(135deg, rgba(13,21,32,0.55) 0%, rgba(100,120,180,0.06) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 8,
              padding: "1rem",
              backdropFilter: "blur(12px) saturate(150%)",
              WebkitBackdropFilter: "blur(12px) saturate(150%)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
              <div className="sp-section-line" style={{
                fontSize: 9, letterSpacing: "0.25em", color: "#3a5a6a",
                textTransform: "uppercase", marginBottom: "0.75rem",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                {s.sectionStack}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {STACK.map(item => (
                  <span key={item} style={{
                    fontSize: 9, padding: "2px 8px",
                    background: "#0a1218", border: "1px solid #1a2a3a",
                    borderRadius: 3, color: "#5a8a9a", letterSpacing: "0.04em",
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3 — Soft skills */}
          <div className="sp-section-line" style={{
            fontSize: 9, letterSpacing: "0.25em", color: "#3a5a6a",
            textTransform: "uppercase", marginBottom: "0.75rem",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            {s.sectionSoftSkills}
          </div>
          <div style={{
            background: "linear-gradient(135deg, rgba(13,21,32,0.55) 0%, rgba(100,120,180,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 8,
            padding: "0.8rem 1rem",
            backdropFilter: "blur(12px) saturate(150%)",
            WebkitBackdropFilter: "blur(12px) saturate(150%)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            <p style={{ fontSize: 9, color: "#4a6a7a", lineHeight: 1.9, margin: 0 }}>
              {s.softSkillsParagraph.map(({ label, rest }, i) => (
                <React.Fragment key={i}>
                  <strong style={{ color: "#6a9aaa", fontWeight: 400 }}>{label}</strong>{rest}
                </React.Fragment>
              ))}
            </p>
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
