import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Resend } from "resend";
import dns from "dns/promises";
import isEmail from "validator/lib/isEmail";
import { isDisposableDomain, isValidEmailFormat } from "@/lib/emailValidation";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_BLOG_SUBSCRIBERS_DB!;
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Rate limiting em memória (máx 5 tentativas / minuto por IP) ───────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ─── Verifica MX record real (rejeita null MX e domínios sem servidor) ──────
async function hasValidMx(domain: string): Promise<boolean> {
  try {
    const records = await dns.resolveMx(domain);
    return records.length > 0 && records.some(r => r.exchange.trim() !== "");
  } catch {
    return false;
  }
}

// ─── Sanitiza o input: remove espaços e força lowercase ─────────────────────
function sanitizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export async function POST(req: NextRequest) {
  // ── Rate limiting por IP ──────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde 1 minuto." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // ── Honeypot: bots preenchem campos ocultos, humanos não ─────────────────
  // O campo "website" nunca aparece na UI — se vier preenchido é bot.
  if (body.website) {
    // Retorna 200 para não revelar que foi detectado
    return NextResponse.json({ ok: true });
  }

  const rawEmail: string = body.email ?? "";
  const email = sanitizeEmail(rawEmail);

  // ── Formato básico (regex) ────────────────────────────────────────────────
  if (!isValidEmailFormat(email)) {
    return NextResponse.json({ error: "Formato de e-mail inválido." }, { status: 400 });
  }

  // ── validator.js — validação rigorosa de RFC ──────────────────────────────
  if (!isEmail(email, { allow_utf8_local_part: false, require_tld: true })) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  // ── Domínio descartável ───────────────────────────────────────────────────
  if (isDisposableDomain(email)) {
    return NextResponse.json(
      { error: "E-mails temporários não são aceitos." },
      { status: 400 }
    );
  }

  // ── MX record — domínio precisa ter servidor de e-mail real ──────────────
  const domain = email.split("@")[1];
  if (!(await hasValidMx(domain))) {
    return NextResponse.json(
      { error: "Domínio de e-mail inexistente." },
      { status: 400 }
    );
  }

  // ── Verifica duplicata no Notion ─────────────────────────────────────────
  try {
    const existing = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: "Email", title: { equals: email } },
      page_size: 1,
    });
    if (existing.results.length > 0) {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
  } catch (err) {
    console.error("[subscribe] Notion query error:", err);
  }

  // ── Salva no Notion ───────────────────────────────────────────────────────
  try {
    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Email: { title: [{ text: { content: email } }] },
        "Data de cadastro": { date: { start: new Date().toISOString() } },
      },
    });
  } catch (err) {
    console.error("[subscribe] Notion error:", err);
    return NextResponse.json(
      { error: "Erro ao salvar. Tente novamente." },
      { status: 500 }
    );
  }

  // ── Notificação por e-mail (não bloqueia em caso de falha) ────────────────
  try {
    await resend.emails.send({
      from: "Blog Dukie <onboarding@resend.dev>",
      to: "leandrodukievicz1718@gmail.com",
      subject: "🔔 Novo assinante no blog!",
      html: `
        <div style="font-family:monospace;padding:24px;background:#03111F;color:#fff;border-radius:8px">
          <h2 style="color:#00EAFF;margin:0 0 16px">Novo assinante 🚀</h2>
          <p style="margin:0;font-size:16px">Email: <strong>${email}</strong></p>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.5);font-size:12px">
            ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[subscribe] Resend error:", err);
  }

  return NextResponse.json({ ok: true });
}
