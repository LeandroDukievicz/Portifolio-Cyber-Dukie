"use client";

import CyberpunkBackground from "../components/CyberpunkBackground";
import Link from "next/link";

export default function Sobre() {
  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      {/* Janela estilo macOS */}
      <div
        style={{
          position: "fixed",
          top: 48,
          bottom: 186,
          left: "10vw",
          width: "80vw",
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
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
            userSelect: "none",
          }}
        >
          <Link href="/">
            <span title="Fechar"
              style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", cursor: "pointer", flexShrink: 0 }} />
          </Link>
          <span title="Minimizar"
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", flexShrink: 0 }} />
          <span title="Expandir"
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", flexShrink: 0 }} />
          <span style={{
            flex: 1, textAlign: "center", fontSize: 11,
            color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em",
          }}>
            sobre.txt — Leandro Dukievicz
          </span>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "32px 40px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}>
          {/* Conteúdo da página será adicionado aqui */}
        </div>
      </div>
    </main>
  );
}
