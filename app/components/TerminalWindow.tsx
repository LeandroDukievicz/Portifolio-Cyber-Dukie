"use client";

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useTerminal } from "../context/TerminalContext";

interface Line {
  kind: "input" | "output" | "error" | "info" | "blank";
  text: string;
}

const CHAR_DELAY      = 48;
const AFTER_INPUT_MS  = 180;
const AFTER_OUTPUT_MS = 480;

const BOOT: { kind: "input" | "output"; text: string }[] = [
  { kind: "input",  text: "whoami" },
  { kind: "output", text: "Leandro Dukievicz" },
  { kind: "input",  text: "cat sobre.txt" },
  { kind: "output", text: "Front End - Transformando cafeína em interfaces desde 2021" },
  { kind: "input",  text: "ls skills/" },
  { kind: "output", text: "React  Next.js  TypeScript  Figma  Node  ..." },
  { kind: "input",  text: "./status.sh" },
  { kind: "output", text: "● Disponível para projetos" },
];

const HELP_LINES = [
  "Comandos disponíveis:",
  "  home         → página inicial",
  "  cv           → baixar currículo",
  "  sobre        → página sobre mim",
  "  skills       → minhas habilidades",
  "  projetos     → meus projetos",
  "  contato      → entrar em contato",
  "  blog         → meu blog",
  "  hacker       → ativar tema hacker [em breve]",
  "  sudo hire-me → 👀",
  "  clear        → limpar terminal",
  "  exit / sair  → fechar terminal",
  "  help         → mostrar esta ajuda",
];

function downloadCV() {
  const a = document.createElement("a");
  a.href = "/cv.pdf";
  a.download = "Leandro-Dukievicz-CV.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function TerminalWindow() {
  const router                        = useRouter();
  const { isOpen, isMinimized, isLarge, close, minimize, toggleLarge, hireModal, toast, triggerHireFlow, closeHireModal } = useTerminal();
  const [lines, setLines]             = useState<Line[]>([]);
  const [typingText, setTypingText]   = useState("");
  const [booting, setBooting]         = useState(true);
  const [currentInput, setInput]      = useState("");
  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const W = isLarge ? 860 : 520;
  const H = isLarge ? 620 : 340;

  // Drag state
  const [pos, setPos]   = useState({ x: 0, y: 0 });
  const dragging        = useRef(false);
  const dragOffset      = useRef({ x: 0, y: 0 });
  const windowRef       = useRef<HTMLDivElement>(null);
  const HRef            = useRef(H);
  const isMinimizedRef  = useRef(isMinimized);

  useEffect(() => { HRef.current = H; },           [H]);
  useEffect(() => { isMinimizedRef.current = isMinimized; }, [isMinimized]);

  const DOCK_SAFE = 160; // altura do dock + margem

  const clampY = (y: number, termH: number) =>
    Math.max(0, Math.min(y, window.innerHeight - DOCK_SAFE - termH));

  // Centraliza na abertura e ao alternar tamanho — respeitando o Dock
  useLayoutEffect(() => {
    const termH = isMinimized ? 38 : H;
    setPos({
      x: window.innerWidth  / 2 - W / 2,
      y: clampY(window.innerHeight / 2 - termH / 2, termH),
    });
  }, [W, H, isOpen]);

    const onTitleMouseDown = (e: React.MouseEvent) => {
    dragging.current   = true;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const termH = isMinimizedRef.current ? 38 : HRef.current + 38;
      const newY  = e.clientY - dragOffset.current.y;
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: Math.max(0, Math.min(newY, window.innerHeight - 160 - termH)),
      });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (!isMinimized) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, typingText, isMinimized]);

  // Re-focus input when window reopens
  useEffect(() => {
    if (isOpen && !isMinimized && !booting)
      setTimeout(() => inputRef.current?.focus(), 80);
  }, [isOpen, isMinimized, booting]);

  // Boot sequence (runs once)
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    (async () => {
      await sleep(600);
      for (const entry of BOOT) {
        if (cancelled) return;
        if (entry.kind === "input") {
          for (let i = 0; i <= entry.text.length; i++) {
            if (cancelled) return;
            setTypingText(entry.text.slice(0, i));
            await sleep(CHAR_DELAY);
          }
          await sleep(AFTER_INPUT_MS);
          setLines(prev => [...prev, { kind: "input", text: entry.text }]);
          setTypingText("");
        } else {
          setLines(prev => [...prev, { kind: "output", text: entry.text }]);
          await sleep(AFTER_OUTPUT_MS);
        }
      }
      if (!cancelled) {
        setBooting(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const addLines = useCallback((newLines: Line[]) => {
    setLines(prev => [...prev, ...newLines]);
  }, []);

  const handleCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    addLines([{ kind: "input", text: raw.trim() }]);
    if (!cmd) return;

    const NAV: Record<string, string> = {
      home: "/", sobre: "/sobre", skills: "/skills",
      projetos: "/projetos", contato: "/contato", blog: "/blog",
    };

    if (cmd === "cv") {
      addLines([{ kind: "output", text: "Baixando currículo..." }]);
      downloadCV();
    } else if (NAV[cmd]) {
      addLines([{ kind: "output", text: `Abrindo ${cmd}...` }]);
      setTimeout(() => router.push(NAV[cmd]), 400);
    } else if (cmd === "sudo hire-me") {
      addLines([{ kind: "output", text: "Verificando credenciais..." }]);
      setTimeout(() => {
        addLines([{ kind: "output", text: "✔ Acesso concedido. Baixando currículo..." }]);
        triggerHireFlow();
      }, 600);
    } else if (cmd === "help") {
      addLines(HELP_LINES.map(t => ({ kind: "info" as const, text: t })));
    } else if (cmd === "exit" || cmd === "sair") {
      addLines([{ kind: "output", text: "Até logo!" }]);
      setTimeout(() => close(), 600);
    } else if (cmd === "clear") {
      setLines([]);
    } else if (cmd === "hacker") {
      addLines([
        { kind: "info",   text: "⚠ Tema hacker em desenvolvimento..." },
        { kind: "output", text: "Aguarde a próxima versão." },
      ]);
    } else {
      addLines([{ kind: "error", text: `comando não encontrado: ${raw.trim()}. Digite 'help'.` }]);
    }
  }, [addLines, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <>
    {hireModal && (
      <div
        onClick={() => closeHireModal()}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          animation: "greeting-in 0.3s ease forwards",
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: "rgba(3,17,31,0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,0,255,0.35)",
            borderRadius: 16,
            padding: "40px 48px",
            maxWidth: 480,
            textAlign: "center",
            boxShadow: "0 0 60px rgba(255,0,255,0.15), 0 24px 60px rgba(0,0,0,0.5)",
            fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
          }}
        >
          {/* Linha gradiente topo */}
          <div style={{
            height: 2, borderRadius: 2, marginBottom: 28,
            background: "linear-gradient(90deg, #00EAFF, #BD00FF, #FF2D78)",
          }} />

          <p style={{ fontSize: 28, margin: "0 0 12px", lineHeight: 1 }}>🤝</p>

          <h2 style={{
            margin: "0 0 16px", fontSize: 18, fontWeight: 700,
            color: "#fff", letterSpacing: "0.02em",
          }}>
            Obrigado pelo download!
          </h2>

          <p style={{
            margin: "0 0 24px", fontSize: 13, lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
          }}>
            Fico muito feliz com seu interesse.<br />
            Estou à inteira disposição para conversarmos<br />
            pessoalmente — será um prazer!
          </p>

          <button
            onClick={() => closeHireModal()}
            style={{
              background: "linear-gradient(90deg, #BD00FF, #FF00FF)",
              border: "none", borderRadius: 8,
              padding: "10px 28px", cursor: "pointer",
              color: "#fff", fontFamily: "inherit",
              fontSize: 13, fontWeight: 600, letterSpacing: "0.05em",
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 48, left: "50%", transform: "translateX(-50%)",
          zIndex: 9999, pointerEvents: "none",
          background: "rgba(3,17,31,0.75)",
          border: "1px solid rgba(255,0,255,0.5)",
          borderRadius: 10, padding: "12px 24px",
          color: "#FF00FF", fontFamily: "monospace", fontSize: 15, fontWeight: 700,
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 30px rgba(255,0,255,0.25)",
          animation: "greeting-in 0.3s ease forwards",
        }}>
          {toast}
        </div>
      )}

      {/* Floating macOS Window */}
      <div ref={windowRef} style={{
        position: "fixed",
        top: pos.y, left: pos.x,
        zIndex: 1000,
        width: W,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,0,255,0.2)",
        background: "rgba(3,17,31,0.65)",
        backdropFilter: "blur(12px) saturate(120%)",
        WebkitBackdropFilter: "blur(12px) saturate(120%)",
        display: "flex", flexDirection: "column",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        fontSize: 14,
        transition: "width 0.3s ease, height 0.3s ease",
      }}>

        {/* Title bar — arraste aqui */}
        <div
          onMouseDown={onTitleMouseDown}
          style={{
            background: "rgba(255,255,255,0.04)",
            padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            userSelect: "none", flexShrink: 0,
            cursor: "grab",
          }}
        >
          {/* Vermelho — fechar */}
          <span
            onClick={close}
            onMouseDown={e => e.stopPropagation()}
            title="Fechar"
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", cursor: "pointer", flexShrink: 0 }}
          />
          {/* Amarelo — minimizar */}
          <span
            onClick={minimize}
            onMouseDown={e => e.stopPropagation()}
            title="Minimizar"
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", cursor: "pointer", flexShrink: 0 }}
          />
          {/* Verde — dobrar tamanho */}
          <span
            onClick={toggleLarge}
            onMouseDown={e => e.stopPropagation()}
            title={isLarge ? "Tamanho normal" : "Dobrar tamanho"}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", cursor: "pointer", flexShrink: 0 }}
          />
          <span style={{
            flex: 1, textAlign: "center", fontSize: 11,
            color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em",
          }}>
            guest@portfolio ~ zsh
          </span>
        </div>

        {/* Terminal body — oculto quando minimizado */}
        {!isMinimized && (
          <div
            onClick={() => inputRef.current?.focus()}
            style={{
              padding: "14px 16px",
              height: H,
              overflowY: "auto",
              cursor: "text",
              lineHeight: 1.65,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.1) transparent",
              transition: "height 0.3s ease",
            }}
          >
            {lines.map((line, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 2 }}>
                {line.kind === "input" && (
                  <>
                    <span style={{ color: "#FF00FF", flexShrink: 0 }}>&gt;_</span>
                    <span style={{ color: "#e0e0e0" }}>{line.text}</span>
                  </>
                )}
                {line.kind === "output" && (
                  <>
                    <span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>→</span>
                    <span style={{ color: "#00EAFF" }}>{line.text}</span>
                  </>
                )}
                {line.kind === "error" && (
                  <>
                    <span style={{ color: "#ff5f56", flexShrink: 0 }}>✗</span>
                    <span style={{ color: "#ff5f56" }}>{line.text}</span>
                  </>
                )}
                {line.kind === "info" && (
                  <span style={{ color: "rgba(255,255,255,0.45)", paddingLeft: 16 }}>{line.text}</span>
                )}
              </div>
            ))}

            {/* Auto-typing */}
            {booting && (
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#FF00FF" }}>&gt;_</span>
                <span style={{ color: "#e0e0e0" }}>
                  {typingText}
                  <span style={{ animation: "blink 1s step-end infinite" }}>▌</span>
                </span>
              </div>
            )}

            {/* Input interativo */}
            {!booting && (
              <>
                <div style={{
                  marginTop: 6, marginBottom: 8,
                  fontSize: 13, color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.04em",
                }}>
                  — digite <span style={{ color: "#FF00FF" }}>help</span> para ver todos os comandos
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center", position: "relative" }}>
                  <span style={{ color: "#FF00FF", flexShrink: 0 }}>
                    &gt;_
                  </span>
                  <input
                    ref={inputRef}
                    value={currentInput}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    style={{
                      background: "transparent", border: "none", outline: "none",
                      color: "#e0e0e0", fontFamily: "inherit", fontSize: "inherit",
                      flex: 1, caretColor: "#FF00FF", lineHeight: 1.65,
                    }}
                  />
                </div>
              </>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </>
  );
}
