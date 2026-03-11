"use client";

import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";

function format(date: Date): string {
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

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(format(new Date()));
    const interval = setInterval(() => setTime(format(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div
      className="fixed top-0 right-0 z-50 flex items-center gap-2 px-4 py-2 font-normal text-white tabular-nums select-none rounded-bl-xl"
      style={{
        fontSize: "10px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px) saturate(180%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.15), inset 1px 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      <BsClock size={11} />
      {time}
    </div>
  );
}
