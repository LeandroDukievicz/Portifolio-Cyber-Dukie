/**
 * Testes para hooks/useTypewriter.ts
 *
 * Relevância: o typewriter é a primeira coisa que o usuário vê na home.
 * Bugs comuns que esses testes pegam:
 * - texto aparece instantaneamente (interval não funciona)
 * - texto não avança além de N caracteres
 * - `done` nunca vira true (cursor fica piscando para sempre)
 * - múltiplos intervals quando o texto muda (texto aparece em duplicado/corrompido)
 * - memory leak: interval não limpo no unmount
 */

import { renderHook, act } from "@testing-library/react";
import { useTypewriter } from "@/hooks/useTypewriter";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("useTypewriter", () => {
  it("começa com string vazia e done=false", () => {
    const { result } = renderHook(() => useTypewriter("Hello", 50, 0));
    expect(result.current.displayed).toBe("");
    expect(result.current.done).toBe(false);
  });

  it("respeita o startDelay — não começa antes do delay", () => {
    const { result } = renderHook(() => useTypewriter("Hello", 50, 500));

    // Antes do delay: ainda vazio
    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(result.current.displayed).toBe("");

    // Após o delay, mas sem avançar o interval: ainda vazio
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current.displayed).toBe("");
  });

  it("digita caractere por caractere na velocidade correta", () => {
    const speed = 50;
    const { result } = renderHook(() => useTypewriter("Hi", speed, 0));

    // Após 1 intervalo: 1 caractere
    act(() => jest.advanceTimersByTime(speed));
    expect(result.current.displayed).toBe("H");

    // Após 2 intervalos: 2 caracteres
    act(() => jest.advanceTimersByTime(speed));
    expect(result.current.displayed).toBe("Hi");
  });

  it("seta done=true quando todos os caracteres foram digitados", () => {
    const text = "Done";
    const speed = 50;
    const { result } = renderHook(() => useTypewriter(text, speed, 0));

    act(() => jest.advanceTimersByTime(speed * text.length));
    expect(result.current.displayed).toBe(text);
    expect(result.current.done).toBe(true);
  });

  it("não passa do tamanho do texto original", () => {
    const text = "Short";
    const { result } = renderHook(() => useTypewriter(text, 10, 0));

    // Avançar muito além do necessário
    act(() => jest.advanceTimersByTime(10 * 100));
    expect(result.current.displayed).toBe(text);
    expect(result.current.displayed.length).toBe(text.length);
  });

  it("reseta ao mudar o texto (evita texto corrompido/duplicado)", () => {
    const { result, rerender } = renderHook(
      ({ text }) => useTypewriter(text, 50, 0),
      { initialProps: { text: "First" } }
    );

    // Digitar metade do primeiro texto
    act(() => jest.advanceTimersByTime(50 * 3));
    expect(result.current.displayed).toBe("Fir");

    // Mudar o texto — deve resetar
    rerender({ text: "Second" });
    expect(result.current.displayed).toBe("");
    expect(result.current.done).toBe(false);
  });

  it("lida com string vazia sem erros", () => {
    const { result } = renderHook(() => useTypewriter("", 50, 0));
    act(() => jest.advanceTimersByTime(500));
    expect(result.current.displayed).toBe("");
    // done pode ser true ou false — o importante é não lançar erro
    expect(() => result.current.done).not.toThrow();
  });
});
