"use client";

import { useEffect } from "react";

const TITLE = "Bem vindo ao meu portifólio | Leandro Dukievicz | Dev Front End \u00a0\u00a0\u00a0";

export default function MarqueeTitle() {
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      document.title = TITLE.slice(index) + TITLE.slice(0, index);
      index = (index + 1) % TITLE.length;
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return null;
}
