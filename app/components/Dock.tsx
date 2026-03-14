"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { BsPerson, BsTerminal } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import { GoProject } from "react-icons/go";
import { MdOutlineContactMail } from "react-icons/md";
import { FaBlogger } from "react-icons/fa";
import { useTerminal } from "../context/TerminalContext";
import { useLanguage } from "../context/LanguageContext";

type NavItem =
  | { kind: "link";   labelKey: keyof ReturnType<typeof useLanguage>["t"]["dock"]; href: string;    icon: React.ElementType }
  | { kind: "button"; labelKey: keyof ReturnType<typeof useLanguage>["t"]["dock"]; action: "terminal"; icon: React.ElementType };

const NAV_ITEMS: NavItem[] = [
  { kind: "link",   labelKey: "home",     href: "/",        icon: IoHomeOutline           },
  { kind: "link",   labelKey: "about",    href: "/sobre",    icon: BsPerson                },
  { kind: "link",   labelKey: "skills",   href: "/skills",   icon: MdOutlineDesignServices },
  { kind: "link",   labelKey: "projects", href: "/projetos", icon: GoProject               },
  { kind: "link",   labelKey: "contact",  href: "/contato",  icon: MdOutlineContactMail    },
  { kind: "button", labelKey: "terminal", action: "terminal", icon: BsTerminal             },
  { kind: "link",   labelKey: "blog",     href: "/blog",     icon: FaBlogger               },
];

const MIN = 67;
const MAX = 144;
const BOUND = MIN * Math.PI;

export default function Dock() {
  const dockRef    = useRef<HTMLUListElement>(null);
  const itemsRef   = useRef<HTMLLIElement[]>([]);
  const { open }   = useTerminal();
  const { t }      = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fecha menu ao redimensionar para desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Bloqueia scroll do body quando menu está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // GSAP magnification no desktop
  useEffect(() => {
    const dock  = dockRef.current;
    const icons = itemsRef.current;
    if (!dock || icons.length === 0) return;

    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    gsap.set(icons, { transformOrigin: "50% 120%", height: 67 });
    gsap.set(dock,  { position: "relative", height: 96 });

    function updateIcons(pointer: number) {
      icons.forEach((icon, i) => {
        const distance = i * MIN + MIN / 2 - pointer;
        let x     = 0;
        let scale = 1;

        if (-BOUND < distance && distance < BOUND) {
          const rad = (distance / MIN) * 0.5;
          scale = 1 + (MAX / MIN - 1) * Math.cos(rad);
          x     = 2 * (MAX - MIN) * Math.sin(rad);
        } else {
          x = (-BOUND < distance ? 2 : -2) * (MAX - MIN);
        }

        gsap.to(icon, { duration: 0.3, x, scale });
      });
    }

    const onMouseMove  = (e: MouseEvent) => {
      const offset = dock.getBoundingClientRect().left + icons[0].offsetLeft;
      updateIcons(e.clientX - offset);
    };
    const onMouseLeave = () => gsap.to(icons, { duration: 0.3, scale: 1, x: 0 });

    dock.addEventListener("mousemove",  onMouseMove);
    dock.addEventListener("mouseleave", onMouseLeave);
    return () => {
      dock.removeEventListener("mousemove",  onMouseMove);
      dock.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const innerClass = "flex flex-col items-center justify-center gap-1 w-full h-full";

  return (
    <>
      {/* ── DESKTOP DOCK ── */}
      <div className="hidden md:flex fixed bottom-[70px] inset-x-auto left-1/2 -translate-x-1/2 justify-center z-[150]">
        <ul
          ref={dockRef}
          className="
            w-auto inline-flex items-end justify-center
            rounded-xl px-4 py-3 m-0 list-none
            bg-white/10 backdrop-blur-md
            border border-white/20
            shadow-[0_-4px_30px_rgba(0,0,0,0.3)]
          "
        >
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.labelKey}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              className="w-[67px] h-[67px] mx-1"
            >
              {item.kind === "link" ? (
                <Link href={item.href} className={innerClass}>
                  <span className="text-[34px]">
                    <item.icon style={{ color: "var(--dock-icon-color)", filter: "var(--dock-icon-filter)" }} suppressHydrationWarning />
                  </span>
                  <span className="text-[10px] font-medium" style={{ color: "var(--dock-text-color)" }}>{t.dock[item.labelKey]}</span>
                </Link>
              ) : (
                <button onClick={open} className={`${innerClass} cursor-pointer bg-transparent border-none w-full`}>
                  <span className="text-[34px]">
                    <item.icon style={{ color: "var(--dock-icon-color)", filter: "var(--dock-icon-filter)" }} suppressHydrationWarning />
                  </span>
                  <span className="text-[10px] font-medium" style={{ color: "var(--dock-text-color)" }}>{t.dock[item.labelKey]}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ── MOBILE: BOTÃO HAMBURGUER ── */}
      <button
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 28,
          right: 24,
          zIndex: 300,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "rgba(3,17,31,0.85)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${menuOpen ? "rgba(0,234,255,0.6)" : "rgba(255,255,255,0.2)"}`,
          boxShadow: menuOpen
            ? "0 0 20px rgba(0,234,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          cursor: "pointer",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* 3 linhas → X animado */}
        {[0, 1, 2].map(n => (
          <span
            key={n}
            style={{
              display: "block",
              width: 22,
              height: 2,
              borderRadius: 2,
              background: "#00EAFF",
              transformOrigin: "center",
              transition: "transform 0.3s ease, opacity 0.3s ease, background 0.3s",
              transform: menuOpen
                ? n === 0 ? "translateY(7px) rotate(45deg)"
                : n === 1 ? "scaleX(0)"
                : "translateY(-7px) rotate(-45deg)"
                : "none",
              opacity: menuOpen && n === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* ── MOBILE: OVERLAY MENU ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 250,
          pointerEvents: menuOpen ? "auto" : "none",
          background: menuOpen ? "rgba(3,17,31,0.92)" : "rgba(3,17,31,0)",
          backdropFilter: menuOpen ? "blur(20px)" : "blur(0px)",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        {NAV_ITEMS.filter(item => !(isMobile && item.kind === "button" && item.action === "terminal")).map((item, i) => {
          const content = (
            <>
              <span style={{ fontSize: 28, color: "#00EAFF", display: "flex", alignItems: "center" }}>
                <item.icon />
              </span>
              <span style={{
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
                color: "rgba(255,255,255,0.9)",
              }}>
                {t.dock[item.labelKey]}
              </span>
            </>
          );

          const itemStyle: React.CSSProperties = {
            display: "flex",
            alignItems: "center",
            gap: 20,
            width: "72vw",
            maxWidth: 320,
            padding: "14px 24px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            cursor: "pointer",
            textDecoration: "none",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.35s ease ${i * 45}ms, transform 0.35s ease ${i * 45}ms`,
          };

          if (item.kind === "link") {
            return (
              <Link
                key={item.labelKey}
                href={item.href}
                style={itemStyle}
                onClick={() => setMenuOpen(false)}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.labelKey}
              style={{ ...itemStyle, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              onClick={() => { open(); setMenuOpen(false); }}
            >
              {content}
            </button>
          );
        })}
      </div>
    </>
  );
}
