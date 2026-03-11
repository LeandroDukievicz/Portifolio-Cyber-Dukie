"use client";

import { useEffect, useState, useRef } from "react";
import CyberpunkBackground from "../components/CyberpunkBackground";
import Link from "next/link";
import Image from "next/image";

const POLY_NORM: [number, number][] = [[0,0],[0.75,0],[1,0.5],[0.75,1],[0,1]];

function pointInPoly(px: number, py: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}

export default function Sobre() {
  const [visible, setVisible]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const W = canvas.width;
    const H = canvas.height;

    // Gera pontos dentro do pentágono
    interface Pt { x: number; y: number; ox: number; oy: number; phase: number; speed: number; }
    const pts: Pt[] = [];
    while (pts.length < 90) {
      const nx = Math.random();
      const ny = Math.random();
      if (pointInPoly(nx, ny, POLY_NORM)) {
        pts.push({ x: nx * W, y: ny * H, ox: nx * W, oy: ny * H, phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 0.6 });
      }
    }

    const LINK_DIST = Math.min(W, H) * 0.22;
    const MOUSE_R   = 110;
    let t = 0;
    let raf: number;

    const tick = () => {
      t += 0.012;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Atualiza posições
      for (const p of pts) {
        const fx = Math.sin(t * p.speed + p.phase) * 3.5;
        const fy = Math.cos(t * p.speed * 0.7 + p.phase + 1) * 3.5;
        const dx = p.ox + fx - mx;
        const dy = p.oy + fy - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_R) {
          const force = (MOUSE_R - d) / MOUSE_R;
          p.x = p.ox + fx + (dx / (d || 1)) * force * 28;
          p.y = p.oy + fy + (dy / (d || 1)) * force * 28;
        } else {
          p.x = p.ox + fx;
          p.y = p.oy + fy;
        }
      }

      // Linhas
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,234,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Pontos
      for (const p of pts) {
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const d    = Math.sqrt(dx * dx + dy * dy);
        const glow = d < MOUSE_R ? 1 - d / MOUSE_R : 0;

        // Halo
        if (glow > 0.05) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5 + glow * 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(189,0,255,${glow * 0.18})`;
          ctx.fill();
        }

        // Ponto
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = glow > 0
          ? `rgba(189,0,255,${0.75 + glow * 0.25})`
          : `rgba(0,234,255,0.75)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

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
        <div style={{ flex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden" }}>

          {/* Lado esquerdo — foto + constelação */}
          <div
            style={{
              width: isMobile ? "100%" : "480px",
              height: isMobile ? "260px" : "auto",
              flexShrink: 0,
              borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.07)",
              borderBottom: isMobile ? "1px solid rgba(255,255,255,0.07)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "12px" : "24px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
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
              {/* Constelação */}
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Lado direito — conteúdo */}
          <div style={{
            flex: 1,
            overflowY: "auto",
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
