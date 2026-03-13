"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CyberpunkBackground from "../components/CyberpunkBackground";

export default function Contato() {
  const [isMobile,   setIsMobile]   = useState(false);
  const [minimized,  setMinimized]  = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      <div
        className="window-rise"
        style={{
          position: "fixed",
          top:    fullscreen ? 0 : (isMobile ? "5vh"  : "20vh"),
          bottom: fullscreen ? 0 : (minimized ? undefined : (isMobile ? "5vh" : "20vh")),
          left:   fullscreen ? 0 : (isMobile ? "5vw"  : "20vw"),
          width:  fullscreen ? "100vw" : (isMobile ? "90vw" : "60vw"),
          ...(minimized ? { height: 42 } : {}),
          borderRadius: fullscreen ? 0 : 12,
          overflow: "hidden",
          background: "rgba(3,17,31,0.65)",
          backdropFilter: "blur(12px) saturate(120%)",
          WebkitBackdropFilter: "blur(12px) saturate(120%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,0,255,0.2)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          zIndex: 100,
          transition: "height 0.3s cubic-bezier(0.25,1,0.5,1), top 0.3s ease, left 0.3s ease, width 0.3s ease, border-radius 0.3s ease, bottom 0.3s ease",
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
          <Link href="/">
            <span title="Fechar" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", cursor: "pointer", flexShrink: 0 }} />
          </Link>
          <span
            title={minimized ? "Restaurar" : "Minimizar"}
            onClick={() => setMinimized(v => !v)}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", cursor: "pointer", flexShrink: 0 }}
          />
          <span
            title={fullscreen ? "Restaurar" : "Tela cheia"}
            onClick={() => setFullscreen(v => !v)}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", cursor: "pointer", flexShrink: 0 }}
          />
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            contato.md
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "24px 20px" : "40px 48px" }}>
        </div>

      </div>
    </main>
  );
}
