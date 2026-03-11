"use client";

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useTerminal } from "../context/TerminalContext";
import { useLanguage } from "../context/LanguageContext";

interface Line {
  kind: "input" | "output" | "error" | "info" | "blank";
  text: string;
}

const CHAR_DELAY      = 48;
const AFTER_INPUT_MS  = 180;
const AFTER_OUTPUT_MS = 480;
const TITLE_BAR_H     = 38;
const MIN_W           = 320;
const MIN_H           = 200;

function downloadCV() {
  const a = document.createElement("a");
  a.href = "/cv.pdf";
  a.download = "Leandro-Dukievicz-CV.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const CURSORS: Record<ResizeDir, string> = {
  n: "n-resize", s: "s-resize", e: "e-resize", w: "w-resize",
  ne: "ne-resize", nw: "nw-resize", se: "se-resize", sw: "sw-resize",
};

export default function TerminalWindow() {
  const router = useRouter();
  const { isOpen, isMinimized, isLarge, close, minimize, toggleLarge, hireModal, toast, triggerHireFlow, closeHireModal } = useTerminal();
  const { t, lang } = useLanguage();
  const tt = t.terminal;

  const [lines, setLines]           = useState<Line[]>([]);
  const [typingText, setTypingText] = useState("");
  const [booting, setBooting]       = useState(true);
  const [currentInput, setInput]    = useState("");
  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 557px = dock width (7 items × 75px + 32px padding)
  const W = isLarge ? 860 : 557;
  const H = isLarge ? 620 : 340;

  // Custom resize state
  const [customSize, setCustomSize] = useState<{ w: number; h: number } | null>(null);
  const effectiveW = customSize?.w ?? W;
  const effectiveH = customSize?.h ?? H;

  // Reset custom size when isLarge toggles
  useEffect(() => { setCustomSize(null); }, [isLarge]);

  // Drag state
  const [pos, setPos]  = useState({ x: 0, y: 0 });
  const dragging       = useRef(false);
  const dragOffset     = useRef({ x: 0, y: 0 });
  const windowRef      = useRef<HTMLDivElement>(null);
  const isMinimizedRef = useRef(isMinimized);

  // Resize state
  const resizing = useRef<{
    dir: ResizeDir;
    startX: number; startY: number;
    startW: number; startH: number;
    startPosX: number; startPosY: number;
  } | null>(null);

  useEffect(() => { isMinimizedRef.current = isMinimized; }, [isMinimized]);

  const DOCK_SAFE = 160;
  const clampY = (y: number, termH: number) =>
    Math.max(0, Math.min(y, window.innerHeight - DOCK_SAFE - termH));

  useLayoutEffect(() => {
    const termH = isMinimized ? TITLE_BAR_H : effectiveH + TITLE_BAR_H;
    // Align horizontally with dock (centered) and vertically with hero content (-100px from center)
    setPos({
      x: window.innerWidth  / 2 - effectiveW / 2,
      y: clampY(window.innerHeight / 2 - termH / 2 - 100, termH),
    });
  }, [W, H, isOpen]);

  const onTitleMouseDown = (e: React.MouseEvent) => {
    dragging.current   = true;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  const startResize = (dir: ResizeDir, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizing.current = {
      dir,
      startX: e.clientX, startY: e.clientY,
      startW: effectiveW, startH: effectiveH,
      startPosX: pos.x,   startPosY: pos.y,
    };
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Drag
      if (dragging.current) {
        const termH = isMinimizedRef.current ? TITLE_BAR_H : (resizing.current?.startH ?? effectiveH) + TITLE_BAR_H;
        const newY  = e.clientY - dragOffset.current.y;
        setPos({
          x: e.clientX - dragOffset.current.x,
          y: Math.max(0, Math.min(newY, window.innerHeight - 160 - termH)),
        });
      }
      // Resize
      if (resizing.current) {
        const { dir, startX, startY, startW, startH, startPosX, startPosY } = resizing.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newW = startW, newH = startH, newPosX = startPosX, newPosY = startPosY;

        if (dir.includes("e")) newW = Math.max(MIN_W, startW + dx);
        if (dir.includes("w")) { newW = Math.max(MIN_W, startW - dx); newPosX = startPosX + (startW - newW); }
        if (dir.includes("s")) newH = Math.max(MIN_H, startH + dy);
        if (dir.includes("n")) { newH = Math.max(MIN_H, startH - dy); newPosY = startPosY + (startH - newH); }

        setCustomSize({ w: newW, h: newH });
        if (dir.includes("w") || dir.includes("n")) setPos({ x: newPosX, y: newPosY });
      }
    };
    const onUp = () => { dragging.current = false; resizing.current = null; };
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

  // Boot sequence — re-runs when language changes
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    setLines([]);
    setBooting(true);

    (async () => {
      await sleep(600);
      for (const entry of tt.boot) {
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
  }, [lang]);

  const addLines = useCallback((newLines: Line[]) => {
    setLines(prev => [...prev, ...newLines]);
  }, []);

  const handleCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    addLines([{ kind: "input", text: raw.trim() }]);
    if (!cmd) return;

    const NAV: Record<string, string> = {
      home: "/", sobre: "/sobre", about: "/sobre",
      skills: "/skills", projetos: "/projetos", projects: "/projetos",
      contato: "/contato", contact: "/contato", blog: "/blog",
    };

    if (cmd === "cv") {
      addLines([{ kind: "output", text: tt.cmdDownloading }]);
      downloadCV();
    } else if (NAV[cmd]) {
      addLines([{ kind: "output", text: tt.cmdOpening(cmd) }]);
      setTimeout(() => router.push(NAV[cmd]), 400);
    } else if (cmd === "sudo hire-me") {
      addLines([{ kind: "output", text: tt.cmdVerifying }]);
      setTimeout(() => {
        addLines([{ kind: "output", text: tt.cmdAccessGranted }]);
        triggerHireFlow(tt.toast);
      }, 600);
    } else if (cmd === "help") {
      addLines(tt.help.map(text => ({ kind: "info" as const, text })));
    } else if (cmd === "exit" || cmd === "sair" || cmd === "quit") {
      addLines([{ kind: "output", text: tt.cmdGoodbye }]);
      setTimeout(() => close(), 600);
    } else if (cmd === "clear") {
      setLines([]);
    } else if (cmd === "hacker") {
      addLines([
        { kind: "info",   text: tt.cmdHackerSoon },
        { kind: "output", text: tt.cmdHackerWait },
      ]);
    } else {
      addLines([{ kind: "error", text: tt.cmdNotFound(raw.trim()) }]);
    }
  }, [addLines, router, tt, triggerHireFlow, close]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
      setInput("");
    }
  };

  if (!isOpen) return null;

  const totalH = (isMinimized ? 0 : effectiveH) + TITLE_BAR_H;

  // Resize handle style factory
  const handle = (dir: ResizeDir, extra: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    cursor: CURSORS[dir],
    zIndex: 2,
    ...extra,
  });

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
            <div style={{
              height: 2, borderRadius: 2, marginBottom: 28,
              background: "linear-gradient(90deg, #00EAFF, #BD00FF, #FF2D78)",
            }} />
            <p style={{ fontSize: 28, margin: "0 0 12px", lineHeight: 1 }}>🤝</p>
            <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
              {tt.modalTitle}
            </h2>
            <p style={{ margin: "0 0 24px", fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", whiteSpace: "pre-line" }}>
              {tt.modalMessage}
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
              {tt.modalClose}
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
        width: effectiveW,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,0,255,0.2)",
        background: "rgba(3,17,31,0.65)",
        backdropFilter: "blur(12px) saturate(120%)",
        WebkitBackdropFilter: "blur(12px) saturate(120%)",
        display: "flex", flexDirection: "column",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        fontSize: 14,
        transition: "none",
      }}>
        {/* Title bar */}
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
          <span onClick={close} onMouseDown={e => e.stopPropagation()} title="Fechar"
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", cursor: "pointer", flexShrink: 0 }} />
          <span onClick={minimize} onMouseDown={e => e.stopPropagation()} title="Minimizar"
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", cursor: "pointer", flexShrink: 0 }} />
          <span onClick={toggleLarge} onMouseDown={e => e.stopPropagation()} title={isLarge ? "Tamanho normal" : "Dobrar tamanho"}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", cursor: "pointer", flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            {tt.header}
          </span>
        </div>

        {/* Terminal body */}
        {!isMinimized && (
          <div
            onClick={() => inputRef.current?.focus()}
            style={{
              padding: "14px 16px",
              height: effectiveH,
              overflowY: "auto",
              cursor: "text",
              lineHeight: 1.65,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.1) transparent",
            }}
          >
            {lines.map((line, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 2 }}>
                {line.kind === "input" && (
                  <><span style={{ color: "#FF00FF", flexShrink: 0 }}>&gt;_</span><span style={{ color: "#e0e0e0" }}>{line.text}</span></>
                )}
                {line.kind === "output" && (
                  <><span style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>→</span><span style={{ color: "#00EAFF" }}>{line.text}</span></>
                )}
                {line.kind === "error" && (
                  <><span style={{ color: "#ff5f56", flexShrink: 0 }}>✗</span><span style={{ color: "#ff5f56" }}>{line.text}</span></>
                )}
                {line.kind === "info" && (
                  <span style={{ color: "rgba(255,255,255,0.45)", paddingLeft: 16 }}>{line.text}</span>
                )}
              </div>
            ))}

            {booting && (
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#FF00FF" }}>&gt;_</span>
                <span style={{ color: "#e0e0e0" }}>
                  {typingText}<span style={{ animation: "blink 1s step-end infinite" }}>▌</span>
                </span>
              </div>
            )}

            {!booting && (
              <>
                <div style={{ marginTop: 6, marginBottom: 8, fontSize: 13, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>
                  {tt.inputHint} <span style={{ color: "#FF00FF" }}>{tt.inputHintCmd}</span> {tt.inputHintSuffix}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: "#FF00FF", flexShrink: 0 }}>&gt;_</span>
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

      {/* Resize handles overlay — same position/size as terminal */}
      <div style={{
        position: "fixed",
        top: pos.y, left: pos.x,
        width: effectiveW, height: totalH,
        zIndex: 1001,
        pointerEvents: "none",
        borderRadius: 12,
      }}>
        {/* Edges */}
        <div className="resize-handle" style={handle("n",  { top: 0,    left: 12,   right: 12,  height: 6 })}   onMouseDown={e => startResize("n",  e)} />
        <div className="resize-handle" style={handle("s",  { bottom: 0, left: 12,   right: 12,  height: 6 })}   onMouseDown={e => startResize("s",  e)} />
        <div className="resize-handle" style={handle("e",  { top: 12,   bottom: 12, right: 0,   width: 6 })}    onMouseDown={e => startResize("e",  e)} />
        <div className="resize-handle" style={handle("w",  { top: 12,   bottom: 12, left: 0,    width: 6 })}    onMouseDown={e => startResize("w",  e)} />
        {/* Corners */}
        <div className="resize-handle" style={handle("ne", { top: 0,    right: 0,   width: 12,  height: 12 })}  onMouseDown={e => startResize("ne", e)} />
        <div className="resize-handle" style={handle("nw", { top: 0,    left: 0,    width: 12,  height: 12 })}  onMouseDown={e => startResize("nw", e)} />
        <div className="resize-handle" style={handle("se", { bottom: 0, right: 0,   width: 12,  height: 12 })}  onMouseDown={e => startResize("se", e)} />
        <div className="resize-handle" style={handle("sw", { bottom: 0, left: 0,    width: 12,  height: 12 })}  onMouseDown={e => startResize("sw", e)} />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .resize-handle { pointer-events: all; }
        .resize-handle:hover { background: rgba(0,234,255,0.15); border-radius: 2px; }
      `}</style>
    </>
  );
}
