import CyberpunkBackground from "./components/CyberpunkBackground";
import HeroPhoto from "./components/HeroPhoto";

export default function Page() {
  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-7 gap-8 lg:gap-0">

        {/* Left — nome */}
        <div className="flex flex-col gap-4 items-start ml-[200px]">
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
            Desenvolvedor Front-End
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
            Sou aficcionado em Tecnologia no geral, Em constante estudo e avanço para um aperfeiçoamento contínuo em desenvolver interfaces que sejam elegantes e ao mesmo tempo fáceis, intuitivas e bem modernas, Buscando sempre entregar melhor performance, detalhes e fluidez, porque acredito que as melhores interfaces são aquelas que desaparecem para o usuário final, deixando apenas a experiência.
          </p>
        </div>

        {/* Right — foto hexagonal com parallax */}
        <div className="hidden lg:flex items-center justify-center mr-[100px]">
          <div className="scale-75 xl:scale-100 origin-center">
            <HeroPhoto size={476} />
          </div>
        </div>

      </div>
    </main>
  );
}
