import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Mock global fetch (não disponível em jsdom por padrão)
global.fetch = jest.fn();

// Mock next/navigation para componentes que usam usePathname/useRouter
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock canvas-confetti — não tem suporte em jsdom
jest.mock("canvas-confetti", () => ({
  default: jest.fn().mockResolvedValue(undefined),
  __esModule: true,
}));

// Silenciar warnings de console em testes (manter erros visíveis)
const originalConsoleWarn = console.warn;
beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    const msg = args[0]?.toString() ?? "";
    // Silenciar warnings conhecidos de libs externas em test env
    if (
      msg.includes("ReactDOM.render is no longer supported") ||
      msg.includes("Warning: An update to") ||
      msg.includes("act(")
    )
      return;
    originalConsoleWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalConsoleWarn;
});
