"use client";

import { useEffect } from "react";

const TITLE = "Bem vindo ao meu portifólio | Leandro Dukievicz | Dev Front End \u00a0\u00a0\u00a0";

export default function MarqueeTitle() {
  useEffect(() => {
    let index = 0;
    const titleInterval = setInterval(() => {
      document.title = TITLE.slice(index) + TITLE.slice(0, index);
      index = (index + 1) % TITLE.length;
    }, 150);

    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.src = "/favicon-1.svg";

    let angle = 0;
    let direction = 1;
    let faviconInterval: ReturnType<typeof setInterval>;

    img.onload = () => {
      faviconInterval = setInterval(() => {
        ctx.clearRect(0, 0, 64, 64);
        ctx.save();
        ctx.translate(32, 32);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(img, -32, -32, 64, 64);
        ctx.restore();
        link!.href = canvas.toDataURL("image/png");
        angle += direction * (Math.random() * 5 + 2);
        if (Math.random() < 0.05) direction *= -1;
      }, 50);
    };

    return () => {
      clearInterval(titleInterval);
      clearInterval(faviconInterval);
    };
  }, []);

  return null;
}
