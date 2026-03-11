import CyberpunkBackground from "./components/CyberpunkBackground";
import HeroPhoto from "./components/HeroPhoto";

export default function Page() {
  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      {/* Hero layout */}
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 md:px-12 lg:px-20 pt-7 gap-6 lg:gap-0">

        {/* Left — texto */}
        <div className="flex flex-col gap-4 lg:gap-5 max-w-lg text-center lg:text-left">
          <p
            className="text-xs font-medium tracking-[0.3em] uppercase"
            style={{ color: "#00EAFF" }}
          >
            Olá, eu sou
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Leandro<br />
            <span style={{
              background: "linear-gradient(90deg, #00EAFF, #FF00FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Dukievicz
            </span>
          </h1>

          <p
            className="text-base lg:text-xl font-light tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Dev Front&#8209;End
          </p>

          <div
            className="h-px w-24 mx-auto lg:mx-0"
            style={{ background: "linear-gradient(90deg, #00EAFF, transparent)" }}
          />

          <p
            className="text-sm font-light leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Construindo experiências digitais únicas,<br />
            onde código encontra criatividade.
          </p>
        </div>

        {/* Right — foto hexagonal com parallax */}
        <div className="hidden md:flex items-center justify-center lg:mb-24 lg:mr-24">
          {/* Escala a foto conforme o breakpoint via CSS */}
          <div className="scale-[0.6] md:scale-[0.7] lg:scale-100 origin-center">
            <HeroPhoto size={476} />
          </div>
        </div>

      </div>
    </main>
  );
}
