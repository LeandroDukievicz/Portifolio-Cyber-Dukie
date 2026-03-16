"use client";

import { useEffect, useMemo, useState } from "react";

const N             = 200;
const SIZE          = 200;
const DOT_RADIUS    = 2;
const CENTER        = SIZE / 2;
const MAX_RADIUS    = CENTER - DOT_RADIUS - 4;
const GOLDEN_ANGLE  = Math.PI * (3 - Math.sqrt(5));
const ANIM_DURATION = 3;

const LOADING_TEXT  = "Iniciando Portfolio";
const CHAR_DELAY_MS = 55;
const PROGRESS_MS   = 2400;
const LS_KEY        = "portfolio-loaded";
const HTML_CLASS    = "fl";

function dotColor(frac: number): string {
  if (frac < 0.4)  return "#00EAFF";
  if (frac < 0.75) return "#BD00FF";
  return "#FF2D78";
}

export default function LoadingScreen() {
  // null  = ainda não determinado (antes de montar no cliente)
  // true  = primeira visita, exibir
  // false = já viu antes, não exibir
  const [show,      setShow]      = useState<boolean | null>(null);
  const [fadeOut,   setFadeOut]   = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [charCount, setCharCount] = useState(0);

  const dots = useMemo(() => {
    const round3 = (n: number) => Math.round(n * 1000) / 1000;
    const result: { cx: number; cy: number; frac: number; color: string }[] = [];
    for (let i = 0; i < N; i++) {
      const frac  = (i + 0.5) / N;
      const r     = Math.sqrt(frac) * MAX_RADIUS;
      const theta = i * GOLDEN_ANGLE;
      result.push({
        cx:    round3(CENTER + r * Math.cos(theta)),
        cy:    round3(CENTER + r * Math.sin(theta)),
        frac,
        color: dotColor(frac),
      });
    }
    return result;
  }, []);

  // Fase 1 — decide se deve exibir (só roda no cliente, após hidratação)
  useEffect(() => {
    // A classe 'fl' foi adicionada pelo script bloqueante no <head> se for primeira visita
    if (document.documentElement.classList.contains(HTML_CLASS)) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  // Fase 2 — animação, só inicia quando show === true
  useEffect(() => {
    if (!show) return;

    // Digitação
    let charTimer: ReturnType<typeof setTimeout>;
    const typeNext = (n: number) => {
      if (n > LOADING_TEXT.length) return;
      setCharCount(n);
      charTimer = setTimeout(() => typeNext(n + 1), CHAR_DELAY_MS);
    };
    charTimer = setTimeout(() => typeNext(0), 300);

    // Barra de progresso
    const startTime  = Date.now();
    let   pageLoaded = document.readyState === "complete";
    const onLoad     = () => { pageLoaded = true; };
    window.addEventListener("load", onLoad);

    const rafRef = { id: 0 };
    const tick   = () => {
      const pct = Math.min(100, ((Date.now() - startTime) / PROGRESS_MS) * 100);
      setProgress(Math.round(pct));
      if (pct < 100) rafRef.id = requestAnimationFrame(tick);
    };
    rafRef.id = requestAnimationFrame(tick);

    // Saída: espera progresso + página carregada
    const exitTimer = setTimeout(() => {
      const tryExit = () => {
        if (pageLoaded) {
          // Remove a classe ANTES do fade → body fica visível enquanto loading desaparece
          document.documentElement.classList.remove(HTML_CLASS);
          setFadeOut(true);
          setTimeout(() => {
            localStorage.setItem(LS_KEY, "1");
            setShow(false);
          }, 650);
        } else {
          setTimeout(tryExit, 80);
        }
      };
      tryExit();
    }, Math.max(PROGRESS_MS + 400, 1600));

    return () => {
      clearTimeout(charTimer);
      cancelAnimationFrame(rafRef.id);
      clearTimeout(exitTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [show]);

  // Não renderiza nada até saber se deve exibir (evita flash no SSR/hydration)
  if (!show) return null;

  const displayText = LOADING_TEXT.slice(0, charCount);
  const typing      = charCount < LOADING_TEXT.length;

  return (
    <div
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9999,
        background:     "#000",
        visibility:     "visible", // sobrepõe o body { visibility: hidden } do CSS
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            36,
        opacity:        fadeOut ? 0 : 1,
        transition:     "opacity 0.65s ease",
        pointerEvents:  fadeOut ? "none" : "auto",
      }}
    >
      {/* Espiral girassol */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ overflow: "visible" }}
      >
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={DOT_RADIUS}
            fill={dot.color}
            opacity={0.55}
          >
            <animate
              attributeName="r"
              values="0.8;3;0.8"
              dur={`${ANIM_DURATION}s`}
              begin={`${dot.frac * ANIM_DURATION}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.25;1;0.25"
              dur={`${ANIM_DURATION}s`}
              begin={`${dot.frac * ANIM_DURATION}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Texto + barra */}
      <div style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        gap:           14,
        fontFamily:    "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, minHeight: 22 }}>
          <span style={{ color: "#00EAFF", fontSize: "0.92rem", userSelect: "none" }}>{">"}</span>
          <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.92rem", letterSpacing: "0.07em" }}>
            {displayText}
          </span>
          <span style={{
            color:     "#00EAFF",
            fontSize:  "0.92rem",
            opacity:   typing ? 1 : 0,
            animation: typing ? "ls-blink 0.7s step-end infinite" : "none",
          }}>_</span>
        </div>

        <div style={{ width: 240, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{
            height:       "100%",
            width:        `${progress}%`,
            background:   "linear-gradient(90deg, #00EAFF 0%, #BD00FF 55%, #FF2D78 100%)",
            borderRadius: 999,
            transition:   "width 0.08s linear",
            boxShadow:    "0 0 10px rgba(0,234,255,0.45)",
          }} />
        </div>

        <span style={{ color: "rgba(0,234,255,0.45)", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
          {progress}%
        </span>
      </div>

      <style>{`@keyframes ls-blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}
