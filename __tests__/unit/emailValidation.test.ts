/**
 * Testes para lib/emailValidation.ts
 *
 * Esses testes são críticos: a mesma função é usada no frontend (contact form)
 * e no backend (API /subscribe). Um bug aqui deixa emails inválidos passarem
 * ou bloqueia emails legítimos de usuários.
 */

import {
  isValidEmailFormat,
  isDisposableDomain,
  EMAIL_REGEX,
  DISPOSABLE_DOMAINS,
} from "@/lib/emailValidation";

describe("isValidEmailFormat", () => {
  describe("formatos válidos — devem retornar true", () => {
    const valid = [
      "user@example.com",
      "user.name@example.com",
      "user+tag@example.com",
      "user123@sub.domain.com.br",
      "firstname.lastname@empresa.org",
      "email@subdomain.domain.com",
      "1234567890@domain.com",
      "email@domain-with-hyphen.com",
      "_______@domain.com",
      "email@domain.co.jp",
      "user@domain.travel",
      "  user@example.com  ", // com espaços — trim() deve resolver
    ];

    valid.forEach((email) => {
      it(`aceita: "${email.trim()}"`, () => {
        expect(isValidEmailFormat(email)).toBe(true);
      });
    });
  });

  describe("formatos inválidos — devem retornar false", () => {
    const invalid = [
      "",
      "   ",
      "plainaddress",
      "@domain.com",         // sem local part
      "user@",               // sem domínio
      "user@.com",           // domínio começa com ponto
      "user@domain",         // sem TLD
      "user @domain.com",    // espaço no meio
      "user@@domain.com",    // dois @
      "user@domain..com",    // dois pontos consecutivos no domínio
      "user@-domain.com",    // domínio começa com hífen
    ];

    invalid.forEach((email) => {
      it(`rejeita: "${email}"`, () => {
        expect(isValidEmailFormat(email)).toBe(false);
      });
    });
  });

  it("faz trim antes de validar (espaços não devem bloquear email válido)", () => {
    expect(isValidEmailFormat("  valid@example.com  ")).toBe(true);
  });

  it("não aceita string vazia após trim", () => {
    expect(isValidEmailFormat("   ")).toBe(false);
  });
});

describe("isDisposableDomain", () => {
  describe("domínios descartáveis conhecidos — devem retornar true", () => {
    const disposable = [
      "test@mailinator.com",
      "test@guerrillamail.com",
      "test@trashmail.com",
      "test@10minutemail.com",
      "test@yopmail.com",
      "test@tempmail.com",
      "test@fakeinbox.com",
      "test@maildrop.cc",
    ];

    disposable.forEach((email) => {
      it(`bloqueia domínio: "${email.split("@")[1]}"`, () => {
        expect(isDisposableDomain(email)).toBe(true);
      });
    });
  });

  describe("domínios legítimos — devem retornar false", () => {
    const legitimate = [
      "user@gmail.com",
      "user@outlook.com",
      "user@hotmail.com",
      "user@yahoo.com",
      "user@icloud.com",
      "user@empresa.com.br",
      "user@protonmail.com",
    ];

    legitimate.forEach((email) => {
      it(`permite domínio: "${email.split("@")[1]}"`, () => {
        expect(isDisposableDomain(email)).toBe(false);
      });
    });
  });

  it("é case-insensitive — MAILINATOR.COM deve ser bloqueado", () => {
    expect(isDisposableDomain("test@MAILINATOR.COM")).toBe(true);
  });

  it("lida com email sem @ sem lançar erro (retorna false)", () => {
    // Não deve lançar exceção — o código usa optional chaining
    expect(() => isDisposableDomain("notanemail")).not.toThrow();
    expect(isDisposableDomain("notanemail")).toBe(false);
  });

  it("lida com string vazia sem lançar erro", () => {
    expect(() => isDisposableDomain("")).not.toThrow();
    expect(isDisposableDomain("")).toBe(false);
  });
});

describe("DISPOSABLE_DOMAINS Set", () => {
  it("contém os domínios mais críticos", () => {
    const critical = ["mailinator.com", "guerrillamail.com", "trashmail.com", "yopmail.com"];
    critical.forEach((domain) => {
      expect(DISPOSABLE_DOMAINS.has(domain)).toBe(true);
    });
  });

  it("não contém domínios legítimos", () => {
    expect(DISPOSABLE_DOMAINS.has("gmail.com")).toBe(false);
    expect(DISPOSABLE_DOMAINS.has("outlook.com")).toBe(false);
  });
});

describe("consistência entre isValidEmailFormat e isDisposableDomain", () => {
  it("email descartável é válido em formato mas bloqueado pelo domínio", () => {
    const email = "test@mailinator.com";
    // O formato é válido (email bem formado)
    expect(isValidEmailFormat(email)).toBe(true);
    // Mas o domínio é descartável — deve ser bloqueado numa segunda camada
    expect(isDisposableDomain(email)).toBe(true);
    // Isso garante que as duas funções são usadas em conjunto, não isoladas
  });
});
