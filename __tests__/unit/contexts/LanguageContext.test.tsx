/**
 * Testes para app/context/LanguageContext.tsx
 *
 * Relevância: o contexto de idioma afeta TODOS os textos do portfólio.
 * Bugs críticos que esses testes pegam:
 * - toggle não alterna (usuário fica preso no idioma errado)
 * - tradução retorna undefined (texto em branco para o usuário)
 * - useLanguage fora do provider não dá erro claro (difícil de debugar)
 * - chaves de tradução faltando em EN que existem em PT (textos em branco)
 */

import React from "react";
import { renderHook, act } from "@testing-library/react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  LanguageProvider,
  useLanguage,
  translations,
} from "@/app/context/LanguageContext";

function wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

describe("useLanguage — fora do provider", () => {
  it("lança erro claro quando usado sem LanguageProvider", () => {
    // Suprimir o console.error do React sobre o erro
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useLanguage())).toThrow(
      "useLanguage must be used within LanguageProvider"
    );
    spy.mockRestore();
  });
});

describe("useLanguage — dentro do provider", () => {
  it("começa em português por padrão", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.lang).toBe("pt");
  });

  it("t.subtitle retorna 'Desenvolvedor Front-End' em PT", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.t.subtitle).toBe("Desenvolvedor Front-End");
  });

  it("toggle muda de PT para EN", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.toggle());
    expect(result.current.lang).toBe("en");
  });

  it("toggle de EN volta para PT", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.toggle());
    act(() => result.current.toggle());
    expect(result.current.lang).toBe("pt");
  });

  it("t.subtitle retorna 'Front-End Developer' em EN", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.toggle()); // PT → EN
    expect(result.current.t.subtitle).toBe("Front-End Developer");
  });

  it("ctaHire muda com o idioma", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.t.ctaHire).toBe("Entrar em Contato");
    act(() => result.current.toggle());
    expect(result.current.t.ctaHire).toBe("Get in Touch");
  });

  it("ctaCV muda com o idioma", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.t.ctaCV).toBe("Baixar Currículo");
    act(() => result.current.toggle());
    expect(result.current.t.ctaCV).toBe("Download CV");
  });
});

describe("consistência das traduções PT ↔ EN", () => {
  const ptKeys = Object.keys(translations.pt) as Array<keyof typeof translations.pt>;
  const enKeys = Object.keys(translations.en) as Array<keyof typeof translations.en>;

  it("PT e EN têm as mesmas chaves de topo", () => {
    expect(ptKeys.sort()).toEqual(enKeys.sort());
  });

  it("dock tem as mesmas chaves em PT e EN", () => {
    const ptDock = Object.keys(translations.pt.dock);
    const enDock = Object.keys(translations.en.dock);
    expect(ptDock.sort()).toEqual(enDock.sort());
  });

  it("contato tem as mesmas chaves em PT e EN", () => {
    const ptContato = Object.keys(translations.pt.contato);
    const enContato = Object.keys(translations.en.contato);
    expect(ptContato.sort()).toEqual(enContato.sort());
  });

  it("nenhuma chave crítica é string vazia em PT", () => {
    const critical: Array<keyof typeof translations.pt> = [
      "portfolioTitle",
      "subtitle",
      "bio",
      "ctaHire",
      "ctaCV",
    ];
    critical.forEach((key) => {
      expect(translations.pt[key]).toBeTruthy();
    });
  });

  it("nenhuma chave crítica é string vazia em EN", () => {
    const critical: Array<keyof typeof translations.en> = [
      "portfolioTitle",
      "subtitle",
      "bio",
      "ctaHire",
      "ctaCV",
    ];
    critical.forEach((key) => {
      expect(translations.en[key]).toBeTruthy();
    });
  });
});

describe("MenuBar — integração com toggle de idioma", () => {
  it("renderiza PT → toggle → EN e atualiza o label do botão", () => {
    // Teste de componente visual que verifica que o toggle funciona na UI
    function TestComponent() {
      const { lang, toggle } = useLanguage();
      return (
        <button onClick={toggle} data-testid="toggle">
          {lang}
        </button>
      );
    }

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("toggle")).toHaveTextContent("pt");
    fireEvent.click(screen.getByTestId("toggle"));
    expect(screen.getByTestId("toggle")).toHaveTextContent("en");
    fireEvent.click(screen.getByTestId("toggle"));
    expect(screen.getByTestId("toggle")).toHaveTextContent("pt");
  });
});
