"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "#BD00FF", // roxo neon
  "#FF00FF", // magenta
  "#FF2D78", // rosa neon
  "#0052F5", // azul elétrico
  "#00EAFF", // ciano neon
  "#7B00FF", // violeta profundo
  "#FF6600", // laranja neon
];

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
};

const SPEED = 0.12; // velocidade base (% do viewport por frame a 60fps)
const CLAMP = 0.18; // velocidade máxima absoluta — nunca excedida

function randomVelocity() {
  const v = (Math.random() * 0.5 + 0.5) * SPEED; // entre 50% e 100% de SPEED
  return Math.random() < 0.5 ? -v : v;
}

export default function CyberpunkBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const blobs: Blob[] = COLORS.map((color) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: randomVelocity(),
      vy: randomVelocity(),
      color,
      size: 45 + Math.random() * 35,
    }));

    let raf: number;
    let lastTime = 0;

    const tick = (now: number) => {
      // delta time normalizado a 60fps; cap em 50ms para evitar saltos após tab inativa
      const dt = lastTime === 0 ? 1 : Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;

      for (const b of blobs) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // bounce sem acúmulo de velocidade — só inverte a direção
        if (b.x < -15) { b.x = -15; b.vx =  Math.abs(b.vx); }
        if (b.x > 115) { b.x = 115; b.vx = -Math.abs(b.vx); }
        if (b.y < -15) { b.y = -15; b.vy =  Math.abs(b.vy); }
        if (b.y > 115) { b.y = 115; b.vy = -Math.abs(b.vy); }

        // nudge suave e pouco frequente para variar a trajetória
        if (Math.random() < 0.002) b.vx += (Math.random() - 0.5) * 0.06;
        if (Math.random() < 0.002) b.vy += (Math.random() - 0.5) * 0.06;

        // clamp estrito — velocidade nunca cresce além de CLAMP
        b.vx = Math.max(-CLAMP, Math.min(CLAMP, b.vx));
        b.vy = Math.max(-CLAMP, Math.min(CLAMP, b.vy));
      }

      el.style.backgroundImage = blobs
        .map(
          (b) =>
            `radial-gradient(ellipse ${b.size}% ${b.size}% at ${b.x.toFixed(2)}% ${b.y.toFixed(2)}%, ${b.color}cc 0%, transparent 68%)`
        )
        .join(", ");

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="w-screen h-screen overflow-hidden"
      style={{ background: "#03111F" }}
    />
  );
}
