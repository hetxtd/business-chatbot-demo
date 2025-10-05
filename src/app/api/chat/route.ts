// src/app/api/chat/route.ts
export const runtime = "nodejs"; // ensure fs is allowed

import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { readFile } from "fs/promises";
import path from "path";

let cachedFaqs = "";
async function getFaqs(): Promise<string> {
  if (cachedFaqs) return cachedFaqs;
  try {
    const filePath = path.join(process.cwd(), "public", "faqs.md");
    const text = await readFile(filePath, "utf8");
    cachedFaqs = text.slice(0, 2000);
  } catch (e) {
    console.error("Failed to read faqs.md", e);
    cachedFaqs = "";
  }
  return cachedFaqs;
}


const MODES: Record<string, string> = {
  support:
    "You are a friendly customer support assistant. Be clear and helpful. UK tone.",
  sales:
    "You are a helpful sales assistant. Ask up to 2 brief clarifying questions, then suggest next steps. UK tone.",
  booking:
    "You are a booking assistant. Confirm details and suggest available slots. UK tone.",
  tech:
    "You are a calm technical support assistant. Explain step by step, avoid jargon unless asked. UK tone.",
};

// Guardrails to force using our context for policy-ish questions
const RAG_RULES = `
You are given BUSINESS CONTEXT. For ANY factual question, prefer facts from the BUSINESS CONTEXT.
If the context doesn't contain the answer, say "I don't know from the provided info."
Keep answers brief (2-4 sentences), UK tone.
`;


export async function POST(req: NextRequest) {
  try {
    const { message, mode } = await req.json();

    const faqs = await getFaqs();
    const contextBlock = faqs ? `\n\nBUSINESS CONTEXT:\n${faqs}` : "";

    // One strong system message: mode + rules + context
    const systemPrompt =
      (MODES[mode as string] ?? MODES.support) +
      "\n" +
      RAG_RULES +
      contextBlock;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: String(message ?? "") },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "Sorry, I couldn't think of a reply.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("API /api/chat error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Check your API key and server logs." },
      { status: 500 }
    );
  }
}
