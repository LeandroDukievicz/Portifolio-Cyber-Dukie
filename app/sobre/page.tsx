"use client";

import { useEffect, useState } from "react";
import CyberpunkBackground from "../components/CyberpunkBackground";
import Link from "next/link";
import Image from "next/image";

export default function Sobre() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

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
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(16px)",
          transition: "opacity 0.35s ease, transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
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
          display: "flex",
          overflow: "hidden",
        }}>
          {/* Lado esquerdo — foto */}
          <div style={{
            width: "480px",
            flexShrink: 0,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            boxSizing: "border-box",
          }}>
            <Image
              src="/images/foto-2.png"
              alt="Leandro Dukievicz"
              width={416}
              height={640}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 12,
                clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)",
              }}
              priority
            />
          </div>

          {/* Lado direito — conteúdo */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "32px 40px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.1) transparent",
          }}>
            {/* Conteúdo será adicionado aqui */}
          </div>
        </div>
      </div>
    </main>
  );
}
