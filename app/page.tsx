"use client";

import { useState, useEffect } from "react";
import CyberpunkBackground from "./components/CyberpunkBackground";
import HeroPhoto from "./components/HeroPhoto";
import { FaFloppyDisk } from "react-icons/fa6";
import { useTerminal } from "./context/TerminalContext";
import { useLanguage } from "./context/LanguageContext";

export default function Page() {
  const { triggerHireFlow } = useTerminal();
  const { t, lang } = useLanguage();
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

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

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      {/* Toast mobile — melhor experiência no desktop */}
      {showToast && (
        <div
          onClick={dismissToast}
          style={{
            position: "fixed",
            bottom: 80,
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

      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-7 gap-8 lg:gap-0">

        {/* Left — nome */}
        <div className="flex flex-col gap-4 items-start mx-4 sm:mx-8 md:mx-16 lg:ml-[3vw] xl:ml-[4vw] 2xl:ml-[0px] lg:mr-0 mt-4 lg:-mt-[100px] w-full lg:w-auto min-w-0">
          <h1
            className="text-[3.15rem] md:text-[4.2rem] lg:text-[5rem] xl:text-[6.3rem] font-extrabold leading-tight"
            style={{
              background: "linear-gradient(160deg, #ffffff 0%, #e2e2e2 40%, #a8a8a8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(4px 5px 1px rgba(0,0,0,0.55)) " +
                "drop-shadow(0px 12px 20px rgba(0,0,0,0.3))",
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
            }}
          />

          <p
            className="w-full text-center text-sm lg:text-base font-light tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {t.subtitle}
          </p>

          <p
            className="max-w-md text-[1.1rem] font-light leading-relaxed text-justify"
            style={{
              background: "linear-gradient(160deg, #ffffff 0%, #e2e2e2 40%, #a8a8a8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(2px 3px 1px rgba(0,0,0,0.55)) " +
                "drop-shadow(0px 8px 16px rgba(0,0,0,0.3))",
            }}
          >
            {t.bio}
          </p>

          {/* CTAs */}
          <div className="flex flex-row justify-between w-full mt-2 gap-3">
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
        <div className="hidden lg:flex items-start justify-center flex-shrink-0 lg:mr-[3vw] xl:mr-[4vw] 2xl:mr-[0px] lg:-mt-[100px]">
          <div className="scale-90 2xl:scale-120 origin-center">
            <HeroPhoto size={476} />
          </div>
        </div>

      </div>
    </main>
  );
}
