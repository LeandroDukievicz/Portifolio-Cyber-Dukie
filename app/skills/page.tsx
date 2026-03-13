"use client";

import React, { useEffect, useState } from "react";
import CyberpunkBackground from "../components/CyberpunkBackground";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import {
  SiJavascript, SiTypescript, SiHtml5, SiCss, SiNextdotjs,
  SiExpress, SiPostgresql, SiMysql, SiTailwindcss, SiGit,
  SiNpm, SiYarn, SiPnpm, SiDocker,
} from "react-icons/si";
import { FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import {
  TbApi, TbGauge, TbDevices, TbSeo,
  TbPuzzle, TbBrain, TbMessageCircle, TbUsers,
  TbBook, TbRefresh, TbListCheck, TbEye,
  TbRocket, TbSearch, TbClock, TbHeart, TbCode,
} from "react-icons/tb";

const HARD_SKILL_GROUPS = [
  {
    category: "Linguagens",
    items: [
      { Icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
      { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
      { Icon: SiHtml5,      label: "HTML5",      color: "#E34F26" },
      { Icon: SiCss,        label: "CSS3",       color: "#1572B6" },
    ],
  },
  {
    category: "Boas Práticas",
    items: [
      { Icon: TbGauge,   label: "Web Performance",  color: "#00EAFF" },
      { Icon: TbDevices, label: "Responsive Design", color: "#BD00FF" },
      { Icon: TbSeo,     label: "SEO Web",           color: "#00ff88" },
    ],
  },
  {
    category: "Frameworks & Libs",
    items: [
      { Icon: FaReact,       label: "React",        color: "#61DAFB" },
      { Icon: SiNextdotjs,   label: "Next.js",      color: "#ffffff" },
      { Icon: FaNodeJs,      label: "Node.js",      color: "#8CC84B" },
      { Icon: SiExpress,     label: "Express",      color: "#aaaaaa" },
      { Icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
    ],
  },
  {
    category: "Banco de Dados",
    items: [
      { Icon: SiPostgresql, label: "PostgreSQL", color: "#336791" },
      { Icon: SiMysql,      label: "MySQL",      color: "#4479A1" },
    ],
  },
  {
    category: "Ferramentas",
    items: [
      { Icon: SiGit,    label: "Git",       color: "#F05032" },
      { Icon: FaGithub, label: "GitHub",    color: "#ffffff" },
      { Icon: SiDocker, label: "Docker",    color: "#2496ED" },
      { Icon: SiNpm,    label: "npm",       color: "#CB3837" },
      { Icon: SiYarn,   label: "yarn",      color: "#2C8EBB" },
      { Icon: SiPnpm,   label: "pnpm",      color: "#F69220" },
      { Icon: TbApi,    label: "REST APIs", color: "#00EAFF" },
    ],
  },
];

const CARD_DELAY_MS = 55;

// Calcula o índice global do primeiro card de cada grupo para sincronizar o tipo com o stagger
function buildGroups() {
  let idx = 0;
  return HARD_SKILL_GROUPS.map(group => {
    const startIndex = idx;
    const items = group.items.map(item => ({ ...item, cardIndex: idx++ }));
    return { ...group, items, startIndex };
  });
}
const GROUPS = buildGroups();

// Componente de digitação
function TypeLabel({ text, startDelay }: { text: string; startDelay: number }) {
  const [chars, setChars] = useState(0);

  useEffect(() => {
    setChars(0);
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setChars(n => {
          if (n >= text.length) { clearInterval(interval); return n; }
          return n + 1;
        });
      }, 55);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, startDelay]);

  return (
    <>
      {text.slice(0, chars)}
      {chars < text.length && (
        <span style={{ opacity: 0.5, animation: "cursor-blink 0.7s step-end infinite" }}>_</span>
      )}
    </>
  );
}

function SkillCard({ Icon, label, color, cardIndex }: {
  Icon: React.ElementType; label: string; color: string; cardIndex: number;
}) {
  return (
    <div
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 5, padding: "8px 5px", borderRadius: 8,
        border: `1px solid ${color}28`, background: `${color}0d`, cursor: "default",
        opacity: 0,
        animation: "card-in 0.35s ease forwards",
        animationDelay: `${cardIndex * CARD_DELAY_MS}ms`,
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s",
        minHeight: 70,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${color}66`;
        el.style.background = `${color}1a`;
        el.style.boxShadow = `0 0 16px ${color}22`;
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${color}28`;
        el.style.background = `${color}0d`;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      <Icon size={22} style={{ color, flexShrink: 0 }} />
      <span style={{
        fontSize: "0.94rem", letterSpacing: "0.02em",
        color: "rgba(255,255,255,0.65)",
        textAlign: "center", lineHeight: 1.25, wordBreak: "break-word",
      }}>
        {label}
      </span>
    </div>
  );
}

const SOFT_SKILLS = [
  { Icon: TbPuzzle,        label: "Resolução de problemas", desc: "Analiso problemas, quebro em partes menores, assim consigo ser mais eficiente.",              color: "#00EAFF" },
  { Icon: TbBrain,         label: "Pensamento analítico",   desc: "Avalio cenários técnicos, entendo impactos e tomo decisões bem fundamentadas.",              color: "#BD00FF" },
  { Icon: TbMessageCircle, label: "Comunicação clara",      desc: "Explico ideias técnicas para devs, designers e não-técnicos com objetividade.",              color: "#FF2D78" },
  { Icon: TbUsers,         label: "Trabalho em equipe",     desc: "Colaboro com devs, designers e PMs para construir soluções melhores juntos.",                color: "#00EAFF" },
  { Icon: TbBook,          label: "Aprendizado contínuo",   desc: "Tecnologia evolui rápido — busco constantemente aprender novas ferramentas e conceitos.",    color: "#BD00FF" },
  { Icon: TbRefresh,       label: "Adaptabilidade",         desc: "Me ajusto rapidamente a mudanças de projeto ou tecnologia sem perder qualidade.",            color: "#FF2D78" },
  { Icon: TbListCheck,     label: "Organização",            desc: "Gerencio tarefas, prioridades e prazos de forma eficiente e consistente.",                   color: "#00EAFF" },
  { Icon: TbEye,           label: "Atenção aos detalhes",   desc: "Percebo pequenos problemas que impactam performance, usabilidade e qualidade do código.",    color: "#BD00FF" },
  { Icon: TbRocket,        label: "Proatividade",           desc: "Identifico melhorias e ajo antes que problemas apareçam, sem precisar ser solicitado.",      color: "#FF2D78" },
  { Icon: TbSearch,        label: "Pensamento crítico",     desc: "Questiono soluções, avalio alternativas e busco sempre a melhor abordagem técnica.",         color: "#00EAFF" },
  { Icon: TbClock,         label: "Gestão do tempo",        desc: "Entrego tarefas dentro do prazo mantendo alta qualidade e organização.",                     color: "#BD00FF" },
  { Icon: TbHeart,         label: "Inteligência emocional",    desc: "Lido com pressão e feedback de forma madura, equilibrada e construtiva.",                    color: "#FF2D78" },
  { Icon: TbCode, label: "Princípios de Engenharia", desc: "", color: "#00EAFF" },
];

const PRINCIPLES = [
  { num: "1️⃣", title: "Performance primeiro",                   desc: "Interfaces devem ser rápidas e eficientes. Cada milissegundo impacta a experiência do usuário." },
  { num: "2️⃣", title: "Simplicidade vence complexidade",        desc: "A melhor solução geralmente é a mais simples de entender e manter." },
  { num: "3️⃣", title: "Código é comunicação",                   desc: "Código não deve apenas funcionar — ele precisa ser claro para outros desenvolvedores." },
  { num: "4️⃣", title: "Experiência do usuário em primeiro lugar", desc: "Tecnologia só tem valor quando melhora a experiência de quem usa o produto." },
  { num: "5️⃣", title: "Escalabilidade desde o início",          desc: "Aplicações devem ser estruturadas para crescer sem gerar dívida técnica." },
  { num: "6️⃣", title: "Consistência visual e técnica",          desc: "Interfaces e padrões de código devem seguir uma lógica consistente." },
  { num: "7️⃣", title: "Automação sempre que possível",          desc: "Ferramentas e processos automatizados aumentam a qualidade e reduzem erros." },
];

const PRINCIPIOS_IDX = SOFT_SKILLS.length - 1;

export default function Skills() {
  const { t } = useLanguage();
  const s = t.skills;
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [showPrincipios, setShowPrincipios] = useState(false);

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
        @keyframes card-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .flip-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.45s ease;
        }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 4px;
          padding: 5px 4px;
        }
        .flip-back { transform: rotateY(180deg); }
        @keyframes cursor-blink { 50% { opacity: 0; } }
        @keyframes principles-in {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div
        className="window-rise"
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
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", flexShrink: 0 }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            {s.windowTitle}
          </span>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden", position: "relative" }}>

          {/* Painel Princípios de Engenharia */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 20,
            background: "rgba(3,17,31,0.97)",
            backdropFilter: "blur(10px)",
            display: "flex", flexDirection: "column",
            padding: "18px 28px 16px",
            opacity: showPrincipios ? 1 : 0,
            transform: showPrincipios ? "translateX(0)" : "translateX(28px)",
            transition: "opacity 0.38s ease, transform 0.38s ease",
            pointerEvents: showPrincipios ? "auto" : "none",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.1) transparent",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexShrink: 0 }}>
              <button
                onClick={() => setShowPrincipios(false)}
                style={{
                  background: "rgba(0,234,255,0.08)", border: "1px solid rgba(0,234,255,0.3)",
                  borderRadius: 6, padding: "4px 12px", cursor: "pointer",
                  color: "#00EAFF", fontSize: "0.8rem", fontFamily: "inherit",
                  letterSpacing: "0.06em", transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,234,255,0.15)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,234,255,0.08)")}
              >
                {s.back}
              </button>
              <h2 style={{
                margin: 0, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                background: "linear-gradient(90deg, #00EAFF 0%, #BD00FF 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {s.principlesTitle}
              </h2>
            </div>
            <div style={{ height: 1, background: "linear-gradient(90deg, #00EAFF55, #BD00FF55, transparent)", marginBottom: 14, flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PRINCIPLES.map(({ num }, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    animation: showPrincipios ? `principles-in 0.35s ease ${i * 55}ms both` : "none",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.04em" }}>
                      {s.principles[i].title}
                    </span>
                    <p style={{ margin: "2px 0 0", fontSize: "1.2rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                      {s.principles[i].desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hard Skills */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: isMobile ? "10px" : "12px 16px", overflow: "hidden" }}>
            <h2 style={{
              margin: 0, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              background: "linear-gradient(90deg, #00EAFF 0%, #BD00FF 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              flexShrink: 0,
            }}>
              {s.hardSkills}
            </h2>
            <div style={{ height: 1, background: "linear-gradient(90deg, #00EAFF55, #BD00FF55, transparent)", marginTop: 5, marginBottom: 8, flexShrink: 0 }} />

            {/* Grid por categoria */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.1) transparent",
              display: "flex",
              flexDirection: "column",
              gap: 7,
              paddingBottom: 4,
            }}>
              {/* Primeira linha — Linguagens + Boas Práticas lado a lado */}
              <div style={{ display: "flex", gap: 12 }}>
                {GROUPS.slice(0, 2).map(({ category, items, startIndex }, gi) => (
                  <div key={category} style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{
                        fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
                        color: "rgba(0,234,255,0.55)", minWidth: 0, whiteSpace: "nowrap",
                      }}>
                        <TypeLabel text={s.categories[gi]} startDelay={startIndex * CARD_DELAY_MS} />
                      </span>
                      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(0,234,255,0.15), transparent)" }} />
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(107px, 1fr))",
                      gap: 8,
                    }}>
                      {items.map(({ Icon, label, color, cardIndex }) => (
                        <SkillCard key={label} Icon={Icon} label={label} color={color} cardIndex={cardIndex} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divisória horizontal entre linha 1 e o resto */}
              <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", flexShrink: 0 }} />

              {/* Demais grupos */}
              {GROUPS.slice(2).map(({ category, items, startIndex }, gi) => (
                <div key={category}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "rgba(0,234,255,0.55)", minWidth: 0,
                    }}>
                      <TypeLabel text={s.categories[gi + 2]} startDelay={startIndex * CARD_DELAY_MS} />
                    </span>
                    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(0,234,255,0.15), transparent)" }} />
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
                    gap: 7,
                  }}>
                    {items.map(({ Icon, label, color, cardIndex }) => (
                      <SkillCard key={label} Icon={Icon} label={label} color={color} cardIndex={cardIndex} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divisória vertical */}
          <div style={{
            width: isMobile ? "100%" : 1,
            height: isMobile ? 1 : "auto",
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)",
            flexShrink: 0,
          }} />

          {/* Soft Skills */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: isMobile ? "10px" : "12px 16px", overflow: "hidden" }}>
            <h2 style={{
              margin: 0, fontSize: "1rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              background: "linear-gradient(90deg, #BD00FF 0%, #FF2D78 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              flexShrink: 0,
            }}>
              {s.softSkills}
            </h2>
            <div style={{ height: 1, background: "linear-gradient(90deg, #BD00FF55, #FF2D7855, transparent)", marginTop: 6, marginBottom: 8, flexShrink: 0 }} />

            {/* Grid de flip cards */}
            <div style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 5,
            }}>
              {SOFT_SKILLS.map(({ Icon, color }, i) => {
                const isFlipped = flippedCard === i;
                const isPrincipio = i === PRINCIPIOS_IDX;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (isPrincipio) { setShowPrincipios(true); }
                      else if (isMobile) { setFlippedCard(isFlipped ? null : i); }
                    }}
                    onMouseEnter={() => { if (!isPrincipio && !isMobile) setFlippedCard(i); }}
                    onMouseLeave={() => { if (!isPrincipio && !isMobile) setFlippedCard(null); }}
                    style={{
                      perspective: 600,
                      cursor: "pointer",
                      opacity: 0,
                      animation: "card-in 0.35s ease forwards",
                      animationDelay: `${i * 45}ms`,
                      ...(i === SOFT_SKILLS.length - 1 ? { gridColumn: "2 / 4" } : {}),
                    }}
                  >
                    <div className={`flip-inner${!isPrincipio && isFlipped ? " flipped" : ""}`}>
                      {/* Frente */}
                      <div
                        className="flip-face"
                        style={{
                          border: `1px solid ${color}30`,
                          background: `${color}0d`,
                        }}
                      >
                        <Icon size={20} style={{ color, flexShrink: 0 }} />
                        <span style={{
                          fontSize: "1rem", color: "rgba(255,255,255,0.7)",
                          lineHeight: 1.25, letterSpacing: "0.02em",
                          textAlign: "center",
                        }}>
                          {s.softSkillsData[i].label}
                        </span>
                        {isPrincipio && (
                          <span style={{ fontSize: "0.65rem", color: `${color}88`, letterSpacing: "0.06em", marginTop: 2 }}>
                            {s.principlesHint}
                          </span>
                        )}
                      </div>
                      {/* Verso (não usado pelo card especial) */}
                      <div
                        className="flip-face flip-back"
                        style={{
                          border: `1px solid ${color}55`,
                          background: `${color}18`,
                          padding: "6px 8px",
                        }}
                      >
                        <p style={{
                          margin: 0, fontSize: "1rem",
                          color: "rgba(255,255,255,0.85)",
                          lineHeight: 1.45, textAlign: "center",
                        }}>
                          {s.softSkillsData[i].desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
