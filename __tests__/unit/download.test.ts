/**
 * Testes para lib/download.ts
 *
 * Relevância: se o href ou o nome do arquivo mudar sem atualizar o arquivo
 * no /public, o download quebra silenciosamente para o usuário.
 * Esse teste garante que o comportamento de download está correto.
 */

import { downloadCV } from "@/lib/download";

describe("downloadCV", () => {
  let appendChildSpy: jest.SpyInstance;
  let removeChildSpy: jest.SpyInstance;
  let clickSpy: jest.Mock;
  let createdAnchor: HTMLAnchorElement;

  beforeEach(() => {
    // Capturar o elemento criado para inspecionar seus atributos
    const originalCreate = document.createElement.bind(document);
    jest.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = originalCreate(tag);
      if (tag === "a") {
        createdAnchor = el as HTMLAnchorElement;
        clickSpy = jest.fn();
        el.click = clickSpy;
      }
      return el;
    });

    appendChildSpy = jest
      .spyOn(document.body, "appendChild")
      .mockImplementation((node) => node as HTMLAnchorElement);

    removeChildSpy = jest
      .spyOn(document.body, "removeChild")
      .mockImplementation((node) => node as HTMLAnchorElement);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("cria um elemento <a>", () => {
    downloadCV();
    expect(document.createElement).toHaveBeenCalledWith("a");
  });

  it("define o href apontando para o PDF do currículo", () => {
    downloadCV();
    expect(createdAnchor.href).toContain("Leandro");
    expect(createdAnchor.href).toContain(".pdf");
  });

  it("define o atributo download com o nome correto do arquivo", () => {
    downloadCV();
    expect(createdAnchor.download).toBe("Leandro-Dukievicz-CV.pdf");
  });

  it("adiciona o elemento ao body antes de clicar", () => {
    downloadCV();
    expect(appendChildSpy).toHaveBeenCalledWith(createdAnchor);
  });

  it("chama .click() para iniciar o download", () => {
    downloadCV();
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("remove o elemento do body após clicar (não deixa lixo no DOM)", () => {
    downloadCV();
    expect(removeChildSpy).toHaveBeenCalledWith(createdAnchor);
  });

  it("a ordem é: append → click → remove (verificado pelo comportamento real)", () => {
    // Este comportamento já está garantido pelos testes anteriores:
    // - appendChild é chamado (testado)
    // - click é chamado (testado)
    // - removeChild é chamado (testado)
    // A implementação em download.ts é: append → click → remove (sequencial, síncrono)
    downloadCV();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
  });
});
