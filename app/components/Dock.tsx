"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home",     href: "/" },
  { label: "Sobre",    href: "/sobre" },
  { label: "Skills",   href: "/skills" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato",  href: "/contato" },
  { label: "Blog",     href: "/blog" },
];

const MIN = 48;
const MAX = 120;
const BOUND = MIN * Math.PI;

export default function Dock() {
  const dockRef  = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const dock  = dockRef.current;
    const icons = itemsRef.current;
    if (!dock || icons.length === 0) return;

    gsap.set(icons, { transformOrigin: "50% 120%", height: 40 });
    gsap.set(dock,  { position: "relative", height: 60 });

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
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-center z-50">
      <ul
        ref={dockRef}
        className="
          inline-flex items-end justify-center
          rounded-xl
          px-4 py-2 m-0 list-none
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-[0_-4px_30px_rgba(0,0,0,0.3)]
        "
      >
        {NAV_ITEMS.map((item, i) => (
          <li
            key={item.href}
            ref={(el) => { if (el) itemsRef.current[i] = el; }}
            className="w-10 h-10 mx-1"
          >
            <Link
              href={item.href}
              className="
                flex items-center justify-center
                w-full h-full rounded-lg
                bg-white/20 backdrop-blur-sm
                border border-white/30
                text-white text-[10px] font-medium
                shadow-inner
                hover:bg-white/30 transition-colors
              "
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
