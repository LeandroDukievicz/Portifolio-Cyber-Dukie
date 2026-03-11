"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

async function fireConfetti() {
  const confetti = (await import("canvas-confetti")).default;
  const colors = ["#00EAFF", "#FF00FF", "#FF2D78", "#ffffff", "#00ff88"];
  confetti({ particleCount: 120, spread: 80, origin: { x: 0.5, y: 0.55 }, colors });
  setTimeout(() => {
    confetti({ particleCount: 70, angle: 60,  spread: 55, origin: { x: 0, y: 0.6 }, colors });
    confetti({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
  }, 150);
}

function downloadCV() {
  const a = document.createElement("a");
  a.href = "/cv.pdf";
  a.download = "Leandro-Dukievicz-CV.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

interface TerminalCtx {
  isOpen: boolean;
  isMinimized: boolean;
  isLarge: boolean;
  open: () => void;
  close: () => void;
  minimize: () => void;
  toggleLarge: () => void;
  hireModal: boolean;
  toast: string | null;
  triggerHireFlow: () => void;
  closeHireModal: () => void;
  clearToast: () => void;
}

const Ctx = createContext<TerminalCtx | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isOpen,      setIsOpen]      = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLarge,     setIsLarge]     = useState(false);
  const [hireModal,   setHireModal]   = useState(false);
  const [toast,       setToast]       = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const triggerHireFlow = () => {
    downloadCV();
    fireConfetti();
    setToast("Permissão Autorizada !!");
    setTimeout(() => setHireModal(true), 1200);
  };

  return (
    <Ctx.Provider value={{
      isOpen,
      isMinimized,
      isLarge,
      open:           () => { setIsOpen(true); setIsMinimized(false); },
      close:          () => setIsOpen(false),
      minimize:       () => setIsMinimized(p => !p),
      toggleLarge:    () => setIsLarge(p => !p),
      hireModal,
      toast,
      triggerHireFlow,
      closeHireModal: () => setHireModal(false),
      clearToast:     () => setToast(null),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTerminal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTerminal must be used within TerminalProvider");
  return ctx;
}
