import CyberpunkBackground from "./components/CyberpunkBackground";
import HeroPhoto from "./components/HeroPhoto";

export default function Page() {
  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-7 gap-8 lg:gap-0">

        {/* Left — nome */}
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
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

          <p
            className="text-sm lg:text-base font-light tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Desenvolvedor Front-End
          </p>
        </div>

        {/* Right — foto hexagonal com parallax */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="scale-75 xl:scale-100 origin-center">
            <HeroPhoto size={476} />
          </div>
        </div>

      </div>
    </main>
  );
}
