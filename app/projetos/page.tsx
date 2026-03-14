"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import CyberpunkBackground from "../components/CyberpunkBackground";
import { useLanguage } from "../context/LanguageContext";

const QUESTION_MARKS = [
  { top: "8%",  left: "12%", size: "1.1rem", opacity: 0.06, rotate: -15 },
  { top: "14%", left: "72%", size: "2.4rem", opacity: 0.04, rotate: 20  },
  { top: "28%", left: "88%", size: "0.9rem", opacity: 0.07, rotate: -8  },
  { top: "38%", left: "5%",  size: "1.8rem", opacity: 0.05, rotate: 12  },
  { top: "52%", left: "55%", size: "3rem",   opacity: 0.03, rotate: -25 },
  { top: "60%", left: "25%", size: "1rem",   opacity: 0.07, rotate: 5   },
  { top: "70%", left: "80%", size: "1.5rem", opacity: 0.05, rotate: -10 },
  { top: "78%", left: "40%", size: "0.8rem", opacity: 0.06, rotate: 18  },
  { top: "85%", left: "10%", size: "2rem",   opacity: 0.04, rotate: -20 },
  { top: "90%", left: "65%", size: "1.2rem", opacity: 0.06, rotate: 8   },
  { top: "20%", left: "45%", size: "1.6rem", opacity: 0.04, rotate: -5  },
  { top: "45%", left: "30%", size: "0.7rem", opacity: 0.07, rotate: 30  },
];

type StaticProject = {
  tags: string[];
  image?: string;
  ctaHrefs?: [string, string];
  soon?: boolean;
};

// Dados estáticos (imagens, tags, links) — não mudam com o idioma
const STATIC: (StaticProject | null)[] = [
  { tags: ["HTML5", "Sass", "Vercel"],            image: "/images/projetos/projeto-electrum.webp", ctaHrefs: ["https://github.com/LeandroDukievicz/sass-project-electrum", "https://projectelectrumleandrod.vercel.app/"] },
  { tags: ["HTML5", "CSS3", "Bootstrap", "CDN", "Vercel"], image: "/images/projetos/artes-urbanas.webp",   ctaHrefs: ["https://github.com/LeandroDukievicz/bootstrap-urban-arts", "https://artesurbanas.vercel.app/"] },
  { tags: ["HTML5", "CSS3", "Bootstrap 5", "Vercel"],      image: "/images/projetos/imovi.webp",           ctaHrefs: ["https://github.com/LeandroDukievicz/bootstrap-imovi", "https://bootstrap-imovi.vercel.app/"] },
  { tags: ["HTML5", "CSS3", "Forms", "Vercel"],            image: "/images/projetos/barbershop.webp",      ctaHrefs: ["https://github.com/LeandroDukievicz/BarberShop", "https://barberhop-dukievicz.vercel.app/#services"] },
  { tags: [], soon: true, image: "/images/projetos/dashboard.webp" },
  { tags: [], soon: true, image: "/images/projetos/helmet.webp" },
  null,
  null,
  null,
];

const TOTAL_CARDS = STATIC.length;
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
  const { t } = useLanguage();
  const p = t.projects;

  // Monta projetos mesclando dados estáticos com traduções
  const PROJECTS = STATIC.map((s, i) => {
    if (!s) return null;
    const tr = p.items[i];
    return {
      title:       tr?.title ?? "",
      subtitle:    tr?.subtitle ?? "",
      description: tr?.description ?? "",
      tags:        s.tags,
      image:       s.image,
      soon:        s.soon,
      soonLabel:   tr && "soonLabel" in tr ? (tr as { soonLabel?: string }).soonLabel : undefined,
      ctas: s.ctaHrefs ? [
        { label: p.ctaDetails, href: s.ctaHrefs[0], icon: "github" as const },
        { label: p.ctaProject, href: s.ctaHrefs[1], icon: "link"   as const },
      ] : undefined,
    };
  });

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

  // Scroll do mouse
  const lastWheel = useRef(0);
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastWheel.current < 600) return;
    lastWheel.current = now;
    go(currentRef.current + (e.deltaY > 0 ? 1 : -1));
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
        @keyframes blink1 { 0%,100%{opacity:0} 33%{opacity:1} }
        @keyframes blink2 { 0%,100%{opacity:0} 66%{opacity:1} }
        @keyframes blink3 { 0%,100%{opacity:0} 100%{opacity:1} }
        .soon-dot-1 { animation: blink1 1.2s ease-in-out infinite; }
        .soon-dot-2 { animation: blink2 1.2s ease-in-out infinite; }
        .soon-dot-3 { animation: blink3 1.2s ease-in-out infinite; }

        @keyframes qfloat1 {
          0%,100% { transform: rotate(-15deg) translate(0, 0); }
          50%     { transform: rotate(-12deg) translate(6px, -10px); }
        }
        @keyframes qfloat2 {
          0%,100% { transform: rotate(20deg) translate(0, 0); }
          50%     { transform: rotate(24deg) translate(-8px, 8px); }
        }
        @keyframes qfloat3 {
          0%,100% { transform: rotate(-8deg) translate(0, 0); }
          50%     { transform: rotate(-5deg) translate(5px, -12px); }
        }
        @keyframes qfloat4 {
          0%,100% { transform: rotate(12deg) translate(0, 0); }
          50%     { transform: rotate(8deg) translate(-6px, 9px); }
        }
        @keyframes qfloat5 {
          0%,100% { transform: rotate(-25deg) translate(0, 0); }
          50%     { transform: rotate(-20deg) translate(10px, -7px); }
        }
        @keyframes qfloat6 {
          0%,100% { transform: rotate(5deg) translate(0, 0); }
          50%     { transform: rotate(9deg) translate(-9px, -11px); }
        }
        .qm-0  { animation: qfloat1 4.2s ease-in-out infinite; }
        .qm-1  { animation: qfloat2 5.8s ease-in-out infinite; }
        .qm-2  { animation: qfloat3 3.7s ease-in-out infinite; }
        .qm-3  { animation: qfloat4 6.1s ease-in-out infinite; }
        .qm-4  { animation: qfloat5 4.8s ease-in-out infinite; }
        .qm-5  { animation: qfloat6 5.2s ease-in-out infinite; }
        .qm-6  { animation: qfloat1 6.5s ease-in-out infinite; }
        .qm-7  { animation: qfloat3 3.9s ease-in-out infinite; }
        .qm-8  { animation: qfloat2 5.0s ease-in-out infinite; }
        .qm-9  { animation: qfloat5 4.3s ease-in-out infinite; }
        .qm-10 { animation: qfloat4 6.8s ease-in-out infinite; }
        .qm-11 { animation: qfloat6 4.0s ease-in-out infinite; }
      `}</style>

      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 150,
        gap: 32,
      }}>

        {/* Track */}
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            height: isMobile ? 430 : 640,
            position: "relative",
            perspective: "1000px",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={onMouseLeaveTrack}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onWheel={onWheel}
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
              const cardH    = isMobile ? 370 : 580;
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
                  {project?.soon ? (
                    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                      {project.image && (
                        <Image
                          src={project.image}
                          alt={project.soonLabel ?? p.comingSoon}
                          fill
                          style={{ objectFit: "cover" }}
                          draggable={false}
                        />
                      )}
                      {/* Pontos de interrogação animados (só em cards sem imagem) */}
                      {!project.image && QUESTION_MARKS.map((q, qi) => (
                        <span key={qi} className={`qm-${qi}`} style={{
                          position: "absolute",
                          top: q.top, left: q.left,
                          fontSize: q.size,
                          opacity: q.opacity * 6,
                          color: "#00EAFF",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                          userSelect: "none",
                          pointerEvents: "none",
                          textShadow: "0 0 8px rgba(0,234,255,0.4)",
                        }}>?</span>
                      ))}
                      {/* Overlay escuro */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: project.image ? "rgba(3,17,31,0.85)" : "transparent",
                        backdropFilter: project.image ? "blur(2px)" : "none",
                      }} />
                      {/* Conteúdo */}
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 16,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      }}>
                        <span style={{
                          fontSize: isMobile ? "2rem" : "2.6rem",
                          fontWeight: 800,
                          letterSpacing: "0.04em",
                          color: "rgba(255,255,255,0.9)",
                          textTransform: "uppercase",
                          lineHeight: 1,
                        }}>
                          {p.comingSoon}
                        </span>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span className="soon-dot-1" style={{ fontSize: isMobile ? "2rem" : "2.8rem", color: "#00EAFF", lineHeight: 1 }}>.</span>
                          <span className="soon-dot-2" style={{ fontSize: isMobile ? "2rem" : "2.8rem", color: "#00EAFF", lineHeight: 1 }}>.</span>
                          <span className="soon-dot-3" style={{ fontSize: isMobile ? "2rem" : "2.8rem", color: "#00EAFF", lineHeight: 1 }}>.</span>
                        </div>
                        <span style={{
                          fontSize: isMobile ? "0.85rem" : "1rem",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          color: "rgba(255,255,255,0.85)",
                          textTransform: "uppercase",
                          textAlign: "center",
                        }}>
                          {project.soonLabel ?? ""}
                        </span>
                      </div>
                    </div>
                  ) : project ? (
                    <>
                      {/* Imagem */}
                      {project.image && (
                        <div style={{ position: "relative", width: "100%", height: isMobile ? 140 : 185, flexShrink: 0 }}>
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
                        padding: isMobile ? "14px 16px 20px" : "18px 24px 28px",
                        gap: 10,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        justifyContent: "flex-start",
                      }}>
                        <span style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,234,255,0.6)" }}>
                          {project.subtitle}
                        </span>
                        <h2 style={{ margin: 0, fontSize: isMobile ? "1rem" : "1.2rem", fontWeight: 700, color: "#fff", letterSpacing: "0.03em" }}>
                          {project.title}
                        </h2>
                        <p style={{ margin: 0, fontSize: isMobile ? "0.72rem" : "0.82rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.75, whiteSpace: "pre-line", letterSpacing: "0.01em", textAlign: "justify" }}>
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
                        {/* CTAs */}
                        {project.ctas && (
                          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                            {project.ctas.map(cta => (
                              <a
                                key={cta.href}
                                href={cta.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                style={{
                                  display: "inline-flex", alignItems: "center", gap: 7,
                                  padding: "8px 16px", borderRadius: 8,
                                  fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase",
                                  fontFamily: "'JetBrains Mono', monospace",
                                  color: "#fff",
                                  background: "rgba(255,255,255,0.08)",
                                  border: "1px solid rgba(255,255,255,0.28)",
                                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.25)",
                                  backdropFilter: "blur(12px)",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                  transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s",
                                }}
                                onMouseEnter={e => {
                                  const el = e.currentTarget as HTMLAnchorElement;
                                  el.style.background = "rgba(0,234,255,0.15)";
                                  el.style.borderColor = "rgba(0,234,255,0.5)";
                                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 20px rgba(0,234,255,0.2)";
                                  el.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={e => {
                                  const el = e.currentTarget as HTMLAnchorElement;
                                  el.style.background = "rgba(255,255,255,0.08)";
                                  el.style.borderColor = "rgba(255,255,255,0.28)";
                                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.25)";
                                  el.style.transform = "translateY(0)";
                                }}
                              >
                                {cta.icon === "github" ? (
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                                  </svg>
                                ) : (
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15 3 21 3 21 9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                  </svg>
                                )}
                                {cta.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    /* Card vazio — fallback igual ao Em Breve sem imagem */
                    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                      {QUESTION_MARKS.map((q, qi) => (
                        <span key={qi} className={`qm-${qi}`} style={{
                          position: "absolute",
                          top: q.top, left: q.left,
                          fontSize: q.size,
                          opacity: q.opacity * 6,
                          color: "#00EAFF",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                          userSelect: "none",
                          pointerEvents: "none",
                          textShadow: "0 0 8px rgba(0,234,255,0.4)",
                        }}>?</span>
                      ))}
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 16,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      }}>
                        <span style={{
                          fontSize: isMobile ? "2rem" : "2.6rem",
                          fontWeight: 800,
                          letterSpacing: "0.04em",
                          color: "rgba(255,255,255,0.9)",
                          textTransform: "uppercase",
                          lineHeight: 1,
                        }}>{p.comingSoon}</span>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span className="soon-dot-1" style={{ fontSize: isMobile ? "2rem" : "2.8rem", color: "#00EAFF", lineHeight: 1 }}>.</span>
                          <span className="soon-dot-2" style={{ fontSize: isMobile ? "2rem" : "2.8rem", color: "#00EAFF", lineHeight: 1 }}>.</span>
                          <span className="soon-dot-3" style={{ fontSize: isMobile ? "2rem" : "2.8rem", color: "#00EAFF", lineHeight: 1 }}>.</span>
                        </div>
                      </div>
                    </div>
                  )}
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
