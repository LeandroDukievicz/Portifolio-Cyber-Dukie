/**
 * Testes para app/context/TerminalContext.tsx
 *
 * Relevância: o terminal é o componente mais interativo do portfólio.
 * Bugs que esses testes pegam:
 * - open() não reseta isMinimized (terminal abre mas fica invisível)
 * - toast não desaparece automaticamente (UI fica poluída)
 * - triggerHireFlow não chama downloadCV (usuário clica e nada acontece)
 * - hireModal não aparece após triggerHireFlow (CTA perdido)
 */

import React from "react";
import { renderHook, act } from "@testing-library/react";
import { TerminalProvider, useTerminal } from "@/app/context/TerminalContext";

// Mock das dependências externas
jest.mock("@/lib/download", () => ({
  downloadCV: jest.fn(),
}));

import { downloadCV } from "@/lib/download";
const mockDownloadCV = downloadCV as jest.Mock;

function wrapper({ children }: { children: React.ReactNode }) {
  return <TerminalProvider>{children}</TerminalProvider>;
}

beforeEach(() => {
  jest.useFakeTimers();
  mockDownloadCV.mockClear();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("useTerminal — fora do provider", () => {
  it("lança erro claro quando usado sem TerminalProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useTerminal())).toThrow(
      "useTerminal must be used within TerminalProvider"
    );
    spy.mockRestore();
  });
});

describe("estado inicial", () => {
  it("isOpen começa como false", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    expect(result.current.isOpen).toBe(false);
  });

  it("isMinimized começa como false", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    expect(result.current.isMinimized).toBe(false);
  });

  it("isLarge começa como false", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    expect(result.current.isLarge).toBe(false);
  });

  it("hireModal começa como false", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    expect(result.current.hireModal).toBe(false);
  });

  it("toast começa como null", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    expect(result.current.toast).toBeNull();
  });
});

describe("open() e close()", () => {
  it("open() define isOpen=true", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it("open() reseta isMinimized para false (bug: terminal abriria invisível)", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    // Minimizar primeiro
    act(() => result.current.open());
    act(() => result.current.minimize());
    expect(result.current.isMinimized).toBe(true);
    // Fechar e reabrir — deve resetar o minimizado
    act(() => result.current.close());
    act(() => result.current.open());
    expect(result.current.isMinimized).toBe(false);
  });

  it("close() define isOpen=false", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.open());
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });
});

describe("minimize()", () => {
  it("alterna isMinimized de false para true", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.minimize());
    expect(result.current.isMinimized).toBe(true);
  });

  it("alterna isMinimized de true para false (toggle)", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.minimize());
    act(() => result.current.minimize());
    expect(result.current.isMinimized).toBe(false);
  });
});

describe("toggleLarge()", () => {
  it("alterna isLarge de false para true", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.toggleLarge());
    expect(result.current.isLarge).toBe(true);
  });

  it("alterna isLarge de true para false", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.toggleLarge());
    act(() => result.current.toggleLarge());
    expect(result.current.isLarge).toBe(false);
  });
});

describe("toast", () => {
  it("clearToast() define toast como null imediatamente", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.triggerHireFlow("Teste toast"));
    act(() => result.current.clearToast());
    expect(result.current.toast).toBeNull();
  });

  it("toast some automaticamente após ~4500ms", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.triggerHireFlow("Toast automático"));
    expect(result.current.toast).toBe("Toast automático");

    act(() => jest.advanceTimersByTime(4500));
    expect(result.current.toast).toBeNull();
  });

  it("toast NÃO some antes de 4500ms", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.triggerHireFlow("Toast persistente"));

    act(() => jest.advanceTimersByTime(4000));
    expect(result.current.toast).toBe("Toast persistente");
  });
});

describe("triggerHireFlow()", () => {
  it("chama downloadCV()", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.triggerHireFlow("msg"));
    expect(mockDownloadCV).toHaveBeenCalledTimes(1);
  });

  it("define o toast com a mensagem passada", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.triggerHireFlow("Permissão Autorizada !!"));
    expect(result.current.toast).toBe("Permissão Autorizada !!");
  });

  it("abre hireModal após 1200ms (não imediatamente)", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.triggerHireFlow("msg"));

    // Antes de 1200ms — modal ainda não abriu
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.hireModal).toBe(false);

    // Após 1200ms — modal deve abrir
    act(() => jest.advanceTimersByTime(200));
    expect(result.current.hireModal).toBe(true);
  });

  it("closeHireModal() fecha o modal", () => {
    const { result } = renderHook(() => useTerminal(), { wrapper });
    act(() => result.current.triggerHireFlow("msg"));
    act(() => jest.advanceTimersByTime(1200));
    expect(result.current.hireModal).toBe(true);

    act(() => result.current.closeHireModal());
    expect(result.current.hireModal).toBe(false);
  });
});
