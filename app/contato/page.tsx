"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CyberpunkBackground from "../components/CyberpunkBackground";
import { useLanguage } from "../context/LanguageContext";

const CONTACTS = [
  {
    name: "WhatsApp",
    image: "/images/whatsapp.webp",
    href: "https://wa.me/5544991293234?text=Ol%C3%A1%2C%20acabei%20de%20ver%20teu%20Portif%C3%B3lio%20e...",
    color: "#25D366",
    label: "+55 (44) 9 9129-3234",
  },
  {
    name: "Telegram",
    image: "/images/telegram.webp",
    href: "https://t.me/+5544991293234",
    color: "#2AABEE",
    label: "+55 (44) 9 9129-3234",
  },
  {
    name: "LinkedIn",
    image: "/images/linkedin.webp",
    href: "https://linkedin.com/in/leandrodukievicz/",
    color: "#0A66C2",
    label: "linkedin.com/in/leandrodukievicz",
  },
  {
    name: "GitHub",
    image: "/images/github.webp",
    href: "https://github.com/LeandroDukievicz",
    color: "#ffffff",
    label: "github.com/LeandroDukievicz",
  },
  {
    name: "Gmail",
    image: "/images/gmail.webp",
    href: "mailto:leandrodukievicz1718@gmail.com",
    color: "#EA4335",
    label: "leandrodukievicz1718@gmail.com",
  },
  {
    name: "Apple Mail",
    image: "/images/mail-apple.webp",
    href: "mailto:ldukie@icloud.com",
    color: "#1a8cff",
    label: "ldukie@icloud.com",
  },
];

export default function Contato() {
  const { t } = useLanguage();
  const c = t.contato;
  const [isMobile,   setIsMobile]   = useState(false);
  const [hovered,    setHovered]    = useState<number | null>(null);
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [showToast, setShowToast]       = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [submitting, setSubmitting]     = useState(false);

  const allFilled = Object.values(form).every(v => v.trim() !== "") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFilled) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    setSubmitting(true);
    await fetch("https://formspree.io/f/maqpbbor", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ nome: form.nome, email: form.email, assunto: form.assunto, mensagem: form.mensagem }),
    });
    setSubmitting(false);
    setSubmitted(true);
    setForm({ nome: "", email: "", assunto: "", mensagem: "" });
    const confetti = (await import("canvas-confetti")).default;
    const colors = ["#00EAFF", "#FF00FF", "#FF2D78", "#ffffff", "#00ff88"];
    confetti({ particleCount: 120, spread: 80, origin: { x: 0.5, y: 0.55 }, colors });
    setTimeout(() => {
      confetti({ particleCount: 70, angle: 60,  spread: 55, origin: { x: 0, y: 0.6 }, colors });
      confetti({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
    }, 150);
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid #ffffff",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "rgba(255,255,255,0.85)",
    fontSize: "0.85rem",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s, background 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "rgba(0,234,255,0.6)",
  };


  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <CyberpunkBackground />

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes contact-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .btn-liquid-glass {
          all: unset;
          cursor: pointer;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 28px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          background: transparent;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid #ffffff;
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.45),
            inset 0 -1px 0 rgba(0,0,0,0.15),
            0 4px 24px rgba(0,234,255,0.12),
            0 1px 2px rgba(0,0,0,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .btn-liquid-glass:hover {
          transform: scale(0.975);
          background: rgba(255,255,255,0.05);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.55),
            inset 0 -1px 0 rgba(0,0,0,0.1),
            0 6px 32px rgba(0,234,255,0.28),
            0 1px 2px rgba(0,0,0,0.25);
        }
        .btn-liquid-glass:active {
          transform: scale(0.96);
        }
      `}</style>

      {/* Toast */}
      {showToast && (
        <div style={{
          position: "fixed",
          ...(isMobile
            ? { bottom: 90, left: "50%", transform: "translateX(-50%)", width: "80vw", height: "auto", minHeight: 80 }
            : { top: "calc(20vh - 100px)", left: "calc(80vw + 16px)", transform: "none", width: 160, height: 160 }
          ),
          background: "rgba(3,17,31,0.92)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,80,80,0.5)",
          borderRadius: 12,
          padding: "20px 16px",
          color: "rgba(255,120,120,0.95)",
          fontSize: "0.78rem",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.04em",
          lineHeight: 1.5,
          zIndex: 999,
          boxShadow: "0 0 24px rgba(255,80,80,0.15)",
          animation: "toast-in 0.3s ease forwards",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 10,
        }}>
          <span style={{ fontSize: "1.6rem" }}>⚠</span>
          <span>{c.toastMsg}</span>
        </div>
      )}

      <div
        className="window-rise"
        style={{
          position: "fixed",
          top:    isMobile ? "5vh"  : "calc(20vh - 100px)",
          bottom: isMobile ? "5vh" : "calc(20vh + 100px)",
          left:   isMobile ? "5vw"  : "20vw",
          width:  isMobile ? "90vw" : "60vw",
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(3,17,31,0.65)",
          backdropFilter: "blur(12px) saturate(120%)",
          WebkitBackdropFilter: "blur(12px) saturate(120%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,0,255,0.2)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          zIndex: 100,
          transition: "height 0.3s cubic-bezier(0.25,1,0.5,1), top 0.3s ease, left 0.3s ease, width 0.3s ease, border-radius 0.3s ease, bottom 0.3s ease",
        }}
      >
        {/* Title bar */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 8,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0, userSelect: "none",
        }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", flexShrink: 0 }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", flexShrink: 0 }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            {c.windowTitle}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden" }}>

          {/* Coluna lateral — ícones 2x3 */}
          <div style={{
            width: isMobile ? "100%" : "40%",
            height: isMobile ? "auto" : undefined,
            flexShrink: 0,
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(6, 1fr)" : "1fr 1fr",
            alignContent: "center",
            justifyItems: "center",
            gap: isMobile ? 12 : 36,
            padding: isMobile ? "12px 16px" : "24px",
            borderBottom: isMobile ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}>
            {CONTACTS.map(({ name, image, href, color }, i) => (
              <div
                key={name}
                style={{
                  opacity: 0,
                  animation: "contact-in 0.35s ease forwards",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={name}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "flex",
                    transform: hovered === i ? "scale(1.1)" : "scale(1)",
                    filter: hovered === i ? `drop-shadow(0 0 10px ${color}99)` : "none",
                    transition: "transform 0.25s ease, filter 0.25s ease",
                  }}
                >
                  <Image
                    src={image}
                    alt={name}
                    width={isMobile ? 36 : 50}
                    height={isMobile ? 36 : 50}
                    style={{ borderRadius: 8 }}
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Formulário de contato */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: isMobile ? "12px 14px" : "24px 28px", overflowY: "auto" }}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 14, height: "100%", justifyContent: "center", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: isMobile ? "14px" : "20px", boxShadow: "2px 2px 0 rgba(255,255,255,0.08), 4px 4px 0 rgba(255,255,255,0.04)" }}
            >
              {/* Nome + Email */}
              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12 }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>{c.labelName}</label>
                  <input
                    placeholder={c.placeholderName}
                    style={inputStyle}
                    value={form.nome}
                    onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                  />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>{c.labelEmail}</label>
                  <input
                    type="email"
                    placeholder={c.placeholderEmail}
                    style={inputStyle}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
              </div>

              {/* Assunto */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>{c.labelSubject}</label>
                <input
                  placeholder={c.placeholderSubject}
                  style={inputStyle}
                  value={form.assunto}
                  onChange={e => setForm(f => ({ ...f, assunto: e.target.value }))}
                />
              </div>

              {/* Mensagem */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <label style={labelStyle}>{c.labelMessage}</label>
                <textarea
                  placeholder={c.placeholderMessage}
                  style={{ ...inputStyle, flex: 1, resize: "none", minHeight: 90 }}
                  value={form.mensagem}
                  onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))}
                />
              </div>

              {/* Botão */}
              <div style={{ alignSelf: "flex-end", display: "flex", alignItems: "center", gap: 12 }}>
                {submitted && (
                  <span style={{ fontSize: "0.78rem", color: "#00EAFF", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>
                    {c.successMsg}
                  </span>
                )}
                <button
                  type="submit"
                  className="btn-liquid-glass"
                  disabled={submitting}
                  style={{ opacity: allFilled ? 1 : 0.4 }}
                >
                  {submitting ? c.btnSending : c.btnSend}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </main>
  );
}
