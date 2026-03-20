/**
 * Testes para hooks/useIsMobile.ts
 *
 * Relevância: esse hook controla o layout de TODAS as páginas.
 * Um bug aqui faz o layout mobile aparecer em desktop ou vice-versa.
 * Bugs comuns:
 * - listener de resize não é adicionado (detecção fica desatualizada)
 * - listener não é removido (memory leak)
 * - breakpoint customizado ignorado
 */

import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "@/hooks/useIsMobile";

describe("useIsMobile", () => {
  const originalInnerWidth = window.innerWidth;

  function setWindowWidth(width: number) {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });
  }

  afterEach(() => {
    setWindowWidth(originalInnerWidth);
  });

  it("retorna false em viewport desktop (1200px)", () => {
    setWindowWidth(1200);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("retorna false exatamente no breakpoint padrão (768px)", () => {
    // 768 NÃO é menor que 768, então deve ser false
    setWindowWidth(768);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("retorna true abaixo do breakpoint padrão (767px)", () => {
    setWindowWidth(767);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("retorna true em viewport mobile típico (375px)", () => {
    setWindowWidth(375);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("respeita breakpoint customizado", () => {
    setWindowWidth(1023);
    const { result } = renderHook(() => useIsMobile(1024));
    expect(result.current).toBe(true);
  });

  it("respeita breakpoint customizado — acima do breakpoint é false", () => {
    setWindowWidth(1024);
    const { result } = renderHook(() => useIsMobile(1024));
    expect(result.current).toBe(false);
  });

  it("atualiza ao fazer resize (evento de janela)", () => {
    setWindowWidth(1200);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Simular resize para mobile
    act(() => {
      setWindowWidth(375);
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);
  });

  it("atualiza de mobile para desktop ao fazer resize", () => {
    setWindowWidth(375);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    act(() => {
      setWindowWidth(1200);
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(false);
  });

  it("remove o event listener ao desmontar (sem memory leak)", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });
});
