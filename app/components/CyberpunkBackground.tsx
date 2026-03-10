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

function randomVelocity() {
  return (Math.random() - 0.5) * 0.25;
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

    const tick = () => {
      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;

        // bounce nas bordas com pequena aleatoriedade
        if (b.x < -15) { b.x = -15; b.vx = Math.abs(b.vx) + Math.random() * 0.05; }
        if (b.x > 115) { b.x = 115; b.vx = -(Math.abs(b.vx) + Math.random() * 0.05); }
        if (b.y < -15) { b.y = -15; b.vy = Math.abs(b.vy) + Math.random() * 0.05; }
        if (b.y > 115) { b.y = 115; b.vy = -(Math.abs(b.vy) + Math.random() * 0.05); }

        // nudge aleatório ocasional para quebrar padrões
        if (Math.random() < 0.004) b.vx += (Math.random() - 0.5) * 0.15;
        if (Math.random() < 0.004) b.vy += (Math.random() - 0.5) * 0.15;

        // clamp velocidade
        b.vx = Math.max(-0.45, Math.min(0.45, b.vx));
        b.vy = Math.max(-0.45, Math.min(0.45, b.vy));
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
