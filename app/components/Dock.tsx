"use client";

import { useEffect, useRef } from "react";
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

  const renderItem = (item: NavItem, i: number, liClass: string, refFn?: (el: HTMLLIElement | null) => void) => (
    <li
      key={`${item.labelKey}-${i}`}
      ref={refFn}
      className={liClass}
    >
      {item.kind === "link" ? (
        <Link href={item.href} className={innerClass}>
          <span className="text-[22px] md:text-[34px]">
            <item.icon style={{ color: "var(--dock-icon-color)", filter: "var(--dock-icon-filter)" }} suppressHydrationWarning />
          </span>
          <span className="text-[8px] md:text-[10px] font-medium" style={{ color: "var(--dock-text-color)" }}>{t.dock[item.labelKey]}</span>
        </Link>
      ) : (
        <button onClick={open} aria-label={t.dock[item.labelKey]} type="button" className={`${innerClass} cursor-pointer bg-transparent border-none w-full`}>
          <span className="text-[22px] md:text-[34px]">
            <item.icon style={{ color: "var(--dock-icon-color)", filter: "var(--dock-icon-filter)" }} suppressHydrationWarning />
          </span>
          <span className="text-[8px] md:text-[10px] font-medium" style={{ color: "var(--dock-text-color)" }}>{t.dock[item.labelKey]}</span>
        </button>
      )}
    </li>
  );

  return (
    <>
      {/* ── MOBILE: dock vertical lado esquerdo ── */}
      <nav aria-label="Navegação principal" className="md:hidden fixed left-0 top-0 h-full z-[150] flex">
        <ul className="
          flex flex-col items-center justify-evenly h-full w-[54px]
          m-0 list-none py-3
          bg-white/10 backdrop-blur-md
          border-r border-white/20
          shadow-[4px_0_20px_rgba(0,0,0,0.3)]
        ">
          {NAV_ITEMS.filter(item => item.kind === "link").map((item, i) =>
            renderItem(item, i, "w-full flex-1")
          )}
        </ul>
      </nav>

      {/* ── DESKTOP: dock horizontal bottom center ── */}
      <nav aria-label="Navegação principal" className="hidden md:flex fixed bottom-[30px] inset-x-auto left-1/2 -translate-x-1/2 justify-center z-[150]">
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
          {NAV_ITEMS.map((item, i) =>
            renderItem(item, i, "w-[67px] h-[67px] mx-1", (el) => { if (el) itemsRef.current[i] = el; })
          )}
        </ul>
      </nav>
    </>
  );
}
