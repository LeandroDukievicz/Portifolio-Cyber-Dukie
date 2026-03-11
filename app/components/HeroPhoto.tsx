"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const HEX_PATH =
  "M 15.36,22 L 43.07,6 Q 50,2 56.93,6 L 84.64,22 Q 91.57,26 91.57,34 L 91.57,66 Q 91.57,74 84.64,78 L 56.93,94 Q 50,98 43.07,94 L 15.36,78 Q 8.43,74 8.43,66 L 8.43,34 Q 8.43,26 15.36,22 Z";

function hexClipPath(size: number) {
  const s = size / 100;
  return `path("M ${15.36*s},${22*s} L ${43.07*s},${6*s} Q ${50*s},${2*s} ${56.93*s},${6*s} L ${84.64*s},${22*s} Q ${91.57*s},${26*s} ${91.57*s},${34*s} L ${91.57*s},${66*s} Q ${91.57*s},${74*s} ${84.64*s},${78*s} L ${56.93*s},${94*s} Q ${50*s},${98*s} ${43.07*s},${94*s} L ${15.36*s},${78*s} Q ${8.43*s},${74*s} ${8.43*s},${66*s} L ${8.43*s},${34*s} Q ${8.43*s},${26*s} ${15.36*s},${22*s} Z")`;
}

export default function HeroPhoto({ size = 476 }: { size?: number }) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const redOffRef     = useRef<SVGFEOffsetElement>(null);
  const blueOffRef    = useRef<SVGFEOffsetElement>(null);
  const isHoveringRef = useRef(false);
  const hoverTRef     = useRef(0);

  // Parallax
  useEffect(() => {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 22;
      targetY = (e.clientY / window.innerHeight - 0.5) * 22;
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      currentX = lerp(currentX, targetX, 0.07);
      currentY = lerp(currentY, targetY, 0.07);
      if (containerRef.current)
        containerRef.current.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMouseMove); cancelAnimationFrame(raf); };
  }, []);

  // RGB glitch
  useEffect(() => {
    let t = 0;
    let raf: number;

    const tick = () => {
      t += 0.018;

      // Smooth hover transition
      if (isHoveringRef.current) hoverTRef.current = Math.min(1, hoverTRef.current + 0.04);
      else                        hoverTRef.current = Math.max(0, hoverTRef.current - 0.025);
      const h = hoverTRef.current;

      // Intensity: sutil em repouso, dramático no hover
      const base   = 1.5;
      const peak   = 18;
      const intensity = base + h * (peak - base);

      // Canais R e B pulsam com fases independentes
      const rx = Math.sin(t * 0.71)  * intensity;
      const ry = Math.sin(t * 1.37)  * intensity * 0.25;
      const bx = Math.sin(t * 0.93 + 2.1) * -intensity;
      const by = Math.cos(t * 1.13 + 1.0) * intensity * 0.25;

      redOffRef.current?.setAttribute("dx",  rx.toFixed(2));
      redOffRef.current?.setAttribute("dy",  ry.toFixed(2));
      blueOffRef.current?.setAttribute("dx", bx.toFixed(2));
      blueOffRef.current?.setAttribute("dy", by.toFixed(2));

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: size, height: size, willChange: "transform" }}
    >
      {/* SVG filter — RGB channel split */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="rgb-glitch" x="-25%" y="-25%" width="150%" height="150%">
            {/* Canal R */}
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
            <feOffset ref={redOffRef} in="r" dx="0" dy="0" result="r-off"/>

            {/* Canal G — fixo no centro */}
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>

            {/* Canal B */}
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
            <feOffset ref={blueOffRef} in="b" dx="0" dy="0" result="b-off"/>

            {/* Combinação aditiva via screen blend */}
            <feBlend in="r-off" in2="g"     mode="screen" result="rg"/>
            <feBlend in="rg"    in2="b-off" mode="screen"/>
          </filter>
        </defs>
      </svg>

      {/* Imagem com clip hexagonal + filtro RGB */}
      <div
        style={{
          width: size, height: size,
          clipPath: hexClipPath(size),
          padding: "24px",
          boxSizing: "border-box",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          filter: "url(#rgb-glitch)",
        }}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        onMouseLeave={() => { isHoveringRef.current = false; }}
      >
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Image
            src="/images/foto-1.webp"
            alt="Leandro Dukievicz"
            width={size}
            height={size}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      {/* SVG borders */}
      <svg
        viewBox="0 0 100 100"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          overflow: "visible",
          animation: "hex-glow-pulse 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#00EAFF" />
            <stop offset="50%"  stopColor="#BD00FF" />
            <stop offset="100%" stopColor="#FF2D78" />
          </linearGradient>
        </defs>

        {/* Glow — borda interna */}
        <path d={HEX_PATH} fill="none" stroke="url(#hex-grad)" strokeWidth="2.5" opacity="0.4" style={{ filter: "blur(3px)" }} />
        {/* Borda interna */}
        <path d={HEX_PATH} fill="none" stroke="url(#hex-grad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Glow — borda externa */}
        <path d={HEX_PATH} fill="none" stroke="url(#hex-grad)" strokeWidth="2.5" opacity="0.4"
          transform="translate(50,50) scale(1.101) translate(-50,-50)" style={{ filter: "blur(3px)" }} />
        {/* Borda externa */}
        <path d={HEX_PATH} fill="none" stroke="url(#hex-grad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          transform="translate(50,50) scale(1.101) translate(-50,-50)" />
      </svg>
    </div>
  );
}
