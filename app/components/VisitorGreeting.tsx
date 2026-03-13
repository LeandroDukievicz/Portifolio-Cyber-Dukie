"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

interface GeoData {
  city?: string;
  region?: string;
  country_name?: string;
  error?: boolean;
}

export default function VisitorGreeting() {
  const [visible, setVisible]   = useState(false);
  const [leaving, setLeaving]   = useState(false);
  const [geo, setGeo]           = useState<GeoData | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t } = useLanguage();

  const message = geo
    ? (geo.error || (!geo.city && !geo.country_name))
      ? t.greeting.default
      : t.greeting.withLocation(geo.city ?? geo.country_name ?? "")
    : "";

  useEffect(() => {
    if (sessionStorage.getItem("greeted")) return;

    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .catch(() => ({ error: true }))
      .then((data: GeoData) => {
        setGeo(data);
        setVisible(true);
        sessionStorage.setItem("greeted", "1");

        timerRef.current = setTimeout(() => dismiss(), 5000);
      });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function dismiss() {
    setLeaving(true);
    setTimeout(() => setVisible(false), 400);
  }

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        top: "48px",
        right: "16px",
        zIndex: 9999,
        cursor: "pointer",
        animation: leaving
          ? "greeting-out 0.4s ease forwards"
          : "greeting-in 0.4s ease forwards",
      }}
    >
      <div
        style={{
          background: "rgba(3, 17, 31, 0.75)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(0, 234, 255, 0.35)",
          borderRadius: "12px",
          padding: "14px 18px",
          maxWidth: "300px",
          boxShadow: "0 0 24px rgba(0, 234, 255, 0.12)",
        }}
      >
        {/* Linha de topo colorida */}
        <div
          style={{
            height: "2px",
            borderRadius: "2px",
            background: "linear-gradient(90deg, #00EAFF, #BD00FF, #FF2D78)",
            marginBottom: "10px",
          }}
        />

        <p
          style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.5,
          }}
        >
          {message}
        </p>

        <p
          style={{
            margin: "6px 0 0",
            fontSize: "10px",
            color: "rgba(0, 234, 255, 0.5)",
          }}
        >
          {t.greeting.clickToClose}
        </p>
      </div>

      <style>{`
        @keyframes greeting-in {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes greeting-out {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
