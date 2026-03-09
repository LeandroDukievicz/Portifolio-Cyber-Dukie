"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import { GoProject } from "react-icons/go";
import { MdOutlineContactMail } from "react-icons/md";
import { FaBlogger } from "react-icons/fa";

const NAV_ITEMS = [
  { label: "Home",     href: "/",        icon: IoHomeOutline           },
  { label: "Sobre",    href: "/sobre",    icon: BsPerson                },
  { label: "Skills",   href: "/skills",   icon: MdOutlineDesignServices },
  { label: "Projetos", href: "/projetos", icon: GoProject               },
  { label: "Contato",  href: "/contato",  icon: MdOutlineContactMail    },
  { label: "Blog",     href: "/blog",     icon: FaBlogger               },
];

const MIN = 56;
const MAX = 120;
const BOUND = MIN * Math.PI;

export default function Dock() {
  const dockRef  = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const dock  = dockRef.current;
    const icons = itemsRef.current;
    if (!dock || icons.length === 0) return;

    gsap.set(icons, { transformOrigin: "50% 120%", height: 56 });
    gsap.set(dock,  { position: "relative", height: 80 });

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

    const onMouseMove = (e: MouseEvent) => {
      const offset = dock.getBoundingClientRect().left + icons[0].offsetLeft;
      updateIcons(e.clientX - offset);
    };

    const onMouseLeave = () => {
      gsap.to(icons, { duration: 0.3, scale: 1, x: 0 });
    };

    dock.addEventListener("mousemove",  onMouseMove);
    dock.addEventListener("mouseleave", onMouseLeave);

    return () => {
      dock.removeEventListener("mousemove",  onMouseMove);
      dock.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="fixed bottom-[50px] left-1/2 -translate-x-1/2 flex justify-center z-50">
      <ul
        ref={dockRef}
        className="
          inline-flex items-end justify-center
          rounded-xl
          px-4 py-3 m-0 list-none
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-[0_-4px_30px_rgba(0,0,0,0.3)]
        "
      >
        {NAV_ITEMS.map((item, i) => (
          <li
            key={item.href}
            ref={(el) => { if (el) itemsRef.current[i] = el; }}
            className="w-14 h-14 mx-1"
          >
            <Link href={item.href} className="flex flex-col items-center justify-center gap-1 w-full h-full">
              <item.icon size={28} style={{ color: "#808080", filter: "drop-shadow(0 0 6px rgba(0, 234, 255, 0.6))" }} suppressHydrationWarning />
              <span className="text-white text-[10px] font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
