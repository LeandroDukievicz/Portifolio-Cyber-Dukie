"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CyberpunkBackground from "../components/CyberpunkBackground";

const CONTACTS = [
  {
    name: "WhatsApp",
    image: "/images/whatsapp.webp",
    href: "https://wa.me/SEU_NUMERO",
    color: "#25D366",
    label: "+55 (44) 9 0000-0000",
  },
  {
    name: "Telegram",
    image: "/images/telegram.webp",
    href: "https://t.me/SEU_USUARIO",
    color: "#2AABEE",
    label: "@SEU_USUARIO",
  },
  {
    name: "LinkedIn",
    image: "/images/linkedin.webp",
    href: "https://linkedin.com/in/SEU_PERFIL",
    color: "#0A66C2",
    label: "linkedin.com/in/SEU_PERFIL",
  },
  {
    name: "GitHub",
    image: "/images/github.webp",
    href: "https://github.com/SEU_USUARIO",
    color: "#ffffff",
    label: "github.com/SEU_USUARIO",
  },
  {
    name: "Gmail",
    image: "/images/gmail.webp",
    href: "mailto:SEU@gmail.com",
    color: "#EA4335",
    label: "SEU@gmail.com",
  },
  {
    name: "Apple Mail",
    image: "/images/mail-apple.webp",
    href: "mailto:SEU@icloud.com",
    color: "#1a8cff",
    label: "SEU@icloud.com",
  },
];

export default function Contato() {
  const [isMobile,   setIsMobile]   = useState(false);
  const [minimized,  setMinimized]  = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [hovered,    setHovered]    = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      <style>{`
        @keyframes contact-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="window-rise"
        style={{
          position: "fixed",
          top:    fullscreen ? 0 : (isMobile ? "5vh"  : "calc(20vh - 100px)"),
          bottom: fullscreen ? 0 : (minimized ? undefined : (isMobile ? "5vh" : "calc(20vh + 100px)")),
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
        <div style={{ flex: 1, display: "flex", flexDirection: "row", overflow: "hidden" }}>

          {/* Coluna lateral esquerda — ícones 2x3 */}
          <div style={{
            width: "40%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignContent: "center",
            justifyItems: "center",
            gap: isMobile ? 21 : 36,
            padding: "24px",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}>
            {CONTACTS.map(({ name, image, href, color }, i) => (
              <div
                key={name}
                style={{
                  opacity: 0,
                  animation: "contact-in 0.35s ease forwards",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={name}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "flex",
                    transform: hovered === i ? "scale(1.1)" : "scale(1)",
                    filter: hovered === i ? `drop-shadow(0 0 10px ${color}99)` : "none",
                    transition: "transform 0.25s ease, filter 0.25s ease",
                  }}
                >
                  <Image
                    src={image}
                    alt={name}
                    width={50}
                    height={50}
                    style={{ borderRadius: 10 }}
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Área direita — conteúdo futuro */}
          <div style={{ flex: 1 }} />

        </div>

      </div>
    </main>
  );
}
