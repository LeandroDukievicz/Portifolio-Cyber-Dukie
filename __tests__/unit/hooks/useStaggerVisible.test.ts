/**
 * Testes para hooks/useStaggerVisible.ts
 *
 * Relevância: o stagger controla a animação de entrada de TODOS os elementos
 * da home page. Bugs comuns:
 * - todos os elementos aparecem de uma vez (perde o efeito visual)
 * - elementos nunca ficam visíveis (página fica em branco)
 * - count negativo/zero causa comportamento inesperado
 * - memory leak: timers não cancelados no unmount
 */

import { renderHook, act } from "@testing-library/react";
import { useStaggerVisible } from "@/hooks/useStaggerVisible";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("useStaggerVisible", () => {
  it("começa com todos os elementos false", () => {
    const { result } = renderHook(() => useStaggerVisible(3, 100, 50));
    expect(result.current).toEqual([false, false, false]);
  });

  it("retorna array do tamanho correto", () => {
    const count = 5;
    const { result } = renderHook(() => useStaggerVisible(count, 100, 0));
    expect(result.current).toHaveLength(count);
  });

  it("respeita o initialDelay — nenhum elemento visível antes dele", () => {
    const { result } = renderHook(() => useStaggerVisible(3, 100, 200));

    act(() => jest.advanceTimersByTime(199));
    expect(result.current[0]).toBe(false);
  });

  it("ativa o primeiro elemento após initialDelay", () => {
    const { result } = renderHook(() => useStaggerVisible(3, 100, 200));

    act(() => jest.advanceTimersByTime(200));
    expect(result.current[0]).toBe(true);
    // Os demais ainda não
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBe(false);
  });

  it("ativa elementos sequencialmente com o interval correto", () => {
    const initialDelay = 100;
    const interval = 120;
    const { result } = renderHook(() =>
      useStaggerVisible(3, interval, initialDelay)
    );

    // Primeiro elemento: após initialDelay
    act(() => jest.advanceTimersByTime(initialDelay));
    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toBe(false);

    // Segundo elemento: após initialDelay + interval
    act(() => jest.advanceTimersByTime(interval));
    expect(result.current[1]).toBe(true);
    expect(result.current[2]).toBe(false);

    // Terceiro elemento: após initialDelay + 2*interval
    act(() => jest.advanceTimersByTime(interval));
    expect(result.current[2]).toBe(true);
  });

  it("todos os elementos ficam visíveis ao final", () => {
    const count = 6;
    const { result } = renderHook(() => useStaggerVisible(count, 120, 100));

    // Avançar além de tudo
    act(() => jest.advanceTimersByTime(100 + 120 * count + 100));
    expect(result.current.every((v) => v === true)).toBe(true);
  });

  it("count=0 retorna array vazio sem erros", () => {
    const { result } = renderHook(() => useStaggerVisible(0));
    expect(result.current).toEqual([]);
  });

  it("count=1 funciona com elemento único", () => {
    const { result } = renderHook(() => useStaggerVisible(1, 100, 50));
    act(() => jest.advanceTimersByTime(50));
    expect(result.current[0]).toBe(true);
  });

  it("cancela timers ao desmontar (sem state update após unmount)", () => {
    const { result, unmount } = renderHook(() =>
      useStaggerVisible(5, 100, 50)
    );

    // Desmontar antes dos timers dispararem
    unmount();

    // Avançar o tempo — não deve gerar warning de "state update on unmounted component"
    expect(() => {
      act(() => jest.advanceTimersByTime(1000));
    }).not.toThrow();
  });
});
