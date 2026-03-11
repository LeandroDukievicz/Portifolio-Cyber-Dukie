"use client";

import CyberpunkBackground from "./components/CyberpunkBackground";
import HeroPhoto from "./components/HeroPhoto";
import { FaFloppyDisk } from "react-icons/fa6";
import { useTerminal } from "./context/TerminalContext";
import { useLanguage } from "./context/LanguageContext";

export default function Page() {
  const { triggerHireFlow } = useTerminal();
  const { t } = useLanguage();

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

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
            className="max-w-md text-[1.1rem] font-light leading-relaxed"
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
          <div className="flex flex-col sm:flex-row justify-between w-full mt-2 gap-3 sm:gap-0">
            {/* Contrate-me */}
            <div className="cta-btn-wrap">
              <a href="/contato" className="cta-btn cta-btn-primary">
                <span>{t.ctaHire}</span>
              </a>
              <div className="cta-btn-shadow" />
            </div>

            {/* Baixar CV */}
            <div className="cta-btn-wrap">
              <button onClick={() => triggerHireFlow(t.terminal.toast)} className="cta-btn cta-btn-secondary">
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
