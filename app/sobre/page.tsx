"use client";

import React, { useEffect, useState, useRef } from "react";
import CyberpunkBackground from "../components/CyberpunkBackground";
import Link from "next/link";
import Image from "next/image";
import { BsPerson } from "react-icons/bs";
import { IoChevronDownOutline } from "react-icons/io5";

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
          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
          <div id="sobre-content" style={{
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
                Sobre
              </h2>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #00EAFF55, #BD00FF55, transparent)", marginBottom: 20 }} />

            {/* Bio */}
            {(() => {
              const p: React.CSSProperties = {
                margin: "0 0 18px", fontSize: "1rem", lineHeight: 1.85,
                color: "rgba(255,255,255,0.75)",
                borderLeft: "2px solid rgba(0,234,255,0.3)", paddingLeft: 14,
              };
              const cyan = { color: "#00EAFF" };
              const pink = { color: "#FF00FF" };
              return (
                <>
                  <p style={p}>
                    Olá, é uma grande satisfação ter a sua visita, espero que esteja gostando da experiência de navegar
                    neste portfólio — me custou algumas boas horas para juntar e sintetizar aqui o meu gosto pessoal e
                    transferir um pouco do que eu sou e curto, além de muitos neurônios queimados kkkkk{" "}
                    <span style={pink}>( literalmente! )</span>
                  </p>

                  <p style={{ ...p, borderLeft: "none", paddingLeft: 0 }}>
                    Se quiser pular direto para a timeline da formação acadêmica{" "}
                    <a
                      href="#timeline-section"
                      onClick={e => {
                        e.preventDefault();
                        document.getElementById("timeline-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      style={{ color: "#00EAFF", textDecoration: "underline", cursor: "pointer" }}
                    >
                      ( clique aqui )
                    </a>
                  </p>

                  <p style={p}>
                    Eu sou realmente aficionado por tecnologia, respiro isso 24 horas por dia e além desta vocação gosto
                    muito de tocar guitarra, violão, contrabaixo e claro um assíduo consumidor de café, amante de cinema
                    e literatura <span style={cyan}>( principalmente ficção científica e sci-fi! )</span>.
                  </p>

                  <p style={p}>
                    Mudar de carreira não foi uma fuga ou porque quis aproveitar o hype do momento ( se fosse eu já teria
                    saído, ainda mais com a visão que tenho hoje ) por mais que eu gostasse do ramo de vendas ou do serviço
                    atual, eu pensei em algo que eu realmente gostava de fazer, desde sempre fui um entusiasta de tecnologia,
                    fazia o possível para ter gadgets tecnológicos, até que entendi que a graça mesmo era{" "}
                    <span style={cyan}>criar algo com tecnologia!</span>
                  </p>

                  <p style={p}>
                    Na febre dos cursos de hardware cheguei a fazer um curso destes, muito bom por sinal, foi aí que aprendi
                    a formatar e tive meu primeiro contato com o Linux. Naquela época o Linux era tenso de instalar, não tinha
                    GUI bonitinha para ajudar não e os drivers eram instalados todos na unha. Depois tentei trabalhar com isso,
                    mas o mercado saturou rapidamente e começaram a cobrar valores bem baixos para formatar. Logo depois com
                    meus 20 e poucos anos ( não lembro a idade exata ) fiz um bom curso de lógica de programação, ali eu tive
                    o primeiro contato real com programação, aprendendo a lógica e printando o meu primeiro:{" "}
                    <span style={pink}>"hello world"!</span>
                  </p>

                  <p style={p}>
                    Lembro que meu primeiro trabalho (estágio) com 16 anos, a primeira coisa que comprei foi um{" "}
                    <span style={cyan}>iPod Classic</span>, recém lançado. Lembro que paguei em suaves prestações e depois
                    quebrei a cabeça pra entender como transferia músicas pra ele, que era totalmente diferente dos mp3 players
                    da época. ( obs: passava horas, tardes inteiras nas lan-houses sobre o iPod. Ainda tenho ele e funciona
                    100% mesmo depois de 22 anos de uso, com cabo original e tudo funcional!!{" "}
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>Acredita?</span> )
                  </p>

                  <p style={p}>
                    Bom, pondo fim à nostalgia, atualmente estou em transição de carreira, a experiência que tenho em registro
                    sempre foi no ramo de vendas e atualmente trabalho como motorista de app. Acredito que estas experiências
                    anteriores moldaram muito a forma que encaro os problemas com uma certa visão mais ampla de negócio, tenho
                    mais empatia ao lidar com usuários e penso um pouco como quem já esteve do outro lado da tela.
                  </p>

                  <p style={p}>
                    Hoje, eu me esforço e me dedico para continuar caminhando de encontro a alcançar mais este objetivo,
                    me esforçando pra manter a consistência e avançando gradativamente.
                  </p>

                  <p style={p}>
                    Meu foco atual é o aprimoramento e desenvolvimento de aplicações web completas{" "}
                    <span style={{ color: "rgba(255,255,255,0.45)" }}>( futuro próximo: mobile )</span>, no front-end venho
                    estudando para criar interfaces cada vez mais ricas em detalhes, porém ao mesmo tempo fáceis de usar,
                    intuitivas e acessíveis.
                  </p>

                  <p style={p}>
                    Já no back-end me preocupo em criar APIs que sejam robustas e também eficientes e claro com segurança.
                  </p>

                  <p style={p}>
                    Com dados, confesso que ainda preciso adentrar e me aprofundar mais, porém o conhecimento já adquirido
                    me proporciona modelar bem e fazer consultas. Já utilizei bancos relacionais e não relacionais ao criar
                    alguns projetos pessoais, justo para aprendizado!
                  </p>

                  <p style={p}>
                    O que eu sempre tento é unir uma boa lógica, que seja legível à qualquer um que bata o olho, e gosto de
                    expandir a criatividade. Eu me esforço pra entregar sempre algo muito bem feito, algo que seja agradável
                    de usar — e claro nisso em questão estarei sempre melhorando, à medida que eu for me aprimorando e
                    adquirindo experiência, isso vai melhorar em muito a qualidade!
                  </p>

                  <p style={p}>
                    Com este portfólio quero centralizar tudo e poder mostrar meus projetos, ainda tenho muitas ideias para
                    colocar em prática por aqui, e nesta jornada de transição posso afirmar que não tenho tanta pressa — eu
                    tenho a certeza de que de uma forma ou de outra eu vou chegar onde almejo!{" "}
                    <span style={cyan}>Sempre com muita consistência.</span>
                  </p>

                  <p style={p}>
                    Se você precisa de uma pessoa esforçada, com força de vontade e persistente na sua equipe, uma pessoa
                    que vai fazer o máximo possível para fazer jus à oportunidade concedida,{" "}
                    <span style={pink}>estou aqui, vamos trocar uma ideia!</span>
                  </p>

                  <p style={{ ...p, marginBottom: 0 }}>
                    Se você tem um problema real e acredita que a tecnologia pode resolver, também estou aqui. Sinta-se à
                    vontade para me contatar, ou simplesmente para mandar um feedback ou conselho do que gostou ou do que
                    posso melhorar! Estarei atento e à espera do seu contato!{" "}
                    <span style={cyan}>Também estendo o convite para conversarmos pessoalmente quando quiser!! Até mais!</span>
                  </p>
                </>
              );
            })()}

            {/* Spacer */}
            <div style={{ height: 36 }} />

            {/* Timeline header */}
            <div id="timeline-section" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, rgba(0,234,255,0.3))" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(0,234,255,0.6)", textTransform: "uppercase" }}>Formação Acadêmica</span>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(0,234,255,0.3), transparent)" }} />
            </div>

            {/* Timeline */}
            <div style={{ position: "relative", paddingLeft: 28 }}>
              {/* Linha vertical */}
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
                <span style={{ fontSize: "1.2rem", color: "rgba(0,234,255,0.55)", letterSpacing: "0.1em" }}>26 / JAN / 2024</span>
                <p style={{ margin: "4px 0 0", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                  <strong style={{ color: "#fff" }}>Bacharelado em Sistemas para Internet</strong><br />
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>Desenvolvimento Web Full Stack · Unicesumar</span>
                </p>
              </div>

              {/* Item 2 */}
              <div style={{ position: "relative", marginBottom: 28 }}>
                <div style={{
                  position: "absolute", left: -24, top: 5,
                  width: 10, height: 10, borderRadius: "50%",
                  background: "#BD00FF", boxShadow: "0 0 8px #BD00FF",
                }} />
                <span style={{ fontSize: "1.2rem", color: "rgba(189,0,255,0.65)", letterSpacing: "0.1em" }}>27 / MAR / 2025</span>
                <p style={{ margin: "4px 0 0", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                  <strong style={{ color: "#fff" }}>Pós-Graduação lato sensu</strong><br />
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>Desenvolvimento de Sistemas em Python · Concluído</span>
                </p>
              </div>

              {/* Item 3 — Cursando */}
              <div style={{ position: "relative", marginBottom: 28 }}>
                <div style={{
                  position: "absolute", left: -24, top: 5,
                  width: 10, height: 10, borderRadius: "50%",
                  background: "transparent", border: "2px solid #FF2D78",
                  boxShadow: "0 0 8px #FF2D78",
                  animation: "hex-color-pulse 2s ease-in-out infinite",
                }} />
                <span style={{ fontSize: "1.2rem", color: "rgba(255,45,120,0.7)", letterSpacing: "0.1em" }}>01 / JUN / 2025 · CURSANDO</span>
                <p style={{ margin: "4px 0 0", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                  <strong style={{ color: "#fff" }}>Pós-Graduação lato sensu</strong><br />
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>Negócios Digitais e Inovação</span>
                </p>
                <span style={{
                  display: "inline-block", marginTop: 6, fontSize: 9, letterSpacing: "0.15em",
                  padding: "2px 8px", borderRadius: 4,
                  border: "1px solid rgba(255,45,120,0.5)", color: "#FF2D78",
                  textTransform: "uppercase",
                }}>
                  Em andamento
                </span>
              </div>

              {/* Item 4 — Inglês */}
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", left: -24, top: 5,
                  width: 10, height: 10, borderRadius: "50%",
                  background: "#00ff88", boxShadow: "0 0 8px #00ff88",
                }} />
                <span style={{ fontSize: "1.2rem", color: "rgba(0,255,136,0.65)", letterSpacing: "0.1em" }}>Idiomas</span>
                <p style={{ margin: "4px 0 0", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                  <strong style={{ color: "#fff" }}>Inglês</strong>{" "}
                  <span style={{ color: "rgba(0,234,255,0.8)" }}>( básico · em evolução para intermediário )</span><br />
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>
                    Com ênfase em termos técnicos e vocabulário relacionado à programação.
                    Suficiente para comunicação efetiva no ambiente de desenvolvimento de software.
                  </span>
                </p>
              </div>
            </div>

            {/* Spacer */}
            <div style={{ height: 36 }} />

          </div>

          {/* Scroll down — fixo no rodapé do painel */}
          <div style={{
            flexShrink: 0, display: "flex", justifyContent: "center",
            padding: "12px 0 14px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(3,17,31,0.4)",
          }}>
            <button
              onClick={() => document.getElementById("sobre-content")?.scrollBy({ top: 200, behavior: "smooth" })}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                color: "#00EAFF", animation: "scroll-bounce 1.8s ease-in-out infinite",
                opacity: 0.7, transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
            >
              <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "inherit" }}>scroll down</span>
              <IoChevronDownOutline size={18} />
            </button>
          </div>

          </div>
        </div>
      </div>
    </main>
  );
}
