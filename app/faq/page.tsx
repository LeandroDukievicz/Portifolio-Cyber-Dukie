"use client";

import { useEffect, useState } from "react";
import CyberpunkBackground from "../components/CyberpunkBackground";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";

const FAQ_PT = [
  {
    q: "O que é este portfólio?",
    a: "Este é o portfólio de Leandro Dukiévicz, desenvolvedor Front-End especializado em React, Next.js e TypeScript. O objetivo é apresentar projetos, habilidades e formas de contato de maneira interativa e moderna.",
  },
  {
    q: "Qual é o stack deste portfólio?",
    a: "O portfólio foi construído com Next.js 15 (App Router), TypeScript, Tailwind CSS v4 e GSAP para animações. O deploy é feito na Vercel com integração contínua via GitHub.",
  },
  {
    q: "Leandro está disponível para novos projetos?",
    a: "Sim! Estou disponível para projetos freelance, oportunidades remotas e presenciais. Você pode entrar em contato pelo formulário da página de Contato ou diretamente pelo LinkedIn e e-mail.",
  },
  {
    q: "Como posso entrar em contato?",
    a: "Você pode entrar em contato através da página /contato do portfólio, pelo e-mail leandrodukievicz1718@gmail.com, pelo LinkedIn (linkedin.com/in/leandrodukievicz) ou pelo GitHub (github.com/LeandroDukievicz).",
  },
  {
    q: "Como baixar o currículo?",
    a: "O currículo pode ser baixado diretamente pela página inicial do portfólio, clicando no botão 'Baixar Currículo', ou digitando 'cv' no terminal.",
  },
  {
    q: "Você trabalha sozinho ou em equipe?",
    a: "Eu trabalho bem nos dois cenários. Posso trabalhar com squads ágeis (Scrum, Kanban) e comunicação assíncrona com times distribuídos, mas também tenho autonomia suficiente para tocar meus projetos como desenvolvedor independente, consigo gerenciar o escopo, prazos e entregas sem supervisão constante.",
  },
];

const FAQ_EN = [
  {
    q: "What is this portfolio?",
    a: "This is the portfolio of Leandro Dukiévicz, a Front-End developer specialized in React, Next.js, and TypeScript. The goal is to present projects, skills, and contact information in an interactive and modern way.",
  },
  {
    q: "What is this portfolio's stack?",
    a: "The portfolio was built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and GSAP for animations. It is deployed on Vercel with continuous integration via GitHub.",
  },
  {
    q: "Is Leandro available for new projects?",
    a: "Yes! I am available for freelance projects, remote and on-site opportunities. You can reach out through the Contact page form or directly via LinkedIn and email.",
  },
  {
    q: "How can I get in touch?",
    a: "You can get in touch through the /contact page, via email at leandrodukievicz1718@gmail.com, LinkedIn (linkedin.com/in/leandrodukievicz), or GitHub (github.com/LeandroDukievicz).",
  },
  {
    q: "How do I download the resume?",
    a: "The resume can be downloaded directly from the portfolio's home page by clicking the 'Download CV' button, or by typing 'cv' in the terminal.",
  },
  {
    q: "Do you work alone or in a team?",
    a: "I work well in both scenarios. I can work with agile squads (Scrum, Kanban) and async communication with distributed teams, but I also have enough autonomy to run my own projects as an independent developer — managing scope, deadlines, and deliverables without constant supervision.",
  },
];

export default function FaqPage() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = lang === "pt" ? FAQ_PT : FAQ_EN;

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

  const windowStyle: React.CSSProperties = {
    position: "fixed",
    top: isMobile ? 36 : 48,
    left: isMobile ? 62 : "7.5vw",
    width: isMobile ? "calc(100vw - 70px)" : "85vw",
    bottom: isMobile ? 8 : 186,
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

  return (
    <main id="main-content" className="w-full h-screen overflow-hidden relative">
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
          <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", flexShrink: 0 }} />
          <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", flexShrink: 0 }} />
          <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            {lang === "pt" ? "faq.md — perguntas frequentes" : "faq.md — frequently asked questions"}
          </span>
        </div>

        {/* Content */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: isMobile ? "16px 20px" : "32px 48px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}>

          {/* Heading */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
            <h1 style={{
              margin: 0, fontSize: isMobile ? 16 : 20, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              background: "linear-gradient(90deg, #00EAFF 0%, #BD00FF 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {lang === "pt" ? "Perguntas Frequentes" : "Frequently Asked Questions"}
            </h1>
            <span style={{
              marginLeft: 3, fontSize: isMobile ? 16 : 20, fontWeight: 300,
              color: "#00EAFF",
              animation: "cursor-blink 1s step-end infinite",
            }}>|</span>
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #00EAFF55, #BD00FF55, transparent)", marginBottom: 28 }} />

          {/* FAQ accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "85%", margin: "0 auto" }}>
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  style={{
                    borderRadius: 8,
                    border: `1px solid ${isOpen ? "rgba(0,234,255,0.35)" : "rgba(255,255,255,0.08)"}`,
                    background: isOpen ? "rgba(0,234,255,0.04)" : "rgba(255,255,255,0.02)",
                    transition: "border-color 0.2s, background 0.2s",
                    overflow: "hidden",
                  }}
                >
                  {/* Question */}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                      padding: isMobile ? "14px 16px" : "16px 20px",
                      background: "transparent", border: "none", cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{
                      fontSize: isMobile ? "0.85rem" : "0.95rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      color: isOpen ? "#00EAFF" : "rgba(255,255,255,0.85)",
                      transition: "color 0.2s",
                      lineHeight: 1.5,
                    }}>
                      <span style={{ color: "#FF00FF", marginRight: 8 }}>{`>`}</span>
                      {item.q}
                    </span>
                    <span style={{ color: "#00EAFF", flexShrink: 0 }}>
                      {isOpen
                        ? <IoChevronUpOutline size={16} />
                        : <IoChevronDownOutline size={16} />
                      }
                    </span>
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <div style={{
                      padding: isMobile ? "0 16px 16px 16px" : "0 20px 18px 44px",
                      fontSize: isMobile ? "0.82rem" : "0.9rem",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.8,
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      paddingTop: 14,
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ height: 32 }} />
        </div>
      </div>
    </main>
  );
}
