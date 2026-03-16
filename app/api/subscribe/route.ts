import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_BLOG_SUBSCRIBERS_DB!;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      Email: {
        title: [{ text: { content: email } }],
      },
      "Data de cadastro": {
        date: { start: new Date().toISOString() },
      },
    },
  });

  return NextResponse.json({ ok: true });
}
