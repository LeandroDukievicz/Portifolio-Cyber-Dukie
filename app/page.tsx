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
        <div className="flex flex-col gap-4 items-start ml-[200px] -mt-[100px]">
          <h1
            className="text-[3.15rem] md:text-[4.2rem] lg:text-[6.3rem] font-extrabold leading-tight"
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
          <div className="flex justify-between w-full mt-2">
            {/* Contrate-me */}
            <a
              href="/contato"
              className="px-6 py-3 font-semibold text-sm tracking-widest uppercase rounded-lg transition-all duration-300"
              style={{
                background: "linear-gradient(90deg, #00EAFF, #BD00FF)",
                color: "#fff",
                boxShadow: "0 0 18px #BD00FF66",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 30px #BD00FFaa")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 18px #BD00FF66")}
            >
              {t.ctaHire}
            </a>

            {/* Baixar CV */}
            <button
              onClick={() => triggerHireFlow(t.terminal.toast)}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-widest uppercase rounded-lg border transition-all duration-300 cursor-pointer"
              style={{
                borderColor: "#00EAFF88",
                color: "#00EAFF",
                background: "transparent",
                boxShadow: "0 0 12px #00EAFF33",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 24px #00EAFF66")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 12px #00EAFF33")}
            >
              <FaFloppyDisk size={16} />
              {t.ctaCV}
            </button>
          </div>
        </div>

        {/* Right — foto hexagonal com parallax */}
        <div className="hidden lg:flex items-start justify-center mr-[100px] -mt-[100px]">
          <div className="scale-90 xl:scale-120 origin-center">
            <HeroPhoto size={476} />
          </div>
        </div>

      </div>
    </main>
  );
}
