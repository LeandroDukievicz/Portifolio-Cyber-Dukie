"use client";

import React, { useEffect, useState, useRef } from "react";
import CyberpunkBackground from "../components/CyberpunkBackground";
import Link from "next/link";
import Image from "next/image";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { MdOutlineEmail, MdLocationOn } from "react-icons/md";
import { FaGithub, FaLinkedin, FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiExpress, SiPostgresql, SiMysql } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";


function HoloPhoto() {
  const tiltRef    = useRef<HTMLDivElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const sweepRef   = useRef<HTMLDivElement>(null);
  const glitch1Ref = useRef<HTMLDivElement>(null);
  const glitch2Ref = useRef<HTMLDivElement>(null);
  const target     = useRef({ x: 0, y: 0 });
  const current    = useRef({ x: 0, y: 0 });

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
      <div
        ref={tiltRef}
        style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
      >
        <div ref={photoRef} style={{ position: "absolute", inset: 0, transition: "transform 0.05s" }}>
          <Image
            src="/images/foto-sobre.webp"
            alt="Leandro Dukievicz"
            width={416}
            height={640}
            style={{
              width: "100%", height: "100%",
              objectFit: "contain",
              maskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 55%, transparent 100%)",
            }}
            priority
          />
          <div className="holo-scanlines" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(0,234,255,0.07) 0%, rgba(189,0,255,0.06) 50%, rgba(0,234,255,0.09) 100%)",
            animation: "holo-shimmer 4s ease-in-out infinite",
          }} />
          <div ref={sweepRef} style={{
            position: "absolute", left: 0, right: 0, height: "6%",
            pointerEvents: "none", opacity: 0,
            background: "linear-gradient(180deg, transparent 0%, rgba(0,234,255,0.35) 50%, transparent 100%)",
          }} />
          <div ref={glitch1Ref} style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            opacity: 0, mixBlendMode: "screen",
            background: "rgba(0,234,255,0.22)",
            transition: "opacity 0.03s",
          }} />
          <div ref={glitch2Ref} style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            opacity: 0, mixBlendMode: "screen",
            background: "rgba(255,0,255,0.18)",
            transition: "opacity 0.03s",
          }} />
        </div>
      </div>
    </div>
  );
}

const STACK_ICONS = [
  {
    icons: [
      { Icon: FaReact,     color: "#61DAFB", title: "React"   },
      { Icon: SiNextdotjs, color: "#ffffff", title: "Next.js" },
    ],
  },
  {
    icons: [
      { Icon: FaNodeJs,  color: "#8CC84B", title: "Node.js" },
      { Icon: SiExpress, color: "#aaaaaa", title: "Express" },
    ],
  },
  {
    icons: [
      { Icon: SiPostgresql, color: "#336791", title: "PostgreSQL" },
      { Icon: SiMysql,      color: "#4479A1", title: "MySQL"      },
    ],
  },
];

export default function Sobre() {
  const { t } = useLanguage();
  const s = t.sobre;

  const [visible,      setVisible]      = useState(false);
  const [isMobile,     setIsMobile]     = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [atBottom,     setAtBottom]     = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScroll = () => {
    const el = document.getElementById("sobre-content");
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const max = scrollHeight - clientHeight;
    setReadProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 100);
    setAtBottom(scrollTop + clientHeight >= scrollHeight - 30);
  };

  const windowStyle: React.CSSProperties = {
    position: "fixed",
    top: 48,
    left: isMobile ? "2vw" : "10vw",
    width: isMobile ? "96vw" : "80vw",
    bottom: isMobile ? 70 : 186,
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
  };

  const cyan = { color: "#00EAFF" };
  const pink = { color: "#FF00FF" };
  const pStyle: React.CSSProperties = {
    margin: "0 0 18px", fontSize: "1rem", lineHeight: 1.85,
    color: "rgba(255,255,255,0.75)",
    borderLeft: "2px solid rgba(0,234,255,0.3)", paddingLeft: 14,
    textAlign: "justify",
  };

  const STACK = s.stack.map((item, i) => ({ ...item, icons: STACK_ICONS[i].icons }));

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      <div style={windowStyle}>

        {/* Title bar */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 8,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0, userSelect: "none",
        }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", flexShrink: 0 }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", flexShrink: 0 }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            {s.windowTitle}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden" }}>

          {/* Lado esquerdo — foto + info */}
          <div style={{
            width: isMobile ? "100%" : "480px",
            height: isMobile ? "340px" : "auto",
            flexShrink: 0,
            borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.07)",
            borderBottom: isMobile ? "1px solid rgba(255,255,255,0.07)" : "none",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "12px 16px" : "20px 28px",
            boxSizing: "border-box",
            background: "rgba(0,10,20,0.3)",
            gap: 14,
          }}>
            <div style={{ flex: 1, width: "100%", minHeight: 0 }}>
              <HoloPhoto />
            </div>
            <p style={{
              margin: 0, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.08em",
              background: "linear-gradient(90deg, #00EAFF 0%, #BD00FF 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}>
              Leandro Dukievicz
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>
              <MdLocationOn size={14} style={{ color: "#BD00FF", flexShrink: 0 }} />
              Maringá — PR
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "5px 12px", borderRadius: 999,
              border: "1px solid rgba(0,255,136,0.25)",
              background: "rgba(0,255,136,0.07)",
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#00ff88",
                animation: "available-pulse 1.8s ease-in-out infinite",
                display: "inline-block", flexShrink: 0,
              }} />
              <span style={{ fontSize: "0.78rem", color: "rgba(0,255,136,0.85)", letterSpacing: "0.06em" }}>
                {s.available}
              </span>
            </div>
          </div>

          {/* Lado direito — conteúdo */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

            {/* Barra de progresso de leitura */}
            <div style={{ height: 2, background: "rgba(255,255,255,0.06)", flexShrink: 0 }}>
              <div style={{
                height: "100%",
                width: `${readProgress}%`,
                background: "linear-gradient(90deg, #00EAFF, #BD00FF, #FF2D78)",
                transition: "width 0.15s ease",
              }} />
            </div>

            <div id="sobre-content" onScroll={handleScroll} style={{
              flex: 1, overflowY: "auto",
              padding: isMobile ? "16px 20px" : "32px 40px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.1) transparent",
            }}>

              {/* Título */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <h2 style={{
                  margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                  background: "linear-gradient(90deg, #00EAFF 0%, #BD00FF 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {s.heading}
                </h2>
                <span style={{
                  marginLeft: 3, fontSize: 20, fontWeight: 300,
                  color: "#00EAFF",
                  animation: "cursor-blink 1s step-end infinite",
                }}>|</span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #00EAFF55, #BD00FF55, transparent)", marginBottom: 20 }} />

              {/* Bio */}
              <p style={pStyle}>{s.bio1}</p>

              <p style={pStyle}>
                {s.bio2.split("Full Stack").map((part, i) =>
                  i === 0
                    ? <React.Fragment key={i}>{part}<span style={cyan}>Full Stack</span></React.Fragment>
                    : <React.Fragment key={i}>{part}</React.Fragment>
                )}
              </p>

              <p style={pStyle}>{s.bio3}</p>

              <p style={{ ...pStyle, borderLeft: "none", paddingLeft: 0, marginBottom: 10 }}>
                {s.stackIntro}
              </p>

              {/* Stack list */}
              <div style={{ margin: "0 0 20px", paddingLeft: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                {STACK.map(({ label, desc, icons }) => (
                  <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 4, flexShrink: 0, marginTop: 3 }}>
                      {icons.map(({ Icon, color, title }) => (
                        <span
                          key={title}
                          title={title}
                          style={{
                            width: 24, height: 24, borderRadius: 6,
                            background: `${color}18`,
                            border: `1px solid ${color}44`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <Icon size={13} style={{ color }} />
                        </span>
                      ))}
                    </div>
                    <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.75)", textAlign: "justify" }}>
                      <span style={cyan}>{label}</span>{" "}{desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Separador */}
              <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", margin: "4px 0 20px" }} />

              <p style={pStyle}>{s.bio4}</p>

              <p style={{ ...pStyle, marginBottom: 20 }}>
                {s.bio5}{" "}
                <span style={pink}>{s.bio5Highlight}</span>
              </p>

              {/* Links de contato */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 50, marginBottom: 4 }}>
                <a
                  href="mailto:leandrodukievicz1718@gmail.com"
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "7px 14px", borderRadius: 8,
                    border: "1px solid rgba(255,45,120,0.35)",
                    background: "rgba(255,45,120,0.07)",
                    color: "#FF2D78", fontSize: "1rem", textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,45,120,0.15)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,45,120,0.07)")}
                >
                  <MdOutlineEmail size={16} />
                  Email
                </a>
                <a
                  href="https://github.com/LeandroDukievicz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "7px 14px", borderRadius: 8,
                    border: "1px solid rgba(189,0,255,0.35)",
                    background: "rgba(189,0,255,0.07)",
                    color: "#BD00FF", fontSize: "1rem", textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(189,0,255,0.15)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(189,0,255,0.07)")}
                >
                  <FaGithub size={15} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/leandrodukievicz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "7px 14px", borderRadius: 8,
                    border: "1px solid rgba(0,234,255,0.35)",
                    background: "rgba(0,234,255,0.07)",
                    color: "#00EAFF", fontSize: "1rem", textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,234,255,0.15)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,234,255,0.07)")}
                >
                  <FaLinkedin size={15} />
                  LinkedIn
                </a>
              </div>

              <div style={{ height: 36 }} />

              {/* Timeline header */}
              <div id="timeline-section" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, rgba(0,234,255,0.3))" }} />
                <span style={{ fontSize: "1.1rem", letterSpacing: "0.2em", color: "rgba(0,234,255,0.6)", textTransform: "uppercase" }}>{s.timelineTitle}</span>
                <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(0,234,255,0.3), transparent)" }} />
              </div>

              {/* Timeline */}
              <div style={{ position: "relative", paddingLeft: 28 }}>
                <div style={{
                  position: "absolute", left: 7, top: 6, bottom: 6,
                  width: 1, background: "linear-gradient(180deg, #00EAFF44, #BD00FF44, #00EAFF22)",
                }} />

                {/* Item 1 */}
                <div style={{ position: "relative", marginBottom: 28 }}>
                  <div style={{
                    position: "absolute", left: -24, top: 5,
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#00EAFF", boxShadow: "0 0 8px #00EAFF",
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "1.2rem", color: "rgba(0,234,255,0.55)", letterSpacing: "0.1em" }}>{s.timeline[0].date}</span>
                    <span style={{
                      fontSize: 9, letterSpacing: "0.12em", padding: "2px 7px", borderRadius: 4,
                      border: "1px solid rgba(0,234,255,0.4)", color: "#00EAFF", textTransform: "uppercase",
                    }}>{s.badgeStart}</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                    <strong style={{ color: "#fff" }}>{s.timeline[0].title}</strong><br />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>{s.timeline[0].sub}</span>
                  </p>
                </div>

                {/* Item 2 */}
                <div style={{ position: "relative", marginBottom: 28 }}>
                  <div style={{
                    position: "absolute", left: -24, top: 5,
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#BD00FF", boxShadow: "0 0 8px #BD00FF",
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "1.2rem", color: "rgba(189,0,255,0.65)", letterSpacing: "0.1em" }}>{s.timeline[1].date}</span>
                    <span style={{
                      fontSize: 9, letterSpacing: "0.12em", padding: "2px 7px", borderRadius: 4,
                      border: "1px solid rgba(189,0,255,0.4)", color: "#BD00FF", textTransform: "uppercase",
                    }}>{s.badgeCompleted}</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                    <strong style={{ color: "#fff" }}>{s.timeline[1].title}</strong><br />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>{s.timeline[1].sub}</span>
                  </p>
                </div>

                {/* Item 3 — Em andamento */}
                <div style={{ position: "relative", marginBottom: 28 }}>
                  <div style={{
                    position: "absolute", left: -24, top: 5,
                    width: 10, height: 10, borderRadius: "50%",
                    background: "transparent", border: "2px solid #FF2D78",
                    boxShadow: "0 0 8px #FF2D78",
                    animation: "hex-color-pulse 2s ease-in-out infinite",
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "1.2rem", color: "rgba(255,45,120,0.7)", letterSpacing: "0.1em" }}>{s.timeline[2].date}</span>
                    <span style={{
                      fontSize: 9, letterSpacing: "0.12em", padding: "2px 7px", borderRadius: 4,
                      border: "1px solid rgba(255,45,120,0.5)", color: "#FF2D78", textTransform: "uppercase",
                    }}>{s.badgeInProgress}</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                    <strong style={{ color: "#fff" }}>{s.timeline[2].title}</strong><br />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>{s.timeline[2].sub}</span>
                  </p>
                </div>

                {/* Item 4 — Idiomas */}
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", left: -24, top: 5,
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#00ff88", boxShadow: "0 0 8px #00ff88",
                  }} />
                  <span style={{ fontSize: "1.2rem", color: "rgba(0,255,136,0.65)", letterSpacing: "0.1em" }}>{s.timeline[3].date}</span>
                  <p style={{ margin: "4px 0 0", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                    <strong style={{ color: "#fff" }}>{s.timeline[3].title}</strong>{" "}
                    <span style={{ color: "rgba(0,234,255,0.8)" }}>{s.timeline[3].sub}</span><br />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>
                      {s.timeline[3].detail}
                    </span>
                  </p>
                </div>
              </div>

              <div style={{ height: 36 }} />

            </div>

            {/* Scroll button */}
            <div style={{
              flexShrink: 0, display: "flex", justifyContent: "center",
              padding: "12px 0 14px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(3,17,31,0.4)",
            }}>
              <button
                onClick={() => {
                  const el = document.getElementById("sobre-content");
                  if (!el) return;
                  if (atBottom) {
                    el.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    el.scrollBy({ top: 200, behavior: "smooth" });
                  }
                }}
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  color: "#00EAFF",
                  animation: atBottom ? "none" : "scroll-bounce 1.8s ease-in-out infinite",
                  opacity: 0.7, transition: "opacity 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
              >
                {atBottom ? (
                  <>
                    <IoChevronUpOutline size={18} />
                    <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "inherit" }}>{s.scrollUp}</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "inherit" }}>{s.scrollDown}</span>
                    <IoChevronDownOutline size={18} />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
