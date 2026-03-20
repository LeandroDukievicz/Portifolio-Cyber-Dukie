/**
 * Testes de integração para o formulário de contato (app/contato/page.tsx)
 *
 * Relevância: o formulário é o principal ponto de conversão do portfólio.
 * Bugs que esses testes pegam:
 * - formulário submete com campos vazios (mensagens perdidas)
 * - formulário submete com email inválido (mensagens perdidas)
 * - fetch não é chamado ou é chamado com URL errada
 * - formulário não limpa após submissão (UX ruim)
 * - toast de sucesso não aparece (usuário não sabe se enviou)
 * - toast de erro não aparece (usuário não sabe o que errou)
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider } from "@/app/context/LanguageContext";

// Mock de componentes pesados que não são o foco deste teste
jest.mock("@/app/components/CyberpunkBackground", () => ({
  __esModule: true,
  default: () => null,
}));

// next/image é mockado globalmente via moduleNameMapper em jest.config.ts

// Mock canvas-confetti
jest.mock("canvas-confetti", () => ({
  default: jest.fn().mockResolvedValue(undefined),
  __esModule: true,
}));

// Mock useIsMobile — retornar desktop por padrão
jest.mock("@/hooks/useIsMobile", () => ({
  useIsMobile: jest.fn().mockReturnValue(false),
}));

// Mock buildPageSchema — não relevante para o teste do formulário
jest.mock("@/lib/schema", () => ({
  buildPageSchema: jest.fn().mockReturnValue({}),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Contato = require("@/app/contato/page").default;

function renderContato() {
  return render(
    <LanguageProvider>
      <Contato />
    </LanguageProvider>
  );
}

describe("Formulário de Contato — validação", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  it("renderiza os campos do formulário", () => {
    renderContato();
    // Os campos são identificados pelos placeholders
    expect(screen.getByPlaceholderText(/Seu nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/seu-Melhor-Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ex: Proposta/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Descreva como/i)).toBeInTheDocument();
  });

  it("renderiza o botão de envio", () => {
    renderContato();
    expect(screen.getByRole("button", { name: /Enviar mensagem/i })).toBeInTheDocument();
  });

  it("NÃO chama fetch com formulário vazio", async () => {
    renderContato();
    const button = screen.getByRole("button", { name: /Enviar mensagem/i });

    fireEvent.click(button);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("mostra toast de erro ao tentar enviar com campos vazios", async () => {
    renderContato();
    const button = screen.getByRole("button", { name: /Enviar mensagem/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Preencha todos os campos/i)).toBeInTheDocument();
    });
  });

  it("NÃO chama fetch quando email é inválido", async () => {
    const user = userEvent.setup();
    renderContato();

    await user.type(screen.getByPlaceholderText(/Seu nome/i), "João");
    await user.type(screen.getByPlaceholderText(/seu-Melhor-Email/i), "email-invalido");
    await user.type(screen.getByPlaceholderText(/Ex: Proposta/i), "Assunto teste");
    await user.type(screen.getByPlaceholderText(/Descreva como/i), "Mensagem teste");

    fireEvent.click(screen.getByRole("button", { name: /Enviar mensagem/i }));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("botão tem opacidade reduzida quando formulário está incompleto", () => {
    renderContato();
    const button = screen.getByRole("button", { name: /Enviar mensagem/i });
    // O botão tem style={{ opacity: allFilled ? 1 : 0.4 }}
    expect(button).toHaveStyle({ opacity: "0.4" });
  });
});

describe("Formulário de Contato — submissão bem-sucedida", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
  });

  async function fillAndSubmit() {
    const user = userEvent.setup();
    renderContato();

    await user.type(screen.getByPlaceholderText(/Seu nome/i), "Maria Silva");
    await user.type(
      screen.getByPlaceholderText(/seu-Melhor-Email/i),
      "maria@empresa.com"
    );
    await user.type(
      screen.getByPlaceholderText(/Ex: Proposta/i),
      "Proposta de trabalho"
    );
    await user.type(
      screen.getByPlaceholderText(/Descreva como/i),
      "Gostaria de conversar sobre uma oportunidade"
    );

    fireEvent.click(screen.getByRole("button", { name: /Enviar mensagem/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  }

  it("chama fetch para a URL do Formspree quando formulário é válido", async () => {
    await fillAndSubmit();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("formspree.io"),
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("envia os dados corretos no body do fetch", async () => {
    await fillAndSubmit();

    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(options.body);

    expect(body).toMatchObject({
      nome: "Maria Silva",
      email: "maria@empresa.com",
      assunto: "Proposta de trabalho",
      mensagem: "Gostaria de conversar sobre uma oportunidade",
    });
  });

  it("mostra toast de sucesso após envio", async () => {
    await fillAndSubmit();
    await waitFor(() => {
      expect(screen.getByText(/Mensagem enviada/i)).toBeInTheDocument();
    });
  });

  it("limpa o formulário após envio bem-sucedido", async () => {
    await fillAndSubmit();

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Seu nome/i)).toHaveValue("");
      expect(screen.getByPlaceholderText(/seu-Melhor-Email/i)).toHaveValue("");
    });
  });
});

describe("Formulário de Contato — links de contato", () => {
  it("renderiza link do WhatsApp com atributos de segurança", () => {
    renderContato();
    const whatsapp = screen.getByTitle("WhatsApp");
    expect(whatsapp).toHaveAttribute("href", expect.stringContaining("wa.me"));
    expect(whatsapp).toHaveAttribute("target", "_blank");
    expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renderiza link do LinkedIn", () => {
    renderContato();
    const linkedin = screen.getByTitle("LinkedIn");
    expect(linkedin).toHaveAttribute("href", expect.stringContaining("linkedin.com"));
  });

  it("renderiza link do GitHub", () => {
    renderContato();
    const github = screen.getByTitle("GitHub");
    expect(github).toHaveAttribute("href", expect.stringContaining("github.com"));
  });

  it("todos os links externos têm rel=noopener noreferrer (segurança)", () => {
    renderContato();
    const externalLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("target") === "_blank");

    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
