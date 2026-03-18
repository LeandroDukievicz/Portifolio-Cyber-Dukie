"use client";

import Link from "next/link";
import CyberpunkBackground from "./components/CyberpunkBackground";

export default function NotFound() {
  return (
    <main className="w-full h-screen overflow-hidden relative flex items-center justify-center">
      <CyberpunkBackground />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#FF2D78", margin: 0 }}>
          erro 404
        </p>
        <h1
          style={{
            fontSize: "clamp(4rem, 15vw, 9rem)",
            fontWeight: 900,
            margin: 0,
            lineHeight: 1,
            background: "linear-gradient(90deg, #00EAFF, #BD00FF, #FF2D78)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", margin: 0, letterSpacing: "0.05em" }}>
          Página não encontrada
        </p>
        <Link
          href="/"
          style={{
            marginTop: 8,
            padding: "10px 28px",
            borderRadius: 8,
            border: "1px solid rgba(0,234,255,0.4)",
            color: "#00EAFF",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            background: "rgba(0,234,255,0.06)",
            backdropFilter: "blur(12px)",
            transition: "background 0.2s ease, border-color 0.2s ease",
          }}
        >
          ← voltar para home
        </Link>
      </div>
    </main>
  );
}
