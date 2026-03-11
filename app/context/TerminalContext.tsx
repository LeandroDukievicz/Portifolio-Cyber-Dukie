"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TerminalCtx {
  isOpen: boolean;
  isMinimized: boolean;
  isLarge: boolean;
  open: () => void;
  close: () => void;
  minimize: () => void;
  toggleLarge: () => void;
}

const Ctx = createContext<TerminalCtx | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isOpen,      setIsOpen]      = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLarge,     setIsLarge]     = useState(false);

  return (
    <Ctx.Provider value={{
      isOpen,
      isMinimized,
      isLarge,
      open:        () => { setIsOpen(true); setIsMinimized(false); },
      close:       () => setIsOpen(false),
      minimize:    () => setIsMinimized(p => !p),
      toggleLarge: () => setIsLarge(p => !p),
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
