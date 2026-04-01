"use client";

import React, { useEffect, useState } from "react";
import CyberpunkBackground from "../components/CyberpunkBackground";
import { useLanguage } from "../context/LanguageContext";
import { buildPageSchema } from "@/lib/schema";

const SPECIALTIES = [
  {
    accent: "#4ecdc4",
    badge: "4+ anos",
    title: "Frontend & UI Performance",
    desc: "SPAs, SSR/SSG, design systems e Web Vitals em produção.",
    tags: [
      { label: "React",      color: "cyan" },
      { label: "Next.js",    color: "cyan" },
      { label: "TypeScript", color: "cyan" },
      { label: "Tailwind",   color: "cyan" },
      { label: "Web Vitals", color: "gray" },
    ],
  },
  {
    accent: "#f06292",
    badge: "3+ anos",
    title: "Backend & APIs",
    desc: "APIs REST, arquitetura MVC, autenticação e integrações.",
    tags: [
      { label: "PHP",     color: "pink" },
      { label: "Laravel", color: "pink" },
      { label: "Node.js", color: "pink" },
      { label: "Express", color: "pink" },
      { label: "JWT/Auth",color: "gray" },
    ],
  },
  {
    accent: "#ffb347",
    badge: "2+ anos",
    title: "Banco de Dados",
    desc: "Modelagem relacional, queries otimizadas e migrações.",
    tags: [
      { label: "PostgreSQL", color: "amber" },
      { label: "MySQL",      color: "amber" },
      { label: "Eloquent",   color: "gray" },
      { label: "SQL tuning", color: "gray" },
    ],
  },
  {
    accent: "#b39ddb",
    badge: "em evolução",
    title: "DevOps & Tooling",
    desc: "Containerização, CI/CD, versionamento e automação.",
    tags: [
      { label: "Docker",         color: "purple" },
      { label: "Git",            color: "purple" },
      { label: "GitHub Actions", color: "gray" },
      { label: "pnpm",           color: "gray" },
    ],
  },
];

const TAG_STYLES: Record<string, React.CSSProperties> = {
  cyan:   { background: "#0d2a2a", color: "#4ecdc4", border: "1px solid #1a4a4a" },
  pink:   { background: "#2a0d1a", color: "#f06292", border: "1px solid #4a1a2a" },
  amber:  { background: "#2a1a0a", color: "#ffb347", border: "1px solid #4a3a1a" },
  purple: { background: "#1a1a2a", color: "#b39ddb", border: "1px solid #3a2a4a" },
  gray:   { background: "#0f1a22", color: "#6a8a9a", border: "1px solid #1a2a3a" },
};

const PRINCIPLES = [
  "Componentes com responsabilidade única e interfaces explícitas",
  "Performance como requisito, não otimização tardia",
  "Nomear pelo que faz, não pelo que é",
  "Code review como transferência de conhecimento",
  "Abstrações só quando o padrão se repete 3+ vezes",
  "Documentar decisões de arquitetura, não o óbvio",
];

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
            especializações
          </div>

          {/* Row 1 — 4 specialty cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 10,
            marginBottom: "1.75rem",
          }}>
            {SPECIALTIES.map(({ accent, badge, title, desc, tags }) => (
              <div
                key={title}
                className="sp-card-bar"
                style={{
                  background: `linear-gradient(135deg, rgba(13,21,32,0.55) 0%, rgba(${accent === "#4ecdc4" ? "78,205,196" : accent === "#f06292" ? "240,98,146" : accent === "#ffb347" ? "255,179,71" : "179,157,219"},0.08) 100%)`,
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
                  {tags.map(({ label, color }) => (
                    <span key={label} style={{
                      fontSize: 8, padding: "2px 6px", borderRadius: 3,
                      letterSpacing: "0.04em", ...TAG_STYLES[color],
                    }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
                princípios de engenharia
              </div>
              <ul style={{
                listStyle: "none", padding: 0, margin: 0,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 7,
              }}>
                {PRINCIPLES.map((p, i) => (
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
                stack completa
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
            soft skills
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
              <strong style={{ color: "#6a9aaa", fontWeight: 400 }}>Resolução de problemas</strong> com foco em tradeoffs reais —{" "}
              <strong style={{ color: "#6a9aaa", fontWeight: 400 }}>comunicação clara</strong> com times técnicos e não-técnicos —{" "}
              <strong style={{ color: "#6a9aaa", fontWeight: 400 }}>aprendizado contínuo</strong> aplicado diretamente em projetos —{" "}
              <strong style={{ color: "#6a9aaa", fontWeight: 400 }}>atenção a detalhes</strong> tanto em código quanto em UX —{" "}
              <strong style={{ color: "#6a9aaa", fontWeight: 400 }}>adaptabilidade</strong> em contextos ágeis com requisitos em mudança.
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
