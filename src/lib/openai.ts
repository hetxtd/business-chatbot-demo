// src/lib/openai.ts
import OpenAI from "openai";
import { env } from "./env";

/**
 * This creates a single OpenAI client using your secret key.
 * It must only run on the server — never in the browser.
 */
export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});
