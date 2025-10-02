// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

/**
 * Small set of 'personalities' for the bot.
 * You can add more later (e.g., 'tech', 'legal', 'fitness').
 */
const MODES: Record<string, string> = {
  support: "You are a friendly customer support assistant. Be clear and helpful.",
  sales: "You are a helpful sales assistant. Focus on value and next steps.",
  booking: "You are a booking assistant. Confirm details and suggest available slots.",
  tech: "You are a calm technical support assistant. Explain step by step.",
};


export async function POST(req: NextRequest) {
  try {

const { message, mode } = await req.json();
const systemPrompt = MODES[mode] ?? MODES.support;


    // 3) Ask OpenAI for a reply (simple, non-streaming)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: String(message ?? "") },
      ],
      temperature: 0.5,
    });

    // 4) Extract reply text safely
    const reply =
      completion.choices?.[0]?.message?.content ??
      "Sorry, I couldn't think of a reply.";

    // 5) Send result back as JSON
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("API /api/chat error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Check your API key and server logs." },
      { status: 500 }
    );
  }
}
