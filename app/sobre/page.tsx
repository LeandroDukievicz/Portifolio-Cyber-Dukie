"use client";

import { useEffect, useState, useRef } from "react";
import CyberpunkBackground from "../components/CyberpunkBackground";
import Link from "next/link";
import Image from "next/image";

const CLIP = "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)";

function HoloPhoto() {
  const tiltRef    = useRef<HTMLDivElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const sweepRef   = useRef<HTMLDivElement>(null);
  const glitch1Ref = useRef<HTMLDivElement>(null);
  const glitch2Ref = useRef<HTMLDivElement>(null);
  const target     = useRef({ x: 0, y: 0 });
  const current    = useRef({ x: 0, y: 0 });

  // Smooth tilt via lerp
  useEffect(() => {
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.06);
      current.current.y = lerp(current.current.y, target.current.y, 0.06);
      if (tiltRef.current) {
        tiltRef.current.style.transform =
          `rotateX(${current.current.x.toFixed(2)}deg) rotateY(${current.current.y.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Occasional glitch burst
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const doGlitch = () => {
      const g1 = glitch1Ref.current;
      const g2 = glitch2Ref.current;
      const ph = photoRef.current;
      if (!g1 || !g2 || !ph) return;

      const ox = (Math.random() - 0.5) * 14;
      const oy = (Math.random() - 0.5) * 4;

      g1.style.transform = `translate(${ox}px, ${oy}px)`;
      g2.style.transform = `translate(${-ox * 0.6}px, ${oy * 0.4}px)`;
      g1.style.opacity   = "1";
      g2.style.opacity   = "1";
      ph.style.transform = `translateX(${ox * 0.3}px)`;

      const dur = 60 + Math.random() * 120;
      setTimeout(() => {
        g1.style.opacity   = "0";
        g2.style.opacity   = "0";
        ph.style.transform = "translateX(0)";
      }, dur);

      // double-flicker
      if (Math.random() > 0.5) {
        setTimeout(() => {
          g1.style.opacity = "0.6";
          g2.style.opacity = "0.6";
        }, dur + 40);
        setTimeout(() => {
          g1.style.opacity = "0";
          g2.style.opacity = "0";
        }, dur + 100);
      }

      timeout = setTimeout(doGlitch, 2800 + Math.random() * 5000);
    };
    timeout = setTimeout(doGlitch, 1800 + Math.random() * 2500);
    return () => clearTimeout(timeout);
  }, []);

  // Sweep scan
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const doSweep = () => {
      const s = sweepRef.current;
      if (!s) return;
      s.style.transition = "none";
      s.style.top        = "-6%";
      s.style.opacity    = "0.8";
      requestAnimationFrame(() => {
        s.style.transition = "top 1.8s linear, opacity 0.3s ease";
        s.style.top        = "106%";
        setTimeout(() => { if (s) s.style.opacity = "0"; }, 1600);
      });
      timeout = setTimeout(doSweep, 4000 + Math.random() * 4000);
    };
    timeout = setTimeout(doSweep, 1200);
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    target.current = {
      x: ((e.clientY - r.top)  / r.height - 0.5) * -14,
      y: ((e.clientX - r.left) / r.width  - 0.5) *  14,
    };
  };
  const handleMouseLeave = () => { target.current = { x: 0, y: 0 }; };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", perspective: "900px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D tilt container */}
      <div
        ref={tiltRef}
        style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
      >
        {/* Photo group — jitter target */}
        <div ref={photoRef} style={{ position: "absolute", inset: 0, transition: "transform 0.05s" }}>

          {/* Base image */}
          <Image
            src="/images/foto-sobre.webp"
            alt="Leandro Dukievicz"
            width={416}
            height={640}
            style={{
              width: "100%", height: "100%",
              objectFit: "contain",
              clipPath: CLIP,
              maskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
            }}
            priority
          />

          {/* Scanlines */}
          <div className="holo-scanlines" style={{ position: "absolute", inset: 0, clipPath: CLIP, pointerEvents: "none" }} />

          {/* Holographic color tint */}
          <div style={{
            position: "absolute", inset: 0, clipPath: CLIP, pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(0,234,255,0.07) 0%, rgba(189,0,255,0.06) 50%, rgba(0,234,255,0.09) 100%)",
            animation: "holo-shimmer 4s ease-in-out infinite",
          }} />

          {/* Sweep scan line */}
          <div ref={sweepRef} style={{
            position: "absolute", left: 0, right: 0, height: "6%",
            clipPath: CLIP, pointerEvents: "none", opacity: 0,
            background: "linear-gradient(180deg, transparent 0%, rgba(0,234,255,0.35) 50%, transparent 100%)",
          }} />

          {/* Glitch layer 1 — cyan */}
          <div ref={glitch1Ref} style={{
            position: "absolute", inset: 0, clipPath: CLIP, pointerEvents: "none",
            opacity: 0, mixBlendMode: "screen",
            background: "rgba(0,234,255,0.22)",
            transition: "opacity 0.03s",
          }} />

          {/* Glitch layer 2 — magenta */}
          <div ref={glitch2Ref} style={{
            position: "absolute", inset: 0, clipPath: CLIP, pointerEvents: "none",
            opacity: 0, mixBlendMode: "screen",
            background: "rgba(255,0,255,0.18)",
            transition: "opacity 0.03s",
          }} />
        </div>

      </div>
    </div>
  );
}

export default function Sobre() {
  const [visible, setVisible]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      {/* Janela estilo macOS */}
      <div
        style={{
          position: "fixed",
          top: 48,
          bottom: isMobile ? 70 : 186,
          left: isMobile ? "2vw" : "10vw",
          width: isMobile ? "96vw" : "80vw",
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
          <span title="Minimizar" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", flexShrink: 0 }} />
          <span title="Expandir"  style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            sobre.txt — Leandro Dukievicz
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden" }}>

          {/* Lado esquerdo — foto holográfica */}
          <div style={{
            width: isMobile ? "100%" : "480px",
            height: isMobile ? "280px" : "auto",
            flexShrink: 0,
            borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.07)",
            borderBottom: isMobile ? "1px solid rgba(255,255,255,0.07)" : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "16px" : "28px",
            boxSizing: "border-box",
            background: "rgba(0,10,20,0.3)",
          }}>
            <HoloPhoto />
          </div>

          {/* Lado direito — conteúdo */}
          <div style={{
            flex: 1, overflowY: "auto",
            padding: isMobile ? "16px 20px" : "32px 40px",
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
