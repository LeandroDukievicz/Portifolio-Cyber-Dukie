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
  const dockRef  = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const { open } = useTerminal();
  const { t } = useLanguage();

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
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:bottom-[70px] md:left-1/2 md:-translate-x-1/2 flex justify-center z-50">
      <ul
        ref={dockRef}
        className="
          w-full grid grid-cols-4 sm:grid-cols-7
          md:w-auto md:grid-cols-none md:inline-flex md:items-end md:justify-center
          rounded-xl px-2 py-2 md:px-4 md:py-3 m-0 list-none
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-[0_-4px_30px_rgba(0,0,0,0.3)]
        "
      >
        {NAV_ITEMS.map((item, i) => (
          <li
            key={item.labelKey}
            ref={(el) => { if (el) itemsRef.current[i] = el; }}
            className="h-14 sm:h-16 md:w-[67px] md:h-[67px] md:mx-1"
          >
            {item.kind === "link" ? (
              <Link href={item.href} className={innerClass}>
                <span className="text-[26px] md:text-[34px]">
                  <item.icon style={{ color: "var(--dock-icon-color)", filter: "var(--dock-icon-filter)" }} suppressHydrationWarning />
                </span>
                <span className="text-[10px] font-medium" style={{ color: "var(--dock-text-color)" }}>{t.dock[item.labelKey]}</span>
              </Link>
            ) : (
              <button onClick={open} className={`${innerClass} cursor-pointer bg-transparent border-none w-full`}>
                <span className="text-[26px] md:text-[34px]">
                  <item.icon style={{ color: "var(--dock-icon-color)", filter: "var(--dock-icon-filter)" }} suppressHydrationWarning />
                </span>
                <span className="text-[10px] font-medium" style={{ color: "var(--dock-text-color)" }}>{t.dock[item.labelKey]}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
