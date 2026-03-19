"use client";

import { useState, useEffect, useRef } from "react";
import CyberpunkBackground from "./components/CyberpunkBackground";
import HeroPhoto from "./components/HeroPhoto";
import { FaFloppyDisk } from "react-icons/fa6";
import { useTerminal } from "./context/TerminalContext";
import { useLanguage } from "./context/LanguageContext";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useStaggerVisible } from "@/hooks/useStaggerVisible";
import { buildPageSchema } from "@/lib/schema";

export default function Page() {
  const { triggerHireFlow } = useTerminal();
  const { t, lang } = useLanguage();
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  // 0: h1, 1: traço, 2: subtítulo (typewriter), 3: tagline, 4: bio, 5: CTAs
  const visible = useStaggerVisible(6, 130, 80);

  // Typewriter no subtítulo — começa só depois que o elemento 2 fica visível
  const { displayed: subtitleTyped } = useTypewriter(
    t.subtitle,
    45,
    visible[2] ? 0 : 99999
  );

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const timer = setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setToastVisible(true), 10);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const dismissToast = () => {
    setToastVisible(false);
    setTimeout(() => setShowToast(false), 400);
  };

  const fadeUp = (index: number): React.CSSProperties => ({
    opacity: visible[index] ? 1 : 0,
    transform: visible[index] ? "translateY(0)" : "translateY(18px)",
    transition: "opacity 0.55s ease, transform 0.55s ease",
  });

  return (
    <main className="w-full h-screen overflow-hidden relative">
      <CyberpunkBackground />

      {/* Toast mobile */}
      {showToast && (
        <div
          onClick={dismissToast}
          style={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: `translateX(-50%) translateY(${toastVisible ? "0" : "20px"})`,
            opacity: toastVisible ? 1 : 0,
            transition: "opacity 0.4s ease, transform 0.4s ease",
            zIndex: 400,
            background: "rgba(3,17,31,0.92)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(0,234,255,0.35)",
            borderRadius: 12,
            padding: "14px 18px",
            width: "82vw",
            maxWidth: 340,
            boxShadow: "0 0 24px rgba(0,234,255,0.12), 0 8px 32px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "1.1rem" }}>🖥️</span>
            <span style={{
              fontSize: "0.72rem",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#00EAFF",
              fontWeight: 600,
            }}>
              {lang === "pt" ? "Dica" : "Tip"}
            </span>
          </div>
          <p style={{
            fontSize: "0.78rem",
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.5,
            margin: 0,
          }}>
            {lang === "pt"
              ? "Para uma melhor experiência, navegue pelo portfólio na versão desktop."
              : "For the best experience, browse this portfolio on a desktop device."}
          </p>
          <span style={{
            alignSelf: "flex-end",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {lang === "pt" ? "toque para fechar" : "tap to close"}
          </span>
        </div>
      )}

      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-4 md:px-12 lg:px-20 pt-7 pb-4 lg:pb-0 gap-4 lg:gap-0 overflow-y-auto lg:overflow-hidden">

        {/* Left — nome */}
        <div data-home-left className="flex flex-col gap-4 items-start lg:ml-[3vw] xl:ml-[4vw] 2xl:ml-[0px] lg:mr-0 mt-1 sm:mt-4 lg:-mt-[100px] w-full lg:w-auto lg:min-w-[416px] xl:min-w-[448px]">

          <h1
            className="text-[1.5rem] sm:text-[2.5rem] md:text-[3.4rem] lg:text-[4rem] xl:text-[5rem] font-extrabold leading-tight"
            style={{
              WebkitFontSmoothing: "antialiased",
              opacity: visible[0] ? 0.95 : 0,
              transform: visible[0] ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
              textShadow: "0 0 20px rgba(255,255,255,0.15)",
            }}
          >
            Leandro<br />Dukievicz
          </h1>

          {/* Traço em degradê */}
          <div
            className="w-full h-[2px] rounded-full"
            style={{
              background: "linear-gradient(90deg, #00EAFF 0%, #BD00FF 50%, #FF2D78 100%)",
              boxShadow: "0 0 8px #BD00FF88",
              ...fadeUp(1),
            }}
          />

          <p
            className="w-full text-justify lg:text-center text-sm lg:text-base font-light tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.5)", ...fadeUp(2) }}
          >
            {subtitleTyped}
            {/* cursor piscante enquanto digita */}
            {!visible[2] || subtitleTyped.length < t.subtitle.length ? null : null}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                background: "rgba(255,255,255,0.5)",
                marginLeft: "2px",
                verticalAlign: "middle",
                animation: subtitleTyped.length < t.subtitle.length
                  ? "none"
                  : "cursor-blink 1s step-end infinite",
                opacity: subtitleTyped.length < t.subtitle.length ? 1 : 0,
              }}
            />
          </p>

          <p
            className="max-w-md text-[0.78rem] font-light leading-relaxed"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#00EAFF",
              letterSpacing: "0.03em",
              ...fadeUp(3),
            }}
          >
            Desenvolvedor focado em performance, acessibilidade e arquitetura de aplicações com React e Next.js.
          </p>

          <p
            className="max-w-md text-[0.9rem] font-light leading-relaxed text-justify"
            style={{
              WebkitFontSmoothing: "antialiased",
              textShadow: "0 0 20px rgba(255,255,255,0.15)",
              ...fadeUp(4),
              opacity: visible[4] ? 0.95 : 0,
            }}
          >
            {t.bio}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row w-full gap-4"
            style={fadeUp(5)}
          >
            {/* Contrate-me */}
            <div className="cta-btn-wrap flex-1">
              <a href="/contato" className="cta-btn cta-btn-primary w-full">
                <span>{t.ctaHire}</span>
              </a>
              <div className="cta-btn-shadow" />
            </div>

            {/* Baixar CV */}
            <div className="cta-btn-wrap flex-1">
              <button onClick={() => triggerHireFlow(t.terminal.toast)} className="cta-btn cta-btn-secondary w-full">
                <span><FaFloppyDisk size={15} />{t.ctaCV}</span>
              </button>
              <div className="cta-btn-shadow" />
            </div>
          </div>
        </div>

        {/* Right — foto hexagonal com parallax */}
        <div data-home-right className="hidden lg:flex items-start justify-center flex-shrink-0 lg:mr-[3vw] xl:mr-[4vw] 2xl:mr-[0px] lg:-mt-[100px]">
          <div className="scale-90 2xl:scale-120 origin-center">
            <HeroPhoto size={476} />
          </div>
        </div>

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPageSchema({
            type: "ProfilePage",
            name: "Leandro Dukiévicz — Desenvolvedor Full Stack",
            description: "Portfólio de Leandro Dukiévicz, desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Interfaces modernas, performáticas e acessíveis.",
            url: "https://devleandro.com.br",
          }))
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quem é Leandro Dukiévicz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Leandro Dukiévicz é um desenvolvedor Full Stack com foco em front-end, especializado em React, Next.js e TypeScript. Desenvolve interfaces modernas, performáticas e acessíveis, situado em Maringá, Paraná, Brasil."
                }
              },
              {
                "@type": "Question",
                "name": "Quais tecnologias Leandro Dukiévicz domina?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Leandro trabalha principalmente com React, Next.js e TypeScript no front-end, Node.js e Express no back-end, PostgreSQL e MySQL para banco de dados, além de Tailwind CSS e outras ferramentas modernas de desenvolvimento web."
                }
              },
              {
                "@type": "Question",
                "name": "Leandro Dukiévicz está disponível para projetos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim, Leandro está disponível para projetos freelance, oportunidades presenciais e remotas. Você pode entrar em contato pela página de contato do portfólio."
                }
              },
              {
                "@type": "Question",
                "name": "Como baixar o currículo de Leandro Dukiévicz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O currículo de Leandro pode ser baixado diretamente pela página inicial do portfólio, clicando no botão 'Baixar Currículo'."
                }
              },
              {
                "@type": "Question",
                "name": "Como entrar em contato com Leandro Dukiévicz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Você pode entrar em contato com Leandro pelo formulário da página de contato, pelo LinkedIn (linkedin.com/in/leandrodukievicz), GitHub (github.com/LeandroDukievicz) ou por e-mail em leandrodukievicz1718@gmail.com."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}
