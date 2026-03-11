"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { VscCode } from "react-icons/vsc";
import { IoLanguageOutline } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";

function formatTime(date: Date): string {
  const weekday = date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
  const day = date.getDate();
  const month = date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return `${cap(weekday)} ${day} ${cap(month)} ${hour12}:${minutes} ${ampm}`;
}

export default function MenuBar() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>("");
  const { lang, toggle, t } = useLanguage();

  useEffect(() => {
    setTime(formatTime(new Date()));
    const interval = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  if (pathname.startsWith("/blog")) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3"
      style={{
        height: "28px",
        background: "rgba(10, 10, 20, 0.55)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Left — logo + name */}
      <div className="flex items-center gap-2 text-white">
        <VscCode size={15} />
        <span className="font-semibold" style={{ fontSize: "13px" }}>{t.portfolioTitle}</span>
      </div>

      {/* Center — Language switcher */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button
          onClick={toggle}
          title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
          className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity duration-200"
        >
          <IoLanguageOutline size={15} className="text-white" />
          <span className="text-white/60" style={{ fontSize: "11px" }}>
            {lang === "pt" ? "PT" : "EN"}
          </span>
        </button>
      </div>

      {/* Right — clock */}
      {time && (
        <span className="hidden sm:inline text-white/90" style={{ fontSize: "12px" }}>{time}</span>
      )}
    </div>
  );
}
