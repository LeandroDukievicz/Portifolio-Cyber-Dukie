"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import CyberpunkBackground from "../components/CyberpunkBackground";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image?: string;
  href?: string;
};

const PROJECTS: (Project | null)[] = [
  {
    title: "Electrum",
    subtitle: "Cibersegurança",
    description: "Plataforma de análise e monitoramento de segurança com dashboards em tempo real e detecção de ameaças.",
    tags: ["Next.js", "TypeScript", "Security"],
    image: "/images/projetos/projeto-electrum.webp",
  },
  null,
  null,
  null,
  null,
  null,
];

const TOTAL_CARDS = PROJECTS.length;
const TRANSITION = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const AUTO_INTERVAL = 3000;

function getCardStyle(offset: number, isMobile: boolean): React.CSSProperties {
  const x    = isMobile ? 183 : 309;
  const xFar = isMobile ? 365 : 604;

  if (offset === 0) {
    return { transform: "translateX(0) scale(1.1) translateZ(0)", zIndex: 10, opacity: 1, pointerEvents: "auto" };
  } else if (offset === 1) {
    return { transform: `translateX(${x}px) scale(0.9) translateZ(-100px)`, zIndex: 5, opacity: 0.85, pointerEvents: "auto" };
  } else if (offset === 2) {
    return { transform: `translateX(${xFar}px) scale(0.8) translateZ(-300px)`, zIndex: 1, opacity: 0.6, pointerEvents: "auto" };
  } else if (offset === TOTAL_CARDS - 1) {
    return { transform: `translateX(-${x}px) scale(0.9) translateZ(-100px)`, zIndex: 5, opacity: 0.85, pointerEvents: "auto" };
  } else if (offset === TOTAL_CARDS - 2) {
    return { transform: `translateX(-${xFar}px) scale(0.8) translateZ(-300px)`, zIndex: 1, opacity: 0.6, pointerEvents: "auto" };
  } else {
    return { opacity: 0, pointerEvents: "none", zIndex: 0 };
  }
}

export default function Projetos() {
  const [current, setCurrent]   = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused]     = useState(false);
  const animating               = useRef(false);
  const currentRef              = useRef(current);
  currentRef.current            = current;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = useCallback((next: number) => {
    if (animating.current) return;
    animating.current = true;
    setCurrent(((next % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS);
    setTimeout(() => { animating.current = false; }, 800);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(currentRef.current + 1), AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, go]);

  // Teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  go(currentRef.current - 1);
      if (e.key === "ArrowRight") go(currentRef.current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Touch / swipe
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.changedTouches[0].screenX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) go(currentRef.current + (diff > 0 ? 1 : -1));
  };

  // Drag com mouse
  const dragStartX  = useRef<number | null>(null);
  const isDragging  = useRef(false);
  const [grabbing, setGrabbing] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
    setGrabbing(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) isDragging.current = true;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 50) go(currentRef.current + (diff > 0 ? 1 : -1));
    dragStartX.current = null;
    isDragging.current = false;
    setGrabbing(false);
  };

  const onMouseLeaveTrack = () => {
    dragStartX.current = null;
    isDragging.current = false;
    setGrabbing(false);
    setPaused(false);
  };

  return (
    <main
      className="w-screen h-screen overflow-hidden relative"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <CyberpunkBackground />

      <style>{`
        @keyframes dot-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50,
        gap: 32,
      }}>

        {/* Track */}
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            height: isMobile ? 393 : 590,
            position: "relative",
            perspective: "1000px",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={onMouseLeaveTrack}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          <div style={{
            width: "100%", height: "100%",
            display: "flex", justifyContent: "center", alignItems: "center",
            position: "relative",
            transformStyle: "preserve-3d",
          }}>
            {PROJECTS.map((project, i) => {
              const offset   = ((i - current) % TOTAL_CARDS + TOTAL_CARDS) % TOTAL_CARDS;
              const isCenter = offset === 0;
              const cardW    = isMobile ? 253 : 393;
              const cardH    = isMobile ? 337 : 534;
              return (
                <div
                  key={i}
                  onClick={() => { if (!isDragging.current) go(i); }}
                  style={{
                    position: "absolute",
                    width: cardW,
                    height: cardH,
                    borderRadius: 20,
                    background: isCenter ? "rgba(0,234,255,0.05)" : "rgba(3,17,31,0.6)",
                    border: isCenter ? "1px solid rgba(0,234,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: isCenter
                      ? "0 0 40px rgba(0,234,255,0.12), 0 24px 60px rgba(0,0,0,0.5)"
                      : "0 16px 40px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    cursor: grabbing ? "grabbing" : "grab",
                    userSelect: "none",
                    transition: TRANSITION,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    ...getCardStyle(offset, isMobile),
                  }}
                >
                  {project ? (
                    <>
                      {/* Imagem */}
                      {project.image && (
                        <div style={{ position: "relative", width: "100%", height: isMobile ? 140 : 210, flexShrink: 0 }}>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: "cover" }}
                            draggable={false}
                          />
                          <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to bottom, transparent 60%, rgba(3,17,31,0.95))",
                          }} />
                        </div>
                      )}

                      {/* Info */}
                      <div style={{
                        flex: 1, display: "flex", flexDirection: "column",
                        padding: isMobile ? "14px 16px" : "20px 24px",
                        gap: 10,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      }}>
                        <span style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,234,255,0.6)" }}>
                          {project.subtitle}
                        </span>
                        <h2 style={{ margin: 0, fontSize: isMobile ? "1rem" : "1.2rem", fontWeight: 700, color: "#fff", letterSpacing: "0.03em" }}>
                          {project.title}
                        </h2>
                        <p style={{ margin: 0, fontSize: isMobile ? "0.7rem" : "0.78rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, flex: 1 }}>
                          {project.description}
                        </p>
                        {/* Tags */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {project.tags.map(tag => (
                            <span key={tag} style={{
                              fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
                              padding: "3px 8px", borderRadius: 4,
                              background: "rgba(0,234,255,0.08)",
                              border: "1px solid rgba(0,234,255,0.2)",
                              color: "rgba(0,234,255,0.7)",
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {Array.from({ length: TOTAL_CARDS }).map((_, i) => {
            const isActive = i === current;
            return (
              <div
                key={i}
                onClick={() => go(i)}
                style={{
                  position: "relative",
                  width: isActive ? 36 : 10,
                  height: 10,
                  borderRadius: 999,
                  background: "rgba(0,234,255,0.2)",
                  cursor: "pointer",
                  transition: "width 0.3s ease",
                  overflow: "hidden",
                  boxShadow: isActive ? "0 0 8px rgba(0,234,255,0.3)" : "none",
                }}
              >
                {isActive && (
                  <div
                    key={current}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "#00EAFF",
                      borderRadius: 999,
                      transformOrigin: "left",
                      animation: `dot-progress ${AUTO_INTERVAL}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
