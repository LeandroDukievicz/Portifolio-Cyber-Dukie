"use client";

import React, { useEffect, useState } from "react";
import CyberpunkBackground from "../components/CyberpunkBackground";
import { useLanguage } from "../context/LanguageContext";
import { buildPageSchema } from "@/lib/schema";

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
